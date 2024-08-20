fetch("https://script.google.com/macros/s/AKfycby9qWGns9f47zJmJnyE9gNYCy-DtuqcsE68ClRIiaCGstEuBAQZgdGUstkqCFeFGMFf/exec?query=navbar").then(e=>e.text()).then((e=>{navbarhtml.outerHTML=e}));
