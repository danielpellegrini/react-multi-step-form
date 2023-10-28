import data from '../data'
import { useState } from 'react'
import Buttons from './Buttons'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'



const Input = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  // Check if there are saved data in localStorage
  const storedInputValues = JSON.parse(localStorage.getItem('inputValues')) || {}
  // Use saved data to prepopulate form fields
  const [inputValues, setInputValues] = useState(storedInputValues)

  const navigate = useNavigate()

  const location = useLocation()

  const { pathname } = location

  const handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value

    setInputValues({
      ...inputValues,
      [name]: value.trim(),
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const requiredFields = data.find((item) => item.id === 1).fields.filter((field) => field.required)

    const next = data.find((item) => item.id === 1).next

    const isFormValid = requiredFields.every((field) => {
      const inputValue = inputValues[field.name] || ''
      return !field.required || (inputValue.trim().length > 0)
    })

    if (isFormValid) {
      // Save input values in localStorage
      localStorage.setItem('inputValues', JSON.stringify(inputValues))
      navigate(next)
    } else {
      // Set formSubmitted to true to show error messages
      setFormSubmitted(true)
    }
  }

  return (
    <div className='pt-[1.5rem] pl-[6.25rem]'>
      {data.map((item) => {
        const { id, fields, actions, slug } = item

        if (pathname === slug) {
          return (
            <div className='flex flex-col' key={id}>
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

                const inputClassName = `border-[1px] border-border-color bg-white rounded-[0.5rem] py-[0.94rem] px-[1rem] text-[1rem] font-[400] text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent cursor-pointer ${
                  field.required && isInputEmpty ? 'border-red-errors' : ''
                }`

                return (
                  <div className='flex flex-col w-[28.125rem]' key={id}>
                    {title && subtitle && (
                      <>
                        <h1 className='text-denim text-[2rem] font-[700] leading-normal'>
                          {title}
                        </h1>

                        <h2 className='text-gray text-[1rem] leading-[1.5625rem] font-[400] mb-[2.19rem]'>
                          {subtitle}
                        </h2>
                      </>
                    )}
                    {label && (
                      <div className='flex flex-col mb-[1.5rem]'>
                        <div className='flex justify-between items-center mb-[0.5rem] text-[0.875rem] leading-normal'>
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
              <Buttons actions={actions} onClick={handleSubmit} />
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
  currentId: PropTypes.number,
}
