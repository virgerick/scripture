import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Books } from "../Enums/Books";
import { IBookType } from "../interfaces/IBookType";
import { ITranslation } from "../interfaces/ITranslations";
import { bookTypes } from "../models/BookTypes";
import { Verse } from "../models/verse";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [translations, setTranslations] = useState<Array<ITranslation>>([]);
  const [translation, setTranslation] = useState<string>("valera");
  const [showOldTestament, setShowOldTestament] = useState<boolean>(true);
  const [book, setBook] = useState<string>();
  const [chapter, setChapter] = useState<number>(0);
  const [chapters, setChapters] = useState<number[]>([]);
  const [verses, setVerses] = useState<Verse[]>([]);

  useEffect(() => {
    const getTranslations = async () => {
      const result = await fetch("api/translations");

      let translations: Array<ITranslation> = await result.json();
      setTranslations(translations);
    };
    getTranslations();
    setBook("01O");
  }, []);
  useEffect(() => {
    const found = translations.find((t) => t.abbreviation == translation);
    console.log({found});

    if (found?.translation.includes("NT")) return setShowOldTestament(false);
    setShowOldTestament(true);

  }, [translation]);
  useEffect(() => {
    if (!showOldTestament && book?.includes("O"))return setBook("40N");
    setBook("01O");

  }, [showOldTestament]);
  useEffect(() => {
    setChapter(0);
    const getChapters = async () => {
      const num = bookTypes.find((x) => x.code == book)?.chapters ?? 0;
      let arr: number[] = [];
      for (let index = 1; index <= num; index++) {
        arr.push(index);
      }
      setChapters(arr);
    };
    getChapters();

  }, [book]);
  useEffect(() => {
    setVerses([]);
    if (book && chapter && chapter > 0) {
      fetch(`/api/passage?v=${translation}&b=${book}&c=${chapter}`)
        .then(async (response) => {
          setVerses(await response.json());
        })
        .catch((error) => console.log(error));
    }
  }, [chapter, book, translation]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Scripture</title>
        <meta name="description" content="Generated by Scripture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="">Scripture</a>
        </h1>
        <section className={styles.searchContainer}>
          <select
            value={translation}
            onChange={(e) => {
              console.log(e.target.value);
              setTranslation(e.target.value);
            }}
          >
            {translations.map((x) => (
              <option value={x.abbreviation} key={x.hash}>
                {x.translation}
              </option>
            ))}
          </select>
          <select
            name=""
            id=""
            value={book}
            onChange={(e) => setBook(e.target.value)}
          >
            {showOldTestament && (
              <optgroup label="Old Testament" title="Old Testament">
                {bookTypes
                  .filter((x) => x.code.includes("O"))
                  .map((x, i) => (
                    <option key={i} value={x.code}>
                      {x.name}
                    </option>
                  ))}
              </optgroup>
            )}

            <optgroup label="New Testament" title="New Testament">
              {bookTypes
                .filter((x) => x.code.includes("N"))
                .map((x, i) => (
                  <option key={i} value={x.code}>
                    {x.name}
                  </option>
                ))}
            </optgroup>
          </select>
        </section>
        <section className={styles.chaptersContainer}>
          {chapters.map((x) => (
            <button
              onClick={(e) => setChapter(x)}
              key={x}
              style={{ backgroundColor: chapter == x ? "#0070f3" : "white" }}
            >
              {x}
            </button>
          ))}
        </section>
        {verses.length > 0 && (
          <section className={styles.versesContainer}>
            {verses.length > 0 && (
              <h2 style={{ textAlign: "center" }}>
                {bookTypes.find((x) => x.code == verses[0].book_nr)?.name}-
                <span style={{ color: "#0070f3" }}>{verses[0].chapter_nr}</span>
              </h2>
            )}
            <p>
              {verses.map((v) => (
                <span key={v.verse_nr}>
                  <sup>{v.verse_nr}</sup>
                  <span dangerouslySetInnerHTML={{ __html: v.verse }} />
                </span>
              ))}
            </p>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/virgerick"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by virgerick
          {/* <Image src="/profile.jpg" alt="Vercel Logo" width={100} height={100} className="logo" /> */}
        </a>
      </footer>
    </div>
  );
};
export default Home;
