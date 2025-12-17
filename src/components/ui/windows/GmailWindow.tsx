'use client';

import { useEffect } from 'react';

export default function GmailWindow() {
  useEffect(() => {
    // Open Gmail compose window
    const email = 'MY_EMAIL_HERE';
    const subject = encodeURIComponent('Hello from Portfolio');
    const body = encodeURIComponent('Hi,\n\nI came across your portfolio and wanted to reach out...');
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    
    const timer = setTimeout(() => {
      window.open(mailtoLink, '_blank');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 text-white">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-4xl mb-4">✉️</div>
        <div className="text-xl mb-2">Opening Gmail...</div>
        <div className="text-sm text-gray-400">
          A compose window will open in a new tab.
        </div>
      </div>
    </div>
  );
}



