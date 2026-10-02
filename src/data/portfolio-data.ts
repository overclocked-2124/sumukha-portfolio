export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  leetcode: string;
  bio: string[];
}

export interface Education {
  institution: string;
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
  roleType: "Leading" | "Co-Lead" | "Advisor";
  description: string;
}

export const personalInfo: PersonalInfo = {
  name: "Sumukha Upadhyaya",
  title: "Systems Engineer & Full-Stack Architect",
  tagline: "Cultivating low-level systems, distributed infrastructure, and refined digital experiences in deep space.",
  location: "Bangalore, India",
  email: "sumukhaupadhyaya@gmail.com",
  phone: "+91 98440 29396",
  github: "https://github.com/overclocked-2124",
  githubHandle: "overclocked-2124",
  linkedin: "https://www.linkedin.com/in/sumukha-upadhyaya/",
  leetcode: "https://leetcode.com/u/overclocked-2124/",
  bio: [
    "I am a software engineer and undergraduate researcher at R.V. College of Engineering (B.E. Information Science, 9.69 CGPA) concurrently pursuing a BS in Data Science at IIT Madras (9.15 GPA).",
    "My technical focus lies at the intersection of low-level systems (Linux ptrace, memory virtualization, userspace EDR), high-throughput distributed architectures (Go, gRPC, Protobuf, BigQuery ingestion), and precise interface engineering (React 19, Next.js, Material 3, Tailwind CSS).",
    "I have engineered production software at Auxia (enterprise access control, CRM integrations, BigQuery RPCs) and FindInbox (multi-tenant EdTech analytics platform). Across campus, I lead flagship technical initiatives including Hackemon CTF, CloneFest, and Student Induction 2025."
  ]
};

export const educationList: Education[] = [
  {
    institution: "R.V. College of Engineering (RVCE)",
    degree: "B.E. in Information Science & Engineering",
    timeline: "2024 – Present",
    grade: "9.69 CGPA (upto 4th Sem)",
    details: "Core focus on operating systems, computer architecture, distributed systems, algorithms, and cybersecurity.",
    highlights: [
      "Top percentile academic standing (9.69 CGPA)",
      "Lead Organizer for Hackemon CTF & CloneFest",
      "Student Induction Programme 2025 Lead Coordinator",
      "Active participant in technical fireside chats including sessions with Turing Award Laureate Prof. Jeffrey D. Ullman"
    ]
  },
  {
    institution: "IIT Madras",
    degree: "BS in Data Science (Concurrent Degree)",
    timeline: "2024 – Present",
    grade: "9.15 GPA",
    details: "Rigorous curriculum covering mathematical foundations, statistical inference, distributed computing, and machine learning pipelines.",
    highlights: [
      "Concurrent degree alongside full-time engineering",
      "Advanced coursework in discrete mathematics, algorithmic optimization, and large-scale data engineering"
    ]
  },
  {
    institution: "Chethana PU College",
    degree: "Pre-University Education (2nd PUC - PCMC)",
    timeline: "Completed 2024",
    grade: "97.00%",
    details: "Physics, Chemistry, Mathematics, and Computer Science foundation with exceptional performance.",
    highlights: [
      "Ranked in top tier statewide",
      "Perfect scores in Mathematics and Computer Science"
    ]
  }
];

