import React, { createContext, useContext, useState, useEffect } from 'react';
import { Review } from '../data/products';

interface UserContextType {
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
  const [exploredStates, setExploredStates] = useState<string[]>(() => {
    const saved = localStorage.getItem('sanskriti-explored');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('sanskriti-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<{ id: string; quantity: number }[]>(() => {
    const saved = localStorage.getItem('sanskriti-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [localReviews, setLocalReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('sanskriti-reviews');
    return saved ? JSON.parse(saved) : {};
  });

  const [streak, setStreak] = useState(() => {
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
    localStorage.setItem('sanskriti-explored', JSON.stringify(exploredStates));
  }, [exploredStates]);

  useEffect(() => {
    localStorage.setItem('sanskriti-streak', streak.toString());
    localStorage.setItem('sanskriti-last-visit', new Date().toDateString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('sanskriti-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('sanskriti-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sanskriti-reviews', JSON.stringify(localReviews));
  }, [localReviews]);

  useEffect(() => {
    localStorage.setItem('sanskriti-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleExplored = (stateId: string) => {
    setExploredStates(prev => 
      prev.includes(stateId) ? prev : [...prev, stateId]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `r-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setLocalReviews(prev => ({
      ...prev,
      [productId]: [newReview, ...(prev[productId] || [])]
    }));
  };

  const isStateExplored = (stateId: string) => exploredStates.includes(stateId);

  return (
    <UserContext.Provider value={{ 
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
