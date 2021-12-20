

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

    addNum(number) {

        console.log(this.pre, this.cur, this.operator === undefined);

        if (number === ".") {
            console.log(this.pre, this.cur);
            if (this.cur === "") {
                this.cur = "0.";
                console.log("aa");
            } else if (this.cur === "-" || this.cur === "-0") {
                this.cur = "-0.";
                console.log("aa", this.cur);
            } else if (this.cur.includes(".")) {
                console.log("ojo");
                return
            }
            console.log(this.pre, this.cur);
        }
        console.log(this.cur.includes("."));
        if (this.pre !== "" && curNum.innerText == "-0") {
            console.log("aa");
            this.cur = - number.toString();
            return;
        } else if (this.cur == "-" || this.cur == "-0") {
            this.cur = - number.toString();
            console.log("aa", this.cur, this.pre);
            return;
        } else if (this.cur.includes(".") && number === ".") {
            return
        }

        console.log(this.pre, this.cur);
        if (this.pre === "" && this.cur !== "" && this.operator === "-") {

            this.cur = - this.cur;

            this.operator = "";
        } else if (this.pre === this.cur && this.operator === undefined) {
            this.pre = "";
            this.cur = "";
        }

        this.cur = this.cur.toString() + number.toString();
        console.log("aa", this.cur, this.pre);

    }



    pressOperate(operator) {
        console.log(this.pre, this.cur);
        console.log(operator, operator === "-", "this.operator", this.operator, "operator ", operator);

        //after adding first operator
        if (this.cur === "" && this.operator === "" && operator === "-") {
            this.cur = "-" + "0";
            return;
        } else if (this.cur !== "") {
            this.cur = parseFloat(this.cur);
        }

        //after adding second number
        if (this.pre !== "" && this.cur !== "" && this.operator !== "") {

            console.log(this.cur, this.saveOpe, operator);
            console.log(this.pre, this.operator, this.saveOpe, this.savePre, this.saveOpe != undefined && this.savePre != undefined);
            console.log(" this.cur ", this.cur, "this.operator", this.operator, " this.pre ", this.pre, "operator", operator);
            this.saveContinue = this.cur;
            //aa+(bb*cc)
            if (operator === "*" || operator === "/") {
                if (this.operator === "*" || this.operator === "/") {
                    this.compute();
                } else if (this.operator === "-" || this.operator === "+") {
                    this.saveOpe = this.operator;
                    this.savePre = this.pre;
                    this.savePre = parseFloat(this.savePre);
                }
            } else if (this.saveOpe !== "" && this.savePre !== "" && this.saveOpe != undefined && this.savePre != undefined) {
                console.log(" this.cur ", this.cur, "this.operator", this.operator);
                console.log(" this.cur ", this.cur, "this.operator", this.operator);
                console.log(this.pre, this.operator, this.saveOpe, this.saveContinue);
                this.compute();
                console.log(" this.cur ", this.cur, "this.operator", this.operator);
                this.pre = this.savePre;
                this.saveContinueOperator = this.operator;
                this.operator = this.saveOpe;
                if (this.saveOpe === "-" && this.cur < 0) {
                    this.pre = parseFloat(this.pre);
                    this.cur = parseFloat(this.cur);
                    this.cur = Number(this.pre) + Math.abs(this.cur);
                } else {
                    this.compute();
                }
                console.log(this.cur);
                this.saveOpe = undefined;
                this.savePre = undefined;
                console.log("herehere");
            } else if (preNum.innerText[preNum.innerText.length - 1] === "-" && (this.operator === "+") && this.cur < 0) {
                this.pre = parseFloat(this.pre);
                this.cur = parseFloat(this.cur);
                this.pre = Number(this.pre) + Number(this.cur);
                this.cur = "";
                this.operator = operator;
                return;
            } else {
                console.log(" YA");
                console.log(" this.cur ", this.cur, "this.operator", this.operator);
                this.compute();
            }
            console.log(" this.cur ", this.cur, "this.operator", this.operator);

            console.log((this.saveOpe === "-" || this.saveOpe === "+"), (operator === "-" || operator === "+"), (this.operator === "*" || this.operator === "/"))
            if ((this.saveOpe === "-" || this.saveOpe === "+") && (operator === "-" || operator === "+") && (this.operator === "*" || this.operator === "/")) {
                console.log("ys");
                this.operator = this.saveOpe;
                this.pre = this.savePre;
                this.compute();
                this.saveOpe = undefined;
                this.savePre = undefined;
            }

        }
        console.log(this.operator, preNum.innerText.length, this.cur === "", preNum.innerText[preNum.innerText.length - 1]);
        if (this.pre !== "" && this.cur === "" && isNaN(preNum.innerText[preNum.innerText.length - 1])) {
            this.pre = this.pre;
            if (preNum.innerText[preNum.innerText.length - 1] === "-" && (operator === "-" || this.operator === "-")) {
                this.operator = "+";
                operator = "";
                this.cur = "";
                console.log("in");
            } else if (preNum.innerText[preNum.innerText.length - 1] !== undefined && preNum.innerText[preNum.innerText.length - 1] !== "-" && operator === "-") {
                this.cur = "-";
                operator = "";
                console.log("in 2", this.operator, operator);
            } else {
                console.log("in 4", this.operator, operator);
                this.operator = operator;
                console.log("in 3", this.operator, operator);
                operator = "";
                this.cur = "";
                console.log("in 2", this.operator, operator);
            }
            console.log("in change", this.operator, operator);

            return;
        }
        console.log(this.operator);
        // adding negative number after second sign
        if (this.cur === "" && this.operator !== "" && operator === "-") {
            console.log(" this.cur ", this.cur, "this.operator", this.operator, " this.pre ", this.pre, "operator", operator);
            this.cur = operator;
            console.log(this.operator);
            return;
        }
        console.log(" this.cur ", this.cur, "this.operator", this.operator, " this.pre ", this.pre, "operator", operator);
        this.pre = this.cur;
        this.cur = "";
        if (operator !== undefined) {
            this.operator = operator;
        }
        console.log(" this.cur ", this.cur, "this.operator", this.operator, " this.pre ", this.pre, "operator", operator);
    }

    compute() {
        console.log(this.cur, this.saveContinue);
        this.pre = parseFloat(this.pre);
        this.cur = parseFloat(this.cur);
        this.cur = eval(this.pre + this.operator + this.cur);
        console.log(this.cur, this.saveContinue);
        console.log(calculator.saveContinueOperator, calculator.saveContinue);
        this.cur = parseFloat(this.cur);
        console.log(this.cur, this.pre, this.operator);
        console.log(calculator.saveContinueOperator, calculator.saveContinue);

    }

    delete() {
        if (curNum.innerText !== "" && this.cur === "" && curNum.innerText !== "") {
            this.pre = this.pre.toString().slice(0, -1);
            curNum.innerText = curNum.innerText.toString().slice(0, -1);
            console.log(this.cur, curNum.innerText);
        } else if (curNum.innerText !== "") {
            this.cur = this.cur.toString().slice(0, -1);
            console.log(this.cur, curNum.innerText);
            curNum.innerText = curNum.innerText.toString().slice(0, -1);
            console.log(this.cur, curNum.innerText, !isNaN(Number(curNum.innerText)), Number(curNum.innerText));
        }

        if (curNum.innerText === "") {
            this.clear();
        }
    }

    toggle() {
        console.log(this.cur);
        curNum.classList.toggle("negative");
        console.log(this.cur);
        if (this.cur > 0) {
            this.cur = -this.cur;
        } else if (this.cur < 0) {
            this.cur = Math.abs(Number(this.cur));
        } else if (curNum.innerText === "0") {
            console.log("dod");
            if (curNum.classList.length > 1) {
                this.cur = "-0";
            } else {
                this.cur = 0;
            }
        }
        console.log(this.operator);
        if (preNum.innerText[preNum.innerText.length - 1] === "-" && this.operator === "-") {
            this.operator = "+";
            opeButton.values = "";
            preNum.innerText = this.pre + this.operator;
            this.cur = Math.abs(Number(this.cur));
            console.log("in here ");
        } else if (preNum.innerText[preNum.innerText.length - 1] !== "-" && this.operator === "-") {
            this.cur = -this.cur;
        }
        console.log(this.cur);
        curNum.innerText = this.cur;
    }

    upDate() {
        if (this.pre == "" && this.cur == "" && this.operator == "") {
            this.preNum.innerText = "";
            this.curNum.innerText = "0";
        }
        if (this.preNum.innerText.length > 3) {
            this.preNum.innerText = this.preNum.innerText.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            console.log("ioe");
        } else if (this.curNum.innerText.length > 3) {
            this.curNum.innerText = this.curNum.innerText.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            console.log("joe");
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
        console.log(" curNum.innerText ", curNum.innerText, "num.innerText", num.innerText);
        calculator.addNum(num.value);
        curNum.innerText = calculator.cur;
        console.log(" curNum.innerText ", curNum.innerText, "num.innerText", num.innerText);
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
    })
})

