import data from '../data'
import Buttons from "./Buttons"
import { useLocation } from "react-router-dom"


const Addons = () => {
  const location = useLocation()
  const { pathname } = location

  return (
    <div className="pt-[1.5rem] pl-[6.25rem]">
    {data.map((item) => {
      const { id,
        fields,
        actions,
        next,
        prev,
        slug,
        options
      } = item

      if (pathname === slug) {
        return (
          <div className="flex flex-col w-[28.125rem]" key={id}>
            {fields.map((field) => {
              const { id, title, subtitle } = field

              return (
                <div className="flex flex-col" key={id}>
                  {title && subtitle && (
                    <>
                      <h1 className="text-denim text-[2rem] font-[700] leading-normal">
                        {title}
                      </h1>

                      <h2 className="text-gray text-[1rem] leading-[1.5625rem] font-[400] mb-[2.19rem]">
                        {subtitle}
                      </h2>
                    </>
                  )}
                  {options.map((option) => {
                    const { 
                      id, 
                      title,
                      subtitle,
                      priceMonthly,
                      priceYearly,
                      isChecked
                    } = option

                    return (
                      <div className="flex" key={id}>

                      </div>
                    )
                  })}
                </div>
              )
            })}
            <Buttons actions={actions} next={next} prev={prev} />
          </div>
        )
      }
      return null
    })}
  </div>
  )
}

export default Addons