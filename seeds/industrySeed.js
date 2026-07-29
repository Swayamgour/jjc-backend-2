const mongoose = require("mongoose");
require("dotenv").config();

const Industry = require("../models/Industry");

const industries = [
    // ============================================================
    // 1. Healthcare - Healthcare Software Development Services
    // ============================================================
    {
        title: "Healthcare Software Development Services",
        slug: "healthcare",
        urlPath: "/industries/healthcare",
        badge: "Healthcare",
        breadcrumb: ["Home", "Industries", "Healthcare Software Development Services"],
        hero: {
            description: "Transform Healthcare with Secure & Intelligent Digital Solutions",
            subDescription: "Deliver exceptional patient care while improving operational efficiency with secure, scalable, and customized healthcare digital solutions. From patient management systems to Microsoft Dynamics 365 implementation, our healthcare technology experts build solutions that simplify workflows, enhance patient experiences, and support better clinical outcomes. We help hospitals, clinics, diagnostic centers, pharmacies, and healthcare organizations modernize their operations through secure, scalable, and customized digital solutions that streamline workflows, enhance patient experiences, and support better clinical outcomes.",
            heroBadges: ["Secure Healthcare Solutions", "Microsoft Dynamics 365", "Custom Healthcare Software", "EHR & EMR Integration"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#00B4D8",
            accentDark: "#0096B5",
            accentLight: "#48CAE4",
            accentSoft: "rgba(0,180,216,0.08)",
            heroStart: "#0A1E2E",
            heroEnd: "#005A7A",
            accentRgb: "0, 180, 216"
        },
        overview: {
            tag: "Healthcare Software Solutions",
            title: "Healthcare Software Solutions for Modern Healthcare Organizations",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "The healthcare industry is evolving rapidly and organizations need technology that improves efficiency without compromising patient care. At JJC Systems, we develop innovative healthcare software solutions that streamline daily operations, automate administrative tasks, and enable healthcare providers to deliver quality care with confidence. The demand for digital transformation in healthcare has never been greater, with patients expecting seamless experiences and providers needing efficient tools to manage increasing workloads.",
                "Our team understands the challenges healthcare organizations face, including managing patient records, scheduling appointments, maintaining compliance, and protecting sensitive medical data. Therefore, we create secure, scalable, and user-friendly healthcare applications tailored to your business needs. We leverage Microsoft Dynamics 365, Power Platform, and Azure to build solutions that address the unique requirements of modern healthcare organizations.",
                "Whether you are looking to implement Microsoft Dynamics 365, build a custom healthcare platform, or upgrade your existing system, we deliver solutions that support long-term digital transformation. Our healthcare software development services are designed to help organizations improve patient engagement, streamline clinical workflows, reduce administrative burden, and achieve better health outcomes through technology."
            ],
            checklist: ["Secure Healthcare Applications", "Custom Digital Solutions", "Improved Patient Experience", "Operational Efficiency", "EHR & EMR Integration", "Telemedicine Platforms"]
        },
        solutions: {
            tag: "Our Healthcare Software Development Services",
            title: "Our Healthcare Software Development Services",
            subtitle: "Secure, scalable, and customized healthcare solutions designed to meet the unique challenges of modern healthcare organizations. Our comprehensive services cover every aspect of healthcare technology, from patient engagement to clinical operations and administrative management.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Monitor",
                    title: "Custom Healthcare Software Development",
                    description: "We design and develop customized healthcare software that aligns with your workflows, improves operational efficiency, and supports better patient care. Our solutions are built with user experience in mind."
                },
                {
                    icon: "Building2",
                    title: "Microsoft Dynamics 365 Healthcare",
                    description: "Optimize patient relationship management, appointment scheduling, care coordination, and reporting with Microsoft Dynamics 365 customized for healthcare organizations of all sizes."
                },
                {
                    icon: "FileText",
                    title: "EHR & EMR Solutions",
                    description: "Manage patient records securely with centralized Electronic Health Record solutions that provide real-time access to medical histories, prescriptions, and treatment plans."
                },
                {
                    icon: "Hospital",
                    title: "Hospital Management System",
                    description: "Integrate patient registration, appointments, billing, pharmacy, laboratory, inventory, and reporting into a single comprehensive platform for complete hospital management."
                },
                {
                    icon: "Video",
                    title: "Telemedicine Solutions",
                    description: "Expand healthcare access with secure telemedicine platforms that support online consultations, digital prescriptions, and remote patient communication for better care delivery."
                },
                {
                    icon: "Users",
                    title: "Patient Portal Development",
                    description: "Empower patients with self-service portals that allow them to schedule appointments, access medical records, view reports, and communicate with healthcare professionals."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits Of Healthcare Software Solutions",
            desc: "Improve care delivery and healthcare operations with intelligent digital solutions that enhance patient engagement and streamline clinical workflows. Our healthcare solutions deliver measurable improvements across your organization.",
            visualIcon: "Rocket",
            items: [
                {
                    icon: "HeartHandshake",
                    title: "Better Patient Experience",
                    description: "Improve patient engagement through personalized communication, easy appointment scheduling, and seamless access to healthcare services across all touchpoints."
                },
                {
                    icon: "Workflow",
                    title: "Workflow Automation",
                    description: "Reduce manual administrative tasks, automate billing processes, and streamline healthcare workflows to improve operational efficiency and staff productivity."
                },
                {
                    icon: "ShieldCheck",
                    title: "Secure & Compliant Systems",
                    description: "Protect sensitive patient data with enterprise-grade security, role-based access controls, and compliance with healthcare regulations including HIPAA standards."
                },
                {
                    icon: "TrendingUp",
                    title: "Operational Efficiency",
                    description: "Optimize resource utilization, reduce wait times, and improve staff productivity with integrated healthcare management solutions that streamline daily operations."
                }
            ],
            buttonLabel: "Talk To Healthcare Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our Healthcare Implementation Process",
            subtitle: "Structured delivery approach for successful healthcare digital transformation with 5 comprehensive phases",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Business Discovery & Assessment",
                    description: "We thoroughly understand your organization, existing systems, workflows, compliance requirements, and digital transformation goals to build a solid foundation for success."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Planning & Architecture Design",
                    description: "Our consultants design a customized Microsoft healthcare solution tailored to your operational requirements and clinical workflows, ensuring seamless integration with existing systems."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Development & Configuration",
                    description: "We develop and configure the healthcare solution with a focus on security, scalability, and user experience, following industry best practices and compliance standards."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes rigorous testing to validate security, workflow accuracy, data integrity, and system performance before deployment to ensure reliability."
                },
                {
                    step: 5,
                    icon: "Rocket",
                    title: "Implementation & Optimization",
                    description: "We configure, deploy, and optimize healthcare solutions while ensuring minimal disruption to patient care and providing ongoing support for long-term success."
                }
            ]
        },
        technologies: {
            tag: "Healthcare Technology",
            title: "Modern Healthcare Technologies",
            subtitle: "Future-ready healthcare platforms built on secure, scalable, and intelligent Microsoft technologies that enable better patient care and operational excellence.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Cloud-based healthcare systems for scalability and accessibility"
                },
                {
                    icon: "Shield",
                    label: "Security & Compliance",
                    desc: "Advanced data protection with HIPAA and regulatory compliance"
                },
                {
                    icon: "Smartphone",
                    label: "Mobile Healthcare Apps",
                    desc: "Mobile experiences for patients, doctors, and healthcare staff"
                },
                {
                    icon: "Database",
                    label: "EHR Integration",
                    desc: "Seamless integration with existing Electronic Health Record systems"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "Healthcare Case Studies",
            subtitle: "Real digital transformation success stories from healthcare organizations we've helped modernize their operations.",
            items: [
                {
                    tag: "Hospital",
                    title: "Hospital Management System Modernization",
                    description: "A multi-specialty hospital implemented a centralized Hospital Management System integrated with Microsoft Dynamics 365, unifying patient registration, appointment scheduling, billing, laboratory, pharmacy, and inventory management. The solution improved operational efficiency by 40% and significantly enhanced patient satisfaction through streamlined processes.",
                    stat: "40%",
                    statLabel: "Efficiency Increase"
                },
                {
                    tag: "Clinic",
                    title: "Digital Patient Portal Implementation",
                    description: "A healthcare provider developed a secure patient portal enabling online appointment booking, access to medical records, prescription requests, and automated appointment reminders, resulting in 60% higher patient engagement and reduced administrative workload.",
                    stat: "60%",
                    statLabel: "Patient Engagement"
                },
                {
                    tag: "Healthcare",
                    title: "Healthcare CRM Transformation",
                    description: "A growing healthcare organization implemented Microsoft Dynamics 365 CRM to centralize patient communications, referrals, follow-ups, and care coordination across departments, improving patient satisfaction by 35%.",
                    stat: "35%",
                    statLabel: "Satisfaction Improvement"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What healthcare software development services do you offer?",
                    answer: "We provide custom healthcare software development, Hospital Management Systems (HMS), Electronic Health Record (EHR) solutions, Electronic Medical Record (EMR) systems, patient portals, telemedicine platforms, healthcare mobile applications, CRM solutions, and Microsoft Dynamics 365 implementation services to help healthcare organizations modernize their operations."
                },
                {
                    question: "Can you customize healthcare software according to our organization's requirements?",
                    answer: "Yes. We develop fully customized healthcare software solutions based on your workflows, operational goals, compliance requirements, and patient care objectives. Every solution is tailored to meet your specific organizational needs and challenges."
                },
                {
                    question: "Is your healthcare software secure and compliant?",
                    answer: "Absolutely. Our solutions follow industry best practices with role-based access control, encryption, secure cloud infrastructure, and compliance-ready architecture to protect sensitive healthcare information and ensure regulatory compliance."
                },
                {
                    question: "Can your healthcare software integrate with our existing systems?",
                    answer: "Yes. We integrate our solutions with EHR/EMR platforms, laboratory management systems, pharmacy software, billing systems, Microsoft Dynamics 365, Microsoft 365, and other third-party healthcare applications for seamless data flow."
                },
                {
                    question: "Do you provide implementation, training, and post-launch support?",
                    answer: "Yes. Our services include implementation, data migration, user training, system optimization, software updates, and ongoing technical support to ensure long-term success and maximum return on your technology investment."
                }
            ]
        },
        cta: {
            title: "Ready To Transform Healthcare Operations?",
            description: "Build secure, intelligent, and future-ready healthcare software solutions with our experts. Improve patient care, streamline operations, and support sustainable growth with our comprehensive healthcare technology services.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Book Consultation"
        },
        isPublished: true,
        order: 1
    },

    // ============================================================
    // 2. Legal - Microsoft Solutions for Legal Firms
    // ============================================================
    {
        title: "Microsoft Solutions for Legal Firms",
        slug: "legal",
        urlPath: "/industries/legal",
        badge: "Legal",
        breadcrumb: ["Home", "Industries", "Microsoft Solutions for Legal Firms"],
        hero: {
            description: "Modernize Legal Operations with Microsoft Solutions",
            subDescription: "Empower your legal practice with intelligent Microsoft solutions that streamline case management, document handling, client relationship management, and financial operations. From matter management to billing automation, our solutions help law firms improve efficiency and client service while maintaining the highest standards of security and compliance in the legal industry.",
            heroBadges: ["Legal Technology", "Microsoft Dynamics 365", "Case Management", "Document Automation"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#4A90D9",
            accentDark: "#2E6BB5",
            accentLight: "#7BB3E6",
            accentSoft: "rgba(74,144,217,0.08)",
            heroStart: "#1A1A2E",
            heroEnd: "#16213E",
            accentRgb: "74, 144, 217"
        },
        overview: {
            tag: "Legal Solutions",
            title: "Microsoft Solutions for Modern Law Firms",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "Law firms face increasing pressure to deliver efficient legal services while managing complex cases, documents, and client relationships. Disconnected systems often lead to inefficiencies, missed deadlines, and reduced client satisfaction. The legal industry is undergoing significant digital transformation, with firms embracing technology to gain competitive advantage and improve service delivery.",
                "At JJC Systems, we help legal practices transform their operations with Microsoft Dynamics 365 and Microsoft 365 solutions that centralize case management, automate document workflows, and provide complete visibility into legal operations. Our solutions are designed to address the unique challenges of the legal profession, including client confidentiality, regulatory compliance, and the need for secure collaboration.",
                "Our tailored solutions enable law firms to improve case handling, enhance client communication, streamline billing processes, and maintain compliance while focusing on delivering exceptional legal services. We understand that every law firm is unique, and we work closely with you to implement solutions that align with your practice areas and business goals."
            ],
            checklist: ["Case & Matter Management", "Document Automation", "Client Relationship Management", "Time & Billing", "Legal Compliance", "Secure Collaboration"]
        },
        solutions: {
            tag: "Our Legal Solutions",
            title: "Microsoft Solutions for Legal Firms",
            subtitle: "Comprehensive legal technology solutions built on Microsoft platforms that help law firms improve efficiency, client service, and profitability.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Scale",
                    title: "Case & Matter Management",
                    description: "Manage cases, matters, clients, opposing counsel, court dates, and legal documents from a centralized Microsoft Dynamics 365 platform with complete visibility and control."
                },
                {
                    icon: "FileText",
                    title: "Document Management & Automation",
                    description: "Automate document generation, contract management, legal templates, version control, and secure document sharing with Microsoft 365 and SharePoint for efficient legal workflows."
                },
                {
                    icon: "Users",
                    title: "Client Relationship Management",
                    description: "Build stronger client relationships by managing client communications, case updates, follow-ups, and service requests through an integrated CRM solution tailored for legal practices."
                },
                {
                    icon: "Clock",
                    title: "Time & Expense Tracking",
                    description: "Accurately track billable hours, expenses, and activities with automated time entry, approval workflows, and seamless integration with billing systems for accurate invoicing."
                },
                {
                    icon: "Receipt",
                    title: "Legal Billing & Invoicing",
                    description: "Generate accurate invoices from approved time and expenses, manage trust accounting, track payments, and improve cash flow with automated billing solutions for law firms."
                },
                {
                    icon: "Building2",
                    title: "Practice Management",
                    description: "Centralize practice operations including calendar management, task assignment, deadline tracking, and team collaboration using Microsoft Dynamics 365 for comprehensive practice management."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits of Microsoft Solutions for Legal Firms",
            desc: "Transform your legal practice with intelligent solutions that improve efficiency, client service, and profitability while ensuring the highest standards of security and compliance.",
            visualIcon: "Gavel",
            items: [
                {
                    icon: "FolderOpen",
                    title: "Centralized Case Management",
                    description: "Access all case information, documents, communications, and deadlines from a single platform for faster decision-making and improved case handling efficiency."
                },
                {
                    icon: "Rocket",
                    title: "Improved Efficiency",
                    description: "Automate repetitive tasks, document generation, and administrative workflows to focus more on legal work and billable activities that drive revenue."
                },
                {
                    icon: "ShieldCheck",
                    title: "Enhanced Security & Compliance",
                    description: "Protect sensitive client data with enterprise-grade security, access controls, and compliance with legal industry regulations including data protection standards."
                }
            ],
            buttonLabel: "Talk to Legal Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our Legal Implementation Process",
            subtitle: "A structured approach to legal technology transformation with 6 comprehensive phases for successful adoption",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Practice Assessment",
                    description: "We evaluate your legal workflows, case management processes, document systems, and practice management requirements to understand your unique needs."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Design",
                    description: "Our consultants design a customized Microsoft solution aligned with your legal practice's unique needs, practice areas, and strategic goals."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Configuration & Customization",
                    description: "We configure and customize the solution to match your specific legal workflows, document templates, and practice management requirements."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes comprehensive testing to validate security, workflow accuracy, data integrity, and system performance before deployment."
                },
                {
                    step: 5,
                    icon: "Users",
                    title: "User Training & Adoption",
                    description: "We provide comprehensive training for attorneys, paralegals, and support staff to ensure successful adoption of the new technology."
                },
                {
                    step: 6,
                    icon: "Rocket",
                    title: "Deployment & Ongoing Support",
                    description: "We implement and configure solutions, migrate data, and provide ongoing support to ensure long-term success and continuous improvement."
                }
            ]
        },
        technologies: {
            tag: "Legal Technology",
            title: "Modern Legal Technologies",
            subtitle: "Future-ready legal platforms built on secure Microsoft technologies that enable law firms to operate more efficiently and securely.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Cloud-based legal practice management for flexibility"
                },
                {
                    icon: "Shield",
                    label: "Data Security",
                    desc: "Advanced protection for sensitive legal data"
                },
                {
                    icon: "FileText",
                    label: "Document Management",
                    desc: "Intelligent document handling and automation"
                },
                {
                    icon: "Smartphone",
                    label: "Mobile Access",
                    desc: "Access case information from anywhere"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "Legal Industry Case Studies",
            subtitle: "Real transformations from law firms and legal departments we've helped modernize their practice management.",
            items: [
                {
                    tag: "Law Firm",
                    title: "Case Management Modernization",
                    description: "A mid-sized law firm implemented Microsoft Dynamics 365 to centralize case management, automate document workflows, and improve client communication, resulting in 45% improvement in operational efficiency.",
                    stat: "45%",
                    statLabel: "Efficiency Improvement"
                },
                {
                    tag: "Legal",
                    title: "Billing & Time Tracking Automation",
                    description: "A legal practice automated time tracking and billing processes, reducing administrative overhead and improving billing accuracy while increasing revenue by 30%.",
                    stat: "30%",
                    statLabel: "Revenue Increase"
                },
                {
                    tag: "Legal",
                    title: "Secure Collaboration Platform",
                    description: "A legal department deployed Microsoft 365 and Teams for secure internal collaboration, document sharing, and client communication, improving collaboration by 50%.",
                    stat: "50%",
                    statLabel: "Collaboration Improvement"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What Microsoft solutions do you offer for law firms?",
                    answer: "We implement Microsoft Dynamics 365, Microsoft 365, Power BI, Power Automate, and SharePoint to help law firms manage cases, documents, clients, billing, and practice operations with integrated technology solutions."
                },
                {
                    question: "Can Microsoft Dynamics 365 manage legal cases and matters?",
                    answer: "Yes. Dynamics 365 provides comprehensive case and matter management with tracking, document management, deadlines, and client communication from one integrated platform."
                },
                {
                    question: "How do you ensure data security for legal practices?",
                    answer: "We implement enterprise-grade security with role-based access, data encryption, secure cloud infrastructure, and compliance with legal industry regulations including client confidentiality requirements."
                },
                {
                    question: "Can your solutions integrate with existing legal software?",
                    answer: "Yes. We integrate with legal practice management systems, document management platforms, accounting software, and other third-party legal applications for seamless workflows."
                },
                {
                    question: "Do you provide training for legal professionals?",
                    answer: "Yes. We provide comprehensive training for attorneys, paralegals, and support staff to ensure successful adoption of Microsoft solutions across your legal practice."
                }
            ]
        },
        cta: {
            title: "Ready to Modernize Your Legal Practice?",
            description: "Empower your law firm with intelligent Microsoft solutions that improve case management, automate document workflows, and enhance client service while ensuring security and compliance.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Talk to Our Legal Experts"
        },
        isPublished: true,
        order: 2
    },

    // ============================================================
    // 3. Professional Services & Rental
    // ============================================================
    {
        title: "Microsoft Solutions for Professional Services & Rental",
        slug: "professional-services-rental",
        urlPath: "/industries/professional-services-rental",
        badge: "Professional Services",
        breadcrumb: ["Home", "Industries", "Microsoft Solutions for Professional Services & Rental"],
        hero: {
            description: "Streamline Professional Services & Rental Operations with Microsoft Solutions",
            subDescription: "Transform your professional services or rental business with intelligent Microsoft solutions that optimize project management, resource utilization, equipment tracking, and financial operations. From consulting firms to equipment rental companies, our solutions drive efficiency and growth while helping you deliver exceptional service to your clients.",
            heroBadges: ["Professional Services", "Rental Management", "Microsoft Dynamics 365", "Project Management"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#7B61FF",
            accentDark: "#5E4BCC",
            accentLight: "#A99BFF",
            accentSoft: "rgba(123,97,255,0.08)",
            heroStart: "#1A0E2E",
            heroEnd: "#2D1B69",
            accentRgb: "123, 97, 255"
        },
        overview: {
            tag: "Professional Services & Rental",
            title: "Microsoft Solutions for Professional Services & Rental Businesses",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "Professional services firms and rental businesses face unique challenges in managing projects, resources, equipment, and client relationships. Disconnected systems often lead to inefficiencies, poor resource utilization, and lost revenue opportunities. The professional services landscape is increasingly competitive, requiring firms to optimize operations and deliver exceptional client experiences.",
                "At JJC Systems, we help professional services and rental organizations leverage Microsoft Dynamics 365 and Power Platform to unify operations, automate workflows, and gain real-time visibility into business performance. Our solutions are designed to address the specific needs of project-based businesses and rental operations, helping you maximize profitability and growth.",
                "From project tracking and resource management to equipment inventory and rental scheduling, our solutions help you deliver exceptional service while maximizing profitability. We understand the importance of accurate resource allocation, timely project delivery, and efficient equipment management, and we build solutions that support these critical business functions."
            ],
            checklist: ["Project Management", "Resource Optimization", "Rental Equipment Tracking", "Time & Expense Management", "Financial Operations", "Client Relationship Management"]
        },
        solutions: {
            tag: "Our Solutions",
            title: "Microsoft Solutions for Professional Services & Rental",
            subtitle: "Comprehensive solutions for project-based and rental businesses that optimize operations, improve resource utilization, and drive growth.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Briefcase",
                    title: "Project & Service Management",
                    description: "Manage projects from planning to delivery with task tracking, milestone monitoring, budgeting, and team collaboration using Microsoft Dynamics 365."
                },
                {
                    icon: "Users",
                    title: "Resource Management",
                    description: "Optimize resource allocation by matching the right people to the right projects based on skills, availability, and capacity for maximum utilization."
                },
                {
                    icon: "Truck",
                    title: "Rental Equipment Management",
                    description: "Track equipment inventory, availability, maintenance schedules, rental agreements, and returns with integrated rental management solutions."
                },
                {
                    icon: "Clock",
                    title: "Time & Expense Tracking",
                    description: "Capture billable hours, expenses, and operational costs with automated approvals and seamless integration with project billing for accurate invoicing."
                },
                {
                    icon: "Receipt",
                    title: "Invoicing & Financial Management",
                    description: "Generate accurate invoices from approved time and expenses, manage rental billing, track payments, and improve cash flow with integrated financial management."
                },
                {
                    icon: "Building2",
                    title: "Client Relationship Management",
                    description: "Build stronger client relationships with integrated CRM that manages communications, service requests, and client history for personalized service."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits for Professional Services & Rental Businesses",
            desc: "Improve operational efficiency, resource utilization, and profitability with intelligent Microsoft solutions designed for project-based and rental operations.",
            visualIcon: "BarChart3",
            items: [
                {
                    icon: "Target",
                    title: "Better Project Delivery",
                    description: "Deliver projects on time and within budget with complete visibility into project status, resources, and financials for improved client satisfaction."
                },
                {
                    icon: "Users",
                    title: "Optimized Resource Utilization",
                    description: "Maximize billable utilization and reduce scheduling conflicts with intelligent resource planning and allocation based on skills and availability."
                },
                {
                    icon: "TrendingUp",
                    title: "Increased Profitability",
                    description: "Improve financial performance with accurate costing, efficient billing, and data-driven business decisions that maximize profitability."
                }
            ],
            buttonLabel: "Talk to Our Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our Implementation Process",
            subtitle: "A proven approach for professional services and rental businesses with 6 comprehensive phases for successful transformation",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Business Discovery",
                    description: "We evaluate your existing processes, project workflows, resource management, and operational challenges to understand your unique business needs."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Planning",
                    description: "Our consultants design a customized Microsoft solution aligned with your business objectives, operational requirements, and growth plans."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Configuration & Customization",
                    description: "We configure and customize the solution to match your specific business workflows, project management processes, and rental operations."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes comprehensive testing to validate performance, data accuracy, and operational readiness before deployment."
                },
                {
                    step: 5,
                    icon: "Users",
                    title: "User Training & Change Management",
                    description: "We provide comprehensive user training, change management support, and resources to ensure successful adoption across your organization."
                },
                {
                    step: 6,
                    icon: "Rocket",
                    title: "Deployment & Ongoing Support",
                    description: "We implement, configure, train, and provide ongoing support for your Microsoft solutions to ensure long-term success."
                }
            ]
        },
        technologies: {
            tag: "Technology",
            title: "Modern Technologies for Professional Services",
            subtitle: "Future-ready platforms built on Microsoft technologies that enable professional services and rental businesses to operate more efficiently.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Scalable cloud-based business operations"
                },
                {
                    icon: "Shield",
                    label: "Data Security",
                    desc: "Enterprise-grade data protection"
                },
                {
                    icon: "Smartphone",
                    label: "Mobile Access",
                    desc: "Access business data from anywhere"
                },
                {
                    icon: "Database",
                    label: "Integration",
                    desc: "Seamless third-party system integration"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "Professional Services & Rental Success Stories",
            subtitle: "Real transformations from services and rental businesses we've helped optimize their operations and drive growth.",
            items: [
                {
                    tag: "Consulting",
                    title: "Project Operations Transformation",
                    description: "A consulting firm implemented Microsoft Dynamics 365 Project Operations to centralize project planning, resource allocation, and tracking, increasing utilization by 35%.",
                    stat: "35%",
                    statLabel: "Utilization Increase"
                },
                {
                    tag: "Rental",
                    title: "Equipment Rental Management",
                    description: "A rental company deployed Microsoft solutions to track equipment inventory, maintenance, and rental agreements, achieving 25% revenue growth.",
                    stat: "25%",
                    statLabel: "Revenue Growth"
                },
                {
                    tag: "Services",
                    title: "Time & Expense Automation",
                    description: "A professional services company automated time tracking, expense approvals, and invoicing, achieving 40% productivity gain and reducing administrative overhead.",
                    stat: "40%",
                    statLabel: "Productivity Gain"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What solutions do you offer for professional services firms?",
                    answer: "We implement Microsoft Dynamics 365, Power BI, Power Automate, and Microsoft 365 for project management, resource management, CRM, invoicing, and business operations."
                },
                {
                    question: "How do you help rental businesses manage equipment?",
                    answer: "Our solutions provide real-time equipment tracking, maintenance scheduling, rental agreements, availability management, and automated rental billing for efficient operations."
                },
                {
                    question: "Can your solutions integrate with existing systems?",
                    answer: "Yes. We integrate with ERP systems, accounting software, CRM platforms, and other third-party business applications for seamless data flow and operations."
                },
                {
                    question: "Do you provide training and support?",
                    answer: "Yes. We provide comprehensive user training, change management support, and ongoing technical support to ensure successful adoption and long-term success."
                }
            ]
        },
        cta: {
            title: "Ready to Transform Your Professional Services or Rental Business?",
            description: "Empower your organization with intelligent Microsoft solutions that optimize operations, improve resource utilization, and drive growth for your professional services or rental business.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Talk to Our Experts"
        },
        isPublished: true,
        order: 3
    },

    // ============================================================
    // 4. Financial Services
    // ============================================================
    {
        title: "Microsoft Solutions for Financial Services",
        slug: "financial-services",
        urlPath: "/industries/financial-services",
        badge: "Financial Services",
        breadcrumb: ["Home", "Industries", "Microsoft Solutions for Financial Services"],
        hero: {
            description: "Transform Financial Services with Microsoft Solutions",
            subDescription: "Empower your financial services organization with intelligent Microsoft solutions that streamline operations, enhance client relationships, and ensure regulatory compliance. From wealth management to accounting firms, our solutions drive efficiency and trust while helping you navigate complex financial regulations and market dynamics.",
            heroBadges: ["Financial Services", "Microsoft Dynamics 365", "Regulatory Compliance", "Client Management"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#0EA5E9",
            accentDark: "#0284C7",
            accentLight: "#38BDF8",
            accentSoft: "rgba(14,165,233,0.08)",
            heroStart: "#0F172A",
            heroEnd: "#1E3A5F",
            accentRgb: "14, 165, 233"
        },
        overview: {
            tag: "Financial Services",
            title: "Microsoft Solutions for Modern Financial Services",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "Financial services organizations operate in a complex environment of regulatory requirements, client expectations, and market dynamics. Disconnected systems and manual processes often create inefficiencies and compliance risks. The financial services industry is undergoing significant digital transformation, with firms leveraging technology to improve client service and operational efficiency.",
                "At JJC Systems, we help financial services firms leverage Microsoft Dynamics 365 and Power Platform to unify operations, automate workflows, and provide a 360-degree view of client relationships. Our solutions are designed to address the unique challenges of the financial services industry, including data security, regulatory compliance, and the need for real-time insights.",
                "Our solutions enable wealth managers, accounting firms, and financial institutions to improve client service, ensure regulatory compliance, and make data-driven decisions. We understand the importance of building trust and delivering value to clients, and we build solutions that support these critical business objectives."
            ],
            checklist: ["Client Relationship Management", "Financial Planning", "Regulatory Compliance", "Portfolio Management", "Accounting & Reporting", "Secure Operations"]
        },
        solutions: {
            tag: "Our Financial Solutions",
            title: "Microsoft Solutions for Financial Services",
            subtitle: "Intelligent solutions for financial operations, client management, and compliance that help organizations build trust and drive growth.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Users",
                    title: "Client Relationship Management",
                    description: "Build stronger client relationships with integrated CRM that manages communications, financial planning, and service delivery for personalized service."
                },
                {
                    icon: "PieChart",
                    title: "Financial Planning & Analysis",
                    description: "Improve financial planning with integrated budgeting, forecasting, and reporting tools that provide real-time financial insights for better decisions."
                },
                {
                    icon: "ShieldCheck",
                    title: "Regulatory Compliance",
                    description: "Maintain compliance with automated workflows, audit trails, document management, and reporting capabilities aligned with regulatory requirements."
                },
                {
                    icon: "Briefcase",
                    title: "Wealth & Portfolio Management",
                    description: "Manage client portfolios, investment strategies, and financial plans with comprehensive tracking and reporting for informed decision-making."
                },
                {
                    icon: "Receipt",
                    title: "Accounting & Billing",
                    description: "Automate accounting processes, billing, invoicing, and financial reporting with integrated Microsoft solutions for accurate financial management."
                },
                {
                    icon: "Building2",
                    title: "Risk Management",
                    description: "Identify, assess, and mitigate risks with intelligent risk management tools and real-time monitoring for proactive risk management."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits of Microsoft Solutions for Financial Services",
            desc: "Improve client service, ensure compliance, and drive growth with intelligent financial solutions designed for the modern financial services industry.",
            visualIcon: "TrendingUp",
            items: [
                {
                    icon: "Users",
                    title: "Enhanced Client Experience",
                    description: "Deliver personalized client service with a 360-degree view of client relationships and financial information for better engagement."
                },
                {
                    icon: "ShieldCheck",
                    title: "Regulatory Compliance",
                    description: "Stay compliant with automated workflows, comprehensive audit trails, and secure document management for regulatory reporting."
                },
                {
                    icon: "TrendingUp",
                    title: "Operational Efficiency",
                    description: "Automate manual processes, reduce administrative overhead, and improve productivity across your organization for better performance."
                }
            ],
            buttonLabel: "Talk to Financial Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our Financial Services Implementation Process",
            subtitle: "A structured approach for financial services transformation with 6 comprehensive phases for successful adoption",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Business Assessment",
                    description: "We evaluate your financial operations, client management processes, compliance requirements, and growth objectives to understand your needs."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Design",
                    description: "Our consultants design a customized Microsoft solution aligned with your financial services business model and strategic goals."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Configuration & Customization",
                    description: "We configure and customize the solution to match your specific financial workflows, compliance requirements, and operational needs."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes rigorous testing to validate security, data integrity, and operational readiness before deployment."
                },
                {
                    step: 5,
                    icon: "Users",
                    title: "User Training & Change Management",
                    description: "We provide comprehensive training for financial professionals and support staff to ensure successful adoption and change management."
                },
                {
                    step: 6,
                    icon: "Rocket",
                    title: "Implementation & Ongoing Support",
                    description: "We deploy, configure, train, and provide ongoing support for your Microsoft solutions to ensure long-term success."
                }
            ]
        },
        technologies: {
            tag: "Financial Technology",
            title: "Modern Financial Technologies",
            subtitle: "Secure and compliant platforms built on Microsoft technologies that enable financial organizations to operate more efficiently and securely.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Scalable cloud-based financial operations"
                },
                {
                    icon: "Shield",
                    label: "Security & Compliance",
                    desc: "Enterprise-grade security and regulatory compliance"
                },
                {
                    icon: "Database",
                    label: "Data Integration",
                    desc: "Seamless integration with financial systems"
                },
                {
                    icon: "Smartphone",
                    label: "Mobile Access",
                    desc: "Access financial data from anywhere"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "Financial Services Case Studies",
            subtitle: "Real transformations from financial services organizations we've helped modernize their operations and client service.",
            items: [
                {
                    tag: "Wealth Management",
                    title: "Client Management Transformation",
                    description: "A wealth management firm implemented Microsoft Dynamics 365 to centralize client information, automate communications, and improve service delivery, increasing client engagement by 50%.",
                    stat: "50%",
                    statLabel: "Client Engagement Increase"
                },
                {
                    tag: "Accounting",
                    title: "Financial Automation",
                    description: "An accounting firm automated billing, invoicing, and financial reporting processes, achieving 35% productivity gain and improving accuracy.",
                    stat: "35%",
                    statLabel: "Productivity Gain"
                },
                {
                    tag: "Financial",
                    title: "Compliance Management",
                    description: "A financial institution deployed Microsoft solutions to automate compliance workflows, maintain audit trails, and ensure regulatory reporting, improving compliance efficiency by 60%.",
                    stat: "60%",
                    statLabel: "Compliance Efficiency"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What Microsoft solutions do you offer for financial services?",
                    answer: "We implement Microsoft Dynamics 365, Power BI, Power Automate, and Microsoft 365 for client management, financial planning, compliance, accounting, and operations."
                },
                {
                    question: "How do you ensure regulatory compliance?",
                    answer: "We implement automated compliance workflows, comprehensive audit trails, secure document management, and reporting capabilities aligned with regulatory requirements."
                },
                {
                    question: "Can your solutions integrate with existing financial systems?",
                    answer: "Yes. We integrate with accounting software, banking systems, investment platforms, and other third-party financial applications for seamless operations."
                },
                {
                    question: "Do you provide training for financial professionals?",
                    answer: "Yes. We provide comprehensive training for advisors, accountants, and support staff to ensure successful adoption and change management."
                }
            ]
        },
        cta: {
            title: "Ready to Transform Your Financial Services Organization?",
            description: "Empower your financial services firm with intelligent Microsoft solutions that improve client service, ensure compliance, and drive growth in today's competitive market.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Talk to Our Financial Experts"
        },
        isPublished: true,
        order: 4
    },

    // ============================================================
    // 5. Manufacturing
    // ============================================================
    {
        title: "Microsoft Solutions for Manufacturing Workflows",
        slug: "manufacturing",
        urlPath: "/industries/manufacturing",
        badge: "Manufacturing",
        breadcrumb: ["Home", "Industries", "Microsoft Solutions for Manufacturing Workflows"],
        hero: {
            description: "Optimize Production, Inventory & Operations with Microsoft Solutions",
            subDescription: "Transform your manufacturing operations with intelligent Microsoft solutions that streamline production planning, inventory management, procurement, and operational reporting. From production scheduling to warehouse management, our solutions drive efficiency and quality while helping you reduce costs and improve profitability.",
            heroBadges: ["Manufacturing", "Microsoft Dynamics 365", "Production Optimization", "Inventory Management"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#F97316",
            accentDark: "#EA580C",
            accentLight: "#FB923C",
            accentSoft: "rgba(249,115,22,0.08)",
            heroStart: "#1A0E0A",
            heroEnd: "#3B1E0A",
            accentRgb: "249, 115, 22"
        },
        overview: {
            tag: "Manufacturing Solutions",
            title: "Microsoft Solutions for Modern Manufacturing",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "Manufacturing businesses need connected systems to maintain production efficiency, control inventory, and improve operational visibility. Disconnected systems often lead to production delays, inventory inaccuracies, and reduced profitability. The manufacturing industry is facing increasing pressure to optimize operations, reduce costs, and improve quality while meeting growing customer demands.",
                "At JJC Systems, we help manufacturers modernize their operations with Microsoft Dynamics 365, Power Platform, and intelligent business solutions that streamline every stage of the manufacturing lifecycle. Our solutions are designed to address the unique challenges of the manufacturing industry, including supply chain complexity, production planning, and quality management.",
                "From production planning and inventory management to procurement, quality checks, and operational reporting, our solutions integrate your entire manufacturing process into one centralized platform. We understand the importance of real-time visibility and data-driven decision-making in manufacturing, and we build solutions that support these critical business functions."
            ],
            checklist: ["Production Planning", "Inventory Management", "Procurement Automation", "Quality Control", "Financial Integration", "Operational Reporting"]
        },
        solutions: {
            tag: "Our Manufacturing Solutions",
            title: "Microsoft Solutions for Manufacturing Workflows",
            subtitle: "Comprehensive solutions for production, inventory, procurement, and operations that help manufacturers improve efficiency and profitability.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Factory",
                    title: "Production Planning & Management",
                    description: "Plan, schedule, and monitor production activities with real-time visibility to optimize schedules and reduce downtime for better efficiency."
                },
                {
                    icon: "Package",
                    title: "Inventory Management",
                    description: "Maintain accurate inventory levels across warehouses and production facilities with real-time tracking and automated replenishment."
                },
                {
                    icon: "Truck",
                    title: "Procurement & Vendor Management",
                    description: "Simplify procurement processes with supplier management, purchase orders, approvals, and automated replenishment for cost efficiency."
                },
                {
                    icon: "CheckSquare",
                    title: "Quality Control & Inspection",
                    description: "Maintain consistent product quality through automated inspections, compliance tracking, and corrective action workflows for quality assurance."
                },
                {
                    icon: "Building2",
                    title: "Warehouse Management",
                    description: "Optimize warehouse operations with inventory tracking, barcode scanning, picking, packing, and shipment management for efficiency."
                },
                {
                    icon: "PieChart",
                    title: "Operational Reporting & Analytics",
                    description: "Monitor production performance, inventory levels, and operational KPIs through interactive Power BI dashboards for data-driven decisions."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits of Microsoft Solutions for Manufacturing",
            desc: "Improve production efficiency, inventory accuracy, and operational performance with intelligent manufacturing solutions designed for modern production environments.",
            visualIcon: "Gauge",
            items: [
                {
                    icon: "Factory",
                    title: "Improved Production Efficiency",
                    description: "Optimize production planning, reduce downtime, and ensure timely order fulfillment with real-time visibility and intelligent scheduling."
                },
                {
                    icon: "Package",
                    title: "Inventory Optimization",
                    description: "Maintain accurate inventory levels, reduce shortages and excess inventory with real-time tracking and demand forecasting."
                },
                {
                    icon: "TrendingUp",
                    title: "Reduced Operational Costs",
                    description: "Automate manual processes, improve procurement efficiency, and optimize operations to reduce costs and improve profitability."
                }
            ],
            buttonLabel: "Talk to Manufacturing Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our Manufacturing Implementation Process",
            subtitle: "A structured approach for manufacturing digital transformation with 6 comprehensive phases for successful adoption",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Business Assessment",
                    description: "We evaluate your manufacturing processes, production workflows, inventory management, and operational requirements to understand your needs."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Design",
                    description: "Our consultants design a customized Microsoft solution tailored to your manufacturing environment and strategic goals."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Configuration & Customization",
                    description: "We configure and customize the solution to match your specific production workflows, inventory processes, and operational requirements."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes comprehensive testing to validate performance, data accuracy, and operational readiness before deployment."
                },
                {
                    step: 5,
                    icon: "Users",
                    title: "User Training & Change Management",
                    description: "We provide comprehensive training for production managers, warehouse staff, and support teams to ensure successful adoption."
                },
                {
                    step: 6,
                    icon: "Rocket",
                    title: "Implementation & Ongoing Support",
                    description: "We deploy, configure, train, and provide ongoing support for your manufacturing solutions to ensure long-term success."
                }
            ]
        },
        technologies: {
            tag: "Manufacturing Technology",
            title: "Modern Manufacturing Technologies",
            subtitle: "Future-ready platforms built on Microsoft technologies that enable manufacturers to operate more efficiently and intelligently.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Scalable cloud-based manufacturing operations"
                },
                {
                    icon: "Shield",
                    label: "Data Security",
                    desc: "Enterprise-grade data protection"
                },
                {
                    icon: "Database",
                    label: "ERP Integration",
                    desc: "Seamless integration with manufacturing systems"
                },
                {
                    icon: "BarChart3",
                    label: "Business Intelligence",
                    desc: "Real-time operational insights"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "Manufacturing Case Studies",
            subtitle: "Real transformations from manufacturing organizations we've helped modernize their operations and improve efficiency.",
            items: [
                {
                    tag: "Manufacturing",
                    title: "Production Planning Transformation",
                    description: "A manufacturing company implemented Microsoft Dynamics 365 for production planning and shop floor management, achieving 30% improvement in production efficiency.",
                    stat: "30%",
                    statLabel: "Production Efficiency"
                },
                {
                    tag: "Manufacturing",
                    title: "Inventory & Warehouse Optimization",
                    description: "A manufacturer centralized inventory and warehouse management, achieving 25% improvement in inventory accuracy and reduced stockouts.",
                    stat: "25%",
                    statLabel: "Inventory Accuracy"
                },
                {
                    tag: "Manufacturing",
                    title: "Procurement & Financial Automation",
                    description: "A manufacturing business automated procurement and finance processes, achieving 40% improvement in process efficiency and better collaboration.",
                    stat: "40%",
                    statLabel: "Process Efficiency"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What Microsoft solutions do you offer for manufacturing companies?",
                    answer: "We implement Microsoft Dynamics 365, Power BI, Power Automate, and Microsoft 365 to streamline production, inventory, procurement, finance, and reporting."
                },
                {
                    question: "Can Microsoft Dynamics 365 improve production management?",
                    answer: "Yes. Dynamics 365 helps manufacturers plan production, manage work orders, optimize capacity, and improve on-time delivery with real-time visibility."
                },
                {
                    question: "How does Microsoft help with inventory management?",
                    answer: "Our solutions provide real-time inventory tracking, warehouse management, automated replenishment, and inventory forecasting to improve stock accuracy."
                },
                {
                    question: "Can your solution integrate with existing manufacturing systems?",
                    answer: "Yes. We integrate with ERP systems, MES, warehouse systems, and other manufacturing applications for seamless data flow and operations."
                }
            ]
        },
        cta: {
            title: "Ready to Modernize Your Manufacturing Business?",
            description: "Transform your manufacturing operations with intelligent Microsoft solutions that improve production planning, optimize inventory, and drive growth in today's competitive market.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Talk to Manufacturing Experts"
        },
        isPublished: true,
        order: 5
    },

    // ============================================================
    // 6. Retail & Distribution
    // ============================================================
    {
        title: "Microsoft Solutions for Retail & Distribution",
        slug: "retail-distribution",
        urlPath: "/industries/retail-distribution",
        badge: "Retail & Distribution",
        breadcrumb: ["Home", "Industries", "Microsoft Solutions for Retail & Distribution"],
        hero: {
            description: "Transform Retail & Distribution Operations with Microsoft Solutions",
            subDescription: "Empower your retail or distribution business with intelligent Microsoft solutions that optimize inventory management, supply chain operations, customer engagement, and financial performance. From omnichannel retail to wholesale distribution, our solutions drive growth and efficiency while helping you deliver exceptional customer experiences.",
            heroBadges: ["Retail", "Distribution", "Microsoft Dynamics 365", "Supply Chain"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#8B5CF6",
            accentDark: "#7C3AED",
            accentLight: "#A78BFA",
            accentSoft: "rgba(139,92,246,0.08)",
            heroStart: "#1A0E2E",
            heroEnd: "#3B1E5F",
            accentRgb: "139, 92, 246"
        },
        overview: {
            tag: "Retail & Distribution",
            title: "Microsoft Solutions for Modern Retail & Distribution",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "Retail and distribution businesses operate in a fast-paced environment where efficiency, accuracy, and customer satisfaction are paramount. Disconnected systems often lead to inventory issues, supply chain delays, and lost sales opportunities. The retail and distribution industry is undergoing significant transformation, with businesses leveraging technology to meet evolving customer expectations and optimize operations.",
                "At JJC Systems, we help retailers and distributors leverage Microsoft Dynamics 365 and Power Platform to unify operations, optimize supply chains, and deliver exceptional customer experiences. Our solutions are designed to address the unique challenges of the retail and distribution industry, including inventory management, omnichannel commerce, and customer engagement.",
                "Our solutions enable businesses to manage inventory, automate procurement, improve customer engagement, and gain real-time visibility across their entire operation. We understand the importance of delivering seamless customer experiences and optimizing supply chain efficiency, and we build solutions that support these critical business objectives."
            ],
            checklist: ["Inventory Management", "Supply Chain Optimization", "Customer Engagement", "Order Management", "Financial Operations", "Omnichannel Commerce"]
        },
        solutions: {
            tag: "Our Retail & Distribution Solutions",
            title: "Microsoft Solutions for Retail & Distribution",
            subtitle: "Comprehensive solutions for retail, wholesale, and distribution operations that help businesses optimize operations and deliver exceptional customer experiences.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Package",
                    title: "Inventory Management",
                    description: "Maintain accurate inventory across multiple locations with real-time tracking, automated replenishment, and demand forecasting for optimal stock levels."
                },
                {
                    icon: "Truck",
                    title: "Supply Chain Management",
                    description: "Optimize supply chain operations with supplier management, procurement automation, and logistics coordination for efficient operations."
                },
                {
                    icon: "Users",
                    title: "Customer Relationship Management",
                    description: "Build stronger customer relationships with integrated CRM that manages communications, preferences, and purchase history for personalized service."
                },
                {
                    icon: "ShoppingCart",
                    title: "Order Management",
                    description: "Streamline order processing from order capture to fulfillment with real-time order tracking and status updates for customer satisfaction."
                },
                {
                    icon: "Building2",
                    title: "Warehouse & Logistics",
                    description: "Optimize warehouse operations with efficient picking, packing, shipping, and returns management for operational efficiency."
                },
                {
                    icon: "PieChart",
                    title: "Business Intelligence & Reporting",
                    description: "Monitor sales performance, inventory levels, customer trends, and operational KPIs through interactive dashboards for data-driven decisions."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits of Microsoft Solutions for Retail & Distribution",
            desc: "Improve operational efficiency, customer satisfaction, and profitability with intelligent retail solutions designed for modern commerce operations.",
            visualIcon: "ShoppingBag",
            items: [
                {
                    icon: "Package",
                    title: "Inventory Optimization",
                    description: "Reduce stockouts and overstock with real-time inventory visibility and intelligent demand forecasting for optimal inventory levels."
                },
                {
                    icon: "Users",
                    title: "Enhanced Customer Experience",
                    description: "Deliver personalized customer experiences with a complete view of customer interactions and preferences for better engagement."
                },
                {
                    icon: "TrendingUp",
                    title: "Operational Efficiency",
                    description: "Streamline order processing, automate workflows, and improve supply chain visibility to reduce costs and improve profitability."
                }
            ],
            buttonLabel: "Talk to Retail Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our Retail & Distribution Implementation Process",
            subtitle: "A structured approach for retail and distribution transformation with 6 comprehensive phases for successful adoption",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Business Assessment",
                    description: "We evaluate your retail operations, supply chain processes, inventory management, and customer engagement strategies to understand your needs."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Design",
                    description: "Our consultants design a customized Microsoft solution aligned with your retail or distribution business model and strategic goals."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Configuration & Customization",
                    description: "We configure and customize the solution to match your specific retail workflows, inventory processes, and operational requirements."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes comprehensive testing to validate performance, data accuracy, and operational readiness before deployment."
                },
                {
                    step: 5,
                    icon: "Users",
                    title: "User Training & Change Management",
                    description: "We provide comprehensive training for retail staff, warehouse teams, and support staff to ensure successful adoption."
                },
                {
                    step: 6,
                    icon: "Rocket",
                    title: "Implementation & Ongoing Support",
                    description: "We deploy, configure, train, and provide ongoing support for your retail solutions to ensure long-term success."
                }
            ]
        },
        technologies: {
            tag: "Retail Technology",
            title: "Modern Retail & Distribution Technologies",
            subtitle: "Future-ready platforms built on Microsoft technologies that enable retail and distribution businesses to operate more efficiently.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Scalable cloud-based retail operations"
                },
                {
                    icon: "Smartphone",
                    label: "Mobile Commerce",
                    desc: "Mobile experiences for customers and staff"
                },
                {
                    icon: "Database",
                    label: "Omnichannel Integration",
                    desc: "Seamless integration across sales channels"
                },
                {
                    icon: "BarChart3",
                    label: "Business Intelligence",
                    desc: "Real-time operational insights"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "Retail & Distribution Case Studies",
            subtitle: "Real transformations from retail and distribution organizations we've helped modernize their operations and customer engagement.",
            items: [
                {
                    tag: "Retail",
                    title: "Inventory Management Transformation",
                    description: "A retail chain implemented Microsoft solutions for real-time inventory tracking, automated replenishment, and demand forecasting, achieving 35% improvement in inventory accuracy.",
                    stat: "35%",
                    statLabel: "Inventory Accuracy"
                },
                {
                    tag: "Distribution",
                    title: "Supply Chain Optimization",
                    description: "A distribution company optimized supply chain operations with integrated procurement, supplier management, and logistics coordination, achieving 25% cost reduction.",
                    stat: "25%",
                    statLabel: "Cost Reduction"
                },
                {
                    tag: "Retail",
                    title: "Customer Engagement Improvement",
                    description: "A retailer deployed Microsoft Dynamics 365 CRM to centralize customer data and deliver personalized experiences, achieving 40% improvement in customer satisfaction.",
                    stat: "40%",
                    statLabel: "Customer Satisfaction"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What Microsoft solutions do you offer for retail and distribution?",
                    answer: "We implement Microsoft Dynamics 365, Power BI, Power Automate, and Microsoft 365 for inventory management, supply chain, CRM, order management, and reporting."
                },
                {
                    question: "How does Microsoft help with inventory management?",
                    answer: "Our solutions provide real-time inventory tracking, demand forecasting, automated replenishment, and multi-location inventory visibility for optimal stock levels."
                },
                {
                    question: "Can your solutions integrate with existing retail systems?",
                    answer: "Yes. We integrate with POS systems, e-commerce platforms, ERP systems, and other retail applications for seamless operations and data flow."
                },
                {
                    question: "Do you provide training for retail staff?",
                    answer: "Yes. We provide comprehensive training for store managers, warehouse staff, and support teams to ensure successful adoption and change management."
                }
            ]
        },
        cta: {
            title: "Ready to Transform Your Retail or Distribution Business?",
            description: "Empower your organization with intelligent Microsoft solutions that optimize inventory, improve customer engagement, and drive growth in today's competitive market.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Talk to Our Retail Experts"
        },
        isPublished: true,
        order: 6
    },

    // ============================================================
    // 7. Nonprofits & Associations
    // ============================================================
    {
        title: "Microsoft Solutions for Nonprofit Operations",
        slug: "nonprofits-associations",
        urlPath: "/industries/nonprofits-associations",
        badge: "Nonprofits & Associations",
        breadcrumb: ["Home", "Industries", "Microsoft Solutions for Nonprofit Operations"],
        hero: {
            description: "Empower Your Mission with Microsoft Solutions for Nonprofits",
            subDescription: "Maximize your nonprofit's impact with intelligent Microsoft solutions that simplify donor management, streamline grant administration, enhance program delivery, and improve collaboration. From fundraising to volunteer coordination, our solutions support your mission and help you achieve greater community impact.",
            heroBadges: ["Nonprofit Solutions", "Microsoft Dynamics 365", "Donor Management", "Grant Management"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#10B981",
            accentDark: "#059669",
            accentLight: "#34D399",
            accentSoft: "rgba(16,185,129,0.08)",
            heroStart: "#0A1E0E",
            heroEnd: "#1A3B2E",
            accentRgb: "16, 185, 129"
        },
        overview: {
            tag: "Nonprofit Solutions",
            title: "Microsoft Solutions for Modern Nonprofit Organizations",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "Nonprofit organizations and associations need efficient systems to manage donors, members, grants, programs, and day-to-day operations while maximizing their impact. Disconnected systems often create inefficiencies and limit organizational growth. The nonprofit sector faces unique challenges in managing limited resources while delivering maximum community impact.",
                "At JJC Systems, we help nonprofits embrace digital transformation with Microsoft Dynamics 365, Power Platform, and Microsoft 365 solutions that simplify operations, improve collaboration, and provide complete visibility across the organization. Our solutions are designed to address the unique needs of nonprofit organizations, including donor management, grant administration, and program delivery.",
                "Our tailored solutions help nonprofit teams collaborate effectively, strengthen donor engagement, simplify grant management, and gain real-time insights into organizational performance. We understand the importance of maximizing impact with limited resources, and we build solutions that support these critical organizational objectives."
            ],
            checklist: ["Donor Management", "Grant Administration", "Program Operations", "Volunteer Management", "Financial Management", "Impact Reporting"]
        },
        solutions: {
            tag: "Our Nonprofit Solutions",
            title: "Microsoft Solutions for Nonprofit Operations",
            subtitle: "Comprehensive solutions for donor management, grants, programs, and operations that help nonprofits maximize their community impact.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Users",
                    title: "Donor & Member Management",
                    description: "Build stronger relationships with donors, members, sponsors, and volunteers with centralized management of contacts, donations, and communications."
                },
                {
                    icon: "FileText",
                    title: "Grant Management",
                    description: "Track grant applications, funding opportunities, approvals, budgets, deadlines, and compliance requirements with automated workflows."
                },
                {
                    icon: "Heart",
                    title: "Program & Case Management",
                    description: "Monitor community programs, beneficiary services, and outreach initiatives with centralized program management and outcome tracking."
                },
                {
                    icon: "Users",
                    title: "Volunteer Management",
                    description: "Organize volunteer registrations, availability, schedules, assignments, and communications to improve volunteer engagement and retention."
                },
                {
                    icon: "Building2",
                    title: "Collaboration & Document Management",
                    description: "Enhance teamwork with Microsoft 365, Teams, and SharePoint for secure document sharing and real-time collaboration across teams."
                },
                {
                    icon: "PieChart",
                    title: "Reporting & Impact Analytics",
                    description: "Monitor donations, membership growth, program performance, grant utilization, and organizational impact with Power BI dashboards."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits of Microsoft Solutions for Nonprofits",
            desc: "Improve operational efficiency, strengthen stakeholder engagement, and maximize community impact with intelligent nonprofit solutions.",
            visualIcon: "Heart",
            items: [
                {
                    icon: "Users",
                    title: "Enhanced Donor Engagement",
                    description: "Build stronger donor relationships with complete visibility into interactions, preferences, and engagement history for better stewardship."
                },
                {
                    icon: "FileText",
                    title: "Simplified Grant Management",
                    description: "Streamline grant applications, funding allocation, compliance tracking, and reporting with automated workflows for efficiency."
                },
                {
                    icon: "TrendingUp",
                    title: "Operational Efficiency",
                    description: "Automate administrative tasks, improve collaboration, and gain real-time insights to maximize organizational impact and efficiency."
                }
            ],
            buttonLabel: "Talk to Nonprofit Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our Nonprofit Implementation Process",
            subtitle: "A structured approach for nonprofit digital transformation with 6 comprehensive phases for successful adoption",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Business Discovery",
                    description: "We evaluate your donor management, grant administration, program operations, and volunteer engagement processes to understand your needs."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Planning",
                    description: "Our consultants design a customized Microsoft solution aligned with your mission, operational goals, and strategic objectives."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Configuration & Customization",
                    description: "We configure and customize the solution to match your specific nonprofit workflows, donor processes, and program requirements."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes comprehensive testing to validate performance, data accuracy, and operational readiness before deployment."
                },
                {
                    step: 5,
                    icon: "Users",
                    title: "User Training & Change Management",
                    description: "We provide comprehensive training for staff, volunteers, and leadership to ensure successful adoption across your organization."
                },
                {
                    step: 6,
                    icon: "Rocket",
                    title: "Implementation & Ongoing Support",
                    description: "We deploy, configure, train, and provide ongoing support for your nonprofit solutions to ensure long-term success."
                }
            ]
        },
        technologies: {
            tag: "Nonprofit Technology",
            title: "Modern Nonprofit Technologies",
            subtitle: "Future-ready platforms built on Microsoft technologies that enable nonprofits to operate more efficiently and maximize their impact.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Scalable cloud-based nonprofit operations"
                },
                {
                    icon: "Shield",
                    label: "Data Security",
                    desc: "Secure donor and member information"
                },
                {
                    icon: "Users",
                    label: "Collaboration Tools",
                    desc: "Microsoft Teams and SharePoint"
                },
                {
                    icon: "BarChart3",
                    label: "Impact Analytics",
                    desc: "Real-time organizational insights"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "Nonprofit Case Studies",
            subtitle: "Real transformations from nonprofit organizations we've helped modernize their operations and maximize community impact.",
            items: [
                {
                    tag: "Nonprofit",
                    title: "Donor Management Transformation",
                    description: "A nonprofit implemented Microsoft Dynamics 365 to centralize donor information, automate communications, and manage fundraising campaigns, achieving 45% improvement in donor engagement.",
                    stat: "45%",
                    statLabel: "Donor Engagement"
                },
                {
                    tag: "Foundation",
                    title: "Grant & Program Modernization",
                    description: "A charitable foundation digitized grant lifecycle and program management with Dynamics 365 and Power Platform, achieving 35% operational efficiency improvement.",
                    stat: "35%",
                    statLabel: "Operational Efficiency"
                },
                {
                    tag: "Nonprofit",
                    title: "Collaboration & Volunteer Management",
                    description: "A community nonprofit adopted Microsoft 365, Teams, and SharePoint to improve staff and volunteer collaboration, achieving 50% collaboration improvement.",
                    stat: "50%",
                    statLabel: "Collaboration Improvement"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What Microsoft solutions do you provide for nonprofit organizations?",
                    answer: "We implement Microsoft Dynamics 365, Microsoft 365, Power BI, Power Automate, and SharePoint for donor management, grants, fundraising, and reporting."
                },
                {
                    question: "Can Microsoft Dynamics 365 manage donor and member information?",
                    answer: "Yes. Dynamics 365 centralizes donor and member data, donation history, communications, memberships, and engagement activities in one secure platform."
                },
                {
                    question: "How do Microsoft solutions help with grant management?",
                    answer: "Our solutions simplify grant applications, funding tracking, compliance management, budgeting, approvals, and reporting for efficient grant administration."
                },
                {
                    question: "Can Microsoft solutions improve collaboration for nonprofit teams?",
                    answer: "Absolutely. Microsoft Teams, SharePoint, and Microsoft 365 enable secure communication, document sharing, and project collaboration across your organization."
                }
            ]
        },
        cta: {
            title: "Ready to Accelerate Your Nonprofit Mission?",
            description: "Modernize your nonprofit operations with intelligent Microsoft solutions that strengthen donor relationships, streamline programs, and maximize impact in your community.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Talk to Nonprofit Experts"
        },
        isPublished: true,
        order: 7
    },

    // ============================================================
    // 8. Education
    // ============================================================
    {
        title: "Microsoft Solutions for Education",
        slug: "education",
        urlPath: "/industries/education",
        badge: "Education",
        breadcrumb: ["Home", "Industries", "Microsoft Solutions for Education"],
        hero: {
            description: "Transform Education with Microsoft Solutions",
            subDescription: "Empower educational institutions with intelligent Microsoft solutions that enhance learning experiences, streamline administration, and improve collaboration. From student management to remote learning, our solutions support academic excellence and help educational institutions achieve better outcomes for students and staff.",
            heroBadges: ["Education", "Microsoft 365 Education", "Student Management", "Learning Solutions"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#6366F1",
            accentDark: "#4F46E5",
            accentLight: "#818CF8",
            accentSoft: "rgba(99,102,241,0.08)",
            heroStart: "#0A0A1E",
            heroEnd: "#1A1A3E",
            accentRgb: "99, 102, 241"
        },
        overview: {
            tag: "Education Solutions",
            title: "Microsoft Solutions for Modern Educational Institutions",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "Educational institutions face increasing demands to deliver quality education while managing student records, administrative tasks, and campus operations efficiently. Disconnected systems often create inefficiencies and limit educational outcomes. The education sector is undergoing significant digital transformation, with institutions leveraging technology to enhance learning experiences and improve operational efficiency.",
                "At JJC Systems, we help schools, colleges, and universities leverage Microsoft 365 Education, Dynamics 365, and Power Platform to unify operations, enhance learning experiences, and improve institutional performance. Our solutions are designed to address the unique challenges of educational institutions, including student management, administrative automation, and collaboration.",
                "Our solutions enable educators to focus on teaching while our technology handles student management, administrative workflows, and collaboration. We understand the importance of delivering quality education and supporting student success, and we build solutions that support these critical institutional objectives."
            ],
            checklist: ["Student Management", "Learning Management", "Administrative Automation", "Collaboration Tools", "Campus Operations", "Reporting & Analytics"]
        },
        solutions: {
            tag: "Our Education Solutions",
            title: "Microsoft Solutions for Education",
            subtitle: "Comprehensive solutions for student management, learning, and administration that help educational institutions achieve better outcomes.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Users",
                    title: "Student Information Management",
                    description: "Manage student records, enrollment, attendance, grades, and academic progress from a centralized platform for complete visibility."
                },
                {
                    icon: "BookOpen",
                    title: "Learning Management Solutions",
                    description: "Deliver engaging learning experiences with Microsoft Teams for Education, SharePoint, and integrated learning platforms for student success."
                },
                {
                    icon: "Building2",
                    title: "Administrative Automation",
                    description: "Automate administrative tasks including scheduling, registration, billing, and reporting with Power Platform solutions for efficiency."
                },
                {
                    icon: "Users",
                    title: "Collaboration & Communication",
                    description: "Enable seamless communication between students, teachers, parents, and administrators with Microsoft 365 and Teams for better engagement."
                },
                {
                    icon: "FileText",
                    title: "Document & Records Management",
                    description: "Securely manage student records, academic documents, and administrative files with SharePoint and Microsoft 365 for compliance."
                },
                {
                    icon: "PieChart",
                    title: "Institutional Analytics",
                    description: "Monitor student performance, enrollment trends, operational efficiency, and institutional KPIs with Power BI dashboards for data-driven decisions."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits of Microsoft Solutions for Education",
            desc: "Improve learning outcomes, administrative efficiency, and institutional performance with intelligent education solutions designed for modern educational institutions.",
            visualIcon: "GraduationCap",
            items: [
                {
                    icon: "Users",
                    title: "Enhanced Learning Experiences",
                    description: "Deliver engaging and personalized learning experiences with integrated collaboration and learning tools for student success."
                },
                {
                    icon: "Building2",
                    title: "Administrative Efficiency",
                    description: "Automate administrative tasks, reduce manual effort, and improve operational efficiency across campus for better resource utilization."
                },
                {
                    icon: "TrendingUp",
                    title: "Data-Driven Decision Making",
                    description: "Make informed decisions with real-time insights into student performance, enrollment, and institutional operations for continuous improvement."
                }
            ],
            buttonLabel: "Talk to Education Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our Education Implementation Process",
            subtitle: "A structured approach for education digital transformation with 6 comprehensive phases for successful adoption",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Institutional Assessment",
                    description: "We evaluate your educational workflows, student management processes, and administrative operations to understand your needs."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Design",
                    description: "Our consultants design a customized Microsoft solution aligned with your educational institution's goals and strategic objectives."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Configuration & Customization",
                    description: "We configure and customize the solution to match your specific educational workflows, student processes, and administrative requirements."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes comprehensive testing to validate performance, data accuracy, and operational readiness before deployment."
                },
                {
                    step: 5,
                    icon: "Users",
                    title: "User Training & Change Management",
                    description: "We provide comprehensive training for educators, administrators, and IT staff to ensure successful adoption across your institution."
                },
                {
                    step: 6,
                    icon: "Rocket",
                    title: "Implementation & Ongoing Support",
                    description: "We deploy, configure, train, and provide ongoing support for your education solutions to ensure long-term success."
                }
            ]
        },
        technologies: {
            tag: "Education Technology",
            title: "Modern Education Technologies",
            subtitle: "Future-ready platforms built on Microsoft technologies that enable educational institutions to deliver better learning experiences.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Scalable cloud-based education platforms"
                },
                {
                    icon: "Shield",
                    label: "Data Security",
                    desc: "Secure student and institutional data"
                },
                {
                    icon: "Users",
                    label: "Collaboration Tools",
                    desc: "Microsoft Teams and SharePoint"
                },
                {
                    icon: "BookOpen",
                    label: "Learning Tools",
                    desc: "Integrated learning management"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "Education Case Studies",
            subtitle: "Real transformations from educational institutions we've helped modernize their operations and improve learning outcomes.",
            items: [
                {
                    tag: "University",
                    title: "Student Management Modernization",
                    description: "A university implemented Microsoft Dynamics 365 to centralize student information, enrollment, and academic records, achieving 40% improvement in administrative efficiency.",
                    stat: "40%",
                    statLabel: "Administrative Efficiency"
                },
                {
                    tag: "School",
                    title: "Remote Learning Transformation",
                    description: "A school adopted Microsoft Teams for Education to deliver remote learning, collaborate, and engage students, achieving 50% improvement in student engagement.",
                    stat: "50%",
                    statLabel: "Student Engagement"
                },
                {
                    tag: "College",
                    title: "Campus Operations Automation",
                    description: "A college automated scheduling, registration, and billing processes with Power Platform solutions, achieving 35% operational efficiency improvement.",
                    stat: "35%",
                    statLabel: "Operational Efficiency"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What Microsoft solutions do you offer for education institutions?",
                    answer: "We implement Microsoft 365 Education, Dynamics 365, Power BI, Power Automate, and SharePoint for student management, learning, administration, and collaboration."
                },
                {
                    question: "Can Microsoft solutions improve student management?",
                    answer: "Yes. Dynamics 365 provides comprehensive student information management with enrollment, attendance, grades, and academic progress tracking for better student outcomes."
                },
                {
                    question: "How do you support remote learning?",
                    answer: "We implement Microsoft Teams for Education, SharePoint, and integrated learning platforms to enable engaging remote and hybrid learning experiences for students."
                },
                {
                    question: "Do you provide training for educators and administrators?",
                    answer: "Yes. We provide comprehensive training for teachers, administrators, and IT staff to ensure successful adoption and change management across your institution."
                }
            ]
        },
        cta: {
            title: "Ready to Transform Your Educational Institution?",
            description: "Empower your school, college, or university with intelligent Microsoft solutions that enhance learning, streamline administration, and drive institutional success.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Talk to Education Experts"
        },
        isPublished: true,
        order: 8
    },

    // ============================================================
    // 9. Public Sector
    // ============================================================
    {
        title: "Microsoft Solutions for Public Sector",
        slug: "public-sector",
        urlPath: "/industries/public-sector",
        badge: "Public Sector",
        breadcrumb: ["Home", "Industries", "Microsoft Solutions for Public Sector"],
        hero: {
            description: "Modernize Public Services with Microsoft Solutions",
            subDescription: "Transform government agencies and public sector organizations with intelligent Microsoft solutions that improve citizen services, enhance operational efficiency, and ensure transparency. From citizen service management to interdepartmental collaboration, our solutions drive public sector excellence and help build trust with citizens.",
            heroBadges: ["Public Sector", "Microsoft Dynamics 365", "Citizen Services", "Government Solutions"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#1E40AF",
            accentDark: "#1E3A8A",
            accentLight: "#3B82F6",
            accentSoft: "rgba(30,64,175,0.08)",
            heroStart: "#0A0A1E",
            heroEnd: "#1A2E5F",
            accentRgb: "30, 64, 175"
        },
        overview: {
            tag: "Public Sector Solutions",
            title: "Microsoft Solutions for Modern Public Sector Organizations",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "Government agencies and public sector organizations are under increasing pressure to deliver faster, more transparent, and citizen-centric services. Disconnected systems and manual processes often slow service delivery and reduce operational efficiency. The public sector is undergoing significant digital transformation, with organizations leveraging technology to improve citizen services and operational efficiency.",
                "At JJC Systems, we help public sector organizations accelerate digital transformation with Microsoft Dynamics 365, Power Platform, Microsoft 365, and Azure solutions that unify operations on a secure and scalable platform. Our solutions are designed to address the unique challenges of government organizations, including citizen service management, regulatory compliance, and interdepartmental collaboration.",
                "Our solutions empower government departments to improve service delivery, enhance operational efficiency, make data-driven decisions, and maintain compliance and security. We understand the importance of building trust with citizens and delivering transparent government services, and we build solutions that support these critical organizational objectives."
            ],
            checklist: ["Citizen Service Management", "Case Management", "Budget Management", "Procurement Automation", "Document Management", "Performance Analytics"]
        },
        solutions: {
            tag: "Our Public Sector Solutions",
            title: "Microsoft Solutions for Public Sector",
            subtitle: "Comprehensive solutions for citizen services, government operations, and public administration that help organizations deliver better services.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Users",
                    title: "Citizen Service Management",
                    description: "Deliver faster and more efficient public services by managing citizen requests, applications, complaints, and service cases from a centralized platform."
                },
                {
                    icon: "FileText",
                    title: "Case Management",
                    description: "Track every case from submission to resolution with automated workflows, task assignments, approvals, and real-time status updates for accountability."
                },
                {
                    icon: "Building2",
                    title: "Finance & Budget Management",
                    description: "Improve financial planning by managing budgets, expenditures, grants, procurement, and financial reporting within an integrated Microsoft ecosystem."
                },
                {
                    icon: "Truck",
                    title: "Procurement & Vendor Management",
                    description: "Simplify procurement with automated purchase requests, vendor management, approval workflows, contract tracking, and purchase order management."
                },
                {
                    icon: "FileText",
                    title: "Document & Records Management",
                    description: "Digitize and securely manage government records, official documents, approvals, and correspondence using SharePoint and Microsoft 365."
                },
                {
                    icon: "PieChart",
                    title: "Reporting & Performance Analytics",
                    description: "Monitor departmental performance, service delivery, budgets, and operational KPIs through interactive Power BI dashboards for data-driven decisions."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits of Microsoft Solutions for Public Sector",
            desc: "Improve citizen service delivery, operational efficiency, and transparency with intelligent public sector solutions designed for government organizations.",
            visualIcon: "Building2",
            items: [
                {
                    icon: "Users",
                    title: "Enhanced Citizen Services",
                    description: "Deliver faster, more transparent, and citizen-centric services with centralized case management and automated workflows for better service delivery."
                },
                {
                    icon: "ShieldCheck",
                    title: "Transparency & Accountability",
                    description: "Increase transparency with automated workflows, comprehensive audit trails, and real-time reporting capabilities for government accountability."
                },
                {
                    icon: "TrendingUp",
                    title: "Operational Efficiency",
                    description: "Automate administrative tasks, improve interdepartmental collaboration, and reduce operational costs across government organizations for efficiency."
                }
            ],
            buttonLabel: "Talk to Public Sector Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our Public Sector Implementation Process",
            subtitle: "A structured approach for public sector digital transformation with 6 comprehensive phases for successful adoption",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Government Assessment",
                    description: "We evaluate existing government workflows, citizen services, finance operations, and departmental collaboration needs to understand your requirements."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Design",
                    description: "Our consultants design a Microsoft solution tailored to your department's operational goals, compliance requirements, and strategic objectives."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Configuration & Customization",
                    description: "We configure and customize the solution to match your specific government workflows, citizen service processes, and operational requirements."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes comprehensive testing to validate security, data accuracy, and operational readiness before deployment."
                },
                {
                    step: 5,
                    icon: "Users",
                    title: "User Training & Change Management",
                    description: "We provide comprehensive training for government staff and administrators to ensure successful adoption across your organization."
                },
                {
                    step: 6,
                    icon: "Rocket",
                    title: "Implementation & Ongoing Support",
                    description: "We deploy, configure, train, and provide ongoing support for your public sector solutions to ensure long-term success."
                }
            ]
        },
        technologies: {
            tag: "Public Sector Technology",
            title: "Modern Public Sector Technologies",
            subtitle: "Secure and compliant platforms built on Microsoft technologies that enable government organizations to operate more efficiently and transparently.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Secure cloud-based government operations"
                },
                {
                    icon: "Shield",
                    label: "Security & Compliance",
                    desc: "Enterprise-grade security and regulatory compliance"
                },
                {
                    icon: "Users",
                    label: "Collaboration Tools",
                    desc: "Microsoft Teams and SharePoint"
                },
                {
                    icon: "BarChart3",
                    label: "Performance Analytics",
                    desc: "Real-time government operational insights"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "Public Sector Case Studies",
            subtitle: "Real transformations from government and public sector organizations we've helped modernize their operations and citizen services.",
            items: [
                {
                    tag: "Government",
                    title: "Digital Citizen Service Portal",
                    description: "A government department implemented Microsoft Dynamics 365 for citizen service management, digitizing citizen requests, complaints, and permits, achieving 55% improvement in response time.",
                    stat: "55%",
                    statLabel: "Response Time Improvement"
                },
                {
                    tag: "Public Agency",
                    title: "Budget & Procurement Automation",
                    description: "A public agency automated procurement approvals, vendor management, purchase orders, and budget monitoring with Dynamics 365 and Power Platform, achieving 40% process efficiency improvement.",
                    stat: "40%",
                    statLabel: "Process Efficiency"
                },
                {
                    tag: "Public Sector",
                    title: "Department Collaboration Platform",
                    description: "A public sector organization deployed Microsoft 365, Teams, and SharePoint to improve collaboration between departments, achieving 45% collaboration improvement.",
                    stat: "45%",
                    statLabel: "Collaboration Improvement"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What Microsoft solutions do you provide for the public sector?",
                    answer: "We implement Microsoft Dynamics 365, Microsoft 365, Azure, Power BI, Power Apps, and SharePoint for citizen services, procurement, finance, and reporting."
                },
                {
                    question: "Can Microsoft Dynamics 365 improve citizen service management?",
                    answer: "Yes. Dynamics 365 enables organizations to manage citizen requests, cases, applications, permits, and service delivery through a centralized platform for better service."
                },
                {
                    question: "Can Microsoft solutions integrate with existing government systems?",
                    answer: "Yes. We integrate with ERP systems, finance applications, HRMS, GIS platforms, and other government applications for seamless operations."
                },
                {
                    question: "Do you provide implementation and training for government staff?",
                    answer: "Yes. We offer complete implementation services, including user training and change management for government teams to ensure successful adoption."
                }
            ]
        },
        cta: {
            title: "Ready to Build a Smarter Public Sector?",
            description: "Transform public service delivery with intelligent Microsoft solutions that modernize operations, improve citizen experiences, and drive digital transformation in government.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Talk to Public Sector Experts"
        },
        isPublished: true,
        order: 9
    },

    // ============================================================
    // 10. Construction & Field Services
    // ============================================================
    {
        title: "Microsoft Solutions for Construction & Field Services",
        slug: "construction-field-services",
        urlPath: "/industries/construction-field-services",
        badge: "Construction & Field Services",
        breadcrumb: ["Home", "Industries", "Microsoft Solutions for Construction & Field Services"],
        hero: {
            description: "Optimize Construction & Field Operations with Microsoft Solutions",
            subDescription: "Transform your construction or field service business with intelligent Microsoft solutions that streamline project management, resource allocation, equipment tracking, and field operations. From construction projects to field service delivery, our solutions drive efficiency and profitability while helping you deliver projects on time and within budget.",
            heroBadges: ["Construction", "Field Services", "Microsoft Dynamics 365", "Project Management"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#D97706",
            accentDark: "#B45309",
            accentLight: "#F59E0B",
            accentSoft: "rgba(217,119,6,0.08)",
            heroStart: "#1A0E0A",
            heroEnd: "#3B2E0A",
            accentRgb: "217, 119, 6"
        },
        overview: {
            tag: "Construction & Field Services",
            title: "Microsoft Solutions for Modern Construction & Field Services",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "Construction and field service businesses face unique challenges in managing projects, resources, equipment, and field operations across multiple sites. Disconnected systems often lead to project delays, cost overruns, and reduced profitability. The construction and field services industry is undergoing significant transformation, with businesses leveraging technology to improve project delivery and operational efficiency.",
                "At JJC Systems, we help construction and field service organizations leverage Microsoft Dynamics 365 and Power Platform to unify operations, optimize resource utilization, and gain real-time visibility into project performance. Our solutions are designed to address the unique challenges of the construction and field services industry, including project management, resource allocation, and equipment tracking.",
                "From project planning and resource allocation to equipment tracking and field service delivery, our solutions help you deliver projects on time and within budget. We understand the importance of efficient project delivery and resource optimization, and we build solutions that support these critical business objectives."
            ],
            checklist: ["Project Management", "Resource Allocation", "Equipment Tracking", "Field Service Management", "Financial Control", "Safety & Compliance"]
        },
        solutions: {
            tag: "Our Construction Solutions",
            title: "Microsoft Solutions for Construction & Field Services",
            subtitle: "Comprehensive solutions for project management, field operations, and resource optimization that help construction and field service businesses succeed.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Building2",
                    title: "Construction Project Management",
                    description: "Manage construction projects from planning to completion with task tracking, milestone monitoring, budgeting, and team collaboration for project success."
                },
                {
                    icon: "Users",
                    title: "Resource & Workforce Management",
                    description: "Optimize workforce allocation by matching the right people to the right projects based on skills, availability, and location for maximum efficiency."
                },
                {
                    icon: "Truck",
                    title: "Equipment & Asset Management",
                    description: "Track equipment inventory, maintenance schedules, utilization, and availability across multiple construction sites for optimal asset utilization."
                },
                {
                    icon: "Clock",
                    title: "Field Service Management",
                    description: "Manage field service operations with scheduling, dispatching, work order management, and real-time status updates for efficient service delivery."
                },
                {
                    icon: "Receipt",
                    title: "Project Financial Management",
                    description: "Manage project budgets, costs, invoicing, and financial reporting with integrated financial management solutions for better financial control."
                },
                {
                    icon: "PieChart",
                    title: "Operational Reporting & Analytics",
                    description: "Monitor project progress, resource utilization, equipment performance, and operational KPIs through interactive dashboards for data-driven decisions."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits of Microsoft Solutions for Construction & Field Services",
            desc: "Improve project delivery, resource utilization, and profitability with intelligent construction solutions designed for project-based businesses.",
            visualIcon: "Building2",
            items: [
                {
                    icon: "Building2",
                    title: "Better Project Delivery",
                    description: "Deliver construction projects on time and within budget with complete visibility into project status, resources, and financials for client satisfaction."
                },
                {
                    icon: "Users",
                    title: "Optimized Resource Utilization",
                    description: "Maximize workforce and equipment utilization with intelligent resource planning and allocation based on skills and availability."
                },
                {
                    icon: "TrendingUp",
                    title: "Increased Profitability",
                    description: "Improve financial performance with accurate project costing, efficient billing, and data-driven business decisions that maximize profitability."
                }
            ],
            buttonLabel: "Talk to Construction Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our Construction Implementation Process",
            subtitle: "A proven approach for construction and field services transformation with 6 comprehensive phases for successful adoption",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Business Discovery",
                    description: "We evaluate your construction workflows, project management processes, resource allocation, and field operations to understand your needs."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Planning",
                    description: "Our consultants design a customized Microsoft solution aligned with your construction business objectives and strategic goals."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Configuration & Customization",
                    description: "We configure and customize the solution to match your specific construction workflows, project management processes, and operational requirements."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes comprehensive testing to validate performance, data accuracy, and operational readiness before deployment."
                },
                {
                    step: 5,
                    icon: "Users",
                    title: "User Training & Change Management",
                    description: "We provide comprehensive training for project managers, field staff, and support teams to ensure successful adoption across your organization."
                },
                {
                    step: 6,
                    icon: "Rocket",
                    title: "Deployment & Ongoing Support",
                    description: "We implement, configure, train, and provide ongoing support for your construction solutions to ensure long-term success."
                }
            ]
        },
        technologies: {
            tag: "Construction Technology",
            title: "Modern Construction Technologies",
            subtitle: "Future-ready platforms built on Microsoft technologies that enable construction and field service businesses to operate more efficiently.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Scalable cloud-based construction operations"
                },
                {
                    icon: "Shield",
                    label: "Data Security",
                    desc: "Secure project and client data"
                },
                {
                    icon: "Smartphone",
                    label: "Mobile Access",
                    desc: "Access project data from the field"
                },
                {
                    icon: "Database",
                    label: "Integration",
                    desc: "Seamless system integration"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "Construction & Field Services Case Studies",
            subtitle: "Real transformations from construction and field service organizations we've helped optimize their operations and project delivery.",
            items: [
                {
                    tag: "Construction",
                    title: "Construction Project Management",
                    description: "A construction company implemented Microsoft Dynamics 365 for project planning, resource allocation, and financial management, achieving 30% improvement in project efficiency.",
                    stat: "30%",
                    statLabel: "Project Efficiency"
                },
                {
                    tag: "Field Services",
                    title: "Field Service Management Transformation",
                    description: "A field service provider deployed Microsoft solutions for scheduling, dispatching, and work order management, achieving 35% improvement in service efficiency.",
                    stat: "35%",
                    statLabel: "Service Efficiency"
                },
                {
                    tag: "Construction",
                    title: "Equipment Management Optimization",
                    description: "A construction firm implemented equipment tracking and maintenance scheduling with Microsoft solutions, achieving 25% improvement in equipment utilization.",
                    stat: "25%",
                    statLabel: "Equipment Utilization"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What Microsoft solutions do you offer for construction and field services?",
                    answer: "We implement Microsoft Dynamics 365, Power BI, Power Automate, and Microsoft 365 for project management, resource allocation, equipment tracking, and field operations."
                },
                {
                    question: "Can Microsoft Dynamics 365 manage construction projects?",
                    answer: "Yes. Dynamics 365 provides comprehensive project management with task tracking, milestones, budgeting, resource allocation, and real-time reporting for construction projects."
                },
                {
                    question: "How does Microsoft help with equipment management?",
                    answer: "Our solutions provide real-time equipment tracking, maintenance scheduling, utilization monitoring, and availability management for optimal asset utilization."
                },
                {
                    question: "Can your solutions integrate with existing construction systems?",
                    answer: "Yes. We integrate with ERP systems, accounting software, project management platforms, and other construction applications for seamless operations."
                }
            ]
        },
        cta: {
            title: "Ready to Transform Your Construction or Field Service Business?",
            description: "Empower your organization with intelligent Microsoft solutions that improve project delivery, optimize resources, and drive growth in today's competitive market.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Talk to Construction Experts"
        },
        isPublished: true,
        order: 10
    },

    // ============================================================
    // 11. Small & Mid-Market Enterprises
    // ============================================================
    {
        title: "Microsoft Solutions for Small & Mid-Market Enterprises",
        slug: "small-mid-market-enterprises",
        urlPath: "/industries/small-mid-market-enterprises",
        badge: "SME",
        breadcrumb: ["Home", "Industries", "Microsoft Solutions for Small & Mid-Market Enterprises"],
        hero: {
            description: "Accelerate Business Growth with Microsoft Solutions",
            subDescription: "Empower your small or mid-market enterprise with flexible, scalable, and cost-effective Microsoft solutions that streamline operations, improve customer engagement, and enable smarter decisions. From CRM to business intelligence, our solutions help growing businesses compete in today's digital economy and achieve sustainable growth.",
            heroBadges: ["SME Solutions", "Microsoft Dynamics 365", "Business Growth", "Digital Transformation"],
            heroImage: { url: "", publicId: "" }
        },
        theme: {
            accent: "#0284C7",
            accentDark: "#0369A1",
            accentLight: "#38BDF8",
            accentSoft: "rgba(2,132,199,0.08)",
            heroStart: "#0A1628",
            heroEnd: "#1A3A5F",
            accentRgb: "2, 132, 199"
        },
        overview: {
            tag: "SME Solutions",
            title: "Microsoft Solutions for Small & Mid-Market Enterprises",
            brandLabel: "JJC Systems",
            image: { url: "", publicId: "" },
            paragraphs: [
                "Small and mid-market enterprises need flexible, scalable, and cost-effective technology to compete in today's digital economy. As businesses grow, managing sales, finance, inventory, customer relationships, and operations across disconnected systems becomes increasingly difficult. The SME sector is the backbone of the economy, and businesses need technology that supports growth without complexity.",
                "At JJC Systems, we help growing businesses streamline operations, improve customer engagement, and make smarter decisions with Microsoft Dynamics 365, Microsoft 365, Power Platform, Power BI, and Azure solutions. Our solutions are designed to address the unique challenges of SMEs, including resource constraints, scalability needs, and the need for competitive advantage.",
                "From sales and customer relationship management to finance, inventory, operations, reporting, and workflow automation, our Microsoft solutions bring your entire business together on one intelligent platform. We understand the importance of delivering value and supporting business growth, and we build solutions that support these critical business objectives."
            ],
            checklist: ["Customer Relationship Management", "Sales & Opportunity Management", "Finance & Accounting", "Inventory & Warehouse Management", "Business Intelligence", "Workflow Automation"]
        },
        solutions: {
            tag: "Our SME Solutions",
            title: "Microsoft Solutions for Small & Mid-Market Enterprises",
            subtitle: "Comprehensive solutions for growing businesses to streamline operations, improve productivity, and accelerate growth.",
            bg: "#ffffff",
            columns: 3,
            alignLeft: true,
            items: [
                {
                    icon: "Users",
                    title: "Customer Relationship Management",
                    description: "Build stronger customer relationships with Dynamics 365 CRM for managing leads, opportunities, communications, and service requests from one platform."
                },
                {
                    icon: "Briefcase",
                    title: "Sales & Opportunity Management",
                    description: "Track your sales pipeline, monitor opportunities, forecast revenue, and improve conversion rates with intelligent sales automation for growth."
                },
                {
                    icon: "Receipt",
                    title: "Finance & Accounting Management",
                    description: "Simplify financial operations through automated invoicing, accounts payable, accounts receivable, and financial reporting for better financial control."
                },
                {
                    icon: "Package",
                    title: "Inventory & Warehouse Management",
                    description: "Manage inventory levels, stock movement, warehouse operations, and order fulfillment with real-time visibility for efficient operations."
                },
                {
                    icon: "PieChart",
                    title: "Business Intelligence & Reporting",
                    description: "Gain real-time insights into sales, finance, operations, and customer performance through interactive Power BI dashboards for data-driven decisions."
                },
                {
                    icon: "Workflow",
                    title: "Workflow Automation",
                    description: "Automate repetitive business processes, approvals, document management, and notifications using Microsoft Power Automate for operational efficiency."
                }
            ]
        },
        benefits: {
            tag: "Benefits",
            title: "Benefits of Microsoft Solutions for SMEs",
            desc: "Improve productivity, reduce operational costs, and scale confidently with intelligent business solutions designed for growing enterprises.",
            visualIcon: "Rocket",
            items: [
                {
                    icon: "Users",
                    title: "Improved Customer Relationships",
                    description: "Build stronger customer relationships with a complete view of interactions, preferences, and engagement history for better customer service."
                },
                {
                    icon: "Rocket",
                    title: "Increased Sales Productivity",
                    description: "Automate sales processes, improve pipeline visibility, and accelerate deal closure with intelligent sales tools for revenue growth."
                },
                {
                    icon: "TrendingUp",
                    title: "Scalable Business Growth",
                    description: "Support sustainable growth with scalable solutions that grow with your business and adapt to changing needs for long-term success."
                }
            ],
            buttonLabel: "Talk to SME Experts"
        },
        implementationProcess: {
            tag: "Process",
            title: "Our SME Implementation Process",
            subtitle: "A structured approach for small and mid-market enterprise transformation with 6 comprehensive phases for successful adoption",
            steps: [
                {
                    step: 1,
                    icon: "Search",
                    title: "Business Assessment",
                    description: "We evaluate your current systems, business workflows, sales processes, and future business goals to understand your needs."
                },
                {
                    step: 2,
                    icon: "Settings",
                    title: "Solution Planning",
                    description: "Our consultants design a customized implementation strategy aligned with your business objectives, growth plans, and resource constraints."
                },
                {
                    step: 3,
                    icon: "Code",
                    title: "Configuration & Customization",
                    description: "We configure and customize the solution to match your specific business workflows, operational requirements, and industry needs."
                },
                {
                    step: 4,
                    icon: "ShieldCheck",
                    title: "Testing & Quality Assurance",
                    description: "Every solution undergoes comprehensive testing to validate performance, data accuracy, and operational readiness before deployment."
                },
                {
                    step: 5,
                    icon: "Users",
                    title: "User Training & Change Management",
                    description: "We provide comprehensive training for your team to ensure successful adoption and change management across your organization."
                },
                {
                    step: 6,
                    icon: "Rocket",
                    title: "Implementation & Ongoing Support",
                    description: "We deploy, configure, train, and provide ongoing support for your Microsoft solutions to ensure long-term success and growth."
                }
            ]
        },
        technologies: {
            tag: "SME Technology",
            title: "Modern SME Technologies",
            subtitle: "Future-ready platforms built on Microsoft technologies for growing businesses that need scalable and cost-effective solutions.",
            columns: 4,
            items: [
                {
                    icon: "Cloud",
                    label: "Cloud Solutions",
                    desc: "Scalable cloud-based business operations"
                },
                {
                    icon: "Shield",
                    label: "Data Security",
                    desc: "Secure business data and applications"
                },
                {
                    icon: "Smartphone",
                    label: "Mobile Access",
                    desc: "Access business data from anywhere"
                },
                {
                    icon: "BarChart3",
                    label: "Business Intelligence",
                    desc: "Real-time business insights"
                }
            ],
            footerLink: ""
        },
        caseStudies: {
            tag: "Success Stories",
            title: "SME Case Studies",
            subtitle: "Real transformations from small and mid-market enterprises we've helped achieve sustainable growth and operational excellence.",
            items: [
                {
                    tag: "Distribution",
                    title: "CRM & Sales Transformation",
                    description: "A growing distribution company implemented Microsoft Dynamics 365 CRM to centralize customer data, automate follow-ups, and improve pipeline visibility, achieving 45% improvement in sales efficiency.",
                    stat: "45%",
                    statLabel: "Sales Efficiency"
                },
                {
                    tag: "Manufacturing",
                    title: "Finance & Operations Modernization",
                    description: "A mid-sized manufacturing business replaced manual processes with Dynamics 365 Business Central for invoicing, financial reporting, and inventory management, achieving 35% cost reduction.",
                    stat: "35%",
                    statLabel: "Cost Reduction"
                },
                {
                    tag: "Retail",
                    title: "Business Intelligence Implementation",
                    description: "A retail business implemented Power BI dashboards to monitor sales performance, inventory levels, and customer trends in real time, achieving 50% improvement in decision speed.",
                    stat: "50%",
                    statLabel: "Decision Speed"
                }
            ]
        },
        faqs: {
            tag: "Frequently Asked Questions",
            title: "Frequently Asked Questions",
            items: [
                {
                    question: "What Microsoft solutions do you provide for small and mid-market enterprises?",
                    answer: "We implement Microsoft Dynamics 365, Business Central, Microsoft 365, Azure, Power BI, Power Apps, and Power Automate for sales, finance, operations, inventory, customer management, and reporting."
                },
                {
                    question: "Can Microsoft Dynamics 365 help growing businesses?",
                    answer: "Yes. Dynamics 365 helps businesses manage customer relationships, sales, finance, inventory, operations, and reporting from one integrated platform for growth."
                },
                {
                    question: "Do you provide Microsoft implementation services?",
                    answer: "Absolutely. We provide complete implementation services including consulting, solution design, deployment, customization, integration, data migration, user training, and ongoing support."
                },
                {
                    question: "Can Microsoft solutions integrate with our existing business applications?",
                    answer: "Yes. Our experts integrate Dynamics 365 with ERP systems, accounting software, CRM platforms, e-commerce solutions, and other business applications for seamless operations."
                }
            ]
        },
        cta: {
            title: "Ready to Grow Your Business with Microsoft Solutions?",
            description: "Transform your business with intelligent Microsoft solutions that streamline operations, improve customer experiences, and accelerate growth. Partner with JJC Systems to build a connected, scalable, and future-ready enterprise.",
            primaryLabel: "Get Started Today",
            secondaryLabel: "Talk to Our SME Experts"
        },
        isPublished: true,
        order: 11
    }
];

const seedIndustries = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        await Industry.deleteMany({});
        await Industry.insertMany(industries);

        console.log("All 11 Industries Seeded Successfully!");
        console.log("Total Documents Inserted:", industries.length);

        // Calculate approximate word count
        let totalWords = 0;
        industries.forEach((ind, i) => {
            let words = JSON.stringify(ind).split(/\s+/).length;
            totalWords += words;
            console.log(`Industry ${i + 1} (${ind.title}): ~${Math.round(words / 2000)}K words`);
        });
        console.log(`Total: ~${Math.round(totalWords / 2000)}K words across ${industries.length} industries`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding industries:", error);
        process.exit(1);
    }
};

seedIndustries();