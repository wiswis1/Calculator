const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_ouput = document.querySelector(".display .output");

var onDecimals = false;

let firstNumber;
let secondNumber;

let firstNumArray = [];
let secondNumArray = [];


let step = 0;
let operator;

function add(a, b) {
  return a+b;
}

function subtract(a,b) {
  return a-b;
}

function multiply(a,b) {
  return a*b;
}

function divide(a,b) {
  if(b == 0){
    console.log("undefined");
  }else{
    return a/b;
  }
}

function percentage(){

}

function operate(a, operator, b) {
  let result;
  switch(operator){
    case "+": 
      result = add(a,b);
      break;
    case "-":
      result = subtract(a,b);
      break;    
    case "*":
      result = multiply(a,b);
      break;
    case "/":
      result = divide(a,b);
      break;

  
  }
  display_ouput.innerHTML = result;
}


let input ="";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      step = 0;
      firstNumber = 0;
      secondNumber = 0;
      firstNumArray = [];
      secondNumArray = [];

      display_input.innerHTML = "";
      display_ouput.innerHTML = "";
    } else if (value == "backspace") {
      if(step == 0 || step == 1){
        firstNumArray.pop();
        firstNumber = Number(firstNumArray.join(""));
        console.log(firstNumber)
      }else if (step == 2){
        secondNumArray.pop();
        secondNumber = Number(secondNumArray.join(""));
        console.log(secondNumber)
      }
      display_input.innerHTML = input;
    } else if (value == "=") {
      operate(firstNumber, operator, secondNumber);
    }else if( value == "+" ||  value == "-" || value == "*" || value == "/" ){
      operator = value;
      step = 2;
    }
      // else if (value == "brackets") {
    //   if (
    //     input.indexOf("(") == -1 ||
    //     (input.indexOf("(") != -1 &&
    //       input.indexOf(")") != -1 &&
    //       input.lastIndexOf("(") < input.lastIndexOf(")"))
    //   ) {
    //     input += "(";
    //   } else if (
    //     (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
    //     (input.indexOf("(") != -1 &&
    //       input.indexOf(")") != -1 &&
    //       input.lastIndexOf("(") > input.lastIndexOf(")"))
    //   ) {
    //     input += ")";
    //   }

    //   display_input.innerHTML = input;}
     else {
      if(step == 0 || step == 1){
        if (firstNumArray.indexOf(".") > -1 && value == "."){
          console.log("error multiple decimals")
        }else{
          firstNumArray.push(value);
          firstNumber = Number(firstNumArray.join(""));
        }
        step = 1

        console.log(firstNumber) 
      }else if(step == 2){
        if (secondNumArray.indexOf(".") > -1 && value == "."){
          console.log("error multiple decimals")
        }else{
          secondNumArray.push(value);
          secondNumber = Number(secondNumArray.join(""));
        }
        console.log(secondNumber);
      }
      // display_input.innerHTML = input;
      // console.log(input);
    }
  });
}
