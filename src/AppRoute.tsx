import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Home from './modules/home/pages'
import Document from './modules/document/pages'
import { pdfjs } from 'react-pdf'
import TestPage from './modules/home/pages/TestPage'
import CreateProfilePage from './modules/user/pages/CreateProfilePage'
import EditUserInfo from './modules/user/pages/EditUserInfo'
import Login from './modules/user/pages/Login'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="document" element={<Document />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/edit-user" element={<EditUserInfo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
