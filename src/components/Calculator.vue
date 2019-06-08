<template>
  <div>
    <div>
      <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      Dismissible Alert!
    </b-alert>
    </div>
    <div class="calculator">
      <div class="display">{{current || '0'}}</div>
      <div @click="clear" class="btn">C</div>
      <div class="btn">√</div>
      <div @click="percent" class="btn">%</div>
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
      <div @click="append('0')" class="btn">0</div>
      <div @click="dot" class="btn">.</div>
      <div class="btn">π</div>
      <div @click="equal" class="btn operator">=</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previous: null,
      current: "",
      operator: null,
      operatorValue: null,
      operatorClicked: false,
      showDismissibleAlert: false,
    };
  },
  methods: {
    clear() {
      this.current = "";
    },
    percent() {
      this.current = `${parseFloat(this.current) / 100}`;
    },
    append(number) {
      // if() {

      // }
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
    },
    dot() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    setPreviousData() {
      this.previous = this.current;
      this.operatorClicked = true;
    },
    divide() {
      this.operatorValue = "/";
      this.operator = (a, b) => a / b;
      this.setPreviousData();
    },
    times() {
      this.operatorValue = "*";
      this.operator = (a, b) => a * b;
      this.setPreviousData();
    },
    minus() {
      this.operatorValue = "-";
      this.operator = (a, b) => a - b;
      this.setPreviousData();
    },
    add() {
      this.operatorValue = "+";
      this.operator = (a, b) => a + b;
      this.setPreviousData();
    },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
