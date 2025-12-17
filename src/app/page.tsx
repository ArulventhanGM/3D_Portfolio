'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const OfficeScene = dynamic(() => import('@/components/3d/OfficeScene'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center text-white">
          <div className="text-xl">Loading...</div>
        </div>
      }>
        <OfficeScene />
      </Suspense>
    </main>
  );
}



