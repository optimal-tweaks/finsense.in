window.onload = function () {
  setData();
}

var slider1 = document.getElementById("topCabinetsOutput");
var output1 = document.getElementById("top-cabinets-output");
output1.innerHTML = slider1.value;

slider1.oninput = function () {
  output1.innerHTML = this.value;
  setData();
}

var slider2 = document.getElementById("islandPeninsulaOutput");
var output2 = document.getElementById("island-peninsula-output");
output2.innerHTML = slider2.value;

slider2.oninput = function () {
  output2.innerHTML = this.value;
  setData();
}

var slider3 = document.getElementById("bottomCabinetsOutput");
var output3 = document.getElementById("bottom-cabinets-output");
output3.innerHTML = "₹" + slider3.value;

slider3.oninput = function () {
  output3.innerHTML = "₹" + this.value;
  setData();
}

var slider4 = document.getElementById("pantryOutput");
var output4 = document.getElementById("pantry-output");
output4.innerHTML = slider4.value;

slider4.oninput = function () {
  output4.innerHTML = this.value;
  setData();
}

function growingSipCalculator(monthlyInvestment, years, sipRateofReturn, expectedRateofReturn) {
  let response = {
    futureValueOfInvestment: 0,
    yearlyDetails: {
      futureValue: [],
      investment: []
    },
    totalInvestment: 0,
    years: 0
  };
  expectedRateofReturn = (kthRoot(1 + (expectedRateofReturn / 100), 12) - 1) * 1200;
  var currentMonthlyInvesment = monthlyInvestment;
  var currentYearSIPInvesment = 0, cumulativeInvestment = 0, futureValue = 0;
  for (var yearIter = 1; yearIter <= years; yearIter++) {
    currentYearSIPInvesment = currentMonthlyInvesment * 12;
    cumulativeInvestment += currentYearSIPInvesment;
    futureValue = compoundforOneYearly(futureValue, expectedRateofReturn) + returnInAnYear(currentMonthlyInvesment, expectedRateofReturn);
    response.yearlyDetails.futureValue.push(futureValue);
    response.yearlyDetails.investment.push(cumulativeInvestment);

    currentMonthlyInvesment += currentMonthlyInvesment * sipRateofReturn / 100;
  }
  response.totalInvestment = cumulativeInvestment;
  response.futureValueOfInvestment = futureValue;
  response.years = years;

  return response;
}

function kthRoot(n, k) {
  return Math.pow(k, ((1.0 / k) * (Math.log(n) / Math.log(k))));
}

function compoundforOneYearly(principal, rate) {
  //Calculate Amount after One year compounded monthly at given  interest rate %
  var amount = principal * (Math.pow((1 + (rate / 1200)), 12));
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

function setData() {
  let { futureValueOfInvestment, yearlyDetails, totalInvestment, years } = growingSipCalculator(Number(slider3.value), Number(slider1.value), Number(slider4.value), Number(slider2.value));
  (document.getElementById("w-node-9ee24d94d473-c62fb2ae").children)[1].innerHTML = `₹ ${Math.ceil(totalInvestment)}`;
  (document.getElementById("w-node-future-value-investment").children)[1].innerHTML = `₹ ${Math.ceil(futureValueOfInvestment)}`;
  (document.getElementById("w-node-87b0b35d7619-c62fb2ae").children)[1].innerHTML = `₹ ${Math.ceil(futureValueOfInvestment - totalInvestment)}`;
  plotChart(yearlyDetails);
}

function plotChart(data) {
  console.log("plotted data");
  var ctx = document.getElementById('myChart');
  console.log(data.futureValue);
  console.log(data.investment)
  let years = [];
  for (let i = 1; i <= data.investment.length; i++) {
    years.push(i);
  }
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Today", ...years],
      datasets: [{
        label: 'Investment',
        data: [0, ...data.investment],
        borderWidth: 2,
        pointBackgroundColor: 'rgb(169,169,169)',
        borderColor: 'rgb(169,169,169)',
        fill: false,
        lineTension: 0,
      },
      {
        label: 'Future Value',
        data: [0, ...data.futureValue],
        borderWidth: 4,
        pointBackgroundColor: 'rgb(0,128,0)',
        borderColor: 'rgb(0,128,0)',
        fill: false
      }]
    },
  });
}