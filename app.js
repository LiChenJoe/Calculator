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
        preNum.innerText = "";
        curNum.innerText = "";
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
        }
        this.cur = this.cur.toString() + number.toString();

    }



    pressOperate(operator) {
        //after adding first operator
        if (this.cur === "" && this.operator === "" && operator === "-") {
            this.cur = "-" + "0";
            return;
        } else if(this.cur === "" && this.operator === "" &&this.pre !== ""){
            this.operator = operator; 
            return ;
        }else if (this.cur !== "") {
            this.cur = parseFloat(this.cur);
        }

        //after adding second number
        if (this.pre !== "" && this.cur !== "" && this.operator !== "") {

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
                this.saveOpe = undefined;
                this.savePre = undefined;
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
                this.saveOpe = undefined;
                this.savePre = undefined;
            }

        }
        if (this.pre !== "" && this.cur === "" && isNaN(preNum.innerText[preNum.innerText.length - 1])) {
            console.log("hello");
            this.pre = this.pre;
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

    compute() {
        this.cur = parseFloat(eval(this.pre + this.operator + this.cur).toPrecision(12));
    }

    equalTo(){
        if (preNum.innerText === "" && curNum.innerText !== "" && calculator.operator !== "" && calculator.saveContinue !== "") {
            if (calculator.pre !== "") {
                calculator.result = calculator.pre;
            }
            if (calculator.saveContinueOperator === "") {
                calculator.saveContinueOperator = calculator.operator;
            }
            calculator.result = parseFloat(eval(calculator.result + calculator.saveContinueOperator + calculator.saveContinue).toPrecision(12));
            calculator.result = parseFloat(calculator.result);
            curNum.innerText = calculator.result;
            calculator.pre = "";
            calculator.cur = calculator.result;
            calculator.upDate();
            preNum.innerText = calculator.addComma(preNum.innerText);
            curNum.innerText = calculator.addComma(curNum.innerText);
            return;
        } else if (preNum.innerText === "" && curNum.innerText !== "" && calculator.operator === "" && calculator.saveContinue === "") {
            return;
        }
    
        calculator.pressOperate();
        if (calculator.savePre !== undefined && calculator.saveOpe !== undefined && calculator.savePre !== "" && calculator.saveOpe !== "") {
            calculator.operator = calculator.saveOpe;
            calculator.pre = parseFloat(calculator.pre);
            calculator.cur = calculator.pre;
            calculator.pre = calculator.savePre;
            calculator.compute();
            calculator.pre = calculator.cur;
        }
        preNum.innerText = "";
        curNum.innerText = parseFloat(calculator.pre);
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
        dataEqual.setAttribute("aria-pressed", "true");
        calculator.upDate();
        preNum.innerText = calculator.addComma(preNum.innerText);
        curNum.innerText = calculator.addComma(curNum.innerText);
    }

    delete() {
        if (curNum.innerText.includes(",")){
            console.log("ff");
            curNum.innerText= curNum.innerText.replaceAll(",", "");
        } else if (curNum.innerText ==="" && this.operator=== ""&& preNum.innerText.includes(",")){
            preNum.innerText= preNum.innerText.replaceAll(",", "");
        }
        console.log(this.operator);
        if (curNum.innerText !== "") {
            if (curNum.innerText[curNum.innerText.length - 1] !== ",") {
                this.cur = this.cur.toString().slice(0, -1);
            }
            curNum.innerText = curNum.innerText.toString().slice(0, -1);
        } else if (curNum.innerText == "" && preNum.innerText !== "") {
            if (preNum.innerText !== Number(preNum.innerText)){
                this.operator="";
            }
            preNum.innerText = preNum.innerText.slice(0, -1);
        } 
        curNum.innerText = calculator.addComma(curNum.innerText);
        preNum.innerText = calculator.addComma(preNum.innerText);
        console.log("this.cur", this.cur, "this.pre", this.pre)
        calculator.upDate();
    }
    toggle() {
        curNum.classList.toggle("negative");
        if (this.cur > 0) {
            this.cur = -this.cur;
        } else if (this.cur < 0) {
            this.cur = Math.abs(Number(this.cur));
        } else if (curNum.innerText === "0") {
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
        if (calculator.operator === undefined) {
            calculator.operator = "";
        }
        calculator.pressOperate(ope.value);
        if (calculator.pre === "") {
            //show the minus sign
            curNum.innerText = calculator.cur;
        } else if (calculator.pre !== "" && calculator.savePre !== undefined && calculator.saveOpe !== undefined && calculator.savePre !== "" && calculator.saveOpe !== "") {
            preNum.innerText = calculator.savePre + calculator.saveOpe + calculator.pre + calculator.operator;
            curNum.innerText = "";
        } else {
            preNum.innerText = calculator.pre + calculator.operator;
            curNum.innerText = calculator.cur;
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
        dataEqual.setAttribute("aria-pressed", "false");
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
            if (opeButton[i].value === ope.value) {
                opeButton[i].setAttribute("aria-pressed", "true");
            }
        }
    })
    calculator.upDate();
    preNum.innerText = calculator.addComma(preNum.innerText);
    curNum.innerText = calculator.addComma(curNum.innerText);
})

//螢幕等於按鍵
dataEqual.addEventListener("click", () => {
    calculator.equalTo();
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
    let keyBoardWord = String.fromCharCode(e.which);
    //鍵盤等於按鍵
    if (e.which == 61||e.which == 13) {
        calculator.equalTo();
    } else if (keyBoardWord > -1 && keyBoardWord < 11 && keyBoardWord != "\r") {
        calculator.addNum(keyBoardWord);
        curNum.innerText = calculator.cur;
        dataEqual.setAttribute("aria-pressed", "false");
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
        if (calculator.operator === undefined) {
            calculator.operator = "";
        }
        calculator.pressOperate(keyBoardWord);
        if (calculator.pre === "") {
            //show the minus sign
            curNum.innerText = calculator.cur;
        } else if (calculator.pre !== "" && calculator.savePre !== undefined && calculator.saveOpe !== undefined && calculator.savePre !== "" && calculator.saveOpe !== "") {
            preNum.innerText = calculator.savePre + calculator.saveOpe + calculator.pre + calculator.operator;
            curNum.innerText = "";
        } else {
            preNum.innerText = calculator.pre + calculator.operator;
            curNum.innerText = calculator.cur;
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
        dataEqual.setAttribute("aria-pressed", "false");
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
            if (opeButton[i].value === e.key) {
                opeButton[i].setAttribute("aria-pressed", "true");
            }
        }
        preNum.innerText = calculator.addComma(preNum.innerText);
        curNum.innerText = calculator.addComma(curNum.innerText);
    }
})

const log = document.getElementById('log');
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