"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Introduction from "./components/Introduction";
import { useEffect, useState } from "react";
import Link from "next/link";
import CartProvider from "../providers/cartProviders";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const fetchedData = await fetch("http://localhost:8000/", {
          credentials: "include",
        });
        const res = await fetchedData.json();
        setData(res);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Introduction></Introduction>
        {!loading &&
          data.map((m) => {
            return (
              <Link href={`/${m._id}`}>
                <Card
                  bookId={m._id}
                  key={m._id}
                  bookName={m.name}
                  author={m.author}
                  price={m.price}
                  imageurl={m.image}
                ></Card>
              </Link>
            );
          })}
      </div>
    </>
  );
}
