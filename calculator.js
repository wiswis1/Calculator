const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");


const display_firstNum = document.querySelector(".input .firstNumber");
const display_operator = document.querySelector(".input .operator");
const display_secondNum = document.querySelector(".input .secondNumber");




const display_output = document.querySelector(".display .output");



var onDecimals = false;

let firstNumber;
let secondNumber;
let input = "";


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
  if(!b){
    result = a; 
  }else{
    switch (operator) {
      case undefined:
        result = a;
        break;
      case "+":
        result = add(a, b);
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

  if(typeof result === "number" && !Number.isInteger(result)){
    result = parseFloat(result.toFixed(6));
  }
  display_output.innerHTML = result;
}


function reset() {
  step = 0;
  display_firstNum.innerHTML = "";
  display_operator.innerHTML = "";
  display_secondNum.innerHTML = "";
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  firstNumArray = [];
  secondNumArray = [];
}


for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      display_output.innerHTML = "";
      reset();

    console.log("has reset");
    } 
    
    else if (value == "backspace") {
      if (step == 0 || step == 1) {
        firstNumArray.pop();
        firstNumber = Number(firstNumArray.join(""));
      } else if (step == 2) {
        secondNumArray.pop();
        secondNumber = Number(secondNumArray.join(""));
        console.log(secondNumber);
      }

    } 
    
    else if (value == "%") {
      if (step == 0 || step == 1) {
        firstNumber = firstNumber / 100;
      }
      if (step == 2) {
        secondNumber = secondNumber / 100;
      }
    } 
    
    else if (value == "=") {
      operate(firstNumber, operator, secondNumber);
      reset();
    } 
    
    else if (value == "+" || value == "-" || value == "*" || value == "/") {
      operator = value;
      display_operator.innerHTML = value;
      step = 2;
    } 

    else if (value == "sign"){

    }
  
    
    else {
      if (step == 0 || step == 1) {
        if (firstNumArray.indexOf(".") > -1 && value == ".") {
          console.log("error multiple decimals");
        } else {
          firstNumArray.push(value);
          let numStr = firstNumArray.join("");
          if (numStr.startsWith(".")) numStr = "0" + numStr; // Handle leading decimal
          firstNumber = Number(numStr); 
          display_firstNum.innerHTML = firstNumber;
          step = 1;
        }
      } else if (step == 2) {
        if (secondNumArray.indexOf(".") > -1 && value == ".") {
          console.log("error multiple decimals");
        } else {
          secondNumArray.push(value);
          let numStr = secondNumArray.join("");
          if (numStr.startsWith(".")) numStr = "0" + numStr; // Handle leading decimal
          secondNumber = Number(numStr);
          display_secondNum.innerHTML = secondNumber;
        }
      }
      updateDisplay();
    }
  });
}
