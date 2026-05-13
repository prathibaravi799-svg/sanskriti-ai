import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, Video, Image as ImageIcon, 
  Type, Languages, Subtitles, Wand2, 
  RefreshCw, Copy, Check, Download,
  Volume2, Music
} from 'lucide-react';

type GenType = 'script' | 'thumbnail' | 'translation' | 'subtitles' | 'voiceover';

export default function AIContentGenerator() {
  const [activeType, setActiveType] = useState<GenType>('script');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mock generation
    setTimeout(() => {
      setIsGenerating(false);
      setResult("The Whispering Banyan of Mysore is not just a tree; it's a living archive. Veera, a curious boy, discovers that its roots hold the memories of generations...");
    }, 2000);
  };

  const tools: { id: GenType; label: string; icon: any; color: string }[] = [
    { id: 'script', label: 'AI Script', icon: FileText, color: 'text-indigo-500' },
    { id: 'thumbnail', label: 'Thumbnails', icon: ImageIcon, color: 'text-rose-500' },
    { id: 'translation', label: 'Translate', icon: Languages, color: 'text-amber-500' },
    { id: 'subtitles', label: 'Captions', icon: Subtitles, color: 'text-emerald-500' },
    { id: 'voiceover', label: 'Voiceover', icon: Volume2, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 max-w-7xl mx-auto space-y-12">
       <header className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-1 w-12 bg-amber-500 rounded-full" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">Cognitive Creator Suite</p>
          </div>
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85] uppercase">
             AI <br /> <span className="text-amber-500">Multiverse</span>
          </h1>
       </header>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Tools Sidebar */}
          <div className="lg:col-span-3 space-y-4">
             {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveType(tool.id)}
                  className={`w-full flex items-center gap-4 p-6 rounded-[32px] border transition-all text-left ${
                    activeType === tool.id 
                      ? 'bg-white dark:bg-white/5 border-amber-500 shadow-xl' 
                      : 'bg-transparent border-slate-200 dark:border-white/10 hover:border-slate-400 opacity-60'
                  }`}
                >
                   <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-white/5 ${tool.color}`}>
                      <tool.icon className="w-5 h-5" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{tool.label}</span>
                </button>
             ))}
          </div>

          {/* Main Interface */}
          <div className="lg:col-span-9 space-y-8">
             <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[48px] p-10 space-y-10 relative overflow-hidden">
                <Sparkles className="absolute -top-12 -right-12 w-48 h-48 text-amber-500/5 rotate-12" />
                
                <div className="space-y-4 relative z-10">
                   <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                      Magic <span className="text-amber-500">{activeType.charAt(0).toUpperCase() + activeType.slice(1)}</span>
                   </h3>
                   <p className="text-sm text-slate-500 dark:text-white/40 max-w-xl font-medium">Describe your cultural concept. Our localized AI models understand the nuances of {activeType === 'translation' ? '30+ Indian languages' : 'Indian cultural nuances'}.</p>
                </div>

                <div className="space-y-6 relative z-10">
                   <div className="relative group">
                      <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Write a short video script about the significance of Kolam art during Pongal..." 
                        className="w-full bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 rounded-[32px] p-10 min-h-[300px] text-lg font-medium text-slate-700 dark:text-white/80 outline-none focus:border-amber-500 transition-all resize-none shadow-inner"
                      />
                      <div className="absolute bottom-6 right-6 flex gap-3">
                         <button className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-400 hover:text-amber-500 transition-colors">
                            <Wand2 className="w-5 h-5" />
                         </button>
                         <button 
                           onClick={handleGenerate}
                           disabled={isGenerating || !prompt}
                           className="flex items-center gap-3 px-10 py-4 bg-amber-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                         >
                            {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            Execute
                         </button>
                      </div>
                   </div>
                </div>

                <AnimatePresence>
                   {result && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-10 bg-indigo-600/5 border border-indigo-500/20 rounded-[40px] space-y-6 relative group"
                      >
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">AI Output Pipeline</span>
                            <div className="flex gap-2">
                               <button className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 hover:text-indigo-500 transition-all"><Copy className="w-4 h-4" /></button>
                               <button className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 hover:text-indigo-500 transition-all"><Download className="w-4 h-4" /></button>
                            </div>
                         </div>
                         <div className="text-xl font-medium text-slate-700 dark:text-white/80 leading-relaxed italic">
                            "{result}"
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>

             {/* Bottom Tips */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-indigo-600 rounded-[40px] p-8 text-white space-y-4">
                   <h4 className="text-xl font-black uppercase tracking-tighter italic">Pro Tip: Cultural Grounding</h4>
                   <p className="text-sm text-white/60 font-medium">Use specific regional terms like 'Rangoli' vs 'Kolam' to get more accurate creative outputs from the AI engine.</p>
                </div>
                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-8 space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Engine Status</span>
                   </div>
                   <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Gemini 1.5 Pro Integrated &bull; Verified</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

// Missing import fix
import { FileText } from 'lucide-react';
