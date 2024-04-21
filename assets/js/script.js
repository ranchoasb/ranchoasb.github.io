window.onload = () => {
  
  copyrightyear.textContent = new Date().getFullYear();

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
      let date = row.time;
      let description = row.description;
      let category = row.category;
      let hideHeader = +row.hideHeader;
      let hideBody = +row.hideBody;
      let hideFooter = +row.hideFooter;
      let hideModal = +row.hideModal;
      
      loadmorebutton.insertAdjacentHTML("beforebegin", `<div class="card-link" ${hideModal?"":`data-bs-toggle="modal" data-bs-target="#rowmodal${index}"`} id="x${title.replaceAll(" ", "-")}"><div class="card">${hideHeader?"":`<div class="card-header"><div class="d-flex align-items-center justify-content-between"><div class="d-flex align-items-center"><div><h6 class="card-title mb-0">${title}</h6><p class="small mb-0">${date}</p></div></div></div></div>`}${hideBody?"":`<div class="card-body"><div class="mb-0">${description}</div></div>`}${hideFooter?"":`<div class="card-footer border-0 d-flex justify-content-between align-items-center"><p class="mb-0">Category: ${category}</p></div>`}</div></div><div class="modal" tabindex="-1" id="rowmodal${index}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">${title} <small>on ${date}</small></h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p>${description}</p><p><small>Category: ${category}</small></p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button></div></div></div></div>`);
    }

    dataindex += toload;
    
    if (nomore) {
      loadmorebutton.insertAdjacentHTML("beforebegin", `<div class="card"><div class="alert alert-info mb-0" role="alert">Nothing else to load.</div></div>`);
      loadmorebutton.remove();
    }

    for (element of document.querySelectorAll('.carousel')){
      new bootstrap.Carousel(element).cycle()
    }
    
    // Find the active carousel item
    var activeItem = document.querySelector('.active.carousel-item');
    if (!activeItem) {
        console.warn('No active carousel item found.');
    }
    var activeWidth = activeItem.offsetWidth; // Get the width of the active item
    var desiredHeight = (10 / 16) * activeWidth; // Calculate the desired height

    // Set the height for all carousel items
    var items = document.querySelectorAll('.carousel-item');
    items.forEach(function(item) {
        item.style.height = desiredHeight + 'px';
    });
  }

  fetch("https://script.google.com/macros/s/AKfycbylp7XIw-zKcFtz1tOjPAI9_sR-I3PYyjP1bMXWTyrio3IYEMBNxeg2XT_1X9DzU_4H/exec?query=announcements").then(e=>e.text()).then(response => {
    try{
      for(let i=0;i<Math.min(3,response.match(/Advisement Announcements for /g).length);i++) {
        response = response.slice(response.indexOf('<div class="accordion-item"',1));
        announcements.innerHTML+=`<u><a href="${response.slice(response.indexOf("https://docs.google.com/presentation/d/"),response.indexOf(">",response.indexOf("https://docs.google.com/presentation/d/"))-1)}">${response.slice(response.indexOf("data-date=")+11,response.indexOf('>',response.indexOf("data-date="))-6)} Announcements</a></u><br>`
      }
      announcements.innerHTML+='<br>Older announcements can be found <a href="announcements">here.</a>';
    }
    catch {
      announcements.innerHTML+='No advisement announcements for now.';
    }
  });
  fetch("https://script.google.com/macros/s/AKfycbylp7XIw-zKcFtz1tOjPAI9_sR-I3PYyjP1bMXWTyrio3IYEMBNxeg2XT_1X9DzU_4H/exec?query=upcomingEvents").then(e=>e.text()).then(response=>{
    response = response.split(".....");
    response = response.map(i=>i.split("/////"));
    upcomingEvents.innerHTML=response.map(
      i=>new Date(i[0])>new Date(+new Date()-86400000)?i[1]:""
    ).join("");});
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
