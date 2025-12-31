'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Mail, ShieldCheck, Activity, Brain, Download, User, Terminal, Search, ChevronDown, ChevronUp, Loader2, CheckCircle } from 'lucide-react';
import HeroScene from '@/components/HeroScene';
import Navbar from '@/components/Navbar';
import StarBackground from '@/components/StarBackground';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Import Brand Icons
import { FaPython, FaJava, FaReact, FaLinux, FaGitAlt, FaDocker, FaHtml5, FaShieldAlt } from 'react-icons/fa';
import { SiC, SiJavascript, SiTypescript, SiMetasploit, SiKalilinux, SiWireshark, SiPostgresql, SiTailwindcss } from 'react-icons/si';

// --- Advanced Looping Typewriter ---
const LoopingTypewriter = ({ phrases, typeSpeed = 100, deleteSpeed = 50, pauseDuration = 2000 }: { phrases: string[], typeSpeed?: number, deleteSpeed?: number, pauseDuration?: number }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(typeSpeed);

  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];

    const handleType = () => {
      setText(current => 
        isDeleting ? fullText.substring(0, current.length - 1) : fullText.substring(0, current.length + 1)
      );
      setTypingSpeed(isDeleting ? deleteSpeed : typeSpeed);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typeSpeed, deleteSpeed, pauseDuration, typingSpeed]);

  return <span className="text-cyan-400">{text}<span className="animate-blink">|</span></span>;
};

