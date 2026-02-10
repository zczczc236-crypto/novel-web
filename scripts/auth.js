import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { auth } from "../firebase/firebase.js";

export function initAuth() {
  onAuthStateChanged(auth, user => {
    if (user) {
      localStorage.setItem("uid", user.uid);
      document.body.classList.add("logged-in");
    } else {
      localStorage.removeItem("uid");
      document.body.classList.remove("logged-in");
    }
  });
}

export async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function register(email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginAnonymously() {
  await signInAnonymously(auth);
}

export async function logout() {
  await signOut(auth);
}
