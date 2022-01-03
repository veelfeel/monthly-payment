// Значение из текстовых инпутов
const totalCost = document.getElementById("total-cost");
const anInitialFee = document.getElementById("an-initial-fee");
const creditTerm = document.getElementById("credit-term");

// Значение из range инпутов
const totalCostRange = document.getElementById("total-cost-range");
const anInitialFeeRange = document.getElementById("an-initial-fee-range");
const creditTermRange = document.getElementById("credit-term-range");

// Итоговые значения
const totalAmountOfCredit = document.getElementById("amount-of-credit");
const totalMonthlyPayment = document.getElementById("monthly-payment");
const totalRecommendedIncome = document.getElementById("recommended-income");

// Все range
const inputsRange = document.querySelectorAll(".input-range");

// Все кнопки с процентной ставкой
const bankBtns = document.querySelectorAll(".bank");

const assignValue = () => {
  totalCost.value = totalCostRange.value;
  anInitialFee.value = anInitialFeeRange.value;
  creditTerm.value = creditTermRange.value;
};

assignValue();

const banks = [
  {
    name: "alfa",
    precents: 8.7,
  },
  {
    name: "sberbank",
    precents: 8.4,
  },
  {
    name: "pochta",
    precents: 7.9,
  },
  {
    name: "tinkoff",
    precents: 9.2,
  },
];

let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
  bank.addEventListener("click", () => {
    for (let item of bankBtns) {
      item.classList.remove("active");
    }
    bank.classList.add("active");
    takeActiveBank(bank);
  });
}

