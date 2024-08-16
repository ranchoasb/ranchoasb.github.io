const info = []; //information for schedule, received from google apps script
//get clubs data from google apps script
fetch("https://script.google.com/macros/s/AKfycbzhK65483zEFGYSGVErhdtCI05mKeqBjDifRgpo7ytdeuzd_4lwwGoBCfeE_Eqyee4g/exec?query=clubs").then(response => response.json()).then(data => {
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
  let result = `<p>On specific days, certain lunch clubs—student-led activities sponsored by a teacher—meet in a classroom and partake in engaging and community-building activities. Find a teacher to sponsor your club and talk to our principal, Mrs. Snowden, if you want to form your own!</p><h4>Clubs today:</h4>`;
  //adding info on clubs for specific day (today)
  result+="<ul>";
  for (let x=0; x<info.length; x++){
    let y = new Date();
    z = y.getDay();
    if (0 < z && z<6){
      if (x[3+z]=="1"){
        result+="<li><b>"+info[x][0]+" -"+info[x][2]+":</b>"+" "+info[x][1]+"</li>";
      }
    }
  }
  result+="</ul><h4>All Clubs:</h4><ul>";
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
