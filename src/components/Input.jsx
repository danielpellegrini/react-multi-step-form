import data from '../data'
import Buttons from './Buttons'
import { useState } from 'react'

const Input = () => {
  const [inputValues, setInputValues] = useState({})

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleInputChange = (event) => {
    const target = event.target

    const name = target.name

    const value = target.value

    setInputValues({
      ...inputValues,

      [name]: value.trim(),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormSubmitted(true)
  }

  return (
    <div className='pt-[1.5rem] pl-[6.25rem]'>
      {data.map((item) => {
        const { id, fields, actions } = item

        const actionId = actions.map((action) => action.id)

        if (id === 1) {
          return (
            <div className='flex flex-col' key={id}>
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

                  const inputClassName = `border-[1px] border-border-color bg-white rounded-[0.5rem] py-[0.94rem] px-[1rem] text-[1rem] font-[400] text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent cursor-pointer ${
                    isInputEmpty ? 'border-red-errors' : ''
                  }`

                  return (
                    <div className='flex flex-col' key={id}>
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

                      <form id='form' onSubmit={handleSubmit}>
                        {label && (
                          <div className='flex flex-col mb-[1.5rem]'>
                            <div className='flex justify-between items-center mb-[0.5rem] text-[0.875rem] leading-normal'>
                              <label>{label}</label>

                              {isInputEmpty && (
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
                      </form>
                    </div>
                  )
                })}
              </div>
              <Buttons actions={actions} actionId={actionId[0]} />
            </div>
          )
        }
      })}
    </div>
  )
}

export default Input
