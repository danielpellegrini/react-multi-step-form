import { Form } from './containers'

import './App.css'
import { HashRouter } from 'react-router-dom'

const App = () => {
  return (
    <HashRouter>
      <div className="
        flex 
        p-[5.5625rem 15.625rem] 
        justify-center 
        items-center
        font-ubuntu
        min-h-[780px]
        h-screen
      ">
        <Form />
      </div>
    </HashRouter>
  )
}

export default App
