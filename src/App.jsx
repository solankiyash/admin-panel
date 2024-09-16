import SingUpForm from './assets/components/Auth/SingUp/SingUpForm'
import LoginForm from "./assets/components/Auth/Login/LoginForm"
import {BrowserRouter,Route,Routes} from "react-router-dom"

import Admin from './assets/components/Modules/Admin'
function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SingUpForm/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
