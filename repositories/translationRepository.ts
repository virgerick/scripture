import { readFileSync } from "fs";
import { ITranslation } from "../interfaces/ITranslations";
export default class TranslationRepository {
  translations: Array<ITranslation> = [];
  constructor() {
    // this.translations = Object.values(require("../Public/Assets/translations.json"));

    this.load();
  }
  get() {
    return this.translations;
  }
  getById(id: string) {
    return this.translations.find((t) => t.id == id);
  }
  async load() {
    const file = await readFileSync(
      "./public/Assets/translations.json",
      "utf8"
    );
    this.translations =  Object.values(JSON.parse(file));
  }
}
const translationRepository = new TranslationRepository();

export { translationRepository };
