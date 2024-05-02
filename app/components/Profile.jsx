"use client";
import React, { useContext } from "react";
import styles from "./profile.module.css";
import UserContext from "@/contexts/userContext";
import Link from "next/link";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUser(null);
      console.log("logout successful");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };
  console.log(user);
  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.image}></div>
        <div className={styles.profileData}>
          {user ? (
            <div className={styles.userName}>{user ? user.name : ""}</div>
          ) : (
            ""
          )}
          {user ? (
            <div className={styles.email}>{user ? user.email : ""}</div>
          ) : (
            ""
          )}
        </div>
        {user ? (
          <div onClick={handleLogout} className={styles.logButton}>
            Log Out
          </div>
        ) : (
          <Link href={"/login"} className={styles.logButton}>
            Log In
          </Link>
        )}
      </div>
    </>
  );
};

export default Profile;
