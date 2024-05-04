import PageContainer from '@/components/PageContainer'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import FaqImage from '@/modules/Home/assets/faq-image.png'
import useGetAllTags from '@/modules/faq/hooks/api/useGetAllTags'
import useGetPublicFaqs from '@/modules/faq/hooks/api/useGetPublicFaqs'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { useUserStore } from '@/stores/userStore'
import { useEffect, useState } from 'react'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { useInView } from 'react-intersection-observer'
import { UserRole } from 'types/user'
import FaqAccordion from '../components/FaqAccordion'
import GuestHomePage from './GuestHomePage'

const Home = () => {
  const { isLogin } = useUserStore()

  const [search, setSearch] = useState('')
  const [filterTagId, setFilterTagId] = useState<string>('')

  const { data: userData } = useGetUser()
  const { data: tags } = useGetAllTags()

  const {
    data: faqs,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetPublicFaqs(search, filterTagId)

  const faqsData = faqs?.pages.map((page) => page.data.data).flat()

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  useEffect(() => {
    refetch()
  }, [search, filterTagId])

  if (!isLogin) return <GuestHomePage />

  return (
    <PageContainer className="p-4 ">
      <div className="space-y-2 text-center">
        <img src={FaqImage} alt="faq" className="mx-auto w-[356px]" />
        <div className="flex items-center justify-center gap-4">
          <TextInput
            className="w-[600px]"
            value={search}
            onChange={(val) => setSearch(val)}
            placeholder="ค้นหาเอกสาร..."
          />
          <Select
            className="w-48"
            placeholder="ค้นหาตามหมวดหมู่"
            options={
              tags?.data.map((tag) => ({
                label: tag.name,
                value: tag.id,
              })) ?? []
            }
            onChange={(val) => setFilterTagId(val as string)}
            value={filterTagId ?? ''}
            label=""
          />
        </div>
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

          return (
            <div key={faq.id} className="rounded-lg ">
              {shouldShowDepartment && (
                <div className="mb-5 mt-8 flex items-center gap-4">
                  <IoDocumentTextOutline
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
