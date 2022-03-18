import { ITranslation } from "../interfaces/ITranslations";

class TranslationRepository {
  translations: Array<ITranslation> = [];
  constructor() {
    this.translations = Object.values(require("../Assets/translations.json"));
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
