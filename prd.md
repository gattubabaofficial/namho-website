# Product Requirements Document (PRD)
## Namho - Digital Marketing & Technology Company Website
**Document Version:** 1.0  
**Date:** January 2026  
**Author:** Technical Team  
**Status:** Draft
---
## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Stakeholders](#3-stakeholders)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [System Architecture](#6-system-architecture)
7. [Database Design](#7-database-design)
8. [Class Diagrams](#8-class-diagrams)
9. [ER Diagrams](#9-er-diagrams)
10. [Sequence Diagrams](#10-sequence-diagrams)
11. [Use Case Diagrams](#11-use-case-diagrams)
12. [Data Flow Diagrams](#12-data-flow-diagrams)
13. [API Design](#13-api-design)
14. [Component Diagram](#14-component-diagram)
15. [Deployment Diagram](#15-deployment-diagram)
16. [User Stories](#16-user-stories)
17. [Wireframes](#17-wireframes)
18. [Technology Stack](#18-technology-stack)
19. [Security Requirements](#19-security-requirements)
20. [Timeline & Milestones](#20-timeline--milestones)
---
## 1. Executive Summary
### 1.1 Purpose
This document outlines the complete product requirements for Namho' corporate website - a comprehensive digital platform showcasing technology services (software development, web development, DevOps, AI/ML) and digital marketing services (SEO, PPC, social media marketing, content marketing).
### 1.2 Objectives
- Establish strong online presence for Namho
- Showcase company services, portfolio, and expertise
- Generate leads through contact forms and CTAs
- Provide content marketing through blog
- Enable easy content management through admin panel
- Build trust through testimonials and case studies
### 1.3 Scope
| In Scope | Out of Scope |
|----------|--------------|
| Public website (13+ pages) | E-commerce functionality |
| Admin CMS panel | Payment processing |
| Contact form with email | Client portal/dashboard |
| Blog system | Project management tools |
| Portfolio showcase | Real-time chat support |
| Team & testimonials | Multi-language support (Phase 1) |
---
## 2. Project Overview
### 2.1 Problem Statement
Namho needs a professional, scalable website that:
- Represents the company's dual expertise in technology and marketing
- Allows non-technical staff to update content without code changes
- Captures leads effectively through multiple touchpoints
- Showcases past work to build credibility
### 2.2 Solution
A modern, responsive website with:
- **Frontend:** React + Next.js/Vite for optimal performance
- **Backend:** Python (FastAPI/Django) for robust API
- **Database:** PostgreSQL for relational data
- **CMS:** Custom admin panel for content management
### 2.3 Success Metrics
| Metric | Target |
|--------|--------|
| Page Load Time | < 3 seconds |
| Mobile Responsiveness | 100% |
| Contact Form Submissions | 50+/month |
| Blog Traffic | 1000+ visits/month |
| SEO Score | 90+ |
| Uptime | 99.9% |
---
## 3. Stakeholders
### 3.1 Stakeholder Matrix
```
┌─────────────────────────────────────────────────────────────────┐
│                     STAKEHOLDER MATRIX                          │
├──────────────────┬──────────────┬───────────────┬──────────────┤
│ Stakeholder      │ Role         │ Interest      │ Influence    │
├──────────────────┼──────────────┼───────────────┼──────────────┤
│ CEO              │ Sponsor      │ High          │ High         │
│ Marketing Head   │ User         │ High          │ Medium       │
│ Sales Team       │ User         │ High          │ Medium       │
│ Dev Team         │ Builder      │ Medium        │ High         │
│ Content Team     │ User         │ High          │ Low          │
│ Website Visitors │ End User     │ High          │ Low          │
│ Potential Clients│ End User     │ High          │ Medium       │
└──────────────────┴──────────────┴───────────────┴──────────────┘
```
---
## 4. Functional Requirements
### 4.1 Public Website Features
#### FR-001: Homepage
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001.1 | Hero section with company tagline and CTA | Must Have |
| FR-001.2 | Services overview (6 featured) | Must Have |
| FR-001.3 | Company statistics display | Should Have |
| FR-001.4 | Portfolio preview (4 projects) | Must Have |
| FR-001.5 | Testimonials carousel | Should Have |
| FR-001.6 | Blog preview section | Should Have |
| FR-001.7 | Technology stack showcase | Could Have |
| FR-001.8 | Process/methodology section | Should Have |
#### FR-002: About Page
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-002.1 | Company story/history | Must Have |
| FR-002.2 | Mission, Vision, Values | Must Have |
| FR-002.3 | Team member profiles | Must Have |
| FR-002.4 | Company statistics | Should Have |
#### FR-003: Services Page
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-003.1 | List all services with descriptions | Must Have |
| FR-003.2 | Category filtering (Tech/Marketing) | Must Have |
| FR-003.3 | Individual service detail view | Should Have |
| FR-003.4 | Related services suggestions | Could Have |
#### FR-004: Portfolio Page
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-004.1 | Project grid with thumbnails | Must Have |
| FR-004.2 | Category-based filtering | Must Have |
| FR-004.3 | Project detail modal/page | Must Have |
| FR-004.4 | Technology tags display | Should Have |
| FR-004.5 | Live project links | Could Have |
#### FR-005: Blog System
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-005.1 | Blog listing page with pagination | Must Have |
| FR-005.2 | Category filtering | Must Have |
| FR-005.3 | Individual blog post page | Must Have |
| FR-005.4 | Related posts suggestions | Should Have |
| FR-005.5 | Social sharing buttons | Could Have |
| FR-005.6 | Search functionality | Could Have |
#### FR-006: Contact System
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-006.1 | Contact form with validation | Must Have |
| FR-006.2 | Form fields: name, email, phone, subject, message | Must Have |
| FR-006.3 | Email notification to admin | Must Have |
| FR-006.4 | Success/error feedback | Must Have |
| FR-006.5 | Spam protection (captcha) | Should Have |
### 4.2 Admin Panel Features
#### FR-007: Authentication
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-007.1 | Secure login with password | Must Have |
| FR-007.2 | Password change functionality | Must Have |
| FR-007.3 | Session management | Must Have |
| FR-007.4 | Logout functionality | Must Have |
#### FR-008: Content Management
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-008.1 | CRUD operations for Services | Must Have |
| FR-008.2 | CRUD operations for Projects | Must Have |
| FR-008.3 | CRUD operations for Blog Posts | Must Have |
| FR-008.4 | CRUD operations for Team Members | Must Have |
| FR-008.5 | CRUD operations for Testimonials | Must Have |
| FR-008.6 | CRUD operations for FAQs | Must Have |
| FR-008.7 | Site settings management | Must Have |
| FR-008.8 | Contact message inbox | Must Have |
---
## 5. Non-Functional Requirements
### 5.1 Performance Requirements
```
┌────────────────────────────────────────────────────────┐
│              PERFORMANCE REQUIREMENTS                   │
├────────────────────────┬───────────────────────────────┤
│ Metric                 │ Requirement                   │
├────────────────────────┼───────────────────────────────┤
│ Page Load Time         │ < 3 seconds (first load)      │
│ Time to Interactive    │ < 2 seconds                   │
│ API Response Time      │ < 500ms (95th percentile)     │
│ Database Query Time    │ < 100ms                       │
│ Concurrent Users       │ Support 1000+ simultaneous    │
│ Image Optimization     │ WebP format, lazy loading     │
│ Caching                │ CDN + Browser caching         │
└────────────────────────┴───────────────────────────────┘
```
### 5.2 Scalability Requirements
- Horizontal scaling support for backend
- Database connection pooling
- Stateless API design
- CDN for static assets
### 5.3 Availability Requirements
- 99.9% uptime SLA
- Automated failover
- Health check endpoints
- Graceful degradation
### 5.4 Security Requirements
- HTTPS everywhere
- SQL injection prevention
- XSS protection
- CSRF tokens
- Input validation/sanitization
- Rate limiting on APIs
- Secure password hashing (bcrypt)
---
## 6. System Architecture
### 6.1 High-Level Architecture Diagram
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SYSTEM ARCHITECTURE                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ┌─────────────┐
                                    │   USERS     │
                                    │ (Browser)   │
                                    └──────┬──────┘
                                           │
                                           ▼
                              ┌────────────────────────┐
                              │      CDN (CloudFlare)  │
                              │   - Static Assets      │
                              │   - SSL Termination    │
                              │   - DDoS Protection    │
                              └───────────┬────────────┘
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    │                                           │
                    ▼                                           ▼
        ┌───────────────────────┐               ┌───────────────────────┐
        │   FRONTEND SERVER     │               │   ADMIN FRONTEND      │
        │   (Next.js/Vite)      │               │   (React SPA)         │
        │                       │               │                       │
        │  - SSR/SSG Pages      │               │  - Admin Dashboard    │
        │  - Client Routing     │               │  - Content Management │
        │  - API Integration    │               │  - Authentication     │
        └───────────┬───────────┘               └───────────┬───────────┘
                    │                                       │
                    └─────────────────┬─────────────────────┘
                                      │
                                      ▼
                         ┌────────────────────────┐
                         │     LOAD BALANCER      │
                         │      (Nginx/ALB)       │
                         └───────────┬────────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
              ▼                      ▼                      ▼
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │  API Server 1   │    │  API Server 2   │    │  API Server N   │
    │  (Python/Fast   │    │  (Python/Fast   │    │  (Python/Fast   │
    │   API)          │    │   API)          │    │   API)          │
    └────────┬────────┘    └────────┬────────┘    └────────┬────────┘
             │                      │                      │
             └──────────────────────┼──────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
          ┌─────────────────┐             ┌─────────────────┐
          │   PostgreSQL    │             │     Redis       │
          │   (Primary)     │◄───────────►│   (Cache)       │
          │                 │             │                 │
          │  - User Data    │             │  - Sessions     │
          │  - Content      │             │  - API Cache    │
          │  - Messages     │             │  - Rate Limit   │
          └────────┬────────┘             └─────────────────┘
                   │
                   ▼
          ┌─────────────────┐
          │   PostgreSQL    │
          │   (Replica)     │
          │   Read-only     │
          └─────────────────┘
                                    │
                                    ▼
                         ┌────────────────────────┐
                         │   EXTERNAL SERVICES    │
                         │                        │
                         │  - Email (SendGrid)    │
                         │  - Storage (S3)        │
                         │  - Analytics (GA)      │
                         │  - Monitoring (Sentry) │
                         └────────────────────────┘
```
### 6.2 Three-Tier Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                    THREE-TIER ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION TIER                            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Frontend (React/Next.js)               │   │
│  │                                                           │   │
│  │   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │   │  Pages  │  │Components│  │  Hooks  │  │  State  │    │   │
│  │   └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  │                                                           │   │
│  │   ┌─────────────────────────────────────────────────┐    │   │
│  │   │              API Client (Axios/Fetch)            │    │   │
│  │   └─────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└───────────────────────────────┬──────────────────────────────────┘
                                │ HTTP/HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION TIER                            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   Backend (Python/FastAPI)                │   │
│  │                                                           │   │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │   │
│  │   │   Routers   │  │   Services  │  │    Models   │      │   │
│  │   │  (API)      │  │  (Business) │  │   (Pydantic)│      │   │
│  │   └─────────────┘  └─────────────┘  └─────────────┘      │   │
│  │                                                           │   │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │   │
│  │   │Middleware   │  │    Auth     │  │  Validators │      │   │
│  │   └─────────────┘  └─────────────┘  └─────────────┘      │   │
│  │                                                           │   │
│  │   ┌─────────────────────────────────────────────────┐    │   │
│  │   │              ORM (SQLAlchemy/Tortoise)           │    │   │
│  │   └─────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└───────────────────────────────┬──────────────────────────────────┘
                                │ SQL
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA TIER                                 │
│                                                                  │
│  ┌────────────────────────┐    ┌────────────────────────┐       │
│  │      PostgreSQL        │    │         Redis          │       │
│  │                        │    │                        │       │
│  │  ┌──────────────────┐  │    │  ┌──────────────────┐  │       │
│  │  │ services         │  │    │  │ session:*        │  │       │
│  │  │ projects         │  │    │  │ cache:*          │  │       │
│  │  │ blog_posts       │  │    │  │ rate_limit:*     │  │       │
│  │  │ team_members     │  │    │  └──────────────────┘  │       │
│  │  │ testimonials     │  │    │                        │       │
│  │  │ contact_messages │  │    └────────────────────────┘       │
│  │  │ faqs             │  │                                     │
│  │  │ site_settings    │  │    ┌────────────────────────┐       │
│  │  │ admin_users      │  │    │      File Storage      │       │
│  │  └──────────────────┘  │    │        (S3/Local)      │       │
│  │                        │    │                        │       │
│  └────────────────────────┘    │  ┌──────────────────┐  │       │
│                                │  │ /images          │  │       │
│                                │  │ /uploads         │  │       │
│                                │  │ /documents       │  │       │
│                                │  └──────────────────┘  │       │
│                                │                        │       │
│                                └────────────────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```
---
## 7. Database Design
### 7.1 Database Schema Overview
```
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE SCHEMA OVERVIEW                      │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   admin_users   │     │    services     │     │    projects     │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ username        │     │ title           │     │ title           │
│ email           │     │ description     │     │ description     │
│ password_hash   │     │ icon            │     │ category        │
│ role            │     │ category        │     │ technologies[]  │
│ created_at      │     │ features[]      │     │ image_url       │
│ updated_at      │     │ order           │     │ live_url        │
│ last_login      │     │ is_active       │     │ status          │
└─────────────────┘     │ created_at      │     │ date            │
                        │ updated_at      │     │ is_featured     │
                        └─────────────────┘     │ created_at      │
                                                │ updated_at      │
                                                └─────────────────┘
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   blog_posts    │     │   categories    │     │      tags       │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ title           │     │ name            │     │ name            │
│ slug            │     │ slug            │     │ slug            │
│ excerpt         │     │ description     │     │ created_at      │
│ content         │     │ created_at      │     └─────────────────┘
│ author          │     └─────────────────┘              │
│ category_id(FK) │──────────────┘                       │
│ image_url       │                                      │
│ published       │     ┌─────────────────┐              │
│ publish_date    │     │  blog_post_tags │              │
│ created_at      │     ├─────────────────┤              │
│ updated_at      │     │ post_id (FK)    │──────────────┤
└─────────────────┘─────│ tag_id (FK)     │──────────────┘
                        └─────────────────┘
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  team_members   │     │  testimonials   │     │      faqs       │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │     │ id (PK)         │
│ name            │     │ name            │     │ question        │
│ role            │     │ company         │     │ answer          │
│ bio             │     │ role            │     │ category        │
│ image_url       │     │ content         │     │ order           │
│ linkedin_url    │     │ rating          │     │ is_active       │
│ twitter_url     │     │ image_url       │     │ created_at      │
│ github_url      │     │ is_featured     │     │ updated_at      │
│ order           │     │ created_at      │     └─────────────────┘
│ is_active       │     │ updated_at      │
│ created_at      │     └─────────────────┘
│ updated_at      │
└─────────────────┘
┌─────────────────┐     ┌─────────────────┐
│contact_messages │     │  site_settings  │
├─────────────────┤     ├─────────────────┤
│ id (PK)         │     │ id (PK)         │
│ name            │     │ key             │
│ email           │     │ value           │
│ phone           │     │ type            │
│ subject         │     │ updated_at      │
│ message         │     └─────────────────┘
│ is_read         │
│ is_replied      │
│ replied_at      │
│ created_at      │
└─────────────────┘
```
### 7.2 Detailed Table Definitions
```sql
-- =====================================================
-- DATABASE: namho_solutions
-- =====================================================
-- -----------------------------------------------------
-- Table: admin_users
-- -----------------------------------------------------
CREATE TABLE admin_users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username        VARCHAR(50) UNIQUE NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    role            VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login      TIMESTAMP WITH TIME ZONE
);
-- -----------------------------------------------------
-- Table: services
-- -----------------------------------------------------
CREATE TABLE services (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(100) NOT NULL,
    description     TEXT NOT NULL,
    icon            VARCHAR(50) NOT NULL,
    category        VARCHAR(20) NOT NULL CHECK (category IN ('tech', 'marketing')),
    features        TEXT[] DEFAULT '{}',
    display_order   INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- -----------------------------------------------------
-- Table: projects
-- -----------------------------------------------------
CREATE TABLE projects (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(200) NOT NULL,
    description     TEXT NOT NULL,
    category        VARCHAR(50) NOT NULL,
    technologies    TEXT[] DEFAULT '{}',
    image_url       VARCHAR(500),
    live_url        VARCHAR(500),
    github_url      VARCHAR(500),
    status          VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('completed', 'in-progress', 'upcoming')),
    project_date    DATE,
    is_featured     BOOLEAN DEFAULT FALSE,
    display_order   INTEGER DEFAULT 0,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- -----------------------------------------------------
-- Table: categories (for blog)
-- -----------------------------------------------------
CREATE TABLE categories (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(50) NOT NULL,
    slug            VARCHAR(50) UNIQUE NOT NULL,
    description     TEXT,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- -----------------------------------------------------
-- Table: tags
-- -----------------------------------------------------
CREATE TABLE tags (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(50) NOT NULL,
    slug            VARCHAR(50) UNIQUE NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- -----------------------------------------------------
-- Table: blog_posts
-- -----------------------------------------------------
CREATE TABLE blog_posts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(200) NOT NULL,
    slug            VARCHAR(200) UNIQUE NOT NULL,
    excerpt         TEXT,
    content         TEXT NOT NULL,
    author          VARCHAR(100) NOT NULL,
    category_id     UUID REFERENCES categories(id) ON DELETE SET NULL,
    image_url       VARCHAR(500),
    is_published    BOOLEAN DEFAULT FALSE,
    publish_date    TIMESTAMP WITH TIME ZONE,
    view_count      INTEGER DEFAULT 0,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- -----------------------------------------------------
-- Table: blog_post_tags (Many-to-Many)
-- -----------------------------------------------------
CREATE TABLE blog_post_tags (
    post_id         UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id          UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);
-- -----------------------------------------------------
-- Table: team_members
-- -----------------------------------------------------
CREATE TABLE team_members (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    role            VARCHAR(100) NOT NULL,
    bio             TEXT,
    image_url       VARCHAR(500),
    linkedin_url    VARCHAR(500),
    twitter_url     VARCHAR(500),
    github_url      VARCHAR(500),
    display_order   INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- -----------------------------------------------------
-- Table: testimonials
-- -----------------------------------------------------
CREATE TABLE testimonials (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    company         VARCHAR(100),
    role            VARCHAR(100),
    content         TEXT NOT NULL,
    rating          INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    image_url       VARCHAR(500),
    is_featured     BOOLEAN DEFAULT FALSE,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- -----------------------------------------------------
-- Table: faqs
-- -----------------------------------------------------
CREATE TABLE faqs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question        TEXT NOT NULL,
    answer          TEXT NOT NULL,
    category        VARCHAR(50) DEFAULT 'General',
    display_order   INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- -----------------------------------------------------
-- Table: contact_messages
-- -----------------------------------------------------
CREATE TABLE contact_messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    phone           VARCHAR(20),
    subject         VARCHAR(200) NOT NULL,
    message         TEXT NOT NULL,
    is_read         BOOLEAN DEFAULT FALSE,
    is_replied      BOOLEAN DEFAULT FALSE,
    replied_at      TIMESTAMP WITH TIME ZONE,
    ip_address      VARCHAR(45),
    user_agent      TEXT,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- -----------------------------------------------------
-- Table: site_settings
-- -----------------------------------------------------
CREATE TABLE site_settings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key             VARCHAR(100) UNIQUE NOT NULL,
    value           TEXT,
    type            VARCHAR(20) DEFAULT 'text' CHECK (type IN ('text', 'json', 'html', 'number', 'boolean')),
    description     TEXT,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- -----------------------------------------------------
-- Table: activity_logs (Audit Trail)
-- -----------------------------------------------------
CREATE TABLE activity_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    action          VARCHAR(50) NOT NULL,
    entity_type     VARCHAR(50) NOT NULL,
    entity_id       UUID,
    old_values      JSONB,
    new_values      JSONB,
    ip_address      VARCHAR(45),
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_date ON blog_posts(publish_date DESC);
CREATE INDEX idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX idx_contact_messages_date ON contact_messages(created_at DESC);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
```
---
## 8. Class Diagrams
### 8.1 Backend Class Diagram (Python)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND CLASS DIAGRAM                                │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MODELS LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────┐    ┌─────────────────────┐                         │
│  │     <<abstract>>    │    │     <<abstract>>    │                         │
│  │      BaseModel      │    │    TimestampMixin   │                         │
│  ├─────────────────────┤    ├─────────────────────┤                         │
│  │ + id: UUID          │    │ + created_at: datetime│                       │
│  ├─────────────────────┤    │ + updated_at: datetime│                       │
│  │ + to_dict(): dict   │    ├─────────────────────┤                         │
│  │ + from_dict(): Self │    │ + update_timestamp() │                        │
│  └──────────┬──────────┘    └──────────┬──────────┘                         │
│             │                          │                                     │
│             └──────────┬───────────────┘                                     │
│                        │                                                     │
│    ┌───────────────────┼───────────────────┬─────────────────────┐          │
│    │                   │                   │                     │          │
│    ▼                   ▼                   ▼                     ▼          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Service   │  │   Project   │  │  BlogPost   │  │ TeamMember  │        │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤  ├─────────────┤        │
│  │ title       │  │ title       │  │ title       │  │ name        │        │
│  │ description │  │ description │  │ slug        │  │ role        │        │
│  │ icon        │  │ category    │  │ excerpt     │  │ bio         │        │
│  │ category    │  │ technologies│  │ content     │  │ image_url   │        │
│  │ features[]  │  │ image_url   │  │ author      │  │ social{}    │        │
│  │ is_active   │  │ status      │  │ category_id │  │ is_active   │        │
│  ├─────────────┤  │ live_url    │  │ tags[]      │  ├─────────────┤        │
│  │ + validate()│  │ is_featured │  │ is_published│  │ + validate()│        │
│  └─────────────┘  ├─────────────┤  ├─────────────┤  └─────────────┘        │
│                   │ + validate()│  │ + validate()│                          │
│                   └─────────────┘  │ + publish() │                          │
│                                    │ + unpublish()│                         │
│                                    └─────────────┘                          │
│                                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Testimonial │  │     FAQ     │  │ContactMsg   │  │ SiteSetting │        │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤  ├─────────────┤        │
│  │ name        │  │ question    │  │ name        │  │ key         │        │
│  │ company     │  │ answer      │  │ email       │  │ value       │        │
│  │ role        │  │ category    │  │ phone       │  │ type        │        │
│  │ content     │  │ order       │  │ subject     │  ├─────────────┤        │
│  │ rating      │  │ is_active   │  │ message     │  │ + get_typed()│       │
│  │ image_url   │  ├─────────────┤  │ is_read     │  │ + set_typed()│       │
│  │ is_featured │  │ + validate()│  │ is_replied  │  └─────────────┘        │
│  ├─────────────┤  └─────────────┘  ├─────────────┤                          │
│  │ + validate()│                   │ + mark_read()│                         │
│  └─────────────┘                   │ + mark_replied│                        │
│                                    └─────────────┘                          │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                             SERVICES LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         <<interface>>                                │    │
│  │                        BaseService[T]                                │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │ + get_all(): List[T]                                                 │    │
│  │ + get_by_id(id: UUID): Optional[T]                                   │    │
│  │ + create(data: CreateSchema): T                                      │    │
│  │ + update(id: UUID, data: UpdateSchema): T                            │    │
│  │ + delete(id: UUID): bool                                             │    │
│  └──────────────────────────────────┬──────────────────────────────────┘    │
│                                     │                                        │
│     ┌───────────┬───────────┬───────┴────┬───────────┬───────────┐          │
│     │           │           │            │           │           │          │
│     ▼           ▼           ▼            ▼           ▼           ▼          │
│ ┌─────────┐┌─────────┐┌─────────┐┌─────────────┐┌─────────┐┌─────────┐     │
│ │Service  ││Project  ││BlogPost ││TeamMember   ││Testimon-││FAQ      │     │
│ │Service  ││Service  ││Service  ││Service      ││ialServ  ││Service  │     │
│ ├─────────┤├─────────┤├─────────┤├─────────────┤├─────────┤├─────────┤     │
│ │+get_by_ ││+get_by_ ││+get_pub-││+get_active()││+get_    ││+get_by_ │     │
│ │ category││ status  ││ lished()││             ││ featured││ category│     │
│ │+reorder ││+get_    ││+get_by_ ││             ││         ││+reorder │     │
│ │         ││ featured││ slug()  ││             ││         ││         │     │
│ └─────────┘└─────────┘└─────────┘└─────────────┘└─────────┘└─────────┘     │
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │ ContactService  │  │ SettingsService │  │   AuthService   │              │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤              │
│  │ + get_unread()  │  │ + get_all()     │  │ + login()       │              │
│  │ + mark_read()   │  │ + get(key)      │  │ + logout()      │              │
│  │ + mark_replied()│  │ + set(key,value)│  │ + verify_token()│              │
│  │ + send_email()  │  │ + bulk_update() │  │ + refresh()     │              │
│  └─────────────────┘  └─────────────────┘  │ + change_pass() │              │
│                                             └─────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                             ROUTERS LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                            APIRouter                                   │  │
│  │                                                                        │  │
│  │  /api/v1                                                              │  │
│  │    ├── /auth          → AuthRouter                                    │  │
│  │    ├── /services      → ServicesRouter                                │  │
│  │    ├── /projects      → ProjectsRouter                                │  │
│  │    ├── /blog          → BlogRouter                                    │  │
│  │    ├── /team          → TeamRouter                                    │  │
│  │    ├── /testimonials  → TestimonialsRouter                            │  │
│  │    ├── /faqs          → FAQsRouter                                    │  │
│  │    ├── /contact       → ContactRouter                                 │  │
│  │    └── /settings      → SettingsRouter                                │  │
│  │                                                                        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```
### 8.2 Frontend Class Diagram (React/TypeScript)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND CLASS DIAGRAM                                │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                              TYPES/INTERFACES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │   <<interface>>     │  │   <<interface>>     │  │   <<interface>>     │  │
│  │      Service        │  │      Project        │  │     BlogPost        │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ id: string          │  │ id: string          │  │ id: string          │  │
│  │ title: string       │  │ title: string       │  │ title: string       │  │
│  │ description: string │  │ description: string │  │ slug: string        │  │
│  │ icon: string        │  │ category: string    │  │ excerpt: string     │  │
│  │ category: Category  │  │ technologies: []    │  │ content: string     │  │
│  │ features: string[]  │  │ imageUrl: string    │  │ author: string      │  │
│  └─────────────────────┘  │ liveUrl: string     │  │ category: string    │  │
│                           │ status: Status      │  │ tags: string[]      │  │
│                           │ date: string        │  │ published: boolean  │  │
│                           └─────────────────────┘  └─────────────────────┘  │
│                                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │   <<interface>>     │  │   <<interface>>     │  │   <<interface>>     │  │
│  │    TeamMember       │  │    Testimonial      │  │   ContactMessage    │  │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤  │
│  │ id: string          │  │ id: string          │  │ id: string          │  │
│  │ name: string        │  │ name: string        │  │ name: string        │  │
│  │ role: string        │  │ company: string     │  │ email: string       │  │
│  │ bio: string         │  │ role: string        │  │ phone: string       │  │
│  │ imageUrl: string    │  │ content: string     │  │ subject: string     │  │
│  │ social: SocialLinks │  │ rating: number      │  │ message: string     │  │
│  └─────────────────────┘  └─────────────────────┘  │ read: boolean       │  │
│                                                    └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                               HOOKS LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐        │
│  │   useServices     │  │   useProjects     │  │    useBlog        │        │
│  ├───────────────────┤  ├───────────────────┤  ├───────────────────┤        │
│  │ + services: []    │  │ + projects: []    │  │ + posts: []       │        │
│  │ + loading: bool   │  │ + loading: bool   │  │ + loading: bool   │        │
│  │ + error: Error    │  │ + error: Error    │  │ + error: Error    │        │
│  │ + fetchAll()      │  │ + fetchAll()      │  │ + fetchAll()      │        │
│  │ + create()        │  │ + create()        │  │ + create()        │        │
│  │ + update()        │  │ + update()        │  │ + update()        │        │
│  │ + delete()        │  │ + delete()        │  │ + delete()        │        │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘        │
│                                                                              │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐        │
│  │     useAuth       │  │   useSettings     │  │   useContact      │        │
│  ├───────────────────┤  ├───────────────────┤  ├───────────────────┤        │
│  │ + isAuth: bool    │  │ + settings: {}    │  │ + messages: []    │        │
│  │ + user: User      │  │ + loading: bool   │  │ + loading: bool   │        │
│  │ + login()         │  │ + fetchSettings() │  │ + submitForm()    │        │
│  │ + logout()        │  │ + updateSettings()│  │ + markRead()      │        │
│  │ + checkAuth()     │  │                   │  │                   │        │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                            COMPONENTS LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Layout Components          UI Components             Feature Components     │
│  ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐    │
│  │ Layout          │       │ Button          │       │ ServiceCard     │    │
│  │ Navbar          │       │ Input           │       │ ProjectCard     │    │
│  │ Footer          │       │ Modal           │       │ BlogCard        │    │
│  │ AdminLayout     │       │ Card            │       │ TeamMemberCard  │    │
│  │ Sidebar         │       │ Badge           │       │ TestimonialCard │    │
│  └─────────────────┘       │ Spinner         │       │ FAQAccordion    │    │
│                            │ Toast           │       │ ContactForm     │    │
│                            │ Dropdown        │       │ SearchBar       │    │
│                            │ Pagination      │       │ FilterTabs      │    │
│                            └─────────────────┘       └─────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```
---
## 9. ER Diagrams
### 9.1 Complete Entity Relationship Diagram
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ENTITY RELATIONSHIP DIAGRAM                              │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────┐                              ┌─────────────────┐
│   admin_users   │                              │    services     │
├─────────────────┤                              ├─────────────────┤
│ PK id           │                              │ PK id           │
│    username     │                              │    title        │
│    email        │                              │    description  │
│    password_hash│       ┌─────────────────┐    │    icon         │
│    role         │       │  activity_logs  │    │    category     │
│    is_active    │       ├─────────────────┤    │    features[]   │
│    created_at   │◄──────│ FK user_id      │    │    is_active    │
│    updated_at   │       │    action       │    │    created_at   │
│    last_login   │       │    entity_type  │    │    updated_at   │
└─────────────────┘       │    entity_id    │    └─────────────────┘
                          │    old_values   │
                          │    new_values   │
                          │    created_at   │    ┌─────────────────┐
                          └─────────────────┘    │    projects     │
                                                 ├─────────────────┤
                                                 │ PK id           │
┌─────────────────┐       ┌─────────────────┐    │    title        │
│   categories    │       │   blog_posts    │    │    description  │
├─────────────────┤       ├─────────────────┤    │    category     │
│ PK id           │◄──────│ FK category_id  │    │    technologies │
│    name         │   1:N │ PK id           │    │    image_url    │
│    slug         │       │    title        │    │    live_url     │
│    description  │       │    slug         │    │    status       │
│    created_at   │       │    excerpt      │    │    project_date │
└─────────────────┘       │    content      │    │    is_featured  │
                          │    author       │    │    created_at   │
                          │    image_url    │    │    updated_at   │
                          │    is_published │    └─────────────────┘
                          │    publish_date │
┌─────────────────┐       │    view_count   │    ┌─────────────────┐
│      tags       │       │    created_at   │    │  team_members   │
├─────────────────┤       │    updated_at   │    ├─────────────────┤
│ PK id           │       └────────┬────────┘    │ PK id           │
│    name         │                │             │    name         │
│    slug         │                │             │    role         │
│    created_at   │                │             │    bio          │
└────────┬────────┘                │             │    image_url    │
         │                         │             │    linkedin_url │
         │     ┌───────────────────┘             │    twitter_url  │
         │     │                                 │    github_url   │
         │     ▼                                 │    is_active    │
         │  ┌─────────────────┐                  │    created_at   │
         │  │ blog_post_tags  │                  │    updated_at   │
         │  ├─────────────────┤                  └─────────────────┘
         └─►│ FK post_id      │
            │ FK tag_id       │◄─────────────┐
            └─────────────────┘              │   ┌─────────────────┐
                   M:N                       │   │  testimonials   │
                                             │   ├─────────────────┤
┌─────────────────┐                          │   │ PK id           │
│      faqs       │                          │   │    name         │
├─────────────────┤                          │   │    company      │
│ PK id           │                          │   │    role         │
│    question     │                          │   │    content      │
│    answer       │                          │   │    rating       │
│    category     │       ┌─────────────────┐│   │    image_url    │
│    display_order│       │contact_messages ││   │    is_featured  │
│    is_active    │       ├─────────────────┤│   │    is_active    │
│    created_at   │       │ PK id           ││   │    created_at   │
│    updated_at   │       │    name         ││   │    updated_at   │
└─────────────────┘       │    email        ││   └─────────────────┘
                          │    phone        ││
                          │    subject      ││   ┌─────────────────┐
                          │    message      ││   │  site_settings  │
                          │    is_read      ││   ├─────────────────┤
                          │    is_replied   ││   │ PK id           │
                          │    replied_at   ││   │    key          │
                          │    ip_address   ││   │    value        │
                          │    created_at   ││   │    type         │
                          └─────────────────┘│   │    description  │
                                             │   │    updated_at   │
                                             │   └─────────────────┘
                                             │
                                             └── Legend ──────────────
                                                 PK = Primary Key
                                                 FK = Foreign Key
                                                 1:N = One to Many
                                                 M:N = Many to Many
```
### 9.2 Relationship Summary
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        RELATIONSHIP SUMMARY                                  │
├────────────────────┬────────────────────┬───────────────────────────────────┤
│ Entity 1           │ Entity 2           │ Relationship                      │
├────────────────────┼────────────────────┼───────────────────────────────────┤
│ categories         │ blog_posts         │ 1:N (One category, many posts)    │
│ blog_posts         │ tags               │ M:N (via blog_post_tags)          │
│ admin_users        │ activity_logs      │ 1:N (One user, many logs)         │
├────────────────────┼────────────────────┼───────────────────────────────────┤
│ services           │ - (standalone)     │ Independent entity                │
│ projects           │ - (standalone)     │ Independent entity                │
│ team_members       │ - (standalone)     │ Independent entity                │
│ testimonials       │ - (standalone)     │ Independent entity                │
│ faqs               │ - (standalone)     │ Independent entity                │
│ contact_messages   │ - (standalone)     │ Independent entity                │
│ site_settings      │ - (standalone)     │ Key-value configuration           │
└────────────────────┴────────────────────┴───────────────────────────────────┘
```
---
## 10. Sequence Diagrams
### 10.1 User Contact Form Submission
```
┌─────────────────────────────────────────────────────────────────────────────┐
│              SEQUENCE DIAGRAM: Contact Form Submission                       │
└─────────────────────────────────────────────────────────────────────────────┘
┌──────┐          ┌──────────┐          ┌──────────┐          ┌──────────┐
│ User │          │ Frontend │          │  Backend │          │ Database │
└──┬───┘          └────┬─────┘          └────┬─────┘          └────┬─────┘
   │                   │                     │                     │
   │  1. Fill form     │                     │                     │
   │──────────────────>│                     │                     │
   │                   │                     │                     │
   │  2. Submit        │                     │                     │
   │──────────────────>│                     │                     │
   │                   │                     │                     │
   │                   │  3. Validate input  │                     │
   │                   │─────────┐           │                     │
   │                   │         │           │                     │
   │                   │<────────┘           │                     │
   │                   │                     │                     │
   │                   │  4. POST /api/contact                     │
   │                   │────────────────────>│                     │
   │                   │                     │                     │
   │                   │                     │  5. Validate        │
   │                   │                     │─────────┐           │
   │                   │                     │         │           │
   │                   │                     │<────────┘           │
   │                   │                     │                     │
   │                   │                     │  6. INSERT message  │
   │                   │                     │────────────────────>│
   │                   │                     │                     │
   │                   │                     │  7. Success         │
   │                   │                     │<────────────────────│
   │                   │                     │                     │
   │                   │                     │  8. Send email     ─┼─────────┐
   │                   │                     │    notification     │         │
   │                   │                     │                     │   (Email
   │                   │                     │                     │   Service)
   │                   │  9. Return 201      │                     │
   │                   │<────────────────────│                     │
   │                   │                     │                     │
   │  10. Show success │                     │                     │
   │<──────────────────│                     │                     │
   │      message      │                     │                     │
   │                   │                     │                     │
└──┴───┘          └────┴─────┘          └────┴─────┘          └────┴─────┘
```
### 10.2 Admin Login Flow
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  SEQUENCE DIAGRAM: Admin Login                               │
└─────────────────────────────────────────────────────────────────────────────┘
┌───────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│ Admin │         │ Frontend │         │  Backend │         │ Database │
└───┬───┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
    │                  │                    │                    │
    │ 1. Navigate to   │                    │                    │
    │    /admin/login  │                    │                    │
    │─────────────────>│                    │                    │
    │                  │                    │                    │
    │ 2. Enter         │                    │                    │
    │    credentials   │                    │                    │
    │─────────────────>│                    │                    │
    │                  │                    │                    │
    │                  │ 3. POST /api/auth/login                 │
    │                  │   {email, password}│                    │
    │                  │───────────────────>│                    │
    │                  │                    │                    │
    │                  │                    │ 4. SELECT user     │
    │                  │                    │    WHERE email=?   │
    │                  │                    │───────────────────>│
    │                  │                    │                    │
    │                  │                    │ 5. Return user     │
    │                  │                    │<───────────────────│
    │                  │                    │                    │
    │                  │                    │ 6. Verify password │
    │                  │                    │   bcrypt.compare() │
    │                  │                    │────────┐           │
    │                  │                    │        │           │
    │                  │                    │<───────┘           │
    │                  │                    │                    │
    │                  │                    │ 7. Generate JWT    │
    │                  │                    │────────┐           │
    │                  │                    │        │           │
    │                  │                    │<───────┘           │
    │                  │                    │                    │
    │                  │                    │ 8. UPDATE last_login
    │                  │                    │───────────────────>│
    │                  │                    │                    │
    │                  │ 9. Return token    │                    │
    │                  │   + user data      │                    │
    │                  │<───────────────────│                    │
    │                  │                    │                    │
    │                  │ 10. Store token    │                    │
    │                  │    in localStorage │                    │
    │                  │────────┐           │                    │
    │                  │        │           │                    │
    │                  │<───────┘           │                    │
    │                  │                    │                    │
    │ 11. Redirect to  │                    │                    │
    │     /admin       │                    │                    │
    │<─────────────────│                    │                    │
    │                  │                    │                    │
└───┴───┘         └────┴─────┘         └────┴─────┘         └────┴─────┘
```
### 10.3 Blog Post Creation
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                SEQUENCE DIAGRAM: Blog Post Creation                          │
└─────────────────────────────────────────────────────────────────────────────┘
┌───────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐      ┌─────┐
│ Admin │       │ Frontend │       │  Backend │       │ Database │      │Cache│
└───┬───┘       └────┬─────┘       └────┬─────┘       └────┬─────┘      └──┬──┘
    │                │                  │                  │               │
    │ 1. Click       │                  │                  │               │
    │   "New Post"   │                  │                  │               │
    │───────────────>│                  │                  │               │
    │                │                  │                  │               │
    │ 2. Fill form:  │                  │                  │               │
    │   title,       │                  │                  │               │
    │   content, etc │                  │                  │               │
    │───────────────>│                  │                  │               │
    │                │                  │                  │               │
    │ 3. Submit      │                  │                  │               │
    │───────────────>│                  │                  │               │
    │                │                  │                  │               │
    │                │ 4. Validate      │                  │               │
    │                │    client-side   │                  │               │
    │                │─────────┐        │                  │               │
    │                │         │        │                  │               │
    │                │<────────┘        │                  │               │
    │                │                  │                  │               │
    │                │ 5. POST /api/blog                   │               │
    │                │   Authorization: │                  │               │
    │                │   Bearer {token} │                  │               │
    │                │─────────────────>│                  │               │
    │                │                  │                  │               │
    │                │                  │ 6. Verify JWT    │               │
    │                │                  │─────────┐        │               │
    │                │                  │         │        │               │
    │                │                  │<────────┘        │               │
    │                │                  │                  │               │
    │                │                  │ 7. Validate data │               │
    │                │                  │─────────┐        │               │
    │                │                  │         │        │               │
    │                │                  │<────────┘        │               │
    │                │                  │                  │               │
    │                │                  │ 8. Generate slug │               │
    │                │                  │─────────┐        │               │
    │                │                  │         │        │               │
    │                │                  │<────────┘        │               │
    │                │                  │                  │               │
    │                │                  │ 9. INSERT post   │               │
    │                │                  │─────────────────>│               │
    │                │                  │                  │               │
    │                │                  │ 10. Insert tags  │               │
    │                │                  │─────────────────>│               │
    │                │                  │                  │               │
    │                │                  │ 11. Success      │               │
    │                │                  │<─────────────────│               │
    │                │                  │                  │               │
    │                │                  │ 12. Invalidate   │               │
    │                │                  │     blog cache   │               │
    │                │                  │─────────────────────────────────>│
    │                │                  │                  │               │
    │                │                  │ 13. Log activity │               │
    │                │                  │─────────────────>│               │
    │                │                  │                  │               │
    │                │ 14. Return 201   │                  │               │
    │                │    + post data   │                  │               │
    │                │<─────────────────│                  │               │
    │                │                  │                  │               │
    │ 15. Show       │                  │                  │               │
    │    success     │                  │                  │               │
    │<───────────────│                  │                  │               │
    │                │                  │                  │               │
└───┴───┘       └────┴─────┘       └────┴─────┘       └────┴─────┘      └──┴──┘
```
### 10.4 Public Page Load (with Caching)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│            SEQUENCE DIAGRAM: Public Page Load with Caching                   │
└─────────────────────────────────────────────────────────────────────────────┘
┌──────┐        ┌─────┐        ┌──────────┐        ┌──────────┐        ┌─────┐
│ User │        │ CDN │        │ Frontend │        │  Backend │        │Cache│
└──┬───┘        └──┬──┘        └────┬─────┘        └────┬─────┘        └──┬──┘
   │               │                │                   │                 │
   │ 1. Request    │                │                   │                 │
   │    /services  │                │                   │                 │
   │──────────────>│                │                   │                 │
   │               │                │                   │                 │
   │               │ 2. Check cache │                   │                 │
   │               │───────┐        │                   │                 │
   │               │       │        │                   │                 │
   │               │<──────┘        │                   │                 │
   │               │                │                   │                 │
   │               │  [Cache MISS]  │                   │                 │
   │               │                │                   │                 │
   │               │ 3. Forward     │                   │                 │
   │               │    request     │                   │                 │
   │               │───────────────>│                   │                 │
   │               │                │                   │                 │
   │               │                │ 4. SSR/SSG        │                 │
   │               │                │    render page    │                 │
   │               │                │─────────┐         │                 │
   │               │                │         │         │                 │
   │               │                │<────────┘         │                 │
   │               │                │                   │                 │
   │               │                │ 5. GET /api/services                │
   │               │                │──────────────────>│                 │
   │               │                │                   │                 │
   │               │                │                   │ 6. Check cache  │
   │               │                │                   │────────────────>│
   │               │                │                   │                 │
   │               │                │                   │ 7. [Cache HIT]  │
   │               │                │                   │<────────────────│
   │               │                │                   │                 │
   │               │                │ 8. Return data    │                 │
   │               │                │<──────────────────│                 │
   │               │                │                   │                 │
   │               │                │ 9. Render HTML    │                 │
   │               │                │─────────┐         │                 │
   │               │                │         │         │                 │
   │               │                │<────────┘         │                 │
   │               │                │                   │                 │
   │               │ 10. Return     │                   │                 │
   │               │     HTML       │                   │                 │
   │               │<───────────────│                   │                 │
   │               │                │                   │                 │
   │               │ 11. Store in   │                   │                 │
   │               │     CDN cache  │                   │                 │
   │               │───────┐        │                   │                 │
   │               │       │        │                   │                 │
   │               │<──────┘        │                   │                 │
   │               │                │                   │                 │
   │ 12. Return    │                │                   │                 │
   │     page      │                │                   │                 │
   │<──────────────│                │                   │                 │
   │               │                │                   │                 │
└──┴───┘        └──┴──┘        └────┴─────┘        └────┴─────┘        └──┴──┘
```
---
## 11. Use Case Diagrams
### 11.1 Public Website Use Cases
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   USE CASE DIAGRAM: Public Website                           │
└─────────────────────────────────────────────────────────────────────────────┘
                              ┌─────────────────────────────────────┐
                              │         Namho Website            │
                              │            <<system>>               │
                              │                                     │
                              │  ┌─────────────────────────────┐   │
                              │  │      View Homepage          │   │
    ┌─────────────┐          │  └──────────────┬──────────────┘   │
    │             │          │                 │                   │
    │   Website   │          │  ┌──────────────┴──────────────┐   │
    │   Visitor   │──────────┼─>│      View About Page        │   │
    │             │          │  └──────────────┬──────────────┘   │
    │  <<actor>>  │          │                 │                   │
    │             │          │  ┌──────────────┴──────────────┐   │
    └──────┬──────┘          │  │      Browse Services        │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           │                 │  │      View Portfolio         │   │
           ├─────────────────┼─>│                             │   │
           │                 │  │  ┌───────────────────────┐  │   │
           │                 │  │  │ Filter by Category    │  │   │
           │                 │  │  └───────────────────────┘  │   │
           │                 │  │  ┌───────────────────────┐  │   │
           │                 │  │  │ View Project Details  │  │   │
           │                 │  │  └───────────────────────┘  │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           │                 │  │        Read Blog            │   │
           ├─────────────────┼─>│                             │   │
           │                 │  │  ┌───────────────────────┐  │   │
           │                 │  │  │ Filter by Category    │  │   │
           │                 │  │  └───────────────────────┘  │   │
           │                 │  │  ┌───────────────────────┐  │   │
           │                 │  │  │ Read Full Article     │  │   │
           │                 │  │  └───────────────────────┘  │   │
           │                 │  │  ┌───────────────────────┐  │   │
           │                 │  │  │ Share Article         │  │   │
           │                 │  │  └───────────────────────┘  │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           ├─────────────────┼─>│        View FAQs            │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           │                 │  │     Submit Contact Form     │   │
           └─────────────────┼─>│                             │   │
                             │  │  ┌───────────────────────┐  │   │
    ┌─────────────┐          │  │  │ Select Subject        │  │   │
    │             │          │  │  └───────────────────────┘  │   │
    │    Email    │          │  │  ┌───────────────────────┐  │   │
    │   Service   │<─ ─ ─ ─ ─│─ │  │ Receive Confirmation  │  │   │
    │             │          │  │  └───────────────────────┘  │   │
    │  <<system>> │          │  └─────────────────────────────┘   │
    │             │          │                                     │
    └─────────────┘          └─────────────────────────────────────┘
                             Legend:
                             ────── Association
                             ─ ─ ─  Include/Extend
```
### 11.2 Admin Panel Use Cases
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    USE CASE DIAGRAM: Admin Panel                             │
└─────────────────────────────────────────────────────────────────────────────┘
                              ┌─────────────────────────────────────┐
                              │          Admin Panel                │
                              │          <<system>>                 │
                              │                                     │
    ┌─────────────┐          │  ┌─────────────────────────────┐   │
    │             │          │  │         Login               │   │
    │    Admin    │──────────┼─>│                             │   │
    │    User     │          │  │  ┌───────────────────────┐  │   │
    │             │          │  │  │ Change Password       │  │   │
    │  <<actor>>  │          │  │  └───────────────────────┘  │   │
    │             │          │  └──────────────┬──────────────┘   │
    └──────┬──────┘          │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           │                 │  │    Manage Services          │   │
           │                 │  │                             │   │
           │                 │  │  ┌───────────────────────┐  │   │
           │                 │  │  │ Create Service        │  │   │
           ├─────────────────┼─>│  ├───────────────────────┤  │   │
           │                 │  │  │ Update Service        │  │   │
           │                 │  │  ├───────────────────────┤  │   │
           │                 │  │  │ Delete Service        │  │   │
           │                 │  │  ├───────────────────────┤  │   │
           │                 │  │  │ Reorder Services      │  │   │
           │                 │  │  └───────────────────────┘  │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           │                 │  │    Manage Projects          │   │
           ├─────────────────┼─>│  (CRUD Operations)          │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           │                 │  │    Manage Blog Posts        │   │
           │                 │  │                             │   │
           │                 │  │  ┌───────────────────────┐  │   │
           ├─────────────────┼─>│  │ Create/Edit Post      │  │   │
           │                 │  │  ├───────────────────────┤  │   │
           │                 │  │  │ Publish/Unpublish     │  │   │
           │                 │  │  ├───────────────────────┤  │   │
           │                 │  │  │ Manage Categories     │  │   │
           │                 │  │  ├───────────────────────┤  │   │
           │                 │  │  │ Manage Tags           │  │   │
           │                 │  │  └───────────────────────┘  │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           ├─────────────────┼─>│    Manage Team Members      │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           ├─────────────────┼─>│    Manage Testimonials      │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           │                 │  │    View Contact Messages    │   │
           ├─────────────────┼─>│                             │   │
           │                 │  │  ┌───────────────────────┐  │   │
           │                 │  │  │ Mark as Read          │  │   │
           │                 │  │  ├───────────────────────┤  │   │
           │                 │  │  │ Reply via Email       │  │   │
           │                 │  │  ├───────────────────────┤  │   │
           │                 │  │  │ Delete Message        │  │   │
           │                 │  │  └───────────────────────┘  │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           ├─────────────────┼─>│    Manage FAQs              │   │
           │                 │  └──────────────┬──────────────┘   │
           │                 │                 │                   │
           │                 │  ┌──────────────┴──────────────┐   │
           │                 │  │    Site Settings            │   │
           └─────────────────┼─>│                             │   │
                             │  │  ┌───────────────────────┐  │   │
                             │  │  │ Update Company Info   │  │   │
                             │  │  ├───────────────────────┤  │   │
                             │  │  │ Update Social Links   │  │   │
                             │  │  ├───────────────────────┤  │   │
                             │  │  │ Update About/Mission  │  │   │
                             │  │  └───────────────────────┘  │   │
                             │  └─────────────────────────────┘   │
                             │                                     │
                             └─────────────────────────────────────┘
```
---
## 12. Data Flow Diagrams
### 12.1 Level 0 - Context Diagram
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DATA FLOW DIAGRAM - Level 0                             │
│                         (Context Diagram)                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                           Contact Inquiry
    ┌──────────────┐      ──────────────────>      ┌────────────────────┐
    │              │                               │                    │
    │   Website    │      Website Content          │     Namho       │
    │   Visitor    │      <──────────────────      │     Solutions      │
    │              │                               │     Website        │
    └──────────────┘                               │                    │
                                                   │      System        │
                           Admin Commands          │                    │
    ┌──────────────┐      ──────────────────>      │         0          │
    │              │                               │                    │
    │    Admin     │      System Feedback          │                    │
    │    User      │      <──────────────────      └─────────┬──────────┘
    │              │                                         │
    └──────────────┘                                         │
                                                             │
                                                             │
                           Notification                      │
    ┌──────────────┐      <──────────────────────────────────┤
    │              │                                         │
    │   Email      │      Send Request                       │
    │   Service    │      ──────────────────────────────────>│
    │              │                                         │
    └──────────────┘                                         │
                                                             │
                           Store/Retrieve                    │
    ┌──────────────┐      <──────────────────────────────────┘
    │              │      ──────────────────────────────────>
    │   Database   │
    │              │
    └──────────────┘
```
### 12.2 Level 1 - Main Processes
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DATA FLOW DIAGRAM - Level 1                             │
└─────────────────────────────────────────────────────────────────────────────┘
┌──────────────┐
│   Website    │
│   Visitor    │
└──────┬───────┘
       │
       │ Page Request
       ▼
┌──────────────────┐         ┌──────────────────┐
│                  │ Query   │                  │
│   1.0 Content    │────────>│   D1 Services    │
│   Delivery       │<────────│   D2 Projects    │
│   System         │  Data   │   D3 Blog        │
│                  │         │   D4 Team        │
└────────┬─────────┘         │   D5 Testimonials│
         │                   │   D6 FAQs        │
         │ HTML/JSON         └──────────────────┘
         ▼
┌──────────────┐
│   Website    │
│   Visitor    │
└──────────────┘
┌──────────────┐
│   Website    │
│   Visitor    │
└──────┬───────┘
       │
       │ Contact Form Data
       ▼
┌──────────────────┐         ┌──────────────────┐
│                  │ Store   │                  │
│   2.0 Contact    │────────>│  D7 Contact      │
│   Processing     │         │  Messages        │
│                  │         │                  │
└────────┬─────────┘         └──────────────────┘
         │
         │ Send Notification
         ▼
┌──────────────┐
│   Email      │
│   Service    │
└──────────────┘
┌──────────────┐
│    Admin     │
│    User      │
└──────┬───────┘
       │
       │ Login Credentials
       ▼
┌──────────────────┐         ┌──────────────────┐
│                  │ Verify  │                  │
│   3.0 Auth       │────────>│  D8 Admin Users  │
│   System         │<────────│                  │
│                  │ Result  │                  │
└────────┬─────────┘         └──────────────────┘
         │
         │ JWT Token
         ▼
┌──────────────┐
│    Admin     │
│    User      │
└──────────────┘
┌──────────────┐
│    Admin     │
│    User      │
└──────┬───────┘
       │
       │ CRUD Operations
       ▼
┌──────────────────┐         ┌──────────────────┐
│                  │ R/W     │                  │
│   4.0 Content    │────────>│  All Data Stores │
│   Management     │<────────│  D1-D8           │
│   System         │         │                  │
└────────┬─────────┘         └──────────────────┘
         │
         │ Operation Result
         ▼
┌──────────────┐
│    Admin     │
│    User      │
└──────────────┘
```
---
## 13. API Design
### 13.1 RESTful API Endpoints
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           API ENDPOINTS                                      │
└─────────────────────────────────────────────────────────────────────────────┘
Base URL: https://api.namho.com/v1
┌──────────────────────────────────────────────────────────────────────────────┐
│ AUTHENTICATION                                                                │
├────────────┬─────────────────────────┬───────────────────────────────────────┤
│ Method     │ Endpoint                │ Description                           │
├────────────┼─────────────────────────┼───────────────────────────────────────┤
│ POST       │ /auth/login             │ Admin login, returns JWT              │
│ POST       │ /auth/logout            │ Invalidate session                    │
│ POST       │ /auth/refresh           │ Refresh access token                  │
│ POST       │ /auth/change-password   │ Change admin password                 │
│ GET        │ /auth/me                │ Get current user info                 │
└────────────┴─────────────────────────┴───────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ SERVICES (Public: GET, Admin: Full CRUD)                                     │
├────────────┬─────────────────────────┬───────────────────────────────────────┤
│ Method     │ Endpoint                │ Description                           │
├────────────┼─────────────────────────┼───────────────────────────────────────┤
│ GET        │ /services               │ List all active services              │
│ GET        │ /services/:id           │ Get service by ID                     │
│ GET        │ /services?category=tech │ Filter by category                    │
│ POST       │ /services               │ Create new service (Auth)             │
│ PUT        │ /services/:id           │ Update service (Auth)                 │
│ DELETE     │ /services/:id           │ Delete service (Auth)                 │
│ PATCH      │ /services/reorder       │ Reorder services (Auth)               │
└────────────┴─────────────────────────┴───────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ PROJECTS (Public: GET, Admin: Full CRUD)                                     │
├────────────┬─────────────────────────┬───────────────────────────────────────┤
│ Method     │ Endpoint                │ Description                           │
├────────────┼─────────────────────────┼───────────────────────────────────────┤
│ GET        │ /projects               │ List all projects                     │
│ GET        │ /projects/:id           │ Get project by ID                     │
│ GET        │ /projects?status=done   │ Filter by status                      │
│ GET        │ /projects?featured=true │ Get featured projects                 │
│ POST       │ /projects               │ Create project (Auth)                 │
│ PUT        │ /projects/:id           │ Update project (Auth)                 │
│ DELETE     │ /projects/:id           │ Delete project (Auth)                 │
└────────────┴─────────────────────────┴───────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ BLOG (Public: GET published, Admin: Full CRUD)                               │
├────────────┬─────────────────────────┬───────────────────────────────────────┤
│ Method     │ Endpoint                │ Description                           │
├────────────┼─────────────────────────┼───────────────────────────────────────┤
│ GET        │ /blog                   │ List published posts                  │
│ GET        │ /blog/:slug             │ Get post by slug                      │
│ GET        │ /blog?category=tech     │ Filter by category                    │
│ GET        │ /blog?tag=react         │ Filter by tag                         │
│ GET        │ /blog/admin             │ List all posts (Auth)                 │
│ POST       │ /blog                   │ Create post (Auth)                    │
│ PUT        │ /blog/:id               │ Update post (Auth)                    │
│ PATCH      │ /blog/:id/publish       │ Publish/unpublish (Auth)              │
│ DELETE     │ /blog/:id               │ Delete post (Auth)                    │
├────────────┼─────────────────────────┼───────────────────────────────────────┤
│ GET        │ /categories             │ List blog categories                  │
│ POST       │ /categories             │ Create category (Auth)                │
│ GET        │ /tags                   │ List tags                             │
│ POST       │ /tags                   │ Create tag (Auth)                     │
└────────────┴─────────────────────────┴───────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ TEAM MEMBERS (Public: GET active, Admin: Full CRUD)                          │
├────────────┬─────────────────────────┬───────────────────────────────────────┤
│ Method     │ Endpoint                │ Description                           │
├────────────┼─────────────────────────┼───────────────────────────────────────┤
│ GET        │ /team                   │ List active team members              │
│ GET        │ /team/:id               │ Get member by ID                      │
│ POST       │ /team                   │ Add team member (Auth)                │
│ PUT        │ /team/:id               │ Update member (Auth)                  │
│ DELETE     │ /team/:id               │ Remove member (Auth)                  │
└────────────┴─────────────────────────┴───────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ TESTIMONIALS (Public: GET active, Admin: Full CRUD)                          │
├────────────┬─────────────────────────┬───────────────────────────────────────┤
│ Method     │ Endpoint                │ Description                           │
├────────────┼─────────────────────────┼───────────────────────────────────────┤
│ GET        │ /testimonials           │ List active testimonials              │
│ GET        │ /testimonials?featured  │ Get featured only                     │
│ POST       │ /testimonials           │ Add testimonial (Auth)                │
│ PUT        │ /testimonials/:id       │ Update testimonial (Auth)             │
│ DELETE     │ /testimonials/:id       │ Delete testimonial (Auth)             │
└────────────┴─────────────────────────┴───────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ FAQS (Public: GET active, Admin: Full CRUD)                                  │
├────────────┬─────────────────────────┬───────────────────────────────────────┤
│ Method     │ Endpoint                │ Description                           │
├────────────┼─────────────────────────┼───────────────────────────────────────┤
│ GET        │ /faqs                   │ List active FAQs                      │
│ GET        │ /faqs?category=pricing  │ Filter by category                    │
│ POST       │ /faqs                   │ Add FAQ (Auth)                        │
│ PUT        │ /faqs/:id               │ Update FAQ (Auth)                     │
│ DELETE     │ /faqs/:id               │ Delete FAQ (Auth)                     │
│ PATCH      │ /faqs/reorder           │ Reorder FAQs (Auth)                   │
└────────────┴─────────────────────────┴───────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ CONTACT (Public: POST, Admin: GET/PATCH/DELETE)                              │
├────────────┬─────────────────────────┬───────────────────────────────────────┤
│ Method     │ Endpoint                │ Description                           │
├────────────┼─────────────────────────┼───────────────────────────────────────┤
│ POST       │ /contact                │ Submit contact form (Public)          │
│ GET        │ /contact                │ List all messages (Auth)              │
│ GET        │ /contact?unread=true    │ Get unread messages (Auth)            │
│ PATCH      │ /contact/:id/read       │ Mark as read (Auth)                   │
│ PATCH      │ /contact/:id/replied    │ Mark as replied (Auth)                │
│ DELETE     │ /contact/:id            │ Delete message (Auth)                 │
└────────────┴─────────────────────────┴───────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ SETTINGS (Admin only)                                                        │
├────────────┬─────────────────────────┬───────────────────────────────────────┤
│ Method     │ Endpoint                │ Description                           │
├────────────┼─────────────────────────┼───────────────────────────────────────┤
│ GET        │ /settings               │ Get all settings                      │
│ GET        │ /settings/:key          │ Get specific setting                  │
│ PUT        │ /settings/:key          │ Update setting                        │
│ PUT        │ /settings               │ Bulk update settings                  │
└────────────┴─────────────────────────┴───────────────────────────────────────┘
```
### 13.2 API Request/Response Examples
```json
// POST /api/v1/auth/login
// Request
{
  "email": "admin@namho.com",
  "password": "secure_password"
}
// Response (200 OK)
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid-here",
      "email": "admin@namho.com",
      "role": "admin"
    },
    "expiresIn": 3600
  }
}
// GET /api/v1/services
// Response (200 OK)
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "title": "Custom Software Development",
      "description": "Enterprise-grade software solutions...",
      "icon": "Code",
      "category": "tech",
      "features": ["Enterprise Apps", "SaaS", "APIs"],
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "perPage": 10
  }
}
// POST /api/v1/contact
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-123-4567",
  "subject": "Project Inquiry",
  "message": "I'm interested in web development services..."
}
// Response (201 Created)
{
  "success": true,
  "message": "Your message has been received. We'll get back to you within 24 hours.",
  "data": {
    "id": "uuid-message",
    "createdAt": "2024-01-20T15:30:00Z"
  }
}
// Error Response (400 Bad Request)
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {"field": "email", "message": "Invalid email format"},
      {"field": "name", "message": "Name is required"}
    ]
  }
}
```
---
## 14. Component Diagram
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          COMPONENT DIAGRAM                                   │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND LAYER                                     │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        Next.js Application                           │    │
│  │                                                                      │    │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │    │
│  │  │     Pages      │  │   Components   │  │     Hooks      │         │    │
│  │  │                │  │                │  │                │         │    │
│  │  │ - HomePage     │  │ - Navbar       │  │ - useAuth      │         │    │
│  │  │ - AboutPage    │  │ - Footer       │  │ - useServices  │         │    │
│  │  │ - ServicesPage │  │ - ServiceCard  │  │ - useProjects  │         │    │
│  │  │ - PortfolioPage│  │ - ProjectCard  │  │ - useBlog      │         │    │
│  │  │ - BlogPage     │  │ - BlogCard     │  │ - useContact   │         │    │
│  │  │ - ContactPage  │  │ - ContactForm  │  │                │         │    │
│  │  │ - AdminPages   │  │ - Modal        │  │                │         │    │
│  │  └────────────────┘  └────────────────┘  └────────────────┘         │    │
│  │                                                                      │    │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │    │
│  │  │   Services     │  │     Store      │  │     Types      │         │    │
│  │  │   (API Layer)  │  │   (Zustand/    │  │  (TypeScript)  │         │    │
│  │  │                │  │    Context)    │  │                │         │    │
│  │  │ - apiClient    │  │                │  │ - interfaces   │         │    │
│  │  │ - endpoints    │  │ - authStore    │  │ - types        │         │    │
│  │  └────────────────┘  │ - dataStore    │  │ - enums        │         │    │
│  │                      └────────────────┘  └────────────────┘         │    │
│  │                                                                      │    │
│  └──────────────────────────────────┬──────────────────────────────────┘    │
│                                     │                                        │
└─────────────────────────────────────┼────────────────────────────────────────┘
                                      │ HTTP/HTTPS (REST API)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND LAYER                                      │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        FastAPI Application                           │    │
│  │                                                                      │    │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │    │
│  │  │    Routers     │  │    Services    │  │     Models     │         │    │
│  │  │                │  │                │  │                │         │    │
│  │  │ - auth_router  │  │ - AuthService  │  │ - User         │         │    │
│  │  │ - services_    │  │ - ServiceSvc   │  │ - Service      │         │    │
│  │  │   router       │  │ - ProjectSvc   │  │ - Project      │         │    │
│  │  │ - projects_    │  │ - BlogService  │  │ - BlogPost     │         │    │
│  │  │   router       │  │ - ContactSvc   │  │ - TeamMember   │         │    │
│  │  │ - blog_router  │  │ - SettingsSvc  │  │ - Testimonial  │         │    │
│  │  │ - contact_     │  │                │  │ - FAQ          │         │    │
│  │  │   router       │  │                │  │ - Contact      │         │    │
│  │  │ - settings_    │  │                │  │ - Settings     │         │    │
│  │  │   router       │  │                │  │                │         │    │
│  │  └────────────────┘  └────────────────┘  └────────────────┘         │    │
│  │                                                                      │    │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │    │
│  │  │   Middleware   │  │    Schemas     │  │     Utils      │         │    │
│  │  │                │  │   (Pydantic)   │  │                │         │    │
│  │  │ - auth_mw      │  │                │  │ - security     │         │    │
│  │  │ - cors_mw      │  │ - CreateDTO    │  │ - email        │         │    │
│  │  │ - logging_mw   │  │ - UpdateDTO    │  │ - validators   │         │    │
│  │  │ - rate_limit   │  │ - ResponseDTO  │  │ - helpers      │         │    │
│  │  └────────────────┘  └────────────────┘  └────────────────┘         │    │
│  │                                                                      │    │
│  └──────────────────────────────────┬──────────────────────────────────┘    │
│                                     │                                        │
└─────────────────────────────────────┼────────────────────────────────────────┘
                                      │ SQL / Redis Protocol
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER                                        │
│                                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌────────────────────┐ │
│  │     PostgreSQL       │  │        Redis         │  │    File Storage    │ │
│  │                      │  │                      │  │       (S3)         │ │
│  │  ┌────────────────┐  │  │  ┌────────────────┐  │  │                    │ │
│  │  │   Tables       │  │  │  │   Caches       │  │  │  ┌──────────────┐  │ │
│  │  │                │  │  │  │                │  │  │  │  /images     │  │ │
│  │  │ - admin_users  │  │  │  │ - sessions     │  │  │  │  /uploads    │  │ │
│  │  │ - services     │  │  │  │ - api_cache    │  │  │  │  /documents  │  │ │
│  │  │ - projects     │  │  │  │ - rate_limits  │  │  │  └──────────────┘  │ │
│  │  │ - blog_posts   │  │  │  └────────────────┘  │  │                    │ │
│  │  │ - team_members │  │  │                      │  └────────────────────┘ │
│  │  │ - testimonials │  │  └──────────────────────┘                         │
│  │  │ - faqs         │  │                                                   │
│  │  │ - contacts     │  │                                                   │
│  │  │ - settings     │  │                                                   │
│  │  └────────────────┘  │                                                   │
│  │                      │                                                   │
│  └──────────────────────┘                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```
---
## 15. Deployment Diagram
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DEPLOYMENT DIAGRAM                                  │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                              INTERNET                                        │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLOUDFLARE (CDN/WAF)                                 │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                 │
│  │  DDoS          │  │  SSL/TLS       │  │  Edge          │                 │
│  │  Protection    │  │  Termination   │  │  Caching       │                 │
│  └────────────────┘  └────────────────┘  └────────────────┘                 │
│                                                                              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AWS VPC                                         │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                        PUBLIC SUBNET                                   │  │
│  │                                                                        │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │  │
│  │  │                    Application Load Balancer                      │ │  │
│  │  │                                                                   │ │  │
│  │  │  ┌────────────┐  ┌────────────┐  ┌────────────┐                  │ │  │
│  │  │  │ HTTPS:443  │  │ Health     │  │ Target     │                  │ │  │
│  │  │  │ Listener   │  │ Checks     │  │ Groups     │                  │ │  │
│  │  │  └────────────┘  └────────────┘  └────────────┘                  │ │  │
│  │  │                                                                   │ │  │
│  │  └───────────────────────────────┬──────────────────────────────────┘ │  │
│  │                                  │                                     │  │
│  └──────────────────────────────────┼─────────────────────────────────────┘  │
│                                     │                                        │
│  ┌──────────────────────────────────┼─────────────────────────────────────┐  │
│  │                        PRIVATE SUBNET                                  │  │
│  │                                  │                                     │  │
│  │  ┌───────────────────────────────┴───────────────────────────────────┐│  │
│  │  │                      ECS CLUSTER (Fargate)                        ││  │
│  │  │                                                                    ││  │
│  │  │  ┌─────────────────────────────────────────────────────────────┐  ││  │
│  │  │  │                    Frontend Service                          │  ││  │
│  │  │  │                                                              │  ││  │
│  │  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │  ││  │
│  │  │  │  │ Task 1   │  │ Task 2   │  │ Task N   │  (Auto-scaling)   │  ││  │
│  │  │  │  │ Next.js  │  │ Next.js  │  │ Next.js  │                   │  ││  │
│  │  │  │  └──────────┘  └──────────┘  └──────────┘                   │  ││  │
│  │  │  │                                                              │  ││  │
│  │  │  └─────────────────────────────────────────────────────────────┘  ││  │
│  │  │                                                                    ││  │
│  │  │  ┌─────────────────────────────────────────────────────────────┐  ││  │
│  │  │  │                    Backend Service                           │  ││  │
│  │  │  │                                                              │  ││  │
│  │  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │  ││  │
│  │  │  │  │ Task 1   │  │ Task 2   │  │ Task N   │  (Auto-scaling)   │  ││  │
│  │  │  │  │ FastAPI  │  │ FastAPI  │  │ FastAPI  │                   │  ││  │
│  │  │  │  └──────────┘  └──────────┘  └──────────┘                   │  ││  │
│  │  │  │                                                              │  ││  │
│  │  │  └─────────────────────────────────────────────────────────────┘  ││  │
│  │  │                                                                    ││  │
│  │  └────────────────────────────────────────────────────────────────────┘│  │
│  │                                                                        │  │
│  │  ┌────────────────────────────────────────────────────────────────────┐│  │
│  │  │                      DATA STORES                                    ││  │
│  │  │                                                                     ││  │
│  │  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    ││  │
│  │  │  │   RDS           │  │   ElastiCache   │  │   S3 Bucket     │    ││  │
│  │  │  │   PostgreSQL    │  │   Redis         │  │                 │    ││  │
│  │  │  │                 │  │                 │  │  /images        │    ││  │
│  │  │  │  ┌───────────┐  │  │  ┌───────────┐  │  │  /uploads       │    ││  │
│  │  │  │  │  Primary  │  │  │  │  Cluster  │  │  │  /static        │    ││  │
│  │  │  │  └───────────┘  │  │  └───────────┘  │  │                 │    ││  │
│  │  │  │  ┌───────────┐  │  │                 │  │                 │    ││  │
│  │  │  │  │  Replica  │  │  │                 │  │                 │    ││  │
│  │  │  │  └───────────┘  │  │                 │  │                 │    ││  │
│  │  │  └─────────────────┘  └─────────────────┘  └─────────────────┘    ││  │
│  │  │                                                                     ││  │
│  │  └────────────────────────────────────────────────────────────────────┘│  │
│  │                                                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                      MONITORING & LOGGING                               │  │
│  │                                                                         │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │ CloudWatch  │  │    X-Ray    │  │   Sentry    │  │   PagerDuty │   │  │
│  │  │ Logs/Metrics│  │   Tracing   │  │   Errors    │  │   Alerts    │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  │                                                                         │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SERVICES                                    │
│                                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  SendGrid   │  │   Google    │  │   Stripe    │  │   GitHub    │        │
│  │  (Email)    │  │  Analytics  │  │  (Payments) │  │  (CI/CD)    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```
---
## 16. User Stories
### 16.1 Visitor User Stories
| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-001 | Visitor | View the homepage | I can get an overview of Namho's services | Must |
| US-002 | Visitor | Browse all services | I can understand what services are offered | Must |
| US-003 | Visitor | View project portfolio | I can see examples of previous work | Must |
| US-004 | Visitor | Read blog articles | I can learn about industry topics | Should |
| US-005 | Visitor | Filter blog by category | I can find relevant content easily | Should |
| US-006 | Visitor | Submit contact form | I can inquire about services | Must |
| US-007 | Visitor | View team members | I can see who works at Namho | Could |
| US-008 | Visitor | Read FAQs | I can find answers to common questions | Should |
| US-009 | Visitor | View testimonials | I can see what other clients say | Should |
| US-010 | Visitor | Access on mobile | I can browse on any device | Must |
### 16.2 Admin User Stories
| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-101 | Admin | Log into admin panel | I can manage website content | Must |
| US-102 | Admin | Add/edit services | I can keep service listings updated | Must |
| US-103 | Admin | Add/edit projects | I can showcase new work | Must |
| US-104 | Admin | Create blog posts | I can publish new content | Must |
| US-105 | Admin | Manage team members | I can update team information | Should |
| US-106 | Admin | Manage testimonials | I can feature client feedback | Should |
| US-107 | Admin | View contact messages | I can respond to inquiries | Must |
| US-108 | Admin | Update site settings | I can modify company information | Must |
| US-109 | Admin | Add/edit FAQs | I can update frequently asked questions | Should |
| US-110 | Admin | Change my password | I can maintain account security | Must |
---
## 17. Wireframes
### 17.1 Homepage Wireframe
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ NAVBAR                                                         [Get Quote]  │
│ Logo    Home  About  Services  Portfolio  Blog  Contact                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              HERO SECTION                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │    Transform Your Business with                                     │    │
│  │    Digital Excellence                                               │    │
│  │                                                                      │    │
│  │    We build cutting-edge software and execute                       │    │
│  │    data-driven marketing strategies.                                │    │
│  │                                                                      │    │
│  │    [Get Started]  [View Our Work]                                   │    │
│  │                                                                      │    │
│  │    ⭐⭐⭐⭐⭐ Trusted by 150+ businesses                            │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                              STATS BAR                                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │   250+     │  │   150+     │  │   50+      │  │   99%      │             │
│  │  Projects  │  │  Clients   │  │  Team      │  │  Satisfaction│            │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘             │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                           SERVICES SECTION                                   │
│                                                                              │
│    Our Services                                                              │
│    ─────────────                                                             │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       │
│  │ 💻           │  │ 🌐           │  │ ☁️           │                       │
│  │ Software Dev │  │ Web Dev      │  │ DevOps       │                       │
│  │              │  │              │  │              │                       │
│  │ Description  │  │ Description  │  │ Description  │                       │
│  │ ✓ Feature 1  │  │ ✓ Feature 1  │  │ ✓ Feature 1  │                       │
│  │ ✓ Feature 2  │  │ ✓ Feature 2  │  │ ✓ Feature 2  │                       │
│  │              │  │              │  │              │                       │
│  │ [Learn More] │  │ [Learn More] │  │ [Learn More] │                       │
│  └──────────────┘  └──────────────┘  └──────────────┘                       │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       │
│  │ 🔍           │  │ 📱           │  │ 📊           │                       │
│  │ SEO          │  │ Social Media │  │ PPC          │                       │
│  │              │  │              │  │              │                       │
│  │ Description  │  │ Description  │  │ Description  │                       │
│  │ ✓ Feature 1  │  │ ✓ Feature 1  │  │ ✓ Feature 1  │                       │
│  │ ✓ Feature 2  │  │ ✓ Feature 2  │  │ ✓ Feature 2  │                       │
│  │              │  │              │  │              │                       │
│  │ [Learn More] │  │ [Learn More] │  │ [Learn More] │                       │
│  └──────────────┘  └──────────────┘  └──────────────┘                       │
│                                                                              │
│                        [View All Services →]                                │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                          PORTFOLIO SECTION                                   │
│                                                                              │
│    Recent Projects                                                           │
│    ───────────────                                                           │
│                                                                              │
│  ┌─────────────────────────┐  ┌─────────────────────────┐                   │
│  │  ╔═══════════════════╗  │  │  ╔═══════════════════╗  │                   │
│  │  ║   Project Image   ║  │  │  ║   Project Image   ║  │                   │
│  │  ╚═══════════════════╝  │  │  ╚═══════════════════╝  │                   │
│  │  [Category]             │  │  [Category]             │                   │
│  │  Project Title          │  │  Project Title          │                   │
│  │  Brief description...   │  │  Brief description...   │                   │
│  │  [Tech] [Tags]          │  │  [Tech] [Tags]          │                   │
│  └─────────────────────────┘  └─────────────────────────┘                   │
│                                                                              │
│                        [View All Projects →]                                │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                         TESTIMONIALS SECTION                                 │
│                                                                              │
│    What Our Clients Say                                                      │
│    ─────────────────────                                                     │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  ⭐⭐⭐⭐⭐                                                           │   │
│  │                                                                       │   │
│  │  "Namho transformed our digital infrastructure. Their team        │   │
│  │   delivered a scalable platform that handles 10x our capacity."      │   │
│  │                                                                       │   │
│  │  👤 James Mitchell, CEO - TechVenture Inc.                           │   │
│  │                                                                       │   │
│  │  ◀  ────────────────  ●  ○  ○  ○  ────────────────  ▶               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                            BLOG SECTION                                      │
│                                                                              │
│    Latest Articles                                                           │
│    ───────────────                                                           │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                 │
│  │ ╔════════════╗ │  │ ╔════════════╗ │  │ ╔════════════╗ │                 │
│  │ ║   Image    ║ │  │ ║   Image    ║ │  │ ║   Image    ║ │                 │
│  │ ╚════════════╝ │  │ ╚════════════╝ │  │ ╚════════════╝ │                 │
│  │ [Category]     │  │ [Category]     │  │ [Category]     │                 │
│  │ Article Title  │  │ Article Title  │  │ Article Title  │                 │
│  │ Excerpt...     │  │ Excerpt...     │  │ Excerpt...     │                 │
│  │ [Read More →]  │  │ [Read More →]  │  │ [Read More →]  │                 │
│  └────────────────┘  └────────────────┘  └────────────────┘                 │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                              CTA SECTION                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                       │   │
│  │     Ready to Transform Your Business?                                 │   │
│  │     Let's discuss how we can help you achieve your goals.            │   │
│  │                                                                       │   │
│  │                      [Start a Project →]                              │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                               FOOTER                                         │
│                                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Namho    │  │ Quick Links │  │ Services    │  │ Contact     │        │
│  │ Solutions   │  │             │  │             │  │             │        │
│  │             │  │ About       │  │ Software    │  │ Email       │        │
│  │ Tagline     │  │ Services    │  │ Web Dev     │  │ Phone       │        │
│  │             │  │ Portfolio   │  │ DevOps      │  │ Address     │        │
│  │ Social Icons│  │ Blog        │  │ Marketing   │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  © 2024 Namho. All rights reserved.  |  Privacy  |  Terms     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```
### 17.2 Admin Dashboard Wireframe
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌────────────────┐                                                         │
│  │ SIDEBAR        │                              ┌─────────────────────────┐│
│  │                │                              │ ≡  Namho Admin Panel ││
│  │ 🏠 Dashboard   │◄──                           └─────────────────────────┘│
│  │ 📋 Services    │                                                         │
│  │ 📁 Projects    │   ┌─────────────────────────────────────────────────┐  │
│  │ 📝 Blog        │   │                    DASHBOARD                     │  │
│  │ 👥 Team        │   │                                                  │  │
│  │ ⭐ Testimonials│   │  Welcome to the Namho admin panel.           │  │
│  │ 📧 Messages (3)│   │  Manage your website content here.              │  │
│  │ ❓ FAQs        │   │                                                  │  │
│  │ ⚙️ Settings    │   ├─────────────────────────────────────────────────┤  │
│  │                │   │                                                  │  │
│  │ ────────────── │   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│  │
│  │ 🌐 View Website│   │  │   12    │ │    8    │ │    5    │ │    6    ││  │
│  │ 🚪 Logout      │   │  │Services │ │Projects │ │ Posts   │ │ Team    ││  │
│  │                │   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘│  │
│  └────────────────┘   │                                                  │  │
│                       │  ┌─────────┐ ┌─────────┐                        │  │
│                       │  │    4    │ │    3    │                        │  │
│                       │  │Testimon │ │Messages │ ●                      │  │
│                       │  └─────────┘ └─────────┘                        │  │
│                       │                                                  │  │
│                       ├─────────────────────────────────────────────────┤  │
│                       │                                                  │  │
│                       │  Recent Messages                    [View All →]│  │
│                       │  ──────────────                                 │  │
│                       │                                                  │  │
│                       │  ┌──────────────────────────────────────────┐   │  │
│                       │  │ ● John Doe - Project Inquiry       Today │   │  │
│                       │  │   Interested in web development...       │   │  │
│                       │  ├──────────────────────────────────────────┤   │  │
│                       │  │ ○ Jane Smith - SEO Services       Jan 19 │   │  │
│                       │  │   Looking for SEO optimization...        │   │  │
│                       │  ├──────────────────────────────────────────┤   │  │
│                       │  │ ○ Mike Brown - Partnership        Jan 18 │   │  │
│                       │  │   Regarding potential partnership...     │   │  │
│                       │  └──────────────────────────────────────────┘   │  │
│                       │                                                  │  │
│                       ├─────────────────────────────────────────────────┤  │
│                       │                                                  │  │
│                       │  Quick Actions                                  │  │
│                       │  ─────────────                                  │  │
│                       │                                                  │  │
│                       │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│                       │  │ New Post │ │Add Project│ │ Manage   │ │Settings │││
│                       │  │   📝     │ │   📁      │ │ Services │ │  ⚙️     │││
│                       │  └──────────┘ └──────────┘ └──────────┘ └──────────┘│
│                       │                                                  │  │
│                       └─────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```
---
## 18. Technology Stack
### 18.1 Technology Comparison Matrix
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TECHNOLOGY STACK                                     │
└─────────────────────────────────────────────────────────────────────────────┘
┌──────────────────┬──────────────────────────────────────────────────────────┐
│     LAYER        │     TECHNOLOGY CHOICES                                   │
├──────────────────┼──────────────────────────────────────────────────────────┤
│                  │                                                          │
│   FRONTEND       │  Framework:     Next.js 14 (App Router)                  │
│                  │  Language:      TypeScript 5.x                           │
│                  │  Styling:       Tailwind CSS 3.x                         │
│                  │  State:         Zustand / React Query                    │
│                  │  Forms:         React Hook Form + Zod                    │
│                  │  Icons:         Lucide React                             │
│                  │  Animations:    Framer Motion                            │
│                  │  HTTP Client:   Axios                                    │
│                  │                                                          │
├──────────────────┼──────────────────────────────────────────────────────────┤
│                  │                                                          │
│   BACKEND        │  Framework:     FastAPI (Python 3.11+)                   │
│                  │  ORM:           SQLAlchemy 2.0 / Tortoise ORM            │
│                  │  Validation:    Pydantic V2                              │
│                  │  Auth:          JWT (python-jose)                        │
│                  │  Password:      bcrypt / passlib                         │
│                  │  Migrations:    Alembic                                  │
│                  │  Testing:       pytest + pytest-asyncio                  │
│                  │  Email:         SendGrid / AWS SES                       │
│                  │                                                          │
├──────────────────┼──────────────────────────────────────────────────────────┤
│                  │                                                          │
│   DATABASE       │  Primary:       PostgreSQL 15                            │
│                  │  Cache:         Redis 7                                  │
│                  │  Search:        PostgreSQL Full-Text (or Elasticsearch) │
│                  │                                                          │
├──────────────────┼──────────────────────────────────────────────────────────┤
│                  │                                                          │
│   STORAGE        │  Files:         AWS S3 / Cloudflare R2                   │
│                  │  CDN:           CloudFlare                               │
│                  │                                                          │
├──────────────────┼──────────────────────────────────────────────────────────┤
│                  │                                                          │
│   INFRASTRUCTURE │  Cloud:         AWS (ECS Fargate / Lambda)               │
│                  │  Containers:    Docker                                   │
│                  │  IaC:           Terraform / AWS CDK                      │
│                  │  CI/CD:         GitHub Actions                           │
│                  │  Monitoring:    CloudWatch + Sentry                      │
│                  │  Logging:       CloudWatch Logs                          │
│                  │                                                          │
├──────────────────┼──────────────────────────────────────────────────────────┤
│                  │                                                          │
│   DEVELOPMENT    │  Package Mgr:   pnpm (frontend) / poetry (backend)       │
│                  │  Linting:       ESLint + Prettier / Ruff                 │
│                  │  Pre-commit:    Husky + lint-staged                      │
│                  │  API Docs:      Swagger/OpenAPI (auto-generated)         │
│                  │                                                          │
└──────────────────┴──────────────────────────────────────────────────────────┘
```
---
## 19. Security Requirements
### 19.1 Security Checklist
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SECURITY REQUIREMENTS                                 │
└─────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ AUTHENTICATION & AUTHORIZATION                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ ☑ JWT-based authentication with short-lived access tokens (15 min)          │
│ ☑ Refresh tokens stored in httpOnly cookies                                 │
│ ☑ Password hashing with bcrypt (cost factor 12)                             │
│ ☑ Role-based access control (RBAC)                                          │
│ ☑ Session invalidation on logout                                            │
│ ☑ Account lockout after 5 failed login attempts                             │
│ ☑ Password complexity requirements                                          │
└──────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ DATA PROTECTION                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ ☑ TLS 1.3 for all connections (HTTPS only)                                  │
│ ☑ Data encryption at rest (AWS RDS encryption)                              │
│ ☑ Sensitive data masking in logs                                            │
│ ☑ PII data handling compliance (GDPR)                                       │
│ ☑ Regular automated backups                                                 │
└──────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ INPUT VALIDATION & SANITIZATION                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ ☑ Server-side validation for all inputs (Pydantic)                          │
│ ☑ Client-side validation (Zod)                                              │
│ ☑ SQL injection prevention (parameterized queries via ORM)                  │
│ ☑ XSS prevention (content sanitization)                                     │
│ ☑ CSRF protection tokens                                                    │
│ ☑ File upload validation (type, size, content)                              │
└──────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ API SECURITY                                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ ☑ Rate limiting (100 requests/minute per IP)                                │
│ ☑ CORS configuration (allowed origins only)                                 │
│ ☑ API versioning                                                            │
│ ☑ Request size limits                                                       │
│ ☑ Security headers (HSTS, X-Frame-Options, CSP)                            │
└──────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│ INFRASTRUCTURE SECURITY                                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ ☑ WAF (Web Application Firewall) via CloudFlare                             │
│ ☑ DDoS protection                                                           │
│ ☑ Private subnets for backend services                                      │
│ ☑ Security groups / firewall rules                                          │
│ ☑ Secret management (AWS Secrets Manager)                                   │
│ ☑ Regular security patches and updates                                      │
│ ☑ Vulnerability scanning                                                    │
└──────────────────────────────────────────────────────────────────────────────┘
```
---
## 20. Timeline & Milestones
### 20.1 Project Timeline
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PROJECT TIMELINE                                     │
│                         (12 Week Development Cycle)                          │
└─────────────────────────────────────────────────────────────────────────────┘
Week  1    2    3    4    5    6    7    8    9   10   11   12
      │    │    │    │    │    │    │    │    │    │    │    │
      ├────┴────┤                                              │
      │ PHASE 1 │ Planning & Design                           │
      │  (2 wk) │ • Requirements finalization                 │
      │         │ • UI/UX Design                              │
      │         │ • Architecture design                       │
      │         │ • Database schema                           │
      ├─────────┼────┴────┴────┤                              │
      │         │   PHASE 2    │ Backend Development          │
      │         │    (4 wk)    │ • API development            │
      │         │              │ • Database setup             │
      │         │              │ • Authentication             │
      │         │              │ • Unit tests                 │
      │         ├──────────────┼────┴────┴────┤               │
      │         │              │   PHASE 3    │ Frontend Dev  │
      │         │              │    (4 wk)    │ • Pages       │
      │         │              │              │ • Components  │
      │         │              │              │ • Admin panel │
      │         │              │              │ • Integration │
      │         │              ├──────────────┼────┴────┤     │
      │         │              │              │ PHASE 4 │ QA  │
      │         │              │              │  (2 wk) │ UAT │
      │         │              │              │         │Deploy│
      ▼         ▼              ▼              ▼         ▼     ▼
Key Milestones:
─────────────────────────────────────────────────────────────────────────────
✓ Week 2:  Design approval, Database schema finalized
✓ Week 6:  Backend API complete, All endpoints tested
✓ Week 10: Frontend complete, Integration tested
✓ Week 11: UAT complete, Bug fixes
✓ Week 12: Production deployment, Go-live
```
### 20.2 Detailed Milestone Breakdown
| Phase | Milestone | Deliverables | Duration |
|-------|-----------|--------------|----------|
| **Phase 1** | Planning & Design | PRD, Wireframes, UI Design, DB Schema | 2 weeks |
| | M1.1 | Requirements document signed off | Day 3 |
| | M1.2 | UI/UX designs approved | Day 8 |
| | M1.3 | Technical architecture finalized | Day 10 |
| **Phase 2** | Backend Development | Complete REST API | 4 weeks |
| | M2.1 | Database + Auth system | Week 3 |
| | M2.2 | All CRUD endpoints | Week 5 |
| | M2.3 | API testing complete | Week 6 |
| **Phase 3** | Frontend Development | Complete Website + Admin | 4 weeks |
| | M3.1 | Public pages complete | Week 8 |
| | M3.2 | Admin panel complete | Week 9 |
| | M3.3 | Integration complete | Week 10 |
| **Phase 4** | Testing & Deployment | Production-ready system | 2 weeks |
| | M4.1 | UAT complete | Week 11 |
| | M4.2 | Production deployment | Week 12 |
---
## Appendix A: Glossary
| Term | Definition |
|------|------------|
| **CMS** | Content Management System |
| **CRUD** | Create, Read, Update, Delete operations |
| **JWT** | JSON Web Token for authentication |
| **ORM** | Object-Relational Mapping |
| **SSR** | Server-Side Rendering |
| **SSG** | Static Site Generation |
| **SPA** | Single Page Application |
| **REST** | Representational State Transfer |
| **CDN** | Content Delivery Network |
| **WAF** | Web Application Firewall |
---
## Appendix B: Document History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 2026 | Tech Team | Initial document |
---
**End of Document**