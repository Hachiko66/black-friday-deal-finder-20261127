// render.js — turns deal objects into cards and fills the page sections.
// One job: DOM building and money formatting. Filtering and sorting live
// in filters.js; this file never decides which deals to show.

export function money(n) {
  return '$' + n.toFixed(2).replace(/\.00$/, '');
}

export function discountPct(deal) {
  return Math.round((1 - deal.sale / deal.usual) * 100);
}

export function signalLabel(sig) {
  if (sig === 'new-low') return 'NEW LOW';
  if (sig === 'strong') return 'STRONG DEAL';
  return 'ROUTINE SALE';
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function cardHtml(deal) {
  const pct = discountPct(deal);
  const saved = money(deal.usual - deal.sale);
  return (
    '<article class="card" data-cat="' + esc(deal.cat) + '">' +
    '<div class="card-top"><span class="tag">' + esc(deal.cat) + '</span>' +
    '<span class="sig sig-' + deal.sig + '">' + signalLabel(deal.sig) + '</span></div>' +
    '<h3>' + esc(deal.name) + '</h3>' +
    '<p class="store">' + esc(deal.store) + '</p>' +
    '<p class="prices"><span class="sale">' + money(deal.sale) + '</span>' +
    '<span class="usual">' + money(deal.usual) + '</span>' +
    '<span class="pct">-' + pct + '%</span></p>' +
    '<p class="save">You save ' + saved + '</p>' +
    '<p class="ev">' + esc(deal.ev) + '</p>' +
    '<p class="meta">Checked ' + esc(deal.checked || '27 Nov 2026') +
    ' &middot; Source: ' + esc(deal.src) + '</p>' +
    '<a class="buy" href="' + esc(deal.url) + '" target="_blank" rel="noopener">View at ' +
    esc(deal.store) + ' &rarr;</a>' +
    '</article>'
  );
}

// The "best deals" strip: the five biggest discounts, in order.
export function bestStripHtml(deals) {
  const top = deals.slice().sort((a, b) => discountPct(b) - discountPct(a)).slice(0, 5);
  return top.map(function (d, i) {
    return '<li><span class="rank">' + (i + 1) + '</span><span class="bname">' +
      esc(d.name) + '</span><span class="bpct">-' + discountPct(d) + '%</span>' +
      '<span class="bprice">' + money(d.sale) + ' <s>' + money(d.usual) + '</s></span></li>';
  }).join('');
}

// The cross-store comparison table: same product, price at each store.
export function compareHtml(rows) {
  return rows.map(function (group) {
    const lines = group.rows.map(function (r) {
      return '<tr><td>' + esc(r.store) + '</td><td class="num">' + money(r.price) +
        '</td><td>' + esc(r.note) + '</td></tr>';
    }).join('');
    return '<div class="compare-group"><h3>' + esc(group.name) + '</h3>' +
      '<table><thead><tr><th>Store</th><th>Price</th><th>Note</th></tr></thead>' +
      '<tbody>' + lines + '</tbody></table></div>';
  }).join('');
}
