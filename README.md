<<<<<<< HEAD
# 3D_Portfolio
=======
# Interactive 3D Portfolio Website

A fully interactive 3D virtual office room portfolio website built with Next.js, React Three Fiber, and modern web technologies.

## 🎯 Features

- **3D Office Scene**: Immersive office environment with desk, monitor, keyboard, phone, bonsai plant, and decorative items
- **Interactive Monitor**: Click the monitor to boot it up and access the desktop
- **Boot Sequence**: Realistic boot animation with progress bar and CRT scanline effects
- **Desktop UI**: Functional desktop interface with clickable icons
- **Window Management**: Drag-and-drop windows with multiple applications
- **Portfolio Pages**: About, Skills, Projects, and Contact sections
- **Fullscreen Mode**: Expand portfolio content to full browser view
- **Smooth Animations**: Framer Motion animations throughout the experience

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **React Three Fiber** (R3F) for 3D rendering
- **Drei** helpers for Three.js
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Update placeholder URLs in the following files:
   - `src/components/ui/windows/GitHubWindow.tsx` - Replace `MY_GITHUB_URL_HERE`
   - `src/components/ui/windows/LinkedInWindow.tsx` - Replace `MY_LINKEDIN_URL_HERE`
   - `src/components/ui/windows/GmailWindow.tsx` - Replace `MY_EMAIL_HERE`
   - `src/components/ui/portfolio/ContactPage.tsx` - Replace all placeholder URLs

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Replacing 3D Models

The current implementation uses procedural geometry. To use GLTF/GLB models:

1. Place your models in `public/models/`
2. Update the 3D components to use `useGLTF` from `@react-three/drei`:

```tsx
import { useGLTF } from '@react-three/drei';

function Monitor() {
  const { scene } = useGLTF('/models/monitor.glb');
  return <primitive object={scene} />;
}
```

### Customizing Colors and Styling

- Edit `tailwind.config.ts` for theme colors
- Modify `src/styles/globals.css` for global styles
- Update component styles directly in their respective files

### Adding New Icons/Windows

1. Add icon to `src/components/ui/Desktop.tsx` icons array
2. Create window component in `src/components/ui/windows/`
3. Register in `src/components/ui/WindowManager.tsx`

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/
│   ├── 3d/          # 3D scene components
│   └── ui/          # UI components (desktop, windows, portfolio)
├── state/           # Zustand store
├── styles/          # Global styles
└── hooks/           # Custom React hooks (if needed)
```

## 🚀 Deployment

Build for production:
```bash
npm run build
npm start
```

Or deploy to Vercel:
```bash
vercel
```

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

>>>>>>> master
