/* eslint-disable react/display-name */

import React, {
  LegacyRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import HTMLFlipBook from "react-pageflip";
import styles from "../styles/Home.module.css";
import { bookTypes } from "../models/BookTypes";
import { Verse } from "../models/verse";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setBook } from "../app/features/appSlice";
import { ITranslation } from "../interfaces/ITranslations";
interface IPageProps {
  verses?: Verse[];
  translation?: ITranslation;
}
const Page = forwardRef(
  (props: IPageProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
    const { verses } = props;
    return (
      <div
        className="demoPage"
        ref={ref}
        style={{ overflowY: "auto", padding: 20 }}
      >
        {verses && verses.length > 0 && (
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
      </div>
    );
  }
);

export function Read({ verses, translation }: IPageProps) {
  const [chapters, setChapters] = useState<Array<Verse[]>>([]);
  const book = useAppSelector((state) => state.app.book);

  const dispatch = useAppDispatch();
  const bookRef = useRef<any>();
  const size = useWindowSize();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [usePortrait, setUsePortrait] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const pages: Array<Verse[]> = [];
    // setChapters([]);
    function loadPages() {
      const bookType = bookTypes.find((b) => b.code == book);
      if (bookType)
        for (let chapter: number = 1; chapter <= bookType.chapters; chapter++) {
          const found = verses?.filter(
            (v) => v.chapter_nr == chapter.toString()
          );
          if (found) pages.push(found);
        }

      setChapters(pages);
      setCurrentPage(1);
    }
    loadPages();
  }, [verses]);
  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setUsePortrait(size.x <= 900);
      setIsVisible(() => true);
    }, 500);
  }, [size]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <select
        value={book}
        onChange={(e) => {
          dispatch(setBook(e.target.value));
        }}
      >
        {bookTypes.map((x, i) => (
          <option key={i} value={x.code}>
            {x.name}
          </option>
        ))}
      </select>
      {isVisible && (
        <>
          <HTMLFlipBook
            ref={bookRef}
            width={usePortrait ? size.x - size.x * 0.02 : size.x - size.x * 0.5}
            height={size.y - size.y * 0.15}
            style={{ overflow: "hidden", margin: "auto" }}
            flippingTime={1000}
            className=""
            startPage={0}
            size={"fixed"}
            minWidth={0}
            maxWidth={500}
            minHeight={0}
            maxHeight={0}
            drawShadow={true}
            usePortrait={usePortrait}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.7}
            showCover={true}
            mobileScrollSupport={true}
            clickEventForward={false}
            useMouseEvents={false}
            swipeDistance={10}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            <div className="page-1">
              <div
                className={styles.portadaBook}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 15,
                  width: "100%",
                  height: "100%",
                }}
              >
                <h1>
                  {chapters && bookTypes.find((x) => x.code == book)?.name}
                </h1>
                <label htmlFor="">{translation?.translation}</label>
                <label htmlFor="">{translation?.language}</label>
                <label htmlFor="">{translation?.textdirection}</label>
                <section className={styles.chaptersContainer}>
                  {chapters.map((x, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        bookRef.current
                          .pageFlip()
                          .flip(Number(x[0].chapter_nr) + 1, "top");
                      }}
                    >
                      {x[0].chapter_nr}
                    </button>
                  ))}
                </section>
              </div>
            </div>
            <div className="page"></div>
            {chapters.map((chapter, i) => (
              <div className={`Page${i}`} style={{ overflowY: "auto" }} key={i}>
                {verses && verses.length > 0 && (
                  <section className={styles.versesContainer}>
                    {verses.length > 0 && (
                      <article
                        dir={translation?.textdirection}
                        style={{ padding: "0 15px 30px 15px" }}
                      >
                        <h2
                          style={{ textAlign: "center" }}
                          dir={translation?.textdirection}
                        >
                          {
                            bookTypes.find((x) => x.code == verses[0].book_nr)
                              ?.name
                          }
                          -
                          <span
                            style={{ color: "#0070f3" }}
                            lang={translation?.language}
                          >
                            {i + 1}
                          </span>
                        </h2>
                        {chapter && chapter.length > 0 && (
                          <ol style={{ listStyleType: translation?.language }}>
                            {chapter.map((v) => (
                              // <span key={v.verse_nr}>
                              //   <sup>{v.verse_nr}</sup>
                              //   <span dangerouslySetInnerHTML={{ __html: v.verse }} />
                              // </span>
                              <li
                                key={`${verses[0].book_nr} ${v.verse_nr}`}
                                dangerouslySetInnerHTML={{ __html: v.verse }}
                              >
                                {/* {v.verse} */}
                              </li>
                            ))}
                          </ol>
                        )}
                      </article>
                    )}
                  </section>
                )}
              </div>
            ))}

            {/* {chapters.map((chapter, i) => (
          <Page verses={chapter} key={i}></Page>
        ))} */}
          </HTMLFlipBook>
          <div
            style={{
              width: "100%",
              height: "25px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
            }}
          >
            <button
              onClick={() => {
                bookRef.current.pageFlip().flipPrev();
                const current = bookRef.current
                  .pageFlip()
                  .getCurrentPageIndex();
                console.log(current);
                if (current >= 1) setCurrentPage(current);
              }}
            >
              Prev page
            </button>
            {/*
            <button
              onClick={() => {
                bookRef.current.pageFlip().flip(5, "top");
              }}
            >
              {currentPage}
            </button> */}

            <button
              onClick={() => {
                bookRef.current.pageFlip().flipNext();
                const current = bookRef.current
                  .pageFlip()
                  .getCurrentPageIndex();
                console.log(current);
                if (current > 0) return setCurrentPage(current);
                setCurrentPage(2);
              }}
            >
              Next page
            </button>
          </div>
        </>
      )}
    </section>
  );
}
