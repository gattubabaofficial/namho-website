export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  display_order: number;
  is_active: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image_url: string;
  live_url: string;
  github_url: string;
  status: string;
  is_featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  image_url: string;
  publish_date: string;
  view_count: number;
  reading_time: number;
  category: Category;
  tags: Tag[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  linkedin_url: string;
  twitter_url: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image_url: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
