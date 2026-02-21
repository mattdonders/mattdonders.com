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
  draft?: boolean;
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
    name: 'HGB App',
    tagline: 'Live NHL scores and goal replays for Hockey Game Bot fans.',
    description: 'A companion iOS and Android app for Hockey Game Bot. Follow live games, browse play-by-play events, watch goal replay clips, and get push notifications for your team. Powered by a Cloudflare Workers API with a D1 database.',
    status: 'development',
    platforms: ['iOS', 'Android'],
    tags: ['SwiftUI', 'Kotlin', 'Cloudflare Workers', 'D1'],
    featured: true,
    draft: true,
  },
  {
    name: 'DevMap',
    tagline: 'A dashboard for all your side projects, running on your machine.',
    description: 'Scans your ~/Development directory, discovers every coding project, and surfaces them in a clean two-panel interface with TODO tracking, plain-English project summaries, and git metadata. Available as both a Python TUI (Textual) and a native macOS app (SwiftUI).',
    status: 'development',
    platforms: ['macOS'],
    tags: ['Swift', 'SwiftUI', 'Python', 'Textual'],
    featured: true,
    draft: true,
  },
  {
    name: 'Allowance Autopilot',
    tagline: 'Chores, allowances, and family finances — on autopilot.',
    description: 'A family app for managing kids\' chores and allowances. Parents assign tasks, kids check them off, and allowances calculate automatically. Built for iOS and Android with a shared Firebase backend.',
    status: 'development',
    platforms: ['iOS', 'Android'],
    tags: ['SwiftUI', 'Kotlin', 'Firebase'],
    featured: true,
    draft: true,
  },
  {
    name: 'Cool Haven',
    tagline: 'Find the nearest cooling or warming center, fast.',
    description: 'A public-safety app that helps people locate nearby cooling centers during heat emergencies and warming centers during extreme cold. Built for iOS and Android with real-time location services.',
    status: 'development',
    platforms: ['iOS', 'Android'],
    tags: ['SwiftUI', 'Kotlin', 'Firebase'],
    featured: true,
    draft: true,
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
