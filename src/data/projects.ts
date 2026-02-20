export type ProjectStatus = 'live' | 'beta' | 'development' | 'planned';
export type Platform = 'iOS' | 'Android' | 'Web' | 'macOS' | 'tvOS';

export interface Project {
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  platforms: Platform[];
  tags: string[];
  url?: string;
  appStore?: string;
  playStore?: string;
  github?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: 'App Name',
    tagline: 'Short one-line hook.',
    description: 'A bit more detail about what this app does and who it\'s for. Keep it to 1-2 sentences.',
    status: 'development',
    platforms: ['iOS'],
    tags: ['Swift', 'SwiftUI'],
    featured: true,
  },
  {
    name: 'Another App',
    tagline: 'Another short hook.',
    description: 'Description of the second app. What problem does it solve?',
    status: 'planned',
    platforms: ['iOS', 'Android'],
    tags: ['Swift', 'Kotlin'],
    featured: true,
  },
  {
    name: 'Side Project',
    tagline: 'Yet another thing I built.',
    description: 'A Cloudflare Worker or other web project. Brief description here.',
    status: 'development',
    platforms: ['Web'],
    tags: ['TypeScript', 'Cloudflare Workers'],
    github: 'https://github.com/mattdonders',
    featured: true,
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  development: 'In Development',
  planned: 'Planned',
};

export const statusBadgeClass: Record<ProjectStatus, string> = {
  live: 'badge-live',
  beta: 'badge-beta',
  development: 'badge-dev',
  planned: 'badge-dev',
};
