"use client";
import React from "react";
import styles from "./page.module.css";
import Register from "../components/Register";

const page = () => {
  return (
    <>
      <div className={styles.container}>
        <Register></Register>
      </div>
    </>
  );
};

export default page;
