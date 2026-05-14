import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  User as FirebaseUser, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { Review } from '../data/products';

export type UserRole = 'explorer' | 'artisan' | 'admin';

interface UserProfile {
  uid: string;
  email: string | null;
  name: string | null;
  role: UserRole;
  interests: string[];
  photoURL: string | null;
  wishlist: string[];
  exploredStates: string[];
  enrolledClasses: string[];
  achievements: string[];
  createdAt: any;
}

interface UserContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  signupWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  exploredStates: string[];
  toggleExplored: (stateId: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  cart: { id: string; quantity: number }[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  localReviews: Record<string, Review[]>;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  streak: number;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  isStateExplored: (stateId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [exploredStates, setExploredStates] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);

  const [localReviews, setLocalReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('sanskriti-reviews');
    return saved ? JSON.parse(saved) : {};
  });

  const [streak] = useState(() => {
    const saved = localStorage.getItem('sanskriti-streak');
    const lastVisit = localStorage.getItem('sanskriti-last-visit');
    const today = new Date().toDateString();
    
    if (lastVisit === today) return Number(saved) || 0;
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastVisit === yesterday.toDateString()) {
      return (Number(saved) || 0) + 1;
    }
    
    return 1;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sanskriti-theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('sanskriti-streak', streak.toString());
    localStorage.setItem('sanskriti-last-visit', new Date().toDateString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('sanskriti-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userDoc = doc(db, 'users', u.uid);
        const snapshot = await getDoc(userDoc);
        
        if (!snapshot.exists()) {
          const newProfile: UserProfile = {
            uid: u.uid,
            email: u.email,
            name: u.displayName,
            role: 'explorer', // default
            interests: [],
            photoURL: u.photoURL,
            wishlist: [],
            exploredStates: [],
            enrolledClasses: [],
            achievements: [],
            createdAt: serverTimestamp()
          };
          await setDoc(userDoc, newProfile);
          setProfile(newProfile);
        } else {
          setProfile(snapshot.data() as UserProfile);
        }

        // Real-time sync for profile and cart
        const unsubProfile = onSnapshot(userDoc, (doc) => {
          if (doc.exists()) {
            const data = doc.data() as UserProfile;
            setProfile(data);
            setWishlist(data.wishlist || []);
            setExploredStates(data.exploredStates || []);
          }
        });

        const cartDoc = doc(db, 'carts', u.uid);
        const unsubCart = onSnapshot(cartDoc, (doc) => {
          if (doc.exists()) {
            setCart(doc.data().items || []);
          }
        });

        return () => {
          unsubProfile();
          unsubCart();
        };
      } else {
        setProfile(null);
        setExploredStates([]);
        setWishlist([]);
        setCart([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signupWithEmail = async (email: string, pass: string, name: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    await updateFirebaseProfile(res.user, { displayName: name });
    
    const newProfile: UserProfile = {
      uid: res.user.uid,
      email,
      name,
      role: 'explorer',
      interests: [],
      photoURL: null,
      wishlist: [],
      exploredStates: [],
      enrolledClasses: [],
      achievements: [],
      createdAt: serverTimestamp()
    };
    await setDoc(doc(db, 'users', res.user.uid), newProfile);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
    }
  };

  const toggleExplored = (stateId: string) => {
    const newExplored = exploredStates.includes(stateId) ? exploredStates.filter(id => id !== stateId) : [...exploredStates, stateId];
    setExploredStates(newExplored);
    if (user) updateProfile({ exploredStates: newExplored });
  };

  const toggleWishlist = (productId: string) => {
    const newWishlist = wishlist.includes(productId) 
      ? wishlist.filter(id => id !== productId) 
      : [...wishlist, productId];
    setWishlist(newWishlist);
    if (user) updateProfile({ wishlist: newWishlist });
  };

  const addToCart = async (productId: string) => {
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const snapshot = await getDoc(cartRef);
      let items = snapshot.exists() ? snapshot.data().items || [] : [];
      
      const existing = items.find((item: any) => item.id === productId);
      if (existing) {
        items = items.map((item: any) => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        items.push({ id: productId, quantity: 1 });
      }
      
      await setDoc(cartRef, { userId: user.uid, items, updatedAt: serverTimestamp() });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const snapshot = await getDoc(cartRef);
      if (snapshot.exists()) {
        const items = (snapshot.data().items || []).filter((item: any) => item.id !== productId);
        await setDoc(cartRef, { items, updatedAt: serverTimestamp() }, { merge: true });
      }
    }
  };

  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `r-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setLocalReviews(prev => {
      const updated = {
        ...prev,
        [productId]: [newReview, ...(prev[productId] || [])]
      };
      localStorage.setItem('sanskriti-reviews', JSON.stringify(updated));
      return updated;
    });
  };

  const isStateExplored = (stateId: string) => exploredStates.includes(stateId);

  return (
    <UserContext.Provider value={{ 
      user,
      profile,
      loading,
      loginWithGoogle,
      signupWithEmail,
      loginWithEmail,
      logout,
      updateProfile,
      exploredStates, 
      toggleExplored, 
      wishlist,
      toggleWishlist,
      cart,
      addToCart,
      removeFromCart,
      localReviews,
      addReview,
      streak, 
      theme, 
      setTheme,
      isStateExplored 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
