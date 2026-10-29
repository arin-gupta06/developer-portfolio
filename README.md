# Arin Gupta — Developer Portfolio & Digital Monograph

A modern, high-performance developer portfolio and interactive digital monograph engineered with Next.js, React 19, and TypeScript. Designed with luxury dark mode aesthetics, tactile 3D interactions, and smooth section transitions.

![Portfolio Preview](/public/assets/workspace-with-closed-book.jpg)

---

## ✨ Key Features

- **Interactive 3D Digital Monograph**: An editorial multi-spread publication resting directly on a photo-grounded walnut workspace. Supports realistic 3D page turning, index jumps, and multi-category showcases.
- **Buttery Smooth Section Navigation**: Fluid, animated gliding between sections (`Home`, `About`, `Magazine Portfolio`, `Achievements`) with custom scroll offsets and active navigation state tracking.
- **Editorial Achievements Showcase**: Highlights verified career milestones including:
  - **Top Finalist — Guardian App** (*Vibestate Hackathon • 2024*)
  - **Software Developer Intern** (*ByteEdu • 2024*)
  - **AI / ML Intern** (*DecodeLabs • 2024 - 2025*)
  - **Open Source Contributor** (*Nexus Spring of Code [NSoC] • 2024*)
- **Dual-Track Resume System**: Dropdown selector providing direct downloads for both Software Engineering (`Arin_Gupta_Software_Resume.pdf`) and AI/ML Developer (`Arin_Gupta_AI_ML_Resume.pdf`) tracks across desktop and mobile navigation.
- **Bespoke Aesthetics**: Frameless floating navigation, rich glassmorphic layers, custom typography (Plus Jakarta Sans & Space Grotesk), and zero generic UI templates.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Vanilla CSS, Responsive Glassmorphism, CSS 3D Transforms
- **Icons**: Lucide React
- **Typography**: Google Fonts (`Plus Jakarta Sans`, `Space Grotesk`)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/developer-portfolio.git
cd developer-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the portfolio.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── public/
│   └── assets/            # Production assets, monograph desk renders, and resume PDF
├── src/
│   ├── app/
│   │   ├── globals.css    # Design tokens, smooth scroll behavior & custom animations
│   │   ├── layout.tsx     # Root layout, meta tags & typography imports
│   │   └── page.tsx       # Single-page layout connecting all portfolio sections
│   └── components/
│       ├── Navbar.tsx             # Floating borderless navigation & resume download
│       ├── HeroSection.tsx        # Available-for-work badge, hero copy & CTAs
│       ├── AboutSection.tsx       # Bio, info grid & amber floating focus card
│       ├── MagazineSection.tsx    # 3D interactive monograph & multi-spread viewer
│       ├── AchievementsSection.tsx# High-impact stat strip & milestone cards
│       └── Footer.tsx             # Quick links, social handles & back-to-top
├── .gitignore             # Comprehensive Next.js, Node, and environment ignores
├── next.config.mjs        # Next.js configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

---

## 📄 License

Designed and developed by **Arin Gupta**. All rights reserved.
