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
    }

    addNum(number) {
        if (number === "." && this.cur.includes(".")) return;
        this.cur = this.cur.toString() + number.toString();
        if (this.pre === "" && this.cur !== "" && this.operator === "-") {
            this.cur = "-" + this.cur;
            this.operator = "";
            this.upDate();
            return;
        } else if (this.pre !== "") {
            this.upDate();
        }
    }

    pressOperate(operator) {
        if (this.pre === "" && this.cur === "" && this.operator === "" && operator === "-") {
            this.operator = operator;
            return;
        } else if (this.pre != "" && this.cur == "") {
            this.operator = operator;
            this.upDate();
        } else if (!isNaN(Number(this.pre)) && (this.cur != "") && (this.operator == "+" || this.operator == "-") && (operator == "*" || operator == "/")) {
            this.pre += this.operator + this.cur;
            this.operator = operator;
            this.cur = "";
            this.upDate();
        } else if (!isNaN(Number(this.pre)) && (this.operator == "*" || this.operator == "/") && (operator == "+" || operator == "-") && (this.cur != "")) {
            this.compute();
            this.operator = operator;
            this.pre = this.cur;
            this.cur = "";
            this.upDate();
        } else if (!isNaN(Number(this.pre)) && (this.operator == "+" || this.operator == "-") && (operator == "+" || operator == "-") && (this.cur != "")) {
            this.compute();
            this.operator = operator;
            this.pre = this.cur;
            this.cur = "";
            this.upDate();
        } else if (!isNaN(Number(this.pre)) && (this.operator == "*" || this.operator == "/") && (operator == "*" || operator == "/") && (this.cur != "")) {
            this.compute();
            this.operator = operator;
            this.pre = this.cur;
            this.cur = "";
            this.upDate();
        } else if (isNaN(Number(this.pre))) {
            for (let i = 0; i < this.pre.length; i++) {
                if (isNaN(this.pre[i])) {
                    let ope = this.pre[i];
                    let opeIndex = this.pre.indexOf(ope);
                    let sliceOut = this.pre.slice(0, opeIndex);
                    this.pre = this.pre.slice(-(this.pre.length - (sliceOut.length + 1)));
                    this.compute();
                    if (ope == "+" && (operator == "+" || operator == "-" || operator === undefined)) {
                        this.pre = Number(sliceOut) + Number(this.cur);
                        if (operator === undefined) {
                            this.cur = this.pre;
                            this.pre = "";
                        }
                    } else if (ope == "-" && (operator == "-" || operator == "+" || operator === undefined)) {
                        this.pre = Number(sliceOut) - Number(this.cur);
                        if (operator === undefined) {
                            this.cur = this.pre;
                            this.pre = "";
                        }
                    } else if (ope == "*" && operator == "*") {
                        this.pre = Number(sliceOut) * Number(this.cur);
                    } else if (ope == "/" && operator == "/") {
                        this.pre = Number(sliceOut) / Number(this.cur);
                    } else if (operator == "") {
                        this.pre = Number(sliceOut) + ope + Number(this.cur);
                    } else {
                        this.pre = sliceOut + ope + this.cur;
                    }
                    if (operator !== undefined) {
                        this.cur = "";
                        this.operator = "";
                    }
                }
            }
        } else if (this.pre === "" && this.cur === "" && this.operator === "-" && operator !== "") {
            this.operator = "";
            operator = "";
            return;
        } else {
            let plus = this.cur;
            this.compute();
            if (this.pre != "" && this.cur != "") {
            } else if (this.pre != "" && this.cur == undefined) {
                this.cur = plus;
                this.compute();
            }

            this.pre = this.cur;
            this.cur = "";
            this.upDate();
        }
    }
    compute() {
        let result;
        let preNumber = parseFloat(this.pre);
        let curNumber = parseFloat(this.cur);
        if (!isNaN(this.pre)) {
            switch (this.operator) {
                case "*":
                    result = preNumber * curNumber;
                    break;
                case "-":
                    result = preNumber - curNumber;
                    break;
                case "/":
                    result = preNumber / curNumber;
                    break;
                case "+":
                    result = preNumber + curNumber;
                    break;
                default:
                    return;
            }
        } else {
            this.pressOperate(this.operator);
        }
        this.cur = result;
        if (this.cur == 0) {
            this.cur = "0";
        }
    }

    delete() {
        if (this.cur !== "") {
            this.cur = this.cur.slice(0, -1);
            this.upDate();
        } else if (this.operator !== "") {
            this.operator = "";
            this.upDate();
        } else if (this.cur === "" && this.operator === "" && this.pre !== "") {
            this.pre = this.pre.slice(0, -1);
            this.upDate();
        }
    }

    toggle() {
        if (this.cur !== "") {
            if (this.cur == - Math.abs(this.cur)) {
                this.cur = this.cur.slice(1, this.cur.length);
                return;
            } else if (this.cur == Math.abs(this.cur)) {
                this.cur = "-" + this.cur;
                return;
            }
        }

    }

    upDate() {
        this.preNum.innerText = this.pre + this.operator;
        this.curNum.innerText = this.cur;
        if (this.curNum.innerText.length < 16 && this.curNum.innerText.length > 12) {
            curNum.style.fontSize = "1.8rem";
        } else if (this.curNum.innerText.length > 15 || this.preNum.innerText.length > 20) {
            curNum.style.fontSize = "1.8rem";
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
        calculator.addNum(num.innerText);
        calculator.upDate();
    })
})

