import { Title } from '../common'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import data from '../../data'

const Addons = () => {
  const location = useLocation()
  const { pathname } = location

  const options = data.find(item => item.id === 3).fields[0].options
  const planValues = JSON.parse(localStorage.getItem('planValues'))

  const planFrequency = planValues?.planFrequency || 'monthly'

  const [checkedState, setCheckedState] = useState(() => {
    const storedCheckedState = localStorage.getItem('selectedOptions')

    if (storedCheckedState) {
      const parsedCheckedState = JSON.parse(storedCheckedState)
      // Map the parsed data to create an initial state array
      return options.map(option => {
        const found = parsedCheckedState.find(data => data.title === option.title)
        
        return found || false
      })
    } else {
      return new Array(options.length).fill(false)
    }
  })

  
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item)
    
    setCheckedState(updatedCheckedState)
  }

  useEffect(() => {
    const dataToSave = checkedState.map((isChecked, index) => {
      if (isChecked) {
        const option = options[index]

        return {
          title: option.title,
          price: planFrequency === 'monthly' ? option.priceMonthly : option.priceYearly,
        }
      }
      return null
    })

    // Remove any null values from the array
    const filteredData = dataToSave.filter(data => data !== null)

    localStorage.setItem('selectedOptions', JSON.stringify(filteredData))
  }, [checkedState, options, planFrequency])

  return (
    <div className="flex lg:w-[28.125rem] lg:mt-[2rem] lg:ml-[6.25rem]">
      {data.map(item => {
        const { id, fields, slug } = item

        if (pathname === slug) {
          return (
            <div className="flex flex-col justify-between h-full w-[inherit]" key={id}>
              {fields.map(field => {
                const { id, title, subtitle, options } = field

                return (
                  <div className="flex flex-col" key={id}>
                    <Title title={title} subtitle={subtitle} />

                    {options.map((option, index) => {
                      const {
                        id,
                        title,
                        subtitle,
                        priceMonthly,
                        priceYearly
                      } = option

                      return (
                        <div
                          className={`flex items-center w-full justify-between lg:py-[1.13rem] py-[0.81rem] lg:px-6 px-4 rounded-lg border-[1px] mb-4 cursor-pointer hover:border-purple hover:outline-[1px] ${
                            checkedState[index]
                              ? 'border-[1px] border-purple bg-very-light-gray'
                              : 'border-border-color'
                          }`}
                          key={id}
                          onClick={() => handleOnChange(index)}
                        >
                          <div className="flex items-center">
                            <label className="relative flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-border-color transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-purple checked:bg-purple checked:before:bg-purple"
                                id={`checkbox-${id}`}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                              />
                              <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                            </label>
                            <div className="flex flex-col lg:gap-[0.44rem] gap-[0.19rem] lg:ml-6 ml-4">
                              <span className="text-denim lg:text-base text-sm font-[500]">
                                {title}
                              </span>
                              <span className="text-gray lg:text-sm text-xs font-normal">
                                {subtitle}
                              </span>
                            </div>
                          </div>
                          {/* PRICE */}
                          <span className="text-purple text-sm">
                            +{planFrequency === 'monthly' ? `${priceMonthly}/mo` : `${priceYearly}/yr`}
                          </span>
                        </div>
                      )
                    })}
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

export default Addons
