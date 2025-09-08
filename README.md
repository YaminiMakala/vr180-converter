# 🎥 VR180 Converter

Convert any **2D video** into an **immersive VR180 experience** with AI-powered depth estimation and stereoscopic rendering.

This project provides a web interface to upload a video, process it with AI, and preview/download the generated VR180 output.

---

## ✨ Features
- 📤 **Upload 2D videos** (MP4, MOV, AVI, up to 500MB)
- 🧠 **AI Processing Pipeline**
  - Frame analysis
  - Depth estimation with neural networks (e.g. MiDaS)
  - Stereoscopic rendering for left/right eye
  - VR180 encoding
- 🎭 **Multiple Preview Modes**
  - Side-by-Side
  - Anaglyph
  - Mono
- 🎧 **VR Compatibility**
  - Oculus Quest 2/3
  - HTC Vive
  - PlayStation VR
  - YouTube VR
- ⬇️ **Download VR180 MP4** for offline viewing


2. Install dependencies
npm install

3. Run the development server
npm run dev


Your app will be available at http://localhost:5173
 (or similar).

📂 Project Structure
vr180-converter/
├── public/              # Static assets
├── src/                 # Application source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Main pages (upload, preview, etc.)
│   └── lib/             # Utility and helper functions
├── package.json         # Dependencies & scripts
├── vite.config.ts       # Vite configuration
└── tailwind.config.ts   # TailwindCSS config

🛠️ Tech Stack

⚡ Vite – lightning-fast frontend tooling

⚛️ React + TypeScript – UI framework

🎨 TailwindCSS + shadcn/ui – modern, customizable design system

🧠 AI Models (MiDaS / DepthNet) – depth estimation

🎬 FFmpeg – video processing and encoding

📸 Demo

🔗 Coming soon — will showcase before/after VR180 conversion

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
---

## 🚀 Getting Started

### 1. Clone this repository
```bash
git clone https://github.com/YaminiMakala/vr180-converter.git
cd vr180-converter
