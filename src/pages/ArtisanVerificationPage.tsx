import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Upload, FileText, MapPin, 
  Briefcase, Camera, Video, Clock, CheckCircle2,
  AlertCircle, ChevronRight, ArrowLeft, Loader2, Sparkles
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

export default function ArtisanVerificationPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    specialization: '',
    experience: '',
    state: '',
    district: '',
    description: ''
  });

  const [files, setFiles] = useState<{
    govId: File | null;
    portfolio: File[];
    video: File | null;
  }>({
    govId: null,
    portfolio: [],
    video: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'govId' | 'portfolio' | 'video') => {
    if (e.target.files) {
      if (type === 'portfolio') {
        setFiles(prev => ({ ...prev, portfolio: [...prev.portfolio, ...Array.from(e.target.files!)] }));
      } else {
        setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    
    try {
      // 1. Upload Gov ID
      let govIdUrl = '';
      if (files.govId) {
        const govRef = ref(storage, `verifications/${user.uid}/gov_id_${Date.now()}_${files.govId.name}`);
        const snap = await uploadBytes(govRef, files.govId);
        govIdUrl = await getDownloadURL(snap.ref);
      }

      // 2. Upload Portfolio
      const portfolioUrls = [];
      for (const file of files.portfolio) {
        const pRef = ref(storage, `verifications/${user.uid}/portfolio_${Date.now()}_${file.name}`);
        const snap = await uploadBytes(pRef, file);
        const url = await getDownloadURL(snap.ref);
        portfolioUrls.push(url);
      }

      // 3. Upload Video
      let videoUrl = '';
      if (files.video) {
        const vRef = ref(storage, `verifications/${user.uid}/sample_video_${Date.now()}_${files.video.name}`);
        const snap = await uploadBytes(vRef, files.video);
        videoUrl = await getDownloadURL(snap.ref);
      }

      // 4. Save to Firestore
      await addDoc(collection(db, 'artisanApplications'), {
        uid: user.uid,
        name: formData.fullName,
        specialization: formData.specialization,
        experience: formData.experience,
        state: formData.state,
        district: formData.district,
        description: formData.description,
        governmentIdUrl: govIdUrl,
        portfolioImages: portfolioUrls,
        sampleVideoUrl: videoUrl,
        verificationStatus: 'pending',
        submittedAt: serverTimestamp()
      });

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-900 border border-slate-800 p-12 rounded-3xl text-center"
        >
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Verification under review</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Thank you for applying to be a mentor! Our expert panel is reviewing your portfolio. You'll be notified within 48 hours.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-slate-800 text-white font-black py-4 rounded-xl hover:bg-slate-750 transition-all border border-slate-700"
          >
            Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6 font-black uppercase tracking-widest text-[10px] text-orange-500">
            <ShieldCheck className="w-3 h-3" />
            Mentor Onboarding
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-4">Arisan Verification</h1>
          <p className="text-slate-500">Share your expertise and help preserve India's cultural heritage</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Info */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <FileText className="w-5 h-5 text-orange-500" />
              Professional Background
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="Master Artisan Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">Art Specialization</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="e.g. Madhubani Painting"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">Years of Experience</label>
                <input 
                  required
                  type="number" 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="10"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase">State of Origin</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="e.g. Bihar"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase">About your craft</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                placeholder="Describe your journey, techniques, and the heritage you represent..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          {/* Section 2: Verification Documents */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              Document Verification
            </h3>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shrink-0">
                  <FileText className="w-8 h-8 text-slate-500" />
                </div>
                <div className="grow">
                  <h4 className="text-white font-bold mb-1">Government ID</h4>
                  <p className="text-xs text-slate-500">Aadhar, PAN or Passport (PDF/JPG)</p>
                </div>
                <label className="px-6 py-2 bg-slate-800 text-white text-xs font-black uppercase tracking-widest rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
                  Upload ID
                  <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, 'govId')} />
                </label>
                {files.govId && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shrink-0">
                  <Camera className="w-8 h-8 text-slate-500" />
                </div>
                <div className="grow">
                  <h4 className="text-white font-bold mb-1">Portfolio Images</h4>
                  <p className="text-xs text-slate-500">Showcase your best work (Max 5 images)</p>
                  {files.portfolio.length > 0 && <p className="text-[10px] text-orange-500 mt-1 font-bold uppercase">{files.portfolio.length} files selected</p>}
                </div>
                <label className="px-6 py-2 bg-slate-800 text-white text-xs font-black uppercase tracking-widest rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
                  Choose Images
                  <input type="file" className="hidden" multiple accept="image/*" onChange={(e) => handleFileChange(e, 'portfolio')} />
                </label>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shrink-0">
                  <Video className="w-8 h-8 text-slate-500" />
                </div>
                <div className="grow">
                  <h4 className="text-white font-bold mb-1">Workshop Sample</h4>
                  <p className="text-xs text-slate-500">A short video showing you at work (Max 20MB)</p>
                </div>
                <label className="px-6 py-2 bg-slate-800 text-white text-xs font-black uppercase tracking-widest rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
                  Upload Video
                  <input type="file" className="hidden" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} />
                </label>
                {files.video && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all text-xl uppercase tracking-widest flex items-center justify-center gap-4"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Submit for Verification'}
            {!loading && <ChevronRight className="w-6 h-6" />}
          </button>
        </form>
      </div>
    </div>
  );
}