const takeActiveBank = (currentActive) => {
  const dataAttrValue = currentActive.dataset.name;
  const currentBank = banks.find((bank) => bank.name === dataAttrValue);
  currentPrecent = currentBank.precents;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

for (let input of inputsRange) {
  input.addEventListener("input", () => {
    assignValue();
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
  });
}

const calculation = (
  totalCost = 1000000,
  anInitialFee = 100000,
  creditTerm = 1
) => {
  // ЕП - ежемесячный платеж
  // РК - размер кредита
  // ПС - процентная ставка
  // КМ - количество месяцев
  // ЕП = (РК + (((РК / 100) * ПС) / 12) * КМ) / КМ

  let monthlyPayment; // Ежемесячный платеж
  let lounAmount = totalCost - anInitialFee; // Размер кредита
  let interestRate = currentPrecent; // Процентная ставка
  let numberOfYears = creditTerm; // Количество лет
  let numberOfMonths = 12 * numberOfYears; // Количество месяцев

  monthlyPayment =
    (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) /
    numberOfMonths;
  const monthlyPaymentArounded = Math.round(monthlyPayment);

  if (monthlyPaymentArounded < 0) {
    return false;
  } else {
    totalAmountOfCredit.innerHTML = `${Math.round(
      lounAmount
    ).toLocaleString()} ₽`;
    totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded.toLocaleString()} ₽`;
    totalRecommendedIncome.innerHTML = `${Math.round(
      monthlyPaymentArounded + (monthlyPaymentArounded / 100) * 35
    ).toLocaleString()} ₽`;
  }
};

// Имитируем выбор стоимости недвижимости
totalCost.value = 4800000;
totalCostRange.value = totalCost.value;

function prover() {
  const anInitAtrrMin = totalCost.value / 10;
  if (totalCost.value > anInitAtrrMin) {
    anInitialFeeRange.setAttribute("min", anInitAtrrMin);
  }
}

// Имитируем выбор первоначального взноса
anInitialFee.value = 1500000;
prover();
anInitialFeeRange.value = anInitialFee.value;

// Имитируем выбор срока кредита
creditTerm.value = 10;
creditTermRange.value = creditTerm.value;

// Имитируем нажатие на первую кнопку банка
document.querySelector(".bank").click();

// Всплывающее уведомление Минимальная сумма 1 млн. рублей
function startTextAlertTotalCost() {
  const textAlertTotalCost = document.querySelector(".text-alert-totalcost");

  textAlertTotalCost.classList.add("active");
  setTimeout(() => {
    textAlertTotalCost.classList.remove("active");
  }, 4000);
}

// Всплывающее уведомление Минимальная сумма первоначального взноса 10%
function startTextAlertAnInitialFee() {
  const textAlertAnInitialFee = document.querySelector(
    ".text-alert-aninitialfee"
  );

  textAlertAnInitialFee.classList.add("active");
  setTimeout(() => {
    textAlertAnInitialFee.classList.remove("active");
  }, 4000);
}

// Всплывающее уведомление Максимальный срок кредита 20 лет
function startTextAlertCreditTerm() {
  const textAlertCreditTerm = document.querySelector(".text-alert-creditterm");

  textAlertCreditTerm.classList.add("active");
  setTimeout(() => {
    textAlertCreditTerm.classList.remove("active");
  }, 4000);
}

//  Связываем ползунки с числовыми инпутами
totalCostRange.addEventListener("input", function (e) {
  if (totalCostRange.value < 1) {
    totalCostRange.value = 0;
  } else {
    const costMinusTenPercentRangeTotalCost = Math.round(
      totalCost.value - (totalCost.value / 100) * 10
    );
    const anInitAtrributeMin = Math.round(totalCost.value / 10);
    anInitialFeeRange.setAttribute("min", anInitAtrributeMin);
    anInitialFee.setAttribute("min", anInitAtrributeMin);
    anInitialFeeRange.setAttribute("max", costMinusTenPercentRangeTotalCost);
    anInitialFee.setAttribute("max", costMinusTenPercentRangeTotalCost);
    anInitialFee.value = anInitAtrributeMin;
    if (anInitialFee.value > costMinusTenPercentRangeTotalCost) {
      anInitialFee.value = Math.round(costMinusTenPercentRangeTotalCost);
    }
  }
  totalCost.value = e.target.value;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);
});

totalCost.addEventListener("input", function (e) {
  if (totalCost.value < 1) {
    totalCostRange.value = 0;
  }
  if (totalCost.value > 999999 && totalCost.value < 9999999) {
    const anInitMaxAttribute = totalCost.value - (totalCost.value / 100) * 10;
    const anInitMinAttribute = Math.round(totalCost.value / 10);
    anInitialFeeRange.setAttribute("max", anInitMaxAttribute);
    anInitialFeeRange.setAttribute("min", anInitMinAttribute);
    anInitialFee.value = anInitialFeeRange.getAttribute("min");
    anInitialFeeRange.value = anInitialFee.value;
  }
  if (totalCost.value > 9999999) {
    totalCost.value = 10000000;
    const costInputInitialRange = Math.round(
      totalCost.value - (totalCost.value / 100) * 10
    );
    const costInputInitRangeMix = totalCost.value / 10;
    anInitialFeeRange.setAttribute("min", costInputInitRangeMix);
    anInitialFeeRange.setAttribute("max", costInputInitialRange);
    anInitialFee.value = anInitialFeeRange.getAttribute("min");
    anInitialFeeRange.value = anInitialFee.value;

    totalCostRange.value = e.target.value;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
  } else {
    totalCostRange.value = e.target.value;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
  }
});

anInitialFeeRange.addEventListener("input", function (e) {
  if (anInitialFeeRange.value < 1) {
    anInitialFeeRange.value = 0;
  } else {
    const costMinusTenPercentRange =
      totalCost.value - (totalCost.value / 100) * 10;
    anInitialFeeRange.setAttribute("max", costMinusTenPercentRange);
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
  }
  anInitialFee.value = e.target.value;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);
});

anInitialFee.addEventListener("input", function (e) {
  if (anInitialFee.value < 1) {
    anInitialFeeRange.value = 0;
  }
  if (anInitialFee.value > totalCost.value / 10 - 1) {
    const costMinusTenPercent = Math.round(
      totalCost.value - (totalCost.value / 100) * 10
    );
    anInitialFeeRange.setAttribute("max", costMinusTenPercent);
    anInitialFee.value = anInitialFeeRange.getAttribute("max");
    anInitialFeeRange.value = e.target.value;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
  }
});

creditTermRange.addEventListener("input", function (e) {
  creditTerm.value = e.target.value;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);
});

creditTerm.addEventListener("input", function (e) {
  if (creditTerm.value < 1) {
    creditTermRange.value = 0;
  } else {
    creditTermRange.value = e.target.value;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    if (creditTerm.value > 20) {
      creditTerm.value = 20;
      creditTermRange.value = e.target.value;
      calculation(totalCost.value, anInitialFee.value, creditTerm.value);

      // Показываем уведомление Максимальный срок кредита 20 лет
      startTextAlertCreditTerm();
    }
  }
});

// После очистки полей инпутов вставляем в них числа по умолчанию и соединяем ползунки с инпутами
totalCost.addEventListener("change", function (e) {
  if (totalCost.value < 1000000) {
    totalCost.value = 1000000;
    const costChangeInitialRange =
      totalCost.value - (totalCost.value / 100) * 10;
    const costChangeInitialRangeMin = totalCost.value / 10;
    anInitialFeeRange.setAttribute("min", costChangeInitialRangeMin);
    anInitialFeeRange.setAttribute("max", costChangeInitialRange);
    anInitialFee.value = costChangeInitialRange;
  }
  totalCostRange.value = e.target.value;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);

  // Показываем уведомление Минимальная сумма 1 млн. рублей
  startTextAlertTotalCost();
});

anInitialFee.addEventListener("change", function (e) {
  if (anInitialFee.value < totalCost.value / 10) {
    anInitialFee.value = totalCost.value / 10;
    const anInitMax = totalCost.value - (totalCost.value / 100) * 10;
    anInitialFeeRange.setAttribute("max", anInitMax);

    // Показываем уведомление Минимальная сумма первоначального взноса 10%
    startTextAlertAnInitialFee();
  } else {
    anInitialFee.value = anInitialFeeRange.value;
  }
  anInitialFeeRange.value = e.target.value;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);
});

creditTerm.addEventListener("change", function (e) {
  if (creditTerm.value < 1) {
    creditTerm.value = 1;
  }
  creditTermRange.value = e.target.value;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);
});
