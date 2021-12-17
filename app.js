class Calculator {
    constructor(preNum, curNum) {
        this.preNum = preNum;
        this.curNum = curNum;
        this.clear();
    }

    clear() {
        console.log(this.pre, this.cur, "a", this.preNum);
        this.pre = "";
        this.cur = "";
        this.operator = "";
        console.log(this.pre, this.cur, "n", this.preNum);
    }

    addNum(number) {
        if (number === "." && this.cur.includes(".")) return;
        if (this.curNum.innerText == "-0") {
            console.log(this.cur, "一");
            this.cur = "-";
            console.log(this.cur, "二");
        }
        this.cur = this.cur.toString() + number.toString();
        if (this.pre === "" && this.cur !== "" && (this.operator === "-")) {
            this.cur = "-" + this.cur;
            this.operator = "";
            this.upDate();
            return;
        }
        this.upDate();
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
            this.save = "";
            if (this.pre[0] === "-") {
                this.save = "-";
                console.log(this.save);
                this.pre = this.pre.slice(1, this.pre.length);
            }
            for (let i = 0; i < this.pre.length; i++) {
                if (isNaN(this.pre[i])) {
                    let ope = this.pre[i];
                    console.log(ope, this.operator, operator)
                    let opeIndex = this.pre.indexOf(ope);
                    let sliceOut = this.pre.slice(0, opeIndex);
                    this.pre = this.pre.slice(-(this.pre.length - (sliceOut.length + 1)));
                    console.log(this.pre, "算錢", this.cur);
                    this.compute();
                    if (this.save.length > 0) {
                        console.log("jj", sliceOut, this.cur);
                        sliceOut = "-" + sliceOut;
                        this.save = "";
                    }
                    if (ope == "+" && (operator == "+" || operator == "-" || operator === undefined)) {
                        this.pre = Number(sliceOut) + Number(this.cur);
                        if (operator === undefined) {
                            this.cur = this.pre;
                            this.pre = "";
                        }
                    } else if (ope == "-" && (operator == "-" || operator == "+" || operator === undefined)) {
                        console.log(sliceOut, " Number(sliceOut)", Number(sliceOut), this.cur, this.pre);
                        this.pre = Number(sliceOut) - Number(this.cur);
                        console.log(sliceOut, this.cur, this.pre);
                        if (operator === undefined) {
                            this.cur = this.pre;
                            this.pre = "";
                        }
                        console.log(sliceOut, this.cur, this.pre);
                    } else if (ope == "*" && operator == "*") {
                        this.pre = Number(sliceOut) * Number(this.cur);
                    } else if (ope == "/" && operator == "/") {
                        this.pre = Number(sliceOut) / Number(this.cur);
                    } else if (operator == "") {
                        this.pre = Number(sliceOut) + ope + Number(this.cur);
                    } else {
                        this.pre = sliceOut + ope + this.cur;
                    }
                    console.log(sliceOut, this.cur, this.pre);
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
        if (curNum.classList.length > 1) {
            curNum.classList.remove("negative");
            this.upDate();
        }
        console.log(this.operator, this.pre);
    }
    compute() {
        let result;
        console.log(this.cur, this.pre, this.operator);
        let preNumber = parseFloat(this.pre);
        let curNumber = parseFloat(this.cur);
        console.log(curNumber, preNumber, this.operator);
        if (!isNaN(this.pre)) {
            console.log("1");
            switch (this.operator) {
                case "*":
                    result = preNumber * curNumber;
                    console.log(result);
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
            console.log("不會吧");
            this.pressOperate(this.operator);
        }
        this.cur = result;
        console.log(this.cur);
        if (this.cur == 0) {
            console.log("fuck off");
            this.cur = "0";
        }
        console.log(this.cur);
    }

    delete() {
        if (this.cur !== "") {
            this.cur = this.cur.toString().slice(0, -1);
        } else if (this.operator !== "") {
            this.operator = "";
        } else if (this.cur === "" && this.operator === "" && this.pre !== "") {
            this.pre = this.pre.toString().slice(0, -1);
        }
        this.upDate();
    }

    toggle() {
        console.log("before", curNum.classList.length, this.cur, curNum.classList.length > 1 && this.cur == "");
        curNum.classList.toggle("negative");
        console.log("加了", curNum.classList.length, this.cur);
        if (curNum.classList.length == 1 && this.cur == "") {
            console.log(curNum.classList.length, this.cur);
            this.cur = "";
        } else if (curNum.classList.length == 1 && this.cur == "-") {
            console.log(curNum.classList.length, this.cur, "l");
            this.cur = "";
            return;
        } else if (curNum.classList.length == 1 && this.cur[0] == "-") {
            console.log(curNum.classList.length, this.cur, "l");
            this.cur = this.cur.slice(1, this.cur.length);
            return;
        } else if (curNum.classList.length > 1 && this.cur == "-") {
            this.cur = "0";
            return;
        } else if (curNum.classList.length > 1 && this.cur[0] == "-") {
            this.cur = this.cur.slice(1, this.cur.length);
            console.log(curNum.classList.length, this.cur, "2");
            return;
        } else if (curNum.classList.length > 1 && this.cur == "") {
            console.log(curNum.classList.length, this.cur, "update");
            this.cur = "-";
            this.upDate();
        } else if (curNum.classList.length > 1) {
            this.cur = "-" + this.cur;
            return;
        } else if (curNum.classList.length == 1) {
            this.cur = "-" + this.cur;
            console.log("不服來辯 2");
            return;
        }
        console.log(dataToggle.classList.length, this.cur);
    }

    upDate() {
        console.log("in in d", this.cur, this.operator, this.pre);
        if (this.pre == "" && this.cur == "" && this.operator == "") {
            this.preNum.innerText = "";
            this.curNum.innerText = "0";
        } else if (this.cur[0] == "-" && this.operator == "-") {
            console.log("in");
            this.operator = "+";
            this.preNum.innerText = this.pre + this.operator;
            console.log(curNum.classList.length, this.cur, " this.preNum.innerText", this.preNum.innerText);
            this.cur = this.cur.slice(1, this.cur.length);
        } else {
            this.preNum.innerText = this.pre + this.operator;
            this.curNum.innerText = this.cur;
        }
        console.log("in in d", this.cur[0], this.operator, this.pre, this.preNum.innerText);
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
        console.log("in in d", this.cur[0], this.operator, this.pre);
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
    })
})

window.addEventListener("load", calculator.upDate());

opeButton.forEach(ope => {
    ope.addEventListener("click", () => {
        calculator.pressOperate(ope.value);
        if (calculator.cur === "" && ope.value !== calculator.operator) {
            calculator.pressOperate(ope.value);
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
    for (let i = 0; i < 4; i++) {
        opeButton[i].setAttribute("aria-pressed", "false");
    }
    for (let j = 0; j < 11; j++) {
        numButton[j].setAttribute("aria-pressed", "false");
    }
    dataEqual.setAttribute("aria-pressed", "true");
    calculator.upDate();
})

clear.addEventListener("click", () => {
    calculator.clear();
    calculator.upDate();
    dataEqual.setAttribute("aria-pressed", "false");
    for (let i = 0; i < 4; i++) {
        opeButton[i].setAttribute("aria-pressed", "false");
    }
    for (let j = 0; j < 11; j++) {
        numButton[j].setAttribute("aria-pressed", "false");
    }
})

dataDelete.addEventListener("click", () => {
    calculator.delete();
    calculator.upDate();
    dataEqual.setAttribute("aria-pressed", "false");
    if (calculator.operator == "") {
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
    }
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
        calculator.upDate();
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
        if (calculator.cur === "" && keyBoardWord !== calculator.operator) {
            calculator.pressOperate(keyBoardWord);
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
        calculator.upDate();
        dataEqual.setAttribute("aria-pressed", "false");
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        for (let j = 0; j < 11; j++) {
            numButton[j].setAttribute("aria-pressed", "false");
        }
    } else if (e.keyCode === 8) {
        calculator.delete();
        calculator.upDate();
        dataEqual.setAttribute("aria-pressed", "false");
        if (calculator.operator == "") {
            for (let i = 0; i < 4; i++) {
                opeButton[i].setAttribute("aria-pressed", "false");
            }
            for (let j = 0; j < 11; j++) {
                numButton[j].setAttribute("aria-pressed", "false");
            }
        }
    }
})