opeButton.forEach(ope => {
    ope.addEventListener("click", () => {
        calculator.pressOperate(ope.value);
        if (calculator.cur === "" && ope.value !== calculator.operator) {
            calculator.pressOperate(ope.value);
        }
    })
})

dataEqual.addEventListener("click", () => {
    if (!isNaN(Number(this.pre))) {
        calculator.compute();
    }
    calculator.pressOperate(this.operator);
    if (calculator.cur == "" && calculator.pre != "") {
        calculator.cur = calculator.pre;
        calculator.pre = "";
        calculator.operator = "";
    } else if (calculator.cur == "" && calculator.operator != "" && calculator.pre != "") {
        calculator.cur = calculator.pre;
        calculator.compute();

    } else {
        calculator.pre = "";
        calculator.operator = "";
    }
    calculator.upDate();
})

clear.addEventListener("click", () => {
    calculator.clear();
    calculator.upDate();
    for (let i = 0; i < 4; i++) {
        opeButton[i].setAttribute("aria-pressed", "false");
        dataEqual.setAttribute("aria-pressed", "false");
    }
    for (let j = 0; j < 11; j++) {
        numButton[j].setAttribute("aria-pressed", "false");
    }
})

dataDelete.addEventListener("click", () => {
    calculator.delete();
    if (calculator.operator == "") {
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
            dataEqual.setAttribute("aria-pressed", "false");
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
    }
})

dataToggle.addEventListener("click", () => {
    calculator.toggle();
    calculator.upDate();
})

window.addEventListener('keypress', (e) => {
    let keyBoardWord = String.fromCharCode(e.which);

    if (e.which == 61) {
        if (!isNaN(Number(this.pre))) {
            calculator.compute();
        }
        calculator.pressOperate(this.operator);
        if (calculator.cur == "" && calculator.pre != "") {
            calculator.cur = calculator.pre;
            calculator.pre = "";
            calculator.operator = "";
        } else if (calculator.cur == "" && calculator.operator != "" && calculator.pre != "") {
            calculator.cur = calculator.pre;
            calculator.compute();
        } else {
            calculator.pre = "";
            calculator.operator = "";
        }
        calculator.upDate();
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
        dataEqual.setAttribute("aria-pressed", "true");
    } else if (keyBoardWord > -1 && keyBoardWord < 10 && keyBoardWord != "\r") {
        calculator.addNum(keyBoardWord);
        for (let j = 0; j < 4; j++) {
            opeButton[j].setAttribute("aria-pressed", "false");
        }
        for (let i = 0; i < 11; i++) {
            numButton[i].setAttribute("aria-pressed", "false");
            dataEqual.setAttribute("aria-pressed", "false");
            if (numButton[i].value === keyBoardWord) {
                numButton[i].setAttribute("aria-pressed", "true");
            }
        }
        calculator.upDate();
    }
    else if (keyBoardWord == '.') {
        calculator.addNum(keyBoardWord);
        calculator.upDate();
        for (let i = 0; i < 11; i++) {
            numButton[i].setAttribute("aria-pressed", "false");
            dataEqual.setAttribute("aria-pressed", "false");
            if (numButton[i].value === keyBoardWord) {
                numButton[i].setAttribute("aria-pressed", "true");
            }
        }
    }
    else if (e.which == 42 || e.which == 43 || e.which == 45 || e.which == 47) {
        calculator.pressOperate(keyBoardWord);
        if (calculator.cur === "" && keyBoardWord !== calculator.operator) {
            calculator.pressOperate(keyBoardWord);
            for (let j = 0; j < 11; j++) {
                numButton[j].setAttribute("aria-pressed", "false");
            }
            for (let i = 0; i < 4; i++) {
                opeButton[i].setAttribute("aria-pressed", "false");
                dataEqual.setAttribute("aria-pressed", "false");
                if (opeButton[i].value === e.key) {
                    opeButton[i].setAttribute("aria-pressed", "true");
                }
            }
        }
    }
})

const log = document.getElementById('log');
document.addEventListener('keyup', (e) => {
    if (e.keyCode === 27) {
        calculator.clear();
        calculator.upDate();
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
            dataEqual.setAttribute("aria-pressed", "false");
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
    } else if (e.keyCode === 8) {
        calculator.delete();
        if (calculator.operator == "") {
            for (let i = 0; i < 4; i++) {
                opeButton[i].setAttribute("aria-pressed", "false");
                dataEqual.setAttribute("aria-pressed", "false");
            }
            for (let j = 0; j < 11; j++) {
                numButton[j].setAttribute("aria-pressed", "false");
            }
        }
    }
})
