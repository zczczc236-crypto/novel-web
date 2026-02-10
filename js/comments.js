import { db } from './firebase.js';
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

export function listenComments(storyId, cb) {
  onValue(ref(db, 'comments/' + storyId), s => {
    cb(s.val() || {});
  });
}

export function addComment(storyId, name, text) {
  push(ref(db, 'comments/' + storyId), {
    name,
    text,
    time: Date.now()
  });
}
