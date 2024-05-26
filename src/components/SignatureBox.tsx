import { useEffect, useMemo } from 'react'

import useGetFile from '@/hooks/useGetFile'
import { useDrag } from 'react-dnd'

interface PropsType {
  src: string
}

const SignatureBox = ({ src }: PropsType) => {
  const { data: file, refetch } = useGetFile(src ?? '')

  useEffect(() => {
    if (!file) refetch()
  }, [src, file, refetch])

  const getFileName = useMemo(() => {
    return file?.data ?? ''
  }, [file])

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'sign',
      item: {
        src: getFileName,
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult()
        if (item && dropResult) {
          console.log(`You dropped ${item.src} into ${dropResult}`)
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [getFileName]
  )

  console.log('isDragging', isDragging)
  return (
    <div className="m-2 flex justify-center rounded-md border-2" ref={drag}>
      <img src={file?.data} alt="sig-1" className="max-h-[96px]" />
    </div>
  )
}

export default SignatureBox
