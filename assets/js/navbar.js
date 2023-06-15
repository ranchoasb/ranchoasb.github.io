fetch("https://script.google.com/macros/s/AKfycbwltAXuWojztdZ-YU5S2KMO8E4jpleS6NFhVCny-FI/exec?query=navbar").then(e=>e.text()).then((e=>{navbarhtml.outerHTML=e}));
