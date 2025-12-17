'use client';

import { useAppStore } from '@/state/store';
import Window from './Window';
import GitHubWindow from './windows/GitHubWindow';
import LinkedInWindow from './windows/LinkedInWindow';
import PortfolioWindow from './windows/PortfolioWindow';
import GmailWindow from './windows/GmailWindow';

const windowComponents: Record<string, React.ComponentType<any>> = {
  github: GitHubWindow,
  linkedin: LinkedInWindow,
  portfolio: PortfolioWindow,
  gmail: GmailWindow,
};

export default function WindowManager() {
  const { windows, activeWindow, closeWindow } = useAppStore();

  return (
    <>
      {Object.keys(windows).map((windowId) => {
        const window = windows[windowId];
        if (!window || window.minimized) return null;
        
        const WindowComponent = windowComponents[windowId];
        if (!WindowComponent) return null;

        return (
          <Window
            key={windowId}
            id={windowId}
            title={windowId.charAt(0).toUpperCase() + windowId.slice(1)}
            isActive={activeWindow === windowId}
            onClose={() => closeWindow(windowId)}
            initialPosition={window.position}
            width={window.size.width}
            height={window.size.height}
          >
            <WindowComponent />
          </Window>
        );
      })}
    </>
  );
}


