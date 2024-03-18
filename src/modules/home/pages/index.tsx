import PageContainer from '@/components/PageContainer'
import TextInput from '@/components/TextInput'
import FaqImage from '@/modules/Home/assets/faq-image.png'
import useGetPublicFaqs from '@/modules/faq/hooks/api/useGetPublicFaqs'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { useUserStore } from '@/stores/userStore'
import { useEffect, useState } from 'react'
import { VscMortarBoard } from 'react-icons/vsc'
import { useInView } from 'react-intersection-observer'
import { UserRole } from 'types/user'
import FaqAccordion from '../components/FaqAccordion'
import GuestHomePage from './GuestHomePage'

const Home = () => {
  const { isLogin } = useUserStore()
  const { data: userData } = useGetUser()

  const [search, setSearch] = useState('')

  if (!isLogin) return <GuestHomePage />

  const { data: faqs, fetchNextPage, hasNextPage } = useGetPublicFaqs()

  const faqsData = faqs?.pages.map((page) => page.data.faqs).flat()

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <PageContainer className="p-4 ">
      <div className="space-y-2 text-center">
        <img src={FaqImage} alt="faq" className="mx-auto" />
        <TextInput
          className="relative z-10 mx-auto w-full max-w-lg"
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="ค้นหาเอกสาร..."
        />
      </div>
      <div className="space-y-2.5">
        {faqsData?.map((faq, index) => {
          const shouldShowDepartment =
            index === 0 ||
            faq.department.name !== faqsData[index - 1].department.name

          const shouldAbleToEdit =
            userData?.data.role === UserRole.ADMIN ||
            !!userData?.data.teacher?.teacherDepartments.find(
              (teacherDepartment) =>
                teacherDepartment.departmentId === faq.department.id
            ) ||
            !!userData?.data.staff?.staffDepartments.find(
              (staffDepartment) =>
                staffDepartment.departmentId === faq.department.id
            )
          console.log(
            '🚀 ~ {faqsData?.map ~ userData:',
            userData?.data.teacher,
            userData?.data?.staff,
            faq.departmentId,
            shouldAbleToEdit
          )

          return (
            <div key={faq.id} className="rounded-lg ">
              {shouldShowDepartment && (
                <div className="mb-5 mt-8 flex items-center gap-4">
                  <VscMortarBoard
                    size={50}
                    className="rounded-lg bg-yellow-100 p-2 text-yellow-500"
                  />
                  <h1 className="text-2xl font-semibold text-gray-600">
                    {faq.department.name}
                  </h1>
                </div>
              )}
              <FaqAccordion faq={faq} isEditable={shouldAbleToEdit} />
            </div>
          )
        })}
      </div>
      <div ref={ref} className="h-1" />
    </PageContainer>
  )
}

export default Home
