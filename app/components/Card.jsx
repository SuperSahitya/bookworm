import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

const Card = ({ bookId, bookName, author, imageurl, price, stock }) => {
  return (
    <Link href={`/product/${bookId}`}>
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${imageurl})` }}
        ></div>
        <div className={styles.data}>
          <div className={styles.bookData}>
            <div className={styles.bookName}>{bookName}</div>
            <div className={styles.author}>{author}</div>
          </div>
          <div className={styles.price}>{`$${price.toFixed(2)}`}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
