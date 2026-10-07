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
- **Design:** done in Figma as 11 desktop screens (1440px wide), file
  "Music With Friends – Wireframes":
  https://www.figma.com/design/gsZbsMjMW1Xv45DV1to7RU/Music-With-Friends-%25E2%2580%2593-Wireframes?node-id=17-2
  Build each screen to match it. The colors in `style.css` (`--ink-900` … `--mist-100`)
  are the same as the Figma variables.
- **Mobile:** the Figma screens are desktop, but the notes above say mobile-first.
  Still to decide how the sidebar works on a phone.
- **Friends:** right now friends are saved only in my own browser (`localStorage`).
  Still to decide: "follow" (one-way, like Instagram) or "friend requests" (both people
  agree, like Snapchat). Mutual requests need accounts and a database (Supabase, Week 8+).

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

- [x] VS Code, Git and the Live Server extension set up ("Go Live" in the bottom bar)
- [ ] Node.js (LTS), not needed until Week 5
- [x] Figma wireframes: 11 desktop screens (see Key decisions)
- [x] **Week 1: static Feed page matching Figma** (`index.html` + `style.css`)
  - Friend cards with album art, Active / "Last active" badges and progress bars
  - Page header, "Listening now", Recently played list, Your week box
  - Sidebar with logo (`images/logo.svg`), nav links and profile
  - Learned: CSS variables, flexbox, grid, `flex: 1`, `space-between`, gradients,
    `:hover`, semantic tags (`header`, `main`, `aside`, `nav`), Inspect in DevTools
- [x] **Week 2: JavaScript** (`script.js`)
  - "+ Add friend" opens a pop-up (`<dialog>`) that matches Figma screen 03
  - Submitting the form builds a new friend card (`createElement`, `innerHTML`)
  - Friends are saved in `localStorage`, so they stay after a refresh
  - ✕ button removes a friend; subtitle shows a live count ("2 of 4 friends…")
  - Learned: `querySelector(All)`, `addEventListener`, functions, `if`/`return`,
    template literals, arrays (`push`, `indexOf`, `splice`, `forEach`), JSON
- [ ] Optional challenges: capitalize added names; say "friend" (not "friends") for 1
- [x] **Week 3: real Last.fm data** (`config.js` holds the API key and is in `.gitignore`)
  - Friend cards show the real current song, album art, profile picture, and an
    "Active" or "Last active X min ago" badge; they refresh every 30 seconds
  - Recently played merges all friends' finished songs, newest first
  - Your week: real plays, top artist, track and album for the last 7 days
  - Search box filters friend cards; two "+ Add friend" buttons share one class
  - Learned: `fetch`, `async`/`await`, JSON, `?.`, `||` fallbacks, `classList`,
    `dataset`, `setInterval`, objects, `for...of`, `sort`, `slice`, `Date.now()`
- [ ] **Week 4: My Stats page** (`stats.html` + `stats.js`, Figma screen 05)
  - [x] 4.1 Page created and linked from the sidebar and "See my stats".
        Shared code lives in `lastfm.js` (`MY_USERNAME`, `callLastfm`, `showAvatar`,
        `realImage`), loaded by both pages before their own script
  - [x] 4.2 Real top 5 artists, tracks and albums; 7 days / 1 month / 1 year tabs work.
        Learned: `.map()`, ternary `? :`, `Promise.all`, `encodeURIComponent`,
        objects as lookup tables, `:first-child`, `text-overflow: ellipsis`
  - [ ] **4.3 (next):** overview row: total plays, daily plays bar chart, side tiles
- [ ] Later: artist photos. Last.fm has no artist photos (only a gray star
      placeholder), and no art at all for small artists like Lil Dre6o and Loe Shimmy.
      Spotify's API has them but needs a secret key on a server, so do it in Next.js
      (Week 5+). For now, artists without art show a letter circle.
- [ ] Ask a few friends to make Last.fm accounts, connect Spotify, and get added

## Lessons from mistakes

- CSS ignores broken lines silently. If a style does nothing, look for a typo:
  `--mist-10` instead of `--mist-100`, `.progress.fill` instead of `.progress-fill`,
  `width: 70` without `px`.
- One extra `</div>` can push a whole section out of the layout. Click a tag in VS Code
  to see its matching closing tag, or press Shift+Alt+F to reformat.
- Everything visible goes between `<body>` and `</body>`. Nothing goes after `</body>`.
- In JavaScript, order matters: count or read things *after* they're added to the page.
- Turn on File → Auto Save in VS Code. Unsaved files were the cause of "nothing changed".
- When part of the page disappears, open the Console (F12). One JavaScript error stops
  everything after it. A *syntax* error (like a stray `:`) stops the whole file.
- When moving code between files, cut the *whole* function, paste it, and save both
  files. A half-moved function left `data is not defined` behind.
- HTML that JavaScript fills in still needs its container (`<ul class="recent-list">`)
  and its `id`s. `querySelector` returns `null` if the element isn't there.

## Learning tips

- Type the code yourself, don't copy-paste.
- Commit to GitHub at the end of every session.
- Stuck for more than 30 minutes? Ask, and paste the error.
