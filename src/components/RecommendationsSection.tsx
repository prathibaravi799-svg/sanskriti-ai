import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ARTISTS_DATA, Artist } from '../data/artists';
import { useUser } from '../context/UserContext';

const INTEREST_MAP: Record<string, string[]> = {
  dance: ['Dance', 'Kathakali', 'Mohiniyattam', 'Odissi', 'Kathak', 'Bharatanatyam', 'Bhaona', 'Garba', 'Yakshagana'],
  pottery: ['Pottery', 'Blue Pottery'],
  paintings: ['Painting', 'Madhubani', 'Pattachitra', 'Mural', 'Gond', 'Paitkar', 'Aipan', 'Thangka', 'Kalamkari', 'Rogan', 'Tanjore'],
  music: ['Music', 'Vocal', 'Sangeet', 'Folk Music', 'Mythology'],
  folklore: ['Folklore', 'Mythology', 'Puppet', 'Storytelling', 'Yakshagana'],
  textile: ['Weaving', 'Silk', 'Embroidery', 'Chikankari', 'Phulkari', 'Kantha', 'Pashmina', 'Textile'],
  tribal: ['Tribal', 'Warli', 'Gond', 'Santhal', 'Dhokra', 'Beadwork', 'Bamboo', 'Cane'],
  mythology: ['Mythology', 'Pattachitra', 'Mural', 'Madhubani', 'Yakshagana', 'Tanjore'],
};

export default function RecommendationsSection() {
  const { profile } = useUser();
  const userInterests = profile?.interests || [];

  const recommendedArtists = useMemo(() => {
    if (userInterests.length === 0) {
      // If no interests, just return some top-rated artists
      return [...ARTISTS_DATA].sort((a, b) => b.rating - a.rating).slice(0, 4);
    }

    // Filter artists based on interests
    const keywords = userInterests.flatMap(id => INTEREST_MAP[id] || []);
    
    const matches = ARTISTS_DATA.filter(artist => {
      const text = `${artist.specialization} ${artist.skills.join(' ')} ${artist.bio}`.toLowerCase();
      return keywords.some(keyword => text.includes(keyword.toLowerCase()));
    });

    // If too few matches, fill with top rated
    if (matches.length < 4) {
      const remaining = ARTISTS_DATA.filter(a => !matches.find(m => m.id === a.id))
        .sort((a, b) => b.rating - a.rating);
      return [...matches, ...remaining].slice(0, 4);
    }

    return matches.slice(0, 4);
  }, [userInterests]);

  if (userInterests.length === 0 && !profile) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-500">
            <Sparkles className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curated for you</span>
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
            Personal <span className="text-amber-500">Picks</span>
          </h2>
        </div>
        <Link 
          to="/mentors"
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors"
        >
          View All Mentors
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedArtists.map((artist, i) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] overflow-hidden hover:scale-[1.02] transition-all duration-500"
          >
            <Link to={`/artist/${artist.id}`}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={artist.avatar} 
                  alt={artist.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-500 rounded-full text-[10px] font-black text-white">
                      <Star className="w-3 h-3 fill-current" />
                      {artist.rating}
                    </div>
                    <div className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white/80 border border-white/20">
                      {artist.experience}
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tighter uppercase leading-tight">{artist.name}</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-slate-400 dark:text-white/20">
                  <MapPin className="w-3 h-3 text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{artist.state}</span>
                </div>
                <p className="text-xs font-bold text-slate-600 dark:text-white/40 line-clamp-2 leading-relaxed italic">
                  "{artist.specialization}"
                </p>
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900 dark:text-white uppercase transition-colors group-hover:text-amber-500">Learn More</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
