const rows = document.querySelectorAll(".rgRow, .rgAltRow");
const inputs = document.querySelectorAll("input[type=text]");
const selectInputs = document.querySelectorAll("select");
const hiddenInputs = document.querySelectorAll("input[type=hidden]");

const priceRowArray = Array.from(rows);
const inputArray = Array.from(inputs);
const selectArray = Array.from(selectInputs);
const hiddenInputsArray = Array.from(hiddenInputs);

const priceIds = priceRowArray
  .map((row) => row.id)
  .filter((id) => !id.includes("Results") && !id.includes("Detail"));
const inputIds = inputArray
  .map((input) => input.id)
  .filter((id) => id.includes("txtAmount") || id.includes("PmtType"));
const typeIds = selectArray
  .map((select) => select.id)
  .filter((id) => id.includes("PmtType"));
const hiddenIds = hiddenInputsArray
  .map((input) => input.id)
  .filter((id) => id.includes("txtAmount"));

const typeValue = 4;

const adjustAll = () => {
  priceIds.forEach((id, index) => {
    const row = document.getElementById(id);
    let adjustValue = row.children[6].innerHTML;
    const payment = row.children[5].innerHTML;
    const input = document.getElementById(inputIds[index]);
    const select = document.getElementById(typeIds[index]);
    const hiddenInput = document.getElementById(hiddenIds[index]);

    if (payment !== "$0.00") {
      input.value = adjustValue;
      select.value = typeValue;

      const stringValueF = () => {
        let value = adjustValue;

        if (adjustValue.startsWith("(")) {
          value = value.substring(2, value.length - 1);
          value = `-${value}`;
          return value;
        }

        value = value.slice(1);

        return value;
      };

      const stringValue = stringValueF();

      const parsedObj = JSON.parse(hiddenInput.value);
      hiddenInput.value = JSON.stringify({
        ...parsedObj,
        validationText: stringValue,
        valueAsString: stringValue,
        lastSetTextBoxValue: adjustValue,
      });
    }
  });
};

const adjustButton = document.getElementById("adjustAll");
adjustButton.addEventListener("click", adjustAll);
