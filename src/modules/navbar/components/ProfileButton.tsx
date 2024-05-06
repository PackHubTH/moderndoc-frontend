import { onErrorProfileImage } from '@/modules/document/utils/imageUtils'

type PropsType = {
  name: string
  profileImg: string
}

const ProfileButton: React.FC<PropsType> = ({ name, profileImg }) => {
  return (
    <div className="flex items-center gap-[15px] text-xs font-semibold">
      <div className="relative inline-block">
        <img
          className="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
          src={profileImg}
          onError={onErrorProfileImage}
          alt="profile-img"
        />
        <span className="absolute end-0 top-0 block h-1.5 w-1.5 rounded-full bg-teal-400 ring-2 ring-white"></span>
      </div>
      <p>{name}</p>
    </div>
  )
}

export default ProfileButton
