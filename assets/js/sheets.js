// Reads live content straight from the ASB Google Sheet, published to the web as CSV.
// This replaces the old Google Apps Script backend, whose deployment now requires
// visitors to be signed into a Google account (see CLAUDE.md for the full story).
const SHEET_PUBLISHED_ID = "2PACX-1vR4YxboOPOkllKdBb0-siG2QixLxaKJSGoZ9jn5mzQnpUKIGXlDFPC13gI-8NRiiLozlWFJBYDAdAAE";

const SHEET_GIDS = {
  posts: "208760621",
  announcements: "2129976551",
  navbar: "1925456971",
  upcomingEvents: "1028081535",
  clubs: "84412993",
  schedule: "1993123491",
};

function sheetCsvUrl(gid) {
  return `https://docs.google.com/spreadsheets/d/e/${SHEET_PUBLISHED_ID}/pub?gid=${gid}&single=true&output=csv`;
}

// Parses CSV text (as exported by Google Sheets, which quotes fields containing
// commas/quotes/newlines per RFC 4180) into an array of rows of string cells.
function parseCsv(text) {
  let rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\r") {
      // ignore; the following \n ends the line
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

// Fetches a sheet tab by gid and returns its data rows (header row dropped).
function fetchSheetRows(gid) {
  return fetch(sheetCsvUrl(gid)).then(response => response.text()).then(text => parseCsv(text).filter((_, i) => i));
}
