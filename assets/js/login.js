console.log("login.js first line ran");
window.login = localStorage.getItem("login");
window.login = JSON.parse(window.login);
if (login) {
  window.iss = localStorage.getItem("login");
  window.nbf = localStorage.getItem("login");
  window.sub = localStorage.getItem("login");
  window.hd = localStorage.getItem("login");
  window.email = localStorage.getItem("login");
  window.email_verified = localStorage.getItem("login");
  window.azp = localStorage.getItem("login");
  window.name = localStorage.getItem("login");
  window.picture = localStorage.getItem("login");
  window.given_name = localStorage.getItem("login");
  window.family_name = localStorage.getItem("login");
  window.iat = localStorage.getItem("login");
  window.exp = localStorage.getItem("login");
  window.jti = localStorage.getItem("login");
  window.aud = localStorage.getItem("login");
  window.nbf = JSON.parse(window.nbf);
  window.email_verified = JSON.parse(window.email_verified);
  window.iat = JSON.parse(window.iat);
  window.exp = JSON.parse(window.exp);
  const elem = document.getElementById("loginbutton");
  elem.outerHTML='<div class="signoutdropdown" id="g_id_onload"><button class="signoutbutton" style="margin-left:10px;font-weight:600">'+encodeURIComponent(window.name)+'</button><div class="signoutdropdown-content"><button onclick="signOut()">Sign out</button></div></div>';
  console.log("login.js ran, and you are logged in");
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
  console.log("login.js ran, but you are logged out");
}
