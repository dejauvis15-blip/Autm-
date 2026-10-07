const addFriendButton = document.querySelector("#add-friend-btn");
const feed = document.querySelector(".feed");

addFriendButton.addEventListener("click", function () {
  const name = prompt("What's your friend's name?");

  if (!name) {
    return;
  }
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
        <p class="artist">Connects to Last.fm in Week 3</p>
      </div>
    </div>
  `;

  feed.appendChild(card);
});
