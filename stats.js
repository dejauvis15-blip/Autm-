const topArtistsList = document.querySelector("#top-artists");
const topTracksList = document.querySelector("#top-tracks");
const topAlbumsList = document.querySelector("#top-albums");
const tabs = document.querySelectorAll(".tab");

function renderTopList(listElement, items) {
  listElement.innerHTML = "";

  items.forEach(function (item, index) {
    const picture = item.image
      ? `<img src="${item.image}" alt="">`
      : `<span class="avatar">${item.name[0].toUpperCase()}</span>`;

    const row = document.createElement("li");
    row.className = "top-row";

    row.innerHTML = `
      <span class="rank">${index + 1}</span>
      ${picture}
      <div class="top-text">
        <p class="top-name">${item.name}</p>
        <p class="top-sub">${item.subtitle}</p>
      </div>
      <span class="top-plays">${item.plays}</span>
    `;

    listElement.appendChild(row);
  });
}
 
async function getTrackImage(track) {
  const artist = encodeURIComponent(track.artist.name);
  const name = encodeURIComponent(track.name);
  const data = await callLastfm(`method=track.getinfo&artist=${artist}&track=${name}`);

  return data.track?.album?.image[2]["#text"] || "";
}

async function getArtistImage(artist) {
  const name = encodeURIComponent(artist.name);
  const data = await callLastfm(`method=artist.gettopalbums&artist=${name}&limit=1`);

  return data.topalbums?.album[0]?.image[2]["#text"] || "";
}


async function showTopLists(period) {                    
  const artists = await callLastfm(`method=user.gettopartists&user=${MY_USERNAME}&period=${period}&limit=5`);
  const tracks = await callLastfm(`method=user.gettoptracks&user=${MY_USERNAME}&period=${period}&limit=5`);
  const albums = await callLastfm(`method=user.gettopalbums&user=${MY_USERNAME}&period=${period}&limit=5`);
  const artistImages = await Promise.all(artists.topartists.artist.map(getArtistImage));
  const trackImages = await Promise.all(tracks.toptracks.track.map(getTrackImage));

   renderTopList(topArtistsList, artists.topartists.artist.map(function (artist, index) {
    return { name: artist.name, subtitle: "", plays: artist.playcount, image: artistImages[index] };
  }));

  renderTopList(topTracksList, tracks.toptracks.track.map(function (track, index) {
    return { name: track.name, subtitle: track.artist.name, plays: track.playcount, image: trackImages[index] };
  }));

  renderTopList(topAlbumsList, albums.topalbums.album.map(function (album) {
    return { name: album.name, subtitle: album.artist.name, plays: album.playcount, image: album.image[2]["#text"] };
  }));
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (otherTab) {
      otherTab.classList.remove("active");
    });

    tab.classList.add("active");
    showTopLists(tab.dataset.period);
  });
});

showAvatar(document.querySelector("#my-avatar"), MY_USERNAME);
showTopLists("7day");