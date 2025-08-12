import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function FinancialCalculator({ carDetail }) {
  const [carPrice, setCarPrice] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
  const [loanTerm, setLoanTerm] = useState(0)
  const [downPayment, setDownPayment] = useState(0)
  const [monthlyPayment,setMonthlyPayment]=useState(0)

  const CalculateMonthlyPayment = () => {
    const principal = carPrice - downPayment
    const monthlyInterestRate = interestRate / 1200

    if (principal <= 0 || monthlyInterestRate <= 0 || loanTerm <= 0) {
      alert("Please enter valid values for all fields.")
      return
    }

    const monthlyPayment = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) /
      (Math.pow(1 + monthlyInterestRate, loanTerm) - 1)

    setMonthlyPayment(monthlyPayment.toFixed(2))
    
  }

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
      <h2 className='font-medium text-2xl'>Financial Calculator</h2>

      <div className='flex gap-5 mt-5'>
        <div className='w-full'>
          <label>Price $</label>
          <Input
            type='number'
            value={carPrice}
            onChange={(e) => setCarPrice(parseFloat(e.target.value))}
          />
        </div>

        <div className='w-full'>
          <label>Interest Rate (%)</label>
          <Input
            type='number'
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className='flex gap-5 mt-5'>
        <div className='w-full'>
          <label>Loan Term (Months)</label>
          <Input
            type='number'
            value={loanTerm}
            onChange={(e) => setLoanTerm(parseInt(e.target.value))}
          />
        </div>

        <div className='w-full'>
          <label>Down Payment $</label>
          <Input
            type='number'
            value={downPayment}
            onChange={(e) => setDownPayment(parseFloat(e.target.value))}
          />
        </div>
      </div>

      { monthlyPayment>0 && <h2 className='font-medium text-2xl mt-5'>Your Monthly Payment Is: <span className='text-4xl font-bold'>${monthlyPayment}</span> </h2>}

      <Button
        className='bg-red-900 w-full mt-5'
        size="lg"
        onClick={CalculateMonthlyPayment}
      >
        Calculate
      </Button>
    </div>
  )
}

export default FinancialCalculator
