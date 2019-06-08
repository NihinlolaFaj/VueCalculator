<template>
  <div>
    <div class="calculator">
      <div class="display">{{current || '0'}}</div>
      <div @click="clear" class="btn">C</div>
      <div class="btn">√</div>
      <div class="btn">π</div>
      <div @click="divide" class="btn operator">÷</div>
      <div @click="append('7')" class="btn">7</div>
      <div @click="append('8')" class="btn">8</div>
      <div @click="append('9')" class="btn">9</div>
      <div @click="times" class="btn operator">x</div>
      <div @click="append('4')" class="btn">4</div>
      <div @click="append('5')" class="btn">5</div>
      <div @click="append('6')" class="btn">6</div>
      <div @click="minus" class="btn operator">-</div>
      <div @click="append('1')" class="btn">1</div>
      <div @click="append('2')" class="btn">2</div>
      <div @click="append('3')" class="btn">3</div>
      <div @click="add" class="btn operator">+</div>
      <div @click="append('0')" class="btn zero">0</div>
      <div @click="dot" class="btn">.</div>
      <div @click="equal" class="btn operator">=</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previous: "",
      current: "",
      operator: null,
      operatorValue: null,
      operatorClicked: false,
    };
  },
  methods: {
    // Clear Function that clears the Display Field
    clear() {
      this.current = "";
    },
    // Append function used to append values on the display field
    append(number) {
      if(this.current.length < 9) {
        if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
      console.log("Total is " + this.current.length);
      }
      else {
        console.log("I can't add no more!");
      }
      
    },
    // dot function used to add a dot operand to the display field
    dot() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    // setPreviousData function used to store current display value into a previous variable
    // so at carry out calculation
    setPreviousData() {
      this.previous = this.current;
      this.operatorClicked = true;
    },
    // divide function that stores the value of the divide operator
    divide() {
      this.operatorValue = "/";
      this.operator = (a, b) => a / b;
      this.setPreviousData();
    },
    // times function that stores the value of the times operator
    times() {
      this.operatorValue = "*";
      this.operator = (a, b) => a * b;
      this.setPreviousData();
    },
    // minus function that stores the value of the minus operator
    minus() {
      this.operatorValue = "-";
      this.operator = (a, b) => a - b;
      this.setPreviousData();
    },
    // add function that stores the value of the add operator
    add() {
      this.operatorValue = "+";
      this.operator = (a, b) => a + b;
      this.setPreviousData();
    },
    // equal function that takes combines the arithemetic values and operator to be calculated, 
    // calls the Java REST API to perform calculation, receives the result of the calculation,
    // and displays the result of the calculation in the display field
    equal() {
      console.log(
        this.previous + " " + this.operatorValue + " " + this.current
      );
      this.current = `${this.operator(
        parseFloat(this.previous),
        parseFloat(this.current)
      )}`;
      this.previous = null;
    }
  }
};
</script>

<!-- The customised stylesheet for the calculator app -->
<style scoped>
.calculator {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
}
.display {
  grid-column: 1 / 5;
  background-color: #333;
  color: white;
}
.btn {
  background-color: #f2f2f2;
  border: 1px solid #999;
}
.operator {
  background-color: orange;
  color: white;
}
.zero {
  grid-column: 1 / 3;
}
</style>
