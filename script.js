// ---------- Config ----------
const CATEGORIES = ["vanilla", "sword", "axe", "nethpot", "diamondpot", "smp", "uhc", "mace"];

// ---------- Pixel-art icons (blocky Minecraft-style, drawn from scratch) ----------
// Each grid is 8x8. Letters map to colors in ICON_COLORS. "." = transparent.
const ICON_GRIDS = {
  overall: [
    ".oaaaao.",
    "oaaaaaao",
    "oaaaaaao",
    ".oaaaao.",
    "..oaao..",
    "..oaao..",
    ".oaaaao.",
    "oooooooo",
  ],
  vanilla: [
    "...oo...",
    "..oddo..",
    ".oddddo.",
    "oddddddo",
    "oddddddo",
    ".oddddo.",
    "..oddo..",
    "...oo...",
  ],
  sword: [
    "......so",
    ".....so.",
    "....so..",
    "...so...",
    "..sh....",
    ".oh.....",
    "oh......",
    "o.......",
  ],
  axe: [
    "osss....",
    "sssss...",
    "sssssh..",
    ".sssh...",
    "...h....",
    "..h.....",
    ".h......",
    "h.......",
  ],
  nethpot: [
    "..oo....",
    "..oo....",
    ".ogao...",
    "opppo...",
    "opppo...",
    "opppo...",
    ".oppo...",
    "..oo....",
  ],
  diamondpot: [
    "..oo....",
    "..oo....",
    ".ogao...",
    "obbbo...",
    "obbbo...",
    "obbbo...",
    ".obbo...",
    "..oo....",
  ],
  smp: [
    "........",
    ".rrrrrr.",
    "orrrrrro",
    "orrrrrro",
    "oooooooo",
    "h.....h.",
    "h.....h.",
    "........",
  ],
  uhc: [
    ".rr..rr.",
    "rrrrrrrr",
    "rrrrrrrr",
    ".rrrrrr.",
    "..rrrr..",
    "...rr...",
    "........",
    "........",
  ],
  mace: [
    "..mm....",
    ".mmmm...",
    "mmmmmm..",
    ".mmmm...",
    "..gg....",
    "..gg....",
    ".g......",
    "g.......",
  ],
};
const ICON_COLORS = {
  o: "#161412", a: "#f0c94a", d: "#5fd9e8", s: "#d7d7d7", h: "#8a5a2b",
  g: "#8a5a2b", p: "#e05fae", r: "#d9453f", m: "#b8b8b8", b: "#5fe3ff",
};

function svgIcon(name, size = 16) {
  const grid = ICON_GRIDS[name];
  if (!grid) return "";
  const n = grid.length;
  let rects = "";
  grid.forEach((row, y) => {
    row.split("").forEach((ch, x) => {
      if (ch !== "." && ICON_COLORS[ch]) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${ICON_COLORS[ch]}"/>`;
      }
    });
  });
  return `<svg viewBox="0 0 ${n} ${n}" width="${size}" height="${size}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:block;">${rects}</svg>`;
}

// ---------- Real Minecraft item textures ----------
// Kits are represented with the actual vanilla item texture rather than a
// hand-drawn icon. Textures are pulled from a public mirror of Mojang's
// item art on GitHub. If a texture ever fails to load (e.g. offline use),
// we fall back to the hand-drawn pixel icon above instead of a broken image.
const TEXTURE_BASE = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.1/assets/minecraft/textures/item/";
const KIT_TEXTURES = {
  overall: "nether_star",
  vanilla: "end_crystal",
  sword: "diamond_sword",
  axe: "diamond_axe",
  nethpot: "splash_potion",
  diamondpot: "diamond",
  smp: "totem_of_undying",
  uhc: "golden_apple",
  mace: "mace",
};
// Textures used for the profile "title" badges (not tied to a kit).
const TITLE_TEXTURES = {
  combat_master: "nether_star",
  elite_fighter: "diamond_sword",
  skilled_fighter: "iron_sword",
  rising_player: "stick",
  custom: "name_tag",
};
// The auto-computed titles and manually-selectable preset titles share this
// same key -> display text mapping.
const TITLE_PRESETS = {
  combat_master: "Combat Master",
  elite_fighter: "Elite Fighter",
  skilled_fighter: "Skilled Fighter",
  rising_player: "Rising Player",
};

