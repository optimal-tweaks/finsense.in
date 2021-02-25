function emiCalculator(loanAmount, years, rate) {
    let months = years * 12.0;
    let newRate = rate / (1200.0);
    let emi = (loanAmount * newRate * Math.pow(1 + newRate, months)) / (Math.pow(1 + newRate, months) - 1);
    emi = Math.round(emi);
    let remainingLoanAmount = loanAmount;
    let currentMonthInterest = 0;
    let currentMonth = 0;
    while (remainingLoanAmount > 0) {
        currentMonth++;
        currentMonthInterest = remainingLoanAmount * newRate;
        remainingLoanAmount = remainingLoanAmount - emi + currentMonthInterest;
        if (remainingLoanAmount < 0) {
            remainingLoanAmount = 0;
        }
    }
    return emi;
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

function growingSipCalculator(monthlyInvestment, years, expectedRateofReturn, sipRateofReturn) {
    expectedRateofReturn = (kthRoot(1 + (expectedRateofReturn / 100), 12) - 1) * 1200;
    let currentMonthlyInvesment = monthlyInvestment;
    let currentYearSIPInvesment = 0, cumulativeInvestment = 0, futureValue = 0;
    for (let yearIter = 1; yearIter <= years; yearIter++) {
        currentYearSIPInvesment = currentMonthlyInvesment * 12;
        cumulativeInvestment += currentYearSIPInvesment;
        futureValue = compoundforOneYearly(futureValue, expectedRateofReturn) + returnInAnYear(currentMonthlyInvesment, expectedRateofReturn);
        currentMonthlyInvesment += currentMonthlyInvesment * sipRateofReturn / 100;
        currentMonthlyInvesment = Math.round(currentMonthlyInvesment);
    }
    return futureValue;
}

function sipCalculator(initialInvestment, monthlyInvestment, currentAge, retirementAge, diffrenceRateOfReturn, expectedRateofReturn) {
    let years = retirementAge - currentAge;
    expectedRateofReturn = (kthRoot(1 + (expectedRateofReturn / 100), 12) - 1) * 1200;
    let expectedDirectRateofReturn = expectedRateofReturn;
    let expectedRegularRateofReturn = expectedRateofReturn - diffrenceRateOfReturn;
    let currentMonthlyInvesment = monthlyInvestment;
    let currentYearSIPInvesment = 0, cumulativeInvestment = initialInvestment, regularFutureValue = initialInvestment, directFutureValue = initialInvestment;
    for (let yearIter = 1; yearIter <= years; yearIter++) {
        currentYearSIPInvesment = currentMonthlyInvesment * 12;
        cumulativeInvestment += currentYearSIPInvesment;
        regularFutureValue = compoundforOneYearly(regularFutureValue, expectedRegularRateofReturn) + returnInAnYear(currentMonthlyInvesment, expectedRegularRateofReturn);
        directFutureValue = compoundforOneYearly(directFutureValue, expectedDirectRateofReturn) + returnInAnYear(currentMonthlyInvesment, expectedDirectRateofReturn);
        // currentMonthlyInvesment+=currentMonthlyInvesment*sipRateofReturn/100;
        // currentMonthlyInvesment=Math.round(currentMonthlyInvesment);
    }
    return regularFutureValue;
}

function kthRoot(n, k) {
    return Math.pow(k, ((1.0 / k) * (Math.log(n) / Math.log(k))));
}
