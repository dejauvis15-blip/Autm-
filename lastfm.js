const MY_USERNAME = "Jauvisss";

async function callLastfm(params) {
  const url = `https://ws.audioscrobbler.com/2.0/?${params}&api_key=${LASTFM_API_KEY}&format=json`;
  const response = await fetch(url);
  return await response.json();
}

async function showAvatar(avatar, username) {
  const data = await callLastfm(`method=user.getinfo&user=${username}`);

  if (data.error) {
    return;
  }

  const picture = data.user.image[2]["#text"];

  if (picture) {
    avatar.innerHTML = `<img src="${picture}" alt="">`;
  }
}
function realImage(url) {
  if (!url || url.includes("2a96cbd8b46e442fc41c2b86b821562f")) {
    return "";
  }

  return url;
}
function timeAgo(timestamp) {
  const seconds = Math.floor(Date.now() / 1000) - Number(timestamp);
  const minutes = Math.floor(seconds / 60);

  if (minutes < 1) {
    return "just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}