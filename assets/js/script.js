let titles;

window.onload = () => {
  
  //copyrightyear.textContent = new Date().getFullYear(); //needs to be commented out because copyrightyear only exists on index.html, but this script is run on other pages
//displaying info on index page
  let data;
  let datalen;
  let dataindex = 0;
  let carouselId = 0;
  
  let fuse;

  function load() { //load info onto index page
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
      let date = row.time;
      let description = row.description;
      let category = row.category;
      let hideHeader = +row.hideHeader;
      let hideBody = +row.hideBody;
      let hideFooter = +row.hideFooter;
      let hideModal = +row.hideModal;
      let carousel = +row.carousel;
      let banner = +row.banner;
  //carousel (rotating images)
      if (carousel){
        carouselImgs = description.split(/(?:<br\s*\/?>\s*)+/gi);
        description = `<div id="carousel${carouselId}" class="carousel carousel-dark slide" data-bs-ride="carousel"><div class="carousel-indicators"><button type="button" data-bs-target="#carousel${carouselId}" data-bs-slide-to="${0}" class="active" aria-current="true" aria-label="Slide ${1}"></button>`;
        for (let i = 1; i < carouselImgs.length; i++){
          description += `<button type="button" data-bs-target="#carousel${carouselId}" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i+1}"></button>`;
        }
        description += `</div><div class="carousel-inner"><div class="carousel-item active" data-bs-interval="3000"><img src="${carouselImgs[0]}" style="margin:auto" height="333.75" class="d-block" alt="..."></div>`;
        for (let i = 1; i < carouselImgs.length; i++){
          description += `<div class="carousel-item" data-bs-interval="3000"><img src="${carouselImgs[i]}" width="100%" height="100%" class="d-block" alt="..."></div>`;
        }
        description += `</div><button class="carousel-control-prev" type="button" data-bs-target="#carousel${carouselId}" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carousel${carouselId}" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div>`;
        carouselId++;
      }
      if (banner){
        loadmorebutton.insertAdjacentHTML("beforebegin", `<div class="card-link" ${hideModal?"":`data-bs-toggle="modal" data-bs-target="#rowmodal${index}"`} id="banner"><div class="card"><div class="card-header"><div class="d-flex align-items-center justify-content-between"><div class="d-flex align-items-center"><div><h6 class="card-title mb-0">${title}</h6>`);
      }
      else {
        loadmorebutton.insertAdjacentHTML("beforebegin", `<div class="card-link" ${hideModal?"":`data-bs-toggle="modal" data-bs-target="#rowmodal${index}"`} id="x${title.replace(/['"\s]/g, '-')}"><div class="card">${hideHeader?"":`<div class="card-header"><div class="d-flex align-items-center justify-content-between"><div class="d-flex align-items-center"><div><h6 class="card-title mb-0">${title}</h6><p class="small mb-0">${date}</p></div></div></div></div>`}${hideBody?"":`<div class="card-body"><div class="mb-0">${description}</div></div>`}${hideFooter?"":`<div class="card-footer border-0 d-flex justify-content-between align-items-center"><p class="mb-0">${category}</p></div>`}</div></div><div class="modal" tabindex="-1" id="rowmodal${index}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">${title} <small>on ${date}</small></h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p>${description}</p><p><small>${category}</small></p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div></div></div>`);
      }
    }
  
    dataindex += toload;
    //load more button
    if (nomore) {
      loadmorebutton.insertAdjacentHTML("beforebegin", `<div class="card"><div class="alert alert-info mb-0" role="alert">Nothing else to load.</div></div>`);
      loadmorebutton.remove();
    }
  
    for (element of document.querySelectorAll('.carousel')){
      new bootstrap.Carousel(element).cycle()
    }
    
    // Find the active carousel item
    let activeItem = document.querySelector('.active.carousel-item');
    let activeWidth = 0;
    let desiredHeight = 0;
    if (!activeItem) {
        console.warn('No active carousel item found.');
    }
    else {
    activeWidth = activeItem.offsetWidth; // Get the width of the active item
    desiredHeight = (10/16)*(activeWidth); // Calculate the desired width
    }
    // Set the height for all carousel items
    let items = document.querySelectorAll('.carousel-item');
    items.forEach(function(item) {
        item.style.height = desiredHeight + 'px';
    });
  }
  //get and parse and display info for advisement announcements (on index.html page)
  fetchSheetRows(SHEET_GIDS.announcements).then(rows => {
    let items = rows
      .map(Row => ({ body: Row[0], date: Row[1], category: Row[2] }))
      .filter(Row => Row.category == "Advisement Announcements")
      .slice(0, 3);

    if (items.length) {
      announcements.innerHTML = items.map(item => {
        let match = item.body.match(/https:\/\/docs\.google\.com\/presentation\/d\/[^\s"'<>]+/);
        let href = match ? match[0] : "announcements";
        let dateLabel = new Date(item.date).toLocaleDateString();
        return `<u><a href="${href}">${dateLabel} Announcements</a></u><br>`;
      }).join("") + '<br>Older announcements can be found <a href="announcements">here.</a>';
    } else {
      announcements.innerHTML = 'No advisement announcements for now.';
    }
  });
  //get and parse and display info for upcoming events
  fetchSheetRows(SHEET_GIDS.upcomingEvents).then(rows => {
    let yesterday = new Date(+new Date() - 86400000);

    let items = rows.map(Row => {
      let body = Row[0];
      let post = Row[1];
      let dateParts = Row[2].split("-");
      let sortDate = dateParts[dateParts.length - 1] == "???" ? new Date("1/1/2099") : new Date(dateParts[dateParts.length - 1]);
      let label = dateParts.length == 1 ? dateParts[0].slice(0, -3) : `${dateParts[0].slice(0, -3)}-${dateParts[1] == "???" ? "" : dateParts[1].slice(0, -3)}`;
      let info = Row[3];

      let html = post != ""
        ? `<li style="cursor:pointer" onclick="goToPost('${post.replace(/['"\s]/g, '-')}')"><b>${label}&nbsp;&nbsp;<u style="color:#0f6fec">${body}</u></b>${info}</li>`
        : `<li><b>${label}&nbsp;&nbsp;${body}</b>${info}</li>`;

      return { sortDate, html };
    });

    upcomingEvents.innerHTML = items.filter(item => item.sortDate > yesterday).map(item => item.html).join("");
  });
  //get and parse and display info for posts
  fetchSheetRows(SHEET_GIDS.posts).then(rows => {
    data = rows.map(Row => {
      let daydata = Row[4] != "" ? Row[4].split("/") : ["0", "0", "0"];
      let timedata = Row[5] != "" ? Row[5].split(":") : ["0", "0"];
      let month = daydata[0] - 1;
      let posted = new Date(parseInt(daydata[2]), parseInt(month), parseInt(daydata[1]), parseInt(timedata[0]), parseInt(timedata[1]));
      let diff = posted.getTime() - new Date().getTime();

      if (diff > 0) {
        return {
          title: Row[0],
          description: Row[1],
          category: Row[2],
          time: Row[3],
          hideHeader: 1,
          hideBody: 1,
          hideFooter: 1,
          hideModal: 1,
          carousel: 0,
          banner: 0,
        };
      }
      return {
        title: Row[0],
        description: Row[1],
        category: Row[2],
        time: Row[3],
        hideHeader: Row[6] == "" ? 0 : Row[6],
        hideBody: Row[7] == "" ? 0 : Row[7],
        hideFooter: Row[8] == "" ? 0 : Row[8],
        hideModal: Row[9] == "" ? 0 : Row[9],
        carousel: Row[10] == "" ? 0 : Row[10],
        banner: Row[11] == "" ? 0 : Row[11],
      };
    });

    titles = data.map(item => item.title.replace(/['"\s]/g, '-'));
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
//search
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
    let searchresultsbody = document.getElementById("searchresultsbody");
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
  //search options
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
  if (titles.includes(id)) {
    try {
      window.scrollTo({ top: document.querySelector("#x"+id).offsetTop-document.querySelector("header").offsetHeight-10, behavior: 'smooth' });
    }
    catch(err) {
      load();
      goToPost(id);
    }
  }
  else {
    console.log("Couldn't find post!");
  }
}
