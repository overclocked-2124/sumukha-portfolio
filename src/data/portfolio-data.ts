export interface PersonalInfo {
  name: string;
  handle: string;
  title: string;
  tagline: string;
  location: string;
  usn: string;
  email: string;
  phone: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  leetcode: string;
  leetcodeHandle: string;
  leetcodeSolved: string;
  kaggle: string;
  bio: string[];
}

export interface Education {
  institution: string;
  shortName: string;
  degree: string;
  timeline: string;
  grade: string;
  details: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  timeline: string;
  type: string;
  summary: string;
  bullets: string[];
  techStack: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "Low-Level & Security" | "Distributed Systems" | "AI & Interfaces" | "Web & Frontend";
  techStack: string[];
  status: "Active" | "Production" | "Completed";
  featured: boolean;
  repoUrl?: string;
  demoUrl?: string;
  highlights: string[];
}

export interface GardenNote {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  stage: "Seedling" | "Budding" | "Evergreen";
  category: "Systems" | "Security" | "Architecture" | "Design";
  date: string;
  readTime: string;
  tags: string[];
}

export interface LeadershipRole {
  title: string;
  organization: string;
  roleType: "Vice President" | "Lead" | "Co-Lead" | "Advisor";
  description: string;
}

export interface PersonalSpecItem {
  label: string;
  value: string;
  detail: string;
}

export interface HardwareModuleSpec {
  id: "cpu" | "pcie" | "mem" | "vrm" | "io";
  partName: string;
  socketSpec: string;
  subsystemLabel: string;
  route: string;
  routeLabel: string;
  summary: string;
}

export const personalInfo: PersonalInfo = {
  name: "Sumukha Upadhyaya",
  handle: "overclocked-2124",
  title: "Systems and Backend Engineer",
  tagline: "Userspace security runtimes, gRPC distributed services, and full-stack software.",
  location: "Bengaluru, India",
  usn: "1RV24IS130",
  email: "sumukhaupadhyaya@gmail.com",
  phone: "+91 98440 29396",
  github: "https://github.com/overclocked-2124",
  githubHandle: "overclocked-2124",
  linkedin: "https://www.linkedin.com/in/sumukhaupadhyaya/",
  leetcode: "https://leetcode.com/u/sumukha-upadhyaya-chintu/",
  leetcodeHandle: "sumukha-upadhyaya-chintu",
  leetcodeSolved: "279 Solved (178 Med, 14 Hard)",
  kaggle: "https://www.kaggle.com/overclocked2124",
  bio: [
    "I am an Information Science undergraduate at R.V. College of Engineering (9.69 CGPA) concurrently completing a BS in Data Science at IIT Madras (9.15 GPA).",
    "My work focuses on low-level Linux systems (ptrace syscall interception, x86_64 ABI register decoding), stateful distributed backends (Kotlin, Go, gRPC, Protobuf, BigQuery), and high-craft web applications (Next.js, React 19, TypeScript).",
    "I have shipped production object-level access control, CRM integrations, and BigQuery self-serve ingestion RPCs across two internships at Auxia, as well as multi-tenant analytics at FindInbox. On campus, I serve as Vice President of Coding Club RVCE and have led Hackemon CTF, CloneFest, and Student Induction 2025."
  ]
};

export const hardwareModules: HardwareModuleSpec[] = [
  {
    id: "cpu",
    partName: "CPU Socket",
    socketSpec: "LGA-2124",
    subsystemLabel: "Experience and Education",
    route: "/about",
    routeLabel: "Open full profile",
    summary: "Three software engineering internships at Auxia (2x) and FindInbox, paired with concurrent degrees at RVCE (9.69 CGPA) and IIT Madras (9.15 GPA)."
  },
  {
    id: "pcie",
    partName: "PCIe Compute Card",
    socketSpec: "PCIe 5.0 x16",
    subsystemLabel: "Projects and Systems",
    route: "/projects",
    routeLabel: "Explore all 10 projects",
    summary: "Kernel-free C syscall tracers, stateful Kotlin gRPC chat engines, edge acoustic ML pipelines, S-400 radar defense hardware, and C99 data-structure engines."
  },
  {
    id: "mem",
    partName: "DDR5 and NVMe Array",
    socketSpec: "4x DIMM + M.2",
    subsystemLabel: "Engineering Notes",
    route: "/blogs",
    routeLabel: "Read all notes",
    summary: "Technical writeups on Linux ptrace internals, BigQuery self-serve ingestion schemas, and Write-First gRPC stream durability."
  },
  {
    id: "vrm",
    partName: "VRM Power Stage",
    socketSpec: "16+2 Phase",
    subsystemLabel: "Technical Stack",
    route: "/about#stack",
    routeLabel: "View full stack",
    summary: "Core languages, systems protocols, databases, and verification tools used across production internships and research."
  },
  {
    id: "io",
    partName: "Rear I/O Panel",
    socketSpec: "External Bus",
    subsystemLabel: "Leadership and Personal",
    route: "/about#field-spec",
    routeLabel: "View leadership and bio",
    summary: "Vice President at Coding Club RVCE, international Shotokan Karate Black Belt gold medalist, and PC hardware enthusiast."
  }
];

