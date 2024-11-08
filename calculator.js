const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

var onDecimals = false;

let firstNumber;
let secondNumber;

let firstNumArray = [];
let secondNumArray = [];

let step = 0;
let operator;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    console.log("undefined");
  } else {
    return a / b;
  }
}

function percentage() {}

function operate(a, operator, b) {
  let result;
  if(b == NaN){
    result = a;
  }else{
    switch (operator) {
      case undefined:
        result = a;
        break;
      case "+":
        result = add(a, b);
        console.log(result)
        break;
      case "-":
        result = subtract(a, b);
        break;
      case "*":
        result = multiply(a, b);
        break;
      case "/":
        result = divide(a, b);
        break;
    }
  }
  console.log(result)
  display_output.innerHTML = result;
}

function updateDisplay() {
  if (step == 0 || step == 1) {
    let input = "";
    for(let i = 0; i<firstNumArray.length;i++){
      if(firstNumArray[0]=="." && i == 0)
        firstNumArray.unshift("0");
      input+=firstNumArray[i];
    }
    display_input.innerHTML = input;
  }
  if (step == 2) {
    let input = "";
    for(let i = 0; i<secondNumArray.length;i++){
      if(secondNumArray[0]=="." && i == 0)
        secondNumArray.unshift("0");
      input+=secondNumArray[i];
    }
    display_input.innerHTML = `${firstNumber}${operator}`+input;
  }
}

function clear() {
  step = 0;
  firstNumber = 0;
  secondNumber = 0;
  firstNumArray = [];
  secondNumArray = [];
}

let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      display_input.innerHTML = "";
      display_output.innerHTML = "";
      clear();
    } else if (value == "backspace") {
      if (step == 0 || step == 1) {
        firstNumArray.pop();
        firstNumber = Number(firstNumArray.join(""));
      } else if (step == 2) {
        secondNumArray.pop();
        secondNumber = Number(secondNumArray.join(""));
      }
      updateDisplay();
    } else if (value == "%") {
      if (step == 0 || step == 1) {
        //make it so it is changed inside the firstNumber array for calculation purposes
        firstNumber = firstNumber / 100;
      }
      if (step == 2) {
        secondNumber = secondNumber / 100;
      }
      updateDisplay();
    } else if (value == "=") {
      operate(firstNumber, operator, secondNumber);
      console.log(operate(firstNumber, operator, secondNumber));
      clear();
    } else if (value == "+" || value == "-" || value == "*" || value == "/") {
      operator = value;
      display_input.innerHTML = `${firstNumber}${operator}`;
      step = 2;
    } else {
      if (step == 0 || step == 1) {
        if (firstNumArray.indexOf(".") > -1 && value == ".") {
          console.log("error multiple decimals");
        } else {
          firstNumArray.push(value);
          firstNumber = Number(firstNumArray.join(""));
          step = 1;
        }
      } else if (step == 2) {
        if (secondNumArray.indexOf(".") > -1 && value == ".") {
          console.log("error multiple decimals");
        } else {
          secondNumArray.push(value);
          secondNumber = Number(secondNumArray.join(""));
        }
      }
      updateDisplay();
    }
  });
}
