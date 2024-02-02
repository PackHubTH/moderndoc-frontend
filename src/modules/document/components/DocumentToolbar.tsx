import { addTextBox } from '../utils/documentEditor'
const DocumentToolbar = () => {
  return (
    <div className="flex h-[30px] w-full bg-green-600">
      <div className="bg-blue-200">Toolbar</div>
      <button onClick={addTextBox}>TEST</button>
    </div>
  )
}

export default DocumentToolbar