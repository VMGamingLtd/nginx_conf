/* global $ */
import { lang } from './lang/lang.js';
import { translateErrorOccured } from './lang/lang.js';
import { post as fetchPost } from './util/fetch.js';
import { getEnvironment } from './env.js';


function getVerificationCodeFromQuery() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let token = urlParams.get('code')
  return token
}


async function callVerify() {
  try {
    let env = getEnvironment();
    let token = getVerificationCodeFromQuery();
    if (!token) {
      console.error('no token');
      throw new Error('no token');
    }

    let url = `${env.gaosUrl}/user/verifyEmail`;

    let result = await fetchPost(url, {
      Code: token
    });

    if (result.IsError) {
      console.error('error calling verifyEmail', result);
      console.log('result:');
      console.dir(result);
      let msg;
      if (result.ErrorKind === "InvalidCodeError") {
        if (lang.english()) {
          msg = "invalid code";
        } else if (lang.russian()) {
          msg = "произошла ошибка";
        } else if (lang.chinese()) {
          msg = "无效的代码";
        } else if (lang.slovak()) {
          msg = "neplatný kód";
        } else {
          msg = "invalid code";
        }
      } else if (result.ErrorKind === "InternalError") {
        msg = translateErrorOccured(); 
      } else {
        msg = translateErrorOccured(); 
      }

      return {
        ok: false,
        msg: msg,
      }

    } else {
      let msg;
      if (lang.english()) {
        msg = "email verified";
      } else if (lang.russian()) {
        msg = "адрес электронной почты подтвержден";
      } else if (lang.chinese()) {
        msg = "电子邮件已验证";
      } else if (lang.slovak()) {
        msg = "email overený";
      } else {
        msg = "email verified";
      }

      return {
        ok: true,
        msg: msg,
      }
    }

  } catch (err) {
    console.log("error", err)
    return {
      ok: false,
      msg: translateErrorOccured(),
    }
  }
}

async function setVerifyButton() {
  let button = $('#verify_button');
  let errorMessage = $('#error_message');
  let infoMessage = $('#info_message');

  let txt;
  if (lang.english()) {
    txt = "click here to verify email"
  } else if (lang.russian()) {
    txt = "нажмите здесь, чтобы подтвердить электронную почту"
  } else if (lang.chinese()) {
    txt = "单击此处验证电子邮件"
  } else if (lang.slovak()) {
    txt = "kliknite sem pre overenie e-mailu"
  } else {
    txt = "click here to verify email"
  }

  button.text(txt)

  button.click(function () {
    button.prop("disabled", true);
    errorMessage.text('');
    infoMessage.text('');
    callVerify().then(function (result) {
      button.hide();
      if (!result.ok) {
        errorMessage.text(result.msg);
      } else {
        infoMessage.text(result.msg)
      }
    });
  });
}

function main() {
  let token = getVerificationCodeFromQuery();
  if (!token) {
    console.warn('no "token" parameter passed in url query')

    let msg = translateErrorOccured();
    $('#error_message').text(msg);

    return
  }

  setVerifyButton()
}

main();

