
import PropTypes from 'prop-types'

const Confirmation = ({confirmation}) => {
  const { icon, title, subtitle } = confirmation

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full">
        <img src={`../src/assets/images/icon-${icon}.svg`} alt="icon" />
      </div>
      <h1 className="text-denim text-[2rem] font-[700] mt-8 mb-[0.87rem] leading-normal">
        {title}
      </h1>
      <h2 className="text-gray text-center text-base leading-[1.5625rem] font-normal mb-[2.19rem]">
        {subtitle}
      </h2>
    </div>
  )
}

export default Confirmation

Confirmation.propTypes = {
  confirmation: PropTypes.object,
}