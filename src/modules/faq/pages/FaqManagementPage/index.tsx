import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import { useDisclosure } from '@/hooks/useDisclosure'
import { FaPlus } from 'react-icons/fa6'
import CreateFaqModal from './CreateFaqModal'

const FaqManagementPage = () => {
  const {
    isOpen: isOpenCreateFaqModal,
    open: openCreateFaqModal,
    close: closeCreateFaqModal,
  } = useDisclosure()

  return (
    <>
      <PageContainer className="space-y-8 p-7">
        <h1 className="text-2xl font-bold text-gray-600">รายการข้อมูล FAQ</h1>
        <div className="flex items-center gap-2.5">
          <Button
            label="สร้าง FAQ"
            variant="green"
            leftIcon={<FaPlus size={18} />}
            onClick={openCreateFaqModal}
          />
          <Button label="จัดการกลุ่ม FAQ" variant="yellow" />
        </div>
      </PageContainer>
      <CreateFaqModal
        isOpen={isOpenCreateFaqModal}
        onClose={closeCreateFaqModal}
      />
    </>
  )
}

export default FaqManagementPage
