import data from '../../data' 
import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation()
  
  const { pathname } = location

  return (
    <div className="
      flex
      lg:relative absolute top-0 left-0 w-full
      lg:flex-col
      lg:justify-start justify-center
      lg:w-[17.125rem]
      lg:h-auto h-[12rem]
      flex-shrink-0
      lg:rounded-[0.562rem] 
      lg:bg-sidebar-desktop bg-sidebar-mobile bg-no-repeat bg-cover
      lg:py-[2.5rem] py-[2rem]
      lg:px-[2rem]
    ">

    {data.map((item, index) => {
      const { id, title, subtitle, slug } = item

      if ( title && subtitle ) {
        return (
          <div className='
            flex
            lg:flex-row flex-col
            lg:w-[8.4375rem] 
            lg:h-[2.0625rem] 
            flex-shrink-0 
            lg:mb-[1.94rem]' 
            key={id}>
            {/* INDEX */}
            <div className={` 
                flex
                w-[2.0625rem]
                h-[2.0625rem] 
                justify-center 
                items-center 
                mr-4 
                font-semibold 
                rounded-[50%] 
                ${pathname === slug ? 'text-denim transition-all bg-sky-blue' : 'text-white border-[1px] border-white'}
              `}>
              {index + 1}
            </div>
  
            {/* STEP */}
            <div className='
              lg:flex hidden
              justify-center 
              flex-col 
              items-start 
              gap-1
            '>
              <div className='text-light-blue font-[400] mb-[0.25rem]'>
                {title}
              </div>
  
              {/* STEP TITLE */}
              <div className='text-white font-[700]'>
                {subtitle}
              </div>
            </div>
          </div>
        )
      }

    })}
    </div>
  )
}

export default Sidebar

Sidebar.propTypes = {
  active: PropTypes.bool,
}