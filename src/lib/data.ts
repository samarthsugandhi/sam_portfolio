export const personalInfo = {
  name: "Samarth Sugandhi",
  role: "Full Stack Developer",
  tagline: "I build high-performance web applications and scalable systems.",
  intro:
    "A full-stack developer in my 6th semester at BEC (Information Science). I specialize in crafting real-world products—from AI-integrated platforms to robust financial tools—focusing on exceptional user experiences and clean architecture.",
  email: "samarthsugandhi04@gmail.com",
  github: "https://github.com/samarthsugandhi",
  linkedin: "https://linkedin.com/in/samarth-sugandhi-0082a32bb",
  portfolio: "https://samarth-sugandhi-portfolio.vercel.app",
  education: "6th Semester Undergraduate, Information Science @ BEC",
};

export const projects = [
  {
    id: 1,
    name: "BEC Vortex",
    description:
      "Unified Academic & Fee Management Platform — multi-role institutional platform consolidating fee management, academics, and communication across 5 permission tiers.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    github: "https://github.com/samarthsugandhi",
    live: "https://becvortex.onrender.com",
    featured: true,
    gradient: "from-indigo-500/30 to-blue-500/10",
    accentColor: "#6366F1",
    category: "Full Stack · EdTech",
    award: "1st Place — WAVE 3.0 National 24-hr Hackathon",
    modalDetails: {
      problem:
        "Academic institutions often rely on fragmented systems for fee management, attendance tracking, and student requests, leading to inefficiencies and poor user experiences.",
      solution:
        "Developed a centralized, unified platform that integrates fee payments, academic resources, and intelligent AI assistants into one seamless dashboard.",
      features: [
        "Multi-role RBAC (Admin, Principal, HOD, Faculty, Student)",
        "Multi-channel fee payments (UPI, Net Banking, Crypto-ready)",
        "Automated hall ticket generation triggered on payment clearance",
        "Real-time campus communication layer",
        "Integrated attendance & marks management module",
      ],
      impact:
        "Replaced 3+ fragmented college systems with a single source of truth for academic and financial data.",
    },
  },
  {
    id: 2,
    name: "MANTIS-OS",
    description:
      "AI-Powered Multi-Agent Settlement Engine — a trustless B2B settlement platform targeting the $130B+ SME payment delay crisis in India.",
    tech: ["Next.js", "MongoDB", "PostgreSQL", "System Design"],
    github: "https://github.com/samarthsugandhi",
    live: "#",
    featured: true,
    gradient: "from-violet-500/30 to-purple-500/10",
    accentColor: "#8B5CF6",
    category: "AI · System Design",
    award: "Shortlisted Round 2 — Cognizant Technoverse 2026",
    modalDetails: {
      problem:
        "$130B+ SME payment delay crisis in India — fragmented, trust-less B2B settlements with no intelligent orchestration layer.",
      solution:
        "Proposed and designed a multi-agent trustless B2B settlement platform with a 4-module system and detailed agent dataflow diagrams.",
      features: [
        "4-module system (Settlement, DEX, Syndicate, Privacy engines)",
        "Multi-agent AI orchestration layer",
        "Hybrid database layer (MongoDB + PostgreSQL)",
        "Detailed agent dataflow diagrams and prototype sketches",
      ],
      impact:
        "Selected from hundreds of submissions to advance to Round 2 at Cognizant Technoverse Hackathon 2026.",
    },
  },
  {
    id: 3,
    name: "Finova",
    description:
      "Personal Finance Management Platform — full-stack finance tracker with categorized transaction management, real-time analytics, and interactive spending visualizations.",
    tech: ["Next.js", "React.js", "Node.js", "MongoDB"],
    github: "https://github.com/samarthsugandhi",
    live: "#",
    featured: false,
    gradient: "from-emerald-500/30 to-teal-500/10",
    accentColor: "#10B981",
    category: "Finance · Full Stack",
    award: "Winner — Innovatex, Presidency University",
    modalDetails: {
      problem:
        "Many personal finance apps lack intuitive visualizations, making it difficult for users to quickly understand their spending habits.",
      solution:
        "Created Finova, a highly visual, responsive dashboard that aggregates financial data into actionable, beautifully crafted charts and metrics.",
      features: [
        "Categorized transaction management",
        "Real-time analytics dashboard",
        "Interactive spending visualizations",
        "Mobile-responsive UI with zero manual data entry overhead",
      ],
      impact:
        "Delivered a premium user experience that simplifies complex financial data into easily digestible visual stories.",
    },
  },
  {
    id: 4,
    name: "BEC BillDesk",
    description:
      "Digital Fee Management System — structured digital fee platform with admin-controlled fee structures, student-side payment workflows, and real-time admin verification dashboard.",
    tech: ["Next.js", "TypeScript", "MongoDB"],
    github: "https://github.com/samarthsugandhi",
    live: "https://becbilldesk.onrender.com",
    featured: false,
    gradient: "from-sky-500/30 to-blue-500/10",
    accentColor: "#38BDF8",
    category: "EdTech · Full Stack",
    award: "1st Prize — Project Contest, BEC",
    modalDetails: {
      problem:
        "Manual fee collection processes are prone to errors and make tracking outstanding balances a logistical nightmare.",
      solution:
        "Architected an end-to-end digital payment solution specifically tailored for educational ecosystems.",
      features: [
        "Admin-controlled fee structures",
        "Student-side payment workflows",
        "Real-time admin verification dashboard",
        "Automated payment status tracking",
      ],
      impact:
        "Eliminated manual reconciliation through automated payment status tracking simultaneously accessible to students and administrators.",
    },
  },
  {
    id: 5,
    name: "Event Platforms",
    description:
      "Technophilia 3.0 Official Tech Fest Website + KALA TriVerse Event Platform — registration-focused UIs serving 500+ visitors with interactive event sections.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    github: "https://github.com/samarthsugandhi",
    live: "https://technophilia-3.vercel.app",
    featured: false,
    gradient: "from-orange-500/30 to-rose-500/10",
    accentColor: "#F97316",
    category: "Events · Frontend",
    award: "ISE Dept., Basaveshwar Engineering College",
    modalDetails: {
      problem:
        "Managing large-scale college events involves chaotic communication and fragmented team registrations.",
      solution:
        "Developed scalable, high-performance event platforms processing hundreds of real-time registrations.",
      features: [
        "Registration-focused UI served 500+ visitors",
        "Interactive event schedule pages",
        "Dynamic showcase sections",
        "Responsive navigation and event discovery",
      ],
      impact:
        "Successfully handled end-to-end digital logistics for major college fests.",
    },
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Core Java"],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
  },
  {
    category: "Backend & Systems",
    items: ["Node.js", "Express.js", "REST APIs", "Authentication", "RBAC"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
  },
  {
    category: "Tools & Cloud",
    items: ["Git", "GitHub", "Vercel", "Render", "AWS Lambda", "AWS Amplify"],
  },
  {
    category: "AI & Agents",
    items: ["AI System Design", "Multi-Agent Architecture", "Prompt Engineering", "LLM Integration"],
  },
];

export const achievements = [
  {
    id: 1,
    title: "Cognizant Technoverse 2026",
    subtitle: "Shortlisted Round 2 — AI / Agents Track",
    description:
      "MANTIS-OS selected from hundreds of submissions to advance to Round 2 at Cognizant Technoverse Hackathon 2026 — AI & Agents track. Presented to Cognizant evaluators.",
    icon: "🤖",
    color: "#8B5CF6",
    year: "2026",
    highlight: true,
  },
  {
    id: 2,
    title: "1st Place — WAVE 3.0",
    subtitle: "National Level 24-Hour Hackathon",
    description:
      "Secured first place out of hundreds of participants by rapidly conceptualizing, building, and deploying BEC Vortex — a fully functional institutional platform — within a grueling 24-hour sprint.",
    icon: "🏆",
    color: "#F59E0B",
    year: "2025",
    highlight: true,
  },
  {
    id: 3,
    title: "GirlScript Summer of Code",
    subtitle: "Selected Contributor — GSSoC 2026",
    description:
      "Selected as a contributor for GSSoC 2026 in the AI / Agents & Open Source Track — contributing to real-world open source AI agent projects.",
    icon: "🌐",
    color: "#EC4899",
    year: "2026",
    highlight: false,
  },
  {
    id: 4,
    title: "Social Summer of Code",
    subtitle: "Selected Contributor — SSoC",
    description:
      "Selected for the Open Source Development Track, collaborating on production-grade open source projects alongside developers globally.",
    icon: "💻",
    color: "#10B981",
    year: "2026",
    highlight: false,
  },
  {
    id: 5,
    title: "Winner — Innovatex",
    subtitle: "Presidency University",
    description:
      "Won the Innovatex event at Presidency University by building Finova — a full-stack personal finance management platform with real-time analytics.",
    icon: "🥇",
    color: "#6366F1",
    year: "2025",
    highlight: false,
  },
  {
    id: 6,
    title: "1st Prize — Project Contest",
    subtitle: "Basaveshwar Engineering College",
    description:
      "Awarded first place at the college-level project contest for BEC BillDesk, demonstrating technical depth, architectural scalability, and clear real-world impact.",
    icon: "🎖️",
    color: "#38BDF8",
    year: "2024",
    highlight: false,
  },
];
