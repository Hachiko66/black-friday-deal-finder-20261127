// filters.js — search, filter and sort for the deal list.
// One job: given the full deal list and the current control values,
// return the deals to show, in display order. It never touches the DOM.

import { discountPct } from './render.js';

export function readControls(doc) {
  return {
    q: doc.getElementById('q').value.trim().toLowerCase(),
    cat: doc.getElementById('cat').value,
    store: doc.getElementById('store').value,
    minPct: Number(doc.getElementById('minpct').value),
    sort: doc.getElementById('sort').value,
  };
}

export function applyFilters(deals, c) {
  let out = deals.filter(function (d) {
    if (c.cat !== 'all' && d.cat !== c.cat) return false;
    if (c.store !== 'all' && d.store !== c.store) return false;
    if (discountPct(d) < c.minPct) return false;
    if (c.q && (d.name + ' ' + d.store + ' ' + d.cat).toLowerCase().indexOf(c.q) === -1) return false;
    return true;
  });
  if (c.sort === 'pct') out.sort((a, b) => discountPct(b) - discountPct(a));
  else if (c.sort === 'low') out.sort((a, b) => a.sale - b.sale);
  else if (c.sort === 'high') out.sort((a, b) => b.sale - a.sale);
  else if (c.sort === 'name') out.sort((a, b) => a.name.localeCompare(b.name));
  else if (c.sort === 'save') out.sort((a, b) => (b.usual - b.sale) - (a.usual - a.sale));
  return out;
}
