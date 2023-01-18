import { IBook } from "../interfaces/IBook";
import { IResult, IResultList } from "../interfaces/IResult";
import { ITranslation } from "../interfaces/ITranslations";
const { NEXT_PUBLIC_BASE_URI } = process.env;
class ApiService {
  baseUrl: string = `${NEXT_PUBLIC_BASE_URI}/api`;
  async getBook(translationId: number, code: string): Promise<IResult<IBook>> {
    const result = await fetch(
      `${this.baseUrl}/Books/${translationId}/${code}`
    );
    const data = await result.json();
    return data as IResult<IBook>;
  }
  async getTranslations(): Promise<IResultList<ITranslation>> {
    const result = await fetch(`${this.baseUrl}/translations`);
    const data = await result.json();
    return data as IResultList<ITranslation>;
  }
}

export const apiService = new ApiService();
