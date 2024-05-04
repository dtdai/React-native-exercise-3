import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  // FIREBASE_CONFIGURATION
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }