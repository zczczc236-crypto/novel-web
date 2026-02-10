import { storage } from "../firebase/firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

export async function uploadImage(file) {
  const imageRef = ref(storage, "images/" + Date.now() + file.name);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
}
