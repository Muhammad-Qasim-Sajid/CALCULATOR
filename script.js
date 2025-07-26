let input = document.querySelector(".input");
let output = document.querySelector(".output");
let buttons = document.querySelectorAll("button");

let storage = "";
let insertOpenBracket = true;

// do factorial logic
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

for (let button of buttons) {
    button.addEventListener("click", () => {

        let value = button.textContent;

        if (value === "=") {

            try {
                //close not closed brackets before calculating
                let tempStorage = storage;
                let openCount = (tempStorage.match(/\(/g) || []).length;
                let closeCount = (tempStorage.match(/\)/g) || []).length;
                let missingBrackets = openCount - closeCount;
                
                for (let i = 0; i < missingBrackets; i++) {
                    tempStorage += ")";
                }

                let jsExpression = tempStorage
                    .replace(/X/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/\^/g, '**')
                    .replace(/√\(/g, 'Math.sqrt(') 
                    .replace(/π/g, 'Math.PI')      
                    .replace(/sin\(/g, 'Math.sin(Math.PI/180*')
                    .replace(/cos\(/g, 'Math.cos(Math.PI/180*')
                    .replace(/tan\(/g, 'Math.tan(Math.PI/180*')
                    .replace(/log\(/g, 'Math.log10(');

                // factorial 
                jsExpression = jsExpression.replace(/(\d+)!/g, (_, num) => factorial(Number(num)));

                let result = eval(jsExpression);
                output.textContent = result;

            } catch {
                output.textContent = "ERROR";
            }

        } else if (value === "AC") {
            storage = "";
            input.value = "";
            output.textContent = "";

        } else if (value === "Del") {
            storage = storage.slice(0, -1);
            input.value = storage;

        } else if (value === "( )") {
            if (insertOpenBracket) {
                storage += "(";
            } else {
                storage += ")";
            }
            insertOpenBracket = !insertOpenBracket;
            input.value = storage;

        } else {
            let lastChar = storage[storage.length - 1];
            let isOperator = /[+\-X÷*/^]/;

            if (isOperator.test(lastChar) && isOperator.test(value)) {
                return;
            }

            //add brackets for functions
            if (value === "sin" || value === "cos" || value === "tan" || value === "log" || value === "√") {
                storage += value + "(";
                insertOpenBracket = false;
            } else {
                storage += value;
            }
            
            input.value = storage;
        }
    })
}

// Keyboard input
input.addEventListener("input", () => {
    storage = input.value;
})

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    
        try {
            
            let tempStorage = storage;
            let openCount = (tempStorage.match(/\(/g) || []).length;
            let closeCount = (tempStorage.match(/\)/g) || []).length;
            let missingBrackets = openCount - closeCount;
            
            for (let i = 0; i < missingBrackets; i++) {
                tempStorage += ")";
            }

            let jsExpression = tempStorage
                .replace(/X/g, '*')
                .replace(/÷/g, '/')
                .replace(/\^/g, '**')
                .replace(/√\(/g, 'Math.sqrt(') 
                .replace(/π/g, 'Math.PI')      
                .replace(/sin\(/g, 'Math.sin(Math.PI/180*')
                .replace(/cos\(/g, 'Math.cos(Math.PI/180*')
                .replace(/tan\(/g, 'Math.tan(Math.PI/180*')
                .replace(/log\(/g, 'Math.log10(');

            // factorial 
            jsExpression = jsExpression.replace(/(\d+)!/g, (_, num) => factorial(Number(num)));

            let result = eval(jsExpression);
            output.textContent = result;

        } catch {
            output.textContent = "ERROR";
        }
    }
})

input.addEventListener("keydown", (e) => {
    if(e.key === "Backspace"){
        e.preventDefault();
        storage = storage.slice(0, -1);
        input.value =storage;
    }
})

input.addEventListener("keydown", (e) => {
    if(e.key === "Delete"){
        e.preventDefault();
        storage = storage.slice(0, -1);
        input.value =storage;
    }
})

window.onload = () => {
  document.querySelector(".input").focus();
}