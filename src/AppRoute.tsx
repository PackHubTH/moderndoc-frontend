import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Home from './modules/home/pages'
import Document from './modules/document/pages'
import { pdfjs } from 'react-pdf'
import Navbar from './modules/navbar/pages'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

function NavbarWrapper() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
import TestPage from './modules/home/pages/TestPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarWrapper />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="document" element={<Document />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
