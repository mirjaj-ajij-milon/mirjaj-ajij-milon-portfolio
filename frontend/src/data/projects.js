// =====================================================================
// PROJECTS — Mirjaj Ajij Milon
// Shipped 5 full-stack applications from resume
// category: "Full-Stack" | "Backend" | "AI/ML"
// status:   "Live" | "In Progress" | "Open Source"
// =====================================================================

export const projects = [
    {
        id: "bizpilot-ai",
        title: "BizPilot AI",
        tagline: "AI Retail Business Copilot with Groq API (Llama 3.3) & Multilingual Insights",
        problem:
            "Small and medium retail business owners struggle to analyze complex CRM and POS metrics. BizPilot AI provides an intuitive copilot that speaks English, Hindi, and Bengali with instant voice and text business insights.",
        category: "AI/ML",
        status: "Live",
        featured: true,
        role: "Lead Full-Stack & AI Engineer — DIGONTOM Remote Hackathon 2026 (1st Place Winner)",
        impact: [
            { metric: "1st Place", label: "DIGONTOM Remote Hackathon 2026 Winner" },
            { metric: "28+", label: "REST APIs engineered" },
            { metric: "3 Languages", label: "English, Hindi & Bengali voice/text" },
        ],
        tech: ["react", "nodejs", "express", "mongodb", "groq", "llama", "jwt", "tailwind"],
        links: {
            live: "https://bizpilot-ai.vercel.app",
            github: "https://github.com/mirjaj-ajij-milon/BizPilot-AI",
            docs: "https://github.com/mirjaj-ajij-milon/BizPilot-AI#readme",
        },
        thumbnail: "/images/project_Images/bizpilot.png",
        overview:
            "Hackathon 1st Place Winner at DIGONTOM Remote Hackathon 2026. BizPilot AI is an AI-powered retail CRM and POS copilot engineered with Groq API (Llama 3.3) delivering lightning-fast multilingual voice and text business analytics. It features 28+ modular REST APIs with Google OAuth 2.0, JWT auth, sliding window rate limiters on AI endpoints, automated Nodemailer SMTP password resets, bulk CSV/Excel data import, and an interactive real-time dashboard powered by React Context API.",
        architecture: [
            "React SPA — CRM and POS module state managed with React Context API",
            "Node.js & Express API — 28+ REST endpoints with sliding window rate limiter",
            "Groq API (Llama 3.3) — low-latency LLM inference for voice & text business intelligence",
            "MongoDB Atlas & Mongoose ODM — transactional sales, inventory, and customer records",
            "Google OAuth 2.0 & JWT — secure multi-tenant authentication with Nodemailer SMTP",
        ],
        features: [
            "1st Place Hackathon winning architecture with sub-second AI inference via Groq",
            "Multilingual voice and text insights in English, Hindi, and Bengali",
            "Sliding window rate limiting on AI endpoints to prevent quota exhaustion",
            "Bulk CSV and Excel import for catalog and POS transaction batches",
            "Real-time analytics dashboard with revenue, inventory velocity, and customer trends",
        ],
        challenges: [
            {
                challenge: "AI token spikes and rate-limit violations during concurrent multilingual queries.",
                solution:
                    "Architected an in-memory sliding window rate limiter on Express AI routes and optimized prompt payloads, ensuring deterministic response latencies under 500ms.",
            },
            {
                challenge: "Maintaining synchronized state across complex CRM and POS views during bulk file imports.",
                solution:
                    "Utilized React Context API for predictable local store mutations, batching API dispatch calls and updating UI tables optimistically.",
            },
        ],
        learnings:
            "Winning 1st place in DIGONTOM Hackathon demonstrated the value of rapid prototyping combined with defensive backend engineering: rate limiting, fail-safe OAuth fallbacks, and intuitive UX make all the difference.",
        future: ["WhatsApp Business API bot integration", "Offline-first PWA sync for remote shopkeepers", "Barcode scanning via camera"],
        screenshots: [
            "/images/project_Images/bizpilot.png",
        ],
    },
    {
        id: "swadzo",
        title: "Swadzo",
        tagline: "Full-Stack Food Ordering Platform with Stripe Checkout & Admin Control",
        problem:
            "Online ordering platforms require secure payment gateways, real-time cart state synchronization, and strict role-based access for store administrators.",
        category: "Full-Stack",
        status: "Live",
        featured: true,
        role: "Full-Stack Developer — complete architecture, API design, payment pipeline, and deployment",
        impact: [
            { metric: "100%", label: "secure Stripe checkout integration" },
            { metric: "RBAC", label: "role-based admin authorization" },
            { metric: "Render + Netlify", label: "production decoupled deployment" },
        ],
        tech: ["react", "nodejs", "express", "mongodb", "stripe", "jwt", "tailwind"],
        links: {
            live: "https://swadzo.netlify.app",
            github: "https://github.com/mirjaj-ajij-milon/swadzo",
            docs: "https://github.com/mirjaj-ajij-milon/swadzo#readme",
        },
        thumbnail: "/images/project_Images/Swadzo.png",
        overview:
            "Swadzo is a full-featured food ordering platform engineered with React, Node.js, Express, MongoDB, and Stripe. It incorporates robust JWT authentication, role-based admin authorization (RBAC), cart management, order status tracking, and end-to-end Stripe payment processing. Backend services are deployed on Render with environment-based configuration, paired with a high-performance Netlify frontend.",
        architecture: [
            "React Frontend (Netlify) — responsive product catalog, cart drawer & tracking views",
            "Node.js & Express REST API (Render) — modular MVC controllers with Mongoose ODM",
            "Stripe Payment Gateway — webhook-verified checkout session creation and fulfillment",
            "MongoDB Atlas — schemas for dishes, categories, orders, user credentials, and reviews",
            "JWT & Bcrypt — secure session authorization with protected admin routes",
        ],
        features: [
            "Seamless cart operations with persistent state and real-time subtotal calculation",
            "Stripe payment checkout flow with automated server-side webhook validation",
            "Role-based admin dashboard to manage menu items, categories, and order lifecycle",
            "Customer rating and review engine with verified-purchase enforcement",
            "Decoupled cloud deployment across Netlify and Render with CORS headers",
        ],
        challenges: [
            {
                challenge: "Preventing order creation inconsistencies if user drops before Stripe redirects.",
                solution:
                    "Utilized Stripe webhooks as the single source of truth for payment success, transitioning orders from pending to confirmed only after cryptographic signature verification.",
            },
            {
                challenge: "CORS and environment secret management across separate frontend and backend domains.",
                solution:
                    "Configured dynamic CORS origin whitelisting on Express and structured environment variable schemas for production staging.",
            },
        ],
        learnings:
            "Gained deep expertise in payment lifecycle management, webhook idempotency, and designing resilient REST endpoints that gracefully handle asynchronous payment failures.",
        future: ["Delivery driver live GPS tracking", "Push notifications via Web Push API", "Coupon and discount code engine"],
        screenshots: [
            "/images/project_Images/Swadzo.png",
        ],
    },
    {
        id: "tradesphere",
        title: "TradeSphere",
        tagline: "Full-Stack Simulated Stock Trading Platform across 3 Live Environments",
        problem:
            "Aspiring retail investors need a risk-free environment to practice trade execution, test strategies, and monitor real-time portfolio performance without capital loss.",
        category: "Full-Stack",
        status: "Live",
        featured: true,
        role: "Full-Stack Developer — monorepo architecture, serverless backend, and session auth",
        impact: [
            { metric: "3", label: "live environments (Vercel + 2 Netlify frontends)" },
            { metric: "Real-Time", label: "BUY/SELL simulated order matching" },
            { metric: "P&L", label: "automated analytics & wallet ledger" },
        ],
        tech: ["react", "nodejs", "express", "mongodb", "passport", "tailwind"],
        links: {
            live: "https://tradesphere.netlify.app",
            github: "https://github.com/mirjaj-ajij-milon/TradeSphere",
            docs: "https://github.com/mirjaj-ajij-milon/TradeSphere#readme",
        },
        thumbnail: "/images/project_Images/tradesphere.png",
        overview:
            "TradeSphere is a simulated stock trading platform designed to mirror realistic market workflows. It delivers BUY/SELL order workflows, real-time portfolio tracking, virtual wallet balance management, complete historical transaction ledgers, and dynamic Profit & Loss (P&L) analytics. Built as a monorepo deployed across 3 live environments (Vercel serverless backend and 2 Netlify frontends).",
        architecture: [
            "Monorepo Architecture — shared schemas and types across client and server packages",
            "Vercel Serverless Backend — Node.js Express serverless functions",
            "Netlify Frontend Deployments — production user portal and administrative staging",
            "MongoDB Atlas — portfolios, stock tickers, order books, and user accounts",
            "Passport.js & Bcrypt — secure session persistence and salted password storage",
        ],
        features: [
            "Instant BUY/SELL simulated trade execution with real-time portfolio recalculation",
            "Virtual wallet with ledger tracking deposit, withdrawals, and realized P&L",
            "Comprehensive transaction history with filters for date, ticker, and trade type",
            "Monorepo continuous deployment pipelines with isolated environment variables",
            "Passport.js session authentication securing all sensitive account operations",
        ],
        challenges: [
            {
                challenge: "Keeping user wallet balances and portfolio stock counts atomic during rapid BUY/SELL clicks.",
                solution:
                    "Structured transactional validation on MongoDB operations, ensuring user funds are deducted only when stock inventory is successfully updated.",
            },
            {
                challenge: "Managing unified deployment and environment variables across 3 independent live domains.",
                solution:
                    "Implemented scripted CI/CD build pipelines that inject scoped environment configurations for serverless endpoints and client hosts.",
            },
        ],
        learnings:
            "Mastered monorepo workflows, serverless backend deployment considerations on Vercel, and maintaining rigorous state consistency in financial simulations.",
        future: ["WebSocket live stock ticker stream", "Technical charting with TradingView widgets", "Leaderboard for top simulated traders"],
        screenshots: [
            "/images/project_Images/tradesphere.png",
        ],
    },
    {
        id: "vionex",
        title: "Vionex",
        tagline: "Real-Time P2P Video Conferencing Platform with WebRTC & Socket.io",
        problem:
            "Video communication tools often suffer from high server relay overhead and bloated dependencies. Vionex provides direct peer-to-peer browser video calling with minimal latency.",
        category: "Full-Stack",
        status: "Open Source",
        featured: false,
        role: "Full-Stack Developer — WebRTC signaling architecture & real-time React UI",
        impact: [
            { metric: "P2P", label: "direct WebRTC video/audio mesh stream" },
            { metric: "<100ms", label: "Socket.io signaling latency" },
            { metric: "Context API", label: "unified peer connection store" },
        ],
        tech: ["react", "nodejs", "express", "mongodb", "webrtc", "socket.io", "tailwind"],
        links: {
            live: "https://github.com/mirjaj-ajij-milon/Vionex",
            github: "https://github.com/mirjaj-ajij-milon/Vionex",
            docs: "https://github.com/mirjaj-ajij-milon/Vionex#readme",
        },
        thumbnail: "/images/project_Images/Vionex.png",
        overview:
            "Vionex is a real-time peer-to-peer video conferencing application architected using WebRTC and Socket.io. It features a Node.js signaling server that facilitates SDP offer/answer exchanges and ICE candidate handshakes for low-latency peer discovery, backed by an intuitive React UI managing peer stream states with Context API.",
        architecture: [
            "React Client — responsive video grid, media track controls (mute/camera toggle), and room joining",
            "Node.js & Socket.io Signaling Server — room-based event dispatching for WebRTC negotiation",
            "WebRTC RTCPeerConnection — direct browser-to-browser encrypted audio and video streaming",
            "MongoDB — persistent room codes, call audit records, and user profiles",
        ],
        features: [
            "One-click room generation with shareable meeting links",
            "Low-latency audio and high-definition video peer streaming",
            "Local media track controls: toggle microphone, camera, and screen sharing",
            "Real-time peer leave/join notifications with automatic layout rearrangement",
            "Responsive grid adapting smoothly from 1-on-1 to multi-participant rooms",
        ],
        challenges: [
            {
                challenge: "ICE candidate gathering timeouts and NAT traversal issues across asymmetric home networks.",
                solution:
                    "Configured resilient public STUN server fallback arrays and queued ICE candidates until remote peer descriptions were fully settled.",
            },
            {
                challenge: "Managing track replacement without disconnecting peer sessions during camera toggle.",
                solution:
                    "Used RTCRtpSender.replaceTrack for seamless audio/video mute toggles without renegotiation overhead.",
            },
        ],
        learnings:
            "Gained comprehensive understanding of WebRTC connection state lifecycles, SDP renegotiation, signaling protocols, and reactive media stream handling in React.",
        future: ["In-meeting text chat & file sharing", "Meeting recording via MediaRecorder API", "Grid pagination for large calls"],
        screenshots: [
            "/images/project_Images/Vionex.png",
        ],
    },
    {
        id: "wonderlust",
        title: "Wonderlust",
        tagline: "Full-Stack Travel & Rental Marketplace with Interactive Geocoding",
        problem:
            "Travelers require verified rental listings with precise geolocation mapping, high-resolution imagery, and verified host reviews.",
        category: "Full-Stack",
        status: "Live",
        featured: false,
        role: "Full-Stack Developer — MVC architecture, geocoding pipeline & Joi validation",
        impact: [
            { metric: "100%", label: "Cloudinary image upload pipeline" },
            { metric: "Interactive", label: "OpenCage & Leaflet.js map search" },
            { metric: "Joi", label: "strict server-side schema validation" },
        ],
        tech: ["nodejs", "express", "mongodb", "passport", "cloudinary", "leaflet", "bootstrap"],
        links: {
            live: "https://wonderlust-marketplace.onrender.com",
            github: "https://github.com/mirjaj-ajij-milon/wonderlust",
            docs: "https://github.com/mirjaj-ajij-milon/wonderlust#readme",
        },
        thumbnail: "/images/project_Images/Wonderlust.png",
        overview:
            "Wonderlust is a full-stack rental marketplace platform built using Node.js, Express, MongoDB, and Passport.js. It features a complete Cloudinary image upload and transformation pipeline, interactive property maps powered by OpenCage geocoding and Leaflet.js, detailed reviews and ratings, full CRUD workflows, and rigorous Joi schema validation.",
        architecture: [
            "Express.js & MVC Architecture — clean separation of routes, controllers, and models",
            "MongoDB & Mongoose — relational references for listings, reviews, and host profiles",
            "Cloudinary Pipeline — secure multipart image uploading with thumbnail optimization",
            "Leaflet.js & OpenCage API — forward and reverse geocoding with map pin markers",
            "Passport.js (Local Strategy) — session-based authentication and route authorization",
        ],
        features: [
            "Complete CRUD lifecycle for rental properties with photo galleries and amenities",
            "Interactive map visualization showing exact property coordinate pins",
            "User review and 5-star rating system linked to authenticated travelers",
            "Joi middleware validation safeguarding against malformed form injections",
            "Search and filter properties by destination, price per night, and category",
        ],
        challenges: [
            {
                challenge: "Validating untrusted user location strings and converting them into precise coordinates.",
                solution:
                    "Integrated OpenCage forward geocoding API with error-tolerant fallback defaults and cached coordinate lookups in MongoDB.",
            },
            {
                challenge: "Optimizing multi-megabyte photo uploads from mobile camera rolls without blocking HTTP responses.",
                solution:
                    "Streamed image buffers directly to Cloudinary with eager transformations for thumbnail generation.",
            },
        ],
        learnings:
            "Strengthened fundamentals in classic server-side MVC architectures, geolocation APIs, and data modeling for property booking platforms.",
        future: ["Calendar date availability picker", "Instant booking with Stripe payments", "Host payout management"],
        screenshots: [
            "/images/project_Images/Wonderlust.png",
        ],
    },
];

// Technologies shown in the hero → about marquee band
export const marqueeTech = [
    { name: "Node.js", devicon: "nodedotjs" },
    { name: "Express", devicon: "express", invertDark: true },
    { name: "React", devicon: "react" },
    { name: "MongoDB", devicon: "mongodb" },
    { name: "Socket.io", devicon: "socketdotio", invertDark: true },
    { name: "WebRTC", devicon: "webrtc" },
    { name: "JavaScript", devicon: "javascript" },
    { name: "Tailwind CSS", devicon: "tailwindcss" },
    { name: "Stripe", devicon: "stripe" },
    { name: "Postman", devicon: "postman" },
    { name: "Git", devicon: "git" },
];
