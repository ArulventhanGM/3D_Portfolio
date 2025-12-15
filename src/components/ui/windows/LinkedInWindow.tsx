'use client';

import { useEffect } from 'react';

export default function LinkedInWindow() {
  useEffect(() => {
    // Open LinkedIn in new tab
    const timer = setTimeout(() => {
      window.open('MY_LINKEDIN_URL_HERE', '_blank');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 text-white">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-4xl mb-4">🔷</div>
        <div className="text-xl mb-2">Opening LinkedIn...</div>
        <div className="text-sm text-gray-400">
          Your LinkedIn profile will open in a new tab.
        </div>
      </div>
    </div>
  );
}

