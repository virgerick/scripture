import { IBookType } from "./IBookType";


export interface IBible{
    id?:number,
    language?:string,
    translation?:string,
    abbreviation?:string,
    textdirection?:string,
    books:Array<IBookType>
}