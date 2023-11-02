import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types'
import data from '../data'
import Buttons from './Buttons'

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
    selectedPlan: 'arcade',
    price: 9
  })

  

  const handlePlanFrequency = () => {
    setPlanValues({
      ...planValues,
      planFrequency: planValues.planFrequency === 'monthly' ? 'yearly' : 'monthly',
    })
  }

  return (
    <div className="flex w-[28.125rem] items-start mt-[2rem] ml-[6.25rem]">
      {data.map((item) => {
        const { id, fields, actions, next, prev, slug } = item

        if (pathname === slug) {
          return (
            <div className="flex flex-col justify-between h-full w-[inherit]" key={id}>
              {fields.map((field) => {
                const { id, title, subtitle, plans } = field

                return (
                  <div className="flex flex-col" key={id}>
                    {title && subtitle && (
                      <>
                        <h1 className="text-denim text-[2rem] font-[700] leading-normal">
                          {title}
                        </h1>

                        <h2 className="text-gray text-[1rem] leading-[1.5625rem] font-[400] mb-[2.19rem]">
                          {subtitle}
                        </h2>
                      </>
                    )}

                    <div className="flex justify-between gap-[1.12rem] mb-[2rem]">
                      {plans.map((plan) => (
                        <Plan
                          key={plan.id}
                          plan={plan}
                          planValues={planValues}
                          setPlanValues={setPlanValues}
                          price={planValues.price}
                        />
                      ))}
                    </div>

                    <div className="flex h-[3rem] bg-very-light-gray rounded-[0.5rem] items-center justify-center">
                      <PlanFrequencyToggle
                        planFrequency={planValues.planFrequency}
                        handlePlanFrequency={handlePlanFrequency}
                      />
                    </div>
                  </div>
                )
              })}
              <Buttons actions={actions} next={next} prev={prev} />
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
      selectedPlan: value,
      price: planValues.planFrequency === 'monthly' ? priceMonthly : priceYearly,
    })
  }

  return (
    <div
      className={`flex flex-col w-[8.625rem] rounded-[0.5rem] cursor-pointer border-[1px] border-border-color py-[1.25rem] px-[1rem] ${
        isSelected ? 'bg-very-light-gray border-purple' : 'bg-white'
      }`}
      onClick={handleClick}
    >
      <div className="w-[2.5rem] h-[2.5rem] mb-[2.44rem]">
        <img src={`../src/assets/images/icon-${icon}.svg`} alt="" />
      </div>
      <div className="text-[1rem] text-denim font-[700] mb-[0.44rem]">{label}</div>
      <div className="text-sm font-[400] text-gray">
        {planValues.planFrequency === 'monthly' ? `$${priceMonthly}/mo` : `$${priceYearly}/yr`}
      </div>
      {planValues.planFrequency === 'yearly' && (
        <span className="font-[400] text-xs text-denim mt-[0.44rem]">{discount}</span>
      )}
    </div>
  )
}

const PlanFrequencyToggle = ({ planFrequency, handlePlanFrequency }) => {
  return (
    <div className="flex items-center justify-center">
      <span
        className={`mr-6 font-[700] text-sm ${
          planFrequency === 'monthly' ? 'text-denim transition' : 'text-gray transition'
        }`}
      >
        Monthly
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handlePlanFrequency}
          checked={planFrequency === 'yearly'}
        />
        <div className="w-[2.375rem] h-[1.25rem] bg-gray-200 peer-focus:outline-none rounded-full peer bg-denim peer-checked:after:translate-x-[1.10rem] after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
      </label>
      <span
        className={`ml-6 font-[700] text-sm ${
          planFrequency === 'yearly' ? 'text-denim transition' : 'text-gray transition'
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
  planFrequency: PropTypes.string,
  handlePlanFrequency: PropTypes.func,
}

Plans.propTypes = {
  currentId: PropTypes.number,
}
