// Note: As of August 19, 2024 it is no longer okay to say "clubs". So "clubs" has become "activities". Please do not change that.
const info = []; //information for clubs, received from google apps script
//get clubs data from google apps script
fetch("https://script.google.com/macros/s/AKfycbwNyBbk8BUyqSnya5Xv3TquIx97tlLUTFsSn8-2CZdZi_KHirLs8_qQmUGNh5xOIUw/exec?query=clubs").then(response => response.json()).then(data => {
  //parse data from google sheets
  let rows = data.slice(0, data.length);
      for (let index in rows) {
          let row = rows[index];
          let name = row.name;
          let description = row.description;
          let location = row.location;
          let picture = row.picture;
          let mon = +row.monday;
          let tue = +row.tuesday;
          let wed = +row.wednesday;
          let thu = +row.thursday;
          let fri = +row.friday;
          info.push([name, description, location, picture, mon, tue, wed, thu, fri]);
      }
      console.log(info); //debug
}).then(a => {
  let current = document.getElementById("clubstext"); //clubstext is the text on the clubs page
  //description on clubs page
  let result = `<p>On specific days, students meet to participate in fun, engaging, community-building activities based around their interests. If you would like to start your own activity, find a teacher willing to sponsor it and fill out <a href="https://docs.google.com/forms/d/e/1FAIpQLSfRuRGAl01ZERInv1mZMg3GOAEMLkGJGm9vataF9csniZsOeQ/viewform">this</a> form!</p><h4>Activities today:</h4>`;
  //adding info on clubs for specific day (today)
  result+="<ul>";
  for (let x=0; x<info.length; x++){
    let y = new Date();
    z = y.getDay();
    if (0 < z && z<6){
      let n = z+3;
      if (info[x][n]=="1"){
        result+="<li><b>"+info[x][0]+" - "+info[x][2]+":</b>"+" "+info[x][1]+"</li>";
        console.log("Success!");
      }
    }
  }
  result+="</ul><h4>All Activities:</h4><ul>";
  //adding info on clubs for all clubs
 for (let p=0; p<info.length; p++){
   result+="<li><b>"+info[p][0]+" (";
   if (info[p][4]=="1"){result+="Mon, "};
   if (info[p][5]=="1"){result+="Tue, "};
   if (info[p][6]=="1"){result+="Wed, "};
   if (info[p][7]=="1"){result+="Thu, "};
   if (info[p][8]=="1"){result+="Fri, "};
   result+=info[p][2]+") :</b>"+" "+info[p][1]+"</li>";
 }
 result+="</ul>";
 current.innerHTML = result;
});
