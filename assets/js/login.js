window.login = localStorage.getItem("login");
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
}
