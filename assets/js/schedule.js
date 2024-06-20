const info = [];
fetch("https://script.google.com/macros/s/AKfycby1YhxB5_-YF5uSiDHP5PTsurBwG9ReYlxsPhYpVlit0WzZteoBwrn-UOaHhkRi60Oj/exec?query=schedule", {mode: "no-cors"}).then(response => response.json()).then(data => {
      let rows = data.slice(0, data.length);
      for (let index in rows) {
              let row = rows[index];
              const input = row.date;
            if(input.includes("-")){
              const startandend = input.split("-");
              var currentdate = startandend[0];
              const startdate = currentdate.split("/");
              currentdate = startandend[1];
              const enddate = currentdate.split("/");
              info.push([row.occasion, startdate[0], startdate[1], startdate[2], enddate[0], enddate[1], enddate[2], row.starttime, row.endtime, row.extendedday, row.periodlength, row.school, row.additional]);
            } else {
                  const startdate = input.split("/");
                  const enddate = startdate;
                  info.push([row.occasion, startdate[0], startdate[1], startdate[2], enddate[0], enddate[1], enddate[2], row.starttime, row.endtime, row.extendedday, row.periodlength, row.school, row.additional]);
            }
      }
      console.log(info);
}).then(a => {
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["Month numbers start from 1, not 0", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let special = false;
function dayType(month, day, dayName){
  for (let i = 0; i < info.length; i++){
      if (parseInt(info[i][1])<=month && month<=parseInt(info[i][4]) && parseInt(info[i][2])<=day && day<=parseInt(info[i][5])){
        special = true;
        return info[i][0];
      }
    }
  return dayName;
}
// gets schedule for any day
function get_schedule_for_day(d){
 if (d.parse < 1724167200000) {
    document.getElementById("schedule").textContent = "The 2024 to 2025 school year has not started yet!";
  } else if (d.parse > 1749207600000) {
    document.getElementById("schedule").textContent = "The 2024 to 2025 school year has concluded.";
  } else {
    let month = d.getMonth()+1;
    let day = d.getDate();
    let year = d.getFullYear();
    let dayName = dayNames[d.getDay()];
    let type = dayType(month, day, dayName);
    let result = dayName+", "+monthNames[month]+" "+day+", "+year+", is ";
    const dayinfo = [type, month, day, year, "", "", "", "", "", ""];
    for (let z=0; z<info.length; z++){
        if (info[z][0]==type){
          dayinfo[4]=info[z][7];
          dayinfo[5]=info[z][8];
          dayinfo[6]=info[z][9];
          dayinfo[7]=info[z][10];
          dayinfo[8]=info[z][11];
          dayinfo[9]=info[z][12];
        }
    }
    if (special){
      result+=type+". ";
    }
    else {
      result+="a regular "+dayName+". ";
    }
    if (dayinfo[8]=="0"){
      result+="There is no school. "+dayinfo[9];
    }
    else {
      result+="School begins at "+dayinfo[4]+" and ends at "+dayinfo[5]+" for regular students, or "+dayinfo[6]+" for Extended Day students. Periods are "+dayinfo[7]+" minutes long. "+dayinfo[9];
    }
    document.getElementById("schedule").textContent = result;
        console.log(dayinfo);
        console.log(special);
    return 0;
 }
}
get_schedule_for_day(new Date());
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
        onHide: instance => {
          get_schedule_for_day(instance.dateSelected);
        },
      });

});
