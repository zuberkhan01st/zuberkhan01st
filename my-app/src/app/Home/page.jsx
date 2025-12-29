'use client'
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import CustomCursor from "../../components/CustomCursor";
import AnimatedBackground from "../../components/AnimatedBackground";
import CodeTypingEffect from "../../components/CodeTypingEffect";
import InteractiveTerminal from "../../components/InteractiveTerminal";
import Floating3D from "../../components/Floating3D";
import AnimatedCarousel from "../../components/AnimatedCarousel";
import GlimpseSection from "../../components/GlimpseSection";

// Icons
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Menu,
  X,
  Moon,
  Sun,
  Code,
  Sparkles,
  Rocket,
  Briefcase,
  Brain,
} from "lucide-react";

// Particles component to avoid hydration mismatch
function ParticlesBackground() {
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate particles only on client side
    const particleData = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      xOffset: Math.random() * 20 - 10,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
    setParticles(particleData);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Smooth scroll behavior with momentum
  useEffect(() => {
    // Prevent scroll restoration - always start at top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Remove any hash from URL to prevent jumping
    if (window.location.hash) {
      window.history.replaceState(null, null, ' ');
    }
    
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add smooth scrolling to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.scrollMarginTop = '80px';
    });
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Effect to check for saved theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
    }
  }, []);

  // Function to properly toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
    }
  };

  // Track scroll position for animations and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);

      const sections = ["hero", "about", "glimpse", "skills", "experience", "projects", "achievements", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Skills data
  const skills = [
    { category: "Development", items: ["Node.js", "Express.js", "Flask", "FastAPI","Next.js", "RESTful APIs", "WebSocket", "Mobile and Web Development"], icon: Code },
    { category: "Languages", items: ["Python", "C++", "JavaScript", "TypeScript", "Java"], icon: Brain },
    { category: "Database & Tools", items: ["MongoDB", "SQL", "Git", "Cisco Packet Tracer", "Postman", "VS Code", "PyCharm", "Docker", "Netlify", "Render", "Vercel"], icon: Sparkles },
    { category: "Core Concepts", items: ["Data Structures and Algorithms", "Machine Learning", "Object-Oriented Programming", "Backend Development", "Data Science", "DBMS", "API Development", "Web Scraping", "Version Control"], icon: Rocket },
    { category: "GenAI", items: [ "LLM (Large Language Models)", "RAG (Retrieval-Augmented Generation)", "Langchain", "Gemini", "FAISS", "Pinecone"], icon: Sparkles },
  ];

  // Experience data
  const experiences = [
    {
      title: "SDE (Lead)",
      company: "BuildUp Global",
      period: "September 2025 - Present",
      location: "Pune, Maharashtra • Hybrid",
      description: [
        "GenAI Platform Development: Led team transforming early-stage startup ideas from POC to production-ready GenAI platform, reducing prototype-to-release time by 30% through improved architecture and deployment workflows.",
        "System Architecture & Optimization: Engineered Redis queue system to overcome Gemini API rate limits and integrated Meritto CRM, cutting API request failures by over 40% and stabilizing cross-service data flow.",
        "Production Deployment: Established automated CI/CD pipeline with GitHub Actions, reducing manual deployment effort by 60% and enabling consistent monitoring across environments."
      ],
      techStack: "Node.js, React, Redis, GCP(Cloud Run), Docker, GitHub Actions, MongoDB"
    },
    {
      title: "SDE Intern",
      company: "Application Ally",
      period: "May 2025 - September 2025",
      location: "Pune, Maharashtra • Hybrid",
      description: [
        "Mirai GenAI Platform: Contributed to Mirai, a GenAI career guidance platform leveraging psychometric evaluation, supporting rollout to 1,000+ students during initial launch cycles.",
        "Backend Architecture: Architected scalable backend services in Node.js/Express.js and MongoDB, with JWT authentication and Redis caching that improved average API response times by 25%.",
        "Gemini Model Integration: Integrated the Gemini model for personalized recommendations, directly contributing to a verified 25% boost in guidance accuracy and user relevance."
      ],
      techStack: "Node.js, Express.js, MongoDB, Redis, Gemini API"
    }
  ];

  // Projects data
  const projects = [
    {
      "title": "RepoRadar - GitHub Repository Analyzer",
      "description": "Built an advanced GitHub repository analyzer extracting key metrics and code structure, improving project evaluation efficiency by 85% with an AI chatbot for automating workflows.",
      "technologies": ["Next.js", "LLM", "Node.js", "GitHub API"],
      "link": "https://reporadar.zuberkhan.tech",
      "image":"https://github.com/zuberkhan01st/RepoRadar/raw/main/Public/1.png"
    },
    {
      "title": "RFP IntelliCheck - AI-Powered Compliance Tool",
      "description": "Built an end-to-end RFP analysis platform using RAG (Gemini + FAISS) to automate eligibility checks with 90% accuracy and cutting manual review time by 65% for Fortune 500 clients.",
      "technologies": ["React.js", "Flask", "Retrieval-Augmented Generation", "Gemini", "FAISS"],
      "link": "https://github.com/zuberkhan01st/RFP_IntelliCheck",
      image:"/file.svg"
    },
    {
      "title": "AgriAI - Smart Farming Assistant",
      "description": "Developed an AI-powered system to assist farmers by providing crop recommendations, disease detection, and market price insights.",
      "technologies": ["Node.js", "Next.js", "Flask", "TensorFlow", "Computer Vision", "IoT"],
      "link": "https://github.com/zuberkhan01st/AgriAI-SmartFarming",
      image:"/farmer.jpg"
    },
    {
      "title": "Airborne Threat Detection System",
      "description": "The Airborne Threat Detection System is an advanced AI-powered solution designed to detect and classify airborne threats such as drones, missiles, and birds in real-time. Built with cutting-edge technologies, this system ensures high accuracy, rapid response, and seamless integration with existing surveillance infrastructure.",
      "technologies": ["Next.js", "Node.js", "Flask", "YOLO", "Real-Time Data Processing"],
      "link": "https://github.com/zuberkhan01st/Team_Fateh_Beyond_AB2_01",
      image:"/4.jpg"
    },
    {
      title: "Crude Oil Stock Price Prediction and News Sentiment Analysis",
      description: "Built a predictive model for crude oil stock prices using 15 years of data from multiple sources, achieving 83% accuracy.",
      technologies: ["Python", "Machine Learning", "Web Scraping", "Sentiment Analysis"],
      link: "https://github.com/zuberkhan01st/Crude_Oil_Stocks_Price_Prediction_System",
      image: "/crude.png"
    },
    {
      title: "Swacch Vision",
      description: "Created a scalable dashboard for Swachhta and LiFE, enabling real-time tracking of cleanliness across 165,000+ post offices.",
      technologies: ["Node.js", "Flask", "AI-Powered Image Processing", "Data Analytics"],
      link: "https://github.com/zuberkhan01st/SIH_2024-Complete_Code-",
      image: "/Screenshot 2025-03-02 160238.png"
    }
  ];

  // Certifications data
  const certifications = [
    {
      title: "Intro to Machine Learning",
      issuer: "Kaggle",
      year: "2024"
    },
    {
      title: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      year: "2024"
    },
    {
      title: "Backend Development Course",
      issuer: "PWSkills",
      year: "2024"
    }
  ];

  // Education data
  const education = [
    {
      degree: "BE in Artificial Intelligence & Data Science",
      institution: "Dr. D. Y. Institute Of Technology, Pimpri",
      location: "Pune",
      year: "2026",
      score: "SGPA 9.11"
    }
  ];

  // Achievements data
  const achievements = [
    {
      title: "Smart India Hackathon 2024 Finalist",
      description: "Top 5 among 49,000+ participating teams nationally. Recognized for innovative AI/Data Dashboard solution for Department of Post.",
      badge: "National",
      badgeColor: "from-green-500/20 to-emerald-500/20",
      badgeBorder: "border-green-500/30",
      badgeText: "text-green-300",
      organization: "Ministry of Communication, India",
      date: "March 2024",
      icon: "SIH"
    },
    {
      title: "17x Hackathon Winner/Finalist",
      description: "Multiple competition successes including 2nd Prize at TechnoVation, Consultadd Hackathon Finalist, Codement Finalist, demonstrating consistent technical excellence.",
      badge: "Multiple Wins",
      badgeColor: "from-blue-500/20 to-cyan-500/20",
      badgeBorder: "border-blue-500/30",
      badgeText: "text-blue-300",
      organization: "Various Competitions",
      date: "2023-2024",
      icon: "🏆"
    },
    {
      title: "Research Publication",
      description: "Authored and published research paper on AI/ML for early disease diagnosis at the 2024 ICSES Conference, contributing to academic community.",
      badge: "IEEE",
      badgeColor: "from-purple-500/20 to-pink-500/20",
      badgeBorder: "border-purple-500/30",
      badgeText: "text-purple-300",
      organization: "ICSES Conference",
      date: "February 2024",
      icon: "IEEE"
    },
    {
      title: "Technical Speaker",
      description: "Conducted educational session on Generative AI concepts and implementation for 100+ peers, demonstrating leadership and knowledge sharing.",
      badge: "Speaker",
      badgeColor: "from-orange-500/20 to-red-500/20",
      badgeBorder: "border-orange-500/30",
      badgeText: "text-orange-300",
      organization: "Educational Session",
      date: "2025",
      icon: "🎤"
    }
  ];


  return (
    <>
      {/* <CustomCursor /> */}
      <div className="relative">
      <AnimatedBackground />
      
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Moving gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, 50, 100, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 60, 0],
            y: [0, -100, -30, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-600/15 to-purple-600/15 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -80, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 border border-purple-500/10 rotate-45"
          animate={{ rotate: [45, 405, 45] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 border border-blue-500/10 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-32 h-32 border-2 border-cyan-500/10 rotate-12"
          animate={{ 
            y: [0, -30, 0],
            rotate: [12, 372, 12],
          }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
        />
      </div>

      {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/50"
            style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Action Buttons */}
      {/* Side Navigation - Always Visible */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-4"
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      >
        <motion.button
            onClick={toggleDarkMode}
          className="p-3.5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-gray-800 dark:text-white shadow-xl hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{ willChange: 'transform' }}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>

        <div className="flex flex-col gap-3">
          <motion.a
            href="https://github.com/zuberkhan01st"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-gray-800 dark:text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ willChange: 'transform' }}
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/zuber-khan-01st"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-gray-800 dark:text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ willChange: 'transform' }}
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-gray-800 dark:text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ willChange: 'transform' }}
          >
            <Twitter size={20} />
          </motion.a>
          <motion.a
            href="mailto:zuberkhan01st@gmail.com"
            className="p-3.5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-gray-800 dark:text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{ willChange: 'transform' }}
          >
            <Mail size={20} />
          </motion.a>
          </div>
      </motion.div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/5 dark:bg-black/20 backdrop-blur-2xl border-b border-white/10 dark:border-white/5 shadow-2xl"
      >
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              Zuber Khan
            </motion.h1>

            {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {["hero", "about", "skills", "experience", "projects","glimpse", "achievements", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item
                      ? "text-purple-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    {activeSection === item && (
                      <motion.span
                        layoutId="activeSection"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-400"
                      initial={false}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
            className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/40 backdrop-blur-2xl border-t border-white/10 p-4"
            >
            <ul className="flex flex-col gap-4">
                {["hero", "about", "skills", "experience", "projects", "glimpse", "achievements", "contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                    className={`block py-2 ${
                      activeSection === item
                        ? "text-purple-400"
                          : "text-gray-300"
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
      </motion.nav>

      {/* Hero Section - Enhanced */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-24 pb-20 overflow-hidden">
        {/* Hero Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-cyan-400 font-semibold text-lg flex items-center gap-2"
              >
                
                Hello, I'm
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                className="text-6xl md:text-7xl font-bold leading-tight"
              >
                <motion.span 
                  className="text-white"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(147, 197, 253, 0.5)",
                      "0 0 30px rgba(147, 197, 253, 0.8)",
                      "0 0 20px rgba(147, 197, 253, 0.5)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Zuber
                </motion.span>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Khan
                </motion.span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 text-2xl md:text-3xl font-semibold"
              >
                <motion.div
                  animate={{ backgroundPosition: [100, 100, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Code className="text-cyan-400" />
                </motion.div>
                <motion.span 
                  className="text-gray-300"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                    Software Developer
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-300 leading-relaxed max-w-lg"
              >
                Crafting exceptional digital experiences through innovative code solutions and creative problem-solving. Specializing in AI, backend development, and scalable web applications.
              </motion.p>

              {/* Code typing effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 p-4 bg-black/40 backdrop-blur-xl rounded-xl border border-cyan-500/30 shadow-2xl"
              >
                <CodeTypingEffect code="const developer = new SoftwareEngineer('Zuber Khan');" speed={80} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <motion.a
                    href="#contact"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-semibold shadow-xl shadow-cyan-500/30 relative overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Get In Touch</span>
                </motion.a>
                <motion.a
                    href="#projects"
                  className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-cyan-500/30 text-white rounded-2xl font-semibold hover:bg-white/20 hover:border-cyan-500/50 transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">View Projects</span>
                </motion.a>
              </motion.div>
            </motion.div>

              <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-3xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-500/40 shadow-2xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="https://avatars.githubusercontent.com/u/132389756?v=4"
                    alt="Zuber Khan"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl shadow-xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl shadow-xl"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span className="text-sm">Scroll</span>
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.a>
        </motion.div>
        </section>

      {/* About Section - Unique Layout with Terminal */}
      <section id="about" className="py-32 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 80, -40, 0],
              y: [0, 50, -30, 0],
              scale: [1, 1.3, 0.9, 1],
              opacity: [0.2, 0.4, 0.3, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -60, 40, 0],
              y: [0, -70, 30, 0],
              scale: [1, 1.2, 0.95, 1],
              opacity: [0.2, 0.4, 0.3, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
            >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                About Me
              </span>
              </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-xl text-gray-300 leading-relaxed">
                Software engineer focused on building scalable backend systems and production-grade GenAI platforms, with strong ownership across the full development lifecycle.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Experienced in taking products from 0 → production, working in startup environments where I own features end-to-end. I've built and optimised REST and GraphQL APIs, microservices, and cloud-native systems designed to support thousands of active users.
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                I work with Node.js, TypeScript, Express.js, React, Next.js, MongoDB, PostgreSQL, Redis, Docker, and cloud platforms. On the AI side, I build Generative AI solutions using Gemini APIs, LangChain, RAG pipelines, and vector databases like Pinecone.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {[
                  { text: "Based in Pune, India", color: "from-violet-500 to-purple-500" },
                  { text: "Open to Freelance", color: "from-green-500 to-emerald-500" },
                  { text: "Available for Collaborations", color: "from-blue-500 to-cyan-500" }
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`px-6 py-3 bg-gradient-to-r ${badge.color} rounded-full text-white font-medium shadow-lg`}
                  >
                    {badge.text}
                  </motion.div>
                ))}
                </div>
            </motion.div>

            {/* Right Side - Interactive Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <InteractiveTerminal />
            </motion.div>
                </div>
                </div>
      </section>

      

      {/* Skills Section - Unique Layout with 3D Elements */}
      <section id="skills" className="py-32 relative overflow-hidden">
        {/* Animated Grid Background */}
    <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "50px 50px", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(147, 197, 253, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 197, 253, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
            </motion.div>
        
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, 80, -40, 0],
              scale: [1, 1.3, 0.9, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 60, 0],
              y: [0, -60, 50, 0],
              scale: [1, 1.2, 0.95, 1],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
          </div>

        <div className="container mx-auto px-6 relative z-10">
    <motion.div 
            initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
        My Skills
              </span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full"
            ></motion.div>
            <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
              A diverse set of skills enabling me to tackle complex problems and deliver high-quality solutions.
      </p>
    </motion.div>
    
          {/* 3D Element */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 h-64 rounded-3xl overflow-hidden bg-black/20 backdrop-blur-xl border border-purple-500/20"
          >
            <Floating3D />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => {
              const Icon = skillGroup.icon;
              return (
        <motion.div 
          key={skillGroup.category}
                  initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -12 }}
                  className="group relative"
                >
                  <div className="relative h-full p-6 bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl">
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl">
                          <Icon className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                {skillGroup.category}
              </h3>
                      </div>
              <ul className="space-y-3">
                {skillGroup.items.map((skill) => (
                          <li 
                            key={skill} 
                            className="flex items-center gap-3 text-gray-300"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full"></div>
                            <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
              );
            })}
    </div>
  </div>
</section>

      {/* Experience Section - Enhanced Timeline Layout */}
      <section id="experience" className="py-32 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs */}
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-600/15 to-purple-600/15 rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, 50, -30, 0],
              scale: [1, 1.3, 0.9, 1],
              opacity: [0.3, 0.5, 0.3, 0.3],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/15 to-fuchsia-600/15 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 60, 0],
              y: [0, -100, 30, 0],
              scale: [1, 1.2, 0.95, 1],
              opacity: [0.3, 0.5, 0.3, 0.3],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}></div>
    </div>
  </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50 rotate-12">
                <Briefcase className="text-white" size={40} />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Professional
              </span>
              <br />
              <span className="text-white">Experience</span>
            </motion.h2>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1.5 w-32 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 mx-auto rounded-full origin-center"
            ></motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-400 mt-8 max-w-2xl mx-auto leading-relaxed"
            >
              Building scalable systems and leading teams to deliver production-ready solutions
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto relative">
            <div className="space-y-20 relative">
              {experiences.map((exp, index) => {
                const techStackArray = exp.techStack.split(', ').map(tech => tech.trim());
                
                return (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2, 
                      type: "spring", 
                      stiffness: 120,
                      damping: 20,
                      mass: 0.8
                    }}
                    className="relative"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className={`flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                      {/* Timeline Indicator */}
                      <div className="relative z-10 flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                          transition={{ delay: index * 0.2, duration: 0.4 }}
                          className="relative"
                        >
                          {/* Connecting line to next dot */}
                          {index < experiences.length - 1 && (
                            <motion.div
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                              className="absolute left-1/2 top-full transform -translate-x-1/2 w-px bg-gradient-to-b from-purple-500/40 to-transparent hidden md:block origin-top"
                              style={{ height: '80px' }}
                            />
                          )}
                          
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-2 border-purple-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm relative group hover:border-purple-400/50 transition-all duration-300">
                            <Briefcase className="text-purple-400 group-hover:text-purple-300 transition-colors" size={24} />
                    </div>
                        </motion.div>
                      </div>
                      
                      {/* Content Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: index * 0.15, 
                          duration: 0.5
                        }}
                        whileHover={{ y: -8 }}
                        className="flex-1 w-full"
                      >
                        <div className="p-8 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden group">
                          {/* Subtle gradient on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-transparent transition-all duration-500" />
                          
                          <div className="relative z-10">
                            {/* Header */}
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                              <div>
                                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                                  {exp.title}
                                </h3>
                                <p className="text-purple-400 font-medium text-lg mb-1">
                                  {exp.company}
                                </p>
                                <p className="text-gray-400 text-sm flex items-center gap-1.5">
                                  <span className="text-purple-400">📍</span>
                                  {exp.location}
                                </p>
                              </div>
                              
                              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-sm font-medium backdrop-blur-sm whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                            
                            {/* Description Points */}
                            <ul className="space-y-3 mb-6">
                        {exp.description.map((desc, i) => (
                                <li
                                  key={i}
                                  className="text-gray-300 flex items-start gap-3"
                                >
                                  <div className="mt-2 flex-shrink-0 w-1.5 h-1.5 bg-purple-400 rounded-full" />
                                  <span className="leading-relaxed text-[15px]">{desc}</span>
                                </li>
                        ))}
                      </ul>
                            
                            {/* Tech Stack */}
                            <div className="mt-6 pt-6 border-t border-white/[0.08]">
                              <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">
                                Tech Stack
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {techStackArray.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md text-xs font-medium hover:bg-purple-500/15 hover:border-purple-500/30 transition-colors"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
              </div>
                    </div>
                  </motion.div>
              </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/5 via-transparent to-blue-950/5 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
    {/* Section Header */}
    <motion.div
            initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50 rotate-12">
                <Rocket className="text-white" size={40} />
              </div>
    </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Featured
              </span>
              <br />
              <span className="text-white">Projects</span>
            </motion.h2>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1.5 w-32 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 mx-auto rounded-full origin-center"
            ></motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-400 mt-8 max-w-2xl mx-auto leading-relaxed"
            >
              Notable projects showcasing technical expertise and problem-solving abilities
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05
                }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                <div className="h-full p-6 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
                  {/* Subtle gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-transparent transition-all duration-500" />

                  <div className="relative z-10">
                    <div className="relative h-44 mb-5 rounded-xl overflow-hidden">
                      <img
                        src={project.image}
              alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                  key={tech}
                          className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-md text-xs font-medium hover:bg-purple-500/15 hover:border-purple-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
                    </div>
                    
                    <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors group/link"
            >
                      View Project
                      <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
                  </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Glimpse Section - Personal Moments & Events */}
      <GlimpseSection />

      {/* Achievements Section */}
      <section id="achievements" className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
            className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl"
            animate={{
              x: [0, 60, -40, 0],
              y: [0, 50, -30, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 40, 0],
              y: [0, -60, 40, 0],
              scale: [1, 1.3, 0.95, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Achievements
              </span>
              </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
              Recognition and milestones from my professional journey.
              </p>
            </motion.div>

          <div className="max-w-4xl mx-auto">
              <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
                grabCursor={true}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="achievements-swiper"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
              }}
            >
              {achievements.map((achievement, index) => (
                <SwiperSlide key={index}>
                  <div className="p-8 bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl h-full flex flex-col min-h-[400px]">
                    <div className="flex items-start justify-between mb-6 gap-4">
                      <h3 className="text-2xl font-bold text-white flex-1">{achievement.title}</h3>
                      <span className={`px-4 py-1.5 bg-gradient-to-r ${achievement.badgeColor} border ${achievement.badgeBorder} ${achievement.badgeText} rounded-full text-sm font-medium whitespace-nowrap`}>
                        {achievement.badge}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {achievement.icon}
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{achievement.date}</p>
                        <p className="text-white font-semibold">{achievement.organization}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              </Swiper>
            </div>
          </div>
        </section>


      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
            className="absolute top-1/2 left-0 w-full h-full"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(147, 197, 253, 0.08) 0%, transparent 60%)',
                'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
                'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)',
                'radial-gradient(circle at 20% 50%, rgba(147, 197, 253, 0.08) 0%, transparent 60%)',
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
            <motion.div
            className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
            </div>

        <div className="container mx-auto px-6 relative z-10">
            <motion.div
            initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
              </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
                Let's connect! Whether you have a project in mind or just want to chat, feel free to reach out.
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 p-8 bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                rows="6"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              <motion.button
                  type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl font-semibold shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                >
                  Send Message
              </motion.button>
            </motion.form>
            </div>
          </div>
        </section>

        {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright and Contact Info */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 mb-2">© {new Date().getFullYear()} Zuber Khan. All rights reserved.</p>
              <p className="text-gray-500 text-sm">zuberkhan01st@gmail.com | +91 8767174206</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/zuberkhan01st"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/zuber-khan-01st"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com/zuberkhan01st"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="mailto:zuberkhan01st@gmail.com"
                className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
