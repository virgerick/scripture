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
interface IPageProps {
  verses?: Verse[];
}
const Page = forwardRef(
  (props: IPageProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
    const { verses } = props;
    return (
      <div className="demoPage" ref={ref} style={{ overflowY: "auto" }}>
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

export function Read({ verses }: IPageProps) {
  const [chapters, setChapters] = useState<Array<Verse[]>>([]);
  const book = useAppSelector((state) => state.app.book);
  const dispatch = useAppDispatch();
  const bookRef = useRef<any>();
  const size = useWindowSize();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  useEffect(() => {
    const pages: Array<Verse[]> = [];
    // setChapters([]);
    function loadPages() {
      const bookType = bookTypes.find((b) => b.code == book);
      if(bookType)
        for (let chapter: number = 1; chapter <= bookType.chapters; chapter++) {
          console.log("chapter", chapter);

          const found = verses?.filter((v) => v.chapter_nr == chapter.toString());
          if (found) pages.push(found);
        }

      setChapters(pages);
    }
    loadPages();
  }, [verses]);
  useEffect(() => {
    setIsVisible(false);
    setIsVisible(true);
  }, [size]);

  return (
    <section>
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
          {" "}
          <HTMLFlipBook
            ref={bookRef}
            width={size.x - size.x * 0.5}
            height={size.y - size.y * 0.15}
            style={{ overflow: "hidden", margin: "auto" }}
            flippingTime={1000}
            className=""
            startPage={1}
            size={"fixed"}
            minWidth={0}
            maxWidth={500}
            minHeight={0}
            maxHeight={0}
            drawShadow={true}
            usePortrait={false}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.7}
            showCover={false}
            mobileScrollSupport={true}
            clickEventForward={false}
            useMouseEvents={false}
            swipeDistance={10}
            showPageCorners={true}
            disableFlipByClick
          >
            {chapters.map((chapter, i) => (
              <div className={`Page${i}`} style={{ overflowY: "auto" }} key={i}>
                {verses && verses.length > 0 && (
                  <section className={styles.versesContainer}>
                    {verses.length > 0 && (
                      <article>
                        {" "}
                        <h2 style={{ textAlign: "center" }}>
                          {
                            bookTypes.find((x) => x.code == verses[0].book_nr)
                              ?.name
                          }
                          -<span style={{ color: "#0070f3" }}>{i + 1}</span>
                        </h2>
                        {chapter && chapter.length > 0 && (
                          <ol>
                            {chapter.map((v) => (
                              // <span key={v.verse_nr}>
                              //   <sup>{v.verse_nr}</sup>
                              //   <span dangerouslySetInnerHTML={{ __html: v.verse }} />
                              // </span>
                              <li key={`${verses[0].book_nr} ${v.verse_nr}`}>
                                {v.verse}
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
          <div className={styles.grid}>
            <button onClick={() => bookRef.current.pageFlip().flipPrev()}>
              Prev page
            </button>
            <button onClick={() => bookRef.current.pageFlip().flipNext()}>
              Next page
            </button>
          </div>
        </>
      )}
    </section>
  );
}
