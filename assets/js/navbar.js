fetchSheetRows(SHEET_GIDS.navbar).then(rows => {
  let Data = rows.map(Row => ({
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
      ParentPaths.push([Row.ID]);
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
    };
  }

  function formatNavbar(ID, Subtree, isdropdown) {
    let Rows = Object.keys(Subtree);
    if (Rows.length == 0) {
      if (ID == 0) return "";
      let Row = IDs[ID];

      if (isdropdown) {
        if (ID == 3) return `<a class="dropdown-item" target="_blank" href="${Row.link}">${Row.name}</a>`;
        return `<a class="dropdown-item" target="_self" href="${Row.link}">${Row.name}</a>`;
      }
      if (ID == 3) return `<li class="nav-item"><a class="nav-link" target="_blank" href="${Row.link}">${Row.name}</a></li>`;
      return `<li class="nav-item"><a class="nav-link" target="_self" href="${Row.link}">${Row.name}</a></li>`;
    } else {
      if (ID == 0) {
        return Rows.map(Row => formatNavbar(Row, Subtree[Row], false)).join("");
      }
      if (isdropdown) {
        return `<a class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${IDs[ID].name}</a><ul class="dropdown-menu"><li class="dropdown-submenu">${Rows.map(Row => formatNavbar(Row, Subtree[Row], true)).join("")}</li></ul>`;
      }
      return `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${IDs[ID].name}</a><ul class="dropdown-menu"><li class="dropdown-submenu">${Rows.map(Row => formatNavbar(Row, Subtree[Row], true)).join("")}</li></ul></li>`;
    }
  }

  navbarhtml.outerHTML = `<div class="ms-auto"><ul class="navbar-nav navbar-nav-scroll" style="margin-right:1vw">${formatNavbar(0, Tree, false)}</ul></div>`;
});
