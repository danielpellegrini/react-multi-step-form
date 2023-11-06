import { Sidebar, Input, Plans, Addons, Summary, Buttons} from "../components"
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import data from '../data'

const Form = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // filter actions based on current URL
  const currentPageData = data.find((item) => item.slug === location.pathname)

  const actions = currentPageData ? currentPageData.actions : []
  const next = currentPageData ? currentPageData.next : ''
  const prev = currentPageData ? currentPageData.prev : ''

  const [formSubmitted, setFormSubmitted] = useState(false)
  // Check if there are saved data in localStorage
  const storedInputValues = JSON.parse(localStorage.getItem('inputValues')) || {}
  // Use saved data to prepopulate form fields
  const [inputValues, setInputValues] = useState(storedInputValues)

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
    <>
      <div className="lg:hidden absolute top-0 left-0 w-full ">
        <Sidebar />
      </div>
      <div className="
        flex
        absolute top-28 left-[50%] transform translate-x-[-50%]
        lg:w-[58.75rem] w-[21.4375rem]
        lg:h-[37.5rem] h-[auto]
        lg:p-[17.1px] py-[2rem] px-[1.5rem]
        bg-white 
        flex-shrink-0 
        shadow-[0_25px_40px_-20px_rgba(0,0,0,0.10)] 
        rounded-[0.9375rem]
      ">
        <div className="lg:flex hidden">
          <Sidebar />
        </div>
          <Routes>
            <Route path="/your-info" element={<Input handleInputChange={handleInputChange} formSubmitted={formSubmitted} inputValues={inputValues} />} />
            <Route path="/select-plan" element={<Plans />} />
            <Route path="/add-ons" element={<Addons />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
      </div>
      <div className="lg:hidden absolute bottom-0 left-0 w-full">
        <Buttons 
          actions={actions} 
          next={next} 
          prev={prev}
          onClick={currentPageData.id === 1 ? handleSubmit : null}
        />
      </div>
    </>
  )
}

export default Form