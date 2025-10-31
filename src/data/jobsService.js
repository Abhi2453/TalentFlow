// seedData.js

export const jobs = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    status: "active",
    tags: ["React", "TypeScript"],
    order: 0,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-2",
    title: "Backend Engineer",
    status: "active",
    tags: ["Node.js", "Python"],
    order: 1,
    stages: ["applied", "screen", "tech", "offer", "hired"]
  },
  {
    id: "job-3",
    title: "Product Manager",
    status: "archived",
    tags: ["Product", "Strategy"],
    order: 2,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-4",
    title: "UI/UX Designer",
    status: "active",
    tags: ["Figma", "Adobe"],
    order: 3,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-5",
    title: "Data Scientist",
    status: "active",
    tags: ["Python", "ML"],
    order: 4,
    stages: ["applied", "screen", "tech", "offer", "hired"]
  },
  {
    id: "job-6",
    title: "DevOps Engineer",
    status: "archived",
    tags: ["AWS", "Docker"],
    order: 5,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-7",
    title: "Full Stack Developer",
    status: "active",
    tags: ["React", "Node.js"],
    order: 6,
    stages: ["applied", "screen", "tech", "offer", "hired"]
  },
  {
    id: "job-8",
    title: "Mobile App Developer",
    status: "archived",
    tags: ["React Native", "Flutter"],
    order: 7,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-9",
    title: "QA Engineer",
    status: "active",
    tags: ["Selenium", "Testing"],
    order: 8,
    stages: ["applied", "screen", "tech", "offer", "hired"]
  },
  {
    id: "job-10",
    title: "Technical Lead",
    status: "active",
    tags: ["Leadership", "Tech"],
    order: 9,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-11",
    title: "Project Manager",
    status: "archived",
    tags: ["Agile", "Scrum"],
    order: 10,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-12",
    title: "Business Analyst",
    status: "active",
    tags: ["SQL", "Analytics"],
    order: 11,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-13",
    title: "Software Architect",
    status: "archived",
    tags: ["System Design", "Architecture"],
    order: 12,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-14",
    title: "Cloud Engineer",
    status: "active",
    tags: ["AWS", "Azure"],
    order: 13,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-15",
    title: "Security Engineer",
    status: "active",
    tags: ["Cybersecurity", "Network"],
    order: 14,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-16",
    title: "Machine Learning Engineer",
    status: "archived",
    tags: ["TensorFlow", "PyTorch"],
    order: 15,
    stages: ["applied", "screen", "tech", "offer", "hired"]
  },
  {
    id: "job-17",
    title: "Sales Manager",
    status: "active",
    tags: ["B2B", "SaaS"],
    order: 16,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-18",
    title: "Marketing Manager",
    status: "active",
    tags: ["Digital Marketing", "SEO"],
    order: 17,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-19",
    title: "HR Manager",
    status: "archived",
    tags: ["Recruitment", "People"],
    order: 18,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-20",
    title: "Content Writer",
    status: "active",
    tags: ["Content", "Writing"],
    order: 19,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-21",
    title: "Graphic Designer",
    status: "archived",
    tags: ["Creative", "Design"],
    order: 20,
    stages: ["applied", "screen", "tech", "offer", "hired"]
  },
  {
    id: "job-22",
    title: "Customer Success Manager",
    status: "active",
    tags: ["SaaS", "Support"],
    order: 21,
    stages: ["applied", "screen", "tech", "offer", "hired"]
  },
  {
    id: "job-23",
    title: "Operations Manager",
    status: "archived",
    tags: ["Operations", "Logistics"],
    order: 22,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-24",
    title: "Finance Manager",
    status: "active",
    tags: ["Finance", "Accounting"],
    order: 23,
    stages: ["applied", "screen", "tech", "offer"]
  },
  {
    id: "job-25",
    title: "Legal Counsel",
    status: "archived",
    tags: ["Legal", "Compliance"],
    order: 24,
    stages: ["applied", "screen", "tech", "offer"]
  }
];

