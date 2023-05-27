const day = document.querySelector("#input-day");
const month = document.querySelector("#input-month");
const year = document.querySelector("#input-year");

const submitButton = document.querySelector("#submit");

const dayOutput = document.querySelector("#day");
const monthOutput = document.querySelector("#month");
const yearOutput = document.querySelector("#year");

let isValid = true;

const validateDate = (type, value, number) => {
  if (validateInput(type, value, number).length > 0) {
    type.nextElementSibling.innerHTML = validateInput(type, value, number);
    type.previousElementSibling.classList.add("error");
    type.classList.add("error");
    type.nextElementSibling.classList.add("error");
    isValid = false;
  } else {
    type.nextElementSibling.innerHTML = ``;
    type.previousElementSibling.classList.remove("error");
    type.classList.remove("error");
    type.nextElementSibling.classList.remove("error");
  }
};

const validateInput = (type, value, number) => {
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let currentDay = date.getDate();

  if (type.value.length === 0) {
    return `The ${value} field is required`;
  }
  if (isNaN(type.value)) {
    return `the ${value} must be a valid date`;
  }
  if (type.value > number || type.value == 0) {
    return `the ${value} must be a valid date`;
  }
  if (type === day && month.value == 4 && type.value == 31) {
    return `the ${value} must be a valid date`;
  }
  if (type === year && year.value < 1899) {
    return `the ${value} is not a valid date`;
  }
  if (
    type === day &&
    year.value == currentYear &&
    month.value - 1 == currentMonth &&
    day.value > currentDay
  ) {
    return `the ${value} must be in the past`;
  }
  if (
    type === month &&
    year.value == currentYear &&
    month.value - 1 > currentMonth
  ) {
    return `the ${value} must be in the past`;
  }

  return "";
};

const calculateAge = () => {
  let currentDate = new Date();
  let birthDate = new Date(year.value, month.value - 1, day.value);
  let timeDiff = currentDate - birthDate;

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const millisecondsPerMonth = 30 * millisecondsPerDay;
  const millisecondsPerYear = 365 * millisecondsPerDay;

  let years = Math.floor(timeDiff / millisecondsPerYear);
  timeDiff -= years * millisecondsPerYear;

  let months = Math.floor(timeDiff / millisecondsPerMonth);
  timeDiff -= months * millisecondsPerMonth;

  let days = Math.floor(timeDiff / millisecondsPerDay);

  let sumDay = 0;
  let sumMonth = 0;
  let sumYear = 0;

  const displayDays=()=> {
    dayOutput.innerText = sumDay;

    if (sumDay === days) {
      clearInterval(intervalDays);
    }
    sumDay++;
  }

  const displayMonths=()=> {
    monthOutput.innerText = sumMonth;
    if (sumMonth === months) {
      clearInterval(intervalMonths);
    }
    sumMonth++;
  }

  const displayYears=()=> {
    yearOutput.innerText = sumYear;
    if (sumYear === years) {
      clearInterval(intervalYears);
    }
    sumYear++;
  }

  let intervalYears = setInterval(displayYears, 10);
  let intervalMonths = setInterval(displayMonths, 10);
  let intervalDays = setInterval(displayDays, 10);
};

submitButton.addEventListener("click", () => {
  let date = new Date();
  let currentYear = date.getFullYear();

  isValid = true;
  validateDate(day, "day", 31);
  validateDate(month, "month", 12);
  validateDate(year, "year", currentYear);

  if (isValid) {
    calculateAge();
  }
});
