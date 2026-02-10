// js/comments.js

const COMMENT_KEY = "novel_comments";
const inputEl = document.getElementById("commentInput");
const listEl = document.getElementById("commentList");

function addComment(){
  if (!inputEl.value.trim()) return;

  const user = JSON.parse(localStorage.getItem("novel_user") || "{}");

  const comment = {
    id: "c_" + Date.now(),
    user: user.nickname || "익명",
    text: inputEl.value,
    time: Date.now()
  };

  let comments = JSON.parse(localStorage.getItem(COMMENT_KEY) || "[]");
  comments.push(comment);
  localStorage.setItem(COMMENT_KEY, JSON.stringify(comments));

  inputEl.value = "";
  renderComments();
}

function renderComments(){
  const comments = JSON.parse(localStorage.getItem(COMMENT_KEY) || "[]");
  listEl.innerHTML = comments.map(c=>`
    <p><strong>${c.user}</strong>: ${c.text}</p>
  `).join("");
}

renderComments();
