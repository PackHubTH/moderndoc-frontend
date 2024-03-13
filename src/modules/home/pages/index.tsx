import PageContainer from '@/components/PageContainer'
import TextInput from '@/components/TextInput'
import FaqImage from '@/modules/Home/assets/faq-image.png'
import useGetPublicFaqs from '@/modules/faq/hooks/api/useGetPublicFaqs'
import { useUserStore } from '@/stores/userStore'
import { useState } from 'react'
import { VscMortarBoard } from 'react-icons/vsc'
import FaqAccordion from '../components/FaqAccordion'
import GuestHomePage from './GuestHomePage'

const Home = () => {
  const { isLogin } = useUserStore()

  const [search, setSearch] = useState('')

  if (!isLogin) return <GuestHomePage />

  const { data: faqs } = useGetPublicFaqs(1)

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
        {faqs?.data.faqs.map((faq, index) => {
          const shouldShowDepartment =
            index === 0 ||
            faq.department.name !== faqs.data.faqs[index - 1].department.name
          return (
            <div key={faq.id} className="rounded-lg ">
              {shouldShowDepartment && (
                <div className="mb-5 flex items-center gap-4">
                  <VscMortarBoard
                    size={50}
                    className="rounded-lg bg-yellow-100 p-2 text-yellow-500"
                  />
                  <h1 className="text-2xl font-semibold text-gray-600">
                    {faq.department.name}
                  </h1>
                </div>
              )}
              <FaqAccordion faq={faq} />
            </div>
          )
        })}
      </div>
    </PageContainer>
  )
}

export default Home
