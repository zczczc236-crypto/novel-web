import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

export let currentUser = null;

export function watchUser() {
  onAuthStateChanged(auth, user => {
    currentUser = user;
    if (user) {
      document.querySelectorAll("[data-auth='in']").forEach(e => e.style.display = "block");
      document.querySelectorAll("[data-auth='out']").forEach(e => e.style.display = "none");
    } else {
      document.querySelectorAll("[data-auth='in']").forEach(e => e.style.display = "none");
      document.querySelectorAll("[data-auth='out']").forEach(e => e.style.display = "block");
    }
  });
}
