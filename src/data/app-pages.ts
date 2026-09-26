// Content for each app's page at /apps/<slug>. Every page renders through the same template
// (src/pages/apps/[slug].astro), so every app page has the same sections in the same order:
// hero, features, optional callout, optional pricing, support.
// Name, icon, status and App Store link come from src/data/projects.ts.

export interface Feature {
  title: string;
  body: string;
}

export interface PriceTier {
  name: string;
  price: string;
  /** e.g. "one-time", "per year" */
  cadence?: string;
  items: string[];
  /** The paid tier: drawn with the lime accent. */
  highlight?: boolean;
  /** A temporary price, shown with the regular price struck through until `until`. Mirror the
      App Store Connect price schedule. The site rebuilds daily, so the promo drops off on its own. */
  promo?: { price: string; label: string; until: string };
}

/** YYYY-MM-DD in UTC, the date the build runs on. */
export const buildDay = (now: Date = new Date()) => now.toISOString().slice(0, 10);

/** The price to show for a tier on a given day: the promo while it runs, else the regular price. */
export function tierPrice(tier: PriceTier, day: string = buildDay()): { price: string; was?: string; note?: string } {
  if (tier.promo && day < tier.promo.until) {
    const until = new Date(`${tier.promo.until}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });
    return { price: tier.promo.price, was: tier.price, note: `${tier.promo.label} until ${until}` };
  }
  return { price: tier.price };
}

export interface AppPage {
  slug: string;
  /** Browser title. Match the App Store name. */
  title: string;
  /** Meta description, one or two sentences. */
  description: string;
  headline: string;
  intro: string;
  features: { heading: string; items: Feature[] };
  /** One standout idea, drawn as a lime tile after the features. */
  callout?: { eyebrow: string; heading: string; body?: string; items?: Feature[] };
  pricing?: { heading: string; intro?: string; tiers: PriceTier[]; footnote?: string };
  /** Overrides the price summary in the hero facts; without pricing or this, no price is shown. */
  price?: string;
  /** Google Play: 'review' shows a "launching soon" button, 'live' needs a url. */
  android?: { status: 'live' | 'review'; url?: string };
  /** Other places to follow the app, e.g. a YouTube channel. */
  links?: { label: string; href: string }[];
  support: {
    /** mailto: subject line */
    subject?: string;
    /** Use instead of email when support lives elsewhere, e.g. the app's own site. */
    url?: string;
    note?: string;
  };
  /** Common questions, shown after support. Answers may contain inline HTML (links, <strong>). */
  faq?: { q: string; a: string }[];
  /** Privacy policy path or URL. */
  privacy: string;
  /** Data attributions and licence notes, shown at the foot of the page. Inline HTML. */
  credits?: string;
}

export const appPages: AppPage[] = [
  {
    slug: 'worked',
    title: 'Worked - Work Hours Calculator',
    description: 'Worked is a private, offline iPhone utility for adding up shifts, unpaid breaks, and weekly hours.',
    headline: 'See what your week adds up to.',
    intro: 'Add each shift and unpaid break for the week, and Worked shows your daily hours, weekly total, and decimal hours. It keeps your week on your iPhone.',
    features: {
      heading: 'What it handles',
      items: [
        { title: 'Several shifts a day', body: 'Add as many shifts as you worked in a day. Split shifts are shown separately.' },
        { title: 'Past midnight', body: 'Overnight shifts that run into the next day add up correctly.' },
        { title: 'Unpaid breaks', body: 'Take unpaid breaks out of each shift so the total is time you were actually paid for.' },
        { title: 'Decimal hours', body: 'See the weekly total as hours and minutes and as decimal hours for timesheets.' },
        { title: 'Estimated gross', body: 'Set an optional hourly rate to see an estimated gross for the week.' },
        { title: 'Your week, your start', body: 'Choose the day your week starts, and begin a new week when you are ready.' },
      ],
    },
    callout: {
      eyebrow: 'Good to know',
      heading: 'A calculator for your own records.',
      body: 'Worked is not payroll, tax, overtime, or legal timekeeping advice. It adds up the hours you enter.',
    },
    price: 'Free',
    support: { subject: 'Worked Support' },
    privacy: '/apps/worked/privacy',
  },
  {
    slug: 'better-buy-calculator',
    title: 'Better Buy Calculator',
    description: 'Compare two package prices and sizes to see which one costs less per unit, and how much you save.',
    headline: 'Two packages. One better value.',
    intro: 'Enter the price and quantity for each option, and Better Buy Calculator tells you which one costs less per unit and how much you save.',
    features: {
      heading: 'How it works',
      items: [
        { title: 'Price and size', body: 'Type the price and quantity for two packages. Results update while you type.' },
        { title: 'Units that mix', body: 'Compare counts, ounces and pounds, or milliliters and liters.' },
        { title: 'An honest answer', body: 'A clear tie when the prices match, and a message when the units cannot be compared.' },
        { title: 'Works offline', body: 'Nothing to sign in to and nothing sent anywhere. Use it in the aisle.' },
      ],
    },
    price: 'Free',
    support: { subject: 'Better Buy Calculator Support' },
    privacy: '/apps/better-buy-calculator/privacy',
  },
  {
    slug: 'interval',
    title: 'Interval - Spacing Calculator',
    description: 'Evenly space pickets, shelves, frames, hooks, and lights across a measured span, with every mark position worked out.',
    headline: 'Even spacing, every mark worked out.',
    intro: 'Plan evenly spaced pickets, balusters, hooks, brackets, slats, shelves, lights, and frames. Enter the span, the width of each piece, and how many there are. Interval gives you the gap and every mark.',
    features: {
      heading: 'How it works',
      items: [
        { title: 'Span, width, count', body: 'Enter the measured span, the object width, and the number of objects. Interval calculates the gap.' },
        { title: 'Every mark position', body: 'Get each mark measured from the same starting point, so errors do not add up along the wall.' },
        { title: 'Equal or flush ends', body: 'Leave a full gap at each end, or start and finish flush with the edges.' },
        { title: 'Centerlines or left edges', body: 'Mark the center of each piece or its left edge, whichever suits how you hang it.' },
        { title: 'Scaled diagram', body: 'Check the arrangement on a drawing to scale before you mark anything.' },
        { title: 'Tape-friendly units', body: 'Imperial or metric. Inch results use tape-measure fractions, with decimals when you need them.' },
      ],
    },
    callout: {
      eyebrow: 'When it will not fit',
      heading: 'Interval tells you why.',
      body: 'If the pieces cannot fit in the span, you get the reason instead of a layout that fails on the wall.',
    },
    price: 'Free',
    support: { subject: 'Interval Support' },
    privacy: '/apps/interval/privacy',
  },
  {
    slug: 'below',
    title: 'Below - Video Compressor',
    description: 'Below is a private, on-device iPhone and iPad utility that compresses a video to fit under a maximum file size you choose.',
    headline: 'Pick the limit. Below makes it fit.',
    intro: 'Enter a maximum file size in megabytes. Below picks the resolution, frame rate, and bitrate for you, then checks the finished file byte for byte. No bitrate math and no quality sliders, just a number.',
    features: {
      heading: 'One number in, a video that fits',
      items: [
        { title: 'Target size, not guesswork', body: 'Tell Below the limit you care about: 10 MB for an email, 25 MB for a chat app. It works out every encoding setting for you.' },
        { title: 'Presets and My Sizes', body: '10, 25, 50 and 100 MB are one tap away, plus three custom slots for the limits you hit again and again.' },
        { title: 'Checked byte for byte', body: 'Below measures the real output file after encoding, in decimal megabytes, the same unit Photos, email and messaging apps use.' },
        { title: 'Private by design', body: 'Everything happens on your iPhone. No account, no upload, no analytics, no ads. Your video never leaves the device.' },
        { title: 'Photos, Files, Share Sheet, Shortcuts', body: 'Compress from wherever the video lives. A Shortcuts action lets it run inside your own automations.' },
        { title: 'Your original is untouched', body: 'Below writes a new, smaller file and never modifies or deletes the source video.' },
      ],
    },
    pricing: {
      heading: 'Try it free. Unlock it once.',
      intro: 'No subscription, ever.',
      tiers: [
        { name: 'Free', price: '$0', items: ['Three compressions', 'Full quality, no watermark', 'All presets and My Sizes', 'Share Sheet and Shortcuts'] },
        { name: 'Below Pro', price: '$9.99', cadence: 'one-time', highlight: true, items: ['Unlimited compressions', 'No subscription', 'No ads, no accounts', 'Restores on your Apple Account'] },
      ],
    },
    android: { status: 'review' },
    support: {
      subject: 'Below Support',
      note: 'Send a note with your device model, iOS version, and what you were trying to compress. That is usually enough to work out what happened.',
    },
    faq: [
      { q: 'My video will not go under the limit I asked for.', a: 'Very short clips and very small limits sometimes leave no room for a watchable result. Below tells you when that happens instead of producing something unusable. Raise the limit slightly and try again.' },
      { q: 'Below says my video is already small enough.', a: 'If the original is already under your limit, Below keeps the original quality and tells you so rather than re-encoding it for no reason.' },
      { q: 'The result is a different size than I expected.', a: 'Sizes use decimal megabytes, where 1 MB is 1,000,000 bytes. That is the same unit Photos and most messaging and email services use. Below measures the real output file after encoding, so the size it reports is the size on disk.' },
      { q: 'I bought Below Pro and it is not unlocked.', a: 'Open Below, reach the Below Pro screen, and tap <strong>Restore Purchases</strong>. Make sure you are signed in to the same Apple Account you used for the purchase. Below Pro is a one-time purchase, so it restores on any device signed in to that account.' },
      { q: 'How many free compressions do I get?', a: 'The first three successful compressions are free, at full quality and with no watermark. After that, Below Pro unlocks unlimited compressions for a single one-time purchase.' },
      { q: 'Where did my original video go?', a: 'Nowhere. Below never changes or deletes your original. It writes a new, smaller file and leaves the source untouched.' },
      { q: 'Can I use Below from Photos, Files, or Shortcuts?', a: 'Yes. Share a video from Photos or Files and choose Below to compress inside the share sheet. In Shortcuts, use the <strong>Compress Video Below Size</strong> action with a video and a target in megabytes.' },
      { q: 'How do refunds work?', a: 'Purchases are handled by Apple. Refund requests go through <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.' },
    ],
    privacy: '/apps/below/privacy',
  },
  {
    slug: 'home-stretch',
    title: 'Home Stretch: Moving Checklist',
    description: 'A timeline-based moving checklist built around your move date. No ads, no account, no bloat.',
    headline: 'Your move, phase by phase.',
    intro: 'A moving checklist that organizes every task around your move date. No ads, no account, no bloat: every task you need, when you need it.',
    features: {
      heading: 'Everything for a calmer move',
      items: [
        { title: 'Timeline phases', body: 'Tasks sit in six phases: 8 weeks out, 6 weeks out, 4 weeks out, 2 weeks out, moving day, and after the move.' },
        { title: 'Built on your move date', body: 'Set your move date once. The app opens the phase you are in, so the right part of the checklist is always in view.' },
        { title: 'Progress you can see', body: 'Check off tasks with a little haptic tap and watch each phase fill up.' },
        { title: 'Your own tasks', body: 'Add, edit, and remove your own tasks in any phase. Every move is different.' },
        { title: 'PDF export', body: 'Export the full checklist as a PDF to share with a partner or a moving company, or to keep a paper copy.' },
        { title: 'Private by design', body: 'No account and no internet needed. Everything stays on your device. No analytics, no tracking, no ads.' },
      ],
    },
    pricing: {
      heading: 'Start free. Upgrade once.',
      intro: 'Plan the first weeks for free. One purchase unlocks the whole move.',
      tiers: [
        { name: 'Free', price: '$0', items: ['First two phases: 8 and 6 weeks out', 'Full task list with tips', 'Progress tracking'] },
        { name: 'Full Checklist', price: '$2.99', cadence: 'one-time', highlight: true, items: ['All six phases', 'Your own tasks in any phase', 'PDF export', 'No subscription'] },
      ],
    },
    android: { status: 'live', url: 'https://play.google.com/store/apps/details?id=com.mattdonders.movingchecklist' },
    support: { subject: 'Home Stretch Support' },
    privacy: '/apps/home-stretch/privacy',
  },
  {
    slug: 'tooth-fairy-tracker',
    title: 'Tooth Fairy Tracker',
    description: 'Track every lost tooth, every Tooth Fairy visit, and every payout. No subscriptions, just a simple app for families.',
    headline: 'Every lost tooth, worth remembering.',
    intro: 'Track every lost tooth, every Tooth Fairy visit, and every payout. A simple, joyful app for one of childhood’s best traditions.',
    features: {
      heading: 'Keep the whole story',
      items: [
        { title: 'Mouth diagram', body: 'An interactive diagram shows which teeth have come out and which are still hanging on. Tap a tooth to log it.' },
        { title: 'Visit history', body: 'Every Tooth Fairy visit with its date, amount, and notes. Something to read back together years from now.' },
        { title: 'Your family’s rate', body: 'Record whatever amount works for your family and see the running total for each child.' },
        { title: 'Several children', body: 'Each child gets their own diagram, history, and totals. One purchase unlocks as many profiles as you need.' },
        { title: 'Private by design', body: 'No account and no internet needed. Everything stays on your device. No analytics, no tracking, no ads.' },
        { title: 'Made for kids too', body: 'Large tap targets, a clean layout, and Dynamic Type support, so the whole family can use it.' },
      ],
    },
    pricing: {
      heading: 'Free for your first child.',
      intro: 'Upgrade once for the whole family.',
      tiers: [
        { name: 'Free', price: '$0', items: ['One child profile', 'Full mouth diagram', 'Visit history and notes', 'Payout tracking'] },
        { name: 'Unlimited Children', price: '$3.99', cadence: 'one-time', highlight: true, items: ['Unlimited child profiles', 'Separate history per child', 'Running totals per child', 'No subscription'] },
      ],
    },
    android: { status: 'live', url: 'https://play.google.com/store/apps/details?id=com.toothfairytracker' },
    support: { subject: 'Tooth Fairy Tracker Support' },
    privacy: '/apps/tooth-fairy-tracker/privacy',
  },
  {
    slug: 'good-trim',
    title: 'Good Trim - Boat Maintenance Log',
    description: 'Good Trim is an offline iPhone maintenance log for boats. Track due work by date and engine hours, keep service history, and export your records.',
    headline: 'Know what is due. Keep what was done.',
    intro: 'Good Trim keeps a serious maintenance record for your boat. See upcoming work, log completed service, and keep the details together, even when you are offline.',
    features: {
      heading: 'A maintenance record you can rely on',
      items: [
        { title: 'Know what is due', body: 'See overdue and upcoming work in one place, with the date or engine-hour threshold behind each status.' },
        { title: 'Track both clocks', body: 'Set intervals by calendar date, engine hours, or whichever comes first. Replacing a meter keeps earlier readings in context.' },
        { title: 'Keep service history', body: 'Log when work was done, the reading, provider, parts, cost, and notes. Browse the record later without an account.' },
        { title: 'Keep the evidence', body: 'Attach receipts, manuals, photos, and other documents to the equipment or service entry they belong to.' },
        { title: 'Take your records with you', body: 'Make a complete backup, restore it, and export linked CSV files. Boat Pro also creates PDF maintenance reports.' },
        { title: 'Private and offline', body: 'Your maintenance data stays on your iPhone unless you choose to export it. No account, backend, analytics, or ads.' },
      ],
    },
    pricing: {
      heading: 'Start free. Unlock once.',
      intro: 'Good Trim is free to download. Boat Pro is one lifetime purchase, with no subscription.',
      tiers: [
        { name: 'Good Trim Free', price: '$0', items: ['One vessel', 'Unlimited equipment, schedules, and service records', 'Calendar and engine-hour intervals', 'Ten attachments', 'Backup, restore, and CSV export'] },
        { name: 'Boat Pro', price: '$24.99', cadence: 'one-time in the US', highlight: true, promo: { price: '$19.99', label: 'Launch price', until: '2026-10-25' }, items: ['Unlimited vessels', 'Unlimited attachments', 'PDF maintenance reports', 'Richer history filters', 'No subscription'] },
      ],
    },
    support: {
      subject: 'Good Trim Support',
      note: 'Tell me your iPhone model and iOS version, what you were trying to do, and what happened. Please do not email private receipts or a full backup unless I ask for a specific example.',
    },
    faq: [
      { q: 'Why does a task say “baseline needed”?', a: 'An engine-hour schedule needs a usable meter reading to calculate its next threshold. Update the reading for that engine, then check the schedule again.' },
      { q: 'What if I replace an hour meter?', a: 'Record the replacement in Good Trim. It keeps the earlier readings and accumulated hours in the history, so the new meter reading does not erase the old maintenance context.' },
      { q: 'How do I protect or move my records?', a: 'Open Settings and create a backup. Save the file in Files, iCloud Drive, or another place you control. Backup and restore are free. After a restore, check the vessel list and a few service entries before discarding an older copy.' },
      { q: 'Can I export without Boat Pro?', a: 'Yes. CSV export and complete backup and restore are free. Boat Pro adds printable PDF maintenance reports.' },
      { q: 'I bought Boat Pro but it is not unlocked.', a: 'Open Settings and choose Restore Purchase using the Apple Account that bought Boat Pro. Restoring needs an App Store connection. Your records stay readable while the purchase is checked.' },
      { q: 'Can I use Good Trim without an internet connection?', a: 'Yes. Boat records, due dates, service history, attachments, exports, and local reminders all work on the iPhone. Buying or restoring Boat Pro uses the App Store.' },
      { q: 'How do refunds work?', a: 'Apple handles purchases and refunds. Requests go through <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.' },
    ],
    privacy: '/apps/good-trim/privacy',
  },
  {
    slug: 'quizparade',
    title: 'Quiz Parade - Family Trivia',
    description: 'Quiz Parade is a family-friendly trivia game for iPhone with a new Daily Quiz every morning, themed question packs, and Game Center leaderboards.',
    headline: 'A new Daily Quiz every morning.',
    intro: 'Quiz Parade is a bright, family-friendly trivia game for iPhone. Play the Daily Quiz, work through themed packs on geography, science, flags and more, and see how you stack up on the leaderboards.',
    features: {
      heading: 'Quick to play, fun to share',
      items: [
        { title: 'Daily Quiz', body: 'A fresh pair of questions every day. The first is also turned into a short video for YouTube; the second is only in the app.' },
        { title: 'Themed packs', body: 'Geography, science, flags, general knowledge and family favorites, with new packs arriving without an app update.' },
        { title: 'Leaderboards', body: 'Compare scores with friends through Game Center. Signing in is optional; the game works the same without it.' },
        { title: 'Checked questions', body: 'Every Daily Quiz question is checked against a published source before it is released.' },
        { title: 'Family-friendly', body: 'Evergreen, family-safe trivia that grown-ups and kids can play together.' },
        { title: 'No account', body: 'No sign-up and no personal information. Your scores and stats stay on your device.' },
      ],
    },
    links: [{ label: 'Watch on YouTube', href: 'https://www.youtube.com/@quizparade' }],
    support: {
      subject: 'Quiz Parade Support',
      note: 'Send a note with your device model, iOS version and what happened. If a question looks wrong, tell me which pack or Daily date it was in and I will check it.',
    },
    faq: [
      { q: 'Where do new Daily Quizzes come from?', a: 'Each Daily is prepared in advance, checked against published sources, and released in the app every day.' },
      { q: 'How do I turn the daily reminder on or off?', a: 'The reminder is off by default. Turn it on or off in Quiz Parade’s Settings. If notifications are off for Quiz Parade in the iOS Settings app, turn them on there too.' },
      { q: 'Do I need a Game Center account?', a: 'No. Game Center is only used for leaderboards. Without it, every quiz and your on-device stats still work.' },
    ],
    privacy: '/apps/quizparade/privacy',
  },
  {
    slug: 'clear-north',
    title: 'Clear North: Aurora Alerts',
    description: 'Clear North is an iPhone aurora alert app that only pings you when it is dark, clear, and the aurora is strong enough for your latitude.',
    headline: 'Only when you can see it.',
    intro: 'Most aurora alerts fire whenever the sun does something. Clear North waits until three things are true where you are, so a ping means the sky is worth stepping outside for.',
    callout: {
      eyebrow: 'The rule',
      heading: 'An alert fires only when all three hold.',
      items: [
        { title: 'Dark', body: 'It is astronomical darkness at your location, not just after sunset.' },
        { title: 'Clear', body: 'Cloud cover is under 40%, from MET Norway forecasts.' },
        { title: 'Strong', body: 'The Kp index is high enough for your latitude (for example Kp 6+ at 45°N), from NOAA SWPC.' },
      ],
    },
    features: {
      heading: 'Quiet by default, loud when it matters',
      items: [
        { title: 'Tonight', body: 'A plain verdict (Likely, Possible, or Unlikely) with the best viewing window and an hour-by-hour view.' },
        { title: 'Alerts you control', body: 'A nightly limit (default 2) and quiet hours keep it from nagging. An optional dusk heads-up is a forecast note around sunset on a good-looking night; it says what to expect after dark, not that aurora is visible.' },
        { title: 'Wake me for major storms', body: 'Optional. Kp 7+ storms can arrive as time-sensitive notifications, even during quiet hours, but still only when it is dark and clear.' },
        { title: 'Outlook', body: 'The next three nights, a rough 27-day guide, and a look at what the sun has been doing.' },
        { title: 'Red night-vision mode', body: 'A red-only display that protects your dark-adapted eyes while you are out watching.' },
        { title: 'Coarse location only', body: 'The app rounds your position on your device to a large grid cell. Precise coordinates are never sent. No account, no ads, no tracking.' },
      ],
    },
    pricing: {
      heading: 'Check tonight free. Unlock the alerts.',
      tiers: [
        { name: 'Clear North Free', price: 'Free', items: ['Tonight’s verdict', 'Best window and hour-by-hour view', 'Red night-vision mode'] },
        { name: 'Clear North Pro', price: 'Yearly or lifetime', highlight: true, items: ['Aurora alerts', '3-night and 27-day outlook', 'Multiple locations', 'Yearly plan includes a 7-day free trial', 'Or buy Pro once, for life'] },
      ],
      footnote: 'Prices will be shown in the App Store at launch.',
    },
    price: 'Free, with Pro yearly or lifetime',
    support: { url: '/apps/clear-north/support' },
    privacy: '/apps/clear-north/privacy',
    credits: 'Cloud forecasts: <a href="https://api.met.no/">MET Norway</a> (licensed <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>). Geomagnetic data: <a href="https://www.swpc.noaa.gov/">NOAA Space Weather Prediction Center</a>. Clear North is an independent app and is not endorsed by MET Norway or NOAA.',
  },
  {
    slug: 'puck-passport',
    title: 'Puck Passport',
    description: 'Puck Passport keeps a record of every NHL game you go to: the score, the building, and the season, with your rinks, teams, and record in the building.',
    headline: 'Proof you were there.',
    intro: 'Keep a record of your life as a hockey fan. Every NHL game you go to is kept with its score, its building, and its season, and your history grows with each one.',
    features: {
      heading: 'Your life as a fan, kept',
      items: [
        { title: 'Log a game in seconds', body: 'Find the game by where you are, the date, the team, or a photo you took there. Scores and details fill in for you.' },
        { title: 'Your Passport', body: 'Games attended, buildings visited, seasons, and your record when you are in the building, all in one place.' },
        { title: 'Rinks', body: 'Every arena you have been to, when you first went, and how often you go back.' },
        { title: 'Seasons', body: 'Each season’s games in order, with the result of every one.' },
        { title: 'Share a game', body: 'Turn a single game, or your whole Passport, into a card to share.' },
        { title: 'On the web too', body: 'Your Passport is also at puckpassport.app. Sign in there with Google or email to see the same games.' },
      ],
    },
    callout: {
      eyebrow: 'Where the data comes from',
      heading: 'Real games, real scores.',
      body: 'Schedules and results come from HockeyGameBot, the service I built to follow every NHL game. You only log that you were there.',
    },
    links: [{ label: 'Visit puckpassport.app', href: 'https://puckpassport.app' }],
    support: { url: 'https://puckpassport.app/support' },
    privacy: 'https://puckpassport.app/privacy',
  },
];

export const appPageFor = (slug: string) => appPages.find(p => p.slug === slug);
