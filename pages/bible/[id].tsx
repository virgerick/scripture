import { useRouter } from "next/router";
import { Read } from "../../components/Read";
import {
  useGetTranslationByIdQuery,
  useGetVersesByBookChapterBookAndVersesQuery,
} from "../../app/services/apiServices";
import { bookTypes } from "../../models/BookTypes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setBook,setVerses } from "../../app/features/appSlice";
import { useEffect } from "react";

const Bible = () => {
  const router = useRouter();
  const book = useAppSelector((state) => state.app.book);
  const { id } = router.query;
  const {
    data: translation,
    error,
    isLoading,
    isError,
  } = useGetTranslationByIdQuery(Number(id));

  const {
    data: verses,
    error: errorVerses,
    isFetching: isLoadingVerses,
  } = useGetVersesByBookChapterBookAndVersesQuery({
    version: translation?.abbreviation,
    book:book
  });
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isLoadingVerses ? (
        <p>Loading...</p>
      ) : (
        verses&&verses.length>0&&
          <Read verses={verses}/>
      )}
      <>{isError && error}</>
    </div>
  );
};
export default Bible;
