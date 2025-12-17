'use client';

import { useState } from 'react';
import { useAppStore } from '@/state/store';
import AboutPage from '../portfolio/AboutPage';
import SkillsPage from '../portfolio/SkillsPage';
import ProjectsPage from '../portfolio/ProjectsPage';
import ContactPage from '../portfolio/ContactPage';

const pages = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const pageComponents: Record<string, React.ComponentType> = {
  about: AboutPage,
  skills: SkillsPage,
  projects: ProjectsPage,
  contact: ContactPage,
};

export default function PortfolioWindow() {
  const [activePage, setActivePage] = useState('about');
  const { toggleFullscreen } = useAppStore();
  const PageComponent = pageComponents[activePage] || AboutPage;

  return (
    <div className="h-full flex flex-col">
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700 bg-gray-800">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activePage === page.id
                ? 'bg-gray-900 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {page.label}
          </button>
        ))}
        <button
          onClick={toggleFullscreen}
          className="ml-auto px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700"
        >
          ⛶ Fullscreen
        </button>
      </div>
      
      {/* Page Content */}
      <div className="flex-1 overflow-auto">
        <PageComponent />
      </div>
    </div>
  );
}



