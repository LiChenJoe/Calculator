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
        if (this.pre !== "") {
            this.upDate();
        }
        console.log(number + "number" + this.cur, this);
    }

    pressOperate(operator) {
        if (this.pre != "" && this.cur == "") {
            this.operator = operator;
            this.upDate();
        } else if (!isNaN(Number(this.pre)) && (this.operator == "+" || this.operator == "-") && (operator == "*" || operator == "/") && (this.cru != "")) {
            this.pre += this.operator + this.cur;
            this.operator = operator;
            this.cur = "";
            this.upDate();
        } else if (!isNaN(Number(this.pre)) && (this.operator == "*" || this.operator == "/") && (operator == "+" || operator == "-") && (this.cru != "")) {
            console.log("成家");
            this.compute();
            this.operator = operator;
            this.pre = this.cur;
            this.cur = "";
            this.upDate();
        } else if (!isNaN(Number(this.pre)) && (this.operator == "+" || this.operator == "-") && (operator == "+" || operator == "-") && (this.cru != "")) {
            console.log(!isNaN(Number(this.pre), "pre是數字 加減"));
            this.compute();
            this.operator = operator;
            this.pre = this.cur;
            this.cur = "";
            this.upDate();
        } else if (!isNaN(Number(this.pre)) && (this.operator == "*" || this.operator == "/") && (operator == "*" || operator == "/") && (this.cru != "")) {
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
                    } else {
                        console.log("d ", operator);
                        this.pre = sliceOut + ope + this.cur;
                    }
                    if (operator !== undefined) {
                        console.log("c ");
                        this.cur = "";
                        this.operator = "";
                    }
                }
            }
        } else {
            let plus = this.cur;
            this.compute();
            console.log("Hi", "com", plus)
            if (this.pre != "" && this.cru != "") {
                console.log("Hi", this.pre, this.cru);
            } else if (this.pre != "" && this.cru == undefined) {
                this.cru = plus;
                console.log("Hi", this.pre, this.cru);
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
        console.log(this.cur);
    }

    upDate() {
        console.log(this.pre, this.cur)
        this.preNum.innerText = this.pre + this.operator;
        this.curNum.innerText = this.cur;
        console.log("update() 答 " + "this.pre :" + this.pre + " this.cur: " + " operator: " + this.operator + this.cur, this);
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
})