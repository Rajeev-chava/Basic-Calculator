const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const toggle = document.getElementById("darkToggle");

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const result = eval(display.value);
    addToHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function addToHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li);
  if (historyList.children.length > 5) {
    historyList.removeChild(historyList.lastChild);
  }
}

toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  historyList.innerHTML = "";
});


// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key.match(/[0-9+\-*/.]/)) {
    appendValue(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});
