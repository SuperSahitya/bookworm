"use client";
import React, { useRef } from "react";
import styles from "./register.module.css";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import UserContext from "../../contexts/userContext";
import { useRouter } from "next/navigation";

const Register = () => {
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const [registerError, setRegisterError] = useState("");
  const [registerUser, setRegisteredUser] = useState(false);
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (registerError) {
      if (registerError === "Name must be at least 4 characters long") {
        nameInput.current.focus();
      } else if (
        registerError === "Email must be at least 11 characters long"
      ) {
        emailInput.current.focus();
      } else if (
        registerError === "Password must be at least 7 characters long"
      ) {
        passwordInput.current.focus();
      }
    }
  }, [registerError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 4) {
      setRegisterError("Name must be at least 4 characters long");
      return;
    }
    if (email.length < 11) {
      setRegisterError("Email must be at least 11 characters long");
      return;
    }
    if (password.length < 7) {
      setRegisterError("Password must be at least 7 characters long");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!response.ok) {
        setRegisterError(await response.text());
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUser(null);
      const data = await response.text();
      console.log(data);
      setUser({ name: name, email: userData.email });
      setRegisteredUser(true);
      router.push("/");
    } catch (error) {
      console.error("An error occurred while registering:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Register</h1>
      <form
        className={`${styles.registerForm}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={`${styles.nameContainer} ${styles.divContainer}`}>
          <label
            htmlFor="name"
            className={`${styles.nameLabel} ${styles.label}`}
          >
            Name
          </label>
          <input
            ref={nameInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Name"
            className={`${styles.nameInput} ${styles.input}`}
          ></input>
        </div>
        <div className={`${styles.emailContainer} ${styles.divContainer}`}>
          <label
            htmlFor="email"
            className={`${styles.emailLabel} ${styles.label}`}
          >
            Email
          </label>
          <input
            ref={emailInput}
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
            ref={passwordInput}
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
          style={registerUser ? { color: "#14CC60" } : { color: "#f4f1e0" }}
        >
          {registerUser ? "Registered SuccessFul" : "Register"}
        </button>
        <div>
          Already have an account?{" "}
          <Link href={"/login"} className={styles.signinLink}>
            Log In
          </Link>
        </div>
      </form>
      <div className={styles.error}>{registerError}</div>
    </div>
  );
};

export default Register;
