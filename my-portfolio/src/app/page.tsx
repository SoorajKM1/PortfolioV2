'use client';

import { motion } from 'framer-motion';
import { Terminal, Github, ExternalLink, Mail, ShieldCheck, Cpu, Brain, Activity } from 'lucide-react';
import HeroScene from '@/components/HeroScene';
import SkillsScene from '@/components/SkillsScene';

const projects = [
  {
    title: "Python HIDS",
    description: "A Host-Based Intrusion Detection System for Linux. Features multi-threaded file integrity monitoring (FIM) and log analysis to detect SSH brute-force attacks in real-time.",
    tags: ["Python", "Linux", "Security", "Threading"],
    link: "https://github.com/SoorajKM1/Host-Based-Intrusion-Detection-System-HIDS-",
    icon: <ShieldCheck className="text-cyan-400 w-8 h-8 mb-4" />
  },
  {
    title: "Life-Link-Live",
    description: "Emergency response web app designed for natural disasters. Focuses on rapid accessibility and clear user flows to help users access critical resources under stress.",
    tags: ["React", "Emergency Response", "UX Design"],
    link: "https://github.com/SoorajKM1/MEC--2025",
    icon: <Activity className="text-red-400 w-8 h-8 mb-4" />
  },
  {
    title: "AuxiHelper",
    description: "AI-driven platform connecting users with service providers. Uses Cohere APIs and Google Cloud Vision to analyze user files and provide intelligent solution matching.",
    tags: ["Python", "Cohere API", "Google Cloud", "AI"],
    link: "https://github.com/SoorajKM1/AuxiHelper",
    icon: <Brain className="text-purple-400 w-8 h-8 mb-4" />
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Overlay Content */}
        <div className="z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-cyan-400 font-mono text-xs tracking-wider">SYSTEM ONLINE</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              SOORAJ KRISHNAMOORTHY MANIKANDAN
            </h1>
            
            <p className="font-mono text-cyan-200/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              CS Student @ McMaster University <br/>
              <span className="text-slate-400 text-sm">Specializing in Cybersecurity & Full Stack Development</span>
            </p>
          </motion.div>

          {/* Interactive Buttons */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="pointer-events-auto flex gap-4 justify-center"
          >
            <a href="#experience" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
              View Experience
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="py-24 px-6 md:px-12 relative z-10 bg-slate-950 border-b border-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-mono text-cyan-400 mb-12 flex items-center gap-4">
            <span className="text-slate-600">01.</span> /experience_log
          </h2>

          <div className="relative border-l border-slate-800 ml-3 pl-8 pb-12 space-y-8">
            {/* CGI Experience */}
            <div className="relative">
              <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-slate-950 bg-cyan-500"></span>
              <h3 className="text-2xl font-bold text-slate-100">Cybersecurity Intern (Co-op)</h3>
              <p className="text-cyan-400 font-mono text-sm mb-4">CGI Inc. | May 2025 - Aug 2025</p>
              <ul className="space-y-2 text-slate-400 list-disc list-inside">
                <li>Monitored and triaged security alerts using <strong>IBM QRadar</strong>, identifying threats per SOC protocols.</li>
                <li>Conducted first-level investigations by filtering false positives and analyzing logs.</li>
                <li>Documented incident details to ensure smooth handover to L2 analysts.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 px-6 md:px-12 relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-mono text-cyan-400 mb-12 flex items-center gap-4">
            <span className="text-slate-600">02.</span> /projects
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

      {/*SKILLS & CONTACT SECTION*/}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: 3D Cloud */}
          <div className="h-[400px] lg:h-[600px] bg-slate-900/20 rounded-2xl border border-slate-800 overflow-hidden relative">
             <div className="absolute top-4 left-4 z-10">
                <h2 className="text-2xl font-mono text-cyan-400">
                  <span className="text-slate-600">03.</span> /stack_database
                </h2>
             </div>
             <SkillsScene />
          </div>

          {/* Right: Terminal Contact Form */}
          <div>
            <h2 className="text-3xl font-mono text-cyan-400 mb-8">
              <span className="text-slate-600">04.</span> /contact_uplink
            </h2>
            
            <div className="w-full bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-slate-700 font-mono text-sm">
              <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-4 text-slate-400 text-xs">sooraj@portfolio:~</div>
              </div>

              <div className="p-6 text-slate-300 space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-cyan-500">$ input_email --set</label>
                  <input type="email" placeholder="joesooraj@gmail.com" className="bg-transparent border-b border-slate-600 focus:border-cyan-500 outline-none py-1 w-full text-slate-200" />
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

      <footer className="py-8 text-center text-slate-600 font-mono text-xs border-t border-slate-900 bg-slate-950">
        <p>Built with Next.js + React Three Fiber.</p>
        <p>© {new Date().getFullYear()} Sooraj Krishnamoorthy Manikandan. All systems operational.</p>
      </footer>

    </main>
  );
}