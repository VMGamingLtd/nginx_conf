import { getEnvironment } from "./env.js";

let gUserId = null;
let gVerificationCode = null;

async function callVerifyCode(code) {
    try {
        let env = getEnvironment();
        let url = `${env.gaosUrl}/recoverPassword/verifyCode`;

        let result = await fetchPost(url, {
            Code: code
        });

        if (result.IsError) {
            console.error('error calling verifyCode', result);
            console.log('result:');
            console.dir(result);
            let msg;

            if (result.ErrorKind === "InternalError") {
                msg = await translate("error occured");
            } else {
                msg = await translate("error occured");
            }

            return {
                ok: false,
                msg: msg,
            }
        } else {
            if (result.IsVerified) {
                return {
                    ok: true,
                    msg: "",
                    userId: result.UserId,
                }
            } else {
                return {
                    ok: false,
                    msg: await translate("invalid code"),
                }
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

async function callChangePassword(userId, verificationCode, password, verifyPassword) {
    try {
        let env = getEnvironment();
        let url = `${env.gaosUrl}/recoverPassword/changePassword`;

        let result = await fetchPost(url, {
            UserId: userId,
            VerificationCode: verificationCode,
            Password: password,
            VerifyPassword: verifyPassword,
        });

        if (result.IsError) {
            console.error('error calling changePassword', result);
            console.log('result:');
            console.dir(result);
            let msg;

            if (result.ErrorKind === "InvalidVerificationCodeError") {
                msg = await translate("invalid code");
            } else if (result.ErrorKind === "PasswordIsEmptyError") {
                msg = await translate("password is empty");
            } else if (result.ErrorKind === "PasswordsDoNotMatchError") {
                msg = await translate("passwords do not match");
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
            let msg = await translate("password changed");

            return {
                ok: true,
                msg: msg,
            }
        }

    } catch (err) {

    }
}

function setNewPasswordForm() {
    let newPassword = $('#new-password');
    let verifyPassword = $('#verify-password');
    let submitButton = $('#new-password-form-submit-button');
    let infoMessage = $('#info-message');
    let errorMessage = $('#error-message');
    let verifyCodeForm = $('#verify-code-form');
    let newPasswordForm = $('#new-password-form');

    newPassword.val('');
    verifyPassword.val('');
    submitButton.click(function () {
        submitButton.prop("disabled", true);
        errorMessage.text('');
        infoMessage.text('');
        callChangePassword(gUserId, gVerificationCode, newPassword.val(), verifyPassword.val()).then(function (result) {
            if (!result.ok) {
                errorMessage.text(result.msg);
            } else {
                infoMessage.text(result.msg)
                verifyCodeForm.hide();
                newPasswordForm.hide();
            }
        });
    });

}

function setVerifyCodeForm() {
    let verificationCode = $('#verification-code');
    let submitButton = $('#verify-code-form-submit-button');
    let infoMessage = $('#info-message');
    let errorMessage = $('#error-message');
    let verifyCodeForm = $('#verify-code-form');
    let newPasswordForm = $('#new-password-form');

    verificationCode.val('');
    submitButton.click(function () {
        submitButton.prop("disabled", true);
        errorMessage.text('');
        infoMessage.text('');
        callVerifyCode(verificationCode.val()).then(function (result) {
            if (!result.ok) {
                errorMessage.text(result.msg);
            } else {
                gUserId = result.userId;
                infoMessage.text(result.msg)
                verifyCodeForm.hide();
                setNewPasswordForm();
                newPasswordForm.show();
            }
        });
    });

}

async function translatePage() {
    return Promise.all([
        translate('Verification Code:').then(function (result) {
            $('#verification-code-label').text(result);
        }),
        translate('New Password:').then(function (result) {
            $('#new-password-label').text(result);
        }),
        translate('Verify Password:').then(function (result) {
            $('#verify-password-label').text(result);
        }),
        translate('submit').then(function (result) {
            $('#verify-code-form-submit-button').text(result);
            $('new-password-form-submit-button').text(result);
        }),
    ])
}

async function main() {
    await translatePage();
    setVerifyCodeForm();

}