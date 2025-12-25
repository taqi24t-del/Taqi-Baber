
import React from 'react';
import { TabType } from '../types';
import { Icons, COLORS } from '../constants';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Icons.Scissors /> },
    { id: 'ai', label: 'AI Concierge', icon: <Icons.Message /> },
    { id: 'calendar', label: 'Book', icon: <Icons.Calendar /> },
    { id: 'services', label: 'Services', icon: <Icons.Check /> },
    { id: 'settings', label: 'Settings', icon: <Icons.Settings /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#262626] z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex items-center space-x-2">
            <span style={{ color: COLORS.primary }} className="font-playfair text-2xl">BarberFlow</span>
          </div>
          <div className="flex w-full md:w-auto justify-around md:space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 transition-colors duration-200 ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? 'bg-[#D4AF37] text-black' : ''}`}>
                  {tab.icon}
                </div>
                <span className="text-[10px] md:text-sm font-medium uppercase tracking-wider">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
