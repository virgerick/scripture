import { useRouter } from "next/router";
import { Read } from "../../components/Read";
import {
  api,
  useGetBibleByIdQuery,
  useGetTranslationByIdQuery,
  useGetVersesByBookChapterBookAndVersesQuery,
} from "../../app/services/apiServices";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setBookTypes,
  setProgress,
  setVerses,
} from "../../app/features/appSlice";
import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import Loading from "../../components/Loading";
import { IChapter } from "../../interfaces/IChapter";
import { IBook } from "../../interfaces/IBook";
const Bible = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const progress = useAppSelector((state) => state.app.progress);
  const bookTypes = useAppSelector((state) => state.app.bookTypes);
  const [book, setBook] = useState<IBook>();
  const [chapter, setChapter] = useState<number>();
  const id: number = router.query?.id
    ? Number.parseInt(router.query?.id.toString())
    : 0;
  const {
    data: bibleResult,
    isLoading: bibleIsLoading,
    error: bibleError,
  } = useGetBibleByIdQuery(id);

  useEffect(() => {
    if (!bibleResult || !bibleResult.succeded) return;
    dispatch(setBookTypes(bibleResult.data.books));
    const found = progress.find((x) => x.translationId == id);
    if (!found)
      dispatch(
        setProgress({ translationId: id, book: bibleResult.data.books[0].code })
      );
  }, [bibleResult]);
  useEffect(() => {
    const found = progress.find((x) => x.translationId == id);
    if (id &&found && (found?.book!=book?.type.code)) {
      getBook(id, found.book);
    }
  }, [id, progress]);
  useEffect(() => {
    var found = progress.find((x) => x.translationId == id);
    if (found) dispatch(setProgress({ ...found, chapter }));
  }, [chapter]);

  const getBook = async (translationId: number, code: string) => {
    try {
      setLoading(true);
      setChapter(undefined);
      const result = await apiService.getBook(translationId, code);
      if (result.succeded) setBook(result.data);
      console.log(result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading || bibleIsLoading ? (
        <Loading type="bounce" title="Loading" />
      ) : (
        bookTypes.length > 0 && (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontWeight: 700, margin: "auto" }}>Book</label>
              <select
                style={{ maxWidth: "500px" }}
                value={progress.find((x) => x.translationId == id)?.book}
                onChange={(e) =>
                  dispatch(
                    setProgress({
                      translationId: id,
                      book: e.target.value,
                    })
                  )
                }
              >
                <option>--Select a book--</option>
                {bookTypes &&
                  bookTypes.map((x) => (
                    <option key={x.code} value={x.code}>
                      {x.name}
                    </option>
                  ))}
              </select>
            </div>
            <div style={{ margin: "10px auto", padding: "0 10%" }}>
              {book&&book.chapters.map((x) => (
                <button key={x.number} onClick={() => setChapter(x.number)}>
                  {x.number}
                </button>
              ))}
            </div>
            <div style={{ textAlign: "justify", padding: "0 10%" }}>
              <ol>
                {chapter && (
                  <>
                    <h3 style={{ textAlign: "center" }}>{book?.type.name} {chapter}</h3>
                    {book&&book.chapters
                      .filter((x) => x.number == chapter)[0]
                      .verses.map((x) => (
                        <li
                          key={x.number}
                          dangerouslySetInnerHTML={{ __html: x.text }}
                        ></li>
                      ))}
                  </>
                )}
              </ol>
            </div>
            ``
          </>
        )
      )}

      {/*
        verses &&
        verses.length > 0 && <Read verses={verses} translation={translation} />
      )}*/}
      <>{bibleError && bibleError}</>
    </>
  );
};
export default Bible;
