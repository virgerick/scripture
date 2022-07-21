import { IBook } from "../interfaces/IBook";
import { IResult } from "../interfaces/IResult";

class ApiService {
  baseUrl: string = "https://scriptureapi.herokuapp.com/api";
  async getBook(translationId: number, code: string): Promise<IResult<IBook>> {
    const result = await fetch(
      `${this.baseUrl}/Books/${translationId}/${code}`
    );
    const data = await result.json();
    return data as IResult<IBook>;
  }
}

export const apiService =new ApiService();