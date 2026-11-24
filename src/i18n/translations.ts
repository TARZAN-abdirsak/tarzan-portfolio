// Central translation dictionary. Default locale is Somali ("so").
// Keep proper nouns (JavaScript, GitHub, Marlupi, country names) untranslated.

export type Locale = "so" | "en";

export const translations = {
    en: {
        // ── Header ────────────────────────────────────────────
        "header.nav.services": "Services",
        "header.nav.privacy": "Privacy & Terms",
        "header.nav.about": "About Me",
        "header.nav.feedback": "Feedback",
        "header.cta.askAi": "Ask AI",

        // ── Hero ──────────────────────────────────────────────
        "hero.subtitle":
            "Helping businesses turn complex ideas into scalable and high-performance software solutions using modern technologies",
        "hero.codeQuality.title": "Code Quality",
        "hero.codeQuality.item1": "Implementation guarantee",
        "hero.codeQuality.item2": "Clean & Scalable Code",
        "hero.codeQuality.item3": "High Performance & ...",

        // ── Language switcher ─────────────────────────────────
        "lang.label": "Language",
        "lang.somali": "Somali",
        "lang.english": "English",

        // ── NearAppSection (shipping soon) ────────────────────
        "near.eyebrow": "Now shipping",
        "near.shipBadge": "LIVE COUNTDOWN",
        "near.headline.line1": "Shipping in the",
        "near.headline.line2": "next hours.",
        "near.appName": "NEAR",
        "near.tagline": "AI productivity + wellness companion",
        "near.description": "Five days. One mission. A focused mobile app that combines task management, daily mood check-ins, sleep logging, and Nia — an AI advisor that actually understands your day.",
        "near.countdown.label": "Hours until launch",
        "near.countdown.hours": "Hours",
        "near.countdown.minutes": "Minutes",
        "near.countdown.seconds": "Seconds",
        "near.countdown.live": "🚀 Now Live",
        "near.shipDate": "Target: May 14, 2026",
        "near.feature.tasks": "Tasks",
        "near.feature.mood": "Mood",
        "near.feature.sleep": "Sleep",
        "near.feature.nia": "Nia AI",
        "near.feature.streaks": "Streaks",
        "near.stack.label": "Built with",
        "near.cta": "Follow the build",
        "near.screen.1.label": "Today dashboard",
        "near.screen.2.label": "Task schedule",
        "near.screen.3.label": "Add new task",
        "near.screen.4.label": "Nia chat",

        // ── VideoScrollSection ────────────────────────────────
        "video.line1": "Production-Driven",
        "video.line2.soft": "Software",
        "video.line2.systems": "Systems",
        "video.line3": "For",
        "video.line4a": "Real-World",
        "video.line4b": "Scale",

        // ── DraggableSvgSection (tech stack) ──────────────────
        "stack.1.title.line1": "My",
        "stack.1.title.line2": "Tech",
        "stack.1.title.line3": "Stack",
        "stack.1.desc": "Tools I use daily to build scalable solutions.",
        "stack.2.title.line1": "Go Ahead,",
        "stack.2.title.line2": "Play",
        "stack.2.desc": "Drag the icons around. It's fun.",
        "stack.3.title.line1": "Built for",
        "stack.3.title.line2": "Scale",
        "stack.3.desc": "Cloud-native from day one.",
        "stack.4.title.line1": "End to",
        "stack.4.title.line2": "End",
        "stack.4.desc": "Frontend to backend, I do it all.",
        "stack.5.title.line1": "Ready When",
        "stack.5.title.line2": "You Are",
        "stack.5.desc": "Let's build something amazing.",

        // ── HorizontalScrollSection ───────────────────────────
        "projects.title.line1": "Projects",
        "projects.title.line2": "I've Built",
        "projects.subtitle":
            "10+ apps shipped. From fintech to e-commerce, each project taught me something new.",
        "production.sayHi": "(say hi)",
        "production.toMyProduction": "to my production",
        "projects.koodby.role": "Software Company",
        "projects.tirso.role": "POS & Store Control",
        "projects.marlupi.role": "Academy",
        "projects.soundExperience.role": "Event",
        "projects.zonetech.role": "Affiliate page",
        "projects.cricksLap.role": "Sports Analytics",
        "projects.febc.role": "Sports Analytics",

        // ── BusinessSystemsAndAiSection ───────────────────────
        "business.headline.part1": "you are not",
        "business.headline.alone": "Alone",
        "business.body1":
            "Not sure what to build yet? That's okay. I analyze your idea, your market, and your goals, then recommend the right system structure scalable, practical, and designed for growth. No pressure. No upfront cost. Just clarity.",
        "business.body2":
            "Beyond code, I integrate AI to automate your workflows, analyze data, and create smarter customer experiences.",
        "business.email.placeholder": "Enter your email",
        "business.cta.full": "Free Consultation",
        "business.cta.short": "Send",
        "business.success": "I'll be in touch soon!",
        "business.error": "Something went wrong. Please try again.",
        "business.proof.title": "Your team is here?",
        "business.proof.subtitle": "Real people. Real guidance. Real solutions.",
        "business.brief.title": "Project Brief",
        "business.brief.p1":
            "I'm working on a business idea and I want to build a proper system around it. Right now, I'm looking for help designing and developing a solution that fits my needs...",
        "business.brief.p2":
            "The goal is to create a system that supports my business operations and helps me grow. I'm open to guidance on the best structure...",
        "business.brief.p3":
            "This is an example project brief. Your submission will be reviewed personally by me.",
        "business.brief.placeholder": "Write your idea here",
        "business.cards.systemArchitecture": "System Architecture",

        // ── AiIntegrationSection ──────────────────────────────
        "ai.label.left.line1": "AI Integration",
        "ai.label.left.line2": "Strategy",
        "ai.label.right.line1": "Business Scaling",
        "ai.label.right.line2": "Automation",
        "ai.desc.line1": "Bring AI into your business and transform the way you work",
        "ai.desc.line2":
            "Using intelligent systems designed around your data, processes, and vision.",

        // ── CtaSection ────────────────────────────────────────
        "cta.clientsTitle": "Clients",

        // ── FeatureSection ────────────────────────────────────
        "feature.1.title": "AI Agents for Customer Support",
        "feature.1.desc":
            "I build AI assistants that handle customer questions 24/7, automate repetitive tasks, and escalate complex cases to your team using your business knowledge and tone.",
        "feature.1.item1": "24/7 Customer Care",
        "feature.1.item2": "Order / FAQ Automation",
        "feature.1.item3": "Human Handoff + Reports",

        "feature.2.title": "Seamless System Integration",
        "feature.2.desc":
            "I connect your existing tools, platforms, and databases into one unified system ensuring everything works together smoothly, securely, and at scale.",
        "feature.2.item1": "APIs & Third-Party Integrations",
        "feature.2.item2": "CRM, Payments, and Internal Tools",
        "feature.2.item3": "Secure & Scalable Architecture",

        "feature.3.title": "Smart Process Automation",
        "feature.3.desc":
            "I automate repetitive tasks and business processes to reduce manual work, improve efficiency, and let your team focus on what truly matters.",
        "feature.3.item1": "Workflow & Task Automation",
        "feature.3.item2": "Reduced Manual Errors",
        "feature.3.item3": "Faster Operations at Scale",

        "feature.4.title": "User-Centered Product Experience",
        "feature.4.desc":
            "I design intuitive, clean, and scalable interfaces that make complex systems easy to use ensuring users enjoy every interaction with your product.",
        "feature.4.item1": "Intuitive & Clean Interfaces",
        "feature.4.item2": "Smooth User Flows",
        "feature.4.item3": "Designed for Real Users",

        "feature.5.title": "Mobile App Production",
        "feature.5.desc":
            "I design and produce mobile applications from concept to launch focused on usability, performance, and real user needs across iOS and Android platforms.",
        "feature.5.item1": "End-to-End App Development",
        "feature.5.item2": "User-Centered Mobile Design",
        "feature.5.item3": "iOS & Android Ready",

        // ── ServicesSection ───────────────────────────────────
        "services.heading": "CAPABILITIES",
        "services.1.title": "DIGITAL SYSTEMS",
        "services.1.desc":
            "Building robust digital infrastructures that combine performance, scalability, and modern engineering standards. I create secure and efficient systems tailored to business growth.",
        "services.1.feat1": "/Enterprise System Architecture",
        "services.1.feat2": " / Scalable Backend Systems",

        "services.2.title": "ENTERPRISE SYSTEMS",
        "services.2.desc": "Large-scale systems engineered for operational efficiency.",
        "services.2.feat1": "/HOSPITAL MANAGEMENT",
        "services.2.feat2": "/CONSTRUCTION SYSTEMS",
        "services.2.feat3": "/ERP SOLUTIONS",
        "services.2.feat4": "/BUSINESS PLATFORMS",
        "services.2.feat5": "/CUSTOM SOFTWARE",

        "services.3.title": "E-COMMERCE & PLATFORMS",
        "services.3.desc":
            "Developing secure and scalable digital commerce ecosystems designed for growth",
        "services.3.feat1": "ONLINE STORES",
        "services.3.feat2": "/PAYMENT INTEGRATION",
        "services.3.feat3": "/PRODUCT SYSTEMS",
        "services.3.feat4": "/CUSTOM DASHBOARDS",
        "services.3.feat5": "/SCALABLE ARCHITECTURE",

        "services.4.title": "APPLICATION DEVELOPMENT",
        "services.4.desc":
            "Building scalable applications designed for performance, usability, and long-term growth.",
        "services.4.feat1": "/MOBILE APPLICATIONS",
        "services.4.feat2": "/WEB APPLICATIONS",
        "services.4.feat3": "/DESKTOP APPLICATIONS",
        "services.4.feat4": "/PLATFORM INTEGRATION",
        "services.4.feat5": "/PRODUCT ENGINEERING ",

        "services.5.title": "AI & INTEGRATION",
        "services.5.desc": "Engineered intelligence for modern systems.",
        "services.5.feat1": "/BUSINESS AI INTEGRATION",
        "services.5.feat2": "/AUTOMATION ENGINEERING",
        "services.5.feat3": "/DATA ARCHITECTURE",
        "services.5.feat4": "/PREDICTIVE SYSTEMS",

        // ── AboutMeSection ────────────────────────────────────
        "about.line1.pre": "Think For",
        "about.line1.hi": "Users.",
        "about.line2.pre": "Work With",
        "about.line2.hi": "Passion.",
        "about.line3.pre": "Value What",
        "about.line3.hi": "Matter .",
        "about.launch.loading": "Loading...",
        "about.launch.status": "🧪 Testing Mode · Tirso",
        "about.launch.in": "Release in",
        "about.launch.live": "🚀 Tirso is live",
        "about.currentRole": "Current role",
        "about.currentRole.desc":
            "Currently in testing: Tirso — a modern POS app that helps businesses manage products, track sales and cash flow, and handle everyday transactions with ease.",
        "about.greeting": "Hi my name is Abukar Abdirsak Gutale",
        "about.handwritten":
            "I enjoy solving problems and turning complex ideas into clear, reliable systems. I care about quality, clarity, and making things work the right way.",
        "about.badge.title": "I Am Tarzan",
        "about.badge.subtitle": "Creative Technologist · 2026",
        "about.badge.name": "Abukar Abdirsak",
        "about.badge.org": "Koodby · CEO",
        "about.badge.role": "Software & AI Engineer",
        "about.badge.strapText": "work with passion",
        "about.badge.strapLabel": "TARZAN.SOFTWARE",
        "about.badge.hint": "Drag to swing · Click to flip",

        // ── WorkflowSection ───────────────────────────────────
        "workflow.discovery.title": "DISCOVERY",
        "workflow.discovery.1": "Creative Brief",
        "workflow.discovery.2": "Brand Research",
        "workflow.discovery.3": "Mood Boards",
        "workflow.concept.title": "CONCEPT",
        "workflow.concept.1": "Visual Direction",
        "workflow.concept.2": "Art Direction",
        "workflow.concept.3": "Storyboarding",
        "workflow.design.title": "DESIGN",
        "workflow.design.1": "UI/UX Craft",
        "workflow.design.2": "Motion Design",
        "workflow.design.3": "Interaction Design",
        "workflow.develop.title": "DEVELOP",
        "workflow.develop.1": "Creative Coding",
        "workflow.develop.2": "WebGL & 3D",
        "workflow.develop.3": "Animations",
        "workflow.polish.title": "POLISH",
        "workflow.polish.1": "Micro-interactions",
        "workflow.polish.2": "Performance",
        "workflow.polish.3": "Pixel Perfect",
        "workflow.launch.title": "LAUNCH",
        "workflow.launch.1": "Go Live",
        "workflow.launch.2": "Case Study",
        "workflow.launch.3": "Awards Submit",

        // ── Footer ────────────────────────────────────────────
        "footer.next": "Next",
        "footer.work": "Work",
        "footer.menu": "Menu",
        "footer.menu.services": "Services",
        "footer.menu.about": "About",
        "footer.menu.feedback": "Feedback",
        "footer.privacy": "Privacy Policy",
        "footer.social": "Social",
        "footer.newsletter": "Newsletter",
        "footer.newsletter.desc":
            "Subscribe to stay up to date with the latest news and projects.",
        "footer.email.placeholder": "Email address",
        "footer.subscribe": "Subscribe",
        "footer.toTop": "To top",
        "footer.location": "istanbul & mogdisho",
        "footer.copyright": "© 2026  Tarzan",

        // ── Feedback page ─────────────────────────────────────
        "feedback.title": "Feedback",
        "feedback.subtitle":
            "Thoughts and experiences shared by people I've worked with.",
        "feedback.viewBtn": "View Feedback",
        "feedback.leaveBtn": "Leave Feedback",
        "feedback.loadMore": "Load More",
        "feedback.emptyTitle": "No feedback yet",
        "feedback.emptySubtitle":
            "Be the first to share your thoughts and experience.",
        "feedback.emptyCta": "Leave Feedback",

        // ── Privacy page ──────────────────────────────────────
        "privacy.pageTitle": "Privacy Policy & Terms",
        "privacy.pageSubtitle": "Individual Software & AI Developer",
        "privacy.lastUpdated": "Last Updated: February 2026",
        "privacy.toc": "Table of contents",
        "privacy.backToTop": "Back to top",

        "privacy.s1.title": "1. Introduction",
        "privacy.s1.body":
            "I am an independent Software & AI Specialist working as an individual, not as a company. I use AI tools to assist my work, and I am fully committed to protecting the privacy and data of every client I work with.",

        "privacy.s2.title": "2. Information I Collect",
        "privacy.s2.intro": "When a client requests a free consultation or contacts me, I collect:",
        "privacy.s2.i1": "Name",
        "privacy.s2.i2": "Email",
        "privacy.s2.i3": "Project idea or details",
        "privacy.s2.i4": "Any information voluntarily submitted by the client",
        "privacy.s2.note":
            "This data may first be processed with the help of AI tools, then reviewed directly by me.",

        "privacy.s3.title": "3. How I Use Information",
        "privacy.s3.intro": "Client data is used for:",
        "privacy.s3.i1": "Analyzing project ideas",
        "privacy.s3.i2": "Providing free consultations",
        "privacy.s3.i3": "Preparing blueprints / general overviews",
        "privacy.s3.i4": "Contacting the client within 24 hours",
        "privacy.s3.i5": "Project planning and scheduling",

        "privacy.s4.title": "4. Security & Data Retention",
        "privacy.s4.intro": "I use secure methods to protect client data:",
        "privacy.s4.i1": "Access control measures",
        "privacy.s4.i2": "Secure storage systems",
        "privacy.s4.i3": "Data is not used for purposes outside the agreement",
        "privacy.s4.i4": "Data is retained only as long as necessary",

        "privacy.s5.title": "5. Data Sharing",
        "privacy.s5.intro": "I do not sell or share client data with third parties, except for:",
        "privacy.s5.i1": "Legal requirements",
        "privacy.s5.i2": "Technical services necessary to deliver the project",

        "privacy.s6.title": "6. Client Rights",
        "privacy.s6.intro": "Clients have the right to:",
        "privacy.s6.i1": "Access their data",
        "privacy.s6.i2": "Request data deletion",
        "privacy.s6.i3": "Opt-out of future communications",

        "privacy.s7.title": "7. Free Consultation",
        "privacy.s7.i1": "I offer free consultations as an individual developer.",
        "privacy.s7.i2":
            "Advice and insights provided are conceptual and do not guarantee business results.",

        "privacy.s8.title": "8. AI Assistance Disclaimer",
        "privacy.s8.intro": "I use AI tools to help with:",
        "privacy.s8.i1": "Data collection",
        "privacy.s8.i2": "Idea analysis",
        "privacy.s8.i3": "All final decisions are made by me personally.",
        "privacy.s8.i4": "AI is not a substitute for human judgment.",

        "privacy.s9.title": "9. Project Workflow",
        "privacy.s9.i1": "I will contact clients within 24 hours.",
        "privacy.s9.i2": "After agreement, I prepare a Blueprint or general overview.",
        "privacy.s9.i3": "Project timelines are mutually agreed between me and the Client.",
        "privacy.s9.i4": "Consultations cannot exceed 1 hour.",

        "privacy.s10.title": "10. Features & Scope",
        "privacy.s10.intro": "During development:",
        "privacy.s10.i1": "New features cannot be added mid-development.",
        "privacy.s10.i2":
            "The Client must clarify beforehand if the project is Version 1 (V1) or a final release with no further development.",

        "privacy.s11.title": "11. Testing & Delivery",
        "privacy.s11.i1": "Once features are completed, the project undergoes testing.",
        "privacy.s11.i2":
            "Afterwards, it is released, and the system or product is transferred to the Client.",

        "privacy.s12.title": "12. Intellectual Property",
        "privacy.s12.body":
            "Blueprints, concepts, and advice I provide remain my personal intellectual property until a formal agreement is signed or payment is made.",

        "privacy.s13.title": "13. Transfer & Liability",
        "privacy.s13.intro": "Upon transfer of the system or product:",
        "privacy.s13.i1": "Full responsibility shifts to the Client.",
        "privacy.s13.i2":
            "I am not responsible for future usage or decisions made by the Client.",

        "privacy.s14.title": "14. Maintenance & Updates",
        "privacy.s14.i1":
            "If the Client pays a maintenance fee: I will fix bugs and provide updates.",
        "privacy.s14.i2": "If no maintenance fee is paid: I am not responsible for future issues.",

        "privacy.s15.title": "15. Limitation of Liability",
        "privacy.s15.body":
            "I am not liable for business losses, lost profits, or decisions the Client bases on my advice or blueprints.",

        "privacy.s16.title": "16. Confidentiality",
        "privacy.s16.body":
            "All client data and ideas are confidential and will not be used for any purpose outside the project.",

        "privacy.s17.title": "17. Governing Law",
        "privacy.s17.body":
            "This document is governed by the applicable local laws of my country of residence.",

        "privacy.s18.title": "18. Changes",
        "privacy.s18.body":
            "I reserve the right to modify this Privacy Policy & Terms at any time.",

        "privacy.s19.title": "19. Contact",
        "privacy.s19.email": "Email:",
        "privacy.s19.web": "Website:",

        // TOC labels (short)
        "privacy.toc.1": "Introduction",
        "privacy.toc.2": "Information I Collect",
        "privacy.toc.3": "How I Use Information",
        "privacy.toc.4": "Security & Data Retention",
        "privacy.toc.5": "Data Sharing",
        "privacy.toc.6": "Client Rights",
        "privacy.toc.7": "Free Consultation",
        "privacy.toc.8": "AI Disclaimer",
        "privacy.toc.9": "Project Workflow",
        "privacy.toc.10": "Features & Scope",
        "privacy.toc.11": "Testing & Delivery",
        "privacy.toc.12": "Intellectual Property",
        "privacy.toc.13": "Transfer & Liability",
        "privacy.toc.14": "Maintenance & Updates",
        "privacy.toc.15": "Limitation of Liability",
        "privacy.toc.16": "Confidentiality",
        "privacy.toc.17": "Governing Law",
        "privacy.toc.18": "Changes",
        "privacy.toc.19": "Contact",
    },

    so: {
        // ── Header ────────────────────────────────────────────
        "header.nav.services": "Adeegyada",
        "header.nav.privacy": "Sirta & Shuruudaha",
        "header.nav.about": "Iga Akhri",
        "header.nav.feedback": "Jawaab-Celin",
        "header.cta.askAi": "Weydii AI",

        // ── Hero ──────────────────────────────────────────────
        "hero.subtitle":
            "Waxaan ka caawiyaa shirkadaha inay fikradaha adag u rogaan software wax soo saar sare leh oo la kobciyo karo, anigoo isticmaalaya teknooloojiyada casriga ah.",
        "hero.codeQuality.title": "Tayada Koodhka",
        "hero.codeQuality.item1": "Hubinta hirgelinta",
        "hero.codeQuality.item2": "Kood nadiif ah & la koriyo karo",
        "hero.codeQuality.item3": "Waxqabad sare & ...",

        // ── Language switcher ─────────────────────────────────
        "lang.label": "Luuqada",
        "lang.somali": "Soomaali",
        "lang.english": "Ingiriis",

        // ── NearAppSection (shipping soon) ────────────────────
        "near.eyebrow": "Hadda waa la sii-deyn doonaa",
        "near.shipBadge": "TIRO-LAABASHO TOOS AH",
        "near.headline.line1": "Waxaa la sii-deyn doonaa",
        "near.headline.line2": "saacadaha soo socda.",
        "near.appName": "NEAR",
        "near.tagline": "AI saaxiib wax-soo-saar iyo caafimaad",
        "near.description": "Shan maalmood. Hal himilo. App mobile oo diiradda saaraysa maaraynta hawlaha, hubinta niyada maalinlaha ah, diiwaangelinta hurdada, iyo Nia — AI la-talin oo runti maalintaada fahmaya.",
        "near.countdown.label": "Saacadaha ka horeeya furitaanka",
        "near.countdown.hours": "Saac",
        "near.countdown.minutes": "Daqiiqo",
        "near.countdown.seconds": "Ilbiriqsi",
        "near.countdown.live": "🚀 Hadda Furmay",
        "near.shipDate": "Bartilmaameed: Maajo 14, 2026",
        "near.feature.tasks": "Hawlaha",
        "near.feature.mood": "Niyada",
        "near.feature.sleep": "Hurdada",
        "near.feature.nia": "Nia AI",
        "near.feature.streaks": "Taxanaha",
        "near.stack.label": "Lagu dhisay",
        "near.cta": "Raac dhisitaanka",
        "near.screen.1.label": "Maanta dashboard",
        "near.screen.2.label": "Jadwalka hawlaha",
        "near.screen.3.label": "Ku dar hawl cusub",
        "near.screen.4.label": "Sheekaysiga Nia",

        // ── VideoScrollSection ────────────────────────────────
        "video.line1": "Nidaamyo Software",
        "video.line2.soft": "ee Wax-Soo-Saar",
        "video.line2.systems": "Sare leh",
        "video.line3": "U-loogu-talagalay",
        "video.line4a": "Adduunka",
        "video.line4b": "Dhabta ah",

        // ── DraggableSvgSection (tech stack) ──────────────────
        "stack.1.title.line1": "Aaladahayga",
        "stack.1.title.line2": "Farsamada",
        "stack.1.title.line3": "Aan Isticmaalo",
        "stack.1.desc": "Aalado aan maalin walba ku dhiso xalal la kobciyo karo.",
        "stack.2.title.line1": "Soco,",
        "stack.2.title.line2": "Ciyaar",
        "stack.2.desc": "Jiid astaamaha. Way xiiso badan tahay.",
        "stack.3.title.line1": "Loo dhisay",
        "stack.3.title.line2": "Korin",
        "stack.3.desc": "Cloud-native maalintii ugu horeeyay.",
        "stack.4.title.line1": "Daraf ilaa",
        "stack.4.title.line2": "Daraf",
        "stack.4.desc": "Frontend ilaa backend, dhammaantood waan qabtaa.",
        "stack.5.title.line1": "Marka aad",
        "stack.5.title.line2": "Diyaar tahay",
        "stack.5.desc": "Aan wax cajiib ah wada dhisno.",

        // ── HorizontalScrollSection ───────────────────────────
        "projects.title.line1": "Mashruucyo",
        "projects.title.line2": "Aan Dhisay",
        "projects.subtitle":
            "In ka badan 10 app oo la sii daayay. Laga bilaabo fintech ilaa e-commerce, mashruuc kasta wax cusub buu i baray.",
        "production.sayHi": "(salaan)",
        "production.toMyProduction": "wax-soo-saarkayga",
        "projects.koodby.role": "Shirkad Software",
        "projects.tirso.role": "App POS & Maamul Dukaan",
        "projects.marlupi.role": "Akadeemi",
        "projects.soundExperience.role": "Munaasibad",
        "projects.zonetech.role": "Bog wakaalad",
        "projects.cricksLap.role": "Falanqaynta Ciyaaraha",
        "projects.febc.role": "Falanqaynta Ciyaaraha",

        // ── BusinessSystemsAndAiSection ───────────────────────
        "business.headline.part1": "ma tihid",
        "business.headline.alone": "Kaligaa",
        "business.body1":
            "Ma hubtid waxa aad dhiseyso? Hagaag waaye. Waxaan falanqaynaa fikradaada, suuqaaga, iyo himiladaada, kadibna waxaan kuu soo jeedinaa qaab-dhismeed habboon oo la kobciyo karo, oo la hawl geliyo karo, una loo sameeyay korin. Cadaadis ma jiro. Lacag horay loo bixin lahaa ma jirto. Kaliya caddayn.",
        "business.body2":
            "Marka laga reebo koodhka, AI ayaan ku daraa nidaamkaaga si aan u toosiyo hawlaha, falanqeeyo xogta, oo aan u abuuro waaya'aragnimo macmiil oo caqli leh.",
        "business.email.placeholder": "Geli emailkaaga",
        "business.cta.full": "La-talin Bilaash ah",
        "business.cta.short": "Dir",
        "business.success": "Si dhakhso ah ayaan kula soo xidhiidhi doonaa!",
        "business.error": "Wax baa khaldamay. Fadlan mar kale isku day.",
        "business.proof.title": "Kooxdaadu halkan ma joogtaa?",
        "business.proof.subtitle": "Dad dhab ah. Hagid dhab ah. Xalal dhab ah.",
        "business.brief.title": "Faahfaahin Mashruuc",
        "business.brief.p1":
            "Waxaan ka shaqeynayaa fikrad ganacsi waxaanan rabaa inaan u dhiso nidaam habboon. Hadda, waxaan raadinayaa caawimaad naqshadeyn iyo horumarin oo ku habboon baahiyaheyga...",
        "business.brief.p2":
            "Yoolku waa in la abuuro nidaam taageeraya hawlgalka ganacsigeyga oo iga caawiya inaan koro. Waxaan u furan ahay hagid ku saabsan qaab-dhismeedka ugu fiican...",
        "business.brief.p3":
            "Tani waa tusaale faahfaahin mashruuc. Waxa aad soo gudbiso aniga shakhsi ahaan ayaa eegi doona.",
        "business.brief.placeholder": "Halkan ku qor fikradaada",
        "business.cards.systemArchitecture": "Qaab-dhismeedka Nidaamka",

        // ── AiIntegrationSection ──────────────────────────────
        "ai.label.left.line1": "Isku-darka AI",
        "ai.label.left.line2": "Istraatiijiyad",
        "ai.label.right.line1": "Korinta Ganacsiga",
        "ai.label.right.line2": "Iskutoosin",
        "ai.desc.line1": "AI ku dar ganacsigaaga oo beddel sida aad u shaqeyso",
        "ai.desc.line2":
            "Adoo isticmaalaya nidaamyo caqli leh oo lagu naqshadeeyay xogtaada, habkaaga, iyo aragtidaada.",

        // ── CtaSection ────────────────────────────────────────
        "cta.clientsTitle": "Macaamiisha",

        // ── FeatureSection ────────────────────────────────────
        "feature.1.title": "Wakiilada AI ee Adeegga Macaamiisha",
        "feature.1.desc":
            "Waxaan dhisaa caawimaad AI oo qaabilsa su'aalaha macaamiisha 24/7, iskutoosiya hawlaha la celcelinayo, oo u gudbiya kiisaska adag kooxdaada, iyada oo la isticmaalayo aqoonta iyo cod-dhawaaqa ganacsigaaga.",
        "feature.1.item1": "Daryeel Macaamiil 24/7",
        "feature.1.item2": "Iskutoosinta Dalabka / FAQ",
        "feature.1.item3": "U-gudbinta Dadka + Warbixino",

        "feature.2.title": "Isku-darka Nidaamka oo Sahlan",
        "feature.2.desc":
            "Waxaan isku xidhaa aaladahaaga jira, madasha, iyo databases-ka oo aan ka dhigaa hal nidaam la mid ah, anigoo hubinaya in dhammaantood si fudud, sugan, oo la kobciyo karo ay u wada shaqeeyaan.",
        "feature.2.item1": "APIs & Isku-darka Saddexaad",
        "feature.2.item2": "CRM, Lacag-bixinta, & Aaladaha Gudaha",
        "feature.2.item3": "Qaab-dhismeed Sugan & La Kobciyo Karo",

        "feature.3.title": "Iskutoosin Caqli leh oo Habkeed",
        "feature.3.desc":
            "Waxaan toosiyaa hawlaha la celcelinayo iyo habka ganacsiga si loo yareeyo shaqada gacanta, loo kordhiyo waxtarka, oo aad kooxdaada u oggolaato inay diiradda saaraan waxa runti muhiim ah.",
        "feature.3.item1": "Iskutoosinta Hawlaha & Workflow",
        "feature.3.item2": "Khaladaad Gacan Yar",
        "feature.3.item3": "Hawlgal Dhakhso ah oo Korinaya",

        "feature.4.title": "Khibrad Macaamiilka Diiradda Saaran",
        "feature.4.desc":
            "Waxaan naqshadeeyaa interface fudud, nadiif ah, oo la kobciyo karo si loo sahlo nidaamyada adag - waxaad hubisaa in macaamiishu ku raaxaystaan dhammaan isfalgalka iyo alaabtaada.",
        "feature.4.item1": "Interface Fudud & Nadiif ah",
        "feature.4.item2": "Socod Macaamiil Habboon",
        "feature.4.item3": "Loo Naqshadeeyay Dadka Runta ah",

        "feature.5.title": "Wax-soo-saarka App-yada Mobile",
        "feature.5.desc":
            "Waxaan naqshadeeyaa oo soo saaraa app-yada mobile laga bilaabo fikrad ilaa furitaanka oo diiradda saaraya isticmaalka, waxqabadka, iyo baahiyaha macaamiisha ku saabsan iOS iyo Android.",
        "feature.5.item1": "Horumarin App oo Dhammaystiran",
        "feature.5.item2": "Naqshadeyn Mobile oo Macaamiil-loogu Talagalay",
        "feature.5.item3": "iOS & Android Diyaar ah",

        // ── ServicesSection ───────────────────────────────────
        "services.heading": "AWOODAHA",
        "services.1.title": "NIDAAMYO DIGITAL",
        "services.1.desc":
            "Dhisida kaabayaal digital oo adag oo isku daraya waxqabad, kobac, iyo heerar farsamo casri ah. Waxaan abuuraa nidaamyo sugan oo waxtar leh oo loogu talagalay koritaanka ganacsiga.",
        "services.1.feat1": "/Qaab-dhismeed Nidaam Shirkad",
        "services.1.feat2": " / Nidaamyo Backend la Kobciyo Karo",

        "services.2.title": "NIDAAMYO SHIRKAD",
        "services.2.desc": "Nidaamyo waaweyn oo loogu talagalay waxqabad hawlgal sare.",
        "services.2.feat1": "/MAARAYNTA ISBITAALADA",
        "services.2.feat2": "/NIDAAMYO DHISMO",
        "services.2.feat3": "/XALAL ERP",
        "services.2.feat4": "/MADASHA GANACSIGA",
        "services.2.feat5": "/SOFTWARE GAAR AH",

        "services.3.title": "E-COMMERCE & MADASHA",
        "services.3.desc":
            "Horumarinta nidaamyo ganacsi digital oo sugan oo la kobciyo karo oo loo naqshadeeyay korinta",
        "services.3.feat1": "DUKAANO ONLINE AH",
        "services.3.feat2": "/ISKU-DARKA LACAG-BIXINTA",
        "services.3.feat3": "/NIDAAMYO ALAAB",
        "services.3.feat4": "/DASHBOARDS GAAR AH",
        "services.3.feat5": "/QAAB-DHISMEED LA KOBCIYO KARO",

        "services.4.title": "HORUMARINTA APPLICATION-KA",
        "services.4.desc":
            "Dhisida application-yo la kobciyo karo oo loo naqshadeeyay waxqabad, isticmaal fudud, iyo korin muddo-dheer ah.",
        "services.4.feat1": "/APPLICATION-YO MOBILE",
        "services.4.feat2": "/APPLICATION-YO WEB",
        "services.4.feat3": "/APPLICATION-YO DESKTOP",
        "services.4.feat4": "/ISKU-DARKA MADASHA",
        "services.4.feat5": "/INJINEERIMO ALAAB ",

        "services.5.title": "AI & ISKU-DAR",
        "services.5.desc": "Caqli farsamo loo dhisay nidaamyada casriga ah.",
        "services.5.feat1": "/ISKU-DARKA AI EE GANACSIGA",
        "services.5.feat2": "/INJINEERIMA ISKUTOOSINTA",
        "services.5.feat3": "/QAAB-DHISMEEDKA XOGTA",
        "services.5.feat4": "/NIDAAMYO SAADAAL",

        // ── AboutMeSection ────────────────────────────────────
        "about.line1.pre": "U Fakar",
        "about.line1.hi": "Isticmaalayaasha.",
        "about.line2.pre": "Ku Shaqee",
        "about.line2.hi": "Xiisaha.",
        "about.line3.pre": "Qiimee Waxa",
        "about.line3.hi": "Muhiim ah .",
        "about.launch.loading": "Soo dejinaya...",
        "about.launch.status": "🧪 Marxaladda Tijaabada · Tirso",
        "about.launch.in": "Siideynta",
        "about.launch.live": "🚀 Tirso wuu furmay",
        "about.currentRole": "Doorka Hadda",
        "about.currentRole.desc":
            "Hadda marxaladda tijaabada: Tirso — app POS casri ah oo ka caawiya ganacsiyada maamulka alaabta, raadraaca iibka iyo lacagta, iyo habaynta macaamilka maalinlaha ah si fudud.",
        "about.greeting": "Salaam, magacaygu waa Abukar Abdirsak Gutale",
        "about.handwritten":
            "Waxaan ku riyaaqaa xallinta dhibaatooyinka iyo u rogida fikradaha adag nidaamyo cad oo lagu kalsoonaan karo. Waxaan dan ka leeyahay tayada, caddaynta, iyo in waxyaalaha si sax ah loo shaqeysiiyo.",
        "about.badge.title": "I Am Tarzan",
        "about.badge.subtitle": "Injineer Hal-abuur · 2026",
        "about.badge.name": "Abukar Abdirsak",
        "about.badge.org": "Koodby · CEO",
        "about.badge.role": "Software & AI Engineer",
        "about.badge.strapText": "ku shaqee xiisaha",
        "about.badge.strapLabel": "TARZAN.SOFTWARE",
        "about.badge.hint": "Jiid si aad u ruxdo · Guji si aad u rogto",

        // ── WorkflowSection ───────────────────────────────────
        "workflow.discovery.title": "BARASHO",
        "workflow.discovery.1": "Faahfaahinta Halgan",
        "workflow.discovery.2": "Cilmi-baadhista Brand",
        "workflow.discovery.3": "Sawiro Hagid",
        "workflow.concept.title": "FIKRAD",
        "workflow.concept.1": "Hagid Aragti",
        "workflow.concept.2": "Hagid Farshaxan",
        "workflow.concept.3": "Sheeko-sawir",
        "workflow.design.title": "NAQSHADEYN",
        "workflow.design.1": "Sancada UI/UX",
        "workflow.design.2": "Naqshad Dhaqdhaqaaq",
        "workflow.design.3": "Naqshad Isfalgal",
        "workflow.develop.title": "HORUMARIN",
        "workflow.develop.1": "Koodh Hal-abuur",
        "workflow.develop.2": "WebGL & 3D",
        "workflow.develop.3": "Dhaqdhaqaaqyo",
        "workflow.polish.title": "DHAMEYN",
        "workflow.polish.1": "Isfalgalo Yaryar",
        "workflow.polish.2": "Waxqabad",
        "workflow.polish.3": "Pixel Sax ah",
        "workflow.launch.title": "FURITAAN",
        "workflow.launch.1": "Soo Bandhig",
        "workflow.launch.2": "Daraasad Kiis",
        "workflow.launch.3": "U Gudbi Abaalmarinta",

        // ── Footer ────────────────────────────────────────────
        "footer.next": "Xiga",
        "footer.work": "Shaqo",
        "footer.menu": "Liiska",
        "footer.menu.services": "Adeegyada",
        "footer.menu.about": "Iga Akhri",
        "footer.menu.feedback": "Jawaab-Celin",
        "footer.privacy": "Sirta",
        "footer.social": "Bulsho",
        "footer.newsletter": "Warsidaha",
        "footer.newsletter.desc":
            "Iska diiwaangeli si aad u hesho warar iyo mashruucyo cusub.",
        "footer.email.placeholder": "Cinwaanka emailka",
        "footer.subscribe": "Diiwaangeli",
        "footer.toTop": "Kor u kac",
        "footer.location": "istanbul & muqdisho",
        "footer.copyright": "© 2026  Tarzan",

        // ── Feedback page ─────────────────────────────────────
        "feedback.title": "Jawaab-Celin",
        "feedback.subtitle":
            "Aragtiyo iyo waaya-aragnimo ay la wadaageen dadkii aan la shaqeeyay.",
        "feedback.viewBtn": "Eeg Jawaab-Celinta",
        "feedback.leaveBtn": "Reeb Jawaab-Celin",
        "feedback.loadMore": "Muuji In Badan",
        "feedback.emptyTitle": "Weli jawaab-celin ma jirto",
        "feedback.emptySubtitle":
            "Noqo qofkii ugu horreeyay ee la wadaaga aragtidiisa iyo waaya-aragnimadiisa.",
        "feedback.emptyCta": "Reeb Jawaab-Celin",

        // ── Privacy page ──────────────────────────────────────
        "privacy.pageTitle": "Sirta & Shuruudaha",
        "privacy.pageSubtitle": "Horumariye Software & AI Shakhsi ah",
        "privacy.lastUpdated": "Wax-ka-bedelkii ugu Dambeeyay: Febraayo 2026",
        "privacy.toc": "Tusmada",
        "privacy.backToTop": "Kor u laabo",

        "privacy.s1.title": "1. Hordhac",
        "privacy.s1.body":
            "Waxaan ahay khabiir Software & AI ah oo shaqeeya shakhsi ahaan, ma ahaan shirkad. Waxaan isticmaalaa aaladaha AI si ay shaqadayda iiga caawiyaan, waxaanan si buuxda u dadaalayaa inaan ilaaliyo sirta iyo xogta macaamiil kasta oo aan la shaqeeyo.",

        "privacy.s2.title": "2. Macluumaadka aan Ururiyo",
        "privacy.s2.intro": "Marka macaamiil uu codsado la-talin bilaash ah ama uu ila xidhiidho, waxaan ururiyaa:",
        "privacy.s2.i1": "Magaca",
        "privacy.s2.i2": "Email",
        "privacy.s2.i3": "Fikradda ama faahfaahinta mashruuca",
        "privacy.s2.i4": "Macluumaad kasta oo si ikhtiyaari ah u soo gudbiyay macaamiilka",
        "privacy.s2.note":
            "Xogtan markii hore waxaa lagu falanqayn karaa aaladaha AI, kadibna aniga shakhsi ahaan ayaa eegaya.",

        "privacy.s3.title": "3. Sida aan u Isticmaalo Macluumaadka",
        "privacy.s3.intro": "Xogta macaamiilka waxaa loo isticmaalaa:",
        "privacy.s3.i1": "Falanqaynta fikradaha mashruuca",
        "privacy.s3.i2": "Bixinta la-talin bilaash ah",
        "privacy.s3.i3": "Diyaarinta qorshe / dulmar guud",
        "privacy.s3.i4": "La xidhiidhka macaamiilka 24 saac gudahood",
        "privacy.s3.i5": "Qorshaynta iyo jadwalka mashruuca",

        "privacy.s4.title": "4. Amniga & Hayntinta Xogta",
        "privacy.s4.intro": "Waxaan isticmaalaa habab sugan si aan u ilaaliyo xogta macaamiilka:",
        "privacy.s4.i1": "Habab xakameynta gelitaanka",
        "privacy.s4.i2": "Nidaamyo kaydin oo sugan",
        "privacy.s4.i3": "Xogta looma isticmaalo ujeeddooyin ka baxsan heshiiska",
        "privacy.s4.i4": "Xogta waxaa lagu hayaa muddo ay loo baahan yahay kaliya",

        "privacy.s5.title": "5. Wadaagga Xogta",
        "privacy.s5.intro": "Xogta macaamiilka ma iibiyo, mana la wadaago dad saddexaad, marka laga reebo:",
        "privacy.s5.i1": "Shuruudaha sharciga",
        "privacy.s5.i2": "Adeegyo farsamo oo lagama maarmaan u ah dhammaystirka mashruuca",

        "privacy.s6.title": "6. Xuquuqaha Macaamiilka",
        "privacy.s6.intro": "Macaamiisha waxay xaq u leeyihiin inay:",
        "privacy.s6.i1": "Helaan xogtooda",
        "privacy.s6.i2": "Codsadaan tirtirida xogta",
        "privacy.s6.i3": "Iska saaraan isgaadhsiinta mustaqbalka",

        "privacy.s7.title": "7. La-talinta Bilaashka",
        "privacy.s7.i1": "Waxaan siiyaa la-talin bilaash ah anigoo ah horumariye shakhsi ah.",
        "privacy.s7.i2":
            "Talooyinka iyo aragtida la bixiyo waa kuwo fikradeed, mana dammaanad qaadayaan natiijooyin ganacsi.",

        "privacy.s8.title": "8. Sheegasho ku Saabsan AI",
        "privacy.s8.intro": "Waxaan isticmaalaa aaladaha AI si ay iigu caawiyaan:",
        "privacy.s8.i1": "Ururinta xogta",
        "privacy.s8.i2": "Falanqaynta fikradda",
        "privacy.s8.i3": "Dhammaan go'aanada kama dambeysta ah aniga shakhsi ahaan ayaa qaata.",
        "privacy.s8.i4": "AI ma beddeli karo go'aanka aadanaha.",

        "privacy.s9.title": "9. Habka Mashruuca",
        "privacy.s9.i1": "Waxaan la xidhiidhi doonaa macaamiisha 24 saac gudahood.",
        "privacy.s9.i2": "Marka heshiis la gaadho, waxaan diyaariyaa Qorshe ama dulmar guud.",
        "privacy.s9.i3": "Waqtiga mashruuca waxaa si wadajir ah ugu heshiiyaan aniga iyo macaamiilka.",
        "privacy.s9.i4": "La-talinta kama bata 1 saac.",

        "privacy.s10.title": "10. Astaamaha & Baaxadda",
        "privacy.s10.intro": "Inta uu horumarinta socdo:",
        "privacy.s10.i1": "Astaamo cusub looma dari karo dhexda horumarinta.",
        "privacy.s10.i2":
            "Macaamiilka waa inuu hore u caddeeyaa haddii mashruucu yahay Version 1 (V1) ama sii-deyn kama dambeyste ah oo aan horumarin dheeraad ah lahayn.",

        "privacy.s11.title": "11. Tijaabinta & Gudbinta",
        "privacy.s11.i1": "Marka astaamaha la dhammeeyo, mashruuca waxaa lagu sameeyaa tijaabin.",
        "privacy.s11.i2":
            "Ka dib, waa la sii daayaa, nidaamka ama alaabtana waxaa loo gudbiyaa Macaamiilka.",

        "privacy.s12.title": "12. Hantida Caqliga",
        "privacy.s12.body":
            "Qorshayaasha, fikradaha, iyo talooyinka aan bixiyo waxay yihiin hantidayda shakhsi ahaaneed ilaa heshiis rasmi ah la saxiixay ama lacag la bixiyay.",

        "privacy.s13.title": "13. Gudbinta & Mas'uuliyadda",
        "privacy.s13.intro": "Marka la gudbiyo nidaamka ama alaabta:",
        "privacy.s13.i1": "Mas'uuliyadda buuxda waxay u gudubtaa Macaamiilka.",
        "privacy.s13.i2":
            "Anigu kama masuul ahi isticmaalka mustaqbalka ama go'aanada uu qaato Macaamiilku.",

        "privacy.s14.title": "14. Dayactirka & Cusboonaysiinta",
        "privacy.s14.i1":
            "Haddii Macaamiilku bixiyo lacagta dayactirka: Waxaan hagaajin doonaa khaladaadka oo aan sameyn doonaa cusboonaysiin.",
        "privacy.s14.i2": "Haddii lacagta dayactirka aan la bixin: Anigu kama masuul ahi dhibaatooyinka mustaqbalka.",

        "privacy.s15.title": "15. Xaddidaadda Mas'uuliyadda",
        "privacy.s15.body":
            "Anigu kama masuul ahi khasaaraha ganacsi, faa'iidooyinka la waayey, ama go'aanada uu Macaamiilku ku saleeyo talooyinkayga ama qorshahayga.",

        "privacy.s16.title": "16. Qarsoodi",
        "privacy.s16.body":
            "Dhammaan xogta iyo fikradaha macaamiisha waa qarsoodi, looma isticmaali doono ujeeddo kasta oo ka baxsan mashruuca.",

        "privacy.s17.title": "17. Sharciga la Wadaago",
        "privacy.s17.body":
            "Dukumentigan waxaa lagu maamulayaa sharciga deegaanka ee dalka aan ku noolahay.",

        "privacy.s18.title": "18. Isbeddelo",
        "privacy.s18.body":
            "Waxaan xaq u leeyahay inaan wax ka beddelo Sirta & Shuruudaha waqti kasta.",

        "privacy.s19.title": "19. Xidhiidh",
        "privacy.s19.email": "Email:",
        "privacy.s19.web": "Website:",

        // TOC labels (short)
        "privacy.toc.1": "Hordhac",
        "privacy.toc.2": "Macluumaadka aan Ururiyo",
        "privacy.toc.3": "Sida aan u Isticmaalo",
        "privacy.toc.4": "Amniga & Hayntinta",
        "privacy.toc.5": "Wadaagga Xogta",
        "privacy.toc.6": "Xuquuqaha Macaamiilka",
        "privacy.toc.7": "La-talinta Bilaashka",
        "privacy.toc.8": "Sheegasho AI",
        "privacy.toc.9": "Habka Mashruuca",
        "privacy.toc.10": "Astaamaha & Baaxadda",
        "privacy.toc.11": "Tijaabinta & Gudbinta",
        "privacy.toc.12": "Hantida Caqliga",
        "privacy.toc.13": "Gudbinta & Mas'uuliyadda",
        "privacy.toc.14": "Dayactirka",
        "privacy.toc.15": "Xaddidaadda Mas'uuliyadda",
        "privacy.toc.16": "Qarsoodi",
        "privacy.toc.17": "Sharciga",
        "privacy.toc.18": "Isbeddelo",
        "privacy.toc.19": "Xidhiidh",
    },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
