import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './modules/Home/pages'
import TestPage from './modules/Home/pages/TestPage'
import CreateProfilePage from './modules/user/pages/CreateProfilePage'
import Login from './modules/user/pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
