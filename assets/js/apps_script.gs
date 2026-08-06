/**
 * Note. When you are done editing, remember to click save and deploy.
   * Deploy by going to the top right and clicking the blue Deploy button.
   * Go to Manage Deployments (not New Deployments).
   * Click edit (pencil icon).
   * Change the Version to New Version.
   * Click save.
 */

function onOpen(e) {
  SpreadsheetApp.getUi().createMenu("Website")
    .addItem("Update Posts", "updatePosts")
    .addItem("Update Announcements", "updateAnnouncements")
    .addItem("Update Navbar", "updateNavbar")
    .addItem("Update Upcoming Events", "updateUpcomingEvents")
    .addItem("Update Clubs", "retrieveClubs")
    .addItem("Update Schedule", "updateSchedule")
    .addItem("Update Accounts", "retrieveEmails")
    .addSeparator()
    .addItem("Debug Posts", "debugPosts")
    .addItem("Debug Announcements", "debugAnnouncements")
    .addItem("Debug Navbar", "debugNavbar")
    .addItem("Debug Upcoming Events", "debugUpcomingEvents")
    .addItem("Debug Clubs", "debugClubs")
    .addItem("Debug Schedule", "debugSchedule")
    .addSeparator()
    .addItem("Website Information", "guide")
    .addToUi();
}
/**
 * Instructions for posting:\nIn the title column, input the title of the post. In the description column, input the content of the post. In the category column, input the category of the post (appears at the bottom of the post). In the time column, input a date relevant to the post. Sort posts by reverse chronological order.\n\nInstructions for Upcoming Events:\nIn the title column, input the name of the upcoming event. In the second column, input the title of the post that will be scrolled to when the title text is clicked. In the date column, input a date relevant to the event. In the additional information column, input any additional information (must be written in HTML. For example, to add a link to an advisement challenge's ranking sheet as a subpoint, input <ul><li><a href='URL Link'>Text Here</a></li></ul>). Sort events by chronological order.\n\nInstructions for navbar:\nAdd another row to add a new navbar element. In the name column, input the text that will appear. In the link column, input the page that the navbar element links to. If the domain is ranchoasb.org, simply input the content after the /. Otherwise, copy and paste the full URL. Make sure the IDs are in order. In the parent column, input 0. Formatting/JavaScript issues may arise. Contact the previous webmaster for help.\n\nInstructions for Announcements:\nIn the announcements column, input the content that will appear in the Adv. Announcements page. In the date column, input the date the slides were presented. In the category column, input Advisement Announcements. Sort announcements by reverse chronological order.\n\nImportant Notes:\n- When using <a> tags, make sure the href property is not linked in the Google Sheet (i.e., make sure it is just plain text) \nOur website is located at https://ranchoasb.org. The website is run and managed by the Rancho ASB Webmaster. Data is stored on this Google Spreadsheet, and the frontend is managed at https://github.com/ranchoasb/ranchoasb.github.io. The GitHub repository is managed by the account ranchoasb, with a password of ranchoasbpi314159. The email ranchosjasb@gmail.com owns that account, with a Google Account password of ranchoasbe271828. The website is hosted through Domains by Proxy, LLC (GoDaddy) and the domain and DNS certificates need to be renewed by March 23, 2026 at 20:49:58 UTC. To figure out how, go to https://themeisle.com/blog/renew-ssl-certificate/#gref \n If you are the webmaster, here are some tips to begin editing the website. Editing the GitHub does not require any special training. Editing the actual content, e.g., posts, announcements, or the navigation bar, requires some more work. Whenever editing, navigate to the sheet of your choice and add a row and fill in whatever content you want. Any default styling (limited to bolding, italicizing, underlining, strike-throughing, and linking text, or adding new lines) will be rendered, but only HTML code will work for more complicated formatting such as tables, lists, or images. See past rows for guides. When you are done editing, go to the Website menubar (top of the screen) and press buttons to update the appropriate information. The Extensions menubar also contains a link to the Apps Script, which is helpful if you would like to add functionalities. Note from 2025-26 webmaster: the aspect ratio for the carousel is 149:63. To get images into the required format, add it to a slides presentation, go to share -> publish to web, go to the link, then right click -> copy image address."
 */
function guide() {
  SpreadsheetApp.getUi().alert("For optimization, this information has been moved to the beginning of the Google Apps script. Click Extensions->Apps Script.");
}