export const educationList: Education[] = [
  {
    institution: "R.V. College of Engineering (RVCE)",
    shortName: "RVCE Bengaluru",
    degree: "B.E. in Information Science and Engineering",
    timeline: "2024 – Present",
    grade: "9.69 CGPA",
    details: "Operating systems, computer architecture, data structures in C, distributed systems, and security.",
    highlights: [
      "9.69 CGPA up to 4th Semester (USN: 1RV24IS130)",
      "Vice President, Coding Club RVCE (2026–27)",
      "Lead Organizer: Hackemon CTF, CloneFest, and Student Induction 2025"
    ]
  },
  {
    institution: "IIT Madras",
    shortName: "IIT Madras",
    degree: "BS in Data Science and Programming",
    timeline: "Concurrent",
    grade: "9.15 GPA",
    details: "Concurrent degree alongside full-time B.E. covering statistical inference, Python/Java DSA, and machine learning.",
    highlights: [
      "Completed foundational and statistical inference modules with 9.15 GPA",
      "Applied correlation modeling and data pipelines on real-world datasets"
    ]
  },
  {
    institution: "Chethana PU College",
    shortName: "Chethana PU",
    degree: "Pre-University Education (2nd PUC, PCMC)",
    timeline: "Completed 2024",
    grade: "97.00%",
    details: "Physics, Chemistry, Mathematics, and Computer Science.",
    highlights: [
      "97.00% aggregate with top statewide standing",
      "Full marks in Mathematics and Computer Science"
    ]
  }
];

export const experienceList: Experience[] = [
  {
    company: "Auxia",
    role: "Software Engineering Intern (Backend / Full-Stack)",
    timeline: "Jun 2026 – Sep 2026",
    type: "Internship",
    summary: "Designed production object-level access control and end-to-end CRM integrations on a shared contract.",
    bullets: [
      "Designed a unified object-level access-control system and phased its rollout on a live production database with backward compatibility.",
      "Built provider-agnostic marketing and CRM integrations end-to-end across backend services and frontend UI on a shared contract.",
      "Stabilized integration and smoke tests toward a blocking merge gate and built an AI-assisted PR review lane.",
      "Authored subsystem design and handoff documentation for clean ownership transfer across merged production PRs."
    ],
    techStack: ["Go", "Kotlin", "TypeScript", "PostgreSQL", "Next.js", "gRPC", "Protobuf", "CI/CD"]
  },
  {
    company: "Auxia",
    role: "Software Engineering Intern",
    timeline: "Feb 2026 – Mar 2026",
    type: "Internship",
    summary: "Engineered BigQuery self-serve ingestion features, Classification RPCs, and nested-column handling.",
    bullets: [
      "Developed features for the BigQuery self-serve ingestion project across Agent and Datawarehouse services.",
      "Engineered Classification RPCs and nested-column handling, alongside console UI enhancements.",
      "Resolved CI/CD pipeline bottlenecks to unblock development and improve deployment efficiency."
    ],
    techStack: ["Google Cloud", "BigQuery", "Go", "Python", "gRPC", "Protobuf", "Docker"]
  },
  {
    company: "FindInbox Pvt Ltd",
    role: "Full Stack Developer Intern",
    timeline: "Aug 2025 – Oct 2025",
    type: "Internship",
    summary: "Architected an AI-driven multi-tenant EdTech platform translating grades into skill analytics.",
    bullets: [
      "Engineered an AI-driven, multi-tenant EdTech platform translating traditional grades into actionable, skill-based analytics.",
      "Architected a scalable Supabase backend with Row-Level Security and built a multi-role React and TypeScript frontend for students, faculty, and admins."
    ],
    techStack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Node.js", "Tailwind CSS"]
  }
];

