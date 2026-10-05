# Project Notes: Music Stats App

> **For a new Claude session:** read this file first. It summarizes decisions made so far.
> I'm learning to code and want to write the code myself. Walk me through it
> line by line and explain each part. Don't just hand me finished code.

## The idea

A music stats app where I can:
- See my own listening stats (top artists, tracks, albums, total plays)
- See what my friends are listening to right now
- Later: compatibility scores, charts, listening streaks, badges and a leaderboard

I first planned an AI internship tracker (Gmail + AI + rank-up badges), but
switched to this because it's easier to learn on.

## Key decisions

- **Music data source: the Last.fm API**, not the Spotify API.
  - Spotify's API has no friend activity endpoint, only returns the last 50 played
    songs, and limits new apps to a few test users.
  - Last.fm logs ("scrobbles") from Spotify, Apple Music and YouTube Music. Listening
    history is public by username, it has a "now playing" flag, and it only needs a
    free API key from last.fm/api.
  - Each friend makes a free Last.fm account and connects their Spotify.
- **Website first, not a native app.** Build mobile-first (390px wide), then turn it into
  a PWA so friends can "Add to Home Screen". Maybe React Native + Expo later.
- **Design:** quick Figma wireframes first (2–3 hours max), phone size. Vibe reference:
  "Signal Music Mobile App UI/UX Design" on Behance (Claude couldn't open it, so
  share screenshots).

## Screens

1. **Friends feed (home):** a card per friend with album art, song, artist, and a pulsing
   "● Live" badge or "3 min ago"
2. **My Stats:** 7 days / 1 month / 1 year tabs, total plays, top 5 artists/tracks/albums
3. **Friend profile:** the same as My Stats for a friend, plus a compatibility score later

## Tools

| Layer | Tool |
|---|---|
| Weeks 1–4 | Plain HTML, CSS, JavaScript (VS Code + Live Server extension) |
| Music data | Last.fm API |
| Later framework | Next.js + TypeScript + Tailwind |
| Charts | Recharts or Chart.js |
| Database + login | Supabase |
| Hosting | Vercel |
| Design | Figma |

## Roadmap

| Week | Build | Learn |
|---|---|---|
| 1 | Static page of friend cards (album art, song, artist, Live badge) | HTML + CSS |
| 2 | Form to type a username and add a friend card | JavaScript, DOM, events |
| 3 | Real data from Last.fm with `fetch()` | APIs, JSON, async |
| 4 | My Stats page with a time-period switcher | Loops, sorting, data |
| 5–7 | Rebuild in Next.js, add charts, auto-refresh | React, components |
| 8+ | Supabase accounts, saved friends, compatibility, deploy | Databases, auth |

## Where I am

- [ ] Install VS Code, Node.js (LTS), Git, and the Live Server extension
- [ ] Make a Last.fm account, connect Spotify, get an API key (keep it private)
- [ ] Figma wireframes of the 3 screens (phone size)
- [ ] Week 1 code (Week 1 was already walked through for the internship version:
      `index.html` + `style.css`, a dark theme with CSS variables, a responsive card grid,
      and pill-shaped stage labels. Redo it as friend cards.)

## Learning tips

- Type the code yourself, don't copy-paste.
- Commit to GitHub at the end of every session.
- Stuck for more than 30 minutes? Ask, and paste the error.
