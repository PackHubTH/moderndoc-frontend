import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './modules/home/pages'
import TestPage from './modules/home/pages/TestPage'
import CreateProfilePage from './modules/user/pages/CreateProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
