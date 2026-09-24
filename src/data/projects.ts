export type ProjectStatus = 'live' | 'review' | 'beta' | 'development' | 'planned';
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
  /** App icon under public/, shown on /apps. */
  icon?: string;
  /** 'service' entries (bots, APIs) sit apart from the app list on /apps. */
  kind?: 'app' | 'service';
}

export const projects: Project[] = [
  {
    name: 'Hockey Game Bot',
    tagline: 'The NHL data engine behind Puck Passport, plus next-morning recap videos.',
    description: 'A Python service that follows every NHL game and turns it into data and video. Its Cloudflare Workers API supplies the hockey data behind Puck Passport, and it renders next-morning recap videos for YouTube, TikTok, and Instagram.',
    status: 'live',
    platforms: ['Web'],
    tags: ['Python', 'NHL API', 'Cloudflare D1', 'FFmpeg'],
    url: '/apps/hockey-game-bot',
    featured: true,
    icon: '/apps/icons/hgb.png',
    kind: 'service',
  },
  {
    name: 'Home Stretch',
    tagline: 'A timeline-based moving checklist built around your move date.',
    description: 'Set your move date and get every task organized into 6 phases — from 8 weeks out through after the move. Custom tasks, PDF export, progress tracking, and zero internet required.',
    status: 'live',
    platforms: ['iOS', 'Android'],
    tags: ['SwiftUI', 'SwiftData', 'StoreKit 2'],
    url: '/apps/home-stretch',
    appStore: 'https://apps.apple.com/app/home-stretch-moving-checklist/id6759578339',
    playStore: 'https://play.google.com/store/apps/details?id=com.mattdonders.movingchecklist',
    featured: true,
    icon: '/apps/icons/home-stretch.png',
  },
  {
    name: 'Tooth Fairy Tracker',
    tagline: 'Track every lost tooth, every visit, and every payout.',
    description: 'A family app for recording lost teeth with an interactive mouth diagram, visit history, customizable payouts, and support for multiple children. No account, no internet, no subscriptions.',
    status: 'live',
    platforms: ['iOS', 'Android'],
    tags: ['SwiftUI', 'SwiftData', 'StoreKit 2'],
    url: '/apps/tooth-fairy-tracker',
    appStore: 'https://apps.apple.com/app/tooth-fairy-tracker/id6759559834',
    playStore: 'https://play.google.com/store/apps/details?id=com.toothfairytracker',
    featured: true,
    icon: '/apps/icons/tooth-fairy.png',
  },
  {
    name: 'Below',
    tagline: 'Shrink a video to fit under the file size you choose.',
    description: 'A private, on-device iPhone and iPad utility that compresses a video to fit under a maximum file size you choose.',
    status: 'live',
    platforms: ['iOS'],
    tags: ['SwiftUI', 'AVFoundation'],
    url: '/apps/below',
    appStore: 'https://apps.apple.com/app/id6813295177',
    icon: '/apps/icons/below.png',
  },
  {
    name: 'Better Buy Calculator',
    tagline: 'Compare two prices and sizes to see which is the better value.',
    description: 'Enter two package prices and quantities and see which one is actually cheaper per unit.',
    status: 'live',
    platforms: ['iOS'],
    tags: ['SwiftUI'],
    url: '/apps/better-buy-calculator',
    appStore: 'https://apps.apple.com/app/id6809564592',
    icon: '/apps/icons/better-buy.png',
  },
  {
    name: 'Worked',
    tagline: 'Add up shifts, unpaid breaks, and weekly hours.',
    description: 'A private, offline iPhone utility for adding up shifts, unpaid breaks, and weekly hours.',
    status: 'live',
    platforms: ['iOS'],
    tags: ['SwiftUI'],
    url: '/apps/worked',
    appStore: 'https://apps.apple.com/app/id6809901231',
    icon: '/apps/icons/worked.png',
  },
  {
    name: 'Interval',
    tagline: 'Evenly space shelves, frames, and anything else across a wall.',
    description: 'A native iPhone utility for evenly spacing repeated objects across a measured span and getting exact mark positions.',
    status: 'live',
    platforms: ['iOS'],
    tags: ['SwiftUI'],
    url: '/apps/interval',
    appStore: 'https://apps.apple.com/app/id6809219678',
    icon: '/apps/icons/interval.png',
  },
  {
    name: 'Puck Passport',
    tagline: 'Proof you were there. A personal record of every NHL game you attend.',
    description: 'Log every NHL game you attend and build a passport of rinks visited, teams seen, and your record in the building. Runs on the Hockey Game Bot API.',
    status: 'review',
    platforms: ['iOS', 'Web'],
    tags: ['SwiftUI', 'React Router', 'Cloudflare Workers'],
    url: 'https://puckpassport.app',
    icon: '/apps/icons/puck-passport.png',
  },
  {
    name: 'Quiz Parade',
    tagline: 'Family trivia with a new Daily Quiz every morning.',
    description: 'A family-friendly trivia game for iPhone with a new Daily Quiz every morning, themed question packs, and Game Center leaderboards.',
    status: 'review',
    platforms: ['iOS'],
    tags: ['SwiftUI', 'Game Center'],
    url: '/apps/quizparade',
    icon: '/apps/icons/quiz-parade.png',
  },
  {
    name: 'Good Trim',
    tagline: 'Know what boat maintenance is due. Keep the service record.',
    description: 'An offline iPhone maintenance log for boat owners. Track calendar and engine-hour intervals, preserve service history and attachments, and back up or export your records.',
    status: 'review',
    platforms: ['iOS'],
    tags: ['SwiftUI', 'SwiftData', 'StoreKit 2'],
    url: '/apps/good-trim',
    icon: '/apps/icons/good-trim.png',
  },
  {
    name: 'Clear North: Aurora Alerts',
    tagline: 'Only when you can see it.',
    description: 'An iPhone aurora alert app that pings you only when it is dark, clear, and the aurora is strong enough for your latitude. Coming soon to the App Store.',
    status: 'development',
    platforms: ['iOS'],
    tags: ['SwiftUI', 'StoreKit 2', 'Push Notifications'],
    url: '/apps/clear-north',
    icon: '/apps/icons/clear-north.png',
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
  review: 'In App Review',
  beta: 'Beta',
  development: 'In Development',
  planned: 'Planned',
};

export const statusBadgeClass: Record<ProjectStatus, string> = {
  live: 'badge-live',
  review: 'badge-beta',
  beta: 'badge-beta',
  development: 'badge-dev',
  planned: 'badge-dev',
};

/** /apps filter group: anything not yet on a store counts as coming soon. */
export type AppGroup = 'live' | 'soon';

export const appGroup = (status: ProjectStatus): AppGroup =>
  status === 'live' ? 'live' : 'soon';

const appStatusOrder: ProjectStatus[] = ['live', 'review', 'beta', 'development', 'planned'];

/** Public apps for /apps, live first, keeping data order within each status. */
export function listedApps(all: Project[] = projects): Project[] {
  return all
    .filter(p => !p.draft && p.kind !== 'service')
    .sort((a, b) => appStatusOrder.indexOf(a.status) - appStatusOrder.indexOf(b.status));
}

export function listedServices(all: Project[] = projects): Project[] {
  return all.filter(p => !p.draft && p.kind === 'service');
}
