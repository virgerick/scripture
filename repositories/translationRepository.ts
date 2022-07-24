/*import { ITranslation } from "../interfaces/ITranslations";
import translationsJson from "../public/Assets/translations.json";
export default class TranslationRepository {
  translations: Array<ITranslation> = [];
  constructor() {
    // this.translations = Object.values(require("../Public/Assets/translations.json"));
    //const file=  readFileSync("./public/Assets/translations.json","utf8");
    this.translations = Object.values(translationsJson);
  }
  get() {
    return this.translations;
  }
  getById(id: string) {
    return this.translations.find((t) => t.id == id);
  }
}
const translationRepository = new TranslationRepository();

export { translationRepository };
