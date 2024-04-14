import PageContainer from '@/components/PageContainer'
import WaitForApproval from '@/modules/department/assets/wait-for-approval.png'

type PropsType = {
  departmentName: string
}

const WaitForApprovalPage: React.FC<PropsType> = ({ departmentName }) => {
  return (
    <PageContainer className="flex h-[100vh] w-full items-center justify-center">
      <div className="text-center">
        <img
          className="mx-auto w-48"
          src={WaitForApproval}
          alt="Wait for approval"
        />
        <h4 className="mt-6 text-xl font-semibold text-blue-500">
          กำลังรอเจ้าหน้าที่ตอบรับเข้าสู่หน่วยงาน {departmentName}
        </h4>
        <h5 className="mt-2 text-xl ">
          หากคุณได้รับการตอบรับแล้ว เราจะส่งแจ้งเตือนให้ทราบ
        </h5>
      </div>
    </PageContainer>
  )
}

export default WaitForApprovalPage