export const projectList: Project[] = [
  {
    slug: "overwatch-userspace-edr",
    title: "Overwatch Userspace EDR",
    tagline: "Kernel-free Linux syscall tracer and security monitor in C",
    description: "Userspace Endpoint Detection and Response (EDR) engine in C using Linux ptrace to intercept syscalls, decode x86_64 System V ABI registers, and inspect cross-process memory without kernel modules.",
    category: "Low-Level & Security",
    techStack: ["C", "Linux ptrace", "x86_64 ABI", "POSIX", "Makefile"],
    status: "Active",
    featured: true,
    repoUrl: "https://github.com/overclocked-2124/Overwatch-OS-EDR",
    highlights: [
      "Intercepts syscall entry and exit double-stops via PTRACE_SYSCALL without kernel panic risk",
      "Decodes x86_64 registers (RAX, RDI, RSI, RDX, R10, R8, R9) and reconstructs child strings via PTRACE_PEEKDATA",
      "Enforces heuristic rules against /etc/shadow access, /dev/shm execution, SSH key theft, and reverse shell ports"
    ]
  },
  {
    slug: "velocell",
    title: "VeloCell",
    tagline: "Cloud-First real-time chat engine over gRPC",
    description: "High-performance stateful chat backend built on Kotlin, Spring Boot 4, bidirectional gRPC streams, Coroutines, and PostgreSQL with Write-First durability and client-side UUID idempotency.",
    category: "Distributed Systems",
    techStack: ["Kotlin", "Spring Boot", "gRPC", "Protobuf", "Coroutines", "PostgreSQL"],
    status: "Production",
    featured: true,
    repoUrl: "https://github.com/overclocked-2124/VeloCell",
    highlights: [
      "Write-First, Broadcast-Second transactional persistence guarantees zero ghost messages on power loss",
      "Separates unary history RPCs (GetRoomHistory) from multiplexed live bidirectional streams (ConnectStream)",
      "Bounded ConcurrentHashMap<Long, Channel<ServerEvent>> session registry evicts slow consumers automatically"
    ]
  },
  {
    slug: "heli-xr",
    title: "Heli-XR",
    tagline: "Industrial AR/VR digital-twin platform with Gemini voice agent",
    description: "Flask digital-twin telemetry platform with AR/VR visualization and an integrated Google Gemini voice agent for real-time industrial monitoring and hands-free maintenance guidance.",
    category: "AI & Interfaces",
    techStack: ["Python", "Flask", "Gemini API", "WebXR", "JavaScript"],
    status: "Completed",
    featured: true,
    repoUrl: "https://github.com/overclocked-2124/HeliXR",
    highlights: [
      "Synchronizes real-time machinery telemetry into interactive 3D spatial models",
      "Uses Gemini for natural-language failure diagnostics and hands-free voice synthesis",
      "Built for RVCE Experiential Learning (Team ALPHA-Q)"
    ]
  },
  {
    slug: "project-bagh",
    title: "Project BAGH",
    tagline: "Edge acoustic ML pipeline and real-time ranger dashboard",
    description: "End-to-end wildlife poaching detection system sampling 20kHz audio on Arduino Uno + MAX4466, extracting 26 MFCC features in Python for ML classification (96%+ accuracy), and streaming alerts to Next.js via Supabase.",
    category: "AI & Interfaces",
    techStack: ["Arduino", "Python", "scikit-learn", "librosa", "Supabase", "Next.js"],
    status: "Completed",
    featured: true,
    repoUrl: "https://github.com/overclocked-2124/Project-BAGH-Poaching-Detection",
    highlights: [
      "1Mbps serial audio capture at 20kHz with 26 MFCC feature extraction (13 means + 13 stds)",
      "Classifies gunshots vs. animal distress calls with 96%+ accuracy and uploads WAV evidence to Supabase Storage",
      "Live Next.js ranger console with GPS sensor map and Gemini voice query assistant"
    ]
  },
  {
    slug: "rvce-events",
    title: "RVCE Events Platform",
    tagline: "Self-hosted campus event discovery and organizer console",
    description: "Full-stack campus event platform architected as a Kotlin Spring Boot modular monolith with Protocol Buffer contracts, Liquibase migrations, and a Next.js 16 App Router console with an embedded BFF.",
    category: "Distributed Systems",
    techStack: ["Kotlin", "Spring Boot", "Protobuf", "Liquibase", "Next.js 16", "Docker"],
    status: "Active",
    featured: false,
    repoUrl: "https://github.com/overclocked-2124/RVCE-events",
    highlights: [
      "Shared Protocol Buffer contracts between Kotlin backend services and Next.js 16 BFF",
      "Domain-scoped Liquibase database migrations and self-hosted Docker deployment"
    ]
  },
  {
    slug: "git-clone-with-dsa",
    title: "Git-DSA in C99",
    tagline: "13-command Git CLI built from scratch in C99",
    description: "In-memory implementation of Git's core engine in C99 mapping version control primitives directly to fundamental data structures: Linked Lists, djb2 Hash Tables, LIFO Stacks, and N-ary Trees.",
    category: "Low-Level & Security",
    techStack: ["C99", "Data Structures", "djb2 Hash", "Makefile", "Valgrind"],
    status: "Completed",
    featured: false,
    repoUrl: "https://github.com/overclocked-2124/Git-Clone-With-DSA",
    highlights: [
      "Implements init, add, commit, log, status, stash (save/pop/list), branch (create/checkout/delete), and ANSI commit graph",
      "O(1) file staging via djb2 hash table with separate chaining and zero memory leaks verified under Valgrind"
    ]
  },
  {
    slug: "sudarshan-chakra",
    title: "Sudarshan-Chakra Radar Defense",
    tagline: "Hardware missile defense radar and laser interception unit",
    description: "Hardware target tracking and interception platform inspired by India's S-400 defense system using ultrasonic radar sweep, real-time servo vectoring, and laser target lock.",
    category: "Low-Level & Security",
    techStack: ["Arduino", "Embedded C++", "Ultrasonic Radar", "Servo Control", "JavaScript"],
    status: "Completed",
    featured: false,
    repoUrl: "https://github.com/overclocked-2124/Sudarshan-Chakra",
    highlights: [
      "Continuous 180-degree ultrasonic radar sweep with angular distance telemetry",
      "Automated servo turret vectoring and laser target interception lock"
    ]
  },
  {
    slug: "chipcheck",
    title: "ChipCheck",
    tagline: "Hardware fault injection and adaptive silicon verification bench",
    description: "Hardware diagnostics and closed-loop verification platform pairing an adaptive planner (multivariate TPE / GP-BO) with bench controllers and a Next.js operator console.",
    category: "Low-Level & Security",
    techStack: ["Python", "Next.js", "Embedded Bench", "ESP32-S3", "Telemetry"],
    status: "Active",
    featured: false,
    repoUrl: "https://github.com/overclocked-2124/ChipCheck",
    highlights: [
      "Separates control-plane safety limits and oracle judgment from hardware bench execution",
      "Tracks DUT firmware, peripherals, and measured vs. requested telemetry across runs"
    ]
  },
  {
    slug: "hackemon-security-suite",
    title: "Hackemon CTF and SQLi Sandbox",
    tagline: "Custom CTF infrastructure and exploitation challenge suite",
    description: "Competition infrastructure, prelims/finale challenge repositories, and interactive SQL injection labs deployed for RVCE's flagship cybersecurity Capture-The-Flag tournament.",
    category: "Web & Frontend",
    techStack: ["Python", "CTFd", "JavaScript", "React", "Docker", "Vercel"],
    status: "Completed",
    featured: false,
    repoUrl: "https://github.com/overclocked-2124/SQL-Injection-Hackemon",
    demoUrl: "https://hackemon-eta.vercel.app",
    highlights: [
      "Authored reverse engineering, ptrace, and web exploitation challenges for campus-wide CTF",
      "Built interactive SQL injection containment labs and participant registration portals"
    ]
  },
  {
    slug: "sip-2025-suite",
    title: "RVCE SIP 2025 Platform Suite",
    tagline: "Production attendance, volunteer, and announcement portals for 1,200+ freshmen",
    description: "Suite of three production web applications deployed across RVCE to coordinate volunteer recruitment, real-time announcements, and session attendance for over 1,200 incoming first-year students.",
    category: "Web & Frontend",
    techStack: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Vercel"],
    status: "Production",
    featured: false,
    repoUrl: "https://github.com/overclocked-2124/SIP-Attendance-2025",
    demoUrl: "https://sipattendence.vercel.app",
    highlights: [
      "Served 1,200+ incoming RVCE students and 100+ volunteers across multi-week induction",
      "Integrated live attendance tracking, announcement feeds, and volunteer scheduling"
    ]
  }
];

