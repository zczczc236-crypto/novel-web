const USERS_KEY = "users";

function loadUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }

function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

function register() { const id = reg_id.value; const pw = reg_pw.value; const users = loadUsers(); if (users.find(u => u.id === id)) return alert("이미 존재"); users.push({ id, pw }); saveUsers(users); location.href = "login.html"; }

function login() { const id = login_id.value; const pw = login_pw.value; const users = loadUsers(); const user = users.find(u => u.id === id && u.pw === pw); if (!user) return alert("실패"); localStorage.setItem("session", id); location.href = "dashboard.html"; }

function logout() { localStorage.removeItem("session"); location.href = "index.html"; }
