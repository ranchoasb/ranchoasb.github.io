var login = document.cookie.split(";").find((row) => row.startsWith("login=")).split("=")[1];
if (login) {
  var iss = document.cookie.split(";").find((row) => row.startsWith("iss=")).split("=")[1];
  var nbf = document.cookie.split(";").find((row) => row.startsWith("nbf=")).split("=")[1];
  var sub = document.cookie.split(";").find((row) => row.startsWith("sub=")).split("=")[1];
  var hd = document.cookie.split(";").find((row) => row.startsWith("hd=")).split("=")[1];
  var email = document.cookie.split(";").find((row) => row.startsWith("email=")).split("=")[1];
  var email_verified = document.cookie.split(";").find((row) => row.startsWith("email_verified=")).split("=")[1];
  var azp = document.cookie.split(";").find((row) => row.startsWith("azp=")).split("=")[1];
  var name = document.cookie.split(";").find((row) => row.startsWith("name=")).split("=")[1];
  var picture = document.cookie.split(";").find((row) => row.startsWith("picture=")).split("=")[1];
  var given_name = document.cookie.split(";").find((row) => row.startsWith("given_name=")).split("=")[1];
  var family_name = document.cookie.split(";").find((row) => row.startsWith("family_name=")).split("=")[1];
  var iat = document.cookie.split(";").find((row) => row.startsWith("iat=")).split("=")[1];
  var exp = document.cookie.split(";").find((row) => row.startsWith("exp=")).split("=")[1];
  var jti = document.cookie.split(";").find((row) => row.startsWith("jti=")).split("=")[1];
  var aud = document.cookie.split(";").find((row) => row.startsWith("aud=")).split("=")[1];
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
