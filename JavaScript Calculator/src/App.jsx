import { useState } from "react";
import "./App.css";

function App() {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState("");
  const [equals, setEquals] = useState("");

  function handleClick(e) {
    const val = e.target.value;
    const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operator = ['+', '-', 'x', '/'];

    if (val === "0" && result === "0") {
      return; 
    }

    if (formula && operator.includes(formula[formula.length-1]) && operator.includes(val)) {
      let prev = formula.split('');
      prev.pop();
      setFormula(prev.join(''));
    }

    if(!formula && !arr.includes(val)) {
      return;
    }

    if (equals) {
      if (arr.includes(val)) {
        setFormula("");
        setResult("");
      }
      setEquals("");
    }

    if (arr.includes(val)){
      setResult((prev) => prev.split('').filter(el => !operator.includes(el)).join('') + val);
    }
    else {
      setResult(val);
    }
    setFormula((prev) => prev + val);
  }

  function calculate(expression) {
    if (expression.startsWith("x")) {
      expression = "1" + expression;
    }

    if (expression.startsWith("/")) {
      expression = "1" + expression; 
    }

    if (expression.startsWith("+")) {
      expression = "0" + expression;
    }
    expression = expression.replace(/x/g, "*");

    expression = expression.replace(/[*+-\/]$/, "");

    try {
      let result = eval(expression);
      setEquals(expression.replace(/\*/g, "x") + "=" + result);
      setFormula(result);
      setResult(result);
    } catch (error) {
      console.log("Error in calculation: " + error);
    }
  }

  function handleClear() {
    setFormula("");
    setResult("");
    setEquals("");
  }

  return (
    <>
      <div className="calculator">
        <div id="display">
          <div id="formula">{equals ? equals : formula }</div>
          <div id="result">{result ? result : 0}</div>
        </div>
        <button onClick={handleClear} value="AC" id="clear">
          AC
        </button>
        <button onClick={(e) => handleClick(e)} value="/" id="divide">
          /
        </button>
        <button onClick={(e) => handleClick(e)} value="x" id="multiply">
          x
        </button>
        <button onClick={(e) => handleClick(e)} value="7" id="seven">
          7
        </button>
        <button onClick={(e) => handleClick(e)} value="8" id="eight">
          8
        </button>
        <button onClick={(e) => handleClick(e)} value="9" id="nine">
          9
        </button>
        <button onClick={(e) => handleClick(e)} value="-" id="subtract">
          -
        </button>
        <button onClick={(e) => handleClick(e)} value="4" id="four">
          4
        </button>
        <button onClick={(e) => handleClick(e)} value="5" id="five">
          5
        </button>
        <button onClick={(e) => handleClick(e)} value="6" id="six">
          6
        </button>
        <button onClick={(e) => handleClick(e)} value="+" id="add">
          +
        </button>
        <button onClick={(e) => handleClick(e)} value="1" id="one">
          1
        </button>
        <button onClick={(e) => handleClick(e)} value="2" id="two">
          2
        </button>
        <button onClick={(e) => handleClick(e)} value="3" id="three">
          3
        </button>
        <button onClick={() => calculate(formula)} value="=" id="equals">
          =
        </button>
        <button onClick={(e) => handleClick(e)} value="0" id="zero">
          0
        </button>
        <button onClick={(e) => handleClick(e)} value="." id="decimal">
          .
        </button>
      </div>
      <span id="author">by hussain</span>
    </>
  );
}

export default App;
