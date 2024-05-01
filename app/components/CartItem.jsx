"use client";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import styles from "./cartItem.module.css";
import { useState, useContext } from "react";
import CartContext from "../../contexts/cartContext";

const CartItem = ({ id, bookName, authorName, price, image, quantity }) => {
  const { dispatch } = useContext(CartContext);

  const handleIncrease = () => {
    dispatch({ type: "INCREMENT_QUANTITY", item: { id: id } });
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch({ type: "DECREMENT_QUANTITY", item: { id: id } });
    }
    if (quantity === 1) {
      dispatch({ type: "REMOVE_ITEM", item: { id: id } });
    }
  };

  const handleRemove = () => {
    dispatch({ type: "REMOVE_ITEM", item: { id: id } });
  };
  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <div className={styles.cartDataContainer}>
        <div className={styles.dataContainer}>
          <div className={styles.bookData}>
            <div className={styles.bookName}>{bookName}</div>
            <div className={styles.authorName}>{authorName}</div>
          </div>
          <div className={styles.price}>{`$${price.toFixed(2)}`}</div>
        </div>
        <div className={styles.quantityDiv}>
          <div className={styles.quantityContainer}>
            <div className={styles.sign} onClick={handleDecrease}>
              -
            </div>
            <div className={styles.quantity}>{quantity}</div>
            <div className={styles.sign} onClick={handleIncrease}>
              +
            </div>
          </div>
          <div className={styles.remove} onClick={handleRemove}>
            <MdDeleteForever />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
