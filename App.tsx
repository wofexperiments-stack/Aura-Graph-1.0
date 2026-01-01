
import React, { useState, useCallback, useEffect } from 'react';
import { ArtStyle, AspectRatio, GeneratedImage, User } from './types';
import { generateArtImage } from './services/geminiService';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import ImageDisplay from './components/ImageDisplay';
import History from './components/History';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'generate' | 'edit' | 'history'>('generate');
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ArtStyle>(ArtStyle.PHOTOREALISTIC);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const [tabKey, setTabKey] = useState(0);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('aura_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedHistory = localStorage.getItem('aura_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedTheme = localStorage.getItem('aura_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme + ' scroll-smooth';
    } else {
      document.documentElement.className = 'dark scroll-smooth';
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('aura_theme', newTheme);
    document.documentElement.className = newTheme + ' scroll-smooth';
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeTab, history, tabKey]);

  const handleLogout = () => {
    localStorage.removeItem('aura_user');
    setUser(null);
  };

  const handleTabChange = (tab: 'generate' | 'edit' | 'history') => {
    setActiveTab(tab);
    setTabKey(prev => prev + 1);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Are you sure you want to permanently dissolve your history? This cannot be undone.')) {
      setHistory([]);
      localStorage.removeItem('aura_history');
      setCurrentImage(null);
    }
  }, []);

  const handleDeleteImage = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(img => img.id !== id);
      localStorage.setItem('aura_history', JSON.stringify(updated));
      return updated;
    });
    if (currentImage?.id === id) {
      setCurrentImage(null);
    }
  }, [currentImage]);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || !user) return;
    if (activeTab === 'edit' && !sourceImage) {
        setError('Please upload a source image to edit.');
        return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateArtImage(
        prompt, 
        style, 
        aspectRatio, 
        activeTab === 'edit' ? (sourceImage || undefined) : undefined
      );
      
      const newImage: GeneratedImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: imageUrl,
        prompt: prompt,
        style: style,
        aspectRatio: aspectRatio,
        timestamp: Date.now(),
        isEdit: activeTab === 'edit'
      };
      
      setCurrentImage(newImage);
      const updatedHistory = [newImage, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('aura_history', JSON.stringify(updatedHistory));
      
    } catch (err) {
      console.error(err);
      setError('An error occurred while manifesting your aura. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, style, aspectRatio, sourceImage, history, user, activeTab]);

  if (!user) {
    return <Auth onLogin={setUser} theme={theme} />;
  }

  return (
    <div className={`min-h-screen flex flex-col items-center pb-12 px-4 sm:px-6 transition-colors duration-500`}>
      <Header 
        user={user} 
        onLogout={handleLogout} 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main key={tabKey} className="w-full max-w-5xl mt-8 tab-content-active">
        {activeTab === 'history' ? (
          <History 
            history={history} 
            onClearHistory={handleClearHistory} 
            onDeleteImage={handleDeleteImage}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <section className="lg:col-span-4 space-y-6 reveal">
              <ControlPanel 
                mode={activeTab}
                prompt={prompt}
                setPrompt={setPrompt}
                style={style}
                setStyle={setStyle}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
                sourceImage={sourceImage}
                setSourceImage={setSourceImage}
              />
              
              {error && (
                <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-sm animate-pulse">
                  {error}
                </div>
              )}
            </section>

            <section className="lg:col-span-8 reveal">
              <ImageDisplay 
                image={currentImage} 
                isGenerating={isGenerating} 
              />
            </section>
          </div>
        )}
      </main>

      <footer className="mt-16 text-slate-500 dark:text-slate-600 text-[10px] font-mono tracking-widest uppercase opacity-50 reveal">
        Manifestation Studio &copy; {new Date().getFullYear()} • Aura Graph v2.3
      </footer>
    </div>
  );
};

export default App;
