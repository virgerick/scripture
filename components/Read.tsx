import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import HTMLFlipBook from "react-pageflip";
import styles from "../styles/Home.module.css";
import { bookTypes } from "../models/BookTypes";
import { Verse } from "../models/verse";
interface IPageProps {
  verses?: Verse[];
}
const Page = React.forwardRef(
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
  const book = useRef<any>();
  const size = useWindowSize();
  useEffect(() => {
    const pages: Array<Verse[]> = [];
    function loadPages() {
      bookTypes.map((b) => {
        for (let chapter: number = 1; chapter <= b.chapters; chapter++) {
          const found = verses?.filter(
            (v) => v.book_nr == b.code && v.chapter_nr == chapter.toString()
          );
          if (found) pages.push(found);
        }
      });
    }
    loadPages();
    setChapters(pages);
  }, []);

  return (
    <section>
      <HTMLFlipBook
        ref={book}
        width={size.x - size.x * 0.55}
        height={size.y - size.y * 0.15}
        style={{ overflow: "hidden", margin: "auto" }}
        flippingTime={1000}
        className=""
        startPage={0}
        size={"fixed"}
        minWidth={0}
        maxWidth={0}
        minHeight={0}
        maxHeight={0}
        drawShadow={true}
        usePortrait={false}
        startZIndex={0}
        autoSize={true}
        maxShadowOpacity={0.5}
        showCover={false}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={10}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {chapters.map((chapter, i) => (
          <Page verses={chapter} key={i}></Page>
        ))}
      </HTMLFlipBook>
      <div className={styles.grid}>
        <button onClick={() => book.current.pageFlip().flipPrev()}>
          Prev page
        </button>
        <button onClick={() => book.current.pageFlip().flipNext()}>
          Next page
        </button>
      </div>
    </section>
  );
}
