const info = [];
fetch("https://script.google.com/macros/s/AKfycbx5QXiwFiOzIKM_8KrFYAERtcrkYjJ3wuzPK3ueFC-D6mmvRuDaGq5KL_sQk__GYA4b/exec?query=clubs").then(response => response.json()).then(data => {
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
      console.log(info);
}).then(a => {
  let current = document.getElementById("clubstext");
  let result = `<p>On specific days, certain lunch clubs—student-led activities sponsored by a teacher—meet in a classroom and partake in engaging and community-building activities. Find a teacher to sponsor your club and talk to our principal, Mrs. Snowden, if you want to form your own!</p><h4>Clubs today:</h4>`;
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
 for (let p=0; p<info.length; p++){
   result+="<li><b>"+info[p][0]+" -"+info[p][2]+":</b>"+" "+info[p][1]+"</li>";
 }
 result+="</ul>";
 current.innerHTML = result;
});
