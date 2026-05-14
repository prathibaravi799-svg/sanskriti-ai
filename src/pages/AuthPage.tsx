import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Lock, User, Grape as Google, ChevronRight, 
  MapPin, Star, ShieldCheck, ArrowLeft, Palette, 
  Music, BookOpen, Warehouse, Users, Compass, Loader2
} from 'lucide-react';
import { useUser } from '../context/UserContext';

type AuthMode = 'login' | 'signup' | 'role' | 'success';

export default function AuthPage() {
  const navigate = useNavigate();
  const { signupWithEmail, loginWithEmail, loginWithGoogle, user, profile, updateProfile } = useUser();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await signupWithEmail(formData.email, formData.password, formData.name);
        setMode('role');
      } else {
        await loginWithEmail(formData.email, formData.password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      if (profile && !profile.role) {
        setMode('role');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectRole = async (role: 'explorer' | 'artisan') => {
    setLoading(true);
    try {
      await updateProfile({ role });
      if (role === 'explorer') {
        navigate('/onboarding');
      } else {
        navigate('/artisan-verification');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05),transparent)] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl" />

      <motion.div 
        layout
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative z-10"
      >
        <AnimatePresence mode="wait">
          {mode === 'login' || mode === 'signup' ? (
            <motion.div 
              key="auth"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              <div className="text-center mb-8">
                <motion.div 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20"
                >
                  <Palette className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-2xl font-black text-white uppercase tracking-wider">
                  {mode === 'login' ? 'Welcome Back' : 'Join Sanskriti'}
                </h1>
                <p className="text-slate-400 text-sm mt-2">
                  Connect with India's rich artistic heritage
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4" />
                  {error}
                </div>
              )}

              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        required
                        type="text"
                        placeholder="Arjun Sharma"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      required
                      type="email"
                      placeholder="name@example.com"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      required
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        required
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black py-4 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === 'login' ? 'Login' : 'Create Account')}
                </button>
              </form>

              <div className="mt-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase font-black text-slate-600">
                    <span className="bg-slate-900 px-4">Or continue with</span>
                  </div>
                </div>

                <button 
                  onClick={handleGoogleLogin}
                  className="w-full bg-slate-800 border border-slate-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-750 transition-all"
                >
                  <Google className="w-5 h-5 text-amber-500" />
                  Google Account
                </button>
              </div>

              <div className="mt-8 text-center text-sm">
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-slate-400 hover:text-amber-500 transition-colors font-medium"
                >
                  {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="role"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-white uppercase tracking-wider">How will you use Sanskriti?</h1>
                <p className="text-slate-400 text-sm mt-2">Choose your path in our cultural ecosystem</p>
              </div>

              <div className="grid gap-4">
                <button 
                  onClick={() => selectRole('explorer')}
                  className="group p-6 bg-slate-800/50 border border-slate-700 rounded-3xl text-left hover:border-amber-500 transition-all hover:bg-amber-500/5 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <Compass className="w-10 h-10 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-white mb-2">Explore & Learn</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Discover art forms, watch tutorials, shop authentic crafts, and explore Indian folklore.
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-6 h-6 text-amber-500" />
                  </div>
                </button>

                <button 
                  onClick={() => selectRole('artisan')}
                  className="group p-6 bg-slate-800/50 border border-slate-700 rounded-3xl text-left hover:border-orange-500 transition-all hover:bg-orange-500/5 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <Warehouse className="w-10 h-10 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-white mb-2">Become a Mentor</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Share your traditional expertise, teach live workshops, and reach a global audience.
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-6 h-6 text-orange-500" />
                  </div>
                </button>
              </div>
              
              <button 
                onClick={() => setMode('signup')}
                className="w-full mt-6 flex items-center justify-center gap-2 text-xs font-black text-slate-500 uppercase hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Change Login Details
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
