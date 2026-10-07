# 🎵 Autm — Music Stat Tracker

Autm is a music statistics and social listening web app that lets users explore their listening habits while seeing what their friends are listening to.

The project combines **music analytics, social features, UI/UX design, and front-end development** into one experience.

> 🚧 Autm is currently in active development.

---

## ✨ About Autm

Most music apps focus primarily on streaming music.

Autm is focused on the data and social side of listening.

Users can view their own music statistics, see what their friends are currently listening to, and explore listening activity through a clean dashboard-style interface.

Autm uses the **Last.fm API** to retrieve real listening data from users who connect services such as Spotify, Apple Music, or YouTube Music to Last.fm.

---

## 🚀 Current Features

### 👥 Friends Feed

- Add friends using their Last.fm username
- View what friends are currently listening to
- See song and artist information
- Display album artwork
- View active / last active status
- Automatically refresh listening activity
- Search through added friends
- Remove friends
- Save friends using `localStorage`

### 🎧 Recently Played

Autm combines recently played songs from friends and displays them in chronological order.

### 📊 Your Week

Users can view statistics including:

- Total plays
- Top artist
- Top track
- Top album

### 📈 My Stats

The stats page currently includes:

- Top 5 artists
- Top 5 tracks
- Top 5 albums
- 7-day statistics
- 1-month statistics
- 1-year statistics
- Dynamic Last.fm data

---

## 🛠️ Tech Stack

### Current

- HTML5
- CSS3
- JavaScript
- Last.fm API
- LocalStorage
- Git
- GitHub
- Figma

### Planned

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- Recharts or Chart.js
- Vercel

---

## 🔌 Last.fm Integration

Autm uses the **Last.fm API** to retrieve real music listening information.

This allows the app to access:

- Recently played tracks
- Currently playing tracks
- Top artists
- Top albums
- Top tracks
- Play counts
- Listening history

Friend listening activity refreshes automatically so users can see what their friends are listening to in near real time.

---

## 🎨 Design

Autm was designed in **Figma** before development began.

The project currently includes desktop wireframes for the major screens, while the web application is being developed with responsive and mobile-friendly behavior in mind.

The interface focuses on:

- Clean information hierarchy
- Music-focused visuals
- Simple navigation
- Easy-to-read statistics
- Social listening activity
- Reusable interface components

---

## 🗺️ Project Roadmap

### ✅ Phase 1 — Front-End Foundations

- Build the static friends feed
- Create friend cards
- Build navigation and sidebar
- Match the Figma designs

### ✅ Phase 2 — JavaScript Interaction

- Add friends
- Remove friends
- Store friends with LocalStorage
- Search friends
- Update friend counts dynamically

### ✅ Phase 3 — Last.fm API

- Connect to real music data
- Display currently playing songs
- Show recently played tracks
- Display album artwork
- Automatically refresh listening activity

### 🚧 Phase 4 — Music Statistics

- Top artists
- Top songs
- Top albums
- Time-period filtering
- Total plays
- Listening charts

### 🔜 Phase 5 — Next.js

Rebuild the application using:

- Next.js
- React
- TypeScript
- Tailwind CSS

This phase will introduce reusable components and a more scalable application architecture.

### 🔜 Phase 6 — Accounts & Social Features

Planned features include:

- User authentication
- Supabase database
- Saved profiles
- Friend system
- Compatibility scores
- Listening streaks
- Badges
- Leaderboards
- Personalized dashboards

---

## 🔮 Future Features

Some ideas planned for later versions of Autm include:

- 🎵 Music compatibility scores
- 🔥 Listening streaks
- 🏆 Music badges
- 📊 Interactive listening charts
- 🥇 Friend leaderboards
- 📱 Progressive Web App support
- 🤝 Improved friend/follow system
- 🎨 Artist profile pages
- 📤 Shareable music statistics
- 📈 Listening trends over time

---

## 📂 Project Structure

```text
Autm--Music-Stat-Tracker/
│
├── images/
│
├── index.html
├── stats.html
├── style.css
├── script.js
├── stats.js
├── lastfm.js
├── PROJECT_NOTES.md
└── .gitignore
