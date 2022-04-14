import { useRouter } from "next/router";
import React from "react";
import { useGetTranslationByIdQuery } from "../../app/services/apiServices";

const Bible = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: translation,
    error,
    isLoading,isError
  } = useGetTranslationByIdQuery(Number(id));
  return (
    <div>
      {isLoading ? <p>Loaging...</p> : <p>{translation?.abbreviation}</p>}
    <>{isError&&error}</>
    </div>
  );
};
export default Bible;