function rangeToHtml(range) {
  let values = range.getRichTextValues();

  return values.map(row => row.map(value => {
    let runs = value.getRuns();

    let formattedRuns = runs.map(run => {
      let text = run.getText();

      let link = run.getLinkUrl();
      let parentTag = "span";
      let attrString = "";

      let style = run.getTextStyle();

      let tags = [];
      if (style.isBold()) {
        tags.push("b");
      }
      if (style.isItalic()) {
        tags.push("i");
      }
      if (style.isUnderline()) {
        tags.push("u");
      }
      if (style.isStrikethrough()) {
        tags.push("strike");
      }

      if (link) {
        parentTag = "a";
        attrString = `href="${link}"`;

        tags = [];
      } else {
        if (tags.length == 0) {
          return text.replace(/[\r\n]{2}/g, "<br><br>");
        } else if (tags.length == 1) {
          parentTag = tags[0];
          tags = [];
        }
      }

      let headTags = tags.length ? `<${tags.join("><")}>` : "";
      let closeTags = tags.length ? `</${tags.join("></")}>` : "";

      return `<${parentTag} ${attrString}>${headTags}${text}${closeTags}</${parentTag}>`.replace(/[\r\n]{2}/g, "<br><br>");
    });

    return formattedRuns.join("");
  }));
}

function retrievePosts() {
  let Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Posts");

  let dayof = "1/0/0";
  let timeof = "0:0";
  let daydata = [];
  let timedata = [];

  let Data = rangeToHtml(Sheet.getDataRange()).filter((_, i) => i).map(Row => {
    dayof = "1/0/0";
    timeof = "0:0";
    daydata = [];
    timedata = [];

    if (Row[4] != ""){
      dayof = Row[4];
      daydata = dayof.split("/");
    }
    else {
      daydata = ["0", "0", "0"];
    }
    if (Row[5] != ""){
      timeof = Row[5];
      timedata = timeof.split(":");
    }
    else {
      timedata = ["0", "0"];
    }

    let month = daydata[0]-1;
    console.log(timedata[0]);
    let posted = new Date(parseInt(daydata[2]), parseInt(month), parseInt(daydata[1]), parseInt(timedata[0]), parseInt(timedata[1]));
    console.log(posted.getTime());

    let currentdate = new Date().getTime();
    let diff = posted.getTime()-currentdate;
    
    if (diff>0){
      return ({
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
      });
    }
    else {
      return ({
        title: Row[0],
        description: Row[1],
        category: Row[2],
        time: Row[3],
        hideHeader: Row[6]=="" ? 0 : Row[6],
        hideBody: Row[7]=="" ? 0 : Row[7],
        hideFooter: Row[8]=="" ? 0 : Row[8],
        hideModal: Row[9]=="" ? 0 : Row[9],
        carousel: Row[10]=="" ? 0 : Row[10],
        banner: Row[11]=="" ? 0: Row[11],
      });
    }
    
  });

  // Data.sort((a, b) => b.time - a.time);

  return String(JSON.stringify(Data));
}
retrievePosts();

function getPosts() {
  let Properties = PropertiesService.getScriptProperties();
  let Data = Properties.getProperty("Posts");

  if (Data != null) {
    return Data;
  }

  Data = retrievePosts();

  Properties.setProperty("Posts", Data);

  return Data;
}

function updatePosts() {
  let Data = retrievePosts();
  console.log(Data);
  PropertiesService.getScriptProperties().setProperty("Posts", Data);
}

function debugPosts() {
  let Properties = PropertiesService.getScriptProperties();
  let Data = Properties.getProperty("Posts");

  if (Data != null) {
    SpreadsheetApp.getUi().alert("The following content was stored through PropertiesService.\n\n" + Data);
    return;
  }

  Data = retrievePosts();

  Properties.setProperty("Posts", Data);

  SpreadsheetApp.getUi().alert("The following content was not initially stored through PropertiesService, but is now.\n\n" + Data);
}

