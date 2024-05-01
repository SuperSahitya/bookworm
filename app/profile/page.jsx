import React from "react";
import Profile from "../components/Profile";
import styles from "./page.module.css";

const page = () => {
  return (
    <>
      <div className={styles.container}>
        <Profile></Profile>
      </div>
    </>
  );
};

export default page;
