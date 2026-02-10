import { auth } from './firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export function login(email, pw) {
  return signInWithEmailAndPassword(auth, email, pw);
}

export function signup(email, pw) {
  return createUserWithEmailAndPassword(auth, email, pw);
}

export function logout() {
  return signOut(auth);
}

export function watchAuth(cb) {
  onAuthStateChanged(auth, cb);
}
