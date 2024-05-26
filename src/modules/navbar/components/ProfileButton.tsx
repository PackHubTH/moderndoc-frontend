import { onErrorImage } from '@/modules/document/utils/imageUtils'
import { useUserStore } from '@/stores/userStore'
import { Popover } from '@headlessui/react'
import { BiLogOut } from 'react-icons/bi'
import { IoPersonOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

type PropsType = {
  name: string
  profileImg: string
  email: string
}

const ProfileButton: React.FC<PropsType> = ({ name, profileImg, email }) => {
  const navigate = useNavigate()

  const { logout } = useUserStore()

  return (
    <div className="flex items-center gap-[15px] text-xs font-semibold">
      <div className="relative inline-block">
        <Popover>
          <Popover.Button className="rounded-full">
            <img
              className="inline-block h-[2.375rem] w-[2.375rem] cursor-pointer rounded-full"
              src={profileImg}
              alt="profile-img"
            />
          </Popover.Button>
          <Popover.Panel className="absolute right-4 w-72 rounded-md bg-white px-3 py-3 shadow-xl">
            <div className="space-y-1">
              <div className="mb-2 flex items-center gap-4">
                <img
                  src={profileImg}
                  onError={onErrorImage}
                  alt="profile-img"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{name}</h4>
                  <p className="text-xs">{email}</p>
                </div>
              </div>
              <div
                className="flex cursor-pointer items-center justify-start gap-4 px-3 py-1 hover:bg-gray-100"
                onClick={() => navigate('/edit-user')}
              >
                <IoPersonOutline size={16} />
                <span className="text-sm">แก้ไขข้อมูลส่วนตัว</span>
              </div>
              <div
                className="flex cursor-pointer items-center justify-start gap-4 px-3 py-1 hover:bg-gray-100"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                <BiLogOut size={16} />
                <span className="text-sm">ออกจากระบบ</span>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
        <span className="absolute end-0 top-0 block h-1.5 w-1.5 rounded-full bg-teal-400 ring-2 ring-white"></span>
      </div>
    </div>
  )
}

export default ProfileButton
