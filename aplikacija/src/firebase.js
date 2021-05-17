import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBpd7akhe0x_KQ4UyPx6H9KBZKmps6wOqw",
    authDomain: "bekkayeiman.firebaseapp.com",
    databaseURL: "https://bekkayeiman-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bekkayeiman",
    storageBucket: "bekkayeiman.appspot.com",
    messagingSenderId: "129069783530",
    appId: "1:129069783530:web:4c74028a03077dd06b3a93",
    measurementId: "G-619JBWJNQC"
};

const provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();





const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};




