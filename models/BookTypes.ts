import { BookType } from "../Enums/BookType";
import { IBookType } from "../interfaces/IBookType";

export const bookTypes: Array<IBookType> = [
  {
    code: BookType.Genesis,
    name: "Génesis",
    chapters: 50,
    abbreviations: ["gn", "gen"],
  },
  {
    name: "Éxodo",
    chapters: 40,
    code: BookType.Exodus,
  },
  {
    name: "Levíticos",
    chapters: 27,
    code: BookType.Leviticus,
  },
  {
    name: "Números",
    chapters: 36,
    code: BookType.Numbers,
  },
  {
    name: "Deuteronomio",
    chapters: 34,
    code: BookType.Deuteronomy,
  },
  {
    name: "Josué",
    chapters: 24,
    code: BookType.Joshua,
  },
  {
    name: "Jueces",
    chapters: 21,
    code: BookType.Judges,
  },
  {
    name: "Rut",
    chapters: 4,
    code: BookType.Ruth,
  },
  {
    name: "1° Samuel",
    chapters: 31,
    code: BookType._1_Samuel,
  },
  {
    name: "2° Samuel",
    chapters: 24,
    code: BookType._2_Samuel,
  },
  {
    name: "1° Reyes",
    chapters: 22,
    code: BookType._1_Kings,
  },
  {
    name: "2° Reyes",
    chapters: 25,
    code: BookType._2_Kings,
  },
  {
    name: "1° Crónicas",
    chapters: 29,
    code: BookType._1_Chronicles,
  },
  {
    name: "2° Crónicas",
    chapters: 36,
    code: BookType._2_Chronicles,
  },
  {
    name: "Esdras",
    chapters: 10,
    code: BookType.Ezra,
  },
  {
    name: "Nehemías",
    chapters: 13,
    code: BookType.Nehemiah,
  },
  {
    name: "Ester",
    chapters: 10,
    code: BookType.Esther,
  },

  {
    name: "Job",
    chapters: 42,
    code: BookType.Job,
  },

  {
    name: "Salmos",
    chapters: 150,
    code: BookType.Psalms,
  },

  {
    name: "Proverbios",
    chapters: 31,
    code: BookType.Proverbs,
  },

  {
    name: "Eclesiastés",
    chapters: 12,
    code: BookType.Ecclesiastes,
  },

  {
    name: "Cantares",
    chapters: 8,
    code: BookType.Song_of_Songs,
  },

  {
    name: "Isaías",
    chapters: 66,
    code: BookType.Isaiah,
  },

  {
    name: "Jeremías",
    chapters: 52,
    code: BookType.Jeremiah,
  },

  {
    name: "Lamentaciones",
    chapters: 5,
    code: BookType.Lamentations,
  },

  {
    name: "Ezequiel",
    chapters: 48,
    code: BookType.Ezekiel,
  },

  {
    name: "Daniel",
    chapters: 12,
    code: BookType.Daniel,
  },

  {
    name: "Oseas",
    chapters: 14,
    code: BookType.Hosea,
  },

  {
    name: "Joel",
    chapters: 13,
    code: BookType.Joel,
  },

  {
    name: "Amós",
    chapters: 9,
    code: BookType.Amos,
  },

  {
    name: "Abdías",
    chapters: 1,
    code: BookType.Obadiah,
  },

  {
    name: "Jonás",
    chapters: 4,
    code: BookType.Jonah,
  },

  {
    name: "Miqueas",
    chapters: 7,
    code: BookType.Micah,
  },

  {
    name: "Nahúm",
    chapters: 3,
    code: BookType.Nahum,
  },

  {
    name: "Habacuc",
    chapters: 3,
    code: BookType.Habakkuk,
  },

  {
    name: "Sofonías",
    chapters: 3,
    code: BookType.Zephaniah
  },

  {
    name: "Hageo",
    chapters: 2,
    code: BookType.Haggai
  },

  {
    name: "Zacarías",
    chapters: 14,
    code: BookType.Zechariah
  },

  {
    name: "Zacarías",
    chapters: 14,
    code: BookType.Zechariah
  },

  {
    name: "Malaquías",
    chapters: 4,
    code: BookType.Malachi
  },

  {
    name: "Mateo",
    chapters: 28,
    code: BookType.Matthew
  },

  {
    name: "Marcos",
    chapters: 16,
    code: BookType.Mark
  },

  {
    name: "Lucas",
    chapters: 24,
    code: BookType.Luke
  },

  {
    name: "Juan",
    chapters: 21,
    code: BookType.John_1
  },

  {
    name: "Hechos",
    chapters: 18,
    code: BookType.Acts
  },

  {
    name: "Romanos",
    chapters: 16,
    code: BookType.Romans
  },

  {
    name: "Primera Epístola a los Corintios",
    chapters: 16,
    code: BookType._1_Corinthians
  },

  {
    name: "Segunda Epístola a los Corintios",
    chapters: 13,
    code: BookType._2_Corinthians
  },

  {
    name: "Gátalas",
    chapters: 6,
    code: BookType.Galatians
  },

  {
    name: "Efesios",
    chapters: 6,
    code: BookType.Ephesians
  },

  {
    name: "Filipenses",
    chapters: 4,
    code: BookType.Philippians
  },

  {
    name: "Colosenses",
    chapters: 4,
    code: BookType.Colossians
  },

  {
    name: "Primera Epístola a los Tesaloniceneses",
    chapters: 5,
    code: BookType._1_Thessalonians
  },

  {
    name: "Segunda Epístola a los Tesalonicenses",
    chapters: 3,
    code: BookType._2_Thessalonians
  },

  {
    name: "Primera Epístola a Timoteo",
    chapters: 6,
    code: BookType._1_Timothy
  },

  {
    name: "Segunda Epístola a Timoteo",
    chapters: 4,
    code: BookType._2_Timothy
  },

  {
    name: "Tito",
    chapters: 3,
    code: BookType.Titus
  },

  {
    name: "Filemón",
    chapters: 1,
    code: BookType.Philemon
  },

  {
    name: "Hebreos",
    chapters: 13,
    code: BookType.Hebrews
  },

  {
    name: "Santiago",
    chapters: 5,
    code: BookType.James
  },

  {
    name: "Primera Epístola de San Pedro",
    chapters: 5,
    code: BookType._1_Peter
  },

  {
    name: "Segunda Epístola de San Pedro",
    chapters: 3,
    code: BookType._2_Peter
  },

  {
    name: "Primera Epístola de San Juan",
    chapters: 5,
    code: BookType._1_John
  },

  {
    name: "Segunda Epístola de San Juan",
    chapters: 1,
    code: BookType._2_John
  },

  {
    name: "Segunda Epístola de San Judas",
    chapters: 1,
    code: BookType.Jude
  },

  {
    name: "Apocalipsis",
    chapters: 22,
    code: BookType.Revelation
  },
];

