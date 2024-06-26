import { ReactNode, useEffect, useMemo } from 'react'

import Loading from '@/components/Loading'
import PageContainer from '@/components/PageContainer'
import Select from '@/components/Select'
import Tabs from '@/components/Tabs'
import TextInput from '@/components/TextInput'
import useGetAllTags from '@/modules/faq/hooks/api/useGetAllTags'
import useGetPublicFaqs from '@/modules/faq/hooks/api/useGetPublicFaqs'
import FaqImage from '@/modules/home/assets/faq-image.png'
import useGetDepartments from '@/modules/user/hooks/api/useGetDepartment'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { useUserStore } from '@/stores/userStore'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { useInView } from 'react-intersection-observer'
import { UserRole } from 'types/user'
import FaqAccordion from '../components/FaqAccordion'
import { useFaqSearchStore } from '../stores/useFaqSearchStore'

const Home = () => {
  const { isLogin } = useUserStore()

  const {
    search,
    setSearch,
    filterTagId,
    setFilterTagId,
    filterDepartmentId,
    setFilterDepartmentId,
  } = useFaqSearchStore()

  const { data: userData } = useGetUser()
  const { data: tags } = useGetAllTags()
  const { data: departments } = useGetDepartments()

  const {
    data: faqs,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetched: faqsIsFetched,
  } = useGetPublicFaqs(search, filterTagId, filterDepartmentId)

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
  }, [search, filterTagId, filterDepartmentId])

  useEffect(() => {
    setFilterTagId(tags?.data?.[0].id ?? '')
  }, [tags])

  const departmentFilterOptions = useMemo(() => {
    const departmentsOptions = departments?.data.map((department) => ({
      label: department.name,
      value: department.id,
    }))

    return isLogin && !((userData?.data.role ?? '') === UserRole.ADMIN)
      ? [
          {
            label: 'ภาควิชาของฉัน',
            value: 'MY_DEPARTMENT',
          },
          ...(departmentsOptions ?? []),
        ]
      : departmentsOptions
  }, [departments])

  const faqsList = useMemo(() => {
    return (
      <div className="space-y-2.5">
        {faqsData?.map((faq, index) => {
          const shouldShowDepartment =
            index === 0 ||
            faq.department.name !== faqsData[index - 1].department.name

          const shouldAbleToEdit =
            userData?.data.role === UserRole.ADMIN ||
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
    ) as ReactNode
  }, [faqsData, userData])

  return (
    <PageContainer className="p-4 ">
      <div className="mb-6 space-y-2 text-center">
        <img src={FaqImage} alt="faq" className="mx-auto w-[356px]" />
        <div className="flex items-center justify-center gap-4">
          <TextInput
            className="w-[600px]"
            value={search}
            onChange={(val) => setSearch(val)}
            placeholder="ค้นหาเอกสาร..."
          />
          <Select
            className="-mt-2 w-48"
            placeholder="ค้นหาตามหน่วยงาน"
            options={departmentFilterOptions ?? []}
            onChange={(val) => setFilterDepartmentId(val as string)}
            value={filterDepartmentId ?? ''}
            label=""
          />
        </div>
      </div>
      <Tabs
        variant="outline"
        tabs={
          tags?.data.map((tag) => {
            return {
              title: tag.name,
              content: faqsIsFetched ? faqsList : <Loading />,
            }
          }) ?? []
        }
        onChangeTab={(tab) => {
          setFilterTagId(tags?.data?.[tab].id ?? '')
        }}
      />
      {faqsIsFetched && hasNextPage && (
        <div ref={ref} className="h-1">
          <Loading />
        </div>
      )}
    </PageContainer>
  )
}

export default Home
