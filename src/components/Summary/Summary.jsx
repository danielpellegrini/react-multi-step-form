import { Title } from '../common'
import { useLocation, Link } from "react-router-dom"
import PropTypes from 'prop-types'
import data from '../../data'
import Confirmation from '../Confirmation'

const Summary = ({ showConfirmation }) => {
  const location = useLocation()
  const { pathname } = location

  return (
    <div className={`flex lg:w-[28.125rem] items-start ${!showConfirmation ? 'lg:mt-[2rem]' : ''} lg:ml-[6.25rem]`}>
      {data.map(item => {
        const { id, fields, confirmation, slug } = item

        if (pathname === slug) {
          return (
            <div className={`flex flex-col ${!showConfirmation ? 'justify-between' : 'justify-center'} h-full w-[inherit]`} key={id}>
              {!showConfirmation 
                ? <> 
                    {fields.map((field) => {
                      const { id, title, subtitle, label } = field

                      const planValues = JSON.parse(localStorage.getItem('planValues'))

                      const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || []
                      const optionValues = selectedOptions.map(item => (
                        { 
                          title: item.title, 
                          price: item.price 
                        }
                      ))

                      const total = optionValues.reduce((acc, curr) => acc + curr.price, planValues.price)

                      return (
                        <div className="flex flex-col mb-[2.19rem]" key={id}>
                          <Title title={title} subtitle={subtitle} />

                          {/* PLAN */}
                          <div className="flex flex-col py-4 px-6 bg-very-light-gray rounded-lg">
                            {/* PLAN */}
                            <div className="flex items-center justify-between w-full">
                              <div className="flex flex-col">
                                <span className="text-denim font-medium text-base capitalize">
                                  {planValues && `${planValues.selectedPlan} (${planValues.planFrequency})`}
                                </span>
                                <span className="text-gray underline cursor-pointer">
                                  <Link to="/select-plan" className="text-gray underline text-sm cursor-pointer hover:text-purple transition">Change</Link>
                                </span>
                              </div>
                              <span className="text-denim text-base font-bold">{planValues && `$${planValues.price}/${planValues.planFrequency === 'monthly' ? 'mo' : 'yr'}`}</span>
                            </div>

                            {optionValues.length !== 0 && (
                              <hr className="h-px bg-gray opacity-[0.2043] border-0 lg:my-6 my-3" />
                            )}

                            {/* ADD-ONS */}
                            {optionValues && optionValues.map((option, index) => (
                              <div className="flex items-center justify-between w-full mb-4" key={index}>
                                <span className="text-gray font-normal text-sm">
                                  {option.title}
                                </span>
                                <span className="text-denim text-sm font-normal">
                                  {`+$${option.price}/${planValues.planFrequency === 'monthly' ? 'mo' : 'yr'}`}
                                </span>
                              </div>
                            ))}
                          </div>
                          {/* TOTAL */}
                          <div className="flex items-center pt-[1.56rem] px-6 justify-between w-full">
                            <span className="text-gray font-normal text-sm">{label}</span>
                            <span className="text-purple text-xl font-bold">{`+$${total}/${planValues.planFrequency === 'monthly' ? 'mo' : 'yr'}`}</span>
                          </div>
                        </div>
                      )
                    })}
                  </>
                : <Confirmation confirmation={confirmation} />
              }
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export default Summary

Summary.propTypes = {
  showConfirmation: PropTypes.bool
}