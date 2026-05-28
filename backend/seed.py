import asyncio
import datetime
from app.database import SessionLocal, create_tables
from app.models import AdminUser, Service, SiteSetting, Project, FAQ
from app.utils.security import get_password_hash

def seed_db():
    create_tables()
    db = SessionLocal()
    
    # 1. Admin User
    admin = db.query(AdminUser).filter(AdminUser.username == "admin").first()
    if not admin:
        admin = AdminUser(
            username="admin",
            email="admin@namho.ai",
            password_hash=get_password_hash("admin123"),
            role="super_admin"
        )
        db.add(admin)
        print("Super admin created: admin / admin123")
        
    # 2. Settings (Clear and re-seed to match generated-page (1).html exactly)
    db.query(SiteSetting).delete()
    
    import json
    pricing_tiers_json = json.dumps([
      {
        "name": "Starter",
        "price": "Free",
        "period": "/consultation",
        "description": "Perfect for exploring technology needs and establishing a roadmap.",
        "tokens": "Standard Support",
        "features": [
          "Discovery Call",
          "Project Roadmap",
          "Tech Stack Advice",
          "No Commitment"
        ],
        "buttonText": "Book a Call",
        "buttonLink": "/contact",
        "popular": False,
        "color": "from-blue-500 to-cyan-400",
        "stripePriceId": ""
      },
      {
        "name": "Professional",
        "price": "Custom",
        "period": "/project",
        "description": "High-performance full-stack development and strategic marketing.",
        "tokens": "Priority Support",
        "features": [
          "Full-Stack Development",
          "SEO & Marketing",
          "UI/UX Design",
          "Priority Support"
        ],
        "buttonText": "Get a Quote",
        "buttonLink": "/contact",
        "popular": True,
        "color": "from-emerald-400 to-teal-500",
        "stripePriceId": ""
      },
      {
        "name": "Enterprise",
        "price": "Custom",
        "period": "/retainer",
        "description": "Dedicated engineering support, unlimited requests, and SLA.",
        "tokens": "24/7 SLA Support",
        "features": [
          "Dedicated Team",
          "Unlimited Requests",
          "AI Integration",
          "24/7 SLA"
        ],
        "buttonText": "Contact Sales",
        "buttonLink": "/contact",
        "popular": False,
        "color": "from-purple-500 to-pink-500",
        "stripePriceId": ""
      }
    ])

    settings_data = {
        "company_name": "NAMHO",
        "contact_email": "contactnamho@gmail.com",
        "contact_phone": "+91 8000556113",
        "contact_address": "F-2 Hariom Residency, Plot No. 191-192, Kanak Vihar, Kamla Nehru Nagar, Ajmer Road, Jaipur",
        "hero_headline": "NEURAL & SYSTEMS",
        "hero_tagline": "We engineer digital evolution. A full-service agency bridging AI Automation, custom software, and immersive design to scale your business.",
        "hero_cta_text": "View Case Studies",
        "footer_tagline": "Building the future of digital intelligence.",
        "pricing_tiers": pricing_tiers_json
    }
    for key, value in settings_data.items():
        db.add(SiteSetting(key=key, value=value, type="json" if key == "pricing_tiers" else "text"))
        print(f"Site setting seeded: {key}")
        
    # 3. Services (3 items matching generated-page (1).html)
    db.query(Service).delete()
    
    services = [
        Service(
            title="AI Automation",
            description="Intelligent workflows and bots that automate repetitive tasks, saving time and resources.",
            icon="solar:cpu-bolt-linear",
            category="tech",
            color="from-emerald-400 to-teal-500",
            features=["LLM Integration", "Workflow Automation", "AI Agents"],
            display_order=1
        ),
        Service(
            title="Software Dev",
            description="Custom web and mobile applications built on robust, scalable, and secure architectures.",
            icon="solar:code-square-linear",
            category="tech",
            color="from-blue-500 to-cyan-400",
            features=["SaaS Architecture", "React & Next.js", "APIs Creation"],
            display_order=2
        ),
        Service(
            title="DevOps Services",
            description="Streamlined deployment, continuous integration, and secure cloud management infrastructure.",
            icon="solar:server-square-linear",
            category="tech",
            color="from-purple-500 to-pink-500",
            features=["AWS & GCP", "CI/CD Pipelines", "Docker & K8s"],
            display_order=3
        )
    ]
    db.add_all(services)
    print("Services seeded successfully!")

    # 4. Projects (3 items matching generated-page (1).html)
    db.query(Project).delete()
    
    projects = [
        Project(
            title="Auto-Agent",
            description="Custom AI agents designed to automate complex customer support workflows, reducing human intervention by 80%.",
            category="deep-space",
            technologies=["Python", "OpenAI", "FastAPI"],
            image_url="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
            status="active",
            is_featured=True,
            display_order=1,
            project_date=datetime.date(2025, 11, 15)
        ),
        Project(
            title="FinTech App",
            description="A comprehensive mobile banking solution with immersive UI/UX and real-time crypto tracking.",
            category="orbital",
            technologies=["React", "Node", "PostgreSQL"],
            image_url="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg",
            status="live",
            is_featured=True,
            display_order=2,
            project_date=datetime.date(2025, 12, 1)
        ),
        Project(
            title="Cloud Infra",
            description="Automated DevOps pipelines on AWS, reducing deployment times from days to minutes.",
            category="orbital",
            technologies=["AWS", "Terraform", "Docker"],
            image_url="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg",
            status="published",
            is_featured=True,
            display_order=3,
            project_date=datetime.date(2026, 1, 10)
        )
    ]
    db.add_all(projects)
    print("Projects seeded successfully!")

    # 5. FAQs
    db.query(FAQ).delete()
    
    faqs = [
        FAQ(
            question="What services does NAMHO AI provide?",
            answer="We offer an end-to-end digital intelligence suite, including AI Automation, Custom Web & Mobile Development, UI/UX Design, and DevOps/Cloud infrastructure management.",
            category="General",
            display_order=1
        ),
        FAQ(
            question="How long does a typical project take?",
            answer="Project timelines vary widely depending on complexity. A standard web application or design system might take 4-8 weeks, while enterprise software or complex AI integrations can take several months.",
            category="Process",
            display_order=2
        ),
        FAQ(
            question="Do you offer ongoing support?",
            answer="Yes, we provide 24/7 DevOps support and various maintenance retainers to ensure your products scale effectively and remain secure after launch.",
            category="Support",
            display_order=3
        ),
        FAQ(
            question="How do you handle data privacy?",
            answer="We strictly adhere to core web security principles and local data regulations (like GDPR and CCPA) depending on where you operate. Your data and intellectual property are always protected.",
            category="Security",
            display_order=4
        ),
        FAQ(
            question="Which industries do you work with?",
            answer="We are industry-agnostic but often collaborate with FinTech, SaaS, Healthcare, and Enterprise IT companies to modernize their legacy systems and automate workflows.",
            category="Business",
            display_order=5
        )
    ]
    db.add_all(faqs)
    print("FAQs seeded successfully!")

    # 6. Blog Categories & Tags
    from app.models.blog import Category, Tag, BlogPost
    db.query(BlogPost).delete()
    db.query(Category).delete()
    db.query(Tag).delete()

    tech_category = Category(name="Technology", slug="technology", description="AI, Software Engineering, and Digital Infrastructure")
    design_category = Category(name="Design", slug="design", description="UI/UX design, visual experiences, and branding")
    db.add_all([tech_category, design_category])
    db.commit()

    tag_ai = Tag(name="AI & ML", slug="ai-ml")
    tag_web = Tag(name="Next.js", slug="nextjs")
    tag_ux = Tag(name="UI/UX", slug="ui-ux")
    db.add_all([tag_ai, tag_web, tag_ux])
    db.commit()

    # 7. Blog Posts
    posts = [
        BlogPost(
            title="The Future of Autonomous AI Agents in Enterprise Workflows",
            slug="future-autonomous-ai-agents-enterprise",
            excerpt="Discover how next-generation AI agents are moving beyond simple chat interfaces to automate end-to-end business operations.",
            content="""# The Future of Autonomous AI Agents in Enterprise Workflows

Autonomous AI agents are transforming the enterprise landscape. Rather than just responding to prompts, modern agentic systems can coordinate tasks, make API requests, handle databases, and adapt to changing requirements in real-time.

## From Chatbots to Agentic Automation
Traditional chatbots are reactive. They wait for a user query and provide a single response. AI agents are proactive:
1. **Goal-driven**: You specify the end goal, and the agent plans the path.
2. **Stateful**: They maintain memory of past actions and context.
3. **Tool-using**: They can invoke external APIs, read/write files, and query search engines.

## Key Abstractions in Agent Workflows
At NAMHO AI, we build agentic architectures using modular frameworks:
* **Orchestrator**: Evaluates the goal and generates a plan.
* **Executor**: Executes individual tasks and handles unexpected errors.
* **Validator**: Audits output quality against constraints.

By shifting workflows to autonomous agents, companies reduce operational overhead by up to 80% while enhancing speed and accuracy.
""",
            author="Dr. Alex Rivera",
            category_id=tech_category.id,
            image_url="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
            is_published=True,
            publish_date=datetime.datetime.now(),
            reading_time=5,
            meta_title="The Future of Autonomous AI Agents | NAMHO AI",
            meta_description="How autonomous AI agents are automating enterprise workflows and replacing legacy chatbots."
        ),
        BlogPost(
            title="Building Immersive Visual Interfaces: The Liquid Glass Aesthetic",
            slug="building-immersive-visual-interfaces-liquid-glass",
            excerpt="An inside look at our design philosophy, leveraging TailwindCSS filters, backdrop blur, and shaders to create premium user experiences.",
            content="""# Building Immersive Visual Interfaces: The Liquid Glass Aesthetic

In a crowded digital marketplace, premium design is a key differentiator. At NAMHO AI, we combine glassmorphism, subtle gradients, and custom shaders to deliver interfaces that feel alive and responsive.

## Core Design Principles
* **Depth**: Leveraging HSL color tokens and layers to draw focus.
* **Micro-animations**: Tiny hover and transition effects that make elements feel responsive.
* **Aura Glows**: Using CSS radial gradients to create organic, glowing lighting.

Premium aesthetic design translates directly to user trust and retention.
""",
            author="Sarah Chen",
            category_id=design_category.id,
            image_url="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg",
            is_published=True,
            publish_date=datetime.datetime.now(),
            reading_time=4,
            meta_title="Immersive Visual Interfaces and Glassmorphism | NAMHO AI",
            meta_description="How to implement the premium liquid glass design system using modern web technologies."
        )
    ]
    posts[0].tags.append(tag_ai)
    posts[1].tags.append(tag_ux)
    db.add_all(posts)
    db.commit()
    print("Blog posts seeded successfully!")

    db.close()
    print("Database seeding completed!")

if __name__ == "__main__":
    seed_db()
