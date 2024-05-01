"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./navbar.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { ImCross } from "react-icons/im";
import CartItem from "./CartItem";
import CartContext from "../../contexts/cartContext";
import Link from "next/link";
import UserContext from "../../contexts/userContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const { cart, dispatch } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/cart", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.cart) {
          dispatch({ type: "UPDATE_CART", cart: data.cart });
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
      setIsLoading(false);
    }

    if (user) {
      fetchCart();
    } else {
      dispatch({ type: "UPDATE_CART", cart: [] });
    }
  }, [user]);

  useEffect(() => {
    async function fetchUser() {
      if (user) {
        try {
          const response = await fetch("http://localhost:8000/auth", {
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setUser({ name: data.name, email: data.email });
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    }

    fetchUser();
  }, []);

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

  useEffect(() => {
    if (!isLoading) {
      async function postCart() {
        try {
          await fetch("http://localhost:8000/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart: cart }),
            credentials: "include",
          });
        } catch (error) {
          console.error("Failed to post cart:", error);
        }
      }

      if (user) {
        postCart();
        console.log(cart);
      }
    }
  }, [cart, isLoading]);

  const handleClick = () => {
    setOpen(!isOpen);
    setCartOpen(false);
  };
  const handleCartClick = () => {
    setCartOpen(!cartOpen);
    setOpen(false);
  };
  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const closeAll = () => {
    setOpen(false);
    setCartOpen(false);
    setOverlayOpen(false);
  };

  useEffect(() => {
    setOverlayOpen(isOpen || cartOpen);
  }, [isOpen, cartOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAll();
      }
    };

    if (overlayOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [overlayOpen]);
  return (
    <>
      {overlayOpen && <div className={styles.overlay} onClick={closeAll}></div>}
      <div className={styles.navContainer}>
        <div className={styles.navbar}>
          <div className={styles.hamburger} onClick={handleClick}></div>
          <div className={styles.brand}>
            <div className={styles.logo}></div>
            <div className={styles.name}>BOOKWORM</div>
          </div>
          <div className={styles.cartDataContainer}>
            {!user ? (
              <Link className={styles.loginButton} href={"/login"}>
                <FaUserCircle />
              </Link>
            ) : (
              <Link className={styles.loginButton} href={"/profile"}>
                <FaUserCircle />
              </Link>
            )}
            <div className={styles.cart} onClick={handleCartClick}></div>
            <div>{`[${cart.reduce(
              (num, item) => num + item.quantity,
              0
            )}]`}</div>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.panel}
              initial={{
                y: "-50vh",
              }}
              animate={{
                y: "0px",
              }}
              exit={{
                y: "-50vh",
              }}
            >
              <div className={styles.links}>
                <Link href={"/"} onClick={handleClick}>
                  Home
                </Link>
                <Link
                  className={styles.links}
                  href={user ? "/profile" : "/login"}
                  onClick={handleClick}
                >
                  My Account
                </Link>
                <Link href={"/orders"} onClick={handleClick}>
                  My Orders
                </Link>
                <Link href={"/bookmarks"} onClick={handleClick}>
                  My Bookmarks
                </Link>
                <Link href={"/settings"} onClick={handleClick}>
                  My Settings
                </Link>
                <Link href={"/contact"} onClick={handleClick}>
                  Contact
                </Link>
                {user ? (
                  <div onClick={handleLogout} className={styles.logButton}>
                    Log Out
                  </div>
                ) : (
                  <Link
                    href={"/login"}
                    className={styles.logButton}
                    onClick={handleClick}
                  >
                    Log In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {cartOpen && (
            <motion.div
              className={styles.cartPanel}
              initial={{
                x: "100vw",
              }}
              animate={{
                x: "0px",
              }}
              exit={{
                x: "100vw",
              }}
            >
              <div className={styles.closeCart}>
                <ImCross onClick={handleCartClick} />
              </div>
              <div className={styles.cartHeading}>{`CART [${cart.reduce(
                (num, item) => num + item.quantity,
                0
              )}]`}</div>
              <div className={styles.cartItems}>
                {cart.map((item) => {
                  return (
                    <CartItem
                      id={item._id}
                      key={item.id}
                      bookName={item.name}
                      authorName={item.author}
                      price={item.price}
                      image={item.image}
                      quantity={item.quantity}
                    ></CartItem>
                  );
                })}
                <div className={styles.border}></div>
                {cart.length == 0 ? (
                  <h1>No Books In The Shelf?</h1>
                ) : (
                  //fix this ugly piece of shit @sahitya
                  <div className={styles.checkoutContainer}>
                    <div className={styles.subtotalContainer}>
                      <div className={styles.subtotalHeading}>SUBTOTAL</div>
                      <div
                        className={styles.subtotalPrice}
                      >{`$${totalPrice.toFixed(2)}`}</div>
                    </div>
                    <div className={styles.shippingContainer}>
                      <div className={styles.shippingHeading}>Shipping</div>
                      <div className={styles.shipping}>$0.00</div>
                    </div>
                    <div className={styles.checkoutButton}>CHECKOUT</div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
