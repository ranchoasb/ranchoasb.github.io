fetch("https://script.google.com/macros/s/AKfycbxdD6RYVdcFZkvs7ONSet3sjezfT1ZlXVQVc4Sw8of4vnH_e3i4Ko-q8tyZBfti_z7G/exec?query=navbar").then(e=>e.text()).then((e=>{navbarhtml.outerHTML=e}));
