export  class Verse {
  translationId:number;
  translation:string;
  book_nr: string;
  chapter_nr: string;
  verse_nr: string;
  verse: string;
  constructor(tranlationId:number,translation:string,book: string, chapter: string, verseNumber: string, verse:string) {
    this.translationId=tranlationId;
    this.translation=  translation;
    this.book_nr = book;
    this.chapter_nr = chapter;
    this.verse_nr = verseNumber;
    this.verse = verse;
  }
  
}
