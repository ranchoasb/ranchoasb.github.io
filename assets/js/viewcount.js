addEventListener("load", () => {
  if (!document.referrer.startsWith("https://ranchoasb.org") && localStorage.getItem("email")!="kingboobowser2011@gmail.com") {
    let timestamp = new Date();
    let month = timestamp.getMonth() + 1;
    let time = timestamp.getHours().toString() + ":" + timestamp.getMinutes().toString() + ":" + timestamp.getSeconds().toString() + ", " + month.toString() + "/" + timestamp.getDate().toString() + "/" + timestamp.getFullYear().toString();
    fetch("https://script.google.com/macros/s/AKfycby63cw5KSLy6PAmRkjqKce_DN0fUST_z5aPQmA5-7gAWMdZdU5YkBTodyfdQ98xktug/exec?query=ping&type=View&time="+time);
  }
});
