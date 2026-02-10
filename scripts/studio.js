import { auth, db } from "../firebase/firebase.js";
import { logout } from "./auth.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let currentNovelId = null;
let currentEpisodeId = null;

const novelList = document.getElementById("novelList");
const editorArea = document.getElementById("editorArea");
const editor = document.getElementById("editor");
const novelTitle = document.getElementById("novelTitle");
const episodeSelect = document.getElementById("episodeSelect");
const isPublicCheckbox = document.getElementById("isPublic");
const saveStatus = document.getElementById("saveStatus");

document.getElementById("logoutBtn").onclick = logout;
document.getElementById("newNovelBtn").onclick = createNovel;
document.getElementById("newEpisodeBtn").onclick = createEpisode;

auth.onAuthStateChanged(user => {
  if (!user) location.href = "index.html";
  loadNovels(user.uid);
});

async function loadNovels(uid) {
  novelList.innerHTML = "";
  const q = query(collection(db, "novels"), where("author", "==", uid));
  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const div = document.createElement("div");
    div.textContent = docSnap.data().title || "제목 없음";
    div.onclick = () => openNovel(docSnap.id);
    novelList.appendChild(div);
  });
}

async function createNovel() {
  const docRef = await addDoc(collection(db, "novels"), {
    title: "새 소설",
    author: auth.currentUser.uid,
    public: false,
    createdAt: Date.now()
  });
  openNovel(docRef.id);
}

function openNovel(novelId) {
  currentNovelId = novelId;
  editorArea.hidden = false;

  const novelRef = doc(db, "novels", novelId);
  onSnapshot(novelRef, snap => {
    const data = snap.data();
    novelTitle.value = data.title;
    isPublicCheckbox.checked = data.public;
  });

  novelTitle.oninput = () =>
    updateDoc(novelRef, { title: novelTitle.value });

  isPublicCheckbox.onchange = () =>
    updateDoc(novelRef, { public: isPublicCheckbox.checked });

  loadEpisodes();
}

async function loadEpisodes() {
  episodeSelect.innerHTML = "";
  const q = query(
    collection(db, "episodes"),
    where("novelId", "==", currentNovelId)
  );
  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const option = document.createElement("option");
    option.value = docSnap.id;
    option.textContent = docSnap.data().title;
    episodeSelect.appendChild(option);
  });

  episodeSelect.onchange = () => openEpisode(episodeSelect.value);
}

async function createEpisode() {
  const docRef = await addDoc(collection(db, "episodes"), {
    novelId: currentNovelId,
    title: `제 ${episodeSelect.length + 1}화`,
    content: "",
    updatedAt: Date.now()
  });
  loadEpisodes();
  openEpisode(docRef.id);
}

function openEpisode(episodeId) {
  currentEpisodeId = episodeId;
  const episodeRef = doc(db, "episodes", episodeId);

  onSnapshot(episodeRef, snap => {
    editor.value = snap.data().content || "";
  });

  editor.oninput = () => autoSave(episodeRef);
}

let saveTimer = null;
function autoSave(ref) {
  clearTimeout(saveTimer);
  saveStatus.textContent = "저장 중...";
  saveTimer = setTimeout(async () => {
    await updateDoc(ref, {
      content: editor.value,
      updatedAt: Date.now()
    });
    saveStatus.textContent = "자동 저장됨";
  }, 600);
}
