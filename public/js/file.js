const selectOption = document.getElementById("select-option");
const columnSelectContainer = document.getElementById(
  "column-select-container"
);
const rowSelectContainer = document.getElementById("row-select-container");
const formulaSelectContainer = document.getElementById(
  "formula-select-container"
);
const resultButtonContainer = document.getElementById(
  "result-button-container"
);

selectOption.addEventListener("change", function () {
  const selectedOption = selectOption.value;

  // Hide all containers
  columnSelectContainer.style.display = "none";
  rowSelectContainer.style.display = "none";
  formulaSelectContainer.style.display = "none";
  resultButtonContainer.style.display = "none";

  if (selectedOption === "columns") {
    columnSelectContainer.style.display = "block";
    formulaSelectContainer.style.display = "block";
    resultButtonContainer.style.display = "block";
  } else if (selectedOption === "rows") {
    rowSelectContainer.style.display = "block";
    formulaSelectContainer.style.display = "block";
    resultButtonContainer.style.display = "block";
  }
});

let data = JSON.parse("<%- unescape(JSON.stringify(data)) %>");
console.log(data);

function calculateResult() {
  const selectedOption = selectOption.value;
  const columnSelect = document.getElementById("column-select");
  const rowSelect = document.getElementById("row-select");
  const formulaSelect = document.getElementById("formula-select");
  const resultContainer = document.createElement("div");
  resultContainer.className = "result-container"; // Add a CSS class for styling

  const selectedColumn = columnSelect.value;
  const selectedRow = rowSelect.value;
  const selectedFormula = formulaSelect.value;

  // Calculation for columns
  if (selectedOption === "columns" && selectedColumn) {
    const columnValues = data.map((item) => item[selectedColumn]);

    if (columnValues.length === 0) {
      const errorMessage = createErrorMessage(
        "Invalid Operation: No values present in the column"
      );
      resultContainer.appendChild(errorMessage);
    } else {
      const numbersArray = columnValues.filter(
        (value) => typeof value === "number"
      );
      console.log(numbersArray);

      if (numbersArray.length === 0) {
        const errorMessage = createErrorMessage(
          "Invalid Operation: No numbers present in the column"
        );
        resultContainer.appendChild(errorMessage);
      } else {
        let result;

        if (selectedFormula === "SUM") {
          result = numbersArray.reduce((sum, value) => sum + value, 0);
        } else if (selectedFormula === "DIFFERENCE") {
          result = numbersArray.reduce((diff, value) => diff - value);
        }

        const resultMessage = createResultMessage("Result: " + result);
        resultContainer.appendChild(resultMessage);
      }
    }
  }

  // Calculation for rows
  if (selectedOption === "rows" && selectedRow) {
    const rowValues = Object.values(data[selectedRow]);
    console.log("rowValues", rowValues);

    if (!rowValues) {
      const errorMessage = createErrorMessage(
        "Invalid Operation: Row does not exist"
      );
      resultContainer.appendChild(errorMessage);
    } else {
      const numbersArray = rowValues.filter(
        (value) => typeof value === "number"
      );
      console.log(numbersArray);

      if (numbersArray.length === 0) {
        const errorMessage = createErrorMessage(
          "Invalid Operation: No numbers present in the row"
        );
        resultContainer.appendChild(errorMessage);
      } else {
        let result;

        if (selectedFormula === "SUM") {
          result = numbersArray.reduce((sum, value) => sum + value, 0);
        } else if (selectedFormula === "DIFFERENCE") {
          result = numbersArray.reduce((diff, value) => diff - value);
        }

        const resultMessage = createResultMessage("Result: " + result);
        resultContainer.appendChild(resultMessage);
      }
    }
  }

  // Remove previous result element from the body
  const previousResultContainer = document.querySelector(".result-container");
  if (previousResultContainer) {
    previousResultContainer.remove();
  }

  // Append the new result container to the body
  document.body.appendChild(resultContainer);
}

function createErrorMessage(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.className = "error-message"; // Add a CSS class for styling
  return errorMessage;
}

function createResultMessage(message) {
  const resultMessage = document.createElement("p");
  resultMessage.textContent = message;
  resultMessage.className = "result-message"; // Add a CSS class for styling
  return resultMessage;
}
