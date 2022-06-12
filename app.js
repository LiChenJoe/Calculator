class Calculator {
    constructor(preNum, curNum) {
        this.preNum = preNum;
        this.curNum = curNum;
        this.clear();
    }

    clear() {
        this.pre = "";
        this.cur = "";
        this.operator = "";
        this.saveOpe = "";
        this.savePre = "";
        this.saveContinue = "";
        this.saveContinueOperator = "";
    }

    addComma(str) {
        let parts = str.split('.');
        if (parts.includes(".")) {
            parts[0] = parts[0].replace(/\d(?=(?:\d{3})+\b\.)/g, ',');
        } else {
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return parts.join('.');
    }
    
    addNum(number) {

        if (number === ".") {
            if (this.cur === "") {
                this.cur = "0.";
            } else if (this.cur === "-" || this.cur === "-0") {
                this.cur = "-0.";
            } else if (this.cur.toString().includes(".")) {
                return
            }
        }
        if (this.pre !== "" && curNum.innerText == "-0") {
            this.cur = - number.toString();
            return;
        } else if (this.cur == "-" || this.cur == "-0") {
            this.cur = - number.toString();
            return;
        } else if (this.cur.toString().includes(".") && number === ".") {
            return
        }

        if (this.pre === "" && this.cur !== "" && this.operator === "-") {
            this.cur = - this.cur;
            this.operator = "";
        } else if (this.pre === this.cur && this.operator === undefined) {
            this.pre = "";
            this.cur = "";
        } else if (this.pre ==="" && this.cur ==="0" &&(this.operator === "*" ||this.operator === "/" )){
            this.pre = "";
            this.cur = number;
            return; 
        }
        this.cur = this.cur.toString() + number.toString();

    }



    pressOperate(operator) {
        if (this.operator === undefined) {
            this.operator = "";
        }
        //after adding first operator
        if (this.pre === "0" ||this.pre === ""){
            if ((this.cur === "" || this.cur === "0" ) && this.operator === "" && operator === "-") {
                this.cur = "-" + "0";
                return;
            } else if ((this.cur === "" || this.cur === "0" ) && this.operator === "" && (operator === "*" ||operator === "/" )){    
                this.cur = "0";
            } else if ((this.cur === "" || this.cur === "0" ) && this.operator === "" && operator === "+"){
                this.cur = "0";
            } else if (this.cur !== "") {
                this.cur = parseFloat(this.cur);
            } 
        } else {
             //after adding second number

        if (this.cur === "" && this.operator === "") {
            this.operator=operator;
            return;
        }
        if (this.cur !== "" && this.operator !== "") {

            this.saveContinue = parseFloat((this.cur));
            //aa+(bb*cc)
            if (operator === "*" || operator === "/") {
                if (this.operator === "*" || this.operator === "/") {
                    this.compute();
                } else if (this.operator === "-" || this.operator === "+") {
                    this.saveOpe = this.operator;
                    this.savePre = parseFloat((this.pre));
                }
            } else if (this.saveOpe !== "" && this.savePre !== "" && this.saveOpe != undefined && this.savePre != undefined) {
                this.compute();
                this.pre = parseFloat(this.savePre);
                this.saveContinueOperator = this.operator;
                this.operator = this.saveOpe;
                if (this.saveOpe === "-" && this.cur < 0) {
                    this.cur = parseFloat(Number(this.pre) + Math.abs(this.cur));
                } else {
                    this.compute();
                }
                this.saveOpe = 0;
                this.savePre = 0;
            } else if (preNum.innerText[preNum.innerText.length - 1] === "-" && (this.operator === "+") && this.cur < 0) {
                this.pre = Number(this.pre) + Number(this.cur);
                this.pre = parseFloat(this.pre);
                this.cur = "";
                this.operator = operator;
                return;
            } else {
                this.compute();
            }
            if ((this.saveOpe === "-" || this.saveOpe === "+") && (operator === "-" || operator === "+") && (this.operator === "*" || this.operator === "/")) {
                this.operator = this.saveOpe;
                this.pre = this.savePre;
                this.compute();
                this.saveOpe = 0;
                this.savePre = 0;
            }

        }
        if (this.cur === "" && isNaN(preNum.innerText[preNum.innerText.length - 1])) {
            if (preNum.innerText[preNum.innerText.length - 1] === "-" && (operator === "-" || this.operator === "-")) {
                this.operator = "+";
                operator = "";
                this.cur = "";
            } else if (preNum.innerText[preNum.innerText.length - 1] !== undefined && preNum.innerText[preNum.innerText.length - 1] !== "-" && operator === "-") {
                this.cur = "-";
                operator = "";
            } else {
                this.operator = operator;
                operator = "";
                this.cur = "";
            }
            return;
        }
        }
       
        // adding negative number after second sign
        if (this.cur === "" && this.operator !== "" && operator === "-") {
            this.cur = operator;
            return;
        }
        this.pre = this.cur;
        this.pre = parseFloat(this.pre);
        this.cur = "";
        if (operator !== undefined) {
            this.operator = operator;
        }
    }

    opeButtonDisplay(){
        if (this.pre === "") {
            //show the minus sign
            curNum.innerText = this.cur;
        } else if (this.pre !== "" && this.savePre !== undefined && this.saveOpe !== undefined && this.savePre !== "" && this.saveOpe !== "") {
            preNum.innerText = this.savePre + this.saveOpe + this.pre + this.operator;
            curNum.innerText = "";
        } else {
            preNum.innerText = this.pre + this.operator;
            curNum.innerText = this.cur;
        }
    }

    compute() {
        this.cur = parseFloat(eval(this.pre + this.operator + this.cur).toPrecision(12));
    }

    equalTo(){
        console.log("equal","this.pre",this.pre, "this.cur", this.cur, "preNum.innerText", preNum.innerText, "curNum.innerText", curNum.innerText );
        if (preNum.innerText === "" && curNum.innerText !== "" && this.operator !== "" && this.saveContinue !== "") {
            if (this.pre !== "") {
                this.result = this.pre;
            }
            if (this.saveContinueOperator === "") {
                this.saveContinueOperator = this.operator;
            }
            this.result = parseFloat(eval(this.result + this.saveContinueOperator + this.saveContinue).toPrecision(12));
            this.result = parseFloat(this.result);
            curNum.innerText = this.result;
            this.pre = "";
            this.cur = this.result;
            this.upDate();
            preNum.innerText = this.addComma(preNum.innerText);
            curNum.innerText = this.addComma(curNum.innerText);
            return;
        } else if (preNum.innerText === "" && curNum.innerText !== "" && this.operator === "" && this.saveContinue === "") {
            return;
        }
        console.log("equal_2","this.pre",this.pre, "this.cur", this.cur, "preNum.innerText", preNum.innerText, "curNum.innerText", curNum.innerText );
        this.pressOperate(this.operator);
        if (this.savePre !== undefined && this.saveOpe !== undefined && this.savePre !== "" && this.saveOpe !== "") {
            this.operator = this.saveOpe;
            this.pre = parseFloat(this.pre);
            this.cur = this.pre;
            this.pre = this.savePre;
            this.savePre = "";
            this.compute();
            this.pre = this.cur;
        }
        console.log("equal_3","this.pre",this.pre, "this.cur", this.cur, "preNum.innerText", preNum.innerText, "curNum.innerText", curNum.innerText );
        if (curNum.innerText !=="" && this.cur === "" && this.pre !== ""){
            this.operate = "";
            this.cur = this.pre;
            this.pre="";
        }
        console.log("equal_4","this.pre",this.pre, "this.cur", this.cur, "preNum.innerText", preNum.innerText, "curNum.innerText", curNum.innerText );
        preNum.innerText = "";
        curNum.innerText = parseFloat(this.cur);
        this.upDate();
        curNum.innerText = this.addComma(curNum.innerText);
        console.log("equal_5","this.pre",this.pre, "this.cur", this.cur, "preNum.innerText", preNum.innerText, "curNum.innerText", curNum.innerText );
    }

    delete() {
        if (curNum.innerText.includes(",")){
            curNum.innerText= curNum.innerText.replaceAll(",", "");
        } else if (curNum.innerText ==="" && this.operator=== ""&& preNum.innerText.includes(",")){
            preNum.innerText= preNum.innerText.replaceAll(",", "");
        }
        if (curNum.innerText !== "") {
            if (curNum.innerText[curNum.innerText.length - 1] !== ",") {
                this.cur = this.cur.toString().slice(0, -1);
            };
            curNum.innerText = curNum.innerText.toString().slice(0, -1);
        }
        curNum.innerText = this.addComma(curNum.innerText);
        this.upDate();
        console.log("delete","this.pre",this.pre, "this.cur", this.cur, "preNum.innerText", preNum.innerText, "curNum.innerText", curNum.innerText );
    }

    toggle() {
        console.log("this.pre", this.pre, "this.cur", this.cur,"curNum.innerText" , curNum.innerText, "preNum.innerText", preNum.innerText);
        curNum.classList.toggle("negative");
        
        if (this.cur > 0) {
            this.cur = -this.cur;
        } else if (this.cur < 0) {
            this.cur = Math.abs(Number(this.cur));
        } else if (curNum.innerText === "0"|| curNum.innerText === "-0") {
            if (curNum.classList.length > 1) {
                this.cur = "-0";
            } else {
                this.cur = 0;
            }
        }
        if (preNum.innerText[preNum.innerText.length - 1] === "-" && this.operator === "-") {
            this.operator = "+";
            opeButton.values = "";
            preNum.innerText = this.pre + this.operator;
            this.cur = Math.abs(Number(this.cur));
        } else if (preNum.innerText[preNum.innerText.length - 1] !== "-" && this.operator === "-") {
            this.cur = -this.cur;
        }
        curNum.innerText = this.cur;
        curNum.innerText = this.addComma(curNum.innerText);
        console.log("b","this.pre", this.pre, "this.cur", this.cur,"curNum.innerText" , curNum.innerText, "preNum.innerText", preNum.innerText)
    }

    upDate() {
        let curWidth = curNum.scrollWidth;
        let curParentWidth = curNum.parentElement.clientWidth - 20;
        let scalePercent = curParentWidth / curWidth;
        let size = 40;
        size *= scalePercent;
        if (size > 30) size = 30;
        curNum.style.fontSize = size + 'px';

        if (this.pre == "" && this.cur == "" && this.operator == "") {
            this.preNum.innerText = "";
            this.curNum.innerText = "0";
        }
        if (this.curNum.innerText.length < 12) {
            curNum.style.fontSize = "4rem";
            return;
        } else if (this.curNum.innerText.length < 14 && this.curNum.innerText.length > 11) {
            curNum.style.fontSize = "3rem";
            return;
        } else if (this.curNum.innerText.length > 13) {
            curNum.style.wordWrap = "break-word";
            preNum.style.wordWrap = "break-word";
            return;
        } else if (this.preNum.innerText.length > 13) {
            curNum.style.fontSize = "2.5rem";
            curNum.style.wordWrap = "break-word";
            preNum.style.wordWrap = "break-word";
        }
    }
}

const preNum = document.querySelector('[data-pre]');
const curNum = document.querySelector('[data-cur]');
const opeButton = document.querySelectorAll('[data-operator]');
const numButton = document.querySelectorAll('[data-num]');
const clear = document.querySelector('[data-clear]');
const dataDelete = document.querySelector('[data-delete]');
const dataToggle = document.querySelector('[data-toggle]');
const dataEqual = document.querySelector('[data-equal]');
const calculator = new Calculator(preNum, curNum);

numButton.forEach(num => {
    num.addEventListener("click", () => {
        calculator.addNum(num.value);
        curNum.innerText = calculator.cur;
        dataEqual.setAttribute("aria-pressed", "false");
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        dataEqual.setAttribute("aria-pressed", "false");
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
            if (numButton[j].value === num.innerText) {
                numButton[j].setAttribute("aria-pressed", "true");
            }
        }
        calculator.upDate();
        preNum.innerText = calculator.addComma(preNum.innerText);
        curNum.innerText = calculator.addComma(curNum.innerText);
    })
})

