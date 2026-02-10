// js/auth.js

const AUTH_KEY = "novel_user";

function login() {
  const nick = document.getElementById("nickname").value.trim();
  if (!nick) {
    alert("닉네임을 입력하세요.");
    return;
  }

  const user = {
    nickname: nick,
    id: "u_" + Math.random().toString(36).slice(2),
    created: Date.now()
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  location.href = "dashboard.html";
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  location.href = "index.html";
}

function getUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

// 자동 로그인 처리
(function autoLogin(){
  const user = getUser();
  if (user && location.pathname.endsWith("index.html")) {
    location.href = "dashboard.html";
  }
})();
