
import { IBookType } from "./IBookType";
import { IChapter } from "./IChapter";

export interface IBook {
    translationId?:number
    type:IBookType;
    chapters:Array<IChapter>
}