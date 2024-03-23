import { BrowserRouter, Route, Routes } from 'react-router-dom'

import FaqManagementPage from './modules/faq/pages/FaqManagementPage'
import Home from './modules/home/pages'
import TestPage from './modules/home/pages/TestPage'
import TemplateManagementPage from './modules/template/pages/TemplateManagementPage'
import CreateProfilePage from './modules/user/pages/CreateProfilePage'
import EditUserInfo from './modules/user/pages/EditUserInfo'
import Login from './modules/user/pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/edit-user" element={<EditUserInfo />} />
        <Route path="/faq-management" element={<FaqManagementPage />} />
        <Route
          path="/template-management"
          element={<TemplateManagementPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