export const skillsData = {
  languages: [
    { name: "C and C++", desc: "Linux ptrace, x86_64 ABI, POSIX, C99 DSA" },
    { name: "Go", desc: "gRPC, Protobuf, concurrent backend services" },
    { name: "Kotlin and Java", desc: "Spring Boot, Coroutines, gRPC streams" },
    { name: "Python", desc: "Flask, FastAPI, ML pipelines, librosa" },
    { name: "TypeScript", desc: "Next.js App Router, React 19, strict types" },
    { name: "SQL and Bash", desc: "PostgreSQL, BigQuery, Linux automation" }
  ],
  frameworksAndLibs: [
    "Next.js (App Router)", "React 19", "Spring Boot", "Node.js", "Express",
    "Flask", "Supabase", "Tailwind CSS v4", "shadcn/ui", "WebXR"
  ],
  databases: [
    "PostgreSQL", "Google BigQuery", "Supabase", "Firebase Firestore", "MongoDB", "MySQL", "Redis", "Liquibase"
  ],
  cloudAndInfra: [
    "Google Cloud (GCP)", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "DigitalOcean", "Vercel"
  ],
  systemsAndProtocols: [
    "Linux ptrace", "x86_64 System V ABI", "gRPC (HTTP/2)", "Protocol Buffers",
    "POSIX Internals", "Kotlin Coroutines", "Embedded Serial IoT"
  ],
  securityAndTools: [
    "Wireshark", "Burp Suite", "Metasploit", "GDB and Valgrind", "CTFd", "Git and GitHub", "Postman"
  ]
};

