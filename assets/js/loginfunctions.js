function decodeJwtResponse(token) {
    //parse info from google OAuth
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
    //putting info google gives us on user into user's local storage
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
    //debug stuff
    console.log("ID: " + info.sub);
    console.log('Full Name: ' + info.name);
    console.log('Given Name: ' + info.given_name);
    console.log('Family Name: ' + info.family_name);
    console.log("Image URL: " + info.picture);
    console.log("Email: " + info.email);
    console.log("hd: " + info.hd);
    //retrieve account info from google sheets
    fetch("https://script.google.com/macros/s/AKfycby9qWGns9f47zJmJnyE9gNYCy-DtuqcsE68ClRIiaCGstEuBAQZgdGUstkqCFeFGMFf/exec?query=retrieveEmail", {
      redirect: "follow",
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    }).then(response => response.json()).then(data => {
        let x = 0;
        let isiusd = 0;
        if (info.hd=="iusd.org"){
            isiusd = 1;
        }
        let rows = data.slice(0, data.length);
        for (let index in rows) {
            let row = rows[index];
            if (row.email == info.email){
                localStorage.setItem("iusd", row.iusd);
                x=1;
            }
        }
        if (x==0) {
            // put new account info into google sheets
            fetch("https://script.google.com/macros/s/AKfycby9qWGns9f47zJmJnyE9gNYCy-DtuqcsE68ClRIiaCGstEuBAQZgdGUstkqCFeFGMFf/exec?query=setEmail&email="+info.email+"&iusd="+isiusd);
            localStorage.setItem("iusd", isiusd);
        }
    });
    const elem = document.getElementById("g_id_onload");
    elem.outerHTML = '<div class="signoutdropdown" id="g_id_onload"><button class="signoutbutton" style="margin-left:10px;font-weight:600" aria-label="Sign Out Button">'+encodeURIComponent(info.given_name)+'</button><div class="signoutdropdown-content"><button onclick="signOut()">Sign out</button></div></div>';
}
function signOut(){
    //stuff for signing out
    google.accounts.id.disableAutoSelect();
    domainIUSD=false;
    window.location.assign("https://ranchoasb.org");
    const elem = document.getElementById("g_id_onload");
    elem.outerHTML = '<div class="g_id_signin" style="margin-left:10px;font-weight:600" id="g_id_onload" aria-label="Signin Button" data-client_id="786051960466-7froki4slf68hqug865502qiugj091um.apps.googleusercontent.com" data-login_uri="https://ranchoasb.org" data-callback="handleCredentialResponse" data-native_callback="handleCredentialResponse" data-ux_mode="popup" data-auto_prompt="false" data-auto_select="false" data-text="signin" data-shape="pill"></div>';
    localStorage.clear();
    localStorage.setItem("login", JSON.stringify(false));
}
