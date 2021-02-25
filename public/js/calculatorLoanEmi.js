var slider5 = document.getElementById("topCabinetsOutputLoanEmi");
var output5 = document.getElementById("top-cabinets-output");
output5.innerHTML = slider5.value;

slider5.oninput = function() {
  output5.innerHTML = this.value;
  setData();
}

var slider6 = document.getElementById("islandPeninsulaOutputLoanEmi");
var output6 = document.getElementById("island-peninsula-output");
output6.innerHTML = slider6.value;

slider6.oninput = function() {
  output6.innerHTML = this.value;
  setData();
}

var slider7 = document.getElementById("bottomCabinetsOutputLoanEmi");
var output7 = document.getElementById("bottom-cabinets-output");
output7.innerHTML = "₹" + slider7.value;

slider7.oninput = function() {
  output7.innerHTML = "₹" + this.value;
  setData();
}

// var slider8 = document.getElementById("pantryOutputLoanEmi");
// var output8 = document.getElementById("pantry-output");
// output8.innerHTML = slider8.value;

// slider8.oninput = function() {
//   output8.innerHTML = this.value;
// }

function emiCalculator(loanAmount, years, rate) {
  let months = years * 12.0;
  let newRate = rate / (1200.0);
  let emi = (loanAmount * newRate * Math.pow(1 + newRate, months)) / (Math.pow(1 + newRate, months) - 1);
  emi = Math.round(emi);
  // let remainingLoanAmount = loanAmount;
  // let currentMonthInterest = 0;
  // let currentMonth = 0;
  // while (remainingLoanAmount > 0 && emi > 0) {
  //     currentMonth++;
  //     currentMonthInterest = remainingLoanAmount * newRate;
  //     remainingLoanAmount = remainingLoanAmount - emi + currentMonthInterest;
  //     if (remainingLoanAmount < 0) {
  //         remainingLoanAmount = 0;
  //     }
  // }
  let finalAmount =emi*months;
  let totalInterest=finalAmount-loanAmount;
  return {emi,totalInterest,finalAmount};
}
function setData(){
  let {emi,totalInterest,finalAmount}=emiCalculator(Number(slider7.value),Number(slider5.value),Number(slider6.value));
  (document.getElementById("w-node-9ee24d94d473-8b259abe").children)[1].innerHTML=`₹ ${emi}`;
  (document.getElementById("w-node-total-interest").children)[1].innerHTML=`₹ ${totalInterest}`;
  (document.getElementById("w-node-87b0b35d7619-8b259abe").children)[1].innerHTML=`₹ ${finalAmount}`;
}
