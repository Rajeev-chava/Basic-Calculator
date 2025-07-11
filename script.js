const display = document.getElementById('display');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const darkToggle = document.getElementById('darkToggle');

// Append value to display
function appendValue(value) {
  display.value += value;
}

// Clear display
function clearDisplay() {
  display.value = '';
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Evaluate expression and display result
function calculate() {
  try {
    const result = eval(display.value);
    const expression = display.value + ' = ' + result;
    display.value = result;
    addToHistory(expression);
  } catch {
    display.value = 'Error';
  }
}

// Add entry to history
function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.appendChild(li);
}

// Clear history
clearHistoryBtn.addEventListener('click', () => {
  historyList.innerHTML = '';
});

// Toggle dark mode
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (key.match(/[0-9+\-*/.]/)) {
    appendValue(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  } else if (key === 'Escape') {
    clearDisplay();
  } else {
    // Prevent typing invalid characters
    e.preventDefault();
  }
});
