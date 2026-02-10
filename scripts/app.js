import { initAuth, login, register, loginAnonymously, logout } from "./auth.js";
import { watchUser } from "./user.js";

initAuth();
watchUser();

document.addEventListener("DOMContentLoaded", () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  document.getElementById("loginBtn")?.addEventListener("click", () =>
    login(email.value, password.value)
  );

  document.getElementById("registerBtn")?.addEventListener("click", () =>
    register(email.value, password.value)
  );

  document.getElementById("anonBtn")?.addEventListener("click", loginAnonymously);
  document.getElementById("logoutBtn")?.addEventListener("click", logout);
});
