fetch("https://script.google.com/macros/s/AKfycbylp7XIw-zKcFtz1tOjPAI9_sR-I3PYyjP1bMXWTyrio3IYEMBNxeg2XT_1X9DzU_4H/exec?query=navbar").then(e=>e.text()).then((e=>{navbarhtml.outerHTML=e}));
