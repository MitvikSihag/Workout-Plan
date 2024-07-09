import React, { useState, useContext, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { updateProfile } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Check if displayName is available
                if (!user.displayName) {
                    try {
                        await updateProfile(user, { displayName: user.email });
                        user.displayName = user.email;
                    } catch (error) {
                        console.error("Error updating profile:", error);
                    }
                }

                setCurrentUser(user);
                setUserLoggedIn(true);
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userLoggedIn,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
