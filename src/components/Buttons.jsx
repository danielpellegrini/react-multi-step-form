import PropTypes from 'prop-types'

const Buttons = ({ actions, actionId }) => {
  return (
    <div className='flex justify-end items-center mt-[4.25rem]'>
      {actions.map((action) => {
        const { label } = action
  
        return (
          <button type='submit' form='form' key={actionId} className='bg-btn-background text-white font-[500] text-[1rem] px-[1.5rem] py-[1rem] rounded-[0.5rem]'>
            {label}
          </button>
        )
      })}
    </div>
  )
}

Buttons.propTypes = {
  actions: PropTypes.array.isRequired,
  actionId: PropTypes.number.isRequired,
}

export default Buttons