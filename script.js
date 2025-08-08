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

document.querySelector('[data-action="toggle-theme"]').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
