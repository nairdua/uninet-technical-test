// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDxCjjh-6DvTBsRHKit_2Fvf8ot7OemF50',
  authDomain: 'tech-test-5a6e6.firebaseapp.com',
  projectId: 'tech-test-5a6e6',
  storageBucket: 'tech-test-5a6e6.appspot.com',
  messagingSenderId: '232844532238',
  appId: '1:232844532238:web:cb27ab3f2d30e43f49ba5f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
