import data from '../data' 
import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation()
  
  const { pathname } = location

  return (
    <div className="w-[17.125rem] height-[35.5rem] flex-shrink-0 rounded-[0.562rem] bg-sidebar-desktop py-[2.5rem] px-[2rem]">

    {data.map((item, index) => {
      const { id, title, subtitle, slug } = item

      return (
        <div className='flex w-[8.4375rem] h-[2.0625rem] flex-shrink-0 mb-5' key={id}>
          {/* INDEX */}
          <div className={`flex w-[2.0625rem] h-[2.0625rem] justify-center items-center mr-4 font-semibold rounded-[50%] ${pathname === slug ? 'text-denim transition-all bg-sky-blue ' : 'text-white border-[1px] border-white'}`}>
            {index + 1}
          </div>

          {/* STEP */}
          <div className='justify-center flex-col items-start gap-1'>
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
    })}
    </div>
  )
}

export default Sidebar

Sidebar.propTypes = {
  active: PropTypes.bool,
}