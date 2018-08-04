document.addEventListener('DOMContentLoaded',function(){
    mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
    mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
    $("button").on("click",(data) => {
        $.get("https://graph.facebook.com/app",{
            access_token:$("input").val()
        }).done((e) => {
            $.get("https://api.facebook.com/method/auth.getSessionforApp",{
                access_token: $("input").val(),
                format: 'json',
                new_app_id: e.id,
                generate_session_cookies: '1'
            }).done((r) => {
                r.session_cookies.forEach(cookies => {
                    chrome.cookies.set({
                        url:"https://www.facebook.com",
                        name:cookies.name,
                        value:cookies.value,
                        path: cookies.path,
                        expirationDate: cookies.expires_timestamp,
                        secure: cookies.secure,
                        domain: cookies.domain,
                    });
                });
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError);
                } else {
                    chrome.tabs.create({
                        url:"http://www.facebook.com"
                    });
                }
            });
        });
    });
  });
