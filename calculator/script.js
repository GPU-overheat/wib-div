const input = document.getElementById("input-text");
const buttons = document.querySelectorAll("button");

let calculationDone = false;

function calculation(expression) {
  try {
    return new Function("return " + expression)();
  } catch (error) {
    return `Malformed Operation`;
  }
}

function operation(buttonValue) {
  if (calculationDone && buttonValue !== "=" && buttonValue !== "C" && buttonValue !== "Del") {
    input.value = "";
    calculationDone = false;
  }

  if (buttonValue === "C") {
    input.value = "";
  } else if (buttonValue === "Del") {
    input.value = input.value.slice(0, -1);
  } else if (buttonValue === "=") {
    input.value = calculation(input.value);
    calculationDone = true;
  } else {
    input.value += buttonValue;
  }
}

buttons.forEach((button) => {
  let buttonValue = button.innerText;
  button.addEventListener("click", function () {
    operation(buttonValue);
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    operation(key);
  } else if (key === "Enter" || key === '=') {
    operation("=");
  } else if (key === "Backspace") {
    operation("Del");
  } else if (key.toUpperCase() === "C") {
    operation("C");
  }
});
