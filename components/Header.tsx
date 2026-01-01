
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  activeTab: 'generate' | 'edit' | 'history';
  setActiveTab: (tab: 'generate' | 'edit' | 'history') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, activeTab, setActiveTab, theme, toggleTheme }) => {
  return (
    <header className="w-full pt-8 pb-4 flex flex-col items-center">
      <div className="w-full max-w-5xl flex items-center justify-between mb-8 px-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl aura-gradient aura-glow">
            <span className="text-white font-black text-xl italic tracking-tighter">A</span>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 tracking-tight">
            Aura Graph
          </h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full transition-all shadow-md"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707-.707M6.343 6.343l.707-.707ZM12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <div className="hidden sm:flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-1.5 pl-4 pr-1.5 shadow-lg">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{user.name}</span>
              <button 
                onClick={onLogout}
                className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 transition-all rounded-full"
                title="Logout"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
            <button 
              onClick={onLogout}
              className="sm:hidden p-2 text-slate-400 hover:text-red-400"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <nav className="flex gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl mb-2 shadow-inner">
        {(['generate', 'edit', 'history'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 sm:px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
              activeTab === tab 
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' 
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            {tab === 'edit' ? 'Edit Image' : tab}
          </button>
        ))}
      </nav>
      
      <p className="text-slate-400 dark:text-slate-500 text-xs font-light mt-4 px-4 text-center tracking-wide uppercase opacity-70">
        {activeTab === 'generate' && 'Manifest new visions on the digital canvas'}
        {activeTab === 'edit' && 'Upload and transform existing images with AI'}
        {activeTab === 'history' && 'Explore your past artistic manifestations'}
      </p>
    </header>
  );
};

export default Header;
