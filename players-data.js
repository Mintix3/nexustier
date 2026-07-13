/* ============================================================
   NEXUS TIERS — PLAYER DATA FILE
   ============================================================
   This is the file you edit to add, remove, or update players.
   You don't need to touch index.html, style.css or script.js —
   just edit the list below and save this file, then refresh
   the page in your browser.

   IMPORTANT: once you've logged in as admin and added/edited any
   players through the site itself, your browser saves that roster
   (in localStorage) and will use it instead of this file on future
   loads — so this file only acts as the "starting roster" the very
   first time the site is opened in a given browser, or after that
   saved data is cleared. To reset back to this file's list, clear
   the site's local storage (or use the browser's "Export Data" /
   "Import Data" buttons to manage snapshots directly).

   HOW TO ADD A PLAYER
   --------------------
   Copy one of the blocks between { } and fill in:

     username : the player's exact Minecraft username
                (used to fetch their real skin)

     region   : one of  "NA"  "EU"  "AS"  "OTHER"

     tiers    : one line per kit. Only these kit names are used:
                  vanilla, sword, axe, nethpot, diamondpot, smp, uhc, mace

                Each kit's value must be one of:
                  "HT1"  "HT2"  "HT3"  "HT4"  "HT5"   (High Tier — best)
                  "LT1"  "LT2"  "LT3"  "LT4"  "LT5"   (Low Tier)
                  "none"                                (not ranked in that kit)

   Points are calculated automatically from tiers, so you never
   need to type points in by hand.

   You can also add/edit/delete players from inside the site
   itself with the "+ Add Player" button — this file is just a
   convenient way to bulk-load or bulk-edit a whole list at once.
   ============================================================ */

const PLAYERS_DATA = [
  {
    "id": "116d91a9-07f3-448b-8243-08a45dc82968",
    "username": "SoulFiredMc",
    "region": "NA",
    "tiers": {
      "vanilla": "none",
      "sword": "HT5",
      "axe": "none",
      "nethpot": "HT5",
      "diamondpot": "none",
      "smp": "LT5",
      "uhc": "none",
      "mace": "LT5"
    },
    "titleOverride": null
  },
  {
    "id": "b4c39b64-33b0-4ae1-8456-dbf0e53e05ac",
    "username": "Orangechicken287",
    "region": "NA",
    "tiers": {
      "vanilla": "none",
      "sword": "LT4",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "HT5",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "3ea2e442-4294-43ce-8238-268c92561b5e",
    "username": "Itznotian",
    "region": "NA",
    "tiers": {
      "vanilla": "LT3",
      "sword": "LT4",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "HT5",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "e719c6fe-8fa0-47b8-aea6-2817e65b77bb",
    "username": "Jacobbuilder77",
    "region": "NA",
    "tiers": {
      "vanilla": "none",
      "sword": "none",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "LT4",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "a17ada5f-7d20-423f-be56-2c258e64f2be",
    "username": "plaguerat5",
    "region": "NA",
    "tiers": {
      "vanilla": "none",
      "sword": "none",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "LT5",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "62d7e2cc-227c-4689-8a21-6d74335e8f58",
    "username": "obiohazard14",
    "region": "NA",
    "tiers": {
      "vanilla": "LT5",
      "sword": "LT5",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "none",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "f747cb51-296c-4257-b84c-6050bb02ad63",
    "username": "mintixx_",
    "region": "EU",
    "tiers": {
      "vanilla": "HT5",
      "sword": "none",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "none",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "80e7717c-b525-4b4d-91b4-76eadd49c070",
    "username": "ellaiscozy",
    "region": "EU",
    "tiers": {
      "vanilla": "LT4",
      "sword": "none",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "none",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "54a7bb08-ab90-441d-99b0-b3faaf3ba793",
    "username": "Rokedy",
    "region": "NA",
    "tiers": {
      "vanilla": "none",
      "sword": "none",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "none",
      "uhc": "none",
      "mace": "LT3"
    },
    "titleOverride": null
  },
  {
    "id": "d1e22b72-8e8d-4362-a1ba-d465561f6a7c",
    "username": "Jamal232",
    "region": "NA",
    "tiers": {
      "vanilla": "LT4",
      "sword": "LT4",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "LT4",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "65e362e5-34b6-492b-97d3-00d80784668f",
    "username": "Tokandusdaking",
    "region": "NA",
    "tiers": {
      "vanilla": "LT5",
      "sword": "none",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "none",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "01b11a98-ce3b-42d5-94ce-31cd3bb1eff5",
    "username": "Azrecxs",
    "region": "NA",
    "tiers": {
      "vanilla": "HT5",
      "sword": "HT5",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "LT5",
      "uhc": "none",
      "mace": "HT5"
    },
    "titleOverride": null
  },
  {
    "id": "f6e6e80f-3ef0-4bee-b7f6-91b2ef7b5637",
    "username": "KootyLooty",
    "region": "NA",
    "tiers": {
      "vanilla": "HT5",
      "sword": "none",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "none",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "d663b89d-ff7a-4713-93dd-b0577d1e6c13",
    "username": "Phlareyt",
    "region": "NA",
    "tiers": {
      "vanilla": "none",
      "sword": "none",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "none",
      "uhc": "none",
      "mace": "HT5"
    },
    "titleOverride": null
  },
  {
    "id": "14be307e-80bd-48ef-8e78-e4a440b4ccbb",
    "username": "Gerald4373",
    "region": "NA",
    "tiers": {
      "vanilla": "none",
      "sword": "none",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "LT5",
      "uhc": "none",
      "mace": "none"
    },
    "titleOverride": null
  },
  {
    "id": "8a420253-48c2-4fe0-805a-5529f8812fba",
    "username": "BradMCYT",
    "region": "NA",
    "tiers": {
      "vanilla": "HT5",
      "sword": "LT3",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "none",
      "uhc": "none",
      "mace": "HT4"
    },
    "titleOverride": null
  },
  {
    "id": "315f9839-5b24-41dd-9ca7-0a9454152523",
    "username": "Shbigi",
    "region": "NA",
    "tiers": {
      "vanilla": "HT4",
      "sword": "none",
      "axe": "none",
      "nethpot": "none",
      "diamondpot": "none",
      "smp": "LT3",
      "uhc": "none",
      "mace": "HT4"
    },
    "titleOverride": null
  }
  /* Add your own players below this line, following the same pattern:

  {
    username: "YourIGN",
    region: "NA",
    tiers: {
      vanilla: "none", sword: "none", axe: "none",
      nethpot: "none", diamondpot: "none", smp: "none", uhc: "none", mace: "none"
    }
  },

  */
];