export const experienceList: Experience[] = [
  {
    company: "Auxia",
    role: "Software Engineering Intern (Backend / Full-Stack)",
    timeline: "Jun. 2026 – Sept. 2026",
    type: "Internship",
    bullets: [
      "Designed a unified object-level access-control system and phased its rollout on a live production database with strict backward compatibility.",
      "Built provider-agnostic marketing/CRM integrations end-to-end across backend microservices and frontend UI on a shared schema contract.",
      "Stabilized integration and smoke tests, advancing them toward a blocking CI/CD merge gate; engineered an AI-assisted PR review lane.",
      "Authored subsystem design and handoff documentation to support clean ownership transfer; delivered numerous merged PRs utilizing AI-agent-assisted workflows."
    ],
    techStack: ["Go", "TypeScript", "PostgreSQL", "Next.js", "Docker", "CI/CD", "gRPC", "Protobuf"]
  },
  {
    company: "Auxia",
    role: "Software Engineering Intern",
    timeline: "Feb. 2026 – Mar. 2026",
    type: "Internship",
    bullets: [
      "Developed features for the BigQuery self-serve ingestion project across Agent and Datawarehouse services.",
      "Engineered Classification RPCs and nested-column handling, and implemented UI enhancements for dataset management.",
      "Resolved CI/CD pipeline bottlenecks to unblock engineering workflows and improve deployment cycle efficiency."
    ],
    techStack: ["Google Cloud Platform", "BigQuery", "Go", "Python", "RPCs", "Docker"]
  },
  {
    company: "FindInbox Pvt Ltd",
    role: "Full Stack Developer Intern",
    timeline: "Aug. 2025 – Oct. 2025",
    type: "Internship",
    bullets: [
      "Engineered an AI-driven, multi-tenant EdTech platform translating traditional letter grades into actionable, skill-based analytics.",
      "Architected a scalable Supabase backend with Row-Level Security (RLS) policies and built a multi-role React/TypeScript frontend for students, faculty, and admins."
    ],
    techStack: ["React.js", "TypeScript", "Supabase", "PostgreSQL", "Node.js", "Tailwind CSS"]
  }
];

