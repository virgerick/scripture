import { Books } from "../enums/Books";
import { IChapter } from "./IChapter";

export interface IBook {
    id?:string
    name?:string
    abbrev?: string
    chapters:Array<IChapter>
}