const params = new URLSearchParams(window.location.search);
const username = params.get("user") || MY_USERNAME;

const profileAvatar = document.querySelector("#profile-avatar");
const profileName = document.querySelector("#profile-name");
const profileHandle = document.querySelector("#profile-handle");
const lastfmLink = document.querySelector("#lastfm-link");
const picksTitle = document.querySelector("#picks-title");

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

profileAvatar.textContent = username[0].toUpperCase();
showAvatar(profileAvatar, username);
showAvatar(document.querySelector("#my-avatar"), MY_USERNAME);

showProfile();
setupTabs(username);
showTopLists(username, "7day");