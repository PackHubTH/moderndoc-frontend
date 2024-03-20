import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { pdfjs } from 'react-pdf'
import Document from './modules/document/pages'
import FaqManagementPage from './modules/faq/pages/FaqManagementPage'
import Home from './modules/home/pages'
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
        <Route path="/faq-management" element={<FaqManagementPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
