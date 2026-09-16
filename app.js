const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submitBtn');
const results = document.getElementById('results');
let jumble = [];

const MAX_LETTERS = 8;
userInput.maxLength = MAX_LETTERS;

function permute(letters) {
  if (letters.length <= 1) return [letters.join('')];

  const results = [];
  const seen = new Set();

  for (let i = 0; i < letters.length; i++) {
    if (seen.has(letters[i])) continue;
    seen.add(letters[i]);

    const remaining = [...letters.slice(0, i), ...letters.slice(i + 1)];
    for (const perm of permute(remaining)) {
      results.push(letters[i] + perm);
    }
  }
  return results;
}

const CHIPS_PER_PAGE = 300;

function renderResults(possibilities) {
  results.innerHTML = '';

  if (possibilities.length === 0) {
    results.textContent = 'Enter some letters to see possibilities.';
    return;
  }

  const count = document.createElement('p');
  count.id = 'resultsCount';
  count.textContent = `${possibilities.length} possibilities`;
  results.appendChild(count);

  const list = document.createElement('div');
  list.id = 'resultsList';
  results.appendChild(list);

  const seeMoreBtn = document.createElement('button');
  seeMoreBtn.id = 'seeMoreBtn';
  seeMoreBtn.textContent = 'See more results';

  let shown = 0;

  function showNextPage() {
    const nextWords = possibilities.slice(shown, shown + CHIPS_PER_PAGE);
    for (const word of nextWords) {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = word;
      list.appendChild(chip);
    }
    shown += nextWords.length;

    if (shown >= possibilities.length) {
      seeMoreBtn.remove();
    } else {
      seeMoreBtn.textContent = `See more results (${possibilities.length - shown} left)`;
    }
  }

  seeMoreBtn.addEventListener('click', showNextPage);
  showNextPage();

  if (shown < possibilities.length) {
    results.appendChild(seeMoreBtn);
  }
}

submitBtn.addEventListener('click', () => {
  const value = userInput.value.trim();

  if (value.length > MAX_LETTERS) {
    results.textContent = `Please enter ${MAX_LETTERS} letters or fewer.`;
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Solving...';

  setTimeout(() => {
    jumble = value.split('');
    const possibilities = permute(jumble);
    renderResults(possibilities);

    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
  }, 0);
});
