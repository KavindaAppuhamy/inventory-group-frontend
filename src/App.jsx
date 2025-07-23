import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import AdminPage from './pages/adminPage'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position='top-center'/>
        <Routes path="/*">
          <Route path="/admin/*" element={<AdminPage />} />       
        </Routes>    
      </div>
    </BrowserRouter>
  )
}

export default App
