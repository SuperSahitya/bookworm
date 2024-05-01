import React, { useState } from "react";
import styles from "./introduction.module.css";
import { IoMdSearch } from "react-icons/io";
import { useRouter } from "next/navigation";

const Introduction = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        THE BOOKS<br></br> YOU'LL LOVE
      </h1>
      <form onSubmit={(e) => onSubmit(e)} className={styles.inputForm}>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <IoMdSearch className={styles.icon} onClick={(e) => onSubmit(e)} />
      </form>
      <div className={styles.description}>
        Discover Worlds Unseen, Stories Untold:<br></br> Embrace the Journey
        Through Pages of Imagination
      </div>
    </div>
  );
};

export default Introduction;
