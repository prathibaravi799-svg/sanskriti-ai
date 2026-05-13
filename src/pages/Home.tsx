import React, { useState } from 'react';
import { motion } from 'motion/react';
import IndiaMap from '../components/IndiaMap';
import StateSidebar from '../components/StateSidebar';
import { StateCode } from '../data/stateData';

const Home = () => {
  const [selectedState, setSelectedState] = useState<StateCode | null>(null);

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-navy-blue)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-white/40 text-xs uppercase tracking-[0.4em] mb-2">Project Vision</h2>
              <h1 className="text-7xl serif font-bold leading-[0.9] tracking-tight">
                Preserving the <br />
                <span className="text-saffron italic">Soul</span> of Bharat.
              </h1>
              <p className="max-w-md text-white/50 text-lg leading-relaxed font-light">
                Interactive AI-powered preservation of India's endangered folklore, regional art, and rural traditions.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <button 
                onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-white text-navy font-bold rounded-full text-xs uppercase tracking-[0.2em] transform transition-all hover:bg-saffron hover:text-black hover:scale-105"
              >
                Launch Experience
              </button>
              <div className="flex flex-col border-l border-white/10 pl-6">
                <span className="text-3xl font-bold glow-text">28+</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">States Cataloged</span>
              </div>
            </div>

            {/* Featured Trad. (Smaller text but serif accented) */}
            <div className="pt-12 space-y-4">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">Active Discovery</h3>
              <div className="glass p-5 rounded-2xl border-white/5 inline-block">
                <p className="text-sm serif italic mb-1 text-white/90">"The Legend of the Stone Chariot"</p>
                <p className="text-xs text-white/40">Heritage Story from Karnataka Hub</p>
              </div>
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            id="map-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <IndiaMap 
              onStateClick={(code) => setSelectedState(code)} 
              selectedState={selectedState} 
            />
          </motion.div>
        </div>
      </div>

      {/* State Info Sidebar */}
      <StateSidebar 
        stateCode={selectedState} 
        onClose={() => setSelectedState(null)} 
      />
    </div>
  );
};

export default Home;
