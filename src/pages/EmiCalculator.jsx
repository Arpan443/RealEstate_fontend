import { useState, useMemo } from 'react';

function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState('5000000');
  const [interestRate, setInterestRate] = useState('10');
  const [tenureYears, setTenureYears] = useState('20');

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const P = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const years = parseFloat(tenureYears) || 0;

    if (P <= 0 || annualRate <= 0 || years <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 };
    }

    const r = annualRate / 12 / 100; // monthly interest rate
    const n = years * 12; // total months

    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaymentValue = emiValue * n;
    const totalInterestValue = totalPaymentValue - P;

    return {
      emi: emiValue,
      totalInterest: totalInterestValue,
      totalPayment: totalPaymentValue,
    };
  }, [loanAmount, interestRate, tenureYears]);

  const formatNumber = (num) =>
    Math.round(num).toLocaleString('en-IN');

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          EMI Calculator
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Estimate your monthly home loan payment
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan Amount (Rs.)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
            />
            <input
              type="range"
              min="500000"
              max="50000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Interest Rate (% per year)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
            />
            <input
              type="range"
              min="1"
              max="25"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
            />
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              className="w-full mt-2"
            />
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 text-center mb-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Monthly EMI</p>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              Rs. {formatNumber(emi)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Interest</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Rs. {formatNumber(totalInterest)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Payment</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Rs. {formatNumber(totalPayment)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmiCalculator;