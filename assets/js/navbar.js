fetch("https://script.google.com/macros/s/AKfycbxPzXSiO8MrHHLaSm0_YBG4ubiokddr3M8WLICqIH8fDfcYCks2KFBfANW0HnU2LnY5/exec?query=navbar").then(e=>e.text()).then((e=>{navbarhtml.outerHTML=e}));
