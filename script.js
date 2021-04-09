const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is there.
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator pressed
  if (awaitingNextValue) return;
  // if no decimal, add one.
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Calculations depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) return;
  // Assign first vallue if there is no value.
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log(firstValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](firstValue, currentValue);
    console.log('calculation', calculation);
  }
  // Ready for next value, store operator.
  awaitingNextValue = true;
  operatorValue = operator;
}

// Add Event Listeners for numbers, operators, decimal buttons.

inputBtns.forEach((inputBtn) => {
  // If is number buttons because they don't have a class.
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// Reset all values, display
function resetAll() {
  calculatorDisplay.textContent = '0';
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
}

// Event Listener
clearBtn.addEventListener('click', resetAll);
