window.onload = () => {
  copyrightyear.textContent = new Date().getFullYear();

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["Month numbers start from 1, not 0", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const first7 = [[8, 24]]; // first day of 7th grade
  const first8 = [[8, 25]]; // first day of 8th grade
  const min = [[9, 7], [9, 8], [10, 11], [10, 12], [12, 22], [1, 12], [3, 8], [3, 28], [3, 29], [5, 24], [6, 6]]; // minimum days
  const promotion = [[6, 7]]; // 8th grade promotion
  const dayoff = [[9, 4], [11, 10], [1, 15], [2, 19], [5, 27]]; // days off
  const breaks = [[11, 22], [12, 25], [4, 1]]; // the first day of thanksgiving, winter, and spring break
  // defining when thanksgiving break is
  for (let i = 0; i < 3; i++){
    dayoff.push([breaks[0][0], breaks[0][1]+i]);
  }
  // defining when winter break is
  for (let i = 0; i < 5; i++){
    dayoff.push([breaks[1][0], breaks[1][1]+i]);
    dayoff.push([breaks[2][0], breaks[2][1]+i]);
  }
  // defining when summer break is
  for (let i = 7; i < 12; i++){
    dayoff.push([breaks[1][0], breaks[1][1]+i]);
  }
  
  const specialDays = [first7, first8, min, promotion, dayoff];
  const specialDayNames = ["first7", "first8", "min", "promotion", "dayoff"];
  // introduce the day type
  const info = {first7: "the first day for seventh graders! Eigth graders should not come to school.", first8: "the first day for eigth graders!", min: "a minimum day!", promotion: "the eigth grade promotion! Seventh graders should not come to school.", dayoff: "a day off!", sunday: "a weekend!", monday: "a regular Monday!", tuesday: "a regular Tuesday, a late start reverse day!", wednesday: "a regular Wednesday!", thursday: "a regular Thursday, a late start reverse day!", friday: "a regular Friday!", saturday: "a weekend!"};
  // anything related to the schedule
  const periods = {monday: " Remember to attend advisement, which is after third period.", tuesday: " Go to your sixth period class first.", thursday: " Go to your sixth period class first.", first7: " Go to your advisement class first.", first8: " Go to your advisement class first."};
  // when school starts if it's not the usual 8:25 AM
  const start = {tuesday: "8:55 AM", thursday: "8:55 AM", promotion: "8:30 AM"};
  // when school ends if it's not the usual 3:00 PM
  const end = {min: "12:30 PM", promotion: "12:30 PM"};
  // when extended days ends if it's not the usual 4:00 PM
  const extended = {monday: ", unless you have Extended Day, in which case it ends at 3:56 PM", tuesday: ", unless you have Extended Day, in which case it ends at 3:55 PM", thursday: ", unless you have Extended Day, in which case it ends at 3:55 PM", min: ", unless you have Extended Day, in which case it ends at 1:10 PM", first7: ", unless you have Extended Day, in which case it ends at 3:38 PM", first8: ", unless you have Extended Day, in which case it ends at 3:48 PM"};
  // how long periods last
  const period_length = {monday: "53", tuesday: "52", thursday: "52", min: "37", first7: "35", first8: "45"};

  // returns the day type
  function dayType(month, day, dayName){
    for (let i = 0; i < specialDays.length; i++){
      for (j of specialDays[i]){
        if (j[0] == month && j[1] == day){
          return specialDayNames[i];
        }
      }
    }
    return dayName.toLowerCase();
  }

  //gets schedule for any day
  function get_schedule_for_day(d){
    let month = d.getMonth()+1;
    let day = d.getDate();
    let year = d.getFullYear();
    let dayName = dayNames[d.getDay()];
    let type = dayType(month, day, dayName);
    let result = "";
  
    result = `${dayName}, ${monthNames[month]} ${day}, ${year} is ${info[type]}`;
    if (type != "saturday" && type != "sunday" && type != "dayoff"){
      result += `${periods[type] ?? ""} School starts at ${start[type] ?? "8:25 AM"} and ends at ${end[type] ?? "3:00 PM"}${extended[type] ?? ""}.`;
      if (type != "promotion"){
        result += ` Classes are ${period_length[type] ?? "57"} minutes long.`;
      }
    }
    if (dayName == "monday" && type == "min"){
      result += ` There will not be advisement.`;
    }
    return result;
  }
  
  function show() {
    let today_date = new Date();
    today.textContent = get_schedule_for_day(today_date);
    
    let tomorrow_date = new Date();
    tomorrow_date.setDate(today_date.getDate() + 1);
    
    let next = nextschoolday();
    
    let tomorrow_displays;
    
    if (!next) {
      tomorrow.textContent = "There is no more school!"
    } else {
      tomorrow_displays = {
        "weekend": `Tomorrow is a weekend! Your next school day is on ${next}.`,
        "minimum": `Tomorrow is a minimum day! School starts at 8:25 AM and ends at 12:30 PM, unless you have Extended Day, in which case it ends at 1:10 PM. Classes are 37 minutes long.`,
        "firstday7": `Tomorrow is the first day for seventh graders! School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:38 PM. Classes are 35 minutes long.`,
        "firstday8": `Tomorrow is the first day for eighth graders! School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:48 PM. Classes are 45 minutes long.`,
        "minimumblock": `Tomorrow is a minimum block day! School starts at 8:25 AM and ends at 12:30 PM${tomorrow_date.getDate()%2?", unless you have Extended Day, in which case it ends at 1:50 PM.":"."} Classes are 77 minutes long. Tomorrow, you will attend only your ${tomorrow_date.getDate() % 2 ? "odd" : "even"} period classes${tomorrow_date.getDate()%2?", as well as Extended Day if you have it.":"."}`,
        "promotion": `Tomorrow is the eighth grade promotion! Seventh graders should not come to school. School starts at 8:30 AM and ends at 12:30 PM. Go to your advisement class first.`,
        "dayoff": `Tomorrow is a day off! Your next school day is on ${next}.`,
        "monday": `Tomorrow is Monday, a late start! School starts at 8:55 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:55 PM. Classes are 52 minutes long.`,
        "tuesday": `Tomorrow is Tuesday, a reverse day! Go to your sixth period class first. School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 4:00 PM. Classes are 57 minutes long.`,
        "wednesday": `Tomorrow is Wednesday! School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 4:00 PM. Classes are 57 minutes long.`,
        "thursday": `Tomorrow is Thursday, a late start reverse day! Go to your sixth period class first. School starts at 8:55 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:55 PM. Classes are 52 minutes long.`,
        "friday": `Tomorrow is Friday! Remember to attend advisement, which is after third period. School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:56 PM. Classes are 53 minutes long.`,
        "specialelectphoto": `Tomorrow will be a special Friday schedule. During the 57-minute advisement, seventh graders will be voting for ASB officers for next year, and eighth graders will be taking a panoramic photo! Classes are 47 minutes long, with the schedule going first period, advisement, snack, second and third period, lunch, and then the rest of the periods. School still ends at 3:00, or 3:50 for students with Extended Day.`
      };
      
      tomorrow.textContent = tomorrow_displays[daydata[tomorrow_date.toLocaleDateString()]]+((tomorrow_date.getDay()==5&&daydata[tomorrow_date.toLocaleDateString()]=="minimum")?" There will not be advisement.":"");
    }
  }
  
  show();

  let data;
  let datalen;
  let dataindex = 0;

  let fuse;

  function load() {
    let nomore = false;
    let toload = 10;
    
    if (dataindex + toload >= datalen) {
      toload = datalen - dataindex;
      nomore = true;
    }

    let rows = data.slice(dataindex, dataindex + toload);
    for (let index in rows) {
      let row = rows[index];
      
      let title = row.title;
      
      let date = new Date(row.time).toLocaleDateString();

      let description = row.description;
      let category = row.category;
      
      loadmorebutton.insertAdjacentHTML("beforebegin", `<div class="card-link" data-bs-toggle="modal" data-bs-target="#rowmodal${index}" id="x${title.toLowerCase().replaceAll(" ", "-")}"><div class="card"><div class="card-header"><div class="d-flex align-items-center justify-content-between"><div class="d-flex align-items-center"><div><h6 class="card-title mb-0">${title}</h6><p class="small mb-0">${date}</p></div></div></div></div><div class="card-body"><div class="mb-0">${description}</div></div><div class="card-footer border-0 d-flex justify-content-between align-items-center"><p class="mb-0">Category: ${category}</p><button class="btn btn-primary-soft btn-sm">Learn more</button></div></div></div><div class="modal" tabindex="-1" id="rowmodal${index}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">${title} <small>on ${date}</small></h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p>${description}</p><p><small>Category: ${category}</small></p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div></div></div>`);
    }

    dataindex += toload;
    
    if (nomore) {
      loadmorebutton.insertAdjacentHTML("beforebegin", `<div class="card"><div class="alert alert-info mb-0" role="alert">Nothing else to load.</div></div>`);
      loadmorebutton.remove();
    }
  }
  
  fetch("https://script.google.com/macros/s/AKfycbylp7XIw-zKcFtz1tOjPAI9_sR-I3PYyjP1bMXWTyrio3IYEMBNxeg2XT_1X9DzU_4H/exec?query=posts").then(e => e.json()).then(response => {
    data = response;
    datalen = data.length;
    
    document.querySelectorAll(".disposable").forEach(e => e.remove());
    load();

    if (document.getElementById("loadmorebutton")) {
      loadmorebutton.disabled = false;
      loadmorebutton.classList.remove("disabled");
    }

    fuse = new Fuse(data, {
      threshold: 0.3,
      keys: [
        "title",
        "description"
      ]
    });
  });

  let searchmodal = new bootstrap.Modal(searchresultsmodal);
  
  function search() {
    let query = searchinput.value;
    searchinput.value = "";

    let beforedate = new Date(beforesearchoption.value);
    let before = beforesearchoptioncheck.checked && !isNaN(beforedate) && new Date(beforedate);
    
    let afterdate = new Date(aftersearchoption.value);
    let after = aftersearchoptioncheck.checked && !isNaN(afterdate) && new Date(afterdate);

    let results = fuse.search(query).filter(match => {
        let date = new Date(match.item.time);
        return (before ? (date < before) : true) && (after ? (date > after) : true);
    });
    
    let sortby = sortbysearchresults.value;
    let relevance = sortby.startsWith("relevance");
    let ascending = sortby.endsWith("ascending");
    
    results.sort((a, b) => (relevance ? (a.score - b.score) : (new Date(a.item.time) - new Date(b.item.time))) * (ascending ? 1 : -1));
    
    searchresultsbody.innerHTML = results.map(match => `<div class="card"><div class="card-header"><div class="d-flex align-items-center justify-content-between"><div class="d-flex align-items-center"><div><h6 class="card-title mb-0">${match.item.title}</h6><p class="small mb-0">${new Date(match.item.time).toLocaleDateString()}</p></div></div></div></div><div class="card-body"><p class="mb-0">${match.item.description}</p></div><div class="card-footer border-0 d-flex justify-content-between align-items-center"><p class="mb-0">Category: ${match.item.category}</p></div></div>`).join("") || `<div class="card"><div class="card-header"><div class="d-flex align-items-center justify-content-between"><div class="d-flex align-items-center"><div><h6 class="card-title mb-0">No results could be found</h6></div></div></div></div><div class="card-body"><p class="mb-0">Try checking for spelling errors or broaden your search.</p></div></div>`;
    
    searchmodal.show();
  }
  
  searchinput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  });

  loadmorebutton.addEventListener("click", () => {
    loadmorebutton.setAttribute("aria-pressed", "true");
    loadmorebutton.classList.add("active");

    load();

    if (document.getElementById("loadmorebutton")) {
      loadmorebutton.setAttribute("aria-pressed", "false");
      loadmorebutton.classList.remove("active");
    }
  });
  
  searchoptionslink.addEventListener("click", e => e.preventDefault());

  datepicker(beforesearchoption, {
    showAllDates: true,
    formatter: (input, date) => {
      input.value = date.toLocaleDateString();
    }
  });

  datepicker(aftersearchoption, {
    showAllDates: true,
    formatter: (input, date) => {
      input.value = date.toLocaleDateString();
    }
  });

  beforesearchoptioncheck.addEventListener("change", function() {
    this.parentElement.classList.toggle("search-options-no-bounds");
    let datepickerinput = this.nextElementSibling.nextElementSibling;
    datepickerinput.disabled = !datepickerinput.disabled;
  });

  aftersearchoptioncheck.addEventListener("change", function() {
    this.parentElement.classList.toggle("search-options-no-bounds");
    let datepickerinput = this.nextElementSibling.nextElementSibling;
    datepickerinput.disabled = !datepickerinput.disabled;
  });
};

function goToPost(id) {
  window.scrollTo({ top: document.querySelector("#x"+id).offsetTop-document.querySelector("header").offsetHeight-10, behavior: 'smooth' })
}
