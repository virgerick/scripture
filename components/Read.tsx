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
import { setBook, setProgress } from "../app/features/appSlice";
import { ITranslation } from "../interfaces/ITranslations";
import { IBook } from "../interfaces/IBook";
import { IBible } from "../interfaces/IBible";
import { IVerse } from "../interfaces/IVerse";
import { IChapter } from "../interfaces/IChapter";
import { bibles } from "../utilities/LoadBlible";
interface IReadProps {
  book?: IBook;
}
interface IPageProps {
  chapter: IChapter;
  bible: IBible;
}
const Page = forwardRef(
  (props: IPageProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
    const { chapter, bible } = props;
    return (
      <div
        className="demoPage"
        ref={ref}
        style={{ overflowY: "auto", padding: 20 }}
      >
        {chapter && chapter.verses.length > 0 && (
          <section className={styles.versesContainer}>
            {chapter.verses.length > 0 && (
              <h2 style={{ textAlign: "center" }}>
                Chapter-{" "}
                <span
                  style={{ color: "#0070f3" }}
                  translate="yes"
                  lang={bible.language}
                >
                  {chapter.number}
                </span>
              </h2>
            )}
            <p>
              {chapter.verses.map((v) => (
                <span key={v.number}>
                  <sup>{v.number}</sup>
                  <span dangerouslySetInnerHTML={{ __html: v.text }} />
                </span>
              ))}
            </p>
          </section>
        )}
      </div>
    );
  }
);

export function Read({ book }: IReadProps) {
  const progress = useAppSelector((state) => state.app.progress);
  const bible = useAppSelector((state) => state.app.bible);
  const chapter = useAppSelector((state) => state.app.chapter);
  const dispatch = useAppDispatch();
  const bookRef = useRef<any>();
  const size = useWindowSize();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [usePortrait, setUsePortrait] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(false);
    setTimeout(() => {
      setUsePortrait(size.x <= 900);
      setIsVisible(() => true);
    }, 100);
  }, [size]);
  useEffect(() => {
    if (book) {
      const bookcode = book.type.code;
      const pageFlip = bookRef.current.pageFlip();
      const found = progress.find((x) => x.book === bookcode);
      if (found)
        if (pageFlip && bookcode && progress)
          if (pageFlip) pageFlip.flip(chapter, "top");
    }
  }, [book, progress]);

  return (
    <section
      style={{
        position: "relative",
        top: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "100vh",
        overflow: "hidden ",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 10,
          left: 10,
          width: "95%",
          height: "auto",
          margin: "10px auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <button
          onClick={() => {
            bookRef.current.pageFlip().flipPrev();
            const current = bookRef.current.pageFlip().getCurrentPageIndex();
          }}
        >
          Prev page
        </button>

        {bible && bible.books.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: 700, margin: "auto" }}>Book</label>
            <select
              style={{ maxWidth: "500px" }}
              value={progress.find((x) => x.translationId == bible.id)?.book}
              onChange={(e) =>
                dispatch(
                  setProgress({
                    translationId: bible.id ? bible.id : 0,
                    book: e.target.value,
                  })
                )
              }
            >
              <option>--Select a book--</option>
              {bible &&
                bible.books.map((x) => (
                  <option key={x.code} value={x.code}>
                    {x.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        <button
          onClick={() => {
            bookRef.current.pageFlip().flipNext();
            const current = bookRef.current.pageFlip().getCurrentPageIndex();
          }}
        >
          Next page
        </button>
      </div>

      {isVisible && (
        <HTMLFlipBook
          ref={bookRef}
          width={usePortrait ? size.x - size.x * 0.01 : size.x - size.x * 0.5}
          height={
            size.y // - size.y * 0.2
          }
          style={{
            overflowY: "hidden",
            position: "relative",
            bottom: -100,
          }}
          flippingTime={1000}
          className=""
          startPage={0}
          size={"fixed"}
          minWidth={0}
          maxWidth={size.x}
          minHeight={0}
          maxHeight={0}
          drawShadow={true}
          usePortrait={usePortrait}
          startZIndex={1}
          autoSize={true}
          maxShadowOpacity={0.7}
          showCover={false}
          mobileScrollSupport={false}
          clickEventForward={true}
          useMouseEvents={false}
          swipeDistance={10}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {book &&
            book.chapters.map((chapter, i) => (
              <div className={`Page${i}`} style={{ overflow: "hiden" }} key={i}>
                {chapter.verses && chapter.verses.length > 0 && (
                  <section
                    className={styles.versesContainer}
                    style={{
                      paddingBottom: 155,
                    }}
                  >
                    {chapter.verses.length > 0 && (
                      <article
                        dir={bible?.textdirection}
                        style={{ padding: "0 15px 30px 15px" }}
                      >
                        <h2
                          translate="yes"
                          lang={bible?.language}
                          style={{ textAlign: "center" }}
                          dir={bible?.textdirection}
                        >
                          Chapter -
                          <span style={{ color: "#0070f3" }}>{i + 1}</span>
                        </h2>
                        {chapter && chapter.verses.length > 0 && (
                          <ol style={{ listStyleType: bible?.language }}>
                            {chapter.verses.map((v) => (
                              <li
                                key={`${book.type.name} ${v.number}`}
                                dangerouslySetInnerHTML={{ __html: v.text }}
                              />
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
      )}
    </section>
  );
}