export const projectList: Project[] = [
  {
    slug: "overwatch-userspace-edr",
    title: "Overwatch - Userspace EDR",
    tagline: "Kernel-free Endpoint Detection & Response in C via Linux ptrace",
    description: "Developed a userspace Endpoint Detection & Response (EDR) engine in C using Linux ptrace to detect malicious runtime behavior without kernel modules. Implemented x86_64 System V ABI register decoding to inspect syscalls and reconstruct cross-process memory contexts for forensic analysis.",
    category: "Low-Level & Security",
    techStack: ["C", "Linux ptrace", "x86_64 System V ABI", "POSIX", "Forensics", "Makefile"],
    status: "Active",
    featured: true,
    repoUrl: "https://github.com/overclocked-2124/Overwatch-OS-EDR",
    highlights: [
      "Intercepts execution boundaries with PTRACE_SYSCALL without requiring root kernel drivers",
      "Decodes x86_64 syscall registers (rax, rdi, rsi, rdx, r10, r8, r9) in real time",
      "Detects reverse shell attempts, unauthorized socket creations, and sensitive file descriptor tampering",
      "Reconstructs target process memory layout via /proc/[pid]/mem for heap/stack analysis"
    ]
  },
  {
    slug: "heli-xr",
    title: "Heli-XR",
    tagline: "Industrial digital-twin platform with AR/VR & Gemini voice agent",
    description: "Built a Flask digital-twin telemetry platform with AR/VR visualization and an integrated Google Gemini voice agent for real-time industrial machinery monitoring and maintenance guidance. Delivered hands-free voice-synthesized diagnostics directly to technicians.",
    category: "AI & Interfaces",
    techStack: ["Python", "Flask", "Gemini API", "WebXR", "JavaScript", "HTML5/CSS3"],
    status: "Completed",
    featured: true,
    repoUrl: "https://github.com/overclocked-2124/HeliXR",
    highlights: [
      "Real-time sensor telemetry synchronization into 3D digital-twin spatial models",
      "Gemini voice agent provides real-time natural language failure diagnostics",
      "Hands-free voice synthesis workflow enabling technicians to troubleshoot machinery while operating tools"
    ]
  },
  {
    slug: "pennant",
    title: "pennant",
    tagline: "High-throughput distributed feature evaluation daemon",
    description: "Engineered a low-latency distributed feature flagging engine with zero-allocation evaluation paths. Features memory-mapped configuration caches, protocol buffer contracts, and real-time metric emission.",
    category: "Distributed Systems",
    techStack: ["Go", "gRPC", "Protobuf", "Distributed Cache", "Docker"],
    status: "Production",
    featured: true,
    repoUrl: "https://github.com/overclocked-2124/pennant",
    highlights: [
      "Sub-microsecond flag evaluation critical path using sync.Pool memory reuse",
      "Memory-mapped state caches ensuring zero allocations during active traffic bursts",
      "Built-in telemetry backhaul for real-time node state observability"
    ]
  },
  {
    slug: "chipcheck",
    title: "ChipCheck",
    tagline: "Silicon instruction analysis & microarchitectural verification",
    description: "Hardware diagnostics and instruction profiling tool designed to identify microarchitectural pipeline bottlenecks, cycle stalls, and validate low-level execution invariants.",
    category: "Low-Level & Security",
    techStack: ["TypeScript", "Next.js", "C++ Engine", "Telemetry"],
    status: "Active",
    featured: true,
    repoUrl: "https://github.com/overclocked-2124/ChipCheck",
    highlights: [
      "Microarchitectural instruction decoding and latency penalty computation",
      "Interactive instruction timeline visualization with cycle-accurate telemetry",
      "Automated verification test suites for pipeline hazard detection"
    ]
  },
  {
    slug: "project-bagh",
    title: "Project BAGH - Wildlife Anti-Poaching System",
    tagline: "Edge computer vision & sensor network for wildlife protection",
    description: "Autonomous edge sensor network combining YOLO computer vision models and acoustic triangulation to detect illegal poaching incursions in protected forest sanctuaries.",
    category: "AI & Interfaces",
    techStack: ["Python", "YOLO", "Edge Computing", "IoT Sensors", "FastAPI"],
    status: "Completed",
    featured: false,
    repoUrl: "https://github.com/overclocked-2124/Project-BAGH-Poaching-Detection",
    highlights: [
      "Low-power edge inference on embedded devices with solar auxiliary power",
      "Acoustic impulse classification for gunshots and vehicular intrusions",
      "Encrypted LoRa radio mesh network transmitting coordinates to forest rangers"
    ]
  },
  {
    slug: "velocell",
    title: "VeloCell",
    tagline: "Autonomous cellular automaton & parallel compute grid",
    description: "Algorithmic simulation exploring high-speed grid state transitions and parallel compute workloads across decentralized nodes with SIMD-accelerated memory layouts.",
    category: "Distributed Systems",
    techStack: ["Rust", "WebAssembly", "Canvas API", "TypeScript"],
    status: "Completed",
    featured: false,
    repoUrl: "https://github.com/overclocked-2124/VeloCell",
    highlights: [
      "WebAssembly-compiled Rust kernel achieving 60 FPS across 1M+ active cells",
      "SharedArrayBuffer concurrency model for multi-threaded cell calculations"
    ]
  },
  {
    slug: "phaseshift",
    title: "PhaseShift",
    tagline: "Harmonic frequency synthesis and spectral visualizer",
    description: "DSP pipeline for dynamic phase modulation, spectral visualization, and real-time audio analysis utilizing modern web audio buffers and custom GLSL fragment shaders.",
    category: "Web & Frontend",
    techStack: ["Web Audio API", "GLSL Shaders", "React", "TypeScript"],
    status: "Completed",
    featured: false,
    repoUrl: "https://github.com/overclocked-2124/PhaseShift",
    highlights: [
      "Custom fast Fourier transform (FFT) windowing in Web Audio worklets",
      "Real-time audio reactive particle field rendered via WebGL fragment shaders"
    ]
  },
  {
    slug: "sql-injection-lab",
    title: "SQL Injection Analysis & AST Containment Lab",
    tagline: "AST parser & payload containment sandbox",
    description: "Security research lab demonstrating abstract syntax tree decomposition for dynamic query sanitization and proving mathematical limitations of regex sanitizers.",
    category: "Low-Level & Security",
    techStack: ["Python", "AST", "Security Analysis", "Flask"],
    status: "Completed",
    featured: false,
    repoUrl: "https://github.com/overclocked-2124/SQL-Injection-Hackemon",
    highlights: [
      "Comparative analysis of AST parse trees vs regular expression tokenizers",
      "Interactive exploit payloads demonstration for cybersecurity trainees"
    ]
  }
];