// Génesis	50
// Éxodo	40
// Levíticos	27
// Números	36
// Deuteronomio	34
// Josué	24
// Jueces	21
// Rut	4
// 1° Samuel	31
// 2° Samuel	24
// 1° Reyes	22
// 2° Reyes	25
// 1° Crónicas	29
// 2° Crónicas	36
// Esdras	10
// Nehemías	13
// Ester	10
// Job	42
// Salmos	150
// Proverbios	31
// Eclesiastés	12
// Cantares	8
// Isaías	66
// Jeremías	52
// Lamentaciones	5
// Ezequiel	48
// Daniel	 12
// Oseas	 14
// Joel	 13
// Amós	9
// Abdías	 1
// Jonás	 4
// Miqueas	 7
// Nahúm	 3
// Habacuc	 3
// Sofonías	 3
// Hageo	 2
// Zacarías	14
// Malaquías	4
/*
Evangelio de Mateo	28
Evangelio de Marcos	16
Evangelio de Lucas	24
Evangelio de Juan	21
Hechos de los Apóstoles	18
Epístola a los Romanos	16
Primera Epístola a los Corintios	16
Segunda Epístola a los Corintios	13
Epístola a los Gátalas	6
Epístola a los Efesios	6
Epístola a los Filipenses	4
Epístola a los Colosenses	4
Primera Epístola a los Tesaloniceneses	5
Segunda Epístola a los Tesalonicenses	3
Primera Epístola a Timoteo	6
Segunda Epístola a Timoteo	4
Epístola a Tito	3
Epístola a Filemón	1
Epístola a los Hebreos	13
Epístola de Santiago	5
Primera Epístola de San Pedro	5
Segunda Epístola de San Pedro	3
Primera Epístola de San Juan	5
Segunda Epístola de San Juan	1
Tercera Epístola de San Juan	1
Epístola de San Judas	1
Apocalipsis de San Juan	 22
*/
