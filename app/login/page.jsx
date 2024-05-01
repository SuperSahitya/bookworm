"use client";
import React from "react";
import styles from "./page.module.css";
import Login from "../components/Login";

const page = () => {
  return (
    <>
      <div className={styles.container}>
        <Login></Login>
      </div>
    </>
  );
};

export default page;