// --- Simple Typewriter (For Name) ---
const SimpleTypewriter = ({ text, delay = 100 }: { text: string, delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

// --- Projects Data ---
const projects = [
  {
    title: "Python HIDS",
    description: "A Host-Based Intrusion Detection System for Linux. Features multi-threaded file integrity monitoring (FIM) and log analysis to detect SSH brute-force attacks in real-time.",
    tags: ["Python", "Linux", "Security", "Threading"],
    repoLink: "https://github.com/SoorajKM1/Host-Based-Intrusion-Detection-System-HIDS-", 
    demoLink: null, 
    icon: <ShieldCheck className="text-cyan-400 w-8 h-8 mb-4" />
  },
  {
    title: "Life-Link-Live",
    description: "Emergency response web app designed for natural disasters. Focuses on rapid accessibility and clear user flows to help users access critical resources under stress.",
    tags: ["React", "Emergency Response", "UX Design"],
    repoLink: "https://github.com/SoorajKM1/MEC--2025", 
    demoLink: "https://life-link-live.vercel.app/", 
    icon: <Activity className="text-red-400 w-8 h-8 mb-4" />
  },
  {
    title: "AuxiHelper",
    description: "AI-driven platform connecting users with service providers. Uses Cohere APIs and Google Cloud Vision to analyze user files and provide intelligent solution matching.",
    tags: ["Python", "Cohere API", "Google Cloud", "AI"],
    repoLink: "https://github.com/SoorajKM1/AuxiHelper",
    demoLink: null,
    icon: <Brain className="text-purple-400 w-8 h-8 mb-4" />
  },
  {
    title: "MacFind (HCI Project)",
    description: "A frontend lost-and-found application for McMaster University. Applied human-centered design principles and usability heuristics to create an accessible interface.",
    tags: ["React", "HCI", "UX Heuristics", "Frontend"],
    repoLink: "#", 
    demoLink: null,
    icon: <Search className="text-yellow-400 w-8 h-8 mb-4" />
  }
];

// --- Skills Data ---
const skills = [
  { name: "Python", icon: <FaPython />, color: "#fbbf24" }, 
  { name: "C Language", icon: <SiC />, color: "#3b82f6" }, 
  { name: "JavaScript", icon: <SiJavascript/>, color: "#fbbf24" }, 
  { name: "React", icon: <FaReact />, color: "#22d3ee" }, 
  { name: "TypeScript", icon: <SiTypescript />, color: "#3b82f6" }, 
  { name: "Metasploit", icon: <SiMetasploit />, color: "#ffffff" }, 
  { name: "Linux", icon: <FaLinux />, color: "#fbbf24" }, 
  { name: "Kali", icon: <SiKalilinux />, color: "#3b82f6" }, 
  { name: "QRadar", icon: <FaShieldAlt />, color: "#10b981" }, 
  { name: "Wireshark", icon: <SiWireshark />, color: "#0ea5e9" }, 
  { name: "SQL", icon: <SiPostgresql />, color: "#3b82f6" }, 
  { name: "Git", icon: <FaGitAlt />, color: "#ef4444" }, 
  { name: "Docker", icon: <FaDocker />, color: "#0ea5e9" }, 
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#22d3ee" }, 
  { name: "HTML5", icon: <FaHtml5 />, color: "#f97316" }, 
];

export default function Home() {
  // State for Projects "Load More"
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

  // State for Contact Form
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // --- DUAL SUBMISSION HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Parallel Execution: Send to Discord AND Formspree at the same time
      const [discordRes, formspreeRes] = await Promise.all([
        // 1. Send to Discord (via your API route)
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }),
        // 2. Send to Formspree
        fetch('https://formspree.io/f/xojqgaqb', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formData),
        })
      ]);

      // If EITHER works, we call it a success for the user (logging errors internally if needed)
      if (discordRes.ok || formspreeRes.ok) {
        setStatus('success');
        setFormData({ email: '', message: '' }); // Clear form
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 relative">
      
      <Navbar />
      <StarBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">
        <HeroScene />
        
        <div className="z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-green-400 font-mono text-xs tracking-wider">SYSTEM ONLINE</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent min-h-[80px]">
              <SimpleTypewriter text="Hi! I'm Sooraj!" delay={100} />
            </h1>
            
            <div className="font-mono text-slate-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto min-h-[100px]">
              CS Student @ McMaster University <br/>
              
              <span className="text-lg block mt-2">
                Specializing in <strong className="text-cyan-400 font-bold tracking-wide">Cybersecurity</strong>
              </span>

              <span className="text-lg block mt-1">
                Passionate about{' '}
                <LoopingTypewriter 
                  phrases={[
                    "Full Stack Development", 
                    "Data Analysis", 
                    "Artificial Intelligence", 
                    "Machine Learning"
                  ]} 
                />
              </span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="pointer-events-auto flex gap-4 justify-center"
          >
            <a href="#about" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
              Initialize Profile
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section id="about" className="py-24 px-6 md:px-12 relative z-10 bg-transparent border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Left: Headshot */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-4 flex justify-center md:justify-end"
            >
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-[0_0_40px_rgba(6,182,212,0.1)] group bg-slate-900/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-600">
                       <User size={64} />
                    </div>
                    <Image 
                        src="/headshot.png" 
                        alt="Sooraj K. Manikandan" 
                        fill
                        className="object-cover relative z-10 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-cyan-500/10 z-20 mix-blend-overlay"></div>
                </div>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-8 space-y-6 bg-slate-900/20 backdrop-blur-sm p-8 rounded-2xl border border-slate-800/50"
            >
                <h2 className="text-3xl font-mono text-cyan-400 flex items-center gap-3">
                    <span className="text-slate-600">01.</span> /whoami
                </h2>
                
                <div className="text-slate-400 text-lg leading-relaxed space-y-4">
                    <p>
                        I’m a third-year Computer Science student with a strong passion for technology, especially in <strong className="text-slate-200">cybersecurity, data analysis, and AI/ML</strong>.
                    </p>
                    <p>
                        This past summer, I interned with <strong className="text-slate-200">CGI’s Security Operations Center (SOC)</strong>, gaining real-world exposure to how cybersecurity teams operate. It was a great experience that allowed me to apply concepts from class and self-study to practical situations.
                    </p>
                    <p>
                        I am currently working towards earning industry-level certifications in <strong className="text-cyan-400">Cybersecurity</strong> to further validate my skills and expertise in the domain.
                    </p>
                    <p>
                        Beyond security, I’m fascinated by how data tells stories and how AI creates new solutions. I’m always eager to learn—whether it’s experimenting with projects, picking up new tools, or tackling challenges that push me to think differently.
                    </p>
                    <p className="italic text-slate-500 border-l-2 border-cyan-500/50 pl-4">
                        If you’re into tech, data, AI, or security and want to chat, I’d love to hear from you.
                    </p>
                </div>

                <div className="pt-4">
                    <a 
                        href="/resume.pdf" 
                        download="Sooraj_Manikandan_Resume"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 hover:border-cyan-500 rounded transition-all group"
                    >
                        <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                        Download Resume
                    </a>
                </div>
            </motion.div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="py-24 px-6 md:px-12 relative z-10 bg-transparent border-b border-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-mono text-cyan-400 mb-12 flex items-center gap-4">
            <span className="text-slate-600">02.</span> /experience_log
          </h2>

          <div className="relative border-l border-slate-800 ml-3 pl-8 pb-12 space-y-8">
            <div className="relative group bg-slate-900/20 backdrop-blur-sm p-6 rounded-xl border border-slate-800/50 hover:border-cyan-500/30 transition-all">
              <span className="absolute -left-[41px] top-8 w-5 h-5 rounded-full border-4 border-slate-950 bg-slate-700 group-hover:bg-cyan-500 transition-colors"></span>
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
      <section id="projects" className="py-24 px-6 md:px-12 relative z-10 bg-transparent border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-mono text-cyan-400 mb-12 flex items-center gap-4">
            <span className="text-slate-600">03.</span> /projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {visibleProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-6 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 transition-all hover:bg-slate-900/60 backdrop-blur-sm flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {project.icon}
                
                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-cyan-200 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-900/50">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto relative z-20">
                  {project.repoLink && (
                    <a 
                      href={project.repoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-mono group/link"
                    >
                      <Github size={18} />
                      <span className="group-hover/link:underline">Repo</span>
                    </a>
                  )}
                  
                  {project.demoLink && (
                      <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-mono group/link"
                    >
                      <ExternalLink size={18} />
                      <span className="group-hover/link:underline">Live Demo</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {projects.length > 3 && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900/50 hover:bg-slate-800 text-cyan-400 border border-slate-700 hover:border-cyan-500 rounded-full transition-all group"
              >
                {showAllProjects ? (
                  <>
                    <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                    Collapse
                  </>
                ) : (
                  <>
                    <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                    View More Projects
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- SKILLS & CONTACT SECTION --- */}
      <section id="skills" className="py-24 relative z-10 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* 1. SKILLS */}
          <div className="mb-24">
             <h2 className="text-3xl font-mono text-cyan-400 mb-12 flex items-center gap-4">
                <span className="text-slate-600">04.</span> /stack_database
             </h2>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
               {skills.map((skill, idx) => (
                 <motion.div
                   key={idx}
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.05 }}
                   className="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-900/80 backdrop-blur-sm transition-all group"
                 >
                   <div 
                     className="text-4xl transition-transform duration-300 group-hover:scale-110"
                     style={{ color: skill.color, filter: `drop-shadow(0 0 8px ${skill.color}80)` }}
                   >
                     {skill.icon}
                   </div>
                   <span className="text-slate-400 text-sm font-mono group-hover:text-slate-200">
                     {skill.name}
                   </span>
                 </motion.div>
               ))}
             </div>
          </div>

          {/* 2. CONTACT */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-mono text-cyan-400 mb-8 flex items-center justify-center gap-4">
              <span className="text-slate-600">05.</span> /contact_uplink
            </h2>
            
            <div className="w-full bg-[#1e1e1e]/90 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden border border-slate-700 font-mono text-sm">
              <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-4 text-slate-400 text-xs flex items-center gap-2">
                   <Terminal size={12} /> sooraj@portfolio:~
                </div>
              </div>

              {/* DUAL-SUBMIT FORM */}
              <form onSubmit={handleSubmit} className="p-6 text-slate-300 space-y-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-cyan-500">$ input_email --set</label>
                  <input 
                    id="email"
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="enter_your_email" 
                    className="bg-transparent border-b border-slate-600 focus:border-cyan-500 outline-none py-1 w-full text-slate-200"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-cyan-500">$ input_message --write</label>
                  <textarea 
                    id="message"
                    required
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="_" 
                    className="bg-transparent border-b border-slate-600 focus:border-cyan-500 outline-none py-1 w-full text-slate-200 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`mt-4 px-4 py-2 rounded border transition-all flex items-center gap-2 w-max
                    ${status === 'success' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                      : 'bg-slate-700 hover:bg-cyan-600 hover:text-white text-cyan-400 border-slate-600'}
                  `}
                >
                  {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                  {status === 'success' && <CheckCircle size={16} />}
                  
                  {status === 'idle' && 'execute_send()'}
                  {status === 'loading' && 'sending_packet...'}
                  {status === 'success' && 'transmission_complete'}
                  {status === 'error' && 'error_retry()'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      <footer className="py-8 text-center text-slate-600 font-mono text-xs border-t border-slate-900 bg-slate-950/80 backdrop-blur-sm relative z-10">
        <p>Built with Next.js + React</p>
        <p>© {new Date().getFullYear()} Sooraj Krishnamoorthy Manikandan. All systems operational!</p>
      </footer>

    </main>
  );
}