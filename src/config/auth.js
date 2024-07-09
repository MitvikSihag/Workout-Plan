import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (email, password, displayName) => {
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const user = credential.user;
        
        await updateProfile(user, {
            displayName: displayName
        });

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
            email: user.email,
            displayName: displayName 
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

export const saveWorkoutPlan = async (userId, workoutPlan) => {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { workoutPlan }, { merge: true });
};

export const getWorkoutPlan = async (userId) => {
    const userDoc = doc(db, "users", userId);
    const userSnap = await getDoc(userDoc);
    return userSnap.exists() ? userSnap.data().workoutPlan : null;
};
