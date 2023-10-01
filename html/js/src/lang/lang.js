export const lang = {
    english: () => true,
    russian: () => false,
    chinese: () => false,
    slovak: () => false,
}


function translateErrorOccured() {
  let msg;
  if (lang.english()) {
    msg = "error occured"
  } else if (lang.russian()) {
    msg = "произошла ошибка"
  } else if (lang.chinese()) {
    msg = "发生了错误"
  } else if (lang.slovak()) {
    msg = "nastala chyba"
  } else {
    msg = "error occured"
  }

  return msg;
}
