// js/reader.js

const SERIES_KEY = "novel_series";
const readerEl = document.getElementById("reader");

const series = JSON.parse(localStorage.getItem(SERIES_KEY) || "[]")
  .filter(e => e.public)
  .sort((a,b)=>a.created-b.created);

if (!series.length) {
  readerEl.innerHTML = "<p>공개된 작품이 없습니다.</p>";
} else {
  readerEl.innerHTML = series.map((e,i)=>`
    <article class="story">
      <h3>${e.title} - ${i+1}화</h3>
      <p>${e.text.replace(/\n/g,"<br>")}</p>
    </article>
  `).join("");
}
