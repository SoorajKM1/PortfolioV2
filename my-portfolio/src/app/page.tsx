'use client';

import { motion } from 'framer-motion';
import { Terminal, Github, ExternalLink, Mail, ShieldCheck, Cpu } from 'lucide-react';
import HeroScene from '@/components/HeroScene';
import SkillsScene from '@/components/SkillsScene';

const projects = [
  {
    title: "Python HIDS",
    description: "A lightweight, multi-threaded Host-Based Intrusion Detection System. Monitors Linux environments for unauthorized file modifications and brute-force attempts.",
    tags: ["Python", "Linux", "Security", "Threading"],
    link: "#",
    icon: <ShieldCheck className="text-cyan-400 w-8 h-8 mb-4" />
  },
  {
    title: "Secure Chat App",
    description: "End-to-end encrypted messaging application built with React and Socket.io, featuring AES-256 encryption for all data in transit.",
    tags: ["React", "Node.js", "Cryptography"],
    link: "#",
    icon: <Terminal className="text-green-400 w-8 h-8 mb-4" />
  },
  {
    title: "Custom PC Build Picker",
    description: "An interactive hardware compatibility checker for PC builders, utilizing a scraped database of GPU/CPU specifications.",
    tags: ["Next.js", "SQL", "Hardware"],
    link: "#",
    icon: <Cpu className="text-purple-400 w-8 h-8 mb-4" />
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Overlay Content */}
        <div className="z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-cyan-400 font-mono text-xs tracking-wider">SYSTEM ONLINE</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              [YOUR NAME]
            </h1>
            
            <p className="font-mono text-cyan-200/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              {`> Cybersecurity Analyst & Developer`} <br/>
              {`> Building secure digital infrastructure.`}
            </p>
          </motion.div>

          {/* Interactive Buttons (Enable pointer events) */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="pointer-events-auto flex gap-4 justify-center"
          >
            <a href="#projects" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
              Initialize_Projects
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 px-6 md:px-12 relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-mono text-cyan-400 mb-12 flex items-center gap-4">
            <span className="text-slate-600">01.</span> /projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all hover:bg-slate-900/80 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {project.icon}
                
                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-cyan-200 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-900/50">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href={project.link} className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
                  <a href={project.link} className="text-slate-400 hover:text-white transition-colors"><ExternalLink size={20} /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SKILLS & CONTACT SECTION --- */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: 3D Cloud */}
          <div className="h-[400px] lg:h-[600px] bg-slate-900/20 rounded-2xl border border-slate-800 overflow-hidden relative">
             <div className="absolute top-4 left-4 z-10">
                <h2 className="text-2xl font-mono text-cyan-400">
                  <span className="text-slate-600">02.</span> /stack_database
                </h2>
             </div>
             <SkillsScene />
          </div>

          {/* Right: Terminal Contact Form */}
          <div>
            <h2 className="text-3xl font-mono text-cyan-400 mb-8">
              <span className="text-slate-600">03.</span> /contact_uplink
            </h2>
            
            <div className="w-full bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-slate-700 font-mono text-sm">
              {/* Terminal Header */}
              <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-4 text-slate-400 text-xs">user@portfolio:~</div>
              </div>

              {/* Terminal Body (Form) */}
              <div className="p-6 text-slate-300 space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-cyan-500">$ input_email --set</label>
                  <input type="email" placeholder="enter_email@address.com" className="bg-transparent border-b border-slate-600 focus:border-cyan-500 outline-none py-1 w-full text-slate-200" />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-cyan-500">$ input_message --write</label>
                  <textarea rows={4} placeholder="_" className="bg-transparent border-b border-slate-600 focus:border-cyan-500 outline-none py-1 w-full text-slate-200 resize-none"></textarea>
                </div>

                <button className="mt-4 px-4 py-2 bg-slate-700 hover:bg-cyan-600 hover:text-white text-cyan-400 rounded border border-slate-600 transition-all flex items-center gap-2 w-max">
                  <Mail size={16} />
                  execute_send()
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-slate-600 font-mono text-xs border-t border-slate-900 bg-slate-950">
        <p>Built with Next.js + React Three Fiber. Security First.</p>
        <p>© {new Date().getFullYear()} [Your Name]. All systems operational.</p>
      </footer>

    </main>
  );
}