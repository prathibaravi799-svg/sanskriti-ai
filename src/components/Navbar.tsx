import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Compass, BookOpen, Users, Info, Map as MapIcon, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Discover', path: '/', icon: MapIcon },
    { name: 'Folklore', path: '/stories', icon: BookOpen },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Explore', path: '/discover', icon: Compass },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-8 h-20 rounded-2xl shadow-2xl">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-lg transition-transform duration-500 group-hover:rotate-12">
            <div className="w-full h-full border-2 border-navy rounded-full flex items-center justify-center relative">
              <div className="w-1.5 h-1.5 bg-navy rounded-full" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tighter serif uppercase">
            Sanskriti <span className="text-saffron">AI</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "nav-item-hover text-sm font-medium uppercase tracking-widest transition-all duration-300 flex items-center gap-2",
                isActive ? "text-saffron" : "text-white/60 hover:text-white"
              )}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Sign In Button */}
        <button className="hidden md:block px-8 py-2.5 bg-saffron text-black font-bold rounded-full text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300">
          Sign In
        </button>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-24 left-6 right-6 glass p-6 rounded-2xl shadow-2xl z-40"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 p-3 rounded-xl transition-all duration-300",
                  isActive ? "bg-white/10 text-saffron" : "text-white/70"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
