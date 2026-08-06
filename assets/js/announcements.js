fetchSheetRows(SHEET_GIDS.announcements).then(rows => {
  let Data = rows.map(Row => {
    let daydata = Row[1].split("/");
    let timedata = Row[3] != "" ? Row[3].split(":") : ["0", "0"];
    let month = daydata[0] - 1;
    let posted = new Date(parseInt(daydata[2]), parseInt(month), parseInt(daydata[1]), parseInt(timedata[0]), parseInt(timedata[1]));
    let diff = posted.getTime() - new Date().getTime();

    if (diff > 0) {
      return {
        body: "Will be posted at " + posted.toString(),
        date: new Date(Row[1]).toLocaleDateString(),
        category: Row[2],
      };
    }
    return {
      body: Row[0],
      date: new Date(Row[1]).toLocaleDateString(),
      category: Row[2],
    };
  });

  accordion.outerHTML = `<div class="accordion">${Data.map((Row, Index) => `<div class="accordion-item" id="index${Index}" data-date="${Row.date}"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panel-${Index}" aria-expanded="false" aria-controls="panel-${Index}">${Row.category} for ${Row.date}</button></h2><div id="panel-${Index}" class="accordion-collapse collapse" aria-labelledby="panel-${Index}"><div class="accordion-body">${Row.body}</div></div></div>`).join("")}</div>`;
});

datepicker(date, {
  onHide: () => {
    [...document.querySelector(".accordion").children].forEach(announcement => (announcement.style.display = announcement.dataset.date == new Date(date.value).toLocaleDateString() ? "block" : "none"));
  }
});
