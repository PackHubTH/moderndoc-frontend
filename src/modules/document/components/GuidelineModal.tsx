import Button from '@/components/Button'
import Modal from '@/components/Modal'
import useGetFileMutate from '@/hooks/useGetFileMutate'
import { getFilename } from '@/utils/fileUtils'
import { IoEye } from 'react-icons/io5'

type PropsType = {
  description: string
  file: string
  isOpen: boolean
  onClose: VoidFunction
}

const GuidelineModal: React.FC<PropsType> = ({
  description,
  file,
  isOpen,
  onClose,
}) => {
  const { mutateAsync: getFile } = useGetFileMutate()

  const onOpenFile = async () => {
    const url = await getFile(file)

    window.open(url.data, '_blank')
  }

  return (
    <Modal
      actions={<Button label="ปิด" variant="gray" onClick={onClose} />}
      isOpen={isOpen}
      title="รายละเอียดเอกสาร/ตัวอย่างเอกสาร"
      width="763px"
      onClose={onClose}
      content={
        <div className="px-2 text-sm">
          <p className="font-semibold text-gray-600">รายละเอียดเอกสาร</p>
          <p className="my-1 rounded-2xl border-[1px] border-gray-300 p-4 pb-10 text-gray-500">
            {description}
          </p>
          <div className="mt-5 rounded-md border-[1px] border-gray-300">
            <div className="flex justify-between border-b-[1px] border-gray-300 p-4 text-xs font-semibold text-gray-600">
              <p>ชื่อเอกสาร</p>
              <p>ดูข้อมูล</p>
            </div>
            <div
              className="flex cursor-pointer items-center justify-between p-4"
              onClick={onOpenFile}
            >
              <p>{file !== '' ? getFilename(file) : '-'}</p>
              <IoEye className="cursor-pointer text-blue-500" />
            </div>
          </div>
        </div>
      }
    />
  )
}

export default GuidelineModal
