import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


const firebaseConfig = {
apiKey: "YOUR_KEY",
authDomain: "YOUR_ID.firebaseapp.com",
databaseURL: "https://YOUR_ID.firebaseio.com",
projectId: "YOUR_ID",
storageBucket: "YOUR_ID.appspot.com",
messagingSenderId: "XXXX",
appId: "XXXX"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
