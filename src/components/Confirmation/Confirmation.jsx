import PropTypes from 'prop-types'

const Confirmation = ({confirmation}) => {
  const { icon, title, subtitle } = confirmation

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center lg:w-20 lg:h-20 w-14 h-14 rounded-full">
        <img src={`./images/icon-${icon}.svg`} alt="icon" />
      </div>
      <h1 className="text-denim lg:text-[2rem] text-2xl font-bold mt-8 mb-[0.87rem] leading-normal">
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