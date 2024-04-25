import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { pdfjs } from 'react-pdf'
import DepartmentManagementPage from './modules/department/pages/DepartmentManagementPage'
import DocumentEditor from './modules/document/pages/DocumentEditor'
import DocumentManagementPage from './modules/document/pages/DocumentManagementPage'
import FaqManagementPage from './modules/faq/pages/FaqManagementPage'
import Home from './modules/home/pages'
import TestPage from './modules/home/pages/TestPage'
import TemplateEditor from './modules/template/pages/TemplateEditor'
import TemplateManagementPage from './modules/template/pages/TemplateManagementPage'
import TimelineManagementPage from './modules/timeline/pages/TimelineManagementPage'
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
        <Route
          path="/create-document/:templateId"
          element={<DocumentEditor type="create" />}
        />
        <Route
          path="/edit-document/:documentId"
          element={<DocumentEditor type="edit" />}
        />
        <Route
          path="/document-management"
          element={<DocumentManagementPage />}
        />
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/edit-user" element={<EditUserInfo />} />
        <Route
          path="/department-management"
          element={<DepartmentManagementPage />}
        />
        <Route
          path="/department-management/:departmentId"
          element={<DepartmentManagementPage />}
        />
        <Route path="/faq-management" element={<FaqManagementPage />} />
        <Route
          path="/template-management"
          element={<TemplateManagementPage />}
        />
        <Route
          path="/create-template"
          element={<TemplateEditor type="create" />}
        />
        <Route
          path="/timeline-management"
          element={<TimelineManagementPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
