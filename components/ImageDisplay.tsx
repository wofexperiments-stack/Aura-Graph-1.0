
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  isGenerating: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isGenerating }) => {
  if (isGenerating) {
    return (
      <div className="w-full bg-white/30 dark:bg-slate-900/30 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-12 min-h-[400px] lg:min-h-[600px]">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-t-4 border-indigo-500 animate-spin mb-8"></div>
          <div className="absolute inset-0 w-24 h-24 rounded-full border-b-4 border-pink-500 animate-spin-slow"></div>
        </div>
        <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-2">Manifesting Art...</h3>
        <p className="text-slate-500 dark:text-slate-400 text-center animate-pulse">
          Communicating with the NanoBanana clusters to weave your vision.
        </p>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="w-full bg-white/30 dark:bg-slate-900/30 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center p-12 min-h-[400px] lg:min-h-[600px] group transition-all hover:bg-white/50 dark:hover:bg-slate-900/50">
        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center text-slate-400 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-slate-400 group-hover:scale-110 transition-all duration-500 border border-slate-100 dark:border-slate-700 shadow-md">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-slate-400 dark:text-slate-500 font-light text-center">
          The canvas is currently void. Enter a prompt to begin the manifestation process.
        </p>
      </div>
    );
  }

  const getContainerStyles = () => {
    const [w, h] = image.aspectRatio.split(':').map(Number);
    const paddingBottom = (h / w) * 100;
    return {
      paddingBottom: `${paddingBottom}%`,
    };
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        <div 
          className="relative w-full"
          style={getContainerStyles()}
        >
          <img 
            src={image.url} 
            alt={image.prompt} 
            className="absolute inset-0 w-full h-full object-contain animate-in fade-in zoom-in duration-700"
          />
        </div>
        
        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block px-2 py-1 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded border border-indigo-500/20 mb-2">
                {image.style}
              </span>
              <h4 className="text-slate-900 dark:text-slate-100 font-medium leading-tight">
                {image.prompt}
              </h4>
            </div>
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = image.url;
                link.download = `aura-graph-${image.id}.png`;
                link.click();
              }}
              className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
              title="Download Image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
          
          <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-500 font-mono">
            <span>Aspect Ratio: {image.aspectRatio}</span>
            <span>Generated: {new Date(image.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
