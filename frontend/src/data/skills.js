// =====================================================================
// SKILLS — Mirjaj Ajij Milon
// Accurately structured from resume categories and projects
// =====================================================================

export const skillGroups = [
    {
        category: "Backend",
        icon: "ServerCog",
        skills: [
            { name: "Node.js", devicon: "nodedotjs", tier: "proficient", usedIn: ["Gameonix", "BizPilot AI", "Swadzo"] },
            { name: "Express.js", devicon: "express", invertDark: true, tier: "proficient", usedIn: ["Gameonix", "BizPilot AI", "Swadzo"] },
            { name: "REST APIs", lucide: "Network", tier: "proficient", usedIn: ["Gameonix (18+)", "BizPilot AI (28+)"] },
            { name: "JWT & OAuth 2.0", lucide: "KeyRound", tier: "proficient", usedIn: ["BizPilot AI", "Swadzo", "Gameonix"] },
            { name: "RBAC & Auth", lucide: "ShieldCheck", tier: "proficient", usedIn: ["Gameonix", "Swadzo"] },
            { name: "WebRTC", devicon: "webrtc", tier: "proficient", usedIn: ["Vionex"] },
            { name: "Socket.io", devicon: "socketdotio", invertDark: true, tier: "proficient", usedIn: ["Vionex"] },
            { name: "Passport.js", lucide: "Lock", tier: "proficient", usedIn: ["TradeSphere", "Wonderlust"] },
        ],
    },
    {
        category: "Frontend",
        icon: "MonitorSmartphone",
        skills: [
            { name: "React.js", devicon: "react", tier: "proficient", usedIn: ["BizPilot AI", "Swadzo", "TradeSphere", "Vionex"] },
            { name: "Context API", devicon: "react", tier: "proficient", usedIn: ["BizPilot AI", "Vionex"] },
            { name: "Redux Toolkit", devicon: "redux", tier: "comfortable", usedIn: ["Full-stack state management"] },
            { name: "Tailwind CSS", devicon: "tailwindcss", tier: "proficient", usedIn: ["BizPilot AI", "Swadzo", "TradeSphere"] },
            { name: "HTML5", devicon: "html5", tier: "proficient", usedIn: ["All projects"] },
            { name: "CSS3", devicon: "css3", tier: "proficient", usedIn: ["All projects"] },
            { name: "Bootstrap", devicon: "bootstrap", tier: "comfortable", usedIn: ["Wonderlust"] },
        ],
    },
    {
        category: "Databases",
        icon: "Database",
        skills: [
            { name: "MongoDB", devicon: "mongodb", tier: "proficient", usedIn: ["Gameonix", "BizPilot AI", "Swadzo", "TradeSphere"] },
            { name: "Mongoose ODM", devicon: "mongodb", tier: "proficient", usedIn: ["Gameonix", "BizPilot AI", "Swadzo"] },
            { name: "SQL", devicon: "mysql", tier: "comfortable", usedIn: ["Academic Coursework & Relational Queries"] },
        ],
    },
    {
        category: "Languages",
        icon: "Code2",
        skills: [
            { name: "Java", devicon: "java", tier: "proficient", usedIn: ["DSA & OOP (LeetCode & GFG)"] },
            { name: "JavaScript (ES6+)", devicon: "javascript", tier: "proficient", usedIn: ["All 5 full-stack projects"] },
            { name: "Python", devicon: "python", tier: "comfortable", usedIn: ["Data structures & Scripting"] },
            { name: "C", devicon: "c", tier: "comfortable", usedIn: ["Systems programming & Fundamentals"] },
        ],
    },
    {
        category: "Tools & Cloud Services",
        icon: "Wrench",
        skills: [
            { name: "Git", devicon: "git", tier: "proficient", usedIn: ["Version control across all repos"] },
            { name: "GitHub", devicon: "github", invertDark: true, tier: "proficient", usedIn: ["Project hosting & CI/CD"] },
            { name: "Postman", devicon: "postman", tier: "proficient", usedIn: ["18+ API contracts at Gameonix"] },
            { name: "Render", lucide: "Cloud", tier: "proficient", usedIn: ["Backend deployment (Gameonix, Swadzo)"] },
            { name: "Netlify", devicon: "netlify", tier: "proficient", usedIn: ["Frontend deployment (Swadzo, TradeSphere)"] },
            { name: "Vercel", devicon: "vercel", invertDark: true, tier: "proficient", usedIn: ["TradeSphere Serverless & Next/React"] },
            { name: "Cloudinary", lucide: "Image", tier: "proficient", usedIn: ["Wonderlust image pipeline"] },
            { name: "Groq API (Llama 3.3)", lucide: "Cpu", tier: "proficient", usedIn: ["BizPilot AI Hackathon project"] },
            { name: "Stripe", devicon: "stripe", tier: "proficient", usedIn: ["Swadzo payment gateway"] },
            { name: "Nodemailer", lucide: "Mail", tier: "proficient", usedIn: ["BizPilot AI SMTP auth"] },
        ],
    },
    {
        category: "Core Competencies",
        icon: "GraduationCap",
        skills: [
            { name: "DSA", lucide: "Braces", tier: "proficient", usedIn: ["280+ solved on LeetCode & GFG"] },
            { name: "OOP", lucide: "Boxes", tier: "proficient", usedIn: ["Clean object models in Java & JS"] },
            { name: "REST API Design", lucide: "Network", tier: "proficient", usedIn: ["Gameonix, BizPilot, Swadzo"] },
            { name: "MVC Architecture", lucide: "Layers", tier: "proficient", usedIn: ["Gameonix, Wonderlust"] },
            { name: "Rate Limiting", lucide: "Gauge", tier: "proficient", usedIn: ["BizPilot AI sliding window"] },
            { name: "Schema Validation (Joi)", lucide: "CheckCircle", tier: "proficient", usedIn: ["Wonderlust, Gameonix"] },
        ],
    },
];

// Comfortably honest — skills actively expanding
export const currentlyLearning = [
    "System Design & Scalable Architectures",
    "Docker & Containerization",
    "Redis Caching & In-Memory Queues",
];

// Roadmap
export const roadmap = [
    { name: "Microservices Architecture", when: "Q3 2026", why: "Decouple backend domains into autonomous, scalable services." },
    { name: "Docker & Kubernetes", when: "Q3–Q4 2026", why: "Containerize production Node.js services with automated orchestration." },
    { name: "Redis Caching at Scale", when: "Q4 2026", why: "Accelerate high-throughput API endpoints with low-latency in-memory caching." },
    { name: "Advanced System Design", when: "Ongoing", why: "Design distributed systems capable of handling millions of daily requests." },
];

export const softSkills = [
    { name: "Problem Solving", evidence: "280+ DSA problems on LeetCode & GFG; systematic debugging and optimization." },
    { name: "Hackathon Execution", evidence: "Won 1st Place at DIGONTOM Remote Hackathon 2026 delivering an AI copilot under tight deadlines." },
    { name: "API Engineering", evidence: "Shipped 18+ modular REST endpoints in production at Gameonix Esports with verified Postman test suites." },
];

export const tierMeta = {
    proficient: { label: "Proficient", dot: "bg-accent" },
    comfortable: { label: "Comfortable", dot: "border-2 border-accent bg-transparent" },
    learning: { label: "Learning", dot: "border-2 border-control-border bg-transparent" },
};
