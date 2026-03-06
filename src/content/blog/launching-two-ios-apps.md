---
title: "Launching two iOS apps in one week"
description: "I built and shipped Home Stretch and Tooth Fairy Tracker — two native iOS apps — in a single sprint. Here's how it went."
pubDate: 2026-03-06
tags: ["ios", "swiftui", "apps", "launch"]
draft: true
---

I just submitted two iOS apps to the App Store in the same week. Neither is a todo app clone or a calculator tutorial — they're real apps solving real problems, built with SwiftUI and SwiftData, with in-app purchases and App Store listings.

Here's what I shipped, how I built them, and what I learned.

## The apps

### Home Stretch: Moving Checklist

Moving is one of those things that happens rarely enough that you forget how chaotic it is every time. Home Stretch organizes every task into timeline phases — 8 weeks out, 6 weeks out, all the way through after the move.

Set your move date once and the app surfaces the right tasks at the right time. You can check them off, add custom tasks, hide ones that don't apply, and export the whole thing as a PDF.

[Check it out &rarr;](/apps/home-stretch)

### Tooth Fairy Tracker

Every parent goes through the lost tooth phase. The Tooth Fairy shows up, leaves some money, and eventually you can't remember which tooth it was or how much you left last time. Tooth Fairy Tracker has an interactive mouth diagram, visit history with dates and amounts, and support for multiple kids.

[Check it out &rarr;](/apps/tooth-fairy-tracker)

## The stack

Both apps share the same foundation:

- **SwiftUI** for the UI — declarative, fast to iterate on, and native
- **SwiftData** for persistence — local-only, no server, no account required
- **StoreKit 2** for in-app purchases — one-time unlock, no subscriptions
- **iOS 17+** minimum — lets me use the latest APIs without compatibility hacks

No third-party dependencies. No React Native. No Expo. Just native Swift.

## The monetization model

Both apps follow the same pattern: free tier with a hard limit, one-time IAP to unlock everything. No subscriptions, no ads, no nag screens.

- **Home Stretch**: First 2 phases free, $2.99 to unlock all 6 phases + custom tasks + PDF export
- **Tooth Fairy Tracker**: One child free, $2.99 to unlock unlimited children

I'm not trying to build a recurring revenue empire. I'm trying to ship useful apps that people pay for once and use.

## What I'd tell someone shipping their first app

**Don't let screenshots block your launch.** I spent way too long looking at screenshot generator tools with paywalls and watermarks. Raw screenshots work fine for V1. You can upgrade the marketing later.

**App Store Connect has a learning curve.** Between metadata, screenshots at specific pixel dimensions, privacy questionnaires, age ratings, IAP review screenshots, and copyright fields — there's a lot of boxes to check. None of it is hard, but none of it is obvious either.

**SwiftData migrations will bite you.** Adding a new property to a `@Model` class without a default value will crash existing installs. For V1 this doesn't matter (no existing users), but post-launch you need `VersionedSchema` and a `SchemaMigrationPlan`. I learned this the hard way on the simulator.

**Ship, then polish.** The temptation to add one more feature, tweak one more animation, or redesign one more screen is real. At some point you have to decide it's good enough and submit. You can always push updates.

## What's next

Both apps are in review. I'll update this post once they're live with App Store links. If either gets traction, I have ideas for V1.1 — but for now, they're shipped and that's what matters.
