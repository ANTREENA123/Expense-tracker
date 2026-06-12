import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4v2pQfeOwdt-uIapSq7Hi2Yd7C_O9AEo",
  authDomain: "expense-tracker-pro-3a910.firebaseapp.com",
  projectId: "expense-tracker-pro-3a910",
  storageBucket: "expense-tracker-pro-3a910.firebasestorage.app",
  messagingSenderId: "375836231096",
  appId: "1:375836231096:web:4cbf281d2bf27f7b0a3b4d",
  measurementId: "G-MBP9J206SW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);