import './App.css'
import { Routes, Route } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {

  return (
     
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/forgot' element={<ForgotPassword />} />
        </Routes>
     
  )
}

export default App
