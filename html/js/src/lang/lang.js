const LANG = "en";

const translationsEn = null;
const translationsSk = null;
const translationsZh = null;  
const translationsRu = null;

async function translate(key) {
  if (LANG === "en") {
    if (!translationsEn) {
      translationsEn = await import("./en/translations.js");
    } 
    return translationsEn[key];
  } else if (LANG === "sk") {
    if (!translationsSk) {
      translationsSk = await import("./sk/translations.js");
    }
    return translationsSk[key];
  } else if (LANG === "zh") {
    if (!translationsZh) {
      translationsZh = await import("./zh/translations.js");
    }
    return translationsZh[key];
  } else if (LANG === "ru") {
    if (!translationsRu) {
      translationsRu = await import("./ru/translations.js");
    }
    return translationsRu[key];
  } else {
    if (!translationsEn) {
      translationsEn = await import("./en/translations.js");
    }
    return translationsEn[key];
  }
}

