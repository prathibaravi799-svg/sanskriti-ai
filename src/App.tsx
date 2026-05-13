import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import MarketplacePage from './pages/MarketplacePage';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Router>
          <div className="relative min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden selection:bg-orange-500/30">
            <Navbar />
            
            <main className="relative pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
              </Routes>
            </main>

            <Chatbot />

            <footer className="relative py-12 px-6 border-t border-slate-200 dark:border-white/5 backdrop-blur-md">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500">
                    Sanskriti AI
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-[0.3em] font-bold">Bharat Cultural Repository &bull; Gen Z Edition</p>
                </div>
                
                <div className="flex gap-8 text-[11px] font-black text-slate-400 dark:text-white/20 tracking-[0.2em] uppercase">
                  <a href="#" className="hover:text-orange-500 transition-colors">Digital Archive</a>
                  <a href="#" className="hover:text-indigo-500 transition-colors">Creative Commons</a>
                  <a href="#" className="hover:text-slate-900 dark:text-white transition-colors">API Docs</a>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-tighter font-bold">
                    Empowered by Gemini AI &bull; 2026
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}