function itemIcon(key, size = 18) {
  const tex = KIT_TEXTURES[key] || key; // allow passing a raw texture name too
  if (!tex) return "";
  return `<img src="${TEXTURE_BASE}${tex}.png" width="${size}" height="${size}" class="kit-icon-img" alt="${key}" data-fallback="${key}" data-size="${size}" onerror="mcIconFallback(this)">`;
}
function mcIconFallback(img) {
  const key = img.dataset.fallback;
  const size = img.dataset.size || 18;
  if (ICON_GRIDS[key]) {
    img.outerHTML = svgIcon(key, size);
  } else {
    img.style.display = "none";
  }
}

const CATEGORY_ICON = {
  vanilla: itemIcon("vanilla"), sword: itemIcon("sword"), axe: itemIcon("axe"), nethpot: itemIcon("nethpot"),
  diamondpot: itemIcon("diamondpot"),
  smp: itemIcon("smp"), uhc: itemIcon("uhc"), mace: itemIcon("mace")
};
const TIER_OPTIONS = ["none", "HT1", "LT1", "HT2", "LT2", "HT3", "LT3", "HT4", "LT4", "HT5", "LT5"];
const TIER_POINTS = {
  none: 0,
  HT1: 60, LT1: 50,
  HT2: 40, LT2: 32,
  HT3: 24, LT3: 18,
  HT4: 12, LT4: 8,
  HT5: 4,  LT5: 2
};

// ---------- Per-kit tier board config ----------
// Each column groups the matching High/Low tier pair (e.g. Tier 1 = HT1 + LT1).
// Point values already keep HT above LT within a column, since HT always
// scores higher than its LT counterpart.
const TIER_GROUPS = [
  { key: 1, label: "Tier 1", tiers: ["HT1", "LT1"] },
  { key: 2, label: "Tier 2", tiers: ["HT2", "LT2"] },
  { key: 3, label: "Tier 3", tiers: ["HT3", "LT3"] },
  { key: 4, label: "Tier 4", tiers: ["HT4", "LT4"] },
  { key: 5, label: "Tier 5", tiers: ["HT5", "LT5"] },
];
function trophyIcon(tierKey) {
  const color = tierKey === 1 ? "#f4cd52" : tierKey === 2 ? "#cfd8e0" : tierKey === 3 ? "#e2953f" : "#6f6552";
  return `<svg viewBox="0 0 24 24" width="18" height="18" fill="${color}"><path d="M18 3h3v2c0 2.2-1.4 4-3.3 4.6C17 11.4 15.2 13 13 13.4V17h3v2H8v-2h3v-3.6c-2.2-.4-4-2-4.7-4.4C4.4 9 3 7.2 3 5V3h3V2h12v1zM6 5H4.3c.2 1 1 1.8 1.7 2.1V5zm12 2.1c.7-.3 1.5-1.1 1.7-2.1H18v2.1z"/></svg>`;
}
function chevronIcon(dir) {
  if (dir === "up") return `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 15 12 9 18 15"></polyline></svg>`;
  if (dir === "down") return `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
  return `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 15 12 9 18 15"></polyline><polyline points="6 19 12 13 18 19" opacity="0"></polyline></svg>`;
}
const SKIN_AVATAR = (name, size) => `https://mc-heads.net/avatar/${encodeURIComponent(name)}/${size}`;
const SKIN_BODY = (name, size) => `https://mc-heads.net/body/${encodeURIComponent(name)}/${size}`;

// ---------- In-memory data store ----------
// Players are loaded from the backend API when available, but the latest
// browser-local copy is kept as a fallback so edits and deletions remain
// visible even if the server is offline or not running yet.
const STORAGE_KEY = "ct_players";
let players = [];

function readPlayersFromLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved)) return [];
    return saved.map(p => mkPlayer(p.username, p.region || "NA", p.tiers || {}, p.id, p.titleOverride));
  } catch (e) {
    console.warn("Could not read local player data.", e);
    return [];
  }
}

function writePlayersToLocalStorage(list = players) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Could not save player data locally.", e);
  }
}

async function loadPlayers() {
  const localPlayers = readPlayersFromLocalStorage();
  if (localPlayers.length || localStorage.getItem(STORAGE_KEY) !== null) {
    players = localPlayers;
  } else {
    players = (typeof PLAYERS_DATA !== "undefined" ? PLAYERS_DATA : []).map(p =>
      mkPlayer(p.username, p.region || "NA", p.tiers || {}, undefined, p.titleOverride)
    );
    writePlayersToLocalStorage(players);
  }

  try {
    const response = await fetch('/api/players');
    if (!response.ok) throw new Error('Failed to load players');
    const data = await response.json();
    if (Array.isArray(data)) {
      players = data.map(p => mkPlayer(p.username, p.region || "NA", p.tiers || {}, p.id, p.titleOverride));
      writePlayersToLocalStorage(players);
    }
  } catch (e) {
    console.warn("Could not load player data from server, using local copy.", e);
  }

  return players;
}

async function savePlayers() {
  writePlayersToLocalStorage(players);
  try {
    const response = await fetch('/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(players)
    });
    if (!response.ok) throw new Error('Failed to save players');
    showToast("Saved to database", "ok");
  } catch (e) {
    console.warn("Could not save player data to server, but local copy was updated.", e);
    showToast("Saved locally — database unreachable", "warn");
  }
}

