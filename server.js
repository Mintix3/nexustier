require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nexus_tiers',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool;

function loadSeedPlayers() {
  const source = fs.readFileSync(path.join(__dirname, 'players-data.js'), 'utf8');
  const sandbox = {
    module: { exports: {} },
    exports: {},
    console,
    require,
  };
  vm.runInNewContext(`${source}\nthis.PLAYERS_DATA = PLAYERS_DATA;`, sandbox, { filename: 'players-data.js' });
  return sandbox.PLAYERS_DATA || sandbox.module.exports.PLAYERS_DATA || [];
}

async function initDatabase() {
  pool = mysql.createPool(dbConfig);
  const connection = await pool.getConnection();
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS players (
        id VARCHAR(64) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        region VARCHAR(16) NOT NULL DEFAULT 'NA',
        tiers JSON NOT NULL,
        title_override VARCHAR(255) DEFAULT NULL
      )
    `);

    const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM players');
    const count = rows[0].count;
    if (count === 0) {
      const seedPlayers = loadSeedPlayers();
      for (const player of seedPlayers) {
        await connection.execute(
          'INSERT INTO players (id, username, region, tiers, title_override) VALUES (?, ?, ?, ?, ?)',
          [
            player.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            player.username,
            player.region || 'NA',
            JSON.stringify(player.tiers || {}),
            player.titleOverride || null,
          ]
        );
      }
    }
  } finally {
    connection.release();
  }
}

async function getPlayersFromDb() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute('SELECT id, username, region, tiers, title_override AS titleOverride FROM players ORDER BY username');
    return rows.map((row) => ({
      id: row.id,
      username: row.username,
      region: row.region,
      tiers: typeof row.tiers === 'string' ? JSON.parse(row.tiers) : row.tiers,
      titleOverride: row.titleOverride || null,
    }));
  } finally {
    connection.release();
  }
}

async function savePlayersToDb(players) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM players');
    for (const player of players) {
      await connection.execute(
        'INSERT INTO players (id, username, region, tiers, title_override) VALUES (?, ?, ?, ?, ?)',
        [
          player.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          player.username,
          player.region || 'NA',
          JSON.stringify(player.tiers || {}),
          player.titleOverride || null,
        ]
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/players', async (_req, res) => {
  try {
    const players = await getPlayersFromDb();
    res.json(players);
  } catch (error) {
    console.error('Failed to load players', error);
    res.status(500).json({ error: 'Failed to load players' });
  }
});

app.post('/api/players', async (req, res) => {
  try {
    const players = Array.isArray(req.body) ? req.body : [];
    await savePlayersToDb(players);
    res.json({ ok: true });
  } catch (error) {
    console.error('Failed to save players', error);
    res.status(500).json({ error: 'Failed to save players' });
  }
});

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Nexus Tiers server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });
