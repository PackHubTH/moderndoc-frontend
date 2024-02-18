type PropsType = {
  text: string
}

const DraggableBox = ({ text }: PropsType) => {
  return (
    <div className="min-h-12 my-1 flex items-center break-all rounded-md border-2 border-dotted border-black px-4 py-3">
      <p>{text}</p>
    </div>
  )
}

export default DraggableBox
