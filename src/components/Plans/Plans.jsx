import { Title } from '../common'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types'
import data from '../../data'

const Plans = () => {
  const location = useLocation()
  const { pathname } = location

  const useLocalStorage = (key, initialValue) => {
    const storedValue = JSON.parse(localStorage.getItem(key))
    const [value, setValue] = useState(storedValue || initialValue)

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
  }

  const [planValues, setPlanValues] = useLocalStorage('planValues', {
    planFrequency: 'monthly',
    price: 9,
    selectedPlan: 'arcade',
  })

  return (
    <div className="flex lg:w-[28.125rem] lg:mt-[2rem] lg:ml-[6.25rem]">
      {data.map((item) => {
        const { id, fields, slug } = item

        if (pathname === slug) {
          return (
            <div className="flex flex-col justify-between h-full w-[inherit]" key={id}>
              {fields.map((field) => {
                const { id, title, subtitle, plans } = field

                const { priceMonthly, priceYearly } = plans.map((plan) => plan).find((plan) => plan.value === planValues.selectedPlan)

                return (
                  <div className="flex flex-col" key={id}>
                    <Title title={title} subtitle={subtitle} />

                    <div className="
                      flex
                      lg:flex-row flex-col
                      justify-between 
                      lg:gap-[1.12rem] gap-[0.75rem]
                      mb-[2rem]
                    ">
                      {plans.map((plan) => (
                        <Plan
                          key={plan.id}
                          plan={plan}
                          planValues={planValues}
                          setPlanValues={setPlanValues}
                        />
                      ))}
                    </div>

                    <div className="flex h-[3rem] bg-very-light-gray rounded-[0.5rem] items-center justify-center">
                      <PlanFrequencyToggle
                        priceMonthly={priceMonthly}
                        priceYearly={priceYearly}
                        planValues={planValues}
                        setPlanValues={setPlanValues}
                        price={planValues.price}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

const Plan = ({ plan, planValues, setPlanValues }) => {
  const { label, icon, priceMonthly, priceYearly, discount, value } = plan

  const isSelected = value === planValues.selectedPlan

  const handleClick = () => {
    setPlanValues({
      ...planValues,
      price: planValues.planFrequency === 'monthly' ? priceMonthly : priceYearly,
      selectedPlan: value,
    })
  }

  return (
    <div
      className={
      `flex 
      lg:flex-col 
      lg:w-[8.625rem] 
      rounded-[0.5rem] 
      cursor-pointer 
      border-[1px] 
      hover:border-purple 
      transition 
      border-border-color 
      lg:py-[1.25rem] lg:px-[1rem] p-[1rem]
      ${isSelected ? 'bg-very-light-gray border-purple' : 'bg-white'}
      `}
      onClick={handleClick}
    >
      {/* ICON */}
      <div className="
        lg:w-[2.5rem] 
        lg:h-[2.5rem] 
        lg:mb-[2.44rem]
        mr-[0.87rem]
      ">
        <img src={`./images/icon-${icon}.svg`} alt={icon} />
      </div>
      {/* RIGHT CONTAINER */}
      <div className='flex flex-col'>
        <div className="
          text-[1rem] 
          text-denim 
          font-bold 
          mb-[0.44rem]
        ">
          {label}
        </div>

        <div className="text-sm font-normal text-gray">
          {planValues.planFrequency === 'monthly' ? `$${priceMonthly}/mo` : `$${priceYearly}/yr`}
        </div>

        {planValues.planFrequency === 'yearly' && (
          <span className="font-normal text-xs text-denim mt-[0.44rem]">
            {discount}
          </span>
        )}
      </div>

    </div>
  )
}

const PlanFrequencyToggle = ({ priceMonthly, priceYearly, planValues, setPlanValues }) => {

  const handlePlanFrequency = () => {
    setPlanValues({
      ...planValues,
      planFrequency: planValues.planFrequency === 'monthly' ? 'yearly' : 'monthly',
      price: planValues.planFrequency === 'monthly' ? priceYearly : priceMonthly,
    })
  }

  return (
    <div className="flex items-center justify-center">
      <span
        className={`mr-6 font-medium text-sm ${
          planValues.planFrequency === 'monthly' ? 'text-denim transition' : 'text-gray transition'
        }`}
      >
        Monthly
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handlePlanFrequency}
          checked={planValues.planFrequency === 'yearly'}
        />
        <div className="w-[2.375rem] h-[1.25rem] bg-gray-200 peer-focus:outline-none rounded-full peer bg-denim peer-checked:after:translate-x-[1.10rem] after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
      </label>
      <span
        className={`ml-6 font-medium text-sm ${
          planValues.planFrequency === 'yearly' ? 'text-denim transition' : 'text-gray transition'
        }`}
      >
        Yearly
      </span>
    </div>
  )
}

export default Plans

Plan.propTypes = {
  plan: PropTypes.object,
  planValues: PropTypes.object,
  setPlanValues: PropTypes.func,
}

PlanFrequencyToggle.propTypes = {
  priceMonthly: PropTypes.number,
  priceYearly: PropTypes.number,
  planValues: PropTypes.object,
  setPlanValues: PropTypes.func,
}


