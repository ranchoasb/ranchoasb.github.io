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
  elem.outerHTML='<div class="g_id_signin" style="margin-left:10px;font-weight:600" id="g_id_onload" data-client_id="786051960466-7froki4slf68hqug865502qiugj091um.apps.googleusercontent.com" data-login_uri="https://ranchoasb.org" data-callback="handleCredentialResponse" data-native_callback="handleCredentialResponse" data-ux_mode="popup" data-auto_prompt="false" data-auto_select="false" data-type="icon" data-text="signin" data-shape="pill"></div>';
}
