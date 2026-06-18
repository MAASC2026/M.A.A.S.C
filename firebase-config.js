import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIv3091VM-gkmdwEAn7OhXWd9Cm2zh2bo",
  authDomain: "maasc-2026.firebaseapp.com",
  projectId: "maasc-2026",
  storageBucket: "maasc-2026.firebasestorage.app",
  messagingSenderId: "585813001586",
  appId: "1:585813001586:web:664e0e90ff0725d2e849eb",
  measurementId: "G-LN20M6W7JJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };