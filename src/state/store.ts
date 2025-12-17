import { create } from 'zustand';

export interface WindowState {
  id: string;
  minimized: boolean;
  maximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AppState {
  // Monitor boot state
  isMonitorOn: boolean;
  isBooting: boolean;
  bootProgress: number;
  showDesktop: boolean;
  booted: boolean;
  
  // Camera interaction state
  isPointerOnScreen: boolean;  // True when pointer is over monitor screen
  cameraMode: 'default' | 'monitor';  // Camera behavior mode
  focused: boolean;
  hoveringMonitor: boolean;
  isDraggingWindow: boolean;
  mousePosition: { x: number; y: number };
  
  // Desktop state
  activeWindow: string | null;
  windows: Record<string, WindowState>;
  
  // Fullscreen state
  isFullscreen: boolean;
  
  // Actions
  turnOnMonitor: () => void;
  startBoot: () => void;
  updateBootProgress: (progress: number | ((prev: number) => number)) => void;
  finishBoot: () => void;
  setBooted: (booted: boolean) => void;
  setFocused: (focused: boolean) => void;
  setIsPointerOnScreen: (isOn: boolean) => void;  // New action for pointer state
  setHoveringMonitor: (hovering: boolean) => void;
  setCameraMode: (mode: 'default' | 'monitor') => void;
  setIsDraggingWindow: (dragging: boolean) => void;
  updateMousePosition: (position: { x: number; y: number }) => void;
  openWindow: (windowId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  setActiveWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  toggleFullscreen: () => void;
  exitFullscreen: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  isMonitorOn: false,
  isBooting: false,
  bootProgress: 0,
  showDesktop: false,
  booted: false,
  isPointerOnScreen: false,
  cameraMode: 'default',
  focused: false,
  hoveringMonitor: false,
  isDraggingWindow: false,
  mousePosition: { x: 0, y: 0 },
  activeWindow: null,
  windows: {},
  isFullscreen: false,
  
  // Actions
  turnOnMonitor: () => set({ isMonitorOn: true }),
  
  startBoot: () => set({ isBooting: true, bootProgress: 0 }),
  
  updateBootProgress: (progress: number | ((prev: number) => number)) => 
    set((state) => ({
      bootProgress: typeof progress === 'function' 
        ? Math.min(100, Math.max(0, progress(state.bootProgress)))
        : Math.min(100, Math.max(0, progress)),
    })),
  
  finishBoot: () => 
    set({ isBooting: false, bootProgress: 100, showDesktop: true, booted: true }),
  
  setBooted: (booted: boolean) => set({ booted }),
  
  setFocused: (focused: boolean) => set({ focused }),
  
  // New action: Set pointer on screen state and update camera mode
  setIsPointerOnScreen: (isOn: boolean) => 
    set({ 
      isPointerOnScreen: isOn,
      cameraMode: isOn ? 'monitor' : 'default'
    }),
  
  setHoveringMonitor: (hovering: boolean) => set({ hoveringMonitor: hovering }),
  
  setCameraMode: (mode: 'default' | 'monitor') => set({ cameraMode: mode }),
  
  setIsDraggingWindow: (dragging: boolean) => set({ isDraggingWindow: dragging }),
  
  updateMousePosition: (position: { x: number; y: number }) => set({ mousePosition: position }),
  
  openWindow: (windowId: string) => 
    set((state) => {
      if (state.windows[windowId]) {
        // Window exists, just restore and activate it
        return {
          activeWindow: windowId,
          windows: {
            ...state.windows,
            [windowId]: { ...state.windows[windowId], minimized: false }
          }
        };
      }
      // Create new window
      return {
        activeWindow: windowId,
        windows: {
          ...state.windows,
          [windowId]: {
            id: windowId,
            minimized: false,
            maximized: false,
            position: { x: 100 + Object.keys(state.windows).length * 30, y: 80 + Object.keys(state.windows).length * 30 },
            size: { width: 450, height: 350 }
          }
        }
      };
    }),
  
  closeWindow: (windowId: string) => 
    set((state) => {
      const newWindows = { ...state.windows };
      delete newWindows[windowId];
      const windowIds = Object.keys(newWindows);
      return {
        windows: newWindows,
        activeWindow: state.activeWindow === windowId 
          ? (windowIds.length > 0 ? windowIds[windowIds.length - 1] : null)
          : state.activeWindow,
      };
    }),
  
  minimizeWindow: (windowId: string) =>
    set((state) => {
      const window = state.windows[windowId];
      if (window) {
        return {
          windows: {
            ...state.windows,
            [windowId]: { ...window, minimized: true }
          }
        };
      }
      return state;
    }),
  
  maximizeWindow: (windowId: string) =>
    set((state) => {
      const window = state.windows[windowId];
      if (window) {
        return {
          windows: {
            ...state.windows,
            [windowId]: { ...window, maximized: !window.maximized }
          }
        };
      }
      return state;
    }),
  
  restoreWindow: (windowId: string) =>
    set((state) => {
      const window = state.windows[windowId];
      if (window) {
        return {
          windows: {
            ...state.windows,
            [windowId]: { ...window, minimized: false, maximized: false }
          }
        };
      }
      return state;
    }),
  
  setActiveWindow: (windowId: string) =>
    set({ activeWindow: windowId }),
  
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) =>
    set((state) => {
      const window = state.windows[windowId];
      if (window) {
        return {
          windows: {
            ...state.windows,
            [windowId]: { ...window, position }
          }
        };
      }
      return state;
    }),
  
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
  
  exitFullscreen: () => set({ isFullscreen: false }),
}));

