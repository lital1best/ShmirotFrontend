import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAGVvpF4i4M823d1wc_sowkK3TA4jrVHME",
    authDomain: "shmirot-bb44e.firebaseapp.com",
    projectId: "shmirot-bb44e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
