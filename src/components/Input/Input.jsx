import data from '../../data'
import {  useLocation } from 'react-router-dom'
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

                  const inputClassName = `
                  border-[1px] border-border-color 
                  bg-white 
                  lg:rounded-[0.5rem] rounded-[0.25rem]
                  lg:py-[0.94rem] lg:px-[1rem] py-[0.75rem] px-[1rem]
                  lg:text-[1rem] text-[0.9375rem] text-[#4B5563] 
                  font-[500] 
                  focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent 
                  cursor-pointer 
                  ${
                    field.required && isInputEmpty ? 'border-red-errors' : ''
                  }`

                  return (
                    <div className='flex flex-col' key={id}>
                      {title && subtitle && (
                        <>
                          <h1 className='
                            text-denim 
                            lg:text-[2rem] text-2xl
                            font-[700] 
                            leading-normal
                          '>
                            {title}
                          </h1>

                          <h2 className='
                          text-gray 
                            text-[1rem]
                            leading-[1.5625rem] 
                            font-[400] 
                            mb-[2.19rem]
                          '>
                            {subtitle}
                          </h2>
                        </>
                      )}
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
                              <p className='text-red-errors text-[0.875rem] font-[700]'>
                                This field is required
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
              {/* <Buttons actions={actions} onClick={handleSubmit} /> */}
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