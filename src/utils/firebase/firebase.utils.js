import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn0FrlZxR7s8OPkt8LPjBsa5A1qIML71c",
  authDomain: "summer-memory-319818.firebaseapp.com",
  projectId: "summer-memory-319818",
  storageBucket: "summer-memory-319818.appspot.com",
  messagingSenderId: "651703767902",
  appId: "1:651703767902:web:fd583ac3ed1fb2c6bc75cf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userShanpshot = await getDoc(userDocRef);

  if (!userShanpshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("firebase-utils: Error creating the user ", error);
    }
  }
  return userDocRef;
};
