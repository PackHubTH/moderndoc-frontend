import PageContainer from '@/components/PageContainer'
import useFaqStore from '@/modules/faq/stores/useFaqStore'
import FaqAccordion from '@/modules/home/components/FaqAccordion'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { useNavigate } from 'react-router-dom'
import { UserRole } from '../../../../../types/user'

const FaqDetailPage = () => {
  const navigate = useNavigate()

  const { faq } = useFaqStore()
  const { data: userData } = useGetUser()

  if (!faq) {
    navigate('/')
  }

  return (
    <PageContainer className="p-12" showNavbar showSidebar>
      <FaqAccordion
        faq={faq!}
        isEditable={
          userData?.data.role === UserRole.ADMIN ||
          userData?.data.role === UserRole.STAFF
        }
        defaultOpen
      />
    </PageContainer>
  )
}

export default FaqDetailPage
