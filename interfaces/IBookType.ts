import { BookType } from "../Enums/BookType";

export interface IBookType{
    name:string;
    code:BookType;
    chapters:number;
    abbreviations?:string[]
}