export const skillsData = {
  languages: [
    { name: "C / C++", level: "Advanced", desc: "Linux ptrace, x86_64 ABI, POSIX, memory management" },
    { name: "Go", level: "Advanced", desc: "gRPC, Protobuf, concurrency, high-throughput microservices" },
    { name: "Python", level: "Advanced", desc: "Flask, FastAPI, AI pipelines, AST manipulation, scripting" },
    { name: "TypeScript / JavaScript", level: "Advanced", desc: "Next.js, React 19, strict type architectures" },
    { name: "Java & Kotlin", level: "Proficient", desc: "Spring Boot, enterprise design patterns" },
    { name: "Bash & Linux Shell", level: "Advanced", desc: "System automation, CI/CD pipelines, kernel utilities" },
    { name: "SQL", level: "Advanced", desc: "Complex analytical queries, indexing, schema design" }
  ],
  frameworksAndLibs: [
    "Next.js (App Router)", "React 19", "Node.js", "Express", "Flask",
    "Spring Boot", "Supabase", "Tailwind CSS v4", "Google Material 3",
    "@material/web", "shadcn/ui", "Base UI", "WebXR"
  ],
  databases: [
    "PostgreSQL", "Google BigQuery", "Firebase Firestore", "MongoDB", "MySQL", "Redis"
  ],
  cloudAndInfra: [
    "Google Cloud Platform (GCP)", "Kubernetes", "Docker", "Terraform",
    "CI/CD GitHub Actions", "DigitalOcean", "Vercel"
  ],
  systemsAndProtocols: [
    "Linux ptrace", "x86_64 System V ABI", "gRPC", "Protocol Buffers",
    "POSIX Internals", "WebSockets", "Web Audio API", "WebAssembly"
  ],
  securityAndTools: [
    "Wireshark", "Burp Suite", "Metasploit", "Git & GitHub", "Postman",
    "VS Code", "Windsurf", "GDB / LLDB"
  ]
};

export const leadershipRoles: LeadershipRole[] = [
  {
    title: "Student Induction Programme 2025",
    organization: "RV College of Engineering",
    roleType: "Leading",
    description: "Leading the central engineering orientation and academic mentorship operations for 1,200+ incoming freshman engineers across all departments."
  },
  {
    title: "Hackemon CTF",
    organization: "RVCE Coding Club / Department of ISE",
    roleType: "Leading",
    description: "Directing RVCE's premier cybersecurity capture-the-flag competition; authored technical reverse engineering, ptrace, and web exploitation challenges on custom CTFd infrastructure."
  },
  {
    title: "CloneFest",
    organization: "RVCE Tech Community",
    roleType: "Leading",
    description: "Directed campus-wide high-craft frontend clone hackathon focusing on UI fidelity, pixel-perfect execution, and modern component design systems."
  },
  {
    title: "Blockquest",
    organization: "RVCE Blockchain & Decentralized Systems",
    roleType: "Co-Lead",
    description: "Co-led technical workshops covering decentralized architecture, cryptographic primitives, and smart contract security."
  },
  {
    title: "Horcruz Hunt CTF",
    organization: "RVCE Cybersecurity Circle",
    roleType: "Advisor",
    description: "Served as technical advisor for vulnerability verification, exploit challenge review, and competition score server uptime."
  }
];

