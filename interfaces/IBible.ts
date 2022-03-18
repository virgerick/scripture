import { IBook } from "./IBook";

export interface IBible{
    id?:number,
    language?:string,
    translation?:string,
    abbreviation?:string,
    textDirection?:string,
    books:Array<IBook>
}