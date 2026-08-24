# Kenshi Fate

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Let fate decide your next Kenshi run.**

Kenshi Fate is an open-source, 100% frontend playthrough, challenge, and campaign generator designed for players of *Kenshi*. It generates compatible, lore-friendly conditions for your next adventure in the harsh desert wasteland.

## 🏜️ Key Features

- **Lore-Compatible Generation**: Our compatibility engine filters out contradictory combinations (e.g. Skeletons will never receive Holy Nation fanatical starts, rules, or prosthetic restrictions).
- **Fully Deterministic (Seeded)**: Every run is bound to a unique alphanumeric seed (like `KF-384918`). Share your seed and anyone in the world will generate the exact same campaign.
- **Daily Challenge**: All players globally receive the same seed and challenges on the same day using date-based seeds (`daily-YYYY-MM-DD`), with no database needed.
- **Custom Runs**: Filter major parameters (like starting scenario, main race, difficulty, base construction, and recruitment) before letting the winds of fate decide the rest.
- **Local History**: Revisit previous campaigns locally without needing an account.

---

## 🛠️ Local Development & Setup

To run Kenshi Fate on your local machine, ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ThiagoBerenger/kenshi-fate.git
   cd kenshi-fate
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Dev Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in terminal).

4. **Build for Production**:
   ```bash
   npm run build
   ```
   The built static website will be available in the `dist/` directory, ready to be hosted on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 📜 How the Seed Engine Works

Generation is powered by a combination of two fast, lightweight algorithms:
1. **`xmur3`**: Hashes string seeds into a deterministic 32-bit integer.
2. **`mulberry32`**: A seeded pseudorandom number generator (PRNG) that yields identical float streams from the same hashed seed.

Instead of generic browser `Math.random()`, the engine runs:
```ts
const rand = getSeededRandom(seed);
// All options are selected from compatible pools using rand()
```

---

## 🤝 Contributing

We want Kenshi Fate to be easily expandable by the community! 

If you want to add new starts, races, weapons, rules, restrictions, or epic final objectives, please refer to our [CONTRIBUTING.md](file:///d:/repositórios/kenshi-fate/CONTRIBUTING.md) guide. It outlines the schema of the files in `src/data/` and how to test your changes.

---

## ⚖️ Legal Disclaimer

*Kenshi Fate is an unofficial fan-made project and is not affiliated with or endorsed by Lo-Fi Games.* 

This project does not extract, redistribute, or use copyrighted visual assets, game code, or text files directly from the game *Kenshi*. All descriptions and icons are original work or fall under fair use for community-built companion apps.
