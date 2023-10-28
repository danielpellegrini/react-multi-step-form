import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Buttons = ({ actions, next, prev, onClick }) => {
  const navigate = useNavigate()

  const handleNavigation = (value) => {
    if (value === 'previous') {
      navigate(prev)
    } else {
      navigate(next)
    }
  }

  return (
    <div className={`flex ${ prev ? 'justify-between' : 'justify-end'} items-center mt-[4.25rem]`}>
      {actions.map((action) => {
        const { label, value } = action
  
        return (
          <button type='button' key={action.id} className={`font-[500] text-[1rem] px-[1.5rem] py-[1rem] rounded-[0.5rem] ${value === 'previous' ? 'text-gray bg-none' : 'bg-btn-background text-white'}`} onClick={(e) => onClick ? onClick(e) : handleNavigation(action.value)}>
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
  onClick: PropTypes.func,
}

export default Buttons