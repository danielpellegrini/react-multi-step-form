import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Buttons = ({ actions, next, prev, submit, onClick }) => {
  const navigate = useNavigate()

  const handleNavigation = (value) => {
    if (value === 'previous') {
      navigate(prev)
    } else {
      navigate(next)
    }
    if (value === 'confirm') {
      submit()
    }
  }

  return (
    <div className={`
      flex
      lg:mb-4
      w-full
      h-[4.5rem]
      bg-white
      lg:p-0 p-4
      ${prev ? 'justify-between' : 'justify-end'} 
    `}>
      {actions.map((action) => {
        const { label, value } = action
        let buttonClass = `
          font-[500] 
          lg:text-[1rem] text-sm
          lg:w-[7.6875rem] w-[6.0625rem]
          lg:h-[3rem] h-[2.5rem]
          lg:rounded-[0.5rem] rounded-[0.25rem]
          transition
        `

        switch (value) {
          case 'previous':
            buttonClass += ' text-gray bg-none hover:text-denim transition w-auto'
            break
          case 'confirm':
            buttonClass += ' bg-purple text-white hover:bg-light-purple transition'
            break
          default:
            buttonClass += ' bg-denim text-white hover:bg-light-denim transition'
            break
        }
  
        return (
          <button 
            type='button' 
            key={action.id} 
            className={buttonClass} 
            onClick={(e) => onClick ? onClick(e) : handleNavigation(action.value)}>
            {label}
          </button>
        )
      })}
    </div>
  )
}

Buttons.propTypes = {
  actions: PropTypes.array,
  next: PropTypes.string,
  prev: PropTypes.string,
  submit: PropTypes.func,
  onClick: PropTypes.func,
}

export default Buttons