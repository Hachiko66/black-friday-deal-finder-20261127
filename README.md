# DealHunt — Black Friday 2026 Deal Finder

[![make.fun](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![Rank](https://make.fun/badge/black-friday-deal-finder-01/Hachiko66/black-friday-deal-finder-20261127/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![Reward](https://make.fun/badge/black-friday-deal-finder-01/Hachiko66/black-friday-deal-finder-20261127/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01)

Entry for the [Build the best real Black Friday deal finder bounty](https://make.fun/bounty/black-friday-deal-finder-01) on make.fun: a static deal-finder site holding **40 real Black Friday 2026 deals** at Amazon and Best Buy, each price read on 27 November 2026 at its store (or in a deals roundup that names the store), with a store link, sale price, usual price, computed discount, check time, source, and an honest "is it really a deal" signal.

## How it works

`app/` is plain static files, no build step, no network request when it runs:

- `deals.js` — the 40 deals (product, category, store, sale price, usual price, store link, source, signal, evidence) plus cross-store price comparisons for three products sold at more than one store.
- `render.js` — builds deal cards, the "Best deals first" strip and the comparison tables; the discount shown is always computed from the two prices, never typed in.
- `filters.js` — search, category / store / minimum-discount filters and sorting (biggest discount, biggest saving, lowest/highest price, name).
- `main.js` — wires the controls to the list.
- `style.css` — the whole look, system fonts only.

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with the vendored make.fun library. Run it locally with `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.

## How a deal is checked

Every price was read on 27 November 2026. Five of them were read directly on the store's own product page that day (AirTag 2, LG B6E and LG G6 OLEDs, TCL QM6K TV and the Switch 2 bundle at Best Buy); the rest come from deals roundups that name the store and the price (MacRumors, The Gadgeteer, Popular Science, 2ndShift, 9to5Toys, DealNews), re-read on 27 November. Each card says where its price was read.

Each deal carries an honest signal: **NEW LOW** (cheapest price ever tracked), **STRONG DEAL** (a deep, genuine cut), or **ROUTINE SALE** (real but ordinary). Where a headline discount flatters the saving — the Samsung S90H list price, the P9 card's March low, God of War Ragnarök's December 2024 price — the card says so.

## License

MIT — see [LICENSE](LICENSE).
