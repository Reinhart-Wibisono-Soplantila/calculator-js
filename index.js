const displayHistory = document.querySelector(".display-history");
const display = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

let disNum1 = "";
let disNum2 = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText == "." && !haveDot){
            console.log(e.target.innerText);
            haveDot = true;
        } else if (e.target.innerText == "." && haveDot){
            return;
        }
        disNum2 += e.target.innerText;
        display.innerText = disNum2;
    })
})

operations.forEach((operation) => {
    operation.addEventListener('click', (e) => {
        if (!disNum2) return;
        haveDot = false;
        const operationName = e.target.innerText;

        if (disNum1 && disNum2 && lastOperation){
            mathOperation()
        } else {
            result = parseFloat(disNum2)
            console.log(result)
        }
        clearVar(operationName)
        lastOperation = operationName
    })
})

function clearVar(name=""){
    disNum1 += disNum2 + " " + name + " ";
    displayHistory.innerText = disNum1
    display.innerText="0"
    disNum2=""
    tempResult.innerText=result
}

function mathOperation() {
    if (lastOperation==="x"){
        result = parseFloat(result) * parseFloat(disNum2)
    }else if (lastOperation==="+"){
        result = parseFloat(result) + parseFloat(disNum2)
    } else if (lastOperation==="-"){
        result = parseFloat(result) - parseFloat(disNum2)
    } else if (lastOperation==="/"){
        result = parseFloat(result) / parseFloat(disNum2)
    } else if (lastOperation==="%"){
    result = parseFloat(result) % parseFloat(disNum2)
    }
}

equal.addEventListener('click', () => {
    if (!disNum1 || !disNum2) return;
    haveDot=false;
    mathOperation();
    clearVar();
    display.innerText=result;
    tempResult.innerText="0";
    disNum2=result;
    disNum1="";
})

clearAll.addEventListener("click", () => {
    disNum1= "";
    disNum2= "";
    haveDot = false
    display.innerText="0"
    displayHistory.innerText="0"
    tempResult.innerText="0"
    result=""
})

clearLast.addEventListener('click', () => {
    display.innerText="0"
    disNum2=""
})

window.addEventListener('keydown', (e) => {
    if  (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9"
    ){
        clickButton(e.key)
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%"){
        clickOperation(e.key);
    } else if(e.key === "*"){
        clickOperation("x")
    } else if (e.key === "Enter" || e.key === "="){
        clickEqual();
    } else if (e.key==="Backspace"){
        clickClear();
    }
})

function clickButton(key){
    numbers.forEach((button) => {
        if(button.innerText === key)
            button.click()
    })
}

function clickOperation(key){
    operations.forEach((operation) =>{
        if (operation.innerText === key){
            operation.click()
        }
    })
}

function clickEqual(){
    equal.click();
}

function clickClear(){
    clearAll.click()
}