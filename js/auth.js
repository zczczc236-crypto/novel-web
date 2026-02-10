import { auth } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


export const loginUser=(e,p)=>signInWithEmailAndPassword(auth,e,p).then(()=>location.href='index.html');
export const signupUser=(e,p)=>createUserWithEmailAndPassword(auth,e,p).then(()=>location.href='index.html');
export const logoutUser=()=>signOut(auth).then(()=>location.href='login.html');
