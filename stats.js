const totalPlays = document.querySelector("#total-plays");
const changePill = document.querySelector("#change-pill");
const dailyChart = document.querySelector("#daily-chart");
const dailyAverage = document.querySelector("#daily-average");
const tileTopArtist = document.querySelector("#tile-top-artist");
const tileTopArtistPlays = document.querySelector("#tile-top-artist-plays");

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

showAvatar(document.querySelector("#my-avatar"), MY_USERNAME);
setupTabs(MY_USERNAME);
showTopLists(MY_USERNAME, "7day");
showOverview();