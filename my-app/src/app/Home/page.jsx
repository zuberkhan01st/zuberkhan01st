'use client'
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import { Pagination, Navigation, EffectCards, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";

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
} from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll position for animations and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);

      // Determine active section based on scroll position
      const sections = ["hero", "about", "skills", "experience", "projects", "achievements", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
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
    { category: "Development", items: ["Node.js", "Express.js", "Flask", "FastAPI", "RESTful APIs", "WebSocket", "Mobile and Web Development"] },
    { category: "Languages", items: ["Python", "C++", "JavaScript", "TypeScript"] },
    { category: "Database & Tools", items: ["MongoDB", "SQL", "Git", "Cisco Packet Tracer", "Postman", "VS Code", "PyCharm", "Docker", "Netlify", "Render", "Vercel"] },
    { category: "Core Concepts", items: ["Data Structures and Algorithms", "Machine Learning", "Object-Oriented Programming", "Backend Development", "Data Science", "DBMS", "API Development", "Web Scraping", "Version Control"] }
  ];

  // Experience data
  const experiences = [
    {
      title: "Web Development Intern",
      company: "Pinnacle Labs",
      period: "December 2024 - January 2025",
      description: [
        "Developed a real-time chat application using WebSocket, enabling seamless and instantaneous communication with 90% reduced message delivery latency.",
        "Built a news sentiment analysis application utilizing AI and natural language processing, providing real-time sentiment classification of trending news with 92% accuracy.",
        "Implemented CI/CD pipelines using Git for version control, automating deployment processes and reducing integration issues by 70%."
      ]
    }
  ];

  // Projects data
  const projects = [
    {
      "title": "AgriAI - Smart Farming Assistant",
      "description": "Developed an AI-powered system to assist farmers by providing crop recommendations, disease detection, and market price insights.",
      "technologies": ["Node.js", "Next.js", "Flask", "TensorFlow", "Computer Vision", "IoT"],
      "link": "https://github.com/zuberkhan01st/InnovateYou_2025",
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
      year: "2028",
      score: "SGPA 9.11"
    }
  ];

  // Achievements data
  const achievements = [
    {
      title: "Smart India Hackathon 2024 Finalist",
      description: "Led a team of 6 developers to the finals of the prestigious Smart India Hackathon 2024, competing against 2000+ teams nationwide.",
      image: "/images/sih.jpg" // Add image path
    },
    {
      title: "Published Research Paper",
      description: "Published a research paper titled 'Health Genie: AI-Driven Personalized Healthcare' at the 2024 ICSES Conference.",
      image: "/images/research.jpg" // Add image path
    },
    {
      title: "Runner-up in Debate Competition",
      description: "Recognized for outstanding performance and critical thinking on AI and technology topics.",
      image: "/images/debate.jpg" // Add image path
    }
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans min-h-screen transition-colors duration-300 relative">
        {/* Floating Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        {/* Theme Toggle and Social Links */}
        <div className="fixed right-6 top-24 z-40 flex flex-col gap-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-gray-100/10 backdrop-blur-lg text-white shadow-lg hover:scale-110 transition-transform"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="flex flex-col gap-4">
            <a href="https://github.com/zuberkhan01st" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-100/10 backdrop-blur-lg text-white shadow-lg hover:scale-110 transition-transform">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/zuber-khan-01st" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-100/10 backdrop-blur-lg text-white shadow-lg hover:scale-110 transition-transform">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gray-100/10 backdrop-blur-lg text-white shadow-lg hover:scale-110 transition-transform">
              <Twitter size={18} />
            </a>
            <a href="mailto:zuberkhan01st@gmail.com" className="p-3 rounded-full bg-gray-100/10 backdrop-blur-lg text-white shadow-lg hover:scale-110 transition-transform">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Zuber Khan
            </motion.h1>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6">
              {["hero", "about", "skills", "experience", "projects", "achievements", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={`relative transition duration-300 ${activeSection === item
                        ? "text-purple-500"
                        : "text-gray-300 hover:text-purple-400"
                      }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    {activeSection === item && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-16 left-0 w-full bg-gray-900/80 backdrop-blur-lg shadow-lg py-4 px-4"
            >
              <ul className="flex flex-col space-y-4">
                {["hero", "about", "skills", "experience", "projects", "achievements", "contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      className={`block py-2 ${activeSection === item
                          ? "text-purple-500"
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
        </nav>

        {/* Hero Section */}
        <section id="hero" className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-bl-full z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2 mb-10 md:mb-0"
              >
                <p className="text-purple-500 font-medium mb-2">Hello, I'm</p>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Zuber Khan
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    Software Developer
                  </span>
                </h1>
                <p className="text-lg text-gray-300 mb-8 max-w-lg">
                  Crafting exceptional digital experiences through innovative code solutions and creative problem-solving.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#contact"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:-translate-y-1"
                  >
                    Contact Me
                  </a>
                  <a
                    href="#projects"
                    className="px-6 py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-700 transition-all"
                  >
                    View Projects
                  </a>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:w-1/2 relative"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                    ZK
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg shadow-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/60">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                About Me
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a passionate software developer with expertise in backend development, AI, and data science. I specialize in building scalable web applications, real-time systems, and machine learning models. My journey in tech began with a curiosity for solving problems, and I've been hooked ever since.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                When I'm not coding, I enjoy contributing to open-source projects, writing technical articles, and exploring new technologies. I believe in continuous learning and sharing knowledge with the community.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center space-x-2">
                  <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Based in Pune, India</span>
                </div>
                <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center space-x-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Open to Freelance</span>
                </div>
                <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center space-x-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700 dark:text-gray-300">Available for Collaborations</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        {/* Skills Section */}
<section id="skills" className="py-20">
  <div className="container mx-auto px-4">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        My Skills
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        I've acquired a diverse set of skills throughout my journey as a developer, enabling me to tackle complex problems and deliver high-quality solutions.
      </p>
    </motion.div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {skills.map((skillGroup, index) => (
        <motion.div 
          key={skillGroup.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative perspective-1000"
        >
          {/* 3D Card Container */}
          <div
            className="relative h-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/10 dark:border-gray-700/50 transform transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Card Content */}
            <div
              className="p-6 relative z-10"
              style={{
                transform: "translateZ(50px)",
              }}
            >
              <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                {skillGroup.category}
              </h3>
              <ul className="space-y-3">
                {skillGroup.items.map((skill) => (
                  <li key={skill} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3D Hover Effect */}
            <div
              className="absolute inset-0 transition-transform duration-500"
              style={{
                transform: "translateZ(-50px)",
              }}
            ></div>
          </div>

          {/* 3D Tilt Effect Based on Mouse Position */}
          <div
            className="absolute inset-0 transition-transform duration-500"
            onMouseMove={(e) => {
              const card = e.currentTarget.parentElement;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 20; // Adjust sensitivity
              const rotateY = -(x - centerX) / 20; // Adjust sensitivity

              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget.parentElement;
              card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
            }}
          ></div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900/60">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Experience
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                My professional journey has allowed me to work with diverse teams and technologies, contributing to meaningful projects.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="relative border-l-2 border-purple-500 ml-6 pl-8 pb-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="mb-12 relative"
                  >
                    <div className="absolute -left-14 top-0 w-8 h-8 bg-purple-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{exp.title}</h3>
                        <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{exp.company}</p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                        {exp.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
<section id="projects" className="py-20">
  <div className="container mx-auto px-4">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Featured Projects
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Here are some of my notable projects that showcase my technical expertise and problem-solving abilities.
      </p>
    </motion.div>

    {/* Projects Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
        >
          {/* Project Image */}
          <div className="h-48 relative overflow-hidden">
            <img
              src={project.image} // Replace with the actual image URL
              alt={project.title}
              className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </div>
          {/* Project Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              View Project <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

        {/* Achievements Section with Carousel */}
        <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-900/60">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Achievements
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Recognition and milestones from my professional journey that I'm proud of.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <Swiper
                modules={[Pagination, Navigation, EffectCards, Autoplay]}
                effect="cards"
                grabCursor={true}
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="w-full"
              >
                {/* Slide 1 */}
                <SwiperSlide>
                  <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Smart India Hackathon 2024 Finalist</h3>
                      <span className="px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                        National
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Led a team of 6 developers to the finals of the prestigious Smart India Hackathon 2024,
                      competing against 2000+ teams nationwide. Our project focused on innovative healthcare solutions using AI.
                    </p>
                    <div className="flex items-center mt-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        SIH
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-500 dark:text-gray-400">March 2024</p>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">Ministry of Education, India</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                  <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Published Research Paper</h3>
                      <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                        IEEE
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Published a research paper titled "Health Genie: AI-Driven Personalized Healthcare" at the 2024
                      International Conference on Sustainable Engineering Solutions (ICSES). The paper explores innovative
                      applications of machine learning in preventive healthcare.
                    </p>
                    <div className="flex items-center mt-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        IEEE
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-500 dark:text-gray-400">February 2024</p>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">ICSES Conference</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                  <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Runner-up in Debate Competition</h3>
                      <span className="px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                        College-Level
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Recognized for outstanding performance and critical thinking on AI and technology topics at the college-level debate competition.
                    </p>
                    <div className="flex items-center mt-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        DYPIT
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-500 dark:text-gray-400">October 2024</p>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">Dr. D. Y. Institute Of Technology</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Certifications
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Certifications that validate my skills and knowledge in various domains.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">{cert.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{cert.issuer}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{cert.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900/60">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Education
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                My academic journey and qualifications.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
                >
                  <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">{edu.degree}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">{edu.institution}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{edu.location} • {edu.year} • {edu.score}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Contact Me
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Let's connect! Whether you have a project in mind or just want to chat, feel free to reach out.
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Zuber Khan. All rights reserved.</p>
            <p>Contact: zuberkhan01st@gmail.com | +91 8767174206</p>
          </div>
        </footer>
      </div>
    </div>
  );
}