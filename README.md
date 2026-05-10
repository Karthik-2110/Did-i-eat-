# Did I Eat? 🥗

> **Did I Eat?** is an AI-powered meal and grocery planner that learns your health goals, gut sensitivities, and budget — then builds your weekly Instamart cart, schedules it, and asks for your approval before ordering anything.

An AI agent that takes the mental load out of eating right for busy professionals who care about protein goals and gut health. Built on Swiggy's MCP APIs — **Instamart** for weekly grocery planning, **Food** and **Dineout** for curated cheat-meal days.

---

## Project Overview

You know what to eat. You just don't have the bandwidth between standups, slack threads, and a 7pm meeting that should have been an email. **Did I Eat?** is the friend who already did the thinking — it knows you're lactose-sensitive, hits 120g of protein on weekdays, doesn't want to spend more than ₹1,500 a week on groceries, and would actually love a biryani on Saturday.

The agent runs a quick conversational onboarding, generates a 7-day meal plan, maps every ingredient to an Instamart SKU, schedules deliveries across the week, and shows you the cart **before** placing the order. Approve it in one tap. Toggle Cheat Meal Mode and the same agent flips into Dineout/Food mode and curates restaurants by mood instead of macros.

Think Notion meets MyFitnessPal, with a Swiggy-shaped backend doing the dirty work.

---

## Core Features

- **Conversational onboarding** — A chat-style flow that captures protein goals, dietary preference, gut sensitivities (lactose, gluten, raw alliums, spice tolerance), weekly grocery budget, and how many minutes you'll actually spend cooking. No 14-step settings page.
- **Weekly nutrition cockpit** — Animated rings for protein/carbs/fats, a streak counter, and the daily "Hey, did you eat today?" nudge that's half greeting, half guilt trip.
- **AI-built Instamart cart with approval gate** — The agent assembles the cart; you approve before anything ships. COD-friendly, no surprise charges.
- **7-day meal planner** — Breakfast / lunch / dinner per day, each meal with macro chips and a one-tap re-roll. Empty days get a "Let AI plan this" CTA instead of a guilt trip.
- **Scheduled delivery timeline** — Items grouped by delivery day, with a budget tracker and an order-status stepper (Scheduled → Approval → Ordered → Delivered).
- **Cheat Meal Mode** — One toggle and the whole UI warms up. Curated Dineout/Food picks filtered by mood: Comfort Food, High Protein Cheat, Light Indulgence, Full Send.
- **Profile & achievements** — Editable health profile, animated goal rings, and a shelf of unlockable badges (First Clean Week, Protein Streak, Budget Boss, Iron Gut). Mostly for the dopamine.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | **Next.js** (React, App Router) |
| Backend / DB / Auth | **Supabase** (Postgres, Row-Level Security, Auth) |
| Hosting | **Vercel** (frontend) + Supabase Edge Functions (agent orchestration) |
| Commerce | **Swiggy MCP APIs** — Instamart (groceries), Food (delivery), Dineout (restaurants) |
| Intelligence | **LLM** for onboarding interpretation, meal planning, ingredient → SKU mapping, and Cheat-Mode curation |

The current prototype is React + vanilla CSS in a single HTML file — production swap to Next.js + Supabase is a straight port.

---

## Current Status

🧪 **Frontend prototype** with placeholder data across all six screens (Onboarding, Dashboard, Planner, Cart, Cheat Meal, Profile). UI flows, animations, and state transitions are fully wired and clickable.

🔌 **MCP integration pending API access.** Once Swiggy MCP credentials are in hand, the placeholder cart/restaurant/delivery data is swapped out for live Instamart, Food, and Dineout calls behind the same component contracts. The LLM agent layer (meal planning, SKU mapping) is scaffolded but stubbed.

🗓️ **Up next:** Supabase schema for user profiles + meal history, agent orchestration via Edge Functions, and a real approval flow that writes to the Instamart cart endpoint.

---

## How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/<your-handle>/did-i-eat.git
cd did-i-eat

# 2. Open the prototype
# It's a single self-contained HTML file — no build step yet.
open "Did I Eat.html"
# or, with a tiny dev server:
npx serve .
```

That's it. Everything renders client-side from placeholder data. No `.env`, no API keys, no install.

When the Next.js port lands:

```bash
pnpm install
cp .env.example .env.local   # add SUPABASE_URL, SUPABASE_ANON_KEY, SWIGGY_MCP_TOKEN, OPENAI_API_KEY
pnpm dev
```

---

## A Note

This is a **pitch prototype built for the Swiggy Builders Club application**. It exists to show the shape of the product, the interaction model, and how Instamart + Food + Dineout could compose into a single weekly eating-rhythm agent — not to be a finished app. If you're reading this from inside Swiggy: hiiii, I'm a solo entrepreneur who is working as a design engineer. 👋

Built with ♥ for people who forget to eat.
