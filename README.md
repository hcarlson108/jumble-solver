# jumble-solver

A small static web app that takes a jumbled set of letters and generates every possible rearrangement.

## How it works

Enter up to 8 letters and click **Submit**. The app recursively generates every permutation of those letters and displays them as a scrollable list of results, paginated 300 at a time via a "See more results" button.

The 8-letter cap keeps things fast — the number of permutations grows factorially (`n!`), so longer inputs would freeze the page.

## Running locally

No build step or dependencies — just open `index.html` in a browser:

```
open index.html
```

## Project structure

- `index.html` — page markup
- `styles.css` — layout and styling
- `app.js` — permutation logic and UI wiring
