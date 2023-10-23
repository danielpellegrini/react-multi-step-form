import { Sidebar, Input} from "../components"

const Form = () => {
  return (
    <div className="flex w-[58.75rem] h-[37.5rem] p-[17.1px] bg-white flex-shrink-0 shadow-[0_25px_40px_-20px_rgba(0,0,0,0.10)] rounded-[0.9375rem]">
      <Sidebar />
      <Input />
    </div>
  )
}

export default Form