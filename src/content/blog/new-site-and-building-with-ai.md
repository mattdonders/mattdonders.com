---
title: "New site, new stack, and building faster with AI"
description: "I replaced a WordPress site I hadn't touched in years with a custom Astro site in an afternoon - and Claude did most of the heavy lifting."
pubDate: 2026-02-21
tags: ["meta", "ai", "cloudflare", "astro"]
draft: false
---

If you're reading this, the new site is live. That feels worth writing about - not because a personal portfolio launch is particularly newsworthy, but because of *how* it happened.

## The old site

`mattdonders.com` was running on WordPress. I think I last updated it sometime around 2022. It had a theme I half-customized, a few pages I mostly ignored, and the kind of accumulated WordPress cruft that happens when you set something up and never really commit to maintaining it.

It worked, technically. But it felt like a house I'd stopped living in.

## The new stack

The new site is [Astro](https://astro.build) — a static site generator that outputs plain HTML with zero JavaScript by default. It's fast, it's simple to maintain, and it deploys to [Cloudflare Pages](https://pages.cloudflare.com) for free. The whole thing builds in under 3 seconds.

The workflow is exactly what I wanted: write Markdown, push to GitHub, site updates. No CMS to log into, no plugins to update, no hosting bills.

## Where AI actually helped

Here's the part I keep thinking about: I went from "empty directory" to a fully designed, deployed site in a single afternoon session with Claude.

Not "AI wrote some boilerplate and I filled in the rest." More like: I described what I wanted, we had a back-and-forth about design decisions, and the site materialized. Dark theme, custom CSS, project cards with status badges, blog with content collections, security headers, the works.

A few years ago this would've been a weekend project - assuming I had the motivation to start it at all.

What's changed isn't that AI writes perfect code on the first try. It doesn't, and this build had its share of bumps (the Cloudflare Pages deployment setup was... a journey). What's changed is the *iteration speed*. When something breaks, you fix it in the same conversation. When you want to try a different layout, you just describe it. The friction between "idea" and "thing that exists" has dropped dramatically.

I've started to think of it less like using a tool and more like having a collaborator who's available at 11pm when I finally have time to work on side projects.

## What's next

I have a few apps in various stages of development that I'll write about as they get closer to launch. There's also a hockey-related project I've been tinkering with for years that might finally be worth shipping.

The goal for this site is simple: a place to document what I'm building and share things I've learned along the way. Updates will come when there's something worth saying - which, given how much faster I'm able to build things lately, might be more often than I expected.
