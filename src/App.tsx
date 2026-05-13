import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Stories from './pages/Stories';
import Community from './pages/Community';
import About from './pages/About';
import Discover from './pages/Discover';

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-dark-bg text-white selection:bg-saffron selection:text-navy overflow-x-hidden">
        {/* Ashoka Watermark Decor */}
        <svg className="ashoka-watermark chakra-decoration-animate" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <g>
            {[...Array(24)].map((_, i) => (
              <line 
                key={i}
                x1="50" y1="2" x2="50" y2="98" 
                stroke="currentColor" strokeWidth="0.2" 
                transform={`rotate(${i * 15} 50 50)`}
              />
            ))}
          </g>
        </svg>

        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/discover" element={<Discover />} />
          </Routes>
        </main>

        <footer className="relative pt-10 pb-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-saffron via-white to-india-green">
                Sanskriti AI
              </h3>
              <p className="text-xs text-white/40 uppercase tracking-widest">Modern Repository of Bharat</p>
            </div>
            <div className="flex gap-8 text-xs font-bold text-white/30 tracking-widest uppercase">
              <a href="#" className="hover:text-saffron transition-colors">Digital Archive</a>
              <a href="#" className="hover:text-india-green transition-colors">Cultural Ministry</a>
              <a href="#" className="hover:text-white transition-colors">API Docs</a>
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-tighter font-medium">
              Designed for the Hackathon by AI Studio &bull; 2026
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
