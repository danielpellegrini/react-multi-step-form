import PropTypes from 'prop-types'

const Title = ({ title, subtitle }) => {
  return (
    <>
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
            lg:mb-[2.19rem] mb-[1.38rem]
          '>
            {subtitle}
          </h2>
        </>
      )}    
    </>
  )
}

export default Title

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}