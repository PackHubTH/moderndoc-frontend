import DocumentEditor from '../components/DocumentEditor'
import DocumentToolbar from '../components/DocumentToolbar'

const DocumentPage = () => {
  return (
    <div>
      <div className="h-[92px] bg-yellow-200">Header</div>
      <div className="flex h-[calc(100vh-92px)] bg-red-500">
        <div className="w-3/4">
          <DocumentToolbar />
          <DocumentEditor />
        </div>
        <div>Sidebar</div>
      </div>
    </div>
  )
}

export default DocumentPage
