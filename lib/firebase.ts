import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getAuth, Auth } from 'firebase/auth'

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCMQVpQnR5ogSVpNZHczQmneDGwFG8dECA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "elbe-braids.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "elbe-braids",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "elbe-braids.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "792896168742",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:792896168742:web:93e568fe5e04ce69ec97e7",
}

// Inicializar Firebase
let app: FirebaseApp | undefined
let db: Firestore | undefined
let auth: Auth | undefined

// Função para inicializar Firebase
const initializeFirebase = () => {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  db = getFirestore(app)
  auth = getAuth(app)
  return { app, db, auth }
}

// Inicializar Firebase (tanto no cliente quanto no servidor)
initializeFirebase()

// Garantir que app, db e auth estão inicializados
if (!app || !db || !auth) {
  const initialized = initializeFirebase()
  app = initialized.app
  db = initialized.db
  auth = initialized.auth
}

export { db, auth }
export default app!

