import React from 'react';
import { motion } from 'motion/react';
import { Compass, Palmtree, Map as MapIcon, Sparkles, Navigation, ArrowRight } from 'lucide-react';

const Discover = () => {
  const regions = [
    { title: 'The Royal West', state: 'Rajasthan', icon: MapIcon, color: 'text-saffron', desc: 'Forts, Palaces and Ghoomar' },
    { title: 'The Coastal South', state: 'Kerala', icon: Palmtree, color: 'text-india-green', desc: 'Backwaters, Theyyam and Spices' },
    { title: 'The Spiritual North', state: 'Uttar Pradesh', icon: Navigation, color: 'text-white', desc: 'Ganges, Kathak and Mughlai' },
    { title: 'The Vibrant East', state: 'West Bengal', icon: Sparkles, color: 'text-red-500', desc: 'Literature, Durga Puja and Baul' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero */}
        <div className="text-center space-y-6">
          <h1 className="text-8xl font-bold tracking-tighter leading-[0.8] mb-8 serif">
            Experience the <br />
            <span className="text-saffron italic">Vibrance</span> of Bharat.
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto text-sm uppercase tracking-[0.4em] font-bold">
            A curated expedition across India's cultural landscapes
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {regions.map((region, i) => (
            <motion.div
              key={region.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group relative overflow-hidden flex flex-col justify-between aspect-[3/4]"
            >
              <div className="space-y-4 relative z-10">
                <region.icon className={`w-12 h-12 ${region.color}`} />
                <h3 className="text-2xl font-bold leading-tight">{region.title}</h3>
                <p className="text-sm text-white/50">{region.desc}</p>
              </div>
              <div className="relative z-10 flex items-center justify-between mt-auto">
                <span className="text-xs font-black tracking-widest text-saffron uppercase">{region.state}</span>
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-navy-blue transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              {/* Abstract decorative shape */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Campaign Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-blue via-transparent to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop" 
            className="w-full h-48 md:h-96 object-cover group-hover:scale-105 transition-transform duration-[2s]"
            alt="Travel"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 space-y-4">
            <div className="px-4 py-1 bg-saffron rounded-full text-navy-blue text-[10px] font-black tracking-widest w-fit">2026 CAMPAIGN</div>
            <h2 className="text-5xl font-bold tracking-tighter">Beyond the Ordinary.</h2>
            <p className="text-white/70 max-w-md">Discover curated tourism paths that highlight authentic local festivals and artisanal workshops.</p>
            <button className="flex items-center gap-2 font-bold hover:gap-4 transition-all">
              Explore Campaigns <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tourism Stats */}
        <div className="grid sm:grid-cols-4 gap-8 py-10 border-y border-white/5">
          {[
            { label: 'Cultural Sites', value: '42k+' },
            { label: 'Living Traditions', value: '1.2k+' },
            { label: 'Master Artisans', value: '500+' },
            { label: 'States Explored', value: '100%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <h4 className="text-3xl font-black">{stat.value}</h4>
              <p className="text-xs text-white/30 uppercase tracking-[0.2em] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
