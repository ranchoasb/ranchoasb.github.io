window.onload = () => {
  copyrightyear.textContent = new Date().getFullYear();

  let daydata = {"8/18/2022":"firstday7","8/19/2022":"firstday8","8/20/2022":"weekend","8/21/2022":"weekend","8/22/2022":"monday","8/23/2022":"tuesday","8/24/2022":"wednesday","8/25/2022":"minimumblock","8/26/2022":"minimumblock","8/27/2022":"weekend","8/28/2022":"weekend","8/29/2022":"monday","8/30/2022":"tuesday","8/31/2022":"wednesday","9/1/2022":"thursday","9/2/2022":"minimum","9/3/2022":"weekend","9/4/2022":"weekend","9/5/2022":"dayoff","9/6/2022":"tuesday","9/7/2022":"wednesday","9/8/2022":"thursday","9/9/2022":"friday","9/10/2022":"weekend","9/11/2022":"weekend","9/12/2022":"monday","9/13/2022":"tuesday","9/14/2022":"wednesday","9/15/2022":"thursday","9/16/2022":"friday","9/17/2022":"weekend","9/18/2022":"weekend","9/19/2022":"monday","9/20/2022":"tuesday","9/21/2022":"wednesday","9/22/2022":"thursday","9/23/2022":"friday","9/24/2022":"weekend","9/25/2022":"weekend","9/26/2022":"monday","9/27/2022":"tuesday","9/28/2022":"wednesday","9/29/2022":"thursday","9/30/2022":"friday","10/1/2022":"weekend","10/2/2022":"weekend","10/3/2022":"monday","10/4/2022":"tuesday","10/5/2022":"wednesday","10/6/2022":"thursday","10/7/2022":"friday","10/8/2022":"weekend","10/9/2022":"weekend","10/10/2022":"dayoff","10/11/2022":"minimumblock","10/12/2022":"minimumblock","10/13/2022":"thursday","10/14/2022":"friday","10/15/2022":"weekend","10/16/2022":"weekend","10/17/2022":"monday","10/18/2022":"tuesday","10/19/2022":"wednesday","10/20/2022":"thursday","10/21/2022":"friday","10/22/2022":"weekend","10/23/2022":"weekend","10/24/2022":"monday","10/25/2022":"tuesday","10/26/2022":"wednesday","10/27/2022":"thursday","10/28/2022":"friday","10/29/2022":"weekend","10/30/2022":"weekend","10/31/2022":"monday","11/1/2022":"tuesday","11/2/2022":"wednesday","11/3/2022":"thursday","11/4/2022":"friday","11/5/2022":"weekend","11/6/2022":"weekend","11/7/2022":"monday","11/8/2022":"tuesday","11/9/2022":"wednesday","11/10/2022":"thursday","11/11/2022":"dayoff","11/12/2022":"weekend","11/13/2022":"weekend","11/14/2022":"monday","11/15/2022":"tuesday","11/16/2022":"wednesday","11/17/2022":"thursday","11/18/2022":"friday","11/19/2022":"weekend","11/20/2022":"weekend","11/21/2022":"monday","11/22/2022":"tuesday","11/23/2022":"dayoff","11/24/2022":"dayoff","11/25/2022":"dayoff","11/26/2022":"weekend","11/27/2022":"weekend","11/28/2022":"monday","11/29/2022":"tuesday","11/30/2022":"wednesday","12/1/2022":"thursday","12/2/2022":"friday","12/3/2022":"weekend","12/4/2022":"weekend","12/5/2022":"monday","12/6/2022":"tuesday","12/7/2022":"wednesday","12/8/2022":"thursday","12/9/2022":"friday","12/10/2022":"weekend","12/11/2022":"weekend","12/12/2022":"monday","12/13/2022":"tuesday","12/14/2022":"wednesday","12/15/2022":"thursday","12/16/2022":"minimum","12/17/2022":"weekend","12/18/2022":"weekend","12/19/2022":"dayoff","12/20/2022":"dayoff","12/21/2022":"dayoff","12/22/2022":"dayoff","12/23/2022":"dayoff","12/24/2022":"weekend","12/25/2022":"weekend","12/26/2022":"dayoff","12/27/2022":"dayoff","12/28/2022":"dayoff","12/29/2022":"dayoff","12/30/2022":"dayoff","12/31/2022":"weekend","1/1/2023":"weekend","1/2/2023":"dayoff","1/3/2023":"tuesday","1/4/2023":"wednesday","1/5/2023":"thursday","1/6/2023":"friday","1/7/2023":"weekend","1/8/2023":"weekend","1/9/2023":"monday","1/10/2023":"tuesday","1/11/2023":"wednesday","1/12/2023":"thursday","1/13/2023":"minimum","1/14/2023":"weekend","1/15/2023":"weekend","1/16/2023":"dayoff","1/17/2023":"tuesday","1/18/2023":"wednesday","1/19/2023":"thursday","1/20/2023":"friday","1/21/2023":"weekend","1/22/2023":"weekend","1/23/2023":"monday","1/24/2023":"tuesday","1/25/2023":"wednesday","1/26/2023":"thursday","1/27/2023":"friday","1/28/2023":"weekend","1/29/2023":"weekend","1/30/2023":"monday","1/31/2023":"tuesday","2/1/2023":"wednesday","2/2/2023":"thursday","2/3/2023":"friday","2/4/2023":"weekend","2/5/2023":"weekend","2/6/2023":"monday","2/7/2023":"tuesday","2/8/2023":"wednesday","2/9/2023":"thursday","2/10/2023":"friday","2/11/2023":"weekend","2/12/2023":"weekend","2/13/2023":"monday","2/14/2023":"tuesday","2/15/2023":"wednesday","2/16/2023":"thursday","2/17/2023":"dayoff","2/18/2023":"weekend","2/19/2023":"weekend","2/20/2023":"dayoff","2/21/2023":"tuesday","2/22/2023":"wednesday","2/23/2023":"thursday","2/24/2023":"friday","2/25/2023":"weekend","2/26/2023":"weekend","2/27/2023":"monday","2/28/2023":"tuesday","3/1/2023":"wednesday","3/2/2023":"thursday","3/3/2023":"friday","3/4/2023":"weekend","3/5/2023":"weekend","3/6/2023":"monday","3/7/2023":"tuesday","3/8/2023":"wednesday","3/9/2023":"thursday","3/10/2023":"friday","3/11/2023":"weekend","3/12/2023":"weekend","3/13/2023":"monday","3/14/2023":"tuesday","3/15/2023":"wednesday","3/16/2023":"thursday","3/17/2023":"friday","3/18/2023":"weekend","3/19/2023":"weekend","3/20/2023":"monday","3/21/2023":"tuesday","3/22/2023":"wednesday","3/23/2023":"thursday","3/24/2023":"friday","3/25/2023":"weekend","3/26/2023":"weekend","3/27/2023":"monday","3/28/2023":"tuesday","3/29/2023":"minimum","3/30/2023":"thursday","3/31/2023":"minimum","4/1/2023":"weekend","4/2/2023":"weekend","4/3/2023":"dayoff","4/4/2023":"dayoff","4/5/2023":"dayoff","4/6/2023":"dayoff","4/7/2023":"dayoff","4/8/2023":"weekend","4/9/2023":"weekend","4/10/2023":"monday","4/11/2023":"tuesday","4/12/2023":"wednesday","4/13/2023":"thursday","4/14/2023":"friday","4/15/2023":"weekend","4/16/2023":"weekend","4/17/2023":"monday","4/18/2023":"tuesday","4/19/2023":"wednesday","4/20/2023":"thursday","4/21/2023":"friday","4/22/2023":"weekend","4/23/2023":"weekend","4/24/2023":"monday","4/25/2023":"tuesday","4/26/2023":"wednesday","4/27/2023":"thursday","4/28/2023":"friday","4/29/2023":"weekend","4/30/2023":"weekend","5/1/2023":"monday","5/2/2023":"tuesday","5/3/2023":"wednesday","5/4/2023":"thursday","5/5/2023":"friday","5/6/2023":"weekend","5/7/2023":"weekend","5/8/2023":"monday","5/9/2023":"tuesday","5/10/2023":"wednesday","5/11/2023":"thursday","5/12/2023":"friday","5/13/2023":"weekend","5/14/2023":"weekend","5/15/2023":"monday","5/16/2023":"tuesday","5/17/2023":"wednesday","5/18/2023":"thursday","5/19/2023":"friday","5/20/2023":"weekend","5/21/2023":"weekend","5/22/2023":"monday","5/23/2023":"tuesday","5/24/2023":"wednesday","5/25/2023":"thursday","5/26/2023":"minimum","5/27/2023":"weekend","5/28/2023":"weekend","5/29/2023":"dayoff","5/30/2023":"tuesday","5/31/2023":"wednesday","6/1/2023":"minimum","6/2/2023":"promotion"};
  
  function formatdate(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate().toString().padStart(2, "0")}, ${d.getFullYear()}`;
  }
  
  function nextschoolday() {
    let cdate = new Date();
    cdate.setDate(cdate.getDate() + 1);
    
    while (true) {
      if (cdate.getYear() >= 2023 && cdate.getMonth() >= 5 && cdate.getDate() >= 3) return null; // no more school
      
      if (!["weekend", "dayoff"].includes(daydata[cdate.toLocaleDateString()])) {
        return formatdate(cdate);
      }
      cdate.setDate(cdate.getDate() + 1);
    }
  }
  
  function show() {
    let today_date = new Date();
    
    let today_displays;
    
    if (today_date.getYear() > 2023 || (today_date.getYear() == 2023 && today_date.getMonth() > 5 || (today_date.getMonth() == 5 && today_date.getDate() >= 3))) {
      today.textContent = "There is no more school!"
    } else {
      today_displays = {
        "weekend": `Today is a weekend!`,
        "minimum": `Today is a minimum day! School starts at 8:25 AM and ends at 12:30 PM, unless you have Extended Day, in which case it ends at 1:10 PM. Classes are 37 minutes long.`,
        "firstday7": `Today is the first day for seventh graders! School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:38 PM. Classes are 35 minutes long.`,
        "firstday8": `Today is the first day for eighth graders! School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:48 PM. Classes are 45 minutes long.`,
        "minimumblock": `Today is a minimum block day! School starts at 8:25 AM and ends at 12:30 PM${today_date.getDate()%2?", unless you have Extended Day, in which case it ends at 1:50 PM.":"."} Classes are 77 minutes long. Today, you will attend only your ${today_date.getDate() % 2 ? "odd" : "even"} period classes${today_date.getDate()%2?", as well as Extended Day if you have it.":"."}`,
        "promotion": `Today is the eighth grade promotion! Seventh graders should not come to school. School starts at 8:30 AM and ends at 12:30 PM. Go to your advisement class first.`,
        "dayoff": `Today is a day off!`,
        "monday": `Today is Monday, a late start! School starts at 8:55 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:55 PM. Classes are 52 minutes long.`,
        "tuesday": `Today is Tuesday, a reverse day! Go to your sixth period class first. School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 4:00 PM. Classes are 57 minutes long.`,
        "wednesday": `Today is Wednesday! School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 4:00 PM. Classes are 57 minutes long.`,
        "thursday": `Today is Thursday, a late start reverse day! Go to your sixth period class first. School starts at 8:55 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:55 PM. Classes are 52 minutes long.`,
        "friday": `Today is Friday! Remember to attend advisement, which is after third period. School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:56 PM. Classes are 53 minutes long.`
      };
      
      today.textContent = today_displays[daydata[today_date.toLocaleDateString()]]+((today_date.getDay()==5&&daydata[today_date.toLocaleDateString()]=="minimum")?" There will not be advisement.":""));
    }
    
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
        "friday": `Tomorrow is Friday! Remember to attend advisement, which is after third period. School starts at 8:25 AM and ends at 3:00 PM, unless you have Extended Day, in which case it ends at 3:56 PM. Classes are 53 minutes long.`
      };
      
      tomorrow.textContent = tomorrow_displays[daydata[tomorrow_date.toLocaleDateString()]]+((tomorrow_date.getDay()==5&&daydata[tomorrow_date.toLocaleDateString()]=="minimum")?" There will not be advisement.":""));
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
      
      let datetime = new Date(row.time);
      let date = datetime.toLocaleDateString();
      let time = datetime.toLocaleTimeString();

      let description = row.description;
      let category = row.category;
      
      loadmorebutton.insertAdjacentHTML("beforebegin", `<div class="card-link" data-bs-toggle="modal" data-bs-target="#rowmodal${index}"><div class="card"><div class="card-header"><div class="d-flex align-items-center justify-content-between"><div class="d-flex align-items-center"><div><h6 class="card-title mb-0">${title}</h6><p class="small mb-0">${datetime.toLocaleString()}</p></div></div></div></div><div class="card-body"><div class="mb-0">${description}</div></div><div class="card-footer border-0 d-flex justify-content-between align-items-center"><p class="mb-0">Category: ${category}</p><button class="btn btn-primary-soft btn-sm">Learn more</button></div></div></div><div class="modal" tabindex="-1" id="rowmodal${index}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">${title} <small>on ${date} at ${time}</small></h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p>${description}</p><p><small>Category: ${category}</small></p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div></div></div>`);
    }

    dataindex += toload;
    
    if (nomore) {
      loadmorebutton.insertAdjacentHTML("beforebegin", `<div class="card"><div class="alert alert-info mb-0" role="alert">Nothing else to load.</div></div>`);
      loadmorebutton.remove();
    }
  }
  
  fetch("https://script.google.com/macros/s/AKfycbzZtYu_kEXFPXRWgWfCp8qPsP4g3ae7BrGO6f0UjsxqHr2tbKxsBs5Aq8VhS0E-5mlz/exec").then(e => e.json()).then(response => {
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
    
    searchresultsbody.innerHTML = results.map(match => `<div class="card"><div class="card-header"><div class="d-flex align-items-center justify-content-between"><div class="d-flex align-items-center"><div><h6 class="card-title mb-0">${match.item.title}</h6><p class="small mb-0">${new Date(match.item.time).toLocaleString()}</p></div></div></div></div><div class="card-body"><p class="mb-0">${match.item.description}</p></div><div class="card-footer border-0 d-flex justify-content-between align-items-center"><p class="mb-0">Category: ${match.item.category}</p></div></div>`).join("") || `<div class="card"><div class="card-header"><div class="d-flex align-items-center justify-content-between"><div class="d-flex align-items-center"><div><h6 class="card-title mb-0">No results could be found</h6></div></div></div></div><div class="card-body"><p class="mb-0">Please try broadening your search, or checking to make sure that your search filters are not too strict.</p></div></div>`;
    
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
  
  fetch("https://script.google.com/macros/s/AKfycbwoygN-ilaOfgUP-IxC06fvY4bp9R_JovxMHem--ROxFbvuG1zG4xCEUREmxz1XrpecgA/exec").then(e => e.text()).then(e => {
    navbarhtml.outerHTML = e;
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
