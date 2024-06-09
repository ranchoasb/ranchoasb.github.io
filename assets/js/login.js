window.login = localStorage.getItem("login");
window.login = JSON.parse(window.login);
if (login) {
  window.iss = localStorage.getItem("iss");
  window.nbf = localStorage.getItem("nbf");
  window.sub = localStorage.getItem("sub");
  window.hd = localStorage.getItem("hd");
  window.email = localStorage.getItem("email");
  window.email_verified = localStorage.getItem("email_verified");
  window.azp = localStorage.getItem("azp");
  window.name = localStorage.getItem("name");
  window.picture = localStorage.getItem("picture");
  window.given_name = localStorage.getItem("given_name");
  window.family_name = localStorage.getItem("family_name");
  window.iat = localStorage.getItem("iat");
  window.exp = localStorage.getItem("exp");
  window.jti = localStorage.getItem("jti");
  window.aud = localStorage.getItem("aud");
  window.nbf = JSON.parse(window.nbf);
  window.email_verified = JSON.parse(window.email_verified);
  window.iat = JSON.parse(window.iat);
  window.exp = JSON.parse(window.exp);
  const elem = document.getElementById("loginbutton");
  elem.outerHTML='<div class="signoutdropdown" id="g_id_onload"><button class="signoutbutton" style="margin-left:10px;font-weight:600">'+encodeURIComponent(window.name)+'</button><div class="signoutdropdown-content"><button onclick="signOut()">Sign out</button></div></div>';
}
else {
  var iss = null;
  var nbf = null;
  var sub = null;
  var hd = null;
  var email = null;
  var email_verified = null;
  var azp = null;
  var picture = null;
  var given_name = null;
  var family_name = null;
  var iat = null;
  var jti = null;
  var aud = null;
  const elem = document.getElementById("loginbutton");
  elem.outerHTML='<div class="g_id_signin" style="margin-left:10px;font-weight:600" id="g_id_onload" data-client_id="786051960466-7froki4slf68hqug865502qiugj091um.apps.googleusercontent.com" data-login_uri="https://ranchoasb.org" data-callback="handleCredentialResponse" data-native_callback="handleCredentialResponse" data-ux_mode="popup" data-auto_prompt="false" data-auto_select="false" data-text="signin" data-shape="pill"></div>';
}
function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }
function handleCredentialResponse(response){
    var info = decodeJwtResponse(response.credential);
    localStorage.setItem("login", JSON.stringify(true));
    localStorage.setItem("iss", info.iss);
    localStorage.setItem("nbf", JSON.stringify(info.nbf));
    localStorage.setItem("aud", encodeURIComponent(info.aud));
    localStorage.setItem("sub", encodeURIComponent(info.sub));
    localStorage.setItem("hd", encodeURIComponent(info.hd));
    localStorage.setItem("email", info.email);
    localStorage.setItem("email_verified", JSON.stringify(info.email_verified));
    localStorage.setItem("azp", encodeURIComponent(info.azp));
    localStorage.setItem("name", encodeURIComponent(info.name));
    localStorage.setItem("picture", info.picture);
    localStorage.setItem("given_name", encodeURIComponent(info.given_name));
    localStorage.setItem("family_name", encodeURIComponent(info.family_name));
    localStorage.setItem("iat", JSON.stringify(info.iat));
    localStorage.setItem("exp", JSON.stringify(info.exp));
    localStorage.setItem("jti", encodeURIComponent(info.jti));
    console.log("ID: " + info.sub);
    console.log('Full Name: ' + info.name);
    console.log('Given Name: ' + info.given_name);
    console.log('Family Name: ' + info.family_name);
    console.log("Image URL: " + info.picture);
    console.log("Email: " + info.email);
    console.log("hd: " + info.hd);
    if (info.hd=="iusd.org"){
        domainIUSD=true;
    }
    const elem = document.getElementById("g_id_onload");
    elem.outerHTML = '<div class="signoutdropdown" id="g_id_onload"><button class="signoutbutton" style="margin-left:10px;font-weight:600">'+encodeURIComponent(info.name)+'</button><div class="signoutdropdown-content"><button onclick="signOut()">Sign out</button></div></div>';
}
function signOut(){
    google.accounts.id.disableAutoSelect();
    domainIUSD=false;
    window.location.assign("https://ranchoasb.org");
    const elem = document.getElementById("g_id_onload");
    elem.outerHTML = '<div class="g_id_signin" style="margin-left:10px;font-weight:600" id="g_id_onload" data-client_id="786051960466-7froki4slf68hqug865502qiugj091um.apps.googleusercontent.com" data-login_uri="https://ranchoasb.org" data-callback="handleCredentialResponse" data-native_callback="handleCredentialResponse" data-ux_mode="popup" data-auto_prompt="false" data-auto_select="false" data-text="signin" data-shape="pill"></div>';
    localStorage.clear();
    localStorage.setItem("login", JSON.stringify(false));
}

