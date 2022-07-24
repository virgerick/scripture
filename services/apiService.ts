import { IBook } from "../interfaces/IBook";
import { IResult, IResultList } from "../interfaces/IResult";
import { ITranslation } from "../interfaces/ITranslations";

class ApiService {
  baseUrl: string = "https://scriptureapi.herokuapp.com/api";
  async getBook(translationId: number, code: string): Promise<IResult<IBook>> {
    const result = await fetch(
      `${this.baseUrl}/Books/${translationId}/${code}`
    );
    const data = await result.json();
    return data as IResult<IBook>;
  }
  async getTranslations(): Promise<IResultList<ITranslation>> {
    const result = await fetch(
      `${this.baseUrl}/translations`
    );
    const data = await result.json();
    return data as IResultList<ITranslation>;
  }

}

export const apiService =new ApiService();