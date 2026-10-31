// Everything on the home page lives here. Edit this file to update the CV.
export default {
  experience: [
    {
      when: "2026 — now",
      role: "Senior RTC & AI Engineer",
      org: "SignalWire",
      summary:
        "Real-time communication infrastructure and SIP services in C++ for a cloud telephony platform. Integrating LLMs into live call flows, tuning signaling and media for large production deployments, and building internal AI tooling.",
      tags: ["C++", "SIP", "WebRTC", "Voice AI", "LLMs"],
    },
    {
      when: "2020 — 2026",
      role: "Senior Software Engineer",
      org: "TÜBİTAK BİLGEM",
      summary:
        "Mission-critical C++ applications for secure communication in the defense sector, built from low-level protocols up. Designed an on-device LLM framework for embedded targets, a proxy architecture that improved throughput by 25%, and infrastructure that cut connection failures under heavy load by 25%.",
      tags: ["C/C++", "RTC", "Embedded", "AOSP", "Low latency", "Python"],
    },
    {
      when: "2019 — 2020",
      role: "Software Engineer",
      org: "SafeBridge",
      summary:
        "B2B SaaS for maritime crew training and certification. REST APIs in Node.js, Flutter clients, Docker-based environments and Redis caching; modernized a legacy system for a 20% performance gain.",
      tags: ["Node.js", "Flutter", "Docker", "Redis"],
    },
    {
      when: "2018",
      role: "Software Engineer Intern",
      org: "TÜRKSAT (e-Government)",
      summary:
        "Published a Java cryptography library to Maven Central and designed a Java EE / Spring Boot proxy server.",
      tags: ["Java", "Spring Boot", "Cryptography"],
    },
  ],

  openSource: [
    {
      name: "hoca",
      url: "https://github.com/emretufekci/hoca",
      summary: "Type a topic, get a 3Blue1Brown-style explainer video. Works with any agent and local CPU voices, in one command.",
      stack: "JavaScript · TTS · Agents",
    },
    {
      name: "PJSIP: Swift ↔ C++ interop",
      url: "https://github.com/pjsip/pjproject/pull/2723",
      summary: "Upstream contribution to PJSIP: an interoperability layer that makes VoIP integration on iOS much simpler.",
      stack: "C++ · Swift · SIP",
    },
    {
      name: "cluecon26-oncall-agent",
      url: "https://github.com/emretufekci/cluecon26-oncall-agent",
      summary: "Voice-first on-call incident response. An alert fires, it calls you, and you triage hands-free. Nothing writes without a spoken yes. Built for ClueCon 2026.",
      stack: "Python · SignalWire AI Agents",
    },
    {
      name: "d-chat-app",
      url: "https://github.com/emretufekci/d-chat-app",
      summary: "A decentralized chat app on CRDTs (Gun.js), part of my network-optimization research.",
      stack: "JavaScript · CRDT",
    },
  ],

  ventures: [
    { year: "2026", name: "SnapYacht", summary: "AI-assisted boat marketplace for buying, selling and renting. Snap a photo of any boat and identify it. Mobile and web." },
    { year: "2026", name: "İgora", summary: "AI-powered, stockless e-export platform for Türkiye: build a brand and sell worldwide with no inventory." },
    { year: "2025", name: "Bilgiz", summary: "Event intelligence for logistics and trade: verified, disinformation-filtered signals for routing and operational risk." },
    { year: "2025", name: "Feedbeq", summary: "AI analysis of team communication on Slack, Teams and WhatsApp to surface bottlenecks and give managers better feedback." },
    { year: "2024", name: "ResumeCrafter", summary: "AI job discovery plus a résumé tailored to each posting. It later became the pipeline I used for my own job search." },
    { year: "2024", name: "NeosBuy", summary: "A conversational shopping assistant: describe what you want and it finds and compares products for you. LLMs on top of product search." },
    { year: "2022", name: "BankoBetTips → BoostYourBet", summary: "Co-founded a global rewrite of a sports-prediction app; learned app-store policy, trademarks and US company formation the hard way." },
    { year: "2020", name: "BankoBilen", summary: "Built and ran a Flutter sports-prediction app for iOS and Android. 100K+ downloads and still earning." },
    { year: "2019", name: "Envato apps & games", summary: "Published apps and games on Google Play; a wallpaper app turned into my first real revenue." },
    { year: "2017", name: "ciusozluk.com", summary: "A campus community dictionary in the style of Ekşi Sözlük, with about 1,000 users." },
  ],

  education: [
    {
      degree: "M.Sc. Computer Engineering",
      school: "Istanbul University",
      when: "2022 — 2025",
      note: "Thesis on LLMs and résumé evaluation. Published research on generative AI.",
    },
    {
      degree: "B.Sc. Computer Engineering",
      school: "Cyprus International University",
      when: "2014 — 2019",
      note: "Full scholarship. TEKNOFEST 2019 regional winner with an environmental-tech project.",
    },
  ],

  skills: [
    { area: "Languages", items: "C, C++, Python, Swift, Java, JavaScript/TypeScript, Dart" },
    { area: "Real-time", items: "SIP, RTP, WebRTC, PJSIP, VoIP, media pipelines" },
    { area: "AI", items: "LLM integration, voice agents, on-device inference, RAG" },
    { area: "Infra", items: "Linux, Docker, CI/CD, AWS, GCP, PostgreSQL, MongoDB, Redis" },
  ],
};
