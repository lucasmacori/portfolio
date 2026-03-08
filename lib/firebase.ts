import { initializeApp, getApps, type FirebaseApp } from "firebase/app";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export function initFirebase(config: FirebaseConfig): FirebaseApp {
  // Avoid double-initializing in React Strict Mode or hot reloads
  return getApps().length ? getApps()[0] : initializeApp(config);
}
