import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import { useDisclosure } from '@/hooks/useDisclosure'
import { Popover } from '@headlessui/react'
import { FaFilter, FaPlus } from 'react-icons/fa6'
import { blue } from 'tailwindcss/colors'
import CreateFaqModal from '../../components/CreateFaqModal'
import FaqFilter from '../../components/FaqFilter'
import useFaqStore from '../../stores/useFaqStore'
import FaqListTable from './FaqListTable'
import GroupManagementModal from './GroupManagementModal'

const FaqManagementPage = () => {
  const {
    isOpen: isOpenCreateFaqModal,
    open: openCreateFaqModal,
    close: closeCreateFaqModal,
  } = useDisclosure()
  const {
    isOpen: isOpenGroupManagementModal,
    open: openGroupManagementModal,
    close: closeGroupManagementModal,
  } = useDisclosure()

  const {
    filterDepartmentIds,
    setFilterDepartmentIds,
    filterTagIds,
    setFilterTagIds,
  } = useFaqStore()

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
          <Button
            label="จัดการกลุ่ม FAQ"
            variant="yellow"
            onClick={openGroupManagementModal}
          />
          <Popover className="relative">
            <Popover.Button>
              <Button
                variant="white"
                label="Filter"
                leftIcon={<FaFilter size={16} color={blue[300]} />}
              />
            </Popover.Button>
            <Popover.Panel className="absolute z-10 rounded-lg bg-white p-2 shadow-lg">
              <FaqFilter
                departmentIds={filterDepartmentIds}
                tagIds={filterTagIds}
                setDepartmentIds={setFilterDepartmentIds}
                setTagIds={setFilterTagIds}
              />
            </Popover.Panel>
          </Popover>
        </div>
        <FaqListTable />
      </PageContainer>
      <CreateFaqModal
        isOpen={isOpenCreateFaqModal}
        onClose={closeCreateFaqModal}
      />
      <GroupManagementModal
        isOpen={isOpenGroupManagementModal}
        onClose={closeGroupManagementModal}
      />
    </>
  )
}

export default FaqManagementPage
