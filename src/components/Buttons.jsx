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
    <div className={`flex ${prev ? 'justify-between' : 'justify-end'} mb-4`}>
      {actions.map((action) => {
        const { label, value } = action
  
        return (
          <button 
            type='button' 
            key={action.id} 
            className={`font-[500] text-[1rem] px-[1.5rem] py-[1rem] rounded-[0.5rem] transition ${value === 'previous' ? 'text-gray bg-none hover:text-denim transition py-[0] px-[0]' : (value === 'confirm' ? 'bg-purple text-white hover:bg-light-purple transition' : 'bg-denim text-white hover:bg-light-denim transition')}`} 
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