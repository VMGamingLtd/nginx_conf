const LANG = "en";

let translationsEn = null;
let translationsSk = null;
let translationsZh = null;  
let translationsRu = null;

export async function translate(key) {
  if (LANG === "en") {
    if (!translationsEn) {
      let module = await import("./en/translations.js");
      translationsEn = module.translations;
    } 
    return translationsEn[key];
  } else if (LANG === "sk") {
    if (!translationsSk) {
      let module  = await import("./sk/translations.js");
      translationsSk = module.translations;
    }
    return translationsSk[key];
  } else if (LANG === "zh") {
    if (!translationsZh) {
      let module = await import("./zh/translations.js");
      translationsZh = module.translations;
    }
    return translationsZh[key];
  } else if (LANG === "ru") {
    if (!translationsRu) {
      let module = await import("./ru/translations.js");
      translationsRu = module.translations;
    }
    return translationsRu[key];
  } else {
    if (!translationsEn) {
      let module = await import("./en/translations.js");
      translationsEn = module.translations;
    }
    return translationsEn[key];
  }
}

