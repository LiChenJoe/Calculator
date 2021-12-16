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
        console.log("clear");
    }

    addNum(number) {
        if (number === "." && this.cur.includes(".")) return;
        this.cur = this.cur.toString() + number.toString();
        if (this.pre === "" && this.cur !== "" && this.operator === "-") {
            this.cur = "-" + this.cur;
            this.operator = "";
            this.upDate();
            console.log("operate: ", this.operator);
            return;
        } else if (this.pre !== "") {
            this.upDate();
        }
        console.log(number + "number" + this.cur, this);
    }

    pressOperate(operator) {
        if (this.pre === "" && this.cur === "" && this.operator === "" && operator === "-") {
            this.operator = operator;
            console.log("operate: ", this.operator);
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
            console.log("成家");
            this.compute();
            this.operator = operator;
            this.pre = this.cur;
            this.cur = "";
            this.upDate();
        } else if (!isNaN(Number(this.pre)) && (this.operator == "+" || this.operator == "-") && (operator == "+" || operator == "-") && (this.cur != "")) {
            console.log(!isNaN(Number(this.pre), "pre是數字 加減"));
            this.compute();
            this.operator = operator;
            this.pre = this.cur;
            this.cur = "";
            this.upDate();
        } else if (!isNaN(Number(this.pre)) && (this.operator == "*" || this.operator == "/") && (operator == "*" || operator == "/") && (this.cur != "")) {
            console.log(!isNaN(Number(this.pre), "pre是數字 乘除"));
            this.compute();
            this.operator = operator;
            this.pre = this.cur;
            this.cur = "";
            this.upDate();
        } else if (isNaN(Number(this.pre))) {
            console.log("isNaN(this.pre)", isNaN(this.pre) + "這裡" + this.operator);
            for (let i = 0; i < this.pre.length; i++) {
                console.log(i, isNaN(this.pre[i]), this.pre[i]);
                if (isNaN(this.pre[i])) {
                    let ope = this.pre[i];
                    let opeIndex = this.pre.indexOf(ope);
                    let sliceOut = this.pre.slice(0, opeIndex);
                    console.log("opeIndex ", opeIndex, "sliceOut", sliceOut, "-opeIndex", -opeIndex);
                    console.log(opeIndex + 1, this.pre.length - 1, "this.pre[i]: ", this.pre[i]);
                    this.pre = this.pre.slice(-(this.pre.length - (sliceOut.length + 1)));
                    console.log("gg", this.pre, "this.pre.length - (sliceOut.length + 1): ", this.pre.length - (sliceOut.length + 1));
                    this.compute();
                    if (ope == "+" && (operator == "+" || operator == "-" || operator === undefined)) {
                        console.log("a");
                        this.pre = Number(sliceOut) + Number(this.cur);
                        if (operator === undefined) {
                            this.cur = this.pre;
                            this.pre = "";
                        }
                    } else if (ope == "-" && (operator == "-" || operator == "+" || operator === undefined)) {
                        console.log("b");
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
                        console.log("d ", ope);
                        this.pre = Number(sliceOut) + ope + Number(this.cur);
                    } else {
                        console.log("e ", operator);
                        this.pre = sliceOut + ope + this.cur;
                    }
                    if (operator !== undefined) {
                        console.log("c ");
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
            console.log("Hi", "com", plus)
            if (this.pre != "" && this.cur != "") {
                console.log("Hi", this.pre, this.cur);
            } else if (this.pre != "" && this.cur == undefined) {
                this.cur = plus;
                console.log("bitch", this.pre, this.cur);
                this.compute();
            }

            this.pre = this.cur;
            this.cur = "";
            console.log("Hi");
            this.upDate();
        }
        console.log("operate() 答 " + "this.pre :" + this.pre + " operator: " + operator + " this.cur: " + this.cur, this);
    }

    compute() {
        let result;
        let preNumber = parseFloat(this.pre);
        let curNumber = parseFloat(this.cur);
        console.log(preNumber + " " + curNumber, "operator", this.operator);
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
        console.log("compute() 答 " + "this.pre :" + this.pre + " operator: " + this.operator + " this.cur: " + this.cur, this);
        this.cur = result;
        if (this.cur == 0) {
            this.cur = "0";
        }
        console.log(this.cur, this.operator);
    }

    delete() {
        console.log("this.cur ", this.cur);
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
        console.log("(this.cur)", (this.cur), "-(this.cur)", -(this.cur), "(this.cur).toString()", -(this.cur), "(Math.abs(this.cur)).toString() ", (Math.abs(this.cur)).toString());
        if (this.cur !== "") {
            console.log("進來了");
            if (this.cur == - Math.abs(this.cur)) {
                this.cur = this.cur.slice(1, this.cur.length);
                console.log("負變正", this.cur.length);
                return;
            } else if (this.cur == Math.abs(this.cur)) {
                this.cur = "-" + this.cur.toString();
                console.log("正變負");
                return;
            }
        }

    }

    upDate() {
        console.log(this.pre, this.cur)
        this.preNum.innerText = this.pre + this.operator;
        this.curNum.innerText = this.cur;
        if (this.curNum.innerText.length < 16 && this.curNum.innerText.length > 12) {
            curNum.style.fontSize = "1.8rem";
            console.log("太大", this.curNum.innerText.length);
        } else if (this.curNum.innerText.length > 15 || this.preNum.innerText.length > 20) {
            console.log("OMG", this.curNum.innerText.length, this.preNum);
            curNum.style.fontSize = "1.8rem";
            curNum.style.wordWrap = "break-word";
            preNum.style.wordWrap = "break-word";
        }
        console.log("update() 答 " + "this.curNum:" + this.curNum.innerText + " this.cur: ", this.cur, " operator: " + this.operator, this);
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
    console.log("here");
})

opeButton.forEach(ope => {
    console.log("opeHere");
    ope.addEventListener("click", () => {
        console.log("opeOne", ope.value);
        calculator.pressOperate(ope.value);
        if (calculator.cur === "" && ope.value !== calculator.operator) {
            calculator.pressOperate(ope.value);
            console.log("calculator.cur ", calculator.cur, " ope: ", ope.value, "calculator.operator", calculator.operator, "opeSecond");
        }
        console.log("push");
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
        console.log("HH");
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
})

dataDelete.addEventListener("click", () => {
    calculator.delete();
    if (calculator.operator == "") {
        console.log(calculator.operator == "");
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
            dataEqual.setAttribute("aria-pressed", "false");
        }
    }
})

dataToggle.addEventListener("click", () => {
    console.log("innnnn d")
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
            console.log("HH");
            calculator.compute();
        } else {
            calculator.pre = "";
            calculator.operator = "";
        }
        console.log("a", e.which);
        calculator.upDate();
        for (let i = 0; i < 4; i++) {
            opeButton[i].setAttribute("aria-pressed", "false");
        }
        dataEqual.setAttribute("aria-pressed", "true");
    } else if (keyBoardWord > -1 && keyBoardWord < 10 && keyBoardWord != "\r") {
        calculator.addNum(keyBoardWord);
        for (let i = 0; i < 11; i++) {
            numButton[i].setAttribute("aria-pressed", "false");
            console.log(i, opeButton[i], keyBoardWord, "看看");
            if (numButton[i].value === keyBoardWord) {
                console.log(numButton[i].value == keyBoardWord);
                numButton[i].setAttribute("aria-pressed", "true");
            }
        }
        console.log("b");
        calculator.upDate();
    }
    else if (keyBoardWord == '.') {
        console.log("c", keyBoardWord);
        calculator.addNum(keyBoardWord);
        calculator.upDate();
        for (let i = 0; i < 11; i++) {
            numButton[i].setAttribute("aria-pressed", "false");
            console.log(i, opeButton[i], keyBoardWord, "看看");
            if (numButton[i].value === keyBoardWord) {
                console.log(numButton[i].value == keyBoardWord);
                numButton[i].setAttribute("aria-pressed", "true");
            }
        }
    }
    else if (e.which == 42 || e.which == 43 || e.which == 45 || e.which == 47) {
        calculator.pressOperate(keyBoardWord);
        if (calculator.cur === "" && keyBoardWord !== calculator.operator) {
            calculator.pressOperate(keyBoardWord);
            console.log(opeButton[1], "  opeButton.nodeList");
            for (let i = 0; i < 4; i++) {
                opeButton[i].setAttribute("aria-pressed", "false");
                dataEqual.setAttribute("aria-pressed", "false");
                console.log(i, opeButton[i], e.key, "看看");
                if (opeButton[i].value === e.key) {
                    console.log(opeButton[i].value == e.key);
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
    } else if (e.keyCode === 8) {
        calculator.delete();
        if (calculator.operator == "") {
            console.log(calculator.operator == "");
            for (let i = 0; i < 4; i++) {
                opeButton[i].setAttribute("aria-pressed", "false");
                dataEqual.setAttribute("aria-pressed", "false");
            }
        }
    }
})
