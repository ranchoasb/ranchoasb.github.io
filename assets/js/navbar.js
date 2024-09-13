fetch("https://script.google.com/macros/s/AKfycbwnsSFUbosERivspHWnP-OjKp9qv1y8HBhddHfmrbwP9aJrVCo-cLdYR9mC-MzFxd2n/exec?query=navbar").then(e=>e.text()).then((e=>{navbarhtml.outerHTML=e}));
