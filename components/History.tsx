
import React from 'react';
import { GeneratedImage } from '../types';

interface HistoryProps {
  history: GeneratedImage[];
  onClearHistory: () => void;
  onDeleteImage: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onClearHistory, onDeleteImage }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500 glass-card rounded-[3rem] border-dashed border-slate-300 dark:border-slate-800 reveal">
        <svg className="w-16 h-16 mb-6 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="font-light tracking-wide italic">Your history is currently a void.</p>
        <p className="text-xs uppercase tracking-[0.2em] mt-2 opacity-50">Start manifesting new art to fill this space</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2 reveal">
        <h2 className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
          Stored Manifestations ({history.length})
        </h2>
        <button
          onClick={onClearHistory}
          className="text-xs font-black uppercase tracking-[0.2em] text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors flex items-center gap-2 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((img, index) => (
          <div 
            key={img.id} 
            className="bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-xl group hover:border-indigo-500/30 transition-all duration-500 reveal"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-slate-950">
              <img src={img.url} alt={img.prompt} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = img.url;
                    link.download = `aura-${img.id}.png`;
                    link.click();
                  }}
                  className="p-4 bg-white/20 hover:bg-indigo-600 text-white rounded-2xl transition-all transform hover:scale-110 shadow-2xl"
                  title="Download Manifestation"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button 
                  onClick={() => onDeleteImage(img.id)}
                  className="p-4 bg-white/20 hover:bg-red-600 text-white rounded-2xl transition-all transform hover:scale-110 shadow-2xl"
                  title="Dissolve from History"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-transparent">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-black uppercase tracking-wider text-indigo-500 dark:text-indigo-400 px-2.5 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                  {img.style}
                </span>
                {img.isEdit && (
                  <span className="text-[9px] font-black uppercase tracking-wider text-pink-500 dark:text-pink-400 px-2.5 py-1 bg-pink-500/10 rounded-full border border-pink-500/20">
                    Transformed
                  </span>
                )}
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm line-clamp-2 leading-relaxed font-medium">
                {img.prompt}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center">
                <p className="text-slate-400 dark:text-slate-600 text-[9px] font-mono uppercase tracking-widest">
                  {new Date(img.timestamp).toLocaleDateString()} • {new Date(img.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-700">{img.aspectRatio}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
