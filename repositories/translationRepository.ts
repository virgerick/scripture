import { ITranslation } from "../interfaces/ITranslations";
export default class TranslationRepository {
  translations: Array<ITranslation> = [];
  constructor() {
    this.translations = Object.values(require("../Public/Assets/translations.json"));

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
