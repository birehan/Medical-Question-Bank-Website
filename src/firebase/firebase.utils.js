import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {getFirestore, 
    doc,
    setDoc,
    getDoc} from 'firebase/firestore';


import { getStorage } from "firebase/storage";

const config = {
    apiKey: "AIzaSyDUYE8DIOBfKLBs4HSERKP-2t7VN7NZbm4",
    authDomain: "medical-school-question-db.firebaseapp.com",
    projectId: "medical-school-question-db",
    storageBucket: "medical-school-question-db.appspot.com",
    messagingSenderId: "254580322144",
    appId: "1:254580322144:web:c6c2dd25496c7f5f5fb805",
    measurementId: "G-5QP22WB60F"
  };

const app = initializeApp(config);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// init services
export const db = getFirestore(app);

// provider
export const storage = getStorage(app);

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {        
    })
    .catch(error => console.log(error))
};


export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;


    const userRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()){

        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })        
        }
        catch(error){
            console.log("error: ", reportError)
        }
        
    }
    return userRef;

}
