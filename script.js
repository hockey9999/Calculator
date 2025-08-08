const display = document.getElementById('display');
let firstOperand = null;
let operator = null;
let awaitingNext = false;

function calculate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (operator === '/') return b === 0 ? 'Error' : a / b;
  if (operator === '%') return (a / 100) * b;
  return b;
}

function updateDisplay(value) {
  display.textContent = value;
}

document.querySelector('.buttons').addEventListener('click', e => {
  const target = e.target;
  if (!target.matches('button')) return;
  if (target.dataset.number !== undefined) {
    if (awaitingNext) {
      updateDisplay(target.dataset.number);
      awaitingNext = false;
    } else {
      if (target.dataset.number === '.' && display.textContent.includes('.')) return;
      updateDisplay(display.textContent === '0' ? target.dataset.number : display.textContent + target.dataset.number);
    }
  }
  if (target.dataset.action) {
    const action = target.dataset.action;
    if (action === 'clear') {
      updateDisplay('0');
      firstOperand = null;
      operator = null;
      awaitingNext = false;
    } else if (action === 'delete') {
      const current = display.textContent.slice(0, -1) || '0';
      updateDisplay(current);
    } else if (action === '=') {
      if (operator === null || awaitingNext) return;
      const result = calculate(firstOperand, display.textContent, operator);
      updateDisplay(result);
      firstOperand = result;
      operator = null;
      awaitingNext = true;
    } else {
      if (firstOperand !== null && operator) {
        const result = calculate(firstOperand, display.textContent, operator);
        updateDisplay(result);
        firstOperand = result;
      } else {
        firstOperand = display.textContent;
      }
      operator = action;
      awaitingNext = true;
    }
  }
});

const themeToggleBtn = document.querySelector('[data-action="toggle-theme"]');

const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path></svg>';

function updateThemeIcon() {
  themeToggleBtn.innerHTML = document.body.classList.contains('dark') ? sunIcon : moonIcon;
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  updateThemeIcon();
});

updateThemeIcon();
