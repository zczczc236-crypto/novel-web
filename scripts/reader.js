import { db, auth } from "../firebase/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
  addDoc,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const publicNovels = document.getElementById("publicNovels");
const readingArea = document.getElementById("readingArea");
const novelTitle = document.getElementById("novelTitle");
const episodeSelect = document.getElementById("episodeSelect");
const novelContent = document.getElementById("novelContent");

const commentList = document.getElementById("commentList");
const commentInput = document.getElementById("commentInput");
const commentBtn = document.getElementById("commentBtn");

let currentNovelId = null;
let currentEpisodeId = null;

/* 🔹 공개 소설 목록 불러오기 */
async function loadPublicNovels() {
  publicNovels.innerHTML = "";
  const q = query(collection(db, "novels"), where("public", "==", true));
  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const div = document.createElement("div");
    div.textContent = docSnap.data().title;
    div.onclick = () => openNovel(docSnap.id);
    publicNovels.appendChild(div);
  });
}

/* 🔹 소설 열기 */
async function openNovel(novelId) {
  currentNovelId = novelId;
  readingArea.hidden = false;

  const novelRef = doc(db, "novels", novelId);
  onSnapshot(novelRef, snap => {
    novelTitle.textContent = snap.data().title;
  });

  loadEpisodes();
}

/* 🔹 회차 목록 */
async function loadEpisodes() {
  episodeSelect.innerHTML = "";
  const q = query(
    collection(db, "episodes"),
    where("novelId", "==", currentNovelId),
    orderBy("updatedAt")
  );

  const snapshot = await getDocs(q);
  snapshot.forEach(docSnap => {
    const option = document.createElement("option");
    option.value = docSnap.id;
    option.textContent = docSnap.data().title;
    episodeSelect.appendChild(option);
  });

  episodeSelect.onchange = () => openEpisode(episodeSelect.value);
  if (episodeSelect.value) openEpisode(episodeSelect.value);
}

/* 🔹 회차 열기 */
function openEpisode(episodeId) {
  currentEpisodeId = episodeId;
  const episodeRef = doc(db, "episodes", episodeId);

  onSnapshot(episodeRef, snap => {
    novelContent.textContent = snap.data().content;
  });

  loadComments();
}

/* =========================
   💬 실시간 댓글 시스템
   ========================= */

function loadComments() {
  commentList.innerHTML = "";

  const q = query(
    collection(db, "comments"),
    where("episodeId", "==", currentEpisodeId),
    orderBy("createdAt")
  );

  onSnapshot(q, snapshot => {
    commentList.innerHTML = "";
    snapshot.forEach(docSnap => {
      const c = docSnap.data();
      const div = document.createElement("div");
      div.innerHTML = `<strong>${c.name}</strong>: ${c.text}`;
      commentList.appendChild(div);
    });
  });
}

commentBtn.onclick = async () => {
  if (!commentInput.value.trim()) return;

  const user = auth.currentUser;

  await addDoc(collection(db, "comments"), {
    episodeId: currentEpisodeId,
    text: commentInput.value,
    name: user?.email || "익명 독자",
    createdAt: Date.now()
  });

  commentInput.value = "";
};

loadPublicNovels();
