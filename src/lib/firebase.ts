import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';


const firebaseConfig = {
  "projectId": "studio-2877235412-3199d",
  "appId": "1:914296828034:web:9bcc6d6c3d0952b4de049b",
  "apiKey": "AIzaSyCUJ6fj7y-q_7cKnKhtVAlQ3h3orMpiXK4",
  "authDomain": "studio-2877235412-3199d.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "914296828034"
};

// Client-side Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { app, auth, db, functions };
