//Difference Rate
const schemes = {
  "Mirae Asset Large Cap Fund": 1.04,
  "L&T India Large Cap Fund": 0.97,
  "Kotak Emerging Equity Fund": 1.30,
  "ICICI Prudential Midcap Fund": 1.04,
  "Motilal Oswal Midcap 30 Fund": 1.21,
  "Mirae Asset Midcap Fund": 1.32,
  "HDFC Retirement Savings Fund": 1.15,
  "Axis Bluechip Fund": 1.27,
  "SBI Blue Chip Fund": 0.86,
  "Aditya Birla Sun Life Focused Fund": 0.99,
  "Tata Digital India Fund": 1.08,
  "Invesco India Tax Plan - ELSS": 1.26,
  "Axis Long term Equity Fund - ELSS": 0.81,
  "Mirae Tax Saver Fund - ELSS": 1.38,
  "Kotak Standard Multicap Fund": 0.96,
  "Motilal Oswal Multicap 35 Fund": 1.04,
  "HDFC Small Cap Fund": 1.00,
  "Mirae Asset Healthcare Fund": 1.60,
  "HDFC India Sensex Fund": 0.20,
  "Motilal Oswal Nifty 50 Index Fund": 0.40,
  "Axis Credit Risk Fund": 1.09,
  "IDFC Banking & PSU Debt Fund": 0.35,
  "Others": 1.00,
  "Choose a Fund Type": 0
};

window.onload = function () {
  this.createDropdown();
  getFundSelection();
}

// let selection = document.getElementById("selectFund").value;
// let fundTypeRate = schemes[selection];

var slider9 = document.getElementById("topCabinetsOutputDirectIndirect");
var output9 = document.getElementById("top-cabinets-output");
output9.innerHTML = slider9.value;

slider9.oninput = function () {
  output9.innerHTML = this.value;
  getFundSelection();
}

var slider10 = document.getElementById("islandPeninsulaOutputDirectIndirect");
var output10 = document.getElementById("island-peninsula-output");
output10.innerHTML = slider10.value;

slider10.oninput = function () {
  output10.innerHTML = this.value;
  getFundSelection();
}

var slider11 = document.getElementById("bottomCabinetsOutputDirectIndirect");
var output11 = document.getElementById("bottom-cabinets-output");
output11.innerHTML = "₹" + slider11.value;

slider11.oninput = function () {
  output11.innerHTML = "₹" + this.value;
  getFundSelection();
}

var slider12 = document.getElementById("pantryOutputDirectIndirect");
var output12 = document.getElementById("pantry-output");
output12.innerHTML = "₹" + slider12.value;

slider12.oninput = function () {
  output12.innerHTML = "₹" + this.value;
  getFundSelection();
}

function createDropdown() {
  let select = document.getElementById("selectFund");
  let options = Object.keys(schemes);
  options.forEach(option => {
    let opt = option;
    let el = document.createElement("option");
    el.text = opt;
    el.value = opt;
    select.add(el);
  })
}

function getFundSelection() {
  let selection = document.getElementById("selectFund").value;
  let fundTypeRate = schemes[selection];
  setData(fundTypeRate);
}

