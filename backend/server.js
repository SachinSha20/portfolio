require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

// ──────────────────────────────
//  DATA  (seeded from resume)
// ──────────────────────────────
const portfolioData = {
  personal: {
    name: "Sachin Sharma",
    title: "React Developer",
    location: "Amritsar, India",
    email: "sachinsharma1935@gmail.com",
    phone: "9463432458",
    linkedin: "https://linkedin.com/in/sachin-sharma-02082424b",
    github: "https://github.com/SachinSha20",
    summary:
      "React Developer with 2 years of experience building scalable web and mobile applications using React.js, Next.js, React Native, and Node.js. Skilled in Redux, Context API, REST API integration, authentication systems, and real-time features using Socket.io.",
  },
  skills: {
    frontend: ["React.js", "Next.js", "React Native", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"],
    stateManagement: ["Redux", "Context API", "React Hooks"],
    backendApis: ["Node.js", "REST APIs", "JWT Authentication", "Socket.io"],
    tools: ["Git", "GitHub", "Postman", "VS Code", "Axios", "CryptoJS", "Framer Motion"],
    databases: ["MongoDB", "MySQL"],
  },
  experience: [
    {
      id: 1,
      role: "React Developer",
      company: "Bhanguz",
      location: "Mohali, Punjab",
      duration: "Jan 2024 – Present",
      highlights: [
        "Developed and maintained Dwink platform using React.js and Next.js.",
        "Implemented authentication including Email OTP and WhatsApp OTP verification.",
        "Integrated REST APIs and real-time communication using Socket.io.",
        "Built features such as product store, wishlist, campaigns, and user profile management.",
        "Developed responsive UI components using Tailwind CSS.",
      ],
    },
  ],
  projects: [
    {
      id: 1,
      name: "Quiz Mobile App",
      tech: ["React Native"],
      description:
        "Built quiz game with authentication, multiplayer gameplay, and leaderboard.",
      tags: ["Mobile", "Real-time", "Auth"],
    },
    {
      id: 2,
      name: "Metal Trading Platform",
      tech: ["Next.js", "JWT", "CryptoJS"],
      description:
        "Implemented JWT authentication, encryption, and admin dashboard for a metal trading platform.",
      tags: ["Web", "Security", "Admin"],
    },
    {
      id: 3,
      name: "Amazon Clone",
      tech: ["HTML", "CSS"],
      description:
        "Built a static homepage clone of Amazon with pixel-perfect UI reproduction.",
      tags: ["Frontend", "CSS"],
    },
  ],
  education: [
    {
      degree: "B.Tech – Electronics and Communication Engineering",
      institution: "Guru Nanak Dev University, Amritsar",
      duration: "2020 – 2024",
      cgpa: "6.51",
    },
  ],
  certifications: [
    { name: "Java Standard Edition", issuer: "VMM Education" },
    { name: "Data Structures and Algorithms using Java", issuer: "VMM Education" },
  ],
};

// ──────────────────────────────
//  ROUTES
// ──────────────────────────────

// Health
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Portfolio API running' }));

// Full portfolio data
app.get('/api/portfolio', (req, res) => res.json(portfolioData));

// Individual sections
app.get('/api/personal',        (req, res) => res.json(portfolioData.personal));
app.get('/api/skills',          (req, res) => res.json(portfolioData.skills));
app.get('/api/experience',      (req, res) => res.json(portfolioData.experience));
app.get('/api/projects',        (req, res) => res.json(portfolioData.projects));
app.get('/api/education',       (req, res) => res.json(portfolioData.education));
app.get('/api/certifications',  (req, res) => res.json(portfolioData.certifications));

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: 'All fields are required.' });

  // Configure your SMTP here (e.g. Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact from ${name}`,
    text: message,
  });

  console.log(`📬 New contact from ${name} <${email}>: ${message}`);
  res.json({ success: true, message: 'Message received! Sachin will get back to you soon.' });
});

app.listen(PORT, () => console.log(`🚀 Portfolio API listening on http://localhost:${PORT}`));
