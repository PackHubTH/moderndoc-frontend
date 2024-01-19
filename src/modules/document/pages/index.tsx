import DocumentEditor from './DocumentEditor'

const DocumentPage = () => {
  return (
    <div>
      <div className="h-[92px] bg-yellow-200">Header</div>
      <div className="flex h-[calc(100vh-200px)] bg-red-300">
        <DocumentEditor />

        <div>Sidebar</div>
      </div>
    </div>
  )
}

export default DocumentPage
