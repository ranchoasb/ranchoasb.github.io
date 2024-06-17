datepicker(date, {
        formatter: (i, d, _) => {
          let t = new Date();
          t.setHours(0);
          t.setMinutes(0);
          t.setSeconds(0);
          t.setMilliseconds(0);
          i.value = +t === +d ? "Today" : +t === +d - 24 * 60 * 60 * 1000 ? "Tomorrow" : d.toLocaleDateString();
        },
        dateSelected: new Date(),
        onHide: function () {
          try {
            get_schedule_for_day(new Date(date.value));
          } catch {
            if (date.value == "Today") {
              get_schedule_for_day(new Date());
            } else if (date.value == "Tomorrow") {
              get_schedule_for_day(new Date(new Date().getTime() + 86400000));
            }
          }
        },
      });
const info = [];
fetch("https://script.google.com/macros/s/AKfycbzQD0q5-QB-VX809oPY-7pUqMStIb0iuRwwbos9Cht4zig-Kg1vlny0eT7QDSJwXjH5/exec?query=schedule").then(e => e.json()).then(response => {
      let data = response;
        console.log(data);
      let rows = data.slice(0, data.length);
        console.log(rows);
      for (let index in rows) {
              let row = rows[index];
              const input = row.date;
              console.log(input);
              const startandend = input.split("-");
              var currentdate = startandend[0];
              const startdate = currentdate.split("/");
              currentdate = startandend[1];
              if (currentdate != null){
                const enddate = currentdate.split("/");
              }
              else {
                currentdate = startandend[0];
                const enddate = currentdate.split("/");
              }
              info.push([rows.occasion, startdate[0], startdate[1], startdate[2], enddate[0], enddate[2], enddate[3], rows.starttime, rows.endtime, rows.periodlength, rows.school, rows.additional]);
      }
});
const dayNames = ["a Sunday", "a Monday", "a Tuesday", "a Wednesday", "a Thursday", "a Friday", "a Saturday"];
const monthNames = ["Month numbers start from 1, not 0", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function dayType(month, day, dayName){
  for (let i = 0; i < info.length; i++){
    for (j of info[i]){
      if (parseInt(j[1])>=month<=parseInt(j[4]) && parseInt(j[2])>=day<=parseInt(j[5])){
        return j[0];
      }
    }
  }
  return dayName;
}
// gets schedule for any day
function get_schedule_for_day(d){
  if (d < 1724167200000) {
    document.getElementById("schedule").textContent = "The 2024 to 2025 school year has not started yet!";
  } else if (d > 1749207600000) {
    document.getElementById("schedule").textContent = "The 2024 to 2025 school year has concluded.";
  } else {
    let month = d.getMonth()+1;
    let day = d.getDate();
    let year = d.getFullYear();
    let dayName = dayNames[d.getDay()];
    let type = dayType(month, day, dayName);
    let result = "Today is "+month+"/"+day+"/"+year+", "+type+". ";
    const dayinfo = [type, month, day, year, "", "", "", "", ""];
    for (let i=0; i<info.length; i++){
      for (j of info[i]){
        if (j[0]==type){
          dayinfo[4]==j[7];
          dayinfo[5]==j[8];
          dayinfo[6]==j[9];
          dayinfo[7]==j[10];
          dayinfo[8]==j[11];
        }
      }
    }
    if (dayinfo[7]=="0"){
      result+="There is no school."
    }
    else {
      result+="School begins at "+dayinfo[4]+" and ends at "+dayinfo[5]+". Periods are "+dayinfo[6]+" minutes long. "+dayinfo[8];
    }
    document.getElementById("schedule").textContent = result;
    return 0;
  }
}

get_schedule_for_day(new Date());
