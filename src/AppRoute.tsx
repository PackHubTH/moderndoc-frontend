import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './modules/home/pages'
import TestPage from './modules/home/pages/TestPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
