<template>
  <div>
    <div class="calculator">
      <div class="display">{{current || '0'}}</div>
      <div @click="clear" class="btn">C</div>
      <div @click="squareRoot" class="btn">√</div>
      <div @click="append('3.14')" class="btn">π</div>
      <div @click="setOperator('÷')" class="btn operator">÷</div>
      <div @click="append('7')" class="btn">7</div>
      <div @click="append('8')" class="btn">8</div>
      <div @click="append('9')" class="btn">9</div>
      <div @click="setOperator('x')" class="btn operator">x</div>
      <div @click="append('4')" class="btn">4</div>
      <div @click="append('5')" class="btn">5</div>
      <div @click="append('6')" class="btn">6</div>
      <div @click="setOperator('-')" class="btn operator">-</div>
      <div @click="append('1')" class="btn">1</div>
      <div @click="append('2')" class="btn">2</div>
      <div @click="append('3')" class="btn">3</div>
      <div @click="setOperator('+')" class="btn operator">+</div>
      <div @click="append('0')" class="btn zero">0</div>
      <div @click="dot" class="btn">.</div>
      <div @click="equals" class="btn operator">=</div>
      <div @click="showPreviousResult" class="btn zero special">Previous</div>
      <div @click="clearMemory" class="btn clearMem special">Clear Mem</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // API Request body for the 4 Basic arithmetic calculations
      PostRequest: {
        operator: "",
        firstValue: "",
        secondValue: ""
      },
      // API Request body for the squareroot calculation
      SquareRootRequest: {
        squareRootOperand: ""
      },
      previousResult: "",
      previous: "",
      current: "",
      operator: null,
      operatorValue: null,
      operatorClicked: false,
      results: "",
      tempResult: 0
    };
  },
  methods: {
    // callRestApi function that makes API call to the Java REST API
    callRestApi(requestBody, apiMethod) {
      axios({
        method: "POST",
        url: "http://localhost:8085/" + apiMethod,
        data: requestBody,
        headers: { "content-type": "application/json" }
      }).then(
        result => {
          this.response = result.data;
          console.log(this.response);

          if (this.response.id == 200) {
            console.log("API call was successful");

            // Convert string to float
            this.tempResult =  parseFloat(this.response.message);

            /**
             * Check if value is an integer or a double, and round up to 2 decimal places if it
             * is a double
             */
            if(!Number.isInteger(this.tempResult)) {
            console.log("I am a FLOAT!!!!");
            this.tempResult = this.tempResult.toFixed(2);
            }

            // Bind the result of the calculation to the display
            this.current = this.tempResult;

            // Store previous calculation result
            this.previousResult = this.current;
            this.previous = null;

            // If display result is greater than 9 integer digits, then display the letter "E"
            if (this.current.length > 9) {
              this.current = "E";
            }
          } else {
            console.log("API call was NOT successful");
            alert(this.response.error);
          }
        },
        error => {
          console.error(error);
          alert("An error occured");
        }
      );
    },
    // clear Function that clears the current display of the calculator
    clear() {
      this.current = "";
    },
    // Append function used to append values on the calculator display
    append(number) {
      // Limit the number of values clicked to 9 integer digits
      // if (this.current.length < 9) {
        if (this.operatorClicked) {
          this.current = "";
          this.operatorClicked = false;
        }
        this.current = `${this.current}${number}`;
      // } 
      // else {
      //   console.log("I can't add no more!");
      // }
    },
    // dot function used to add a dot operand to the calculator display
    dot() {
      if (this.current.indexOf(".") === -1) {
        this.append(".");
      }
    },
    /**
     * setPreviousData function used to store current display value into a previous variable
     * so at store new display value for the calculation
     */
    setPreviousData() {
      this.previous = this.current;
      // this.current = null;
      this.operatorClicked = true;
    },
    // setOperator function that stores the value of the operator to be used for calculation
    setOperator(operator) {
      this.operatorValue = operator;
      this.setPreviousData();
    },
    // showPreviousResult function that displays the previous calculator result
    showPreviousResult() {
      this.current = this.previousResult;
    },
    // clearMemory function used to the memory of the calculator
    clearMemory() {
      this.previousResult = "";
      this.current = "";
    },
    /**
     * equals function that takes combines the arithemetic values and operator to be calculated,
     * calls the Java REST API to perform calculation, receives the result of the calculation,
     * and displays the result of the calculation in the display field
     */
    equals() {
      console.log(
        this.previous + " " + this.operatorValue + " " + this.current
      );
      this.PostRequest.operator = this.operatorValue;
      this.PostRequest.firstValue = this.previous;
      this.PostRequest.secondValue = this.current;

      // Make API call
      this.callRestApi(this.PostRequest, "calculate");
    },
    // squareRoot function that calls REST API to compute the squareroot of the value displayed
    squareRoot() {
      this.SquareRootRequest.squareRootOperand = this.current;

      // Make API call
      this.callRestApi(this.SquareRootRequest, "squareroot");
    }
  }
};
</script>

<!-- The customised stylesheet for the calculator app -->
<style scoped>
header {
  margin-bottom: 5%;
  padding: 10px;
  height: 0%;
  text-align: center;
  background: rgb(1, 96, 128);
  color: white;
  font-size: 40px;
}
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
.btn:active {
  background-color: yellow;
  border: 2px solid #999;
}
.operator {
  background-color: orange;
  color: white;
}
.zero {
  grid-column: 1 / 3;
}
.clearMem {
  grid-column: 3 / 5;
}
.special {
  background-color: tomato;
}
</style>
