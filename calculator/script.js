const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

 //Calculate first and second values depending on operator
 const calculate = {
 '/':(firstNumber,secondNumber) => firstNumber / secondNumber,

 '*':(firstNumber,secondNumber) => firstNumber * secondNumber,

 '-':(firstNumber,secondNumber) => firstNumber - secondNumber,

  '+':(firstNumber,secondNumber) => firstNumber + secondNumber,

 '=':(firstNumber,secondNumber) => secondNumber,

 }

function sendNumberValue(number){
 //Replace current display value if first value entered
 if(awaitingNextValue){
 	calculatorDisplay.textContent = number;
 	awaitingNextValue = false;
 }else{
    //if current display value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;    
  }
}


function addDecimal(){
  //if operator pressed dont add decimal
  if(awaitingNextValue) return;
  //if no decimal add one 	
  if(!calculatorDisplay.textContent.includes('.')){
  	calculatorDisplay.textContent =  `${calculatorDisplay.textContent}.`;
    }
  }


function useOperator(operator){
  const currentValue = Number(calculatorDisplay.textContent);
  //prevent multiple operators
  if(operatorValue && awaitingNextValue){ 
    operatorValue = operator;
  	return;
  }
   //assign firstValue
   if(!firstValue){
   	firstValue = currentValue;
   }else{
   	  const calculation = calculate[operatorValue](firstValue,currentValue);
      calculatorDisplay.textContent = calculation;
      firstValue = calculation;
   }
   //ready for next value
   awaitingNextValue = true;
   operatorValue = operator;
 
}


//reset display
function resetAll(){
	calculatorDisplay.textContent = '0';
	firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}


//Event Listener
clearBtn.addEventListener('click', resetAll);

inputBtns.forEach(btn => {
 if(btn.classList.length === 0){	
	btn.addEventListener('click', () => sendNumberValue(btn.value));
  } else if(btn.classList.contains('operator')){
   btn.addEventListener('click', () => useOperator(btn.value));
  } else if(btn.classList.contains('decimal')){
   btn.addEventListener('click', () => addDecimal());
  }
});