import { Form } from './containers'

import './App.css'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="
        flex 
        p-[5.5625rem 15.625rem] 
        justify-center 
        items-center 
        font-ubuntu 
        bg-main
      ">
        <Form />
      </div>
    </BrowserRouter>
  )
}

export default App