// ---------- Toast ----------
let toastTimer = null;
function showToast(message, kind = "ok") {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.className = `toast toast-${kind} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

function mkPlayer(username, region, tiers, id, titleOverride) {
  return { id: id || crypto.randomUUID(), username, region, tiers, titleOverride: titleOverride || null };
}

function catPoints(player, cat) {
  return TIER_POINTS[player.tiers[cat] || "none"] || 0;
}
function totalPoints(player) {
  return CATEGORIES.reduce((sum, c) => sum + catPoints(player, c), 0);
}
function pointsForActiveCat(player) {
  return activeCat === "overall" ? totalPoints(player) : catPoints(player, activeCat);
}

// ---------- Admin auth ----------
// NOTE: this is a purely client-side gate meant to keep the edit controls
// out of casual visitors' way. Since this whole site is static HTML/JS with
// no server, the credentials below live in this file and anyone who opens
// dev tools / views source can see them or flip the "logged in" flag
// directly. Don't rely on this for real security — just use it to keep the
// UI clean for normal visitors.
const ADMIN_USERNAME = "nexusadminpanel";
const ADMIN_PASSWORD = "nexusadminpanel.65932";
let isAdmin = localStorage.getItem("ct_isAdmin") === "1";

// ---------- State ----------
let activeCat = "overall";
let activeView = "home";
let editingId = null;

// ---------- DOM refs ----------
const podiumEl = document.getElementById("podium");
const playerRowsEl = document.getElementById("playerRows");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const usernameInput = document.getElementById("usernameInput");
const regionInput = document.getElementById("regionInput");
const titleSelect = document.getElementById("titleSelect");
const customTitleInput = document.getElementById("customTitleInput");
const skinPreview = document.getElementById("skinPreview");
const tierGrid = document.getElementById("tierGrid");
const deletePlayerBtn = document.getElementById("deletePlayerBtn");
const adminLink = document.getElementById("adminLink");
const loginModalOverlay = document.getElementById("loginModalOverlay");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const dataBar = document.querySelector(".data-bar");
const colActionsHead = document.querySelector(".table-head .col-actions");
const profileModalOverlay = document.getElementById("profileModalOverlay");
const profileModalBody = document.getElementById("profileModalBody");
const tierBoardEl = document.getElementById("tierBoard");
const tableWrapEl = document.querySelector(".table-wrap");

// ---------- Admin UI ----------
function updateAdminUI() {
  adminLink.textContent = isAdmin ? "Admin: ON" : "Admin";
  adminLink.classList.toggle("logged-in", isAdmin);
  addPlayerBtn.style.display = isAdmin ? "inline-block" : "none";
  dataBar.style.display = isAdmin ? "flex" : "none";
  if (colActionsHead) colActionsHead.style.display = isAdmin ? "" : "none";
}

function openLoginModal() {
  loginUsername.value = "";
  loginPassword.value = "";
  loginError.style.display = "none";
  loginModalOverlay.classList.add("active");
  setTimeout(() => loginUsername.focus(), 0);
}
function closeLoginModal() {
  loginModalOverlay.classList.remove("active");
}

adminLink.addEventListener("click", () => {
  if (isAdmin) {
    if (confirm("Log out of admin mode?")) {
      isAdmin = false;
      localStorage.removeItem("ct_isAdmin");
      updateAdminUI();
      renderAll();
    }
  } else {
    openLoginModal();
  }
});

document.getElementById("closeLoginModal").addEventListener("click", closeLoginModal);
loginModalOverlay.addEventListener("click", e => { if (e.target === loginModalOverlay) closeLoginModal(); });

function attemptLogin() {
  const u = loginUsername.value.trim();
  const p = loginPassword.value;
  if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
    isAdmin = true;
    localStorage.setItem("ct_isAdmin", "1");
    updateAdminUI();
    renderAll();
    closeLoginModal();
  } else {
    loginError.style.display = "block";
  }
}
document.getElementById("loginSubmitBtn").addEventListener("click", attemptLogin);
loginPassword.addEventListener("keydown", e => { if (e.key === "Enter") attemptLogin(); });
loginUsername.addEventListener("keydown", e => { if (e.key === "Enter") attemptLogin(); });

// ---------- Nav: Home / Tiers ----------
document.querySelectorAll(".toplink").forEach(btn => {
  btn.addEventListener("click", () => {
    activeView = btn.dataset.view;
    document.querySelectorAll(".toplink").forEach(b => b.classList.toggle("active", b === btn));
    document.getElementById("view-home").classList.toggle("active", activeView === "home");
    document.getElementById("view-tiers").classList.toggle("active", activeView === "tiers");
    renderAll();
  });
});

// ---------- Category tabs ----------
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    activeCat = btn.dataset.cat;
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.toggle("active", b === btn));
    renderAll();
  });
});

// ---------- Ranking helpers ----------
// Competition ranking (1,2,2,4...) over an already-sorted (desc by points) list.
function computeRanks(sortedList) {
  let ranks = [];
  sortedList.forEach((p, i) => {
    if (i === 0) ranks.push(1);
    else {
      const prevPts = pointsForActiveCat(sortedList[i - 1]);
      const curPts = pointsForActiveCat(p);
      ranks.push(prevPts === curPts ? ranks[i - 1] : i + 1);
    }
  });
  return ranks;
}
// A player's rank for the currently active category, across the FULL
// roster (ignores the search/region filters on the Tiers table).
function rankOfPlayer(player) {
  const sorted = [...players].sort((a, b) => pointsForActiveCat(b) - pointsForActiveCat(a));
  const ranks = computeRanks(sorted);
  const idx = sorted.findIndex(p => p.id === player.id);
  return ranks[idx];
}

const REGION_NAMES = { NA: "North America", EU: "Europe", AS: "Asia", OTHER: "Other Region" };
function regionFullName(region) {
  return REGION_NAMES[region] || region;
}

// The single kit a player performs best in (highest point value).
function peakCategory(player) {
  let best = { cat: null, tier: "none", pts: -1 };
  CATEGORIES.forEach(c => {
    const pts = catPoints(player, c);
    if (pts > best.pts) best = { cat: c, tier: player.tiers[c] || "none", pts };
  });
  return best;
}

// A fun title badge based on the player's overall standing — unless the
// admin has manually picked (or typed) a title for this player instead.
function computeTitle(player) {
  const override = player.titleOverride;
  if (override) {
    if (TITLE_PRESETS[override]) return { key: override, text: TITLE_PRESETS[override] };
    return { key: "custom", text: override }; // free-typed custom text
  }
  const sorted = [...players].sort((a, b) => totalPoints(b) - totalPoints(a));
  const ranks = computeRanksBy(sorted, totalPoints);
  const idx = sorted.findIndex(p => p.id === player.id);
  const rank = ranks[idx];
  if (rank === 1) return { key: "combat_master", text: "Combat Master" };
  if (rank <= 3) return { key: "elite_fighter", text: "Elite Fighter" };
  if (rank <= 10) return { key: "skilled_fighter", text: "Skilled Fighter" };
  return { key: "rising_player", text: "Rising Player" };
}
// Same competition-ranking logic as computeRanks, but generic over any
// points function (used here for total/overall points specifically).
function computeRanksBy(sortedList, pointsFn) {
  let ranks = [];
  sortedList.forEach((p, i) => {
    if (i === 0) ranks.push(1);
    else ranks.push(pointsFn(sortedList[i - 1]) === pointsFn(p) ? ranks[i - 1] : i + 1);
  });
  return ranks;
}

// ---------- Player profile modal ----------
function renderProfileModal(p) {
  const rank = rankOfPlayer(p);
  const title = computeTitle(p);
  const peak = peakCategory(p);
  const catLabel = activeCat === "overall" ? "OVERALL" : activeCat.toUpperCase();
  const pts = pointsForActiveCat(p);

  const kitIcons = CATEGORIES.map(c => {
    const tier = p.tiers[c] || "none";
    const cls = tier === "none" ? "tbadge empty" : `tbadge tier-${tier}`;
    return `
      <div class="${cls}" title="${c}">
        <div class="tb-icon">${itemIcon(c, 22)}</div>
        <div class="tb-tier">${tier === "none" ? "-" : tier}</div>
      </div>`;
  }).join("");

  return `
    <div class="profile-avatar-wrap">
      <img class="profile-avatar" src="${SKIN_AVATAR(p.username, 128)}" alt="${escapeHtml(p.username)}" onerror="this.src='https://mc-heads.net/avatar/steve/128'">
    </div>
    <h3 class="profile-username">${escapeHtml(p.username)}</h3>
    <div class="profile-title-badge">${itemIcon(TITLE_TEXTURES[title.key], 16)}<span>${title.text}</span></div>
    <div class="profile-region">${regionFullName(p.region)}</div>
    <a class="profile-namemc" href="https://namemc.com/profile/${encodeURIComponent(p.username)}" target="_blank" rel="noopener noreferrer">
      <span class="namemc-badge">N</span> NameMC <span>↗</span>
    </a>

    <div class="profile-section">
      <div class="profile-section-label">Position</div>
      <div class="profile-position-row">
        <div class="profile-rank-chip">${rank}.</div>
        <div class="profile-position-main">
          ${itemIcon("overall", 18)} ${catLabel}
          <span class="profile-position-pts">(${pts} points)</span>
        </div>
      </div>
    </div>

    <div class="profile-section">
      <div class="profile-peak-tier">Peak ${peak.tier === "none" ? "—" : peak.tier}</div>
      <div class="profile-peak-pts">${peak.pts} points</div>
      <div class="profile-kit-row">${kitIcons}</div>
    </div>
  `;
}

function openProfileModal(id) {
  const p = players.find(pl => pl.id === id);
  if (!p) return;
  profileModalBody.innerHTML = renderProfileModal(p);
  profileModalOverlay.classList.add("active");
}
function closeProfileModal() {
  profileModalOverlay.classList.remove("active");
}
document.getElementById("closeProfileModal").addEventListener("click", closeProfileModal);
profileModalOverlay.addEventListener("click", e => { if (e.target === profileModalOverlay) closeProfileModal(); });

// ---------- Render: Podium (Home) ----------
function renderPodium() {
  const top3 = [...players].sort((a, b) => pointsForActiveCat(b) - pointsForActiveCat(a)).slice(0, 3);
  if (top3.length === 0) {
    podiumEl.innerHTML = `<div class="podium-empty">No players yet — add one from the Tiers page.</div>`;
    return;
  }
  // Display order: 2nd, 1st, 3rd (podium look)
  const order = [top3[1], top3[0], top3[2]].filter(Boolean);
  const rankOf = p => top3.indexOf(p) + 1;

  podiumEl.innerHTML = order.map(p => {
    const rank = rankOf(p);
    return `
      <div class="podium-card rank-${rank}" data-profile="${p.id}">
        <div class="podium-tag">${escapeHtml(p.username)}</div>
        <div class="podium-img-wrap">
          <img src="${SKIN_BODY(p.username, 300)}" alt="${escapeHtml(p.username)}" onerror="this.src='https://mc-heads.net/body/steve/300'">
        </div>
        <div class="podium-points">${pointsForActiveCat(p)} pts</div>
        <div class="podium-rank">${rank}#</div>
      </div>
    `;
  }).join("");

  podiumEl.querySelectorAll("[data-profile]").forEach(card => {
    card.addEventListener("click", () => openProfileModal(card.dataset.profile));
  });
}

// ---------- Render: Tiers table ----------
function renderTable() {
  const search = searchInput.value.trim().toLowerCase();
  const region = regionFilter.value;

  let list = players.filter(p =>
    (!search || p.username.toLowerCase().includes(search)) &&
    (region === "all" || p.region === region)
  );
  list.sort((a, b) => pointsForActiveCat(b) - pointsForActiveCat(a));

  // competition ranking (1,2,2,4...)
  let ranks = [];
  list.forEach((p, i) => {
    if (i === 0) ranks.push(1);
    else {
      const prevPts = pointsForActiveCat(list[i - 1]);
      const curPts = pointsForActiveCat(p);
      ranks.push(prevPts === curPts ? ranks[i - 1] : i + 1);
    }
  });

  if (list.length === 0) {
    playerRowsEl.innerHTML = `<div class="podium-empty" style="padding:24px;">No players match.</div>`;
    return;
  }

  playerRowsEl.innerHTML = list.map((p, i) => {
    const badges = CATEGORIES.map(c => {
      const tier = p.tiers[c] || "none";
      const cls = tier === "none" ? "tbadge empty" : `tbadge tier-${tier}`;
      return `
        <div class="${cls}" title="${c}">
          <div class="tb-icon">${CATEGORY_ICON[c]}</div>
          <div class="tb-tier">${tier === "none" ? "-" : tier}</div>
        </div>`;
    }).join("");

    return `
      <div class="player-row" data-profile="${p.id}">
        <span class="col-rank">${ranks[i]}</span>
        <span class="player-cell">
          <img src="${SKIN_AVATAR(p.username, 32)}" width="32" height="32" onerror="this.src='https://mc-heads.net/avatar/steve/32'">
          <span class="player-name">${escapeHtml(p.username)}</span>
        </span>
        <span class="region-tag">${p.region}</span>
        <span class="tier-badges">${badges}</span>
        <span class="points-cell">${pointsForActiveCat(p)}</span>
        <span class="row-actions">
          ${isAdmin ? `<button class="icon-btn" data-edit="${p.id}">✎</button>` : ""}
        </span>
      </div>
    `;
  }).join("");

  playerRowsEl.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      openModal(btn.dataset.edit);
    });
  });
  playerRowsEl.querySelectorAll("[data-profile]").forEach(row => {
    row.addEventListener("click", () => openProfileModal(row.dataset.profile));
  });
}

function renderAll() {
  renderPodium();
  renderTiersView();
}

// Decide whether the Tiers page shows the normal sortable list (Overall)
// or the per-kit Tier 1–5 column board (any specific kit tab).
function renderTiersView() {
  const showBoard = activeCat !== "overall";
  tableWrapEl.style.display = showBoard ? "none" : "block";
  tierBoardEl.style.display = showBoard ? "grid" : "none";
  if (showBoard) renderTierBoard();
  else renderTable();
}

function renderTierBoard() {
  const search = searchInput.value.trim().toLowerCase();
  const region = regionFilter.value;
  const cat = activeCat;

  const filtered = players.filter(p =>
    (!search || p.username.toLowerCase().includes(search)) &&
    (region === "all" || p.region === region)
  );

  tierBoardEl.innerHTML = TIER_GROUPS.map(group => {
    let colPlayers = filtered.filter(p => group.tiers.includes(p.tiers[cat] || "none"));
    colPlayers.sort((a, b) => catPoints(b, cat) - catPoints(a, cat));

    const rowsHtml = colPlayers.length ? colPlayers.map((p, i) => {
      const tier = p.tiers[cat];
      const accentVar = tier.startsWith("HT") ? `--ht${tier.slice(2)}` : `--lt${tier.slice(2)}`;
      const canUp = i > 0 && catPoints(colPlayers[i - 1], cat) === catPoints(p, cat);
      const canDown = i < colPlayers.length - 1 && catPoints(colPlayers[i + 1], cat) === catPoints(p, cat);
      return `
        <div class="tier-row" style="border-left-color:var(${accentVar})" data-profile="${p.id}">
          <img src="${SKIN_AVATAR(p.username, 28)}" width="28" height="28" onerror="this.src='https://mc-heads.net/avatar/steve/28'">
          <span class="tier-row-name">${escapeHtml(p.username)}</span>
          ${isAdmin ? `
            <span class="tier-row-controls">
              <button class="tier-move-btn" data-move="up" data-id="${p.id}" ${canUp ? "" : "disabled"}>${chevronIcon("up")}</button>
              <button class="tier-move-btn" data-move="down" data-id="${p.id}" ${canDown ? "" : "disabled"}>${chevronIcon("down")}</button>
            </span>` : ""}
        </div>`;
    }).join("") : `<div class="tier-empty">No players yet</div>`;

    return `
      <div class="tier-col tier-col-${group.key}">
        <div class="tier-col-head">${trophyIcon(group.key)}<span>${group.label}</span></div>
        <div class="tier-col-body">${rowsHtml}</div>
      </div>`;
  }).join("");

  tierBoardEl.querySelectorAll("[data-profile]").forEach(row => {
    row.addEventListener("click", e => {
      if (e.target.closest(".tier-move-btn")) return;
      openProfileModal(row.dataset.profile);
    });
  });
  tierBoardEl.querySelectorAll(".tier-move-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      if (btn.disabled) return;
      moveInTier(btn.dataset.id, activeCat, btn.dataset.move);
    });
  });
}

// Admins can reorder players who are tied on points within the same tier
// column (arrows only work between ties — point value always wins otherwise).
async function moveInTier(playerId, cat, direction) {
  const player = players.find(p => p.id === playerId);
  if (!player) return;
  const tier = player.tiers[cat] || "none";
  const group = TIER_GROUPS.find(g => g.tiers.includes(tier));
  if (!group) return;

  let colPlayers = players.filter(p => group.tiers.includes(p.tiers[cat] || "none"));
  colPlayers.sort((a, b) => catPoints(b, cat) - catPoints(a, cat));
  const idx = colPlayers.findIndex(p => p.id === playerId);
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= colPlayers.length) return;
  if (catPoints(colPlayers[swapIdx], cat) !== catPoints(player, cat)) return;

  const other = colPlayers[swapIdx];
  const iA = players.indexOf(player);
  const iB = players.indexOf(other);
  [players[iA], players[iB]] = [players[iB], players[iA]];
  await savePlayers();
  renderAll();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[s]));
}

// ---------- Search / filter ----------
searchInput.addEventListener("input", renderTiersView);
regionFilter.addEventListener("change", renderTiersView);

// ---------- Modal: build tier fields ----------
function buildTierGrid(tiers = {}) {
  tierGrid.innerHTML = CATEGORIES.map(cat => `
    <div class="tier-field">
      <label>${CATEGORY_ICON[cat]} ${cat}</label>
      <select data-cat="${cat}">
        ${TIER_OPTIONS.map(t => `<option value="${t}" ${((tiers[cat] || "none") === t) ? "selected" : ""}>${t === "none" ? "—" : t}</option>`).join("")}
      </select>
    </div>
  `).join("");
}

function setTitleControls(titleOverride) {
  if (titleOverride && TITLE_PRESETS[titleOverride]) {
    titleSelect.value = titleOverride;
    customTitleInput.style.display = "none";
    customTitleInput.value = "";
  } else if (titleOverride) {
    titleSelect.value = "custom";
    customTitleInput.style.display = "block";
    customTitleInput.value = titleOverride;
  } else {
    titleSelect.value = "auto";
    customTitleInput.style.display = "none";
    customTitleInput.value = "";
  }
}

titleSelect.addEventListener("change", () => {
  customTitleInput.style.display = titleSelect.value === "custom" ? "block" : "none";
  if (titleSelect.value === "custom") customTitleInput.focus();
});

function openModal(id = null) {
  if (!isAdmin) return; // safety net — non-admins should never reach this
  editingId = id;
  if (id) {
    const p = players.find(pl => pl.id === id);
    modalTitle.textContent = "Edit Player";
    usernameInput.value = p.username;
    regionInput.value = p.region;
    setTitleControls(p.titleOverride);
    buildTierGrid(p.tiers);
    skinPreview.src = SKIN_AVATAR(p.username, 40);
    deletePlayerBtn.style.display = "inline-block";
  } else {
    modalTitle.textContent = "Add Player";
    usernameInput.value = "";
    regionInput.value = "NA";
    setTitleControls(null);
    buildTierGrid({});
    skinPreview.src = SKIN_AVATAR("steve", 40);
    deletePlayerBtn.style.display = "none";
  }
  modalOverlay.classList.add("active");
}

function closeModal() {
  modalOverlay.classList.remove("active");
  editingId = null;
}

document.getElementById("addPlayerBtn").addEventListener("click", () => openModal());
document.getElementById("closeModal").addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => { if (e.target === modalOverlay) closeModal(); });

usernameInput.addEventListener("input", () => {
  const name = usernameInput.value.trim() || "steve";
  skinPreview.src = SKIN_AVATAR(name, 40);
});

document.getElementById("savePlayerBtn").addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  if (!username) { usernameInput.focus(); return; }
  const region = regionInput.value;
  const tiers = {};
  tierGrid.querySelectorAll("select[data-cat]").forEach(sel => {
    tiers[sel.dataset.cat] = sel.value;
  });

  let titleOverride = null;
  if (titleSelect.value === "custom") {
    titleOverride = customTitleInput.value.trim() || null;
  } else if (titleSelect.value !== "auto") {
    titleOverride = titleSelect.value;
  }

  if (editingId) {
    const p = players.find(pl => pl.id === editingId);
    p.username = username; p.region = region; p.tiers = tiers; p.titleOverride = titleOverride;
  } else {
    players.push(mkPlayer(username, region, tiers, undefined, titleOverride));
  }
  await savePlayers();
  closeModal();
  renderAll();
});

deletePlayerBtn.addEventListener("click", async () => {
  if (!editingId) return;
  players = players.filter(p => p.id !== editingId);
  await savePlayers();
  closeModal();
  renderAll();
});

// ---------- Export / Import ----------
document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(players, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "nexus-tiers-data.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("importBtn").addEventListener("click", () => {
  document.getElementById("importFile").click();
});
document.getElementById("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const data = JSON.parse(reader.result);
      if (Array.isArray(data)) {
        players = data.map(p => ({
          id: p.id || crypto.randomUUID(),
          username: p.username,
          region: p.region || "NA",
          tiers: p.tiers || {}
        }));
        await savePlayers();
        renderAll();
      }
    } catch (err) {
      alert("Could not read that file — make sure it's a Nexus Tiers export.");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});

// ---------- Init ----------
document.querySelectorAll(".cat-icon[data-icon]").forEach(el => {
  el.innerHTML = itemIcon(el.dataset.icon, 20);
});
updateAdminUI();
(async () => {
  await loadPlayers();
  renderAll();
})();
