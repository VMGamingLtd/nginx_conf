/* global $ */
import { lang } from './lang/lang.js';
import { translateErrorOccured } from './lang/lang.js';
import { post as fetchPost } from './util/fetch.js';
import { getEnvironment } from './env.js';
import { translate } from './lang/lang.js';


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
        msg = await translate("invalid code");
      } else if (result.ErrorKind === "InternalError") {
        msg = await translate("error occured");
      } else {
        msg = await translate("error occured");
      }

      return {
        ok: false,
        msg: msg,
      }

    } else {
      let msg = await translate("email verified");

      return {
        ok: true,
        msg: msg,
      }
    }

  } catch (err) {
    console.log("error", err)
    return {
      ok: false,
      msg: await translate("error occured"),
    }
  }
}

async function setVerifyButton() {
  let button = $('#verify_button');
  let errorMessage = $('#error_message');
  let infoMessage = $('#info_message');

  let txt = await translate("click here to verify email");

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

async function main() {
  let token = getVerificationCodeFromQuery();
  if (!token) {
    console.warn('no "token" parameter passed in url query')

    let msg = await translateErrorOccured();
    $('#error_message').text(msg);

    return
  }

  await setVerifyButton()
}

main();

