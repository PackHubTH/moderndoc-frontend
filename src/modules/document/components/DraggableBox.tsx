import { useDrag } from 'react-dnd'

type PropsType = {
  text: string
}

const DraggableBox = ({ text }: PropsType) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'box',
    item: { text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={dragRef}
      className="min-h-12 my-1 flex items-center break-all rounded-md border-2 border-dotted border-black px-4 py-3"
    >
      <p>{text}</p>
      {isDragging && <p>👀</p>}
    </div>
  )
}

export default DraggableBox