export const gardenNotes: GardenNote[] = [
  {
    slug: "userspace-edr-ptrace-internals",
    title: "Userspace EDR: Intercepting Syscalls and Inspecting ABI Registers with Linux ptrace",
    stage: "Evergreen",
    category: "Security",
    date: "Oct 2026",
    readTime: "8 min read",
    tags: ["Linux", "C", "ptrace", "Security", "EDR"],
    excerpt: "How to engineer an Endpoint Detection & Response agent entirely in userspace using Linux ptrace, System V ABI register decoding, and /proc/[pid]/mem without root kernel modules.",
    content: `
### The Motivation for Userspace Telemetry

Traditional Endpoint Detection & Response (EDR) solutions typically depend on kernel extensions, eBPF programs, or loadable kernel modules (LKMs). While kernel execution offers complete system visibility, it brings severe operational hazards: a single memory fault crashes the entire host operating system, and locked-down enterprise or containerized environments (such as Kubernetes pods without \`CAP_SYS_ADMIN\`) forbid arbitrary kernel module injection.

During the architecture of **Overwatch**, our goal was to investigate: *can we detect adversarial techniques (such as reverse shells, unauthorized socket creations, and credential harvesting) strictly within user space?*

### The Mechanics of Linux \`ptrace\`

The Linux \`ptrace\` (process trace) system call allows one process (the tracer) to observe and control the execution of another process (the tracee).

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

    // Instruct ptrace to restart tracee and stop on both syscall entry and exit
    ptrace(PTRACE_SETOPTIONS, target_pid, 0, PTRACE_O_TRACESYSGOOD);
    
    while (1) {
        ptrace(PTRACE_SYSCALL, target_pid, NULL, NULL);
        waitpid(target_pid, &status, 0);
        if (WIFEXITED(status)) break;

        struct user_regs_struct regs;
        ptrace(PTRACE_GETREGS, target_pid, NULL, &regs);

        // Analyze registers...
    }
}
\`\`\`

### Decoding System V AMD64 ABI Calling Conventions

On x86_64 Linux, system call arguments are passed via specific CPU registers rather than the stack:
- **Syscall Number**: \`orig_rax\`
- **Argument 1**: \`rdi\`
- **Argument 2**: \`rsi\`
- **Argument 3**: \`rdx\`
- **Argument 4**: \`r10\` (note: differs from standard user-space function call \`rcx\`)
- **Argument 5**: \`r8\`
- **Argument 6**: \`r9\`
- **Return Value**: \`rax\`

When \`orig_rax\` equals \`__NR_execve\` (59) or \`__NR_connect\` (42), our inspection engine immediately intercepts the register values.

### Inspecting Tracee Memory Contexts

Because register values pass memory pointers (e.g. \`char *pathname\` in \`rdi\`), the tracer cannot directly dereference the address—the address belongs to the tracee's virtual address space.

We reconstruct cross-process string contents through two complementary strategies:
1. **\`PTRACE_PEEKDATA\`**: Reads a word (8 bytes on x86_64) from the tracee's memory address.
2. **\`/proc/[pid]/mem\`**: For larger buffers, reading directly from the pseudo-file descriptor yields an order-of-magnitude throughput improvement.

\`\`\`c
char* read_tracee_string(pid_t pid, unsigned long long addr) {
    char *buf = malloc(PATH_MAX);
    char path[64];
    snprintf(path, sizeof(path), "/proc/%d/mem", pid);
    int fd = open(path, O_RDONLY);
    pread(fd, buf, PATH_MAX, addr);
    close(fd);
    return buf;
}
\`\`\`

### Detecting Reverse Shell Signatures

A hallmark signature of an interactive reverse shell is redirecting standard input, output, and error (\`stdin\`, \`stdout\`, \`stderr\`) to a network socket via \`dup2\` or \`dup3\`:

\`\`\`c
// Signature: dup2(socket_fd, 0) followed by execve("/bin/sh")
if (regs.orig_rax == __NR_dup2) {
    int oldfd = (int)regs.rdi;
    int newfd = (int)regs.rsi;
    if (is_network_socket(pid, oldfd) && (newfd == 0 || newfd == 1 || newfd == 2)) {
        trigger_edr_alert("Interactive Reverse Shell Socket Redirection Detected", pid);
    }
}
\`\`\`

By synthesizing these userspace telemetry signals, Overwatch provides proactive adversary detection with zero kernel kernel panic risk.
`
  },
  {
    slug: "bigquery-self-serve-ingestion",
    title: "Architecting Self-Serve BigQuery Ingestion: RPCs, Schemas, and Nested Columns",
    stage: "Evergreen",
    category: "Architecture",
    date: "Sep 2026",
    readTime: "7 min read",
    tags: ["BigQuery", "Go", "GCP", "Data", "RPC"],
    excerpt: "Architectural insights from designing BigQuery self-serve ingestion pipelines across Agent and Datawarehouse services at Auxia.",
    content: `
### The Enterprise Data Ingestion Dilemma

Modern marketing automation and CRM analytics demand real-time telemetry from heterogeneous data lakes. Traditional batch pipelines created friction: adding a single new customer segment field required filing tickets, modifying SQL extract scripts, and manually altering data warehouse schemas.

During my engineering internship at **Auxia**, I worked on the **BigQuery Self-Serve Ingestion** engine—bridging upstream AI agent services and downstream analytical query systems.

### Designing the Classification RPC Contract

To decouple user-facing schema mapping from database ingest workers, we defined a resilient Protocol Buffer contract:

\`\`\`protobuf
syntax = "proto3";
package auxia.ingestion.v1;

message IngestionFieldClassification {
  string source_field_name = 1;
  string target_column_name = 2;
  FieldDataType detected_type = 3;
  bool is_nested_struct = 4;
  repeated IngestionFieldClassification nested_fields = 5;
  FieldSecurityLevel security_classification = 6;
}

message IngestionRequest {
  string tenant_id = 1;
  string source_dataset = 2;
  repeated IngestionFieldClassification classifications = 3;
}
\`\`\`

### Handling Arbitrarily Nested Columns in BigQuery

BigQuery natively supports \`RECORD\` (nested structs) and repeated records. However, dynamic ingestion poses unique serialization challenges:
1. **Schema Evolution**: Upstream JSON payloads frequently introduce new keys or mutate scalar values into arrays.
2. **Nullability Invariants**: Enforcing consistent schema modes (\`NULLABLE\` vs \`REQUIRED\`) dynamically without triggering BigQuery table schema mismatch rejections.
3. **Partition Pruning**: Aligning incoming event timestamps with partitioned tables (\`_PARTITIONTIME\` or ingestion-time partitioning) to safeguard against astronomical scan query bills.

### Result & Impact

The automated classification RPC eliminated manual schema interventions, accelerating tenant onboarding from days to under 15 minutes while maintaining strict backward compatibility.
`
  },
  {
    slug: "zero-allocation-feature-flags",
    title: "Designing Zero-Allocation Feature Flag Evaluation in Go",
    stage: "Budding",
    category: "Systems",
    date: "Aug 2026",
    readTime: "6 min read",
    tags: ["Go", "Performance", "Distributed Systems", "Protobuf"],
    excerpt: "A deep dive into pennant: using sync.Pool, memory-mapped configuration buffers, and zero-allocation bitsets for sub-microsecond flag evaluation.",
    content: `
### Microsecond Budgets in Distributed Infrastructure

In high-throughput microservice fabrics, a feature flag check occurs on nearly every RPC request. If the flag evaluation routine allocates memory on the heap, the Go runtime garbage collector (GC) incurs stop-the-world scanning overhead and tail-latency amplification.

In building **pennant**, our design mandate was straightforward: *Feature evaluation must achieve zero heap allocations in the hot path.*

### Memory Pooling with \`sync.Pool\`

Rather than instantiating evaluation context structs per request, we recycle pre-allocated buffers:

\`\`\`go
package evaluation

import "sync"

type EvaluationContext struct {
    TenantID    string
    UserKey     string
    Attributes  map[string]string
    BitMask     uint64
}

var contextPool = sync.Pool{
    New: func() any {
        return &EvaluationContext{
            Attributes: make(map[string]string, 16),
        }
    },
}

func Evaluate(flagID string, populate func(*EvaluationContext)) bool {
    ctx := contextPool.Get().(*EvaluationContext)
    defer func() {
        // Reset state before returning to pool
        for k := range ctx.Attributes {
            delete(ctx.Attributes, k)
        }
        ctx.TenantID = ""
        ctx.UserKey = ""
        ctx.BitMask = 0
        contextPool.Put(ctx)
    }()

    populate(ctx)
    return evaluateRule(flagID, ctx)
}
\`\`\`

### BitSet Hashing for Fast Bucket Hashing

To decide if a user falls within a percentage rollout (e.g., 10% canary), we compute a fast 64-bit Murmur3 or HighwayHash of the composite key \`flagID:userKey\` and evaluate modulo 100 without floating-point conversion.

The result is consistent deterministic evaluation completed in under 450 nanoseconds per invocation.
`
  },
  {
    slug: "synthesizing-material3-shadcn",
    title: "Synthesizing Design Tokens: Google Material 3 and shadcn/ui",
    stage: "Evergreen",
    category: "Design",
    date: "Sep 2026",
    readTime: "5 min read",
    tags: ["Material 3", "shadcn", "Tailwind CSS", "Architecture"],
    excerpt: "How to harmonize custom web elements, semantic M3 elevation tiers, and Tailwind CSS v4 variables into a cohesive design system without aesthetic friction.",
    content: `
### The Tension Between Component Primitives and Design Systems

When building modern web interfaces, developers often face a dichotomy:
- **shadcn/ui**: Unstyled, accessible primitives giving absolute visual autonomy via Tailwind CSS.
- **Google Material 3**: A scientifically calibrated design token hierarchy featuring surface container elevations, tonal state layers, and ergonomic shape rules.

Left unconfigured, combining both produces visual chaos: mismatched border radii, conflicting elevation shadows, and jarring button aesthetics.

### Mapping Tokens to a Unified Cosmic Space Palette

To achieve seamless harmony, we map all CSS custom properties to a single authoritative source of truth in \`src/app/globals.css\`:

\`\`\`css
:root {
  /* Cosmic Dark Base */
  --background: #080A12;
  --foreground: #F1F5F9;

  /* Material 3 Surface Elevation Tiers mapped to Cosmic Slate */
  --md-sys-color-surface: #080A12;
  --md-sys-color-surface-container-low: #0E1222;
  --md-sys-color-surface-container: #141A30;
  --md-sys-color-surface-container-high: #1A223E;
  --md-sys-color-surface-container-highest: #232C4E;

  /* Primary Accent: Starlight Indigo */
  --primary: #818CF8;
  --md-sys-color-primary: #818CF8;

  /* Radii Standardization */
  --radius: 0.75rem;
  --md-sys-shape-corner-full: 9999px;
  --md-sys-shape-corner-l: 16px;
}
\`\`\`

### Strict Zero-Emoji Rule and Visual Restraint

A key design rule in this digital garden is the **Strict Zero-Emoji Policy**. Rather than cartoonish smileys, we employ high-precision SVG vector glyphs (Lucide / Material Symbols) and high-contrast typography, evoking the refined ambiance of a spacecraft mission control terminal.
`
  },
  {
    slug: "multi-tenant-edtech-analytics",
    title: "Translating Grades into Skill Vectors: Multi-Tenant Architecture with Supabase & TypeScript",
    stage: "Budding",
    category: "Architecture",
    date: "Aug 2025",
    readTime: "6 min read",
    tags: ["Supabase", "React", "TypeScript", "EdTech", "PostgreSQL"],
    excerpt: "Architecture learnings from FindInbox: designing row-level security, multi-role data access, and skill matrix decomposition.",
    content: `
### Beyond the Letter Grade

Standard academic metrics (percentages, grade points) aggregate student performance into a single scalar value, completely masking fine-grained competency vectors. A student who scored 75% in a computer science course might have mastered data structures while struggling with concurrency.

At **FindInbox**, we engineered an AI-driven multi-tenant platform to decompose curriculum assignments into discrete skill vectors.

### Row-Level Security (RLS) in Multi-Tenant PostgreSQL

With students, teachers, department heads, and institution admins accessing the same database, security at the application layer is insufficient. We enforced multi-tenancy at the database engine level using Supabase Row-Level Security:

\`\`\`sql
-- Ensure users can only read grade metrics within their institution tenancy
CREATE POLICY tenant_isolation_policy ON student_competencies
FOR SELECT
USING (
  institution_id = (SELECT institution_id FROM auth.users WHERE auth.uid() = id)
);
\`\`\`

### Vector Aggregation in TypeScript

By mapping raw rubric scores against an ontological taxonomy of competencies, the frontend renders actionable spider graphs and targeted remediation paths for students and faculty.
`
  },
  {
    slug: "deterministic-runtime-sandboxing",
    title: "Deterministic Runtime Environments & MicroVM Sandboxing",
    stage: "Seedling",
    category: "Security",
    date: "Sep 2026",
    readTime: "8 min read",
    tags: ["MicroVM", "Virtualization", "KVM", "Isolation"],
    excerpt: "A breakdown of microVM isolation primitives, memory fences, and capability-based access models for secure multi-tenant execution.",
    content: `
### The Cloud Execution Boundary

Traditional container isolation relies on Linux namespaces, cgroups, and seccomp filters. While lightweight, all containers share the same underlying host kernel—leaving the entire infrastructure exposed to kernel zero-day privilege escalations.

### The Rise of Lightweight MicroVMs

MicroVM architectures (such as Firecracker and Cloud-Hypervisor) leverage Linux KVM to spawn minimal virtual machines in under 5 milliseconds with memory footprints under 5 MB.

By stripping legacy hardware emulation (PCI buses, IDE controllers, ACPI tables) down to bare virtio devices, microVMs provide hardware-level memory boundary virtualization at container-grade density.

### Deterministic Sandboxing

In this seedling note, we explore combining KVM microVMs with userspace instruction monitoring to enforce reproducible, deterministic code execution environments.
`
  }
];
