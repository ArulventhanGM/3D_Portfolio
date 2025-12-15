# Project Structure

```
Cursor Portfolio/
├── public/
│   └── .gitkeep                    # Place for 3D models (GLTF/GLB)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with metadata
│   │   └── page.tsx                # Main page with OfficeScene
│   │
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── OfficeScene.tsx     # Main 3D scene container
│   │   │   ├── Desk.tsx            # Desk 3D model
│   │   │   ├── Monitor.tsx         # Monitor with click interaction
│   │   │   ├── Keyboard.tsx        # Keyboard 3D model
│   │   │   ├── Phone.tsx           # Mobile phone 3D model
│   │   │   ├── Bonsai.tsx          # Bonsai plant with animation
│   │   │   ├── DecorativeItems.tsx # Desk decorations
│   │   │   └── Lighting.tsx        # Scene lighting setup
│   │   │
│   │   └── ui/
│   │       ├── MonitorUI.tsx       # Monitor UI container
│   │       ├── BootSequence.tsx    # Boot animation sequence
│   │       ├── Desktop.tsx         # Desktop UI with icons
│   │       ├── DesktopIcon.tsx     # Individual desktop icon
│   │       ├── WindowManager.tsx   # Manages all windows
│   │       ├── Window.tsx          # Draggable window component
│   │       ├── FullscreenOverlay.tsx # Fullscreen mode overlay
│   │       │
│   │       ├── windows/
│   │       │   ├── GitHubWindow.tsx    # GitHub icon window
│   │       │   ├── LinkedInWindow.tsx  # LinkedIn icon window
│   │       │   ├── GmailWindow.tsx     # Gmail icon window
│   │       │   └── PortfolioWindow.tsx # Portfolio window with tabs
│   │       │
│   │       └── portfolio/
│   │           ├── AboutPage.tsx       # About me page
│   │           ├── SkillsPage.tsx      # Skills showcase
│   │           ├── ProjectsPage.tsx    # Projects gallery
│   │           └── ContactPage.tsx     # Contact information
│   │
│   ├── state/
│   │   └── store.ts                # Zustand global state store
│   │
│   ├── hooks/
│   │   └── useKeyboard.ts          # Keyboard event hook
│   │
│   └── styles/
│       └── globals.css             # Global styles + CRT effects
│
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── next.config.js                  # Next.js config
├── tailwind.config.ts              # Tailwind CSS config
├── postcss.config.js               # PostCSS config
├── .eslintrc.json                  # ESLint config
├── .gitignore                      # Git ignore rules
├── README.md                       # Project documentation
└── PROJECT_STRUCTURE.md            # This file
```

## Key Files to Customize

### 1. Replace Placeholder URLs

**GitHub Window** (`src/components/ui/windows/GitHubWindow.tsx`):
- Line 8: Replace `'MY_GITHUB_URL_HERE'` with your GitHub profile URL

**LinkedIn Window** (`src/components/ui/windows/LinkedInWindow.tsx`):
- Line 8: Replace `'MY_LINKEDIN_URL_HERE'` with your LinkedIn profile URL

**Gmail Window** (`src/components/ui/windows/GmailWindow.tsx`):
- Line 5: Replace `'MY_EMAIL_HERE'` with your email address

**Contact Page** (`src/components/ui/portfolio/ContactPage.tsx`):
- Line 25: Replace `MY_EMAIL_HERE` with your email
- Line 32: Replace `MY_GITHUB_URL_HERE` with your GitHub URL
- Line 39: Replace `MY_LINKEDIN_URL_HERE` with your LinkedIn URL

### 2. Customize Portfolio Content

Edit the following files to add your personal information:
- `src/components/ui/portfolio/AboutPage.tsx` - Your bio
- `src/components/ui/portfolio/SkillsPage.tsx` - Your skills
- `src/components/ui/portfolio/ProjectsPage.tsx` - Your projects
- `src/components/ui/portfolio/ContactPage.tsx` - Contact details

### 3. Add 3D Models (Optional)

To replace procedural geometry with GLTF/GLB models:

1. Place models in `public/models/`
2. Update components in `src/components/3d/` to use `useGLTF`:

```tsx
import { useGLTF } from '@react-three/drei';

export default function Monitor() {
  const { scene } = useGLTF('/models/monitor.glb');
  return <primitive object={scene} />;
}
```

## State Management

The app uses Zustand for global state management. Key state variables:

- `isMonitorOn`: Monitor power state
- `isBooting`: Boot sequence active
- `bootProgress`: Boot progress (0-100)
- `showDesktop`: Desktop UI visible
- `activeWindow`: Currently active window ID
- `windows`: Array of open window IDs
- `isFullscreen`: Fullscreen mode active

## Component Hierarchy

```
OfficeScene (3D Canvas)
├── Lighting
├── Desk
├── Monitor (clickable)
├── Keyboard
├── Phone
├── Bonsai
└── DecorativeItems

MonitorUI (overlay)
├── BootSequence (when booting)
├── Desktop (when booted)
│   ├── DesktopIcon (x4)
│   └── WindowManager
│       └── Window (xN)
│           ├── GitHubWindow
│           ├── LinkedInWindow
│           ├── GmailWindow
│           └── PortfolioWindow
│               ├── AboutPage
│               ├── SkillsPage
│               ├── ProjectsPage
│               └── ContactPage
└── FullscreenOverlay (when fullscreen)
```

## Next Steps

1. Install dependencies: `npm install`
2. Update placeholder URLs in the files listed above
3. Customize portfolio content
4. Run development server: `npm run dev`
5. (Optional) Add your own 3D models
6. Build for production: `npm run build`

