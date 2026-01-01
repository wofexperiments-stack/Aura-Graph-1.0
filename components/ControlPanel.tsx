
import React, { useRef } from 'react';
import { ArtStyle, AspectRatio } from '../types';

interface ControlPanelProps {
  mode: 'generate' | 'edit';
  prompt: string;
  setPrompt: (val: string) => void;
  style: ArtStyle;
  setStyle: (val: ArtStyle) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (val: AspectRatio) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  sourceImage: string | null;
  setSourceImage: (val: string | null) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mode,
  prompt,
  setPrompt,
  style,
  setStyle,
  aspectRatio,
  setAspectRatio,
  isGenerating,
  onGenerate,
  sourceImage,
  setSourceImage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isEditMode = mode === 'edit';

  return (
    <div className="glass-card p-7 rounded-[2.5rem] shadow-2xl">
      <div className="space-y-7">
        
        {isEditMode && (
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">
              Primary Manifestation
            </label>
            {!sourceImage ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700/40 rounded-3xl py-12 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500/50 hover:text-indigo-500 transition-all bg-slate-50 dark:bg-slate-900/40 group"
              >
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg border border-slate-100 dark:border-slate-700">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-bold">Import Source Plate</span>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </button>
            ) : (
              <div className="relative rounded-3xl overflow-hidden group bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2xl min-h-[120px] max-h-[300px] flex items-center justify-center p-2">
                <img 
                  src={sourceImage} 
                  alt="Source" 
                  className="max-w-full max-h-[280px] object-contain rounded-xl" 
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm rounded-3xl">
                  <button 
                    onClick={() => setSourceImage(null)}
                    className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 text-xs font-bold"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Discard Plate
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1 flex justify-between">
            <span>{isEditMode ? 'The Transformation' : 'The Vision'}</span>
            <span className="text-[9px] text-indigo-500 dark:text-indigo-400 font-bold">{isEditMode ? 'EDIT' : 'NEW'}</span>
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={isEditMode ? "How should we manifest the change?" : "A celestial dragon woven from starlight..."}
            className="w-full h-36 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 rounded-[1.5rem] p-5 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 outline-none transition-all resize-none shadow-inner"
            disabled={isGenerating}
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Artistic Essence</label>
          <div className="relative group">
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as ArtStyle)}
              className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 rounded-2xl p-4.5 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer appearance-none shadow-inner"
              disabled={isGenerating}
            >
              {Object.values(ArtStyle).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Canvas Geometry</label>
          <div className="grid grid-cols-5 gap-2">
            {(['1:1', '16:9', '9:16', '4:3', '3:4'] as AspectRatio[]).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                disabled={isGenerating}
                className={`py-3 text-[10px] rounded-xl border transition-all duration-500 font-extrabold ${
                  aspectRatio === ratio
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                    : 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-600 hover:border-slate-300 dark:hover:border-white/10 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={isGenerating || !prompt.trim() || (isEditMode && !sourceImage)}
          className={`w-full py-5 rounded-2xl aura-gradient text-white font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-2xl ${
            isGenerating || !prompt.trim() || (isEditMode && !sourceImage) ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:aura-glow hover:scale-[1.03]'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Manifesting...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{isEditMode ? 'Manifest Edit' : 'Create Art'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