function retrieveAnnouncements() {
  let Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Announcements");
  let dayof = "1/0/0";
  let timeof = "0:0";
  let daydata = [];
  let timedata = [];
  
  let Data = rangeToHtml(Sheet.getDataRange()).filter((_, i) => i).map(Row => {
    dayof = "1/0/0";
    timeof = "0:0";
    daydata = [];
    timedata = [];

    dayof = Row[1];
    daydata = dayof.split("/");

    if (Row[3] != ""){
      timeof = Row[3];
      timedata = timeof.split(":");
    }
    else {
      timedata = ["0", "0"];
    }

    let month = daydata[0]-1;
    console.log(timedata[0]);
    let posted = new Date(parseInt(daydata[2]), parseInt(month), parseInt(daydata[1]), parseInt(timedata[0]), parseInt(timedata[1]));
    console.log(posted.getTime());

    let currentdate = new Date().getTime();
    let diff = posted.getTime()-currentdate;
    
    if (diff>0){
      let message = "Will be posted at " + posted.toString();
      return ({
        body: message,
        date: new Date(Row[1]).toLocaleDateString(),
        category: Row[2]
      });
    }
    else {
      return ({
        body: Row[0],
        date: new Date(Row[1]).toLocaleDateString(),
        category: Row[2]
      });
    }
  });

  Data.sort((a, b) => b.date - a.date);

  Data = `<div class="accordion">${Data.map((Row, Index) => `<div class="accordion-item" id="index${Index}" data-date="${Row.date}"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panel-${Index}" aria-expanded="false" aria-controls="panel-${Index}">${Row.category} for ${Row.date}</button></h2><div id="panel-${Index}" class="accordion-collapse collapse" aria-labelledby="panel-${Index}"><div class="accordion-body">${Row.body}</div></div></div>`).join("")}</div>`;

  return Data;
}

retrieveAnnouncements();

function getAnnouncements() {
  let Properties = PropertiesService.getScriptProperties();
  let Data = Properties.getProperty("Announcements");

  if (Data != null) {
    return Data;
  }

  Data = retrieveAnnouncements();

  Properties.setProperty("Announcements", Data);

  return Data;
}

function updateAnnouncements() {
  let Data = retrieveAnnouncements();

  PropertiesService.getScriptProperties().setProperty("Announcements", Data);
}

function debugAnnouncements() {
  let Properties = PropertiesService.getScriptProperties();
  let Data = Properties.getProperty("Announcements");

  if (Data != null) {
    SpreadsheetApp.getUi().alert("The following content was stored through PropertiesService.\n\n" + Data);
    return;
  }

  Data = retrievePosts();

  Properties.setProperty("Announcements", Data);

  SpreadsheetApp.getUi().alert("The following content was not initially stored through PropertiesService, but is now.\n\n" + Data);
}

function retrieveUpcomingEvents() {
  let Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Upcoming Events");

  let Data = rangeToHtml(Sheet.getDataRange()).filter((_, i) => i).map(Row => ({
    body: Row[0],
    post: Row[1],
    date: Row[2].split("-"),
    info: Row[3]
  }));

  Data = Data.map(Row => `${Row.date[Row.date.length-1]=="???"?"1/1/2099":Row.date[Row.date.length-1]}/////`+(Row.post!="" ? `<li style="cursor:pointer" onclick="goToPost('${Row.post.replace(/['"\s]/g, '-')}')"><b>${Row.date.length==1?Row.date[0].slice(0,-3):`${Row.date[0].slice(0,-3)}-${Row.date[1]=="???"?"":Row.date[1].slice(0,-3)}`}&nbsp;&nbsp;<u style="color:#0f6fec">${Row.body}</u></b>${Row.info}</li>.....` : `<li><b>${Row.date.length==1?Row.date[0].slice(0,-3):`${Row.date[0].slice(0,-3)}-${Row.date[1]=="???"?"":Row.date[1].slice(0,-3)}`}&nbsp;&nbsp;${Row.body}</b>${Row.info}</li>.....`)).join("");
  return Data;
}

function getUpcomingEvents() {
  let Properties = PropertiesService.getScriptProperties();
  let Data = Properties.getProperty("Upcoming Events");

  if (Data != null) {
    return Data;
  }

  Data = retrieveUpcomingEvents();

  Properties.setProperty("Upcoming Events", Data);

  return Data;
}

function updateUpcomingEvents() {
  let Data = retrieveUpcomingEvents();

  PropertiesService.getScriptProperties().setProperty("Upcoming Events", Data);
}

