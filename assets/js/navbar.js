fetch("https://script.google.com/macros/s/AKfycbxFqlnRMtz-mR8-uJAAJmrPhcdRXQ8ui4SmkdKYJq75Y23pnVRds9UKH2NrAFiyjmRP/exec?query=navbar").then(e=>e.text()).then((e=>{navbarhtml.outerHTML=e}));