window.addEventListener("load", calculator.upDate());

opeButton.forEach(ope => {
    ope.addEventListener("click", () => {
            calculator.pressOperate(ope.value);
            calculator.opeButtonDisplay();
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
            if (opeButton[i].value === ope.value) {
                opeButton[i].setAttribute("aria-pressed", "true");
            }
        }
        dataEqual.setAttribute("aria-pressed", "false");
    })
    calculator.upDate();
    preNum.innerText = calculator.addComma(preNum.innerText);
    curNum.innerText = calculator.addComma(curNum.innerText);
})

dataEqual.addEventListener("click", () => {
    dataEqual.setAttribute("aria-pressed", "true");
    calculator.equalTo();
    for (let i = 0; i < 4; i++) {
        opeButton[i].setAttribute("aria-pressed", "false");
    }
    for (let j = 0; j < 11; j++) {
        numButton[j].setAttribute("aria-pressed", "false");
    }
})

clear.addEventListener("click", () => {
    calculator.clear();
    dataEqual.setAttribute("aria-pressed", "false");
    for (let i = 0; i < 4; i++) {
        opeButton[i].setAttribute("aria-pressed", "false");
    }
    for (let j = 0; j < 11; j++) {
        numButton[j].setAttribute("aria-pressed", "false");
    }
    calculator.upDate();
})

