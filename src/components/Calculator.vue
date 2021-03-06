<template>
  <div>
    <div class="calculator">
      <div class="display">{{current || '0'}}</div>
      <div @click="clear" class="btn">C</div>
      <div @click="squareRoot" class="btn">√</div>
      <div @click="append('3.14')" class="btn">π</div>
      <div @click="setOperator('÷')" class="btn">÷</div>
      <div @click="append('7')" class="btn">7</div>
      <div @click="append('8')" class="btn">8</div>
      <div @click="append('9')" class="btn">9</div>
      <div @click="setOperator('x')" class="btn">x</div>
      <div @click="append('4')" class="btn">4</div>
      <div @click="append('5')" class="btn">5</div>
      <div @click="append('6')" class="btn">6</div>
      <div @click="setOperator('-')" class="btn">-</div>
      <div @click="append('1')" class="btn">1</div>
      <div @click="append('2')" class="btn">2</div>
      <div @click="append('3')" class="btn">3</div>
      <div @click="setOperator('+')" class="btn">+</div>
      <div @click="sign" class="btn">+/-</div>
      <div @click="append('0')" class="btn">0</div>
      <div @click="dot" class="btn">.</div>
      <div @click="equals" class="btn">=</div>
      <div @click="showPreviousResult" class="btn zero special">Get Memory</div>
      <div @click="clearMemory" class="btn clearMem special">Clear Memory</div>
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
      tempResult: 0,
      valueArray: []
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
          if (this.response.id == 200) {
            // Convert string to float
            this.tempResult = parseFloat(this.response.message);

            /**
             * Check if value is an integer or a double, and round up to 2 decimal places if it
             * is a double
             */
            if (!Number.isInteger(this.tempResult)) {
              this.tempResult = this.tempResult.toFixed(2);
            }

            // Bind the result of the calculation to the display
            this.current = this.tempResult;

            // Store previous calculation result
            this.previousResult = this.current;
            this.previous = null;

            // If display result is greater than 9 integer digits, then display the letter "E"
            if (this.current.toString().length > 9) {
              this.current = "E";
            }
          } else {
            alert(this.response.error);
          }
        },
        error => {
          alert("An error occured: " + error.toString());
        }
      );
    },
    // clear Function that clears the current display of the calculator
    clear() {
      this.current = "";
    },
    // Append function used to append values on the calculator display
    append(number) {
      if (this.operatorClicked) {
        this.current = "";
        this.operatorClicked = false;
      }

      // Check if display value includes dot or not to limit the value
      if (!this.current.includes(".")) {
        if (this.current.length < 9) {
          this.current = `${this.current}${number}`;
        }
      } 
      else {
        // Ensure digits after the dot is limited to two
        this.valueArray = this.current.split(".");
        if(this.valueArray[1].length < 2) {
          this.current = `${this.current}${number}`;
        }
      }
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
    },
    // sign function to switch display value between negative and positive
    sign() {
      this.current =
        this.current.charAt(0) === "-"
          ? this.current.slice(1)
          : `-${this.current}`;
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
  height: 420px;
  margin: 0 auto;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
}
.display {
  grid-column: 1 / 5;
  background: rgba(73, 155, 234, 1);
  padding-top: 10%;
  height: 55px;
  padding-right: 15px;
  color: white;
}
.btn {
  background-color: #f2f2f2;
  /* border: 1px solid #999; */
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
  /* background: #58585b; */
  background: cadetblue;
  color: white;
  font-size: 25px;
  padding-top: 5%;
}
</style>
