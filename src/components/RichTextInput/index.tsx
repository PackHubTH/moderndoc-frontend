import { useEffect, useRef } from 'react'
import QuillEditor from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type PropsType = {
  label: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  isError?: boolean
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
}

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'indent',
]

const RichTextInput: React.FC<PropsType> = ({
  label,
  placeholder,
  className,
  value,
  onChange,
  isError,
}) => {
  const quill = useRef<any>()

  useEffect(() => {
    const quillEditor = quill.current.getEditor()

    quillEditor.root.innerHTML = (value ?? '') as string
  }, [])

  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>
      <QuillEditor
        className=""
        ref={(el) => (quill.current = el)}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}

export default RichTextInput