dataDelete.addEventListener("click", () => {
    calculator.delete();
    dataEqual.setAttribute("aria-pressed", "false");
    if (calculator.operator == "") {
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
    }
    calculator.upDate();
})

dataToggle.addEventListener("click", () => {
    calculator.toggle();
    calculator.upDate();
    dataEqual.setAttribute("aria-pressed", "false");
    for (let i = 0; i < 4; i++) {
        opeButton[i].setAttribute("aria-pressed", "false");
    }
    for (let j = 0; j < 11; j++) {
        numButton[j].setAttribute("aria-pressed", "false");
    }
    calculator.upDate();
})

window.addEventListener('keypress', (e) => {
    e.preventDefault();
    let keyBoardWord = String.fromCharCode(e.which);
    //鍵盤等於按鍵 keycode: 13
    if (e.which == 61 ||event.which == 13) {
        dataEqual.setAttribute("aria-pressed", "true");
        calculator.equalTo();
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
    } 
    else if (keyBoardWord > -1 && keyBoardWord < 11 && keyBoardWord != "\r") {
        calculator.addNum(keyBoardWord);
        curNum.innerText = calculator.cur;
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        dataEqual.setAttribute("aria-pressed", "false");
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
            if (numButton[j].value === keyBoardWord) {
                numButton[j].setAttribute("aria-pressed", "true");
            }
        }
        calculator.upDate();
        preNum.innerText = calculator.addComma(preNum.innerText);
        curNum.innerText = calculator.addComma(curNum.innerText);
    }
    else if (keyBoardWord == '.') {
        calculator.addNum(keyBoardWord);
        curNum.innerText = calculator.cur;
        dataEqual.setAttribute("aria-pressed", "false");
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
            if (numButton[j].value === keyBoardWord) {
                numButton[j].setAttribute("aria-pressed", "true");
            }
        }
    }
    else if (e.which == 42 || e.which == 43 || e.which == 45 || e.which == 47) {
        calculator.pressOperate(keyBoardWord);
        calculator.opeButtonDisplay();
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
        dataEqual.setAttribute("aria-pressed", "false");
        for (let i = 0; i < 4; i++) {
            if (opeButton[i].value === e.key) {
                opeButton[i].setAttribute("aria-pressed", "true");
            }
        }
        dataEqual.setAttribute("aria-pressed", "false");
        preNum.innerText = calculator.addComma(preNum.innerText);
        curNum.innerText = calculator.addComma(curNum.innerText);
    }
})

document.addEventListener('keyup', (e) => {
    if (e.keyCode === 27) {
        calculator.clear();
        dataEqual.setAttribute("aria-pressed", "false");
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
        calculator.upDate()
    } else if (e.keyCode === 8) {
        calculator.delete();
        dataEqual.setAttribute("aria-pressed", "false");
        if (calculator.operator == "") {
            for (let i = 0; i < 4; i++) {
                opeButton[i].setAttribute("aria-pressed", "false");
            }
            for (let j = 0; j < 11; j++) {
                numButton[j].setAttribute("aria-pressed", "false");
            }
        }
        calculator.upDate();
    }
})