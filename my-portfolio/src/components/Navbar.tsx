'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
        className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0c] border-b border-slate-800 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-mono">
        
        {/* Left: The "Root" Prompt */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50 group-hover:bg-yellow-500 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50 group-hover:bg-green-500 transition-colors"></div>
          </div>
          <Terminal size={16} className="text-green-500" />
          <span className="text-green-500 font-bold">Sooraj Krishnamoorthy Manikandan</span>
          <span className="w-2.5 h-5 bg-green-500 animate-blink"></span>
        </div>

        {/* Right: Navigation Commands & Icons */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {['about', 'experience', 'projects', 'skills'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item)} 
              className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 group"
            >
              <span className="text-slate-600 group-hover:text-cyan-600">./</span>
              {item}
            </button>
          ))}
          
          {/* Divider */}
          <div className="h-4 w-[1px] bg-slate-800 mx-2"></div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a 
              href="https://github.com/SoorajKM1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/sooraj-krishnamoorthy-manikandan/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Resume Button */}
          <a 
            href="/Sooraj_Krishnamoorthy_Manikandan.pdf" 
            download="Sooraj_Manikandan_Resume"
            className="text-yellow-500 hover:text-yellow-400 transition-colors border border-yellow-500/30 hover:border-yellow-500 px-3 py-1 rounded bg-yellow-500/10"
          >
            resume.sh
          </a>
        </div>

        {/* Mobile Menu Icon (Placeholder) */}
        <div className="md:hidden text-green-500 animate-pulse">
           _
        </div>

      </div>
    </motion.nav>
  );
}