"use client";
import React from "react";
import styles from "./login.module.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import UserContext from "../../contexts/userContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loginUser, setLoginUser] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!response.ok) {
        setLoginError(await response.text());
        throw new Error(
          `HTTP error! status: ${response.status}[${await response.text()}]`
        );
      }
      setUser(null);
      const data = await response.json();
      setUser(data);
      setLoginUser(true);
      router.push("/");
    } catch (error) {
      console.error("An error occurred while registering:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Log In</h1>
      <form
        className={`${styles.registerForm}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={`${styles.emailContainer} ${styles.divContainer}`}>
          <label
            htmlFor="email"
            className={`${styles.emailLabel} ${styles.label}`}
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            className={`${styles.emailInput} ${styles.input}`}
          ></input>
        </div>
        <div className={`${styles.passwordContainer} ${styles.divContainer}`}>
          <label
            htmlFor="password"
            className={`${styles.passwordLabel} ${styles.label}`}
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
            className={`${styles.passwordInput} ${styles.input}`}
          ></input>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          style={loginUser ? { color: "#14CC60" } : { color: "#f4f1e0" }}
        >
          {loginUser ? "Login SuccessFul" : "Log In"}
        </button>
        <div>
          Don't have an account?{" "}
          <Link href={"/register"} className={styles.signinLink}>
            Register
          </Link>
        </div>
      </form>
      <div className={styles.error}>{loginError}</div>
    </div>
  );
};

export default Login;
