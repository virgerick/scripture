
import * as fs from "fs";
import { promisify } from "util";
export const verses: any = []

export const loadVerses = async (fileName: string) => {
    // assets/resources/Spanish__Reina_Valera_(1909)__valera__LTR.txt
    // let result:string='';
    try {
        const path: string = `./src/assets/resources/${fileName}.txt`;
        const nameSplit: Array<string> = fileName.split('__');
        const direction: string = nameSplit[nameSplit.length - 1];
        const version: string = nameSplit[nameSplit.length - 2];
       
        
        const content: Promise<string> = promisify(fs.readFile)(path, { encoding:'utf8'})
        content.then(data=>console.log(data))
        .catch(error=>console.error(error))
        
        
        // if (file != null) {
        //     file.forEach(line => {
        //         const array = line.toString().split('||');
        //         const verse = {
        //             direction,
        //             version,
        //             book_nr: array[0],
        //             chapter_nr: array[1],
        //             verse_nr: array[2],
        //             verse: array[3],

        //         }
        //         console.log(verse);

        //         verses.push(verse);

        //     })
        //     console.log(file);
            
        // }
    } catch (error) {
        throw new Error(error);

    }

    // return result;

}