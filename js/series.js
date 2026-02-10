// js/series.js

const SERIES_KEY = "novel_series";
const user = getUser();
if (!user) location.href = "index.html";

const titleEl = document.getElementById("seriesTitle");
const textEl = document.getElementById("episodeText");
const listEl = document.getElementById("episodeList");

function addEpisode() {
  if (!textEl.value.trim()) return;

  const episode = {
    id: "ep_" + Date.now(),
    title: titleEl.value || "무제 연재",
    text: textEl.value,
    author: user.nickname,
    authorId: user.id,
    public: true,
    created: Date.now()
  };

  let series = JSON.parse(localStorage.getItem(SERIES_KEY) || "[]");
  series.push(episode);
  localStorage.setItem(SERIES_KEY, JSON.stringify(series));

  textEl.value = "";
  render();
}

function render() {
  const series = JSON.parse(localStorage.getItem(SERIES_KEY) || "[]")
    .filter(s => s.authorId === user.id)
    .sort((a,b)=>a.created-b.created);

  listEl.innerHTML = series.map((e,i)=>`
    <li>
      <strong>${i+1}화</strong> - ${e.title}
      <button onclick="toggle('${e.id}')">${e.public?'공개':'비공개'}</button>
    </li>
  `).join("");
}

function toggle(id){
  let series = JSON.parse(localStorage.getItem(SERIES_KEY) || "[]");
  series = series.map(e=>{
    if(e.id===id) e.public=!e.public;
    return e;
  });
  localStorage.setItem(SERIES_KEY, JSON.stringify(series));
  render();
}

render();
