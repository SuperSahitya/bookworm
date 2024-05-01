"use client";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { FaRegBookmark } from "react-icons/fa";
import CartContext from "../../../contexts/cartContext";

const Product = ({ params }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      const fetchedData = await fetch(
        `http://localhost:8000/books/${params.id}`
      );
      const res = await fetchedData.json();
      setData(res);
      setLoading(false);
    }
    getData();
  }, []);
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = (item) => {
    dispatch({ type: "ADD_ITEM", item: { ...item, quantity: 1 } });
  };

  return (
    <>
      {!loading && (
        <div className={styles.container}>
          <div className={styles.product}>
            <div className={styles.productImages}>
              <div
                className={styles.topImage}
                style={{ backgroundImage: `url(${data[0].image})` }}
              ></div>
              <div className={styles.bookInfo}>
                <div className={styles.bookmark}>
                  <FaRegBookmark />
                  Add To Bookshelf
                </div>
                <div className={styles.categoryList}>
                  <h3 className={styles.detail}>CATEGORIES</h3>
                  <div className={styles.categoriesName}>
                    {data[0].categories.map((m, index) => {
                      return (
                        <div key={index} className={styles.category}>
                          {m}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.productData}>
              <div className={styles.productRoute}>All / Book</div>
              <h1 className={styles.productHeading}>{data[0].name}</h1>
              <div className={styles.productAuthor}>
                {`${data[0].author}, ${data[0].year}`}
              </div>
              <div className={styles.productDescription}>
                {data[0].description}
              </div>
              <div className={styles.productPrice}>{`$${data[0].price.toFixed(
                2
              )}`}</div>
              <div
                className={styles.addToCart}
                onClick={() => handleAddToCart(data[0])}
              >
                ADD TO CART
              </div>
              <div className={styles.methodToBuy}>
                typically ships in{" "}
                <span className={styles.payLater}>3 - 5 days</span>
              </div>
              <div className={styles.productDetail}>
                <h3 className={styles.detail}>DETAILS -</h3>
                <ul className={styles.productDetailList}>
                  {data[0].details.map((m, index) => {
                    return (
                      <li key={index} className={styles.listData}>
                        {m}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
