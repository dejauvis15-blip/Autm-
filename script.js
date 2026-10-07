const addFriendButton = document.querySelector("#add-friend-btn");
const feed = document.querySelector(".feed");
const dialog = document.querySelector("#add-friend-dialog");
const form = document.querySelector("#add-friend-form");
const nameInput = document.querySelector("#friend-name-input");
const closeButton = document.querySelector("#close-dialog-btn");
const cancelButton = document.querySelector("#cancel-dialog-btn");

function addFriendCard(name) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <div class="card-header">
      <span class="avatar">${name[0].toUpperCase()}</span>
      <span class="friend">${name}</span>
      <span class="badge inactive">Not listening</span>
    </div>
    <div class="card-body">
      <div class="card-text">
        <p class="song">No song yet</p>
        <p class="artist">Quiet right now</p>
      </div>
    </div>
  `;

  feed.appendChild(card);
}

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

  addFriendCard(name);
  form.reset();
  dialog.close();
});