export const leadershipRoles: LeadershipRole[] = [
  {
    title: "Coding Club RVCE",
    organization: "RV College of Engineering",
    roleType: "Vice President",
    description: "Core Team and Vice President (2026–27). Co-maintaining RVCE-Coding-Bootkit, RVCE-events, and coordinating campus-wide technical workshops and hackathons."
  },
  {
    title: "Student Induction Programme 2025",
    organization: "RV College of Engineering",
    roleType: "Lead",
    description: "Led central orientation operations and built production attendance and volunteer portals serving 1,200+ incoming freshmen."
  },
  {
    title: "Hackemon CTF",
    organization: "Coding Club RVCE / Dept. of ISE",
    roleType: "Lead",
    description: "Directed RVCE's flagship cybersecurity CTF competition; authored reverse engineering, ptrace, and web exploitation challenges."
  },
  {
    title: "CloneFest",
    organization: "RVCE Tech Community",
    roleType: "Lead",
    description: "Led campus-wide frontend engineering hackathon focused on UI fidelity, component systems, and web craft."
  },
  {
    title: "Blockquest and Horcruz Hunt CTF",
    organization: "RVCE Technical Clubs",
    roleType: "Co-Lead",
    description: "Co-led decentralized systems workshops at Blockquest and served as technical advisor for Horcruz Hunt CTF."
  }
];

