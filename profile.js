const params = new URLSearchParams(window.location.search);
const username = params.get("user") || MY_USERNAME;

const profileAvatar = document.querySelector("#profile-avatar");
const profileName = document.querySelector("#profile-name");
const profileHandle = document.querySelector("#profile-handle");
const lastfmLink = document.querySelector("#lastfm-link");
const picksTitle = document.querySelector("#picks-title");
const nowPlaying = document.querySelector("#now-playing");
const profileWeekPlays = document.querySelector("#profile-week-plays");
const profileTopArtist = document.querySelector("#profile-top-artist");

async function showProfile() {
  const data = await callLastfm(`method=user.getinfo&user=${encodeURIComponent(username)}`);

  if (data.error) {
    profileName.textContent = "User not found";
    return;
  }

  const user = data.user;
  const joined = new Date(Number(user.registered.unixtime) * 1000)
    .toLocaleDateString("en-US", { month: "short", year: "numeric" });

  profileName.textContent = user.realname || user.name;
  profileHandle.textContent = `@${user.name} · on Last.fm since ${joined}`;
  lastfmLink.href = user.url;
  picksTitle.textContent = `${user.name}'s top picks`;
  document.title = `${user.name} · autm`;
}

async function showProfileNowPlaying() {
  const data = await callLastfm(`method=user.getrecenttracks&user=${encodeURIComponent(username)}&limit=1`);
  const track = data.recenttracks?.track[0];

  if (!track) {
    return;
  }

  const art = realImage(track.image[2]["#text"]);
  const isPlaying = track["@attr"]?.nowplaying === "true";

  const badge = isPlaying
    ? `<span class="badge">Active</span>`
    : `<span class="badge inactive">Last active ${timeAgo(track.date.uts)}</span>`;

  const picture = art ? `<img src="${art}" alt="">` : "";

  nowPlaying.innerHTML = `
    ${picture}
    <span>${track.name} · ${track.artist["#text"]}</span>
    ${badge}
  `;
}

async function showProfileWeek() {
  const weekAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
  const user = encodeURIComponent(username);

  const recent = await callLastfm(`method=user.getrecenttracks&user=${user}&from=${weekAgo}&limit=1`);
  const artists = await callLastfm(`method=user.gettopartists&user=${user}&period=7day&limit=1`);

  if (recent.recenttracks) {
    profileWeekPlays.textContent = Number(recent.recenttracks["@attr"].total).toLocaleString();
  }

  profileTopArtist.textContent = artists.topartists?.artist[0]?.name || "–";
}

profileAvatar.textContent = username[0].toUpperCase();
showAvatar(profileAvatar, username);
showAvatar(document.querySelector("#my-avatar"), MY_USERNAME);

showProfile();
setupTabs(username);
showTopLists(username, "7day");
showProfileNowPlaying();
showProfileWeek();
setInterval(showProfileNowPlaying, 30000);