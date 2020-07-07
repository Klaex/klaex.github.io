firstNum = "";
operator = "";
secondNum = "";


function translateKeyCode(keyCode) {
    translations = {
        96: 0,
        97: 1,
        98: 2,
        99: 3,
        100: 4,
        101: 5,
        102: 6,
        103: 7,
        104: 8,
        105: 9,
        110: "C",
        13: "=",
        106: "*",
        111: "/",
        109: "-",
        107: "+",
    };

    return translations[keyCode];
}


function stringToTerm(s) {
    term = parseFloat(s);
    if (isNaN(term)) {
        term = 0;
    }
    return term;
}


function getOperationResult(firstTerm, operator, secondTerm) {
    firstTerm = stringToTerm(firstTerm)
    secondTerm = stringToTerm(secondTerm)

    console.log(typeof(firstTerm))
    console.log(typeof(secondTerm))

    switch (operator) {
        case "-":
            result = firstTerm - secondTerm;
            break;
        case "*":
            result = firstTerm * secondTerm;
            break;
        case "/":
            result = firstTerm / secondTerm;
            break;
        default:
        case "+":
            result = firstTerm + secondTerm;
            break;
    }

    resetCalculatorValues();
    if (result.toString().length > 7 && parseInt(result) != result) {
        result = result.toFixed(5)
    }
    firstNum = result.toString();
    return result;
}


function resetCalculatorValues() {
    firstNum = "";
    operator = "";
    secondNum = "";
}


function changeResultBox(firstTerm="", operator="", secondTerm="", result=NaN) {
    resultBox = document.getElementById("calculator-screen");
    if (isNaN(result)) {
        resultBox.innerHTML = `${firstTerm} ${operator} ${secondTerm}`
    } else {
        resultBox.innerHTML = `${result}`
    }
}


function operatorButtonPress(keyCode) {
    key = translateKeyCode(keyCode);
    
    if (key === "C") {
        changeResultBox();
        resetCalculatorValues();
    } 
    else if (key === "=") {
        result = getOperationResult(firstNum, operator, secondNum);
        changeResultBox(result=result);
    } 
    else if (["+", "-", "*", "/"].includes(key)) {
        if (secondNum === "") {
            operator = key
            changeResultBox(firstNum, operator, secondNum)
        } else {
            result = getOperationResult(firstNum, operator, secondNum);
            operator = key;
            changeResultBox(firstNum, operator, secondNum)
        }
    } 
    else {
        if (operator === "") {
            if (firstNum == "" && key == 0) {
                /* Silently reject leading zero */
            } else {
                firstNum += key
                changeResultBox(firstNum, operator, secondNum)
            }
        } else {
            if (secondNum == "" && key == 0) {
            } else {
                secondNum += key
                changeResultBox(firstNum, operator, secondNum)
            }
        }
    }
}


document.querySelectorAll(".op-button").forEach(function(button) {
    button.style.cursor = "pointer";
    button.addEventListener("click", () => {
        operatorButtonPress(button.getAttribute("keydata"))})
})