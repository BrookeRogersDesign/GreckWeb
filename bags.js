// Loads the bag list from the "GRECK Bags" Google Sheet, then starts main.js.
// One row per bag: Code, Name, Series, Price, Status, Tag, Photos, Size, Details.
// If the sheet can't be reached (not shared yet, offline), main.js uses its built-in list.
// In Shopify this is replaced by real products.

const SHEET_ID = '1zLsxizGpKWMowr3R5y39eyk9WLWSR98rwMgEpVF1iiQ';
const SHEET_CSV = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function toBags(rows) {
  const [head, ...body] = rows;
  const col = (name) => head.findIndex((h) => h.trim().toLowerCase() === name);
  const at = (r, name) => (r[col(name)] || '').trim();
  return body
    .filter((r) => at(r, 'code') && at(r, 'name') && at(r, 'status').toLowerCase() !== 'hidden')
    .map((r) => ({
      slug: at(r, 'code').toLowerCase(),
      code: at(r, 'code'),
      name: at(r, 'name'),
      series: at(r, 'series'),
      price: Number(at(r, 'price').replace(/[^0-9.]/g, '')) || 0,
      sold: at(r, 'status').toLowerCase() === 'sold',
      tag: at(r, 'tag'),
      img: at(r, 'photos').split(',').map((s) => s.trim().replace(/\.jpe?g$/i, '')).filter(Boolean),
      size: at(r, 'size'),
      details: at(r, 'details'),
    }))
    .filter((b) => b.img.length);
}

function startSite() {
  const s = document.createElement('script');
  s.src = 'main.js?v=18';
  document.body.append(s);
}

const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000));
Promise.race([fetch(SHEET_CSV).then((r) => (r.ok ? r.text() : Promise.reject(r.status))), timeout])
  .then((text) => {
    const bags = toBags(parseCSV(text));
    if (bags.length) window.SHEET_BAGS = bags;
  })
  .catch(() => {})
  .finally(startSite);
