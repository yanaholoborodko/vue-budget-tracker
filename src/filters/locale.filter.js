import store from "../store";
import en from "../locales/en.json";
import pl from "../locales/pl.json";

const locales = {
  "en-GB": en,
  "pl-PL": pl
};

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || "en-GB";
  return locales[locale][key] || `[Locale error]: key ${key} not found`;
}
