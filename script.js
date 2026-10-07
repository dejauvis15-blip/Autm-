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
