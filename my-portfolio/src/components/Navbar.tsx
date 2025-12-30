'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/50 border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="font-mono text-cyan-400 font-bold text-lg cursor-pointer hover:text-cyan-300 transition-colors"
        >
          Sooraj Krishnamoorthy Manikandan
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 font-mono text-sm text-slate-400">
          <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">
            /about
          </button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-cyan-400 transition-colors">
            /experience
          </button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-cyan-400 transition-colors">
            /projects
          </button>
          <button onClick={() => scrollToSection('skills')} className="hover:text-cyan-400 transition-colors">
            /skills
          </button>
        </div>
      </div>
    </motion.nav>
  );
}