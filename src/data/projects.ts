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
    name: 'Hockey Game Bot',
    tagline: 'Real-time NHL game updates across 9 social platforms simultaneously.',
    description: 'A production bot that monitors live NHL games and auto-posts goals, penalties, milestones, and animated goal GIFs to Bluesky, X, Threads, Mastodon, Telegram, Discord, and more. Feeds a backend API powering companion iOS and Android apps.',
    status: 'live',
    platforms: ['Web'],
    tags: ['Python', 'NHL API', 'Cloudflare D1', 'FFmpeg'],
    url: 'https://x.com/hockey_gamebot',
    featured: true,
  },
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