window.addEventListener("load", calculator.upDate());

opeButton.forEach(ope => {
    ope.addEventListener("click", () => {
        if (calculator.operator === undefined) {
            calculator.operator = "";
        }
        calculator.pressOperate(ope.value);
        console.log("calculator.savePre ", calculator.savePre, "calculator.saveOpe ", calculator.saveOpe, "calculator.pre ", calculator.pre);
        if (calculator.pre === "") {
            //show the minus sign
            curNum.innerText = calculator.cur;
            console.log("b");
        } else if (calculator.pre !== "" && calculator.savePre !== undefined && calculator.saveOpe !== undefined && calculator.savePre !== "" && calculator.saveOpe !== "") {
            preNum.innerText = calculator.savePre + calculator.saveOpe + calculator.pre + calculator.operator;
            curNum.innerText = "";
            console.log("a");
        } else {
            preNum.innerText = calculator.pre + calculator.operator;
            curNum.innerText = calculator.cur;
            console.log("c");
        }
        console.log("calculator.savePre ", calculator.savePre, "calculator.saveOpe ", calculator.saveOpe, "calculator.operator ", calculator.operator);
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
    calculator.upDate()
})

dataEqual.addEventListener("click", () => {
    console.log(calculator.pre, calculator.result, calculator.saveContinueOperator, calculator.operator, calculator.saveContinue);
    if (preNum.innerText === "" && curNum.innerText !== "" && calculator.operator !== "" && calculator.saveContinue !== "") {
        if (calculator.pre !== "") {
            calculator.result = calculator.pre;
        }
        if (calculator.saveContinueOperator === "") {
            calculator.saveContinueOperator = calculator.operator;
        }
        calculator.result = parseFloat(calculator.result);
        calculator.result = eval(calculator.result + calculator.saveContinueOperator + calculator.saveContinue);
        curNum.innerText = calculator.result;
        calculator.pre = "";
        console.log("test");
        calculator.cur = calculator.result;
        calculator.upDate();
        return;
    } else if (preNum.innerText === "" && curNum.innerText !== "" && calculator.operator === "" && calculator.saveContinue === "") {
        return;
    }

    calculator.pressOperate();
    console.log(calculator.operator, calculator.pre, calculator.cur);
    console.log(calculator.operator, preNum.innerText);
    if (calculator.savePre !== undefined && calculator.saveOpe !== undefined && calculator.savePre !== "" && calculator.saveOpe !== "") {
        calculator.operator = calculator.saveOpe;
        calculator.cur = calculator.pre;
        calculator.pre = calculator.savePre;
        calculator.compute();
        console.log("b");
        calculator.pre = calculator.cur;
    }
    preNum.innerText = "";
    curNum.innerText = calculator.pre;
    console.log("calculator.savePre ", calculator.savePre, "calculator.saveOpe ", calculator.saveOpe, "calculator.pre ", calculator.pre, calculator.operator);
    preNum.innerText = "";
    curNum.innerText = calculator.pre;
    console.log("c", calculator.pre, calculator.cur, preNum.innerText, curNum.innerText);
    for (let i = 0; i < 4; i++) {
        opeButton[i].setAttribute("aria-pressed", "false");
    }
    for (let j = 0; j < 11; j++) {
        numButton[j].setAttribute("aria-pressed", "false");
    }
    dataEqual.setAttribute("aria-pressed", "true");

    console.log("c", calculator.pre, preNum.innerText, curNum.innerText);
    console.log("update", calculator.pre, calculator.cur, calculator.pre, calculator.operator);
    calculator.upDate();
    console.log(calculator.cur, calculator.result, calculator.saveContinueOperator, calculator.operator, calculator.saveContinue);
    console.log(!isNaN(curNum.innerText), curNum.innerText);
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
    calculator.upDate()
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
    calculator.upDate()
})

window.addEventListener('keypress', (e) => {
    let keyBoardWord = String.fromCharCode(e.which);

    if (e.which == 61) {
        console.log(calculator.pre, calculator.result, calculator.saveContinueOperator, calculator.operator, calculator.saveContinue);
        if (preNum.innerText === "" && curNum.innerText !== "" && calculator.operator !== "" && calculator.saveContinue !== "") {
            if (calculator.pre !== "") {
                calculator.result = calculator.pre;
            }
            if (calculator.saveContinueOperator === "") {
                calculator.saveContinueOperator = calculator.operator;
            }
            calculator.result = parseFloat(calculator.result);
            calculator.result = eval(calculator.result + calculator.saveContinueOperator + calculator.saveContinue);
            curNum.innerText = calculator.result;
            calculator.pre = "";
            console.log("test");
            calculator.cur = calculator.result;
            calculator.upDate();
            return;
        } else if (preNum.innerText === "" && curNum.innerText !== "" && calculator.operator === "" && calculator.saveContinue === "") {
            return;
        }

        calculator.pressOperate();
        console.log(calculator.operator, calculator.pre, calculator.cur);
        console.log(calculator.operator, preNum.innerText);
        if (calculator.savePre !== undefined && calculator.saveOpe !== undefined && calculator.savePre !== "" && calculator.saveOpe !== "") {
            calculator.operator = calculator.saveOpe;
            calculator.cur = calculator.pre;
            calculator.pre = calculator.savePre;
            calculator.compute();
            console.log("b");
            calculator.pre = calculator.cur;
        }
        preNum.innerText = "";
        curNum.innerText = calculator.pre;
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
        dataEqual.setAttribute("aria-pressed", "true");
        calculator.upDate();
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
        console.log("calculator.savePre ", calculator.savePre, "calculator.saveOpe ", calculator.saveOpe, "calculator.pre ", calculator.pre);
        if (calculator.pre === "") {
            //show the minus sign
            curNum.innerText = calculator.cur;
            console.log("b");
        } else if (calculator.pre !== "" && calculator.savePre !== undefined && calculator.saveOpe !== undefined && calculator.savePre !== "" && calculator.saveOpe !== "") {
            preNum.innerText = calculator.savePre + calculator.saveOpe + calculator.pre + calculator.operator;
            curNum.innerText = "";
            console.log("a");
        } else {
            preNum.innerText = calculator.pre + calculator.operator;
            curNum.innerText = calculator.cur;
            console.log("c");
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
        calculator.upDate()
    }
})

