// js/editor.js

const STORY_KEY = "novel_stories";
let isPublic = false;

const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const keywordsEl = document.getElementById("keywords");
const imageEl = document.getElementById("image");
const previewEl = document.getElementById("preview");
const statusEl = document.getElementById("status");

const user = getUser();
if (!user) location.href = "index.html";

// 이미지 미리보기
imageEl.onchange = () => {
  const file = imageEl.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => previewEl.src = e.target.result;
  reader.readAsDataURL(file);
};

// 저장
function saveStory() {
  const story = {
    id: "s_" + Date.now(),
    title: titleEl.value,
    content: contentEl.value,
    keywords: keywordsEl.value.split(",").map(v => v.trim()),
    image: previewEl.src || null,
    public: isPublic,
    author: user.nickname,
    authorId: user.id,
    updated: Date.now()
  };

  let stories = JSON.parse(localStorage.getItem(STORY_KEY) || "[]");
  stories = stories.filter(s => s.id !== story.id);
  stories.push(story);

  localStorage.setItem(STORY_KEY, JSON.stringify(stories));
  statusEl.innerText = "저장됨";
}

// 공개/비공개
function togglePublic() {
  isPublic = !isPublic;
  statusEl.innerText = isPublic ? "공개 상태" : "비공개 상태";
}

// 자동 저장
setInterval(() => {
  if (contentEl.value.trim()) saveStory();
}, 10000);
