export const mockArticles: Article[] = [
  // Fiction Articles
  {
    _id: "507f1f77bcf86cd799439011",
    title: "The Last Lighthouse Keeper",
    content: "The lighthouse stood at the edge of the world, or so it seemed to Marcus. For forty years, he had climbed those spiraling stairs, each step echoing in the hollow tower like a heartbeat. The automation notice had come on a Tuesday – crisp, official, final. By month's end, his lighthouse would join the thousands already converted to LED arrays and solar panels. No keeper required. Marcus ran his weathered hand along the brass railing, still warm from the afternoon sun. The sea below churned restlessly, as if it too protested this change. That night, he would light the beacon one more time, not for the ships – they had long since switched to GPS – but for himself, for the ghosts of keepers past, for the very idea that some things in this world still required a human touch...",
    likes: 234,
    excerpt: "A haunting tale of isolation and duty set against the backdrop of an automated world where human lighthouse keepers have become obsolete.",
    category: "fiction",
    readTime: 15,
    publishedAt: "2024-12-15",
    slug: "last-lighthouse-keeper"
  },
  {
    _id: "507f1f77bcf86cd799439012",
    title: "Compass Rose",
    content: "Dr. Sarah Chen had seen many artifacts pulled from the Arctic ice, but nothing like this. The compass was impossibly intricate, its rose featuring not four or eight, but thirty-two precisely etched directions, each marked with symbols that belonged to no known navigation system. Carbon dating placed it at over 500 years old, predating known Arctic expeditions by centuries. But it was the coordinates etched on the reverse that truly puzzled her – they pointed to a location that satellites showed as solid ice shelf. When the needle began to move on its own, always pointing to those exact coordinates regardless of magnetic north, Sarah knew she had found something that would redefine history...",
    likes: 189,
    excerpt: "When an ancient navigational instrument is discovered in the Arctic ice, it reveals coordinates to a place that shouldn't exist.",
    category: "fiction",
    readTime: 22,
    publishedAt: "2024-11-28",
    slug: "compass-rose"
  },
  {
    _id: "507f1f77bcf86cd799439013",
    title: "Dead Reckoning",
    content: "Captain James Morrison had sailed through three hurricanes, but nothing compared to navigating without instruments. The electromagnetic storm had fried every piece of electronic equipment on the vessel, leaving them adrift in the Pacific with only the stars and a sextant that hadn't been used since his grandfather's time. As he taught his young crew the ancient art of celestial navigation, Morrison realized they were learning more than just survival – they were reconnecting with centuries of maritime tradition that technology had nearly erased...",
    likes: 156,
    excerpt: "When modern navigation fails, an old captain must rely on forgotten skills to guide his crew home across the vast Pacific.",
    category: "fiction",
    readTime: 18,
    publishedAt: "2024-10-20",
    slug: "dead-reckoning"
  },

  // Scientific Articles
  {
    _id: "507f1f77bcf86cd799439014",
    title: "Climate Impact on North Atlantic Shipping Routes",
    content: "Abstract: This comprehensive study examines the shifting patterns of North Atlantic shipping routes in response to climate change over the past two decades. Using satellite data, AIS tracking, and oceanographic models, we demonstrate a northern migration of primary shipping lanes averaging 2.3 nautical miles per year. The economic implications are substantial, with fuel savings of approximately $2.4 billion annually offset by increased insurance costs due to ice hazards. Our findings suggest that by 2050, the Northwest Passage may become a viable year-round alternative to traditional routes, fundamentally reshaping global maritime trade patterns. The study incorporates data from 15,000 vessel transits and provides predictive models for route optimization under various climate scenarios...",
    likes: 412,
    excerpt: "A comprehensive analysis of how climate change is reshaping traditional maritime pathways and the implications for global trade.",
    category: "scientific",
    readTime: 30,
    publishedAt: "2024-10-10",
    slug: "climate-shipping-routes"
  },
  {
    _id: "507f1f77bcf86cd799439015",
    title: "Quantum Navigation Systems: The Future of Maritime Positioning",
    content: "The limitations of GPS in maritime environments – from signal jamming to atmospheric interference – have driven the development of quantum navigation systems. This paper presents the first successful trials of quantum accelerometer-based navigation on commercial vessels, achieving position accuracy of ±0.5 meters over 1000 nautical mile journeys without external reference signals. Quantum sensors measure gravitational variations and accelerations with unprecedented precision, creating an unjammable, self-contained navigation system. Field trials aboard the MV Quantum Pioneer demonstrated system stability in Sea State 6 conditions, marking a significant advancement in autonomous vessel navigation. We discuss the integration challenges, cost-benefit analysis, and projected timeline for commercial deployment...",
    likes: 378,
    excerpt: "Exploring the potential applications of quantum sensing technology in maritime navigation beyond traditional GPS systems.",
    category: "scientific",
    readTime: 25,
    publishedAt: "2024-09-22",
    slug: "quantum-navigation",
    isSpecial: true,
    specialFeatures: {
      hasInteractiveDemo: true,
      hasVideoContent: true,
      featured: true,
      collaborators: ["MIT Quantum Lab", "Maersk Innovation"],
      awards: ["Best Paper Award - International Navigation Conference 2024"]
    }
  },
  {
    _id: "507f1f77bcf86cd799439016",
    title: "Machine Learning Applications in Maritime Weather Routing",
    content: "Traditional weather routing relies on deterministic models with limited accuracy beyond 72 hours. This research introduces a novel ensemble machine learning approach combining LSTM networks with transformer architectures to predict optimal shipping routes up to 14 days in advance. Training on 10 years of historical AIS data, weather patterns, and fuel consumption records from 5,000 vessels, our model achieves 23% better fuel efficiency compared to conventional routing methods. The system adapts to vessel-specific characteristics and real-time ocean conditions, providing dynamic route adjustments. Validation across 500 commercial voyages demonstrated average fuel savings of 12% and voyage time reduction of 8% while maintaining safety margins...",
    likes: 289,
    excerpt: "Revolutionary ML models that predict optimal shipping routes two weeks in advance, reducing fuel consumption by 23%.",
    category: "scientific",
    readTime: 28,
    publishedAt: "2024-08-15",
    slug: "ml-weather-routing"
  },

  // Maritime Articles
  {
    _id: "507f1f77bcf86cd799439017",
    title: "ECDIS Best Practices: A Comprehensive Guide",
    content: "Electronic Chart Display and Information Systems have revolutionized navigation, but their complexity demands rigorous operational procedures. This guide, developed from analysis of 200 grounding incidents where ECDIS was a contributing factor, presents essential safety practices. Key findings include the critical importance of cross-checking automated route planning, understanding safety contour settings, and recognizing chart datum inconsistencies. We detail the most common ECDIS-related errors: over-reliance on automated functions (34% of incidents), inadequate alarm management (28%), and poor understanding of chart symbols (21%). The guide provides practical workflows for passage planning, real-time navigation, and emergency procedures, supported by simulator exercises and competency assessment criteria...",
    likes: 523,
    excerpt: "Essential techniques and safety considerations for electronic chart display and information systems in modern navigation.",
    category: "maritime",
    readTime: 18,
    publishedAt: "2024-12-01",
    slug: "ecdis-best-practices",
    isSpecial: true,
    specialFeatures: {
      hasInteractiveDemo: true,
      hasDownloadableResources: true,
      customLayout: "tutorial",
      featured: true
    }
  },
  {
    _id: "507f1f77bcf86cd799439018",
    title: "Celestial Navigation in the 21st Century",
    content: "While GPS dominates modern navigation, celestial navigation remains a critical backup skill mandated by STCW requirements. This comprehensive review examines the current state of celestial navigation training and its practical applications. Survey data from 1,000 deck officers reveals that only 15% feel confident performing sun sights without assistance, highlighting a dangerous skills gap. We present modernized teaching methods combining traditional sextant work with tablet-based calculations, reducing computation time by 70% while maintaining accuracy. Case studies from recent GPS outages demonstrate the continued relevance of these skills. The article includes updated sight reduction tables and practical exercises for maintaining proficiency...",
    likes: 445,
    excerpt: "Why traditional navigation skills remain crucial in an age of digital dependency, including practical applications and training methods.",
    category: "maritime",
    readTime: 20,
    publishedAt: "2024-11-15",
    slug: "celestial-navigation-modern"
  },
  {
    _id: "507f1f77bcf86cd799439019",
    title: "Autonomous Vessel Navigation: Legal and Practical Challenges",
    content: "The advent of Maritime Autonomous Surface Ships (MASS) presents unprecedented challenges to international maritime law and practical operations. This analysis examines the regulatory framework gaps, liability questions, and technical hurdles facing autonomous vessel deployment. Key issues include COLREGs compliance in mixed-traffic scenarios, remote operator certification standards, and cybersecurity requirements. We analyze three recent autonomous vessel trials, identifying critical decision points where human intervention was required. The paper proposes a graduated autonomy framework with clear handover protocols between automated systems and human operators. Insurance industry perspectives and flag state positions are synthesized to project likely regulatory evolution over the next decade...",
    likes: 367,
    excerpt: "Examining the regulatory, technical, and practical challenges facing the deployment of autonomous vessels in commercial shipping.",
    category: "maritime",
    readTime: 24,
    publishedAt: "2024-07-30",
    slug: "autonomous-vessel-challenges"
  },
  {
    _id: "507f1f77bcf86cd799439020",
    title: "Port State Control: A Master's Preparation Guide",
    content: "Port State Control inspections can determine a vessel's commercial viability. This guide, compiled from 5,000 PSC inspection reports and interviews with 50 port state control officers, identifies the most common deficiencies and provides preventive strategies. Navigation equipment failures account for 18% of detentions, with chart corrections and passage planning documentation being critical areas. We present a comprehensive pre-arrival checklist, documentation templates, and crew briefing materials. Special attention is given to regional PSC regime differences, with specific guidance for Tokyo MOU, Paris MOU, and USCG inspections. The guide includes case studies of successful deficiency responses and detention avoidance strategies...",
    likes: 612,
    excerpt: "Master's guide to preparing for and managing Port State Control inspections, based on analysis of 5,000 inspection reports.",
    category: "maritime",
    readTime: 22,
    publishedAt: "2024-06-18",
    slug: "psc-preparation-guide"
  },
  {
    _id: "507f1f77bcf86cd799439021",
    title: "The Human Element in Maritime Accidents: A Data-Driven Analysis",
    content: "Human factors contribute to 75-96% of maritime casualties, yet traditional safety management often focuses on technical solutions. This study analyzes 1,000 maritime accident investigation reports using natural language processing to identify recurring human factor patterns. Fatigue emerges as the primary contributor (32%), followed by inadequate communication (24%) and poor situational awareness (19%). We present a novel risk assessment framework incorporating circadian rhythm modeling, workload indices, and communication effectiveness metrics. Implementation trials on 20 vessels showed a 45% reduction in near-miss incidents. The framework includes practical tools for voyage planning that account for human performance variation and provides evidence-based watch rotation schedules...",
    likes: 489,
    excerpt: "Data-driven analysis of 1,000 maritime accidents revealing how human factors contribute to casualties and how to prevent them.",
    category: "maritime",
    readTime: 26,
    publishedAt: "2024-05-05",
    slug: "human-element-maritime-accidents"
  }
];