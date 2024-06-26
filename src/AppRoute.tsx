import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useEffect } from 'react'
import { pdfjs } from 'react-pdf'
import FaqDetailPage from 'src/modules/faq/pages/FaqDetailPage'
import DepartmentManagementPage from './modules/department/pages/DepartmentManagementPage'
import DocumentEditor from './modules/document/pages/DocumentEditor'
import DocumentManagementPage from './modules/document/pages/DocumentManagementPage'
import FaqManagementPage from './modules/faq/pages/FaqManagementPage'
import Home from './modules/home/pages'
import TestPage from './modules/home/pages/TestPage'
import TemplateEditor from './modules/template/pages/TemplateEditor'
import TemplateManagementPage from './modules/template/pages/TemplateManagementPage'
import TimelineManagementPage from './modules/timeline/pages/TimelineManagementPage'
import useGetUserByToken from './modules/user/hooks/api/useGetUserByToken'
import CreateProfilePage from './modules/user/pages/CreateProfilePage'
import EditUserInfo from './modules/user/pages/EditUserInfo'
import Login from './modules/user/pages/Login'
import { useUserStore } from './stores/userStore'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

function App() {
  const { setIsLogin, setUser } = useUserStore()

  const { mutateAsync: getUserData } = useGetUserByToken()

  useEffect(() => {
    const getUserDataFromToken = async () => {
      if (window.location.search.includes('token=')) {
        const token = window.location.search.split('token=')[1]
        const userData = await getUserData(token)
        setUser(userData.data, token)
        setIsLogin(true)

        window.history.replaceState({}, '', window.location.pathname)
        window.location.reload()
      }
    }

    getUserDataFromToken()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/copy-document/:documentId"
          element={<DocumentEditor type="document-copy" />}
        />
        <Route
          path="/create-document/:templateId"
          element={<DocumentEditor type="document-create" />}
        />
        <Route
          path="/edit-document/:documentId"
          element={<DocumentEditor type="document-edit" />}
        />
        <Route
          path="/view-document/:documentId"
          element={<DocumentEditor type="document-view" />}
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
        <Route path="/faq" element={<FaqDetailPage />} />
        <Route
          path="/template-management"
          element={<TemplateManagementPage />}
        />
        <Route
          path="/create-template"
          element={<TemplateEditor type="create" />}
        />
        <Route
          path="/edit-template/:templateId"
          element={<TemplateEditor type="edit" />}
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
