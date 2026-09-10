# ⚡ Contributing to Zenitsu Agatsuma

First off, thank you for considering contributing to the **Zenitsu Agatsuma** project! Whether you are a fellow Demon Slayer fan, a creative developer, or an open-source enthusiast, your contributions help make this cinematic experience even more electric.

---

## 🌟 How Can You Contribute?

You can contribute in multiple ways:
1. **Reporting Bugs**: Found a glitch in the lightning canvas or sound synthesizer? Open an issue!
2. **Suggesting Enhancements**: Have an idea for a new Thunder Breathing form, visual effect, or mini-game? Let us know.
3. **Submitting Pull Requests**: Implement improvements, optimize performance, or add creative animations.
4. **Spreading the Word**: Star the repo ⭐ and share it on Twitter/X, LinkedIn, and developer communities!

---

## 🛠️ Local Development Setup

1. **Fork & Clone** the repository:
   ```bash
   git clone https://github.com/<your-username>/Zenitsu.git
   cd Zenitsu
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local Vite dev server**:
   ```bash
   npm run dev
   ```

4. **Verify the build**:
   ```bash
   npm run build
   ```

5. **Run the linter**:
   ```bash
   npm run lint
   ```

---

## 📝 Pull Request Guidelines

- Create a feature branch with a descriptive name (`git checkout -b feature/thunder-clap-particle-fx`).
- Ensure code adheres to TypeScript strict mode and clean component architecture.
- Verify that `npm run build` succeeds with zero errors.
- Keep pull requests focused on a single feature or bugfix.
- Include a concise description of your changes and any relevant visual recordings or screenshots.

---

## ⚡ Code Style & Principles

- **Zero Heavy Sound Assets**: Ambient sound and sound effects should leverage procedural generation via the Web Audio API wherever possible.
- **Cinematic Aesthetics**: Prioritize 60fps+ fluid animations, responsive layouts, and dark atmospheric lighting.
- **Performance First**: Clean up requestAnimationFrames, Web Audio nodes, and resize listeners to prevent memory leaks.

Thank you for helping hone this blade to the utmost limit! ⚡
