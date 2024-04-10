import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { pdfjs } from 'react-pdf'
import Document from './modules/document/pages'
import DocumentManagementPage from './modules/document/pages/DocumentManagementPage'
import FaqManagementPage from './modules/faq/pages/FaqManagementPage'
import Home from './modules/home/pages'
import TestPage from './modules/home/pages/TestPage'
import TemplateEditor from './modules/template/pages/TemplateEditor'
import TemplateManagementPage from './modules/template/pages/TemplateManagementPage'
import CreateProfilePage from './modules/user/pages/CreateProfilePage'
import EditUserInfo from './modules/user/pages/EditUserInfo'
import Login from './modules/user/pages/Login'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/edit-document" element={<Document />} />
        <Route
          path="/document-management"
          element={<DocumentManagementPage />}
        />
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/edit-user" element={<EditUserInfo />} />
        <Route path="/faq-management" element={<FaqManagementPage />} />
        <Route
          path="/template-management"
          element={<TemplateManagementPage />}
        />
        <Route
          path="/edit-template"
          element={<TemplateEditor type="create" />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
