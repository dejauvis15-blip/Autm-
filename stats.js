const topArtistsList = document.querySelector("#top-artists");
const topTracksList = document.querySelector("#top-tracks");
const topAlbumsList = document.querySelector("#top-albums");
const tabs = document.querySelectorAll(".tab");
const totalPlays = document.querySelector("#total-plays");
const changePill = document.querySelector("#change-pill");
const dailyChart = document.querySelector("#daily-chart");
const dailyAverage = document.querySelector("#daily-average");
const tileTopArtist = document.querySelector("#tile-top-artist");
const tileTopArtistPlays = document.querySelector("#tile-top-artist-plays");

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

  return realImage(data.track?.album?.image[2]["#text"]);
}

async function getArtistImage(artist) {
  const name = encodeURIComponent(artist.name);
  const data = await callLastfm(`method=artist.gettopalbums&artist=${name}&limit=1`);

  return realImage(data.topalbums?.album[0]?.image[2]["#text"]);
}


async function showTopLists(period) {                    
  const artists = await callLastfm(`method=user.gettopartists&user=${MY_USERNAME}&period=${period}&limit=5`);
  const tracks = await callLastfm(`method=user.gettoptracks&user=${MY_USERNAME}&period=${period}&limit=5`);
  const albums = await callLastfm(`method=user.gettopalbums&user=${MY_USERNAME}&period=${period}&limit=5`);
  const artistImages = await Promise.all(artists.topartists.artist.map(getArtistImage));
  const trackImages = await Promise.all(tracks.toptracks.track.map(getTrackImage));
  const recent = await callLastfm(`method=user.getrecenttracks&user=${MY_USERNAME}&limit=200`);
  const artFromHistory = {};

  recent.recenttracks.track.forEach(function (track) {
    const artistName = track.artist["#text"];
        const image = realImage(track.image[2]["#text"]);

    if (image && !artFromHistory[artistName]) {
      artFromHistory[artistName] = image;
    }
  });
  
   renderTopList(topArtistsList, artists.topartists.artist.map(function (artist, index) {
    return { name: artist.name, subtitle: "", plays: artist.playcount,image: artistImages[index] || artFromHistory[artist.name] || ""  };
  })); 

  renderTopList(topTracksList, tracks.toptracks.track.map(function (track, index) {
    return { name: track.name, subtitle: track.artist.name, plays: track.playcount, image: trackImages[index] };
  }));

  renderTopList(topAlbumsList, albums.topalbums.album.map(function (album) {
    return { name: album.name, subtitle: album.artist.name, plays: album.playcount, image: album.image[2]["#text"] };
  }));
}

async function getPlaysSince(timestamp) {
  const plays = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const data = await callLastfm(`method=user.getrecenttracks&user=${MY_USERNAME}&from=${timestamp}&limit=200&page=${page}`);
    totalPages = Number(data.recenttracks["@attr"].totalPages);

    data.recenttracks.track.forEach(function (track) {
      if (track.date) {
        plays.push(Number(track.date.uts));
      }
    });

    page = page + 1;
  }

  return plays;
}
async function showOverview() {
  const now = Math.floor(Date.now() / 1000);
  const weekAgo = now - 7 * 24 * 60 * 60;
  const twoWeeksAgo = now - 14 * 24 * 60 * 60;

  const plays = await getPlaysSince(weekAgo);
  const lastWeek = await callLastfm(`method=user.getrecenttracks&user=${MY_USERNAME}&from=${twoWeeksAgo}&to=${weekAgo}&limit=1`);
  const lastWeekTotal = Number(lastWeek.recenttracks["@attr"].total);

  totalPlays.textContent = plays.length.toLocaleString();
  dailyAverage.textContent = Math.round(plays.length / 7);

  if (lastWeekTotal > 0) {
    const change = Math.round((plays.length - lastWeekTotal) / lastWeekTotal * 100);
    changePill.textContent = (change >= 0 ? "+" : "") + change + "% vs last week";
  }

  const days = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    days.push({
      label: day.toLocaleDateString("en-US", { weekday: "short" }),
      key: day.toDateString(),
      count: 0
    });
  }

  plays.forEach(function (timestamp) {
    const key = new Date(timestamp * 1000).toDateString();
    const day = days.find(function (d) {
      return d.key === key;
    });

    if (day) {
      day.count = day.count + 1;
    }
  });

  const most = Math.max(...days.map(function (d) {
    return d.count;
  }));

  dailyChart.innerHTML = "";

  days.forEach(function (day) {
    const height = most > 0 ? Math.max(4, Math.round(day.count / most * 113)) : 4;
    const isTop = most > 0 && day.count === most;

    const column = document.createElement("div");
    column.className = "chart-day";
    column.innerHTML = `
      <div class="chart-bar ${isTop ? "top" : ""}" style="height: ${height}px" title="${day.label}: ${day.count} plays"></div>
      <span class="chart-label">${day.label}</span>
    `;

    dailyChart.appendChild(column);
  });

  const artists = await callLastfm(`method=user.gettopartists&user=${MY_USERNAME}&period=7day&limit=1`);
  const topArtist = artists.topartists.artist[0];

  if (topArtist) {
    tileTopArtist.textContent = topArtist.name;
    tileTopArtistPlays.textContent = `${topArtist.playcount} plays this week`;
  }
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
showOverview();