function debugUpcomingEvents() {
  let Properties = PropertiesService.getScriptProperties();
  let Data = Properties.getProperty("Upcoming Events");

  if (Data != null) {
    SpreadsheetApp.getUi().alert("The following content was stored through PropertiesService.\n\n" + Data);
    return;
  }

  Data = retrievePosts();

  Properties.setProperty("Upcoming Events", Data);

  SpreadsheetApp.getUi().alert("The following content was not initially stored through PropertiesService, but is now.\n\n" + Data);
}

function formatNavbar(ID, Subtree, IDs, isdropdown) {
  let Rows = Object.keys(Subtree);
  if (Rows.length == 0) {
    if (ID == 0) return "";
    let Row = IDs[ID];

    if (isdropdown) {
      if (ID == 3) return `<a class="dropdown-item" target="_blank" href="${Row.link}">${Row.name}</a>`
      return `<a class="dropdown-item" target="_self" href="${Row.link}">${Row.name}</a>`
    }
    if (ID == 3) return `<li class="nav-item"><a class="nav-link" target="_blank" href="${Row.link}">${Row.name}</a></li>`
    return `<li class="nav-item"><a class="nav-link" target="_self" href="${Row.link}">${Row.name}</a></li>`;
  } else {
    if (ID == 0) {
      return Rows.map(Row => formatNavbar(Row, Subtree[Row], IDs, false)).join("");
    }
    if (isdropdown) {
      return `<a class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${IDs[ID].name}</a><ul class="dropdown-menu"><li class="dropdown-submenu">${Rows.map(Row => formatNavbar(Row, Subtree[Row], IDs, true)).join("")}</li></ul>`;
    }
    return `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${IDs[ID].name}</a><ul class="dropdown-menu"><li class="dropdown-submenu">${Rows.map(Row => formatNavbar(Row, Subtree[Row], IDs, true)).join("")}</li></ul></li>`;
  }
}

function retrieveNavbar() {
  let Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Navbar");

  let Data = Sheet.getDataRange().getValues().filter((_, i) => i).map(Row => ({
    name: Row[0],
    link: Row[1],
    ID: Row[2],
    parent: Row[3]
  }));

  let Tree = {};
  
  let Keep = Data;
  let NewKeep = [];

  let Parents = [];
  let NewParents = [];

  let ParentPaths = [];
  let NewParentPaths = [];

  for (let Row of Keep) {
    if (Row.parent == "0") {
      Tree[Row.ID] = {};
      Parents.push(Row.ID);
      ParentPaths.push([Row.ID])
    } else {
      NewKeep.push(Row);
    }
  }

  Keep = NewKeep;
  NewKeep = [];

  let CurrentLength;

  while (Keep.length > 0) {
    CurrentLength = Keep.length;
    for (let Row of Keep) {
      if (Parents.includes(Row.parent)) {
        let CurrentNode = Tree;
        let ParentPath = ParentPaths[Parents.indexOf(Row.parent)];

        for (let Next of ParentPath) {
          CurrentNode = CurrentNode[Next];
        }

        CurrentNode[Row.ID] = {};
        NewParentPaths.push(ParentPath.concat([Row.ID]));
        NewParents.push(Row.ID);
      } else {
        NewKeep.push(Row);
      }
    }
    if (NewKeep.length == CurrentLength) {
      break;
    }

    Keep = NewKeep;
    Parents = NewParents;
    ParentPaths = NewParentPaths;

    NewKeep = [];
    NewParents = [];
    NewParentPaths = [];
  }

  let IDs = {};
  for (let Row of Data) {
    IDs[Row.ID] = {
      name: Row.name,
      link: Row.link
    }
  }

  return `<div class="ms-auto"><ul class="navbar-nav navbar-nav-scroll" style="margin-right:1vw">${formatNavbar(0, Tree, IDs, false)}</ul></div>`;
}

function getNavbar() {
  let Properties = PropertiesService.getScriptProperties();
  let Data = Properties.getProperty("Navbar");

  if (Data != null) {
    return Data;
  }

  Data = retrieveNavbar();

  Properties.setProperty("Navbar", Data);

  return Data;
}

function updateNavbar() {
  let Data = retrieveNavbar();

  PropertiesService.getScriptProperties().setProperty("Navbar", Data);
}

function debugNavbar() {
  let Properties = PropertiesService.getScriptProperties();
  let Data = Properties.getProperty("Navbar");

  if (Data != null) {
    SpreadsheetApp.getUi().alert("The following content was stored through PropertiesService.\n\n" + Data);
    return;
  }

  Data = retrievePosts();

  Properties.setProperty("Navbar", Data);

  SpreadsheetApp.getUi().alert("The following content was not initially stored through PropertiesService, but is now.\n\n" + Data);
}

function incrementViews() {
  let Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Statistics");

  let Index = Sheet.getDataRange().getValues().map((e, i) => [e, i]).filter(Row => Row[0][0] == "View Count")[0][1] + 1;
  let Cell = Sheet.getRange("B" + Index);

  let Count = parseInt(Cell.getValue());
  Count++;

  Cell.setValue(Count);
}
function retrieveClubs(){
  let Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lunch Clubs");
  let Data = rangeToHtml(Sheet.getDataRange()).filter((_, i) => i).map(Row => ({
    name: Row[0],
    description: Row[1],
    location: Row[2],
    picture: Row[3],
    monday: Row[4]=="" ? 0 : Row[4],
    tuesday: Row[5]=="" ? 0 : Row[5],
    wednesday: Row[6]=="" ? 0 : Row[6],
    thursday: Row[7]=="" ? 0 : Row[7],
    friday: Row[8]=="" ? 0 : Row[8]
  }));
  console.log(Data);
  return JSON.stringify(Data);
}
function retrieveSchedule(){
  let Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bell Schedule");
  let Data = rangeToHtml(Sheet.getDataRange()).filter((_, i) => i).map(Row => ({
    occasion: Row[0],
    date: Row[1],
    starttime: Row[2],
    endtime: Row[3],
    extendedday: Row[4],
    periodlength: Row[5],
    school: Row[6],
    additional: Row[7],
  }));
  console.log(JSON.stringify(Data));
  return JSON.stringify(Data);
}
function getSchedule() {
  let userProperties = PropertiesService.getScriptProperties();
  let data = userProperties.getProperty("Schedule");

  if (data != null) {
    return data;
  }

  data = retrieveSchedule();

  userProperties.setProperty("Schedule", data);

  return data;
}
function updateSchedule() {
  let data = retrieveSchedule();
  PropertiesService.getScriptProperties().deleteProperty("Schedule");
  PropertiesService.getScriptProperties().setProperty("Schedule", data);
  return data;
}
function debugSchedule() {
  let userProperties = PropertiesService.getScriptProperties();
  let data = userProperties.getProperty("Schedule");
  console.log(data);
}
function retrieveEmails() {
  let Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Accounts");
  let Data = rangeToHtml(Sheet.getDataRange()).filter((_, i) => i).map(Row => ({
    email: Row[0],
    iusd: Row[1],
  }));
  console.log(JSON.stringify(Data));
  return String(JSON.stringify(Data));
}
function setEmail(e) {
  let Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Accounts");

  Sheet.appendRow([String(e.email), String(e.iusd)]);

  return "Yay!";
}
function statistics(e){
  let Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Statistics");

  Sheet.insertRowAfter(2);
  Sheet.getRange(3,1,1,2).setValues([[String(e.type), String(e.time)]]);

  return "Yay!";
}
function doGet(e) {
  switch (e.parameter.query) {
    case "posts":
      return ContentService.createTextOutput(getPosts());
    case "announcements":
      return ContentService.createTextOutput(retrieveAnnouncements());
    case "navbar":
      return ContentService.createTextOutput(getNavbar());
    case "upcomingEvents":
      return ContentService.createTextOutput(getUpcomingEvents());
    case "clubs":
      return ContentService.createTextOutput(getClubs());
    case "schedule":
      return ContentService.createTextOutput(getSchedule());
    case "retrieveEmail":
      return ContentService.createTextOutput(retrieveEmails());
    case "setEmail":
      setEmail(e.parameter);
    case "ping":
      incrementViews();
      statistics(e.parameter)
      return ContentService.createTextOutput("Increment successful!");
    default:
      return ContentService.createTextOutput("Error code: 404. Your request could not be processed. Please append either ?query=posts, ?query=announcements, ?query=upcomingEvents, ?query=navbar, or ?query=schedule&date=(insert date string here) at the end of /exec or /dev. For more information, contact the current Rancho ASB Webmaster. ©Rancho ASB " + new Date().getFullYear() + ".");
  }
}

function debug() {
  console.log(getPosts());
  console.log(getAnnouncements());
  console.log(getNavbar());
  console.log(getUpcomingEvents());
}
retrieveClubs();
retrievePosts();