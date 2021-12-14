class Calculator {
    constructor(preNum, curNum) {
        this.preNum = preNum;
        this.curNum = curNum;
        this.clear();
    }

    clear() {
        this.pre = "";
        this.cur = "";
        this.operator = undefined;
        console.log("clear");
    }

    addNum(number) {
        if (number === "." && this.cur.includes(".")) return;
        this.cur = this.cur.toString() + number.toString();
        console.log(number + "number" + this.cur, this);
    }

    pressOperate(operator) {
        if (this.cur === "") return;
        this.operator = operator;
        this.pre = this.cur;
        this.cur = "";
        console.log(this.pre + "operator" + this.cur, this);
    }

    compute() {
        let result;
        let preNumber = parseFloat(this.pre);
        let curNumber = parseFloat(this.cur);
        console.log(this.operator);
        switch (this.operator) {
            case "x":
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
        console.log(result + "end");
        this.cur = result;
    }

    upDate() {
        this.curNum.innerText = this.cur;
        this.preNum.innerText = this.pre;
        console.log(this.pre + "update" + this.cur, this);
    }
}

const preNum = document.querySelector('[data-pre]');
const curNum = document.querySelector('[data-cur]');
const opeButton = document.querySelectorAll('[data-operator]');
const numButton = document.querySelectorAll('[data-num]');
const clear = document.querySelector('[data-clear]');
const dataPercen = document.querySelector('[data-percen]');
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
    ope.addEventListener("click", () => {
        calculator.pressOperate(ope.value);
    })
    console.log("opeHere");
})

dataEqual.addEventListener("click", () => {
    calculator.compute();
    calculator.upDate();
})