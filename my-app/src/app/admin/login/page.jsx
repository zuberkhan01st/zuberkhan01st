// pages/index.js
'use client'
import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider, db } from "@/lib/firebaseConfig"; // Use relative path
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user is an admin
      const adminsCollectionRef = collection(db, "admins");
      const adminQuery = query(adminsCollectionRef, where("email", "==", user.email));
      const adminQuerySnapshot = await getDocs(adminQuery);

      if (!adminQuerySnapshot.empty) {
        // User is an admin
        setUser(user);
        setError("");
      } else {
        // User is not an admin
        await signOut(auth);
        setError("You do not have admin access.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError("");
    } catch (error) {
      console.error("Logout Error:", error);
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "'Your Portfolio Font', sans-serif" }}>
      <h1>Admin Login</h1>
      {!user ? (
        <div>
          <button 
            onClick={handleLogin} 
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#0070f3",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Sign in with Google
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <img src={user.photoURL} alt="User" style={{ borderRadius: "50%" }} />
          <p>Email: {user.email}</p>
          <button 
            onClick={handleLogout} 
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#ff4d4d",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}