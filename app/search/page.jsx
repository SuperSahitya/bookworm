"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import Card from "../components/Card";
import { IoMdSearch } from "react-icons/io";
import { useRouter } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookName, setBookName] = useState([]);
  const [authorName, setAuthorName] = useState([]);
  const [query, setQuery] = useState("");
  const search = searchParams.get("query");
  async function getData(search) {
    try {
      const fetchedData = await fetch(
        `http://localhost:8000/search?query=${search}`,
        {
          credentials: "include",
        }
      );
      const res = await fetchedData.json();
      const nameMatches = res.nameMatches;
      const authorMatches = res.authorMatches;
      setBookName(nameMatches);
      console.log(nameMatches);
      console.log(authorMatches);
      setAuthorName(authorMatches);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
  useEffect(() => {
    getData(search);
    setLoading(false);
  }, [search]);

  useEffect(() => {
    setBookName([]);
    setAuthorName([]);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
    setQuery("");
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.inputForm} onSubmit={(e) => handleSubmit(e)}>
          <input
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <IoMdSearch className={styles.icon} />
        </form>
        <div className={styles.searchHeading}>
          {`Search Results For : `}
          <em className={styles.searchTerm}>{`"${search}"`}</em>
        </div>
        {bookName.length > 0 ? <h3>Books</h3> : ""}
        <div className={styles.searchedList}>
          {!loading &&
            bookName.map((m) => {
              return (
                <Link href={`/${m._id}`}>
                  <Card
                    key={m._id}
                    bookId={m._id}
                    bookName={m.name}
                    author={m.author}
                    price={m.price}
                    imageurl={m.image}
                  ></Card>
                </Link>
              );
            })}
        </div>
        {authorName.length > 0 ? (
          <h3 className={styles.authorHeading}>Authors</h3>
        ) : (
          ""
        )}
        <div className={styles.searchedList}>
          {!loading &&
            authorName.map((m) => {
              return (
                <Link href={`/${m._id}`}>
                  <Card
                    key={m._id}
                    bookId={m._id}
                    bookName={m.name}
                    author={m.author}
                    price={m.price}
                    imageurl={m.image}
                  ></Card>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default page;
//add cms (add product functionality)
//system and admin and search filter email verification reset password and other stuff, checkout functionality
//rating system search recommendation product recommendation offers .
// profile button
