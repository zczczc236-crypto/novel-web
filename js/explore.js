// js/explore.js

const SERIES_KEY = "novel_series";
const listEl = document.getElementById("exploreList");

const series = JSON.parse(localStorage.getItem(SERIES_KEY) || "[]")
  .filter(s => s.public);

if (!series.length) {
  listEl.innerHTML = "<p>아직 공개된 작품이 없습니다.</p>";
} else {
  listEl.innerHTML = series.map(s=>`
    <div class="card">
      <h3>${s.title}</h3>
      <p>작가: ${s.author}</p>
      <p>${new Date(s.created).toLocaleDateString()}</p>
    </div>
  `).join("");
}
