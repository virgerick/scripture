import { useRouter } from "next/router";
import { Read } from "../../components/Read";
import {
  api,
  useGetBibleByIdQuery,
  useGetTranslationByIdQuery,
  useGetVersesByBookChapterBookAndVersesQuery,
} from "../../app/services/apiServices";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setBible, setProgress, setVerses } from "../../app/features/appSlice";
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
  const bible = useAppSelector((state) => state.app.bible);
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
    dispatch(setBible(bibleResult.data));
    const found = progress.find((x) => x.translationId == id);
    if (!found) {
      dispatch(
        setProgress({ translationId: id, book: bibleResult.data.books[0].code })
      );
      return;
    }

    setChapter(found?.chapter);
  }, [bibleResult]);
  useEffect(() => {
    const found = progress.find((x) => x.translationId == id);
    if (id && found && found?.book != book?.type.code) {
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
      const found = progress.find((x) => x.translationId == id);
      if (found && found.chapter) {
        setChapter(found.chapter);
        return;
      }
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
        bible && bible.books.length > 0 && <Read book={book} />
      )}
      <>{bibleError && bibleError}</>
    </>
  );
};
export default Bible;
