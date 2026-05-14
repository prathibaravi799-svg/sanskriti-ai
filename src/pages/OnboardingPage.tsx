import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Palette, Music, BookOpen, Users, Compass, 
  ChevronRight, Check, Star, Globe, ShieldCheck,
  Theater, ScrollText, Sparkles, Gem
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const INTERESTS = [
  { id: 'dance', label: 'Classical Dance', icon: Theater, color: 'bg-rose-500' },
  { id: 'pottery', label: 'Traditional Pottery', icon: Gem, color: 'bg-orange-500' },
  { id: 'paintings', label: 'Indigenous Paintings', icon: Palette, color: 'bg-amber-500' },
  { id: 'music', label: 'Indian Music', icon: Music, color: 'bg-emerald-500' },
  { id: 'folklore', label: 'Folklore & Legends', icon: BookOpen, color: 'bg-sky-500' },
  { id: 'textile', label: 'Textile Arts', icon: ScrollText, color: 'bg-indigo-500' },
  { id: 'tribal', label: 'Tribal Arts', icon: Users, color: 'bg-violet-500' },
  { id: 'mythology', label: 'Indian Mythology', icon: Sparkles, color: 'bg-fuchsia-500' },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { updateProfile } = useUser();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    try {
      await updateProfile({ interests: selected });
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] -ml-40 -mb-40" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 transition-all">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Personalizing Sanskriti</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Tell us what <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">moves</span> you
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Choose at least one interest to help us personalize your cultural journey with expert-led workshops and authentic stories.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {INTERESTS.map((item, index) => {
            const isSelected = selected.includes(item.id);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleInterest(item.id)}
                className={`
                  p-6 rounded-3xl border-2 text-left transition-all relative group overflow-hidden
                  ${isSelected ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}
                `}
              >
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg">{item.label}</h3>
                
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-amber-500 rounded-full p-1 shadow-lg"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
                
                <div className={`
                  absolute bottom-0 left-0 h-1 bg-amber-50 transition-all duration-500
                  ${isSelected ? 'w-full' : 'w-0'}
                `} />
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            disabled={selected.length === 0 || loading}
            onClick={handleFinish}
            className={`
              px-12 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 transition-all
              ${selected.length > 0 
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
            `}
          >
            {loading ? 'Finalizing...' : 'Start Exploring'}
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            {selected.length} selection{selected.length !== 1 ? 's' : ''} made
          </p>
        </motion.div>
      </div>
    </div>
  );
}
