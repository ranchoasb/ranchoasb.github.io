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