export const personalHardwareSpecs: PersonalSpecItem[] = [
  {
    label: "Handle Origin",
    value: "overclocked-2124",
    detail: "Long-time obsession with silicon architectures, clock-speed tuning, and PC hardware across AMD, Nvidia, Intel, and Apple."
  },
  {
    label: "Martial Arts",
    value: "Shotokan Karate Black Belt",
    detail: "Practicing since 2015. Black Belt diploma holder and international medalist at the MSAC Tournament in Ukraine."
  },
  {
    label: "Physics and Radar",
    value: "Astrophysics and Sonar",
    detail: "Deep personal interest in astrophysics, orbital mechanics, and acoustic/radar telemetry (Project BAGH, Sudarshan-Chakra)."
  },
  {
    label: "Logic and Sandbox",
    value: "Minecraft Redstone",
    detail: "Where systems thinking started: building combinational logic gates, clock circuits, and custom server infrastructure."
  },
  {
    label: "Visual and 3D Craft",
    value: "After Effects, Premiere, Maya",
    detail: "Motion compositing, 3D modeling in Autodesk Maya, and industrial design inspired by Teenage Engineering."
  }
];

export const gardenNotes: GardenNote[] = [
  {
    slug: "userspace-edr-ptrace-internals",
    title: "Userspace EDR: Intercepting Syscalls and Inspecting ABI Registers with Linux ptrace",
    stage: "Evergreen",
    category: "Security",
    date: "Oct 18, 2026",
    readTime: "8 min read",
    tags: ["Linux", "C", "ptrace", "Security", "x86_64"],
    excerpt: "How to engineer an Endpoint Detection and Response agent entirely in userspace using Linux ptrace, System V ABI register decoding, and PTRACE_PEEKDATA without kernel modules.",
    content: `
### The Motivation for Userspace Telemetry

Traditional Endpoint Detection and Response (EDR) agents depend on loadable kernel modules (LKMs) or eBPF programs. While kernel execution offers full visibility, a single pointer fault panics the host OS, and hardened container environments forbid arbitrary kernel module loading.

While building **Overwatch**, the core engineering question was simple: *can we intercept reverse shells, unauthorized file reads, and suspicious executions strictly from user space?*

### The Mechanics of Linux \`ptrace\`

The Linux \`ptrace\` system call lets a parent tracer process attach to a tracee and pause execution at every system call boundary (the entry/exit "double-stop"):

\`\`\`c
#include <sys/ptrace.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/user.h>
#include <syscall.h>

void monitor_process(pid_t target_pid) {
    int status;
    ptrace(PTRACE_ATTACH, target_pid, NULL, NULL);
    waitpid(target_pid, &status, 0);
    ptrace(PTRACE_SETOPTIONS, target_pid, 0, PTRACE_O_TRACESYSGOOD);
    
    while (1) {
        ptrace(PTRACE_SYSCALL, target_pid, NULL, NULL);
        waitpid(target_pid, &status, 0);
        if (WIFEXITED(status)) break;

        struct user_regs_struct regs;
        ptrace(PTRACE_GETREGS, target_pid, NULL, &regs);
    }
}
\`\`\`

### Decoding System V AMD64 ABI Calling Conventions

On x86_64 Linux, syscall arguments pass through CPU registers rather than the stack:
- **Syscall Number**: \`orig_rax\`
- **Arguments 1–3**: \`rdi\`, \`rsi\`, \`rdx\`
- **Arguments 4–6**: \`r10\`, \`r8\`, \`r9\`
- **Return Value**: \`rax\`

### Crossing the Virtual Memory Barrier

Because register pointers (like \`char *pathname\` in \`rdi\`) belong to the child's virtual address space, dereferencing them directly in the tracer causes an immediate segmentation fault. Overwatch reconstructs strings word-by-word across the boundary using \`PTRACE_PEEKDATA\` and \`/proc/[pid]/mem\` before evaluating heuristic kill rules.
`
  },
  {
    slug: "bigquery-self-serve-ingestion",
    title: "Architecting Self-Serve BigQuery Ingestion: RPCs, Schemas, and Nested Columns",
    stage: "Evergreen",
    category: "Architecture",
    date: "Sep 04, 2026",
    readTime: "7 min read",
    tags: ["BigQuery", "Go", "GCP", "Protobuf", "RPC"],
    excerpt: "Architectural lessons from building BigQuery self-serve ingestion pipelines and classification RPCs across Agent and Datawarehouse services at Auxia.",
    content: `
### The Enterprise Data Ingestion Bottleneck

Enterprise marketing and decisioning engines ingest heterogeneous customer events from dozens of warehouse schemas. When every new nested column requires manual schema migrations, onboarding stalls.

During my internship at **Auxia**, I worked on the **BigQuery Self-Serve Ingestion** pipeline bridging upstream Agent services and downstream Datawarehouse workers.

### Defining the Classification RPC Contract

To decouple UI schema selection from warehouse ingestion workers, we used strict Protocol Buffer contracts capable of representing recursive nested \`RECORD\` structures:

\`\`\`protobuf
syntax = "proto3";
package auxia.ingestion.v1;

message IngestionFieldClassification {
  string source_field_name = 1;
  string target_column_name = 2;
  FieldDataType detected_type = 3;
  bool is_nested_struct = 4;
  repeated IngestionFieldClassification nested_fields = 5;
}
\`\`\`

### Handling Nested Columns and Backward Compatibility

BigQuery supports arbitrary \`RECORD\` nesting and repeated arrays, which requires careful recursive validation so schema evolution never breaks active downstream queries. Pairing strong RPC contracts with automated CI smoke gates cut tenant schema onboarding from days to minutes.
`
  },
  {
    slug: "cloud-first-grpc-chat-velocell",
    title: "Write-First, Broadcast-Second: Designing Stateful gRPC Streams in VeloCell",
    stage: "Evergreen",
    category: "Systems",
    date: "May 22, 2026",
    readTime: "6 min read",
    tags: ["Kotlin", "gRPC", "PostgreSQL", "Coroutines", "Distributed Systems"],
    excerpt: "Why raw Pub/Sub fails for team chat, and how VeloCell combines transactional PostgreSQL durability with bounded Kotlin Coroutine channels over HTTP/2.",
    content: `
### Why Raw Pub/Sub Fails at the Edge

A common system design trap is treating real-time chat as a naive Pub/Sub broker. If a client drops connection for 50ms while a message is in flight, a dumb pipe loses it forever.

In **VeloCell**, we modeled the backend after Slack's Cloud-First architecture using **Kotlin, Spring Boot 4, gRPC over HTTP/2, and PostgreSQL**.

### 1. Write-First, Broadcast-Second

When \`ConnectStream\` receives a \`ClientEvent\`, \`MessageProcessor\` opens a \`@Transactional\` boundary, validates membership, and commits the row to PostgreSQL *before* triggering fan-out through the in-memory session registry. If power dies mid-flight, zero ghost messages are broadcast.

### 2. Separating History from Live Streams

Bulk history dumps should never clog real-time sockets. VeloCell splits traffic at the Protobuf contract level:
- **Unary RPC (\`GetRoomHistory\`)**: Fetches the last 50 persisted messages on room join.
- **Bidi Stream (\`ConnectStream\`)**: Multiplexes only live post-join events over HTTP/2.

### 3. Client-Side UUID Idempotency

Clients generate a \`UUID.randomUUID()\` primary key per message before sending. Retries on flaky networks hit PostgreSQL's unique PK constraint and safely no-op without duplicate broadcasts.
`
  },
  {
    slug: "edge-acoustic-ml-project-bagh",
    title: "20kHz Edge Acoustic Telemetry: Detecting Poaching with MFCCs and Arduino",
    stage: "Budding",
    category: "Systems",
    date: "Jan 14, 2026",
    readTime: "5 min read",
    tags: ["Arduino", "TinyML", "Audio DSP", "Python", "Supabase"],
    excerpt: "Streaming 20kHz raw audio over 1Mbps Serial from an Arduino Uno to extract 26 MFCC features and classify gunshots in real time.",
    content: `
### Hardware Constraints in Forest Sanctuaries

Inspired by anti-poaching operations in Bandipur National Park, **Project BAGH** was designed to detect gunshots and animal distress calls using low-cost acoustic nodes.

### High-Speed Serial Audio Capture

Standard 9600-baud serial is far too slow for audio waveforms. We configured the Arduino Uno + MAX4466 electret amplifier to stream at **1,000,000 baud (1 Mbps)**, capturing 4-second windows at a **20kHz sample rate** whenever amplitude crosses the trigger threshold.

### 26-Feature MFCC Extraction

Each 4-second WAV buffer is processed through \`librosa\` to extract **26 Mel-Frequency Cepstral Coefficients** (13 means + 13 standard deviations), achieving **96%+ classification accuracy** with minimal inference latency before pushing real-time alerts and audio evidence to Supabase.
`
  }
];