export const jobDetailsSeed = [
  {
    jobId: "job-1",
    title: "Senior Frontend Developer",
    status: "active",
    tags: ["React", "TypeScript"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
We are seeking a Senior Frontend Developer who loves building modern, responsive web UIs using React and TypeScript. You'll collaborate with a high-achieving team, define frontend architecture, and shape world-class products.

## Responsibilities
- Design and develop scalable, maintainable React applications
- Write clean, type-safe code using TypeScript
- Collaborate with designers, backend engineers, and product managers
- Mentor junior developers and conduct code reviews
- Optimize application performance and user experience

## Requirements
- 5+ years of experience in frontend development
- Expert-level knowledge of React, TypeScript, and modern CSS
- Experience with state management (Redux, Zustand, etc.)
- Strong understanding of web performance optimization
- Experience with testing frameworks (Jest, React Testing Library)`,
    ctc: { 
      min: 1800000, 
      max: 3500000, 
      currency: "INR", 
      benefits: ["Health Insurance", "Remote work flexibility", "Yearly performance bonus", "Learning & Development budget"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Describe your experience with React and TypeScript.", 
        answer: "Look for: Years of experience, project complexity, understanding of hooks, component patterns, type safety benefits, and real-world challenges solved.", 
        category: "Technical", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you debug performance issues in a frontend application?", 
        answer: "Expected: Chrome DevTools profiler, React DevTools, Lighthouse, bundle analysis, lazy loading, memoization techniques.", 
        category: "Technical", 
        isEditable: true 
      },
      { 
        id: "q3", 
        question: "Explain a complex frontend architecture decision you made.", 
        answer: "Assess: Decision-making process, trade-offs considered, impact on team and product, lessons learned.", 
        category: "Architecture", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "Bachelor's in Computer Science or equivalent", mandatory: true },
      { id: "ec2", criterion: "Experience", requirement: "5+ years in frontend development", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "React, TypeScript, CSS-in-JS, Webpack/Vite", mandatory: true },
      { id: "ec4", criterion: "Portfolio", requirement: "GitHub profile or live project demos", mandatory: false }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-2",
    title: "Backend Engineer",
    status: "active",
    tags: ["Node.js", "Python"],
    stages: ["applied", "screen", "tech", "offer", "hired"],
    description: `## About the Role
Join as a Backend Engineer to build scalable APIs and backend systems using Node.js and Python. Work closely with frontend, DevOps, and data teams to deliver robust solutions.

## Responsibilities
- Design and develop RESTful APIs and microservices
- Optimize database queries and system performance
- Implement security best practices
- Write comprehensive tests and documentation
- Participate in on-call rotation

## Requirements
- 3+ years backend development experience
- Proficiency in Node.js and Python
- Strong database knowledge (PostgreSQL, MongoDB)
- Experience with cloud platforms (AWS/GCP/Azure)`,
    ctc: { 
      min: 1600000, 
      max: 3200000, 
      currency: "INR", 
      benefits: ["PF", "Health Insurance", "Learning stipend", "Flexible hours"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "What databases have you worked with and how do you choose between SQL and NoSQL?", 
        answer: "Look for: Database selection criteria, scaling experience, indexing strategies, replication, sharding knowledge.", 
        category: "Technical", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "Explain a tricky bug you've solved in a backend system.", 
        answer: "Assess: Debugging methodology, root cause analysis, solution implementation, prevention strategies.", 
        category: "Problem Solving", 
        isEditable: true 
      },
      { 
        id: "q3", 
        question: "How do you ensure API security?", 
        answer: "Expected: Authentication/authorization, rate limiting, input validation, HTTPS, CORS, SQL injection prevention.", 
        category: "Security", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "BE/BTech/MCA in Computer Science", mandatory: true },
      { id: "ec2", criterion: "Experience", requirement: "3+ years backend development", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "Node.js, Python, REST API, Database Management", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-3",
    title: "Product Manager",
    status: "archived",
    tags: ["Product", "Strategy"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
As a Product Manager, you'll drive product strategy, roadmap, and execution. Work with engineering, design, marketing, and customer success teams to deliver high-impact solutions.

## Responsibilities
- Define product vision and strategy
- Prioritize features based on user research and business goals
- Create detailed product requirements and user stories
- Analyze product metrics and user feedback
- Coordinate cross-functional teams for launches

## Requirements
- 3+ years product management experience
- Strong analytical and communication skills
- Experience with agile methodologies
- Track record of successful product launches`,
    ctc: { 
      min: 2200000, 
      max: 5000000, 
      currency: "INR", 
      benefits: ["Stock Options", "Medical Insurance", "Work-from-home", "Annual offsites"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Describe a product you launched and its impact.", 
        answer: "Look for: KPIs, launch strategy, stakeholder management, outcomes, lessons learned.", 
        category: "Product", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you prioritize features?", 
        answer: "Expected: Frameworks like RICE, MoSCoW, value vs effort, user research, business alignment.", 
        category: "Strategy", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "3+ years product management", mandatory: true },
      { id: "ec2", criterion: "Skills", requirement: "Roadmapping, analytics, stakeholder management", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-4",
    title: "UI/UX Designer",
    status: "active",
    tags: ["Figma", "Adobe"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
UI/UX Designer role involving creation of wireframes, prototypes, and pixel-perfect UI using Figma and Adobe XD. Collaborate with developers to ship beautiful, user-centric experiences.

## Responsibilities
- Conduct user research and usability testing
- Create wireframes, prototypes, and high-fidelity designs
- Develop and maintain design systems
- Collaborate with developers for implementation
- Iterate based on user feedback and analytics

## Requirements
- 2+ years UI/UX design experience
- Expert in Figma and Adobe Creative Suite
- Strong portfolio demonstrating design process
- Understanding of accessibility standards`,
    ctc: { 
      min: 1200000, 
      max: 2500000, 
      currency: "INR", 
      benefits: ["Design workshops", "Health insurance", "Creative software licenses"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Walk us through your portfolio and explain your design process for one project.", 
        answer: "Assess: Research methods, problem definition, iteration process, impact measurement, collaboration approach.", 
        category: "Portfolio", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you balance user needs with business goals?", 
        answer: "Look for: Understanding of constraints, compromise strategies, data-driven decisions.", 
        category: "Design Thinking", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "BDes or equivalent design degree", mandatory: false },
      { id: "ec2", criterion: "Skills", requirement: "Figma, Adobe XD, User Research, Prototyping", mandatory: true },
      { id: "ec3", criterion: "Portfolio", requirement: "Must present design portfolio", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-5",
    title: "Data Scientist",
    status: "active",
    tags: ["Python", "ML"],
    stages: ["applied", "screen", "tech", "offer", "hired"],
    description: `## About the Role
Looking for a Data Scientist to analyze, model, and deploy machine learning solutions. Work on Python-based data pipelines, ML models, and data-driven insights.

## Responsibilities
- Build and deploy machine learning models
- Analyze large datasets to extract insights
- Create data pipelines and ETL processes
- Collaborate with engineering to productionize models
- Present findings to stakeholders

## Requirements
- 2+ years data science experience
- Strong Python and ML library knowledge
- Experience with statistical analysis
- Familiarity with cloud platforms`,
    ctc: { 
      min: 2000000, 
      max: 4200000, 
      currency: "INR", 
      benefits: ["Conference passes", "Health Insurance", "Research time", "GPU compute credits"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "What ML models have you deployed to production?", 
        answer: "Expected: Model selection rationale, deployment pipeline, monitoring, A/B testing, performance metrics.", 
        category: "Technical", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you handle imbalanced datasets?", 
        answer: "Look for: Resampling techniques, SMOTE, class weights, evaluation metrics for imbalanced data.", 
        category: "Machine Learning", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "Masters in Statistics/Data Science/CS preferred", mandatory: false },
      { id: "ec2", criterion: "Experience", requirement: "2+ years in data science", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "Python, scikit-learn, TensorFlow/PyTorch, SQL", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-6",
    title: "DevOps Engineer",
    status: "archived",
    tags: ["AWS", "Docker"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
DevOps Engineer to automate deployments on AWS using Docker, Kubernetes, and CI/CD pipelines. Maintain infrastructure and monitor system health.

## Responsibilities
- Design and maintain CI/CD pipelines
- Manage cloud infrastructure (AWS/Azure/GCP)
- Implement monitoring and alerting systems
- Automate deployment processes
- Ensure security and compliance

## Requirements
- 2+ years DevOps experience
- Strong knowledge of AWS/Azure
- Experience with Docker and Kubernetes
- Infrastructure as Code (Terraform/CloudFormation)`,
    ctc: { 
      min: 1500000, 
      max: 3000000, 
      currency: "INR", 
      benefits: ["AWS/Azure certifications", "On-call bonus", "Health insurance"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Describe your Docker and CI/CD experience.", 
        answer: "Look for: Containerization strategy, pipeline design, deployment patterns, rollback mechanisms.", 
        category: "Technical", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you handle infrastructure scaling?", 
        answer: "Expected: Auto-scaling groups, load balancers, horizontal vs vertical scaling, cost optimization.", 
        category: "Infrastructure", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "2+ years DevOps/SRE", mandatory: true },
      { id: "ec2", criterion: "Skills", requirement: "AWS, Docker, Kubernetes, Terraform", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-7",
    title: "Full Stack Developer",
    status: "active",
    tags: ["React", "Node.js"],
    stages: ["applied", "screen", "tech", "offer", "hired"],
    description: `## About the Role
Full Stack Developer for end-to-end development using React and Node.js. Build highly interactive web applications and RESTful services.

## Responsibilities
- Develop frontend and backend features
- Design and implement APIs
- Write clean, tested code
- Optimize application performance
- Participate in architecture decisions

## Requirements
- 3+ years full-stack development
- Strong React and Node.js skills
- Database design experience
- Understanding of DevOps basics`,
    ctc: { 
      min: 2000000, 
      max: 4000000, 
      currency: "INR", 
      benefits: ["Remote work", "ESOPs", "Learning budget", "Flexible hours"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "How do you manage data flow in a full-stack application?", 
        answer: "Expected: API design, state management, caching strategies, real-time updates, error handling.", 
        category: "Technical", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "Describe your approach to testing full-stack applications.", 
        answer: "Look for: Unit tests, integration tests, E2E tests, test coverage, TDD/BDD experience.", 
        category: "Testing", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "3+ years full-stack development", mandatory: true },
      { id: "ec2", criterion: "Skills", requirement: "React, Node.js, SQL/NoSQL databases", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-8",
    title: "Mobile App Developer",
    status: "archived",
    tags: ["React Native", "Flutter"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Develop cross-platform mobile apps using React Native or Flutter. Manage app performance, new feature rollouts, and app store deployments.

## Responsibilities
- Build cross-platform mobile applications
- Integrate with backend APIs
- Optimize app performance and battery usage
- Handle app store submissions
- Debug platform-specific issues

## Requirements
- 2+ years mobile development
- React Native or Flutter expertise
- Understanding of native iOS/Android
- App store deployment experience`,
    ctc: { 
      min: 1600000, 
      max: 3000000, 
      currency: "INR", 
      benefits: ["Device allowance", "Learning stipend", "Health insurance"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Present a mobile app you've built and discuss challenges.", 
        answer: "Assess: Technical complexity, performance optimization, platform-specific issues, user feedback incorporation.", 
        category: "Portfolio", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you handle offline functionality in mobile apps?", 
        answer: "Expected: Local storage, sync strategies, conflict resolution, cache management.", 
        category: "Technical", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "Engineering degree", mandatory: false },
      { id: "ec2", criterion: "Experience", requirement: "2+ years mobile development", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "React Native or Flutter", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-9",
    title: "QA Engineer",
    status: "active",
    tags: ["Selenium", "Testing"],
    stages: ["applied", "screen", "tech", "offer", "hired"],
    description: `## About the Role
QA Engineer to design and automate test cases for web applications using Selenium and modern testing frameworks. Collaborate with developers for bug triage and quality assurance.

## Responsibilities
- Create and maintain automated test suites
- Perform manual and exploratory testing
- Report and track bugs
- Define test strategies and plans
- Ensure quality across releases

## Requirements
- 2+ years QA/testing experience
- Selenium and automation expertise
- Understanding of CI/CD integration
- Strong analytical skills`,
    ctc: { 
      min: 1400000, 
      max: 2800000, 
      currency: "INR", 
      benefits: ["Work-life balance", "Health insurance", "Training budget"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Describe your test automation experience and frameworks used.", 
        answer: "Look for: Automation framework design, coverage metrics, flaky test handling, maintenance strategies.", 
        category: "Technical", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you prioritize testing when time is limited?", 
        answer: "Expected: Risk-based testing, critical path analysis, smoke vs regression testing strategies.", 
        category: "Strategy", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "2+ years in QA/testing", mandatory: true },
      { id: "ec2", criterion: "Skills", requirement: "Selenium, test automation, manual testing", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-10",
    title: "Technical Lead",
    status: "active",
    tags: ["Leadership", "Tech"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Technical Lead responsible for mentoring engineers, overseeing project delivery, and ensuring technical excellence. Lead architecture decisions and drive best practices.

## Responsibilities
- Lead technical team and mentor engineers
- Make architectural decisions
- Code review and quality assurance
- Collaborate with product and design
- Drive technical innovation

## Requirements
- 7+ years software development
- 2+ years in leadership role
- Strong system design skills
- Excellent communication abilities`,
    ctc: { 
      min: 3000000, 
      max: 5500000, 
      currency: "INR", 
      benefits: ["Leadership bonus", "Stock options", "Conference speaking opportunities"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "How do you handle team conflicts and different technical opinions?", 
        answer: "Assess: Leadership style, conflict resolution, decision-making framework, team empowerment.", 
        category: "Leadership", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "Describe a major architectural decision you made and its impact.", 
        answer: "Look for: Technical depth, trade-off analysis, stakeholder management, long-term thinking.", 
        category: "Architecture", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "7+ years in software development", mandatory: true },
      { id: "ec2", criterion: "Leadership", requirement: "2+ years leading technical teams", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "System design, mentoring, architectural patterns", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-11",
    title: "Project Manager",
    status: "archived",
    tags: ["Agile", "Scrum"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Project Manager to handle multiple scrum teams, execute timelines, and remove delivery blockers. Track deliverables, manage stakeholders, and report progress.

## Responsibilities
- Plan and execute project timelines
- Facilitate scrum ceremonies
- Manage stakeholder expectations
- Track and report project metrics
- Identify and mitigate risks

## Requirements
- 3+ years project management
- Scrum/Agile certification preferred
- Strong communication skills
- Experience with project tools (Jira, etc.)`,
    ctc: { 
      min: 2500000, 
      max: 4500000, 
      currency: "INR", 
      benefits: ["Work-from-home", "Annual team trips", "PMP certification support"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Walk me through your typical sprint planning process.", 
        answer: "Expected: Backlog refinement, estimation techniques, capacity planning, commitment strategies.", 
        category: "Agile", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you handle scope creep?", 
        answer: "Look for: Change management process, stakeholder communication, prioritization framework.", 
        category: "Management", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Certification", requirement: "PMP/Scrum Master/CSM preferred", mandatory: false },
      { id: "ec2", criterion: "Experience", requirement: "3+ years project management", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "Agile, Scrum, stakeholder management", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-12",
    title: "Business Analyst",
    status: "active",
    tags: ["SQL", "Analytics"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Business Analyst to create reports, analyze KPIs, and recommend insights leveraging SQL and analytics platforms. Bridge business and technical teams.

## Responsibilities
- Analyze business metrics and KPIs
- Create dashboards and reports
- Identify process improvement opportunities
- Gather and document requirements
- Present insights to stakeholders

## Requirements
- 2+ years business analysis
- Strong SQL skills
- Experience with BI tools
- Excellent communication skills`,
    ctc: { 
      min: 1400000, 
      max: 2700000, 
      currency: "INR", 
      benefits: ["Learning stipend", "PF", "Health insurance"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "How do you turn data into actionable business recommendations?", 
        answer: "Assess: Data analysis methodology, insight generation, storytelling, impact measurement.", 
        category: "Analytics", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "Describe a time when your analysis changed a business decision.", 
        answer: "Look for: Analytical rigor, stakeholder influence, business impact, lessons learned.", 
        category: "Impact", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "Any degree", mandatory: true },
      { id: "ec2", criterion: "Experience", requirement: "2+ years business analysis", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "SQL, Excel, BI tools, data visualization", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-13",
    title: "Software Architect",
    status: "archived",
    tags: ["System Design", "Architecture"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Software Architect to define system architecture, design patterns, and technical standards. Guide multiple teams on architectural decisions and best practices.

## Responsibilities
- Design scalable system architectures
- Define technical standards and patterns
- Review and approve architectural decisions
- Mentor senior engineers
- Drive technical innovation

## Requirements
- 10+ years software development
- 3+ years in architecture role
- Expert in distributed systems
- Strong leadership skills`,
    ctc: { 
      min: 4000000, 
      max: 7000000, 
      currency: "INR", 
      benefits: ["Stock options", "Conference budget", "Research time", "Leadership bonus"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Describe your approach to designing a scalable, distributed system.", 
        answer: "Expected: CAP theorem, consistency models, partitioning strategies, fault tolerance, monitoring.", 
        category: "Architecture", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you balance technical debt with new feature development?", 
        answer: "Look for: Technical debt assessment, refactoring strategies, stakeholder communication.", 
        category: "Strategy", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "10+ years software development", mandatory: true },
      { id: "ec2", criterion: "Architecture", requirement: "3+ years in architecture/senior tech role", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "Distributed systems, microservices, cloud architecture", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-14",
    title: "Cloud Engineer",
    status: "active",
    tags: ["AWS", "Azure"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Cloud Engineer to design, implement, and manage cloud infrastructure on AWS and Azure. Ensure reliability, security, and cost optimization.

## Responsibilities
- Design cloud infrastructure solutions
- Manage AWS/Azure resources
- Implement security and compliance
- Optimize cloud costs
- Automate infrastructure provisioning

## Requirements
- 3+ years cloud engineering
- AWS/Azure certifications preferred
- Infrastructure as Code experience
- Strong security knowledge`,
    ctc: { 
      min: 1800000, 
      max: 3500000, 
      currency: "INR", 
      benefits: ["Cloud certifications", "Training budget", "Health insurance", "Remote work"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "How do you approach cloud cost optimization?", 
        answer: "Expected: Reserved instances, right-sizing, auto-scaling, storage optimization, monitoring tools.", 
        category: "Cost Management", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "Describe your experience with multi-cloud or hybrid cloud setups.", 
        answer: "Look for: Architecture patterns, data synchronization, vendor lock-in mitigation, disaster recovery.", 
        category: "Architecture", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "3+ years cloud engineering", mandatory: true },
      { id: "ec2", criterion: "Skills", requirement: "AWS/Azure, Terraform, networking, security", mandatory: true },
      { id: "ec3", criterion: "Certification", requirement: "AWS/Azure certification preferred", mandatory: false }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-15",
    title: "Security Engineer",
    status: "active",
    tags: ["Cybersecurity", "Network"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Security Engineer to protect infrastructure, applications, and data. Conduct security assessments, implement security controls, and respond to incidents.

## Responsibilities
- Conduct security audits and assessments
- Implement security tools and controls
- Monitor for security threats
- Respond to security incidents
- Ensure compliance with standards

## Requirements
- 3+ years security engineering
- Security certifications (CISSP, CEH, etc.)
- Penetration testing experience
- Knowledge of compliance frameworks`,
    ctc: { 
      min: 2000000, 
      max: 4000000, 
      currency: "INR", 
      benefits: ["Security certifications", "Conference passes", "On-call bonus", "Health insurance"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Describe your approach to securing a web application.", 
        answer: "Expected: OWASP Top 10, security testing, WAF, DDoS protection, vulnerability management.", 
        category: "Application Security", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you handle a security incident?", 
        answer: "Look for: Incident response process, containment strategies, forensics, communication, post-mortem.", 
        category: "Incident Response", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "3+ years in cybersecurity", mandatory: true },
      { id: "ec2", criterion: "Skills", requirement: "Security assessment, penetration testing, SIEM, IDS/IPS", mandatory: true },
      { id: "ec3", criterion: "Certification", requirement: "CISSP, CEH, or similar preferred", mandatory: false }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-16",
    title: "Machine Learning Engineer",
    status: "archived",
    tags: ["TensorFlow", "PyTorch"],
    stages: ["applied", "screen", "tech", "offer", "hired"],
    description: `## About the Role
Machine Learning Engineer to design, train, and deploy ML models at scale. Work with TensorFlow/PyTorch to build production ML systems.

## Responsibilities
- Design and implement ML algorithms
- Train and optimize models
- Deploy models to production
- Monitor model performance
- Collaborate with data scientists

## Requirements
- 3+ years ML engineering
- Deep learning expertise
- Production ML experience
- Strong Python skills`,
    ctc: { 
      min: 2500000, 
      max: 5000000, 
      currency: "INR", 
      benefits: ["GPU compute budget", "Research time", "Conference passes", "Stock options"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Explain how you've scaled ML models in production.", 
        answer: "Expected: Model serving, batch vs real-time inference, caching, monitoring, A/B testing.", 
        category: "ML Engineering", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you debug poor model performance?", 
        answer: "Look for: Data quality checks, feature engineering, hyperparameter tuning, model interpretation.", 
        category: "Problem Solving", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "MS/PhD in CS/ML/Stats preferred", mandatory: false },
      { id: "ec2", criterion: "Experience", requirement: "3+ years ML engineering", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "TensorFlow/PyTorch, Python, MLOps, distributed computing", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-17",
    title: "Sales Manager",
    status: "active",
    tags: ["B2B", "SaaS"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Sales Manager to drive B2B SaaS sales, build customer relationships, and achieve revenue targets. Manage sales pipeline and close deals.

## Responsibilities
- Generate and qualify leads
- Present product demos
- Negotiate and close deals
- Manage customer relationships
- Achieve revenue targets

## Requirements
- 3+ years B2B sales
- SaaS sales experience
- Strong communication skills
- CRM proficiency`,
    ctc: { 
      min: 1800000, 
      max: 4000000, 
      currency: "INR", 
      benefits: ["Commission structure", "Travel allowance", "Health insurance", "Quarterly bonuses"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Describe your sales process from lead to close.", 
        answer: "Look for: Qualification criteria, discovery process, objection handling, closing techniques.", 
        category: "Sales", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you handle a prospect who's gone cold?", 
        answer: "Expected: Re-engagement strategies, value proposition, timing, persistence vs respect.", 
        category: "Sales Strategy", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "3+ years B2B sales", mandatory: true },
      { id: "ec2", criterion: "Industry", requirement: "SaaS/tech sales experience preferred", mandatory: false },
      { id: "ec3", criterion: "Skills", requirement: "Negotiation, presentation, CRM tools", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-18",
    title: "Marketing Manager",
    status: "active",
    tags: ["Digital Marketing", "SEO"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Marketing Manager to plan and execute digital marketing campaigns. Drive SEO, content marketing, social media, and lead generation initiatives.

## Responsibilities
- Develop marketing strategies
- Execute digital campaigns
- Manage SEO and content marketing
- Analyze campaign performance
- Manage marketing budget

## Requirements
- 3+ years marketing experience
- Digital marketing expertise
- Strong analytical skills
- Content creation abilities`,
    ctc: { 
      min: 1600000, 
      max: 3200000, 
      currency: "INR", 
      benefits: ["Marketing tools budget", "Conference passes", "Health insurance", "Creative freedom"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Describe a successful marketing campaign you've led.", 
        answer: "Assess: Strategy, execution, metrics, ROI, lessons learned, creativity.", 
        category: "Marketing", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you measure marketing ROI?", 
        answer: "Expected: Attribution models, CAC, LTV, conversion funnels, analytics tools.", 
        category: "Analytics", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "3+ years digital marketing", mandatory: true },
      { id: "ec2", criterion: "Skills", requirement: "SEO, content marketing, paid advertising, analytics", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-19",
    title: "HR Manager",
    status: "archived",
    tags: ["Recruitment", "People"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
HR Manager to lead recruitment, employee engagement, and HR operations. Build strong teams and foster positive work culture.

## Responsibilities
- Manage end-to-end recruitment
- Handle employee relations
- Implement HR policies
- Drive engagement initiatives
- Manage performance reviews

## Requirements
- 4+ years HR experience
- Strong interpersonal skills
- Knowledge of labor laws
- HRIS proficiency`,
    ctc: { 
      min: 1800000, 
      max: 3500000, 
      currency: "INR", 
      benefits: ["HR certifications", "Work-life balance", "Health insurance", "Team events budget"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "How do you handle difficult employee situations?", 
        answer: "Look for: Empathy, conflict resolution, confidentiality, fair process, legal awareness.", 
        category: "Employee Relations", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "Describe your approach to improving employee engagement.", 
        answer: "Expected: Surveys, feedback mechanisms, initiatives, measurement, continuous improvement.", 
        category: "Engagement", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "4+ years HR management", mandatory: true },
      { id: "ec2", criterion: "Skills", requirement: "Recruitment, employee relations, HR operations", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-20",
    title: "Content Writer",
    status: "active",
    tags: ["Content", "Writing"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Content Writer to create engaging content for blogs, marketing materials, and documentation. Write clear, compelling copy that drives engagement.

## Responsibilities
- Write blog posts and articles
- Create marketing copy
- Develop content strategy
- Edit and proofread content
- Collaborate with marketing team

## Requirements
- 2+ years content writing
- Strong writing portfolio
- SEO knowledge
- Research skills`,
    ctc: { 
      min: 800000, 
      max: 1800000, 
      currency: "INR", 
      benefits: ["Flexible hours", "Remote work", "Learning budget", "Creative freedom"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Share your portfolio and describe your writing process.", 
        answer: "Assess: Writing quality, versatility, research approach, revision process, SEO awareness.", 
        category: "Portfolio", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you write for different audiences and platforms?", 
        answer: "Look for: Audience analysis, tone adaptation, platform-specific best practices.", 
        category: "Writing", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "Any degree", mandatory: false },
      { id: "ec2", criterion: "Experience", requirement: "2+ years content writing", mandatory: true },
      { id: "ec3", criterion: "Portfolio", requirement: "Writing samples required", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-21",
    title: "Graphic Designer",
    status: "archived",
    tags: ["Creative", "Design"],
    stages: ["applied", "screen", "tech", "offer", "hired"],
    description: `## About the Role
Graphic Designer to create visual content for marketing, social media, and branding. Design compelling graphics that communicate brand message.

## Responsibilities
- Design marketing materials
- Create social media graphics
- Develop brand assets
- Collaborate with marketing team
- Maintain brand consistency

## Requirements
- 2+ years graphic design
- Adobe Creative Suite expertise
- Strong portfolio
- Branding knowledge`,
    ctc: { 
      min: 900000, 
      max: 2000000, 
      currency: "INR", 
      benefits: ["Creative software licenses", "Design workshops", "Health insurance"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Walk through your portfolio and explain your design decisions.", 
        answer: "Assess: Creative thinking, problem-solving, design principles, brand understanding.", 
        category: "Portfolio", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you handle feedback and revisions?", 
        answer: "Look for: Professionalism, flexibility, communication, iteration approach.", 
        category: "Collaboration", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "Design degree preferred", mandatory: false },
      { id: "ec2", criterion: "Experience", requirement: "2+ years graphic design", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "Adobe Creative Suite, typography, branding", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-22",
    title: "Customer Success Manager",
    status: "active",
    tags: ["SaaS", "Support"],
    stages: ["applied", "screen", "tech", "offer", "hired"],
    description: `## About the Role
Customer Success Manager to ensure customer satisfaction, drive product adoption, and reduce churn. Build strong customer relationships.

## Responsibilities
- Onboard new customers
- Drive product adoption
- Handle customer inquiries
- Identify upsell opportunities
- Reduce customer churn

## Requirements
- 2+ years customer success
- SaaS experience preferred
- Strong communication skills
- Problem-solving abilities`,
    ctc: { 
      min: 1200000, 
      max: 2500000, 
      currency: "INR", 
      benefits: ["Performance bonus", "Health insurance", "Remote work", "Customer success tools"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "How do you handle an unhappy customer?", 
        answer: "Expected: Empathy, active listening, problem-solving, escalation process, follow-up.", 
        category: "Customer Success", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "Describe your approach to driving product adoption.", 
        answer: "Look for: Onboarding strategy, training methods, success metrics, proactive outreach.", 
        category: "Strategy", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "2+ years customer success/support", mandatory: true },
      { id: "ec2", criterion: "Industry", requirement: "SaaS experience preferred", mandatory: false },
      { id: "ec3", criterion: "Skills", requirement: "Communication, problem-solving, CRM tools", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-23",
    title: "Operations Manager",
    status: "archived",
    tags: ["Operations", "Logistics"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Operations Manager to oversee daily operations, optimize processes, and ensure operational efficiency. Manage logistics and supply chain.

## Responsibilities
- Manage daily operations
- Optimize operational processes
- Oversee logistics and supply chain
- Monitor KPIs and metrics
- Manage vendor relationships

## Requirements
- 4+ years operations management
- Process improvement experience
- Strong analytical skills
- Leadership abilities`,
    ctc: { 
      min: 1800000, 
      max: 3500000, 
      currency: "INR", 
      benefits: ["Performance bonus", "Health insurance", "Operations tools budget"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Describe a process improvement initiative you led.", 
        answer: "Assess: Problem identification, solution design, implementation, measurement, impact.", 
        category: "Process Improvement", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you handle operational crises?", 
        answer: "Expected: Crisis management approach, communication, contingency planning, post-mortem.", 
        category: "Crisis Management", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Experience", requirement: "4+ years operations management", mandatory: true },
      { id: "ec2", criterion: "Skills", requirement: "Process optimization, logistics, vendor management", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-24",
    title: "Finance Manager",
    status: "active",
    tags: ["Finance", "Accounting"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Finance Manager to oversee financial planning, budgeting, and reporting. Ensure financial health and compliance.

## Responsibilities
- Manage financial planning and analysis
- Prepare budgets and forecasts
- Oversee accounting operations
- Ensure regulatory compliance
- Present financial reports to leadership

## Requirements
- 4+ years finance/accounting
- CA/CPA preferred
- Strong analytical skills
- Financial software proficiency`,
    ctc: { 
      min: 2000000, 
      max: 4000000, 
      currency: "INR", 
      benefits: ["Performance bonus", "CA support", "Health insurance", "Financial tools"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "How do you approach financial forecasting?", 
        answer: "Expected: Historical analysis, market trends, assumptions, scenario modeling, accuracy tracking.", 
        category: "Financial Planning", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "Describe your experience with financial compliance.", 
        answer: "Look for: Regulatory knowledge, audit experience, internal controls, reporting standards.", 
        category: "Compliance", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "CA/CPA/MBA Finance preferred", mandatory: false },
      { id: "ec2", criterion: "Experience", requirement: "4+ years in finance/accounting", mandatory: true },
      { id: "ec3", criterion: "Skills", requirement: "Financial analysis, budgeting, compliance, ERP systems", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  },
  {
    jobId: "job-25",
    title: "Legal Counsel",
    status: "archived",
    tags: ["Legal", "Compliance"],
    stages: ["applied", "screen", "tech", "offer"],
    description: `## About the Role
Legal Counsel to provide legal guidance, draft contracts, and ensure regulatory compliance. Advise leadership on legal matters.

## Responsibilities
- Review and draft contracts
- Provide legal advice
- Ensure regulatory compliance
- Manage legal disputes
- Support corporate governance

## Requirements
- Law degree and bar admission
- 3+ years legal experience
- Corporate law knowledge
- Contract negotiation skills`,
    ctc: { 
      min: 2500000, 
      max: 5000000, 
      currency: "INR", 
      benefits: ["Bar association fees", "Legal research tools", "Health insurance", "Work-life balance"]
    },
    commonQuestions: [
      { 
        id: "q1", 
        question: "Describe your experience with contract negotiation.", 
        answer: "Assess: Negotiation strategy, risk assessment, stakeholder management, documentation.", 
        category: "Contracts", 
        isEditable: true 
      },
      { 
        id: "q2", 
        question: "How do you stay updated on regulatory changes?", 
        answer: "Expected: Information sources, continuous learning, implementation process, compliance culture.", 
        category: "Compliance", 
        isEditable: true 
      }
    ],
    eligibilityCriteria: [
      { id: "ec1", criterion: "Education", requirement: "LLB/JD and bar admission", mandatory: true },
      { id: "ec2", criterion: "Experience", requirement: "3+ years practicing law", mandatory: true },
      { id: "ec3", criterion: "Specialization", requirement: "Corporate/commercial law experience", mandatory: true }
    ],
    updatedAt: "2025-10-31T13:32:00.000Z"
  }
];
