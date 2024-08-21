const input = document.getElementById("input-text");
const buttons = document.querySelectorAll("button");
let calculationDone = false;

function calculation(expression) {
  //   console.log(expression);
  try {
    return new Function("return " + expression)();
  } catch (error) {
    return `Error`;
  }
}

function operation(buttonValue) {
  if (
    calculationDone &&
    buttonValue !== "=" &&
    buttonValue !== "C" &&
    buttonValue !== "Del"
  ) {
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
