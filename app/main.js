// main.js — page wiring for DealHunt.
// One job: connect the controls to the deal list. Data lives in deals.js,
// card HTML in render.js, filtering and sorting in filters.js.

import { DEALS, COMPARE, CHECKED_ON } from './deals.js';
import { cardHtml, bestStripHtml, compareHtml } from './render.js';
import { readControls, applyFilters } from './filters.js';

const grid = document.getElementById('grid');
const count = document.getElementById('count');
const best = document.getElementById('best-list');
const compare = document.getElementById('compare');
const empty = document.getElementById('empty');

function render() {
  const shown = applyFilters(DEALS, readControls(document));
  grid.innerHTML = shown.map(cardHtml).join('');
  count.textContent = shown.length + ' of ' + DEALS.length + ' deals';
  empty.hidden = shown.length !== 0;
}

best.innerHTML = bestStripHtml(DEALS);
compare.innerHTML = compareHtml(COMPARE);
document.getElementById('checked-line').textContent =
  'All ' + DEALS.length + ' prices checked ' + CHECKED_ON +
  ' — read on the store page or in a deals roundup that names the store. ' +
  'Discounts are computed from the two prices shown.';

['q', 'cat', 'store', 'minpct', 'sort'].forEach(function (id) {
  document.getElementById(id).addEventListener('input', render);
});

render();
