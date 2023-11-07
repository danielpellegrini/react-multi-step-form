import { Title } from '../common'
import data from '../../data'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const Input = ({handleInputChange, formSubmitted, inputValues}) => {
  const location = useLocation()
  const { pathname } = location

  return (
    <div className='
      flex 
      lg:w-[28.125rem] 
      lg:mt-[2rem] 
      lg:ml-[6.25rem]
    '>
      {data.map((item) => {
        const { id, fields, slug } = item

        if (pathname === slug) {
          return (
            <div className='flex flex-col justify-between h-full w-[inherit]' key={id}>
              <div className='flex flex-col'>
                {fields.map((field) => {
                  const {
                    id,
                    title,
                    subtitle,
                    label,
                    type,
                    name,
                    required,
                    placeholder,
                  } = field

                  const inputValue = inputValues[name] || ''

                  const isInputEmpty = formSubmitted && inputValue.trim() === ''

                  const isEmailValid = (email) => {
                    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

                    return emailPattern.test(email)
                  }

                  const inputClassName = `
                  border-[1px] border-border-color 
                  bg-white 
                  lg:rounded-[0.5rem] rounded-[0.25rem]
                  lg:py-[0.94rem] lg:px-[1rem] py-[0.75rem] px-[1rem]
                  lg:text-[1rem] text-[0.9375rem] text-[#4B5563] 
                  text-denim
                  font-medium 
                  focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent 
                  cursor-pointer 
                  ${
                    field.required && isInputEmpty || type === 'email' && !isEmailValid(inputValue) ? 'border-red-errors' : ''
                  }`

                  return (
                    <div className='flex flex-col' key={id}>

                      <Title title={title} subtitle={subtitle} />
                      
                      {label && (
                        <div className='flex flex-col mb-[1.5rem]'>
                          <div className='
                            flex 
                            justify-between 
                            items-center 
                            mb-[0.5rem] 
                            lg:text-[0.875rem] 
                            leading-normal
                          '>
                            <label>{label}</label>

                            {field.required && isInputEmpty && (
                              <p className='text-red-errors text-[0.875rem] font-bold'>
                                This field is required
                              </p>
                            )}
                            {type === 'email' && inputValue && !isEmailValid(inputValue) && (
                              <p className='text-red-errors text-[0.875rem] font-bold'>
                                Please enter a valid email address
                              </p>
                            )}
                          </div>

                          <input
                            type={type}
                            placeholder={placeholder}
                            name={name}
                            required={required}
                            className={inputClassName}
                            value={inputValue}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export default Input

Input.propTypes = {
  handleInputChange: PropTypes.func,
  formSubmitted: PropTypes.bool,
  inputValues: PropTypes.object,
}