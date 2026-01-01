
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  theme: 'dark' | 'light';
}

const Auth: React.FC<AuthProps> = ({ onLogin, theme }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email
    };
    
    localStorage.setItem('aura_user', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-2xl p-4 transition-colors duration-500">
      <div className="w-full max-w-md glass-card p-12 rounded-[4rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in duration-1000 border-black/5 dark:border-white/5">
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-10 flex items-center justify-center rounded-[2rem] aura-gradient aura-glow rotate-12 shadow-2xl">
            <span className="text-white font-black text-5xl italic tracking-tighter -rotate-12">A</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tighter">Aura Graph</h2>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] opacity-80">Access the manifested realm</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.25em] ml-1">Manifestor Identity</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 rounded-2xl p-5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder-slate-300 dark:placeholder-slate-800 shadow-inner"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.25em] ml-1">Digital Frequency</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 rounded-2xl p-5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder-slate-300 dark:placeholder-slate-800 shadow-inner"
              placeholder="you@aura.art"
            />
          </div>
          <button
            type="submit"
            className="w-full py-6 aura-gradient text-white font-black rounded-[1.5rem] shadow-2xl hover:aura-glow transition-all transform active:scale-[0.96] mt-6 tracking-[0.3em] uppercase text-xs"
          >
            Enter Studio
          </button>
        </form>
        
        <p className="mt-12 text-center text-[9px] text-slate-300 dark:text-slate-700 font-black uppercase tracking-[0.4em] italic opacity-40">
          Powered by NanoBanana Engine v2.3
        </p>
      </div>
    </div>
  );
};

export default Auth;
