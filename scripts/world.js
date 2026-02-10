import { db, auth } from "../firebase/firebase.js";
import {
  doc, setDoc, getDoc,
  collection, addDoc, onSnapshot, query, where
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const novelId = new URLSearchParams(location.search).get("novel");

const wikiContent = document.getElementById("wikiContent");
const saveWiki = document.getElementById("saveWiki");

const timelineList = document.getElementById("timelineList");
const addEventBtn = document.getElementById("addEvent");

const svg = document.getElementById("relationGraph");
const addRelationBtn = document.getElementById("addRelation");

/* =========================
   🌍 위키
   ========================= */
async function loadWiki() {
  const ref = doc(db, "worlds", novelId);
  const snap = await getDoc(ref);
  if (snap.exists()) wikiContent.value = snap.data().wiki || "";
}

saveWiki.onclick = async () => {
  await setDoc(doc(db, "worlds", novelId), {
    wiki: wikiContent.value,
    author: auth.currentUser.uid
  }, { merge: true });
};

/* =========================
   🕰️ 타임라인
   ========================= */
addEventBtn.onclick = async () => {
  await addDoc(collection(db, "timeline"), {
    novelId,
    title: eventTitle.value,
    time: eventTime.value,
    createdAt: Date.now()
  });
};

function loadTimeline() {
  const q = query(collection(db, "timeline"), where("novelId", "==", novelId));
  onSnapshot(q, snap => {
    timelineList.innerHTML = "";
    snap.forEach(d => {
      const li = document.createElement("li");
      li.textContent = `${d.data().time} — ${d.data().title}`;
      timelineList.appendChild(li);
    });
  });
}

/* =========================
   🔗 관계도 SVG
   ========================= */
addRelationBtn.onclick = async () => {
  await addDoc(collection(db, "relations"), {
    novelId,
    a: nodeA.value,
    b: nodeB.value,
    text: relationText.value
  });
};

function drawRelations(relations) {
  svg.innerHTML = "";
  const nodes = {};
  let x = 50;

  relations.forEach(r => {
    [r.a, r.b].forEach(n => {
      if (!nodes[n]) {
        nodes[n] = { x: x, y: 200 };
        x += 150;
      }
    });

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", nodes[r.a].x);
    line.setAttribute("y1", nodes[r.a].y);
    line.setAttribute("x2", nodes[r.b].x);
    line.setAttribute("y2", nodes[r.b].y);
    line.setAttribute("stroke", "#888");
    svg.appendChild(line);

    Object.entries(nodes).forEach(([name, pos]) => {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", pos.x);
      text.setAttribute("y", pos.y - 10);
      text.textContent = name;
      svg.appendChild(text);
    });
  });
}

function loadRelations() {
  const q = query(collection(db, "relations"), where("novelId", "==", novelId));
  onSnapshot(q, snap => {
    const data = [];
    snap.forEach(d => data.push(d.data()));
    drawRelations(data);
  });
}

auth.onAuthStateChanged(user => {
  if (!user) location.href = "index.html";
  loadWiki();
  loadTimeline();
  loadRelations();
});
