const addFriendButton = document.querySelector("#add-friend-btn");

const friends = JSON.parse(localStorage.getItem("friends")) || [];
const feed = document.querySelector(".feed");
const dialog = document.querySelector("#add-friend-dialog");
const form = document.querySelector("#add-friend-form");
const nameInput = document.querySelector("#friend-name-input");
const closeButton = document.querySelector("#close-dialog-btn");
const cancelButton = document.querySelector("#cancel-dialog-btn");
const friendCount = document.querySelector("#friend-count");

function addFriendCard(name) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <div class="card-header">
      <span class="avatar">${name[0].toUpperCase()}</span>
      <span class="friend">${name}</span>
      <span class="badge inactive">Not listening</span>
    <button class="remove-btn" aria-label="Remove friend">✕</button>
    </div>
    <div class="card-body">
      <div class="card-text">
        <p class="song">No song yet</p>
        <p class="artist">Quiet right now</p>
      </div>
    </div>
  `;

  const removeButton = card.querySelector(".remove-btn");

  removeButton.addEventListener("click", function () {
    const index = friends.indexOf(name);
    friends.splice(index, 1);
    saveFriends();
    card.remove();
  });
  feed.appendChild(card);
  showNowPlaying(card, name);
}

function saveFriends() {
  localStorage.setItem("friends", JSON.stringify(friends));
}

friends.forEach(function (name) {
  addFriendCard(name);
});

updateFriendCount(); 

addFriendButton.addEventListener("click", function () {
  dialog.showModal();
});

closeButton.addEventListener("click", function () {
  dialog.close();
});

cancelButton.addEventListener("click", function () {
  dialog.close();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();

  if (!name) {
    return;
  }

  friends.push(name);
  saveFriends();
  addFriendCard(name);
  updateFriendCount();
  form.reset();
  dialog.close();
});

function updateFriendCount() {
  const total = feed.querySelectorAll(".card").length;
  const listening = feed.querySelectorAll(".badge:not(.inactive)").length;

  friendCount.textContent = `${listening} of ${total} friends are listening right now`;
}


async function getNowPlaying(username) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.error) {
    return null;
  }

  return data.recenttracks.track[0];
}
async function showNowPlaying(card, username) {
  const track = await getNowPlaying(username);

  if (!track) {
    return;
  }

  card.querySelector(".card-body").innerHTML = `
    <img src="${track.image[2]["#text"]}" alt="${track.name} cover art">
    <div class="card-text">
      <p class="song">${track.name}</p>
      <p class="artist">${track.artist["#text"]}</p>
    </div>
  `;

  const isPlaying = track["@attr"]?.nowplaying === "true";

  if (isPlaying) {
    const badge = card.querySelector(".badge");
    badge.textContent = "Active";
    badge.classList.remove("inactive");
  }

  updateFriendCount();
}