function sipCalculator(initialInvestment, monthlyInvestment, years, diffrenceRateOfReturn, expectedRateofReturn) {
  // years = 16
  // initialInvestment = 4683611
  // monthlyInvestment = 153009
  // expectedRateofReturn = 14
  // diffrenceRateOfReturn = 1.60
  // let years = retirementAge - currentAge;
  expectedRateofReturn = (kthRoot(1 + (expectedRateofReturn / 100), 12) - 1) * 1200;
  diffrenceRateOfReturn = (kthRoot(1 + (diffrenceRateOfReturn / 100), 12) - 1) * 1200;
  let expectedDirectRateofReturn = expectedRateofReturn;
  let expectedRegularRateofReturn = expectedRateofReturn - diffrenceRateOfReturn; // CHECK
  console.log("---", diffrenceRateOfReturn)
  let currentMonthlyInvesment = monthlyInvestment;
  let currentYearSIPInvesment = 0, cumulativeInvestment = 0, regularFutureValue = initialInvestment, directFutureValue = initialInvestment;

  let yearlyData = {
    regularFutureValue: [],
    directFutureValue: []
  }
  for (let yearIter = 1; yearIter <= years; yearIter++) {
    currentYearSIPInvesment = currentMonthlyInvesment * 12;
    cumulativeInvestment += currentYearSIPInvesment;
    regularFutureValue = compoundforOneYearly(regularFutureValue, expectedRegularRateofReturn) + returnInAnYear(currentMonthlyInvesment, expectedRegularRateofReturn);
    directFutureValue = compoundforOneYearly(directFutureValue, expectedDirectRateofReturn) + returnInAnYear(currentMonthlyInvesment, expectedDirectRateofReturn);
    yearlyData.regularFutureValue.push(regularFutureValue);
    yearlyData.directFutureValue.push(directFutureValue);
  }
  return { regularFutureValue, directFutureValue, yearlyData };
}

function kthRoot(n, k) {
  return Math.pow(k, ((1.0 / k) * (Math.log(n) / Math.log(k))));
}

function compoundforOneYearly(principal, rate) {
  // Calculate Amount after One year compounded monthly at given interest rate%
  let amount = principal * (Math.pow((1 + (rate / 1200)), 12));
  return amount;
}

function returnInAnYear(monthlyDeposit, rate) {
  // Calculate Amount after One year on monthly deposit compounded monthly at
  // given interest rate
  let amount = 0;
  for (let i = 12; i > 0; i--) {
    amount += monthlyDeposit * (Math.pow((1 + (rate / 1200)), i));
  }
  return amount;
}

function setData(fundTypeRate) {
  let { regularFutureValue, directFutureValue, yearlyData } = sipCalculator(Number(slider11.value), Number(slider12.value), Number(slider9.value), Number(fundTypeRate), Number(slider10.value));
  (document.getElementById("w-node-9ee24d94d473-28af4427").children)[1].innerHTML = `₹ ${Math.ceil(regularFutureValue)}`;
  (document.getElementById("w-node-direct").children)[1].innerHTML = `₹ ${Math.ceil(directFutureValue)}`;
  (document.getElementById("w-node-extra-return").children)[1].innerHTML = `₹ ${Math.ceil(directFutureValue - regularFutureValue)}`;
  (document.getElementById("w-node-extra-returns-percent").children)[1].innerHTML = `${Math.ceil((directFutureValue - regularFutureValue) * 100 / regularFutureValue)}`;
  plotChart(yearlyData);
}

function plotChart(data) {
  console.log("plotted data");
  var ctx = document.getElementById('myChart');
  console.log(data.regularFutureValue);
  console.log(data.directFutureValue)
  let years = [];
  for (let i = 1; i <= data.regularFutureValue.length; i++) {
    years.push(i);
  }
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Today", ...years],
      datasets: [{
        label: 'Regular Funds',
        data: [0, ...data.regularFutureValue],
        borderWidth: 2,
        pointBackgroundColor: 'rgb(169,169,169)',
        borderColor: 'rgb(169,169,169)',
        // cubicInterpolationMode: 'monotonic'
        fill: false
      },
      {
        label: 'Direct Funds',
        data: [0, ...data.directFutureValue],
        borderWidth: 4,
        pointBackgroundColor: 'rgb(0,128,0)',
        borderColor: 'rgb(0,128,0)',
        fill: false
        // cubicInterpolationMode: 'monotonic'
      }]
    },
    // options: {
    //   scales: {
    //     yAxes: [{
    //       ticks: {
    //         beginAtZero: true
    //       }
    //     }]
    //   }
    // }
  });
}


