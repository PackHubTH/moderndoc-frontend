import { FaStar } from 'react-icons/fa6'

interface PropsType {
  email: string
  label: string
  profileImg: string
  isTemplateOperator: boolean
}

const ProfileOptionBox = ({
  email,
  label,
  profileImg,
  isTemplateOperator,
}: PropsType) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <img
          src={profileImg ?? 'https://via.placeholder.com/150'}
          alt={`img-` + label.split(' ')[0]}
          className="h-7 w-7 rounded-full object-cover"
        />
        <div className="flex w-full flex-col justify-center text-xs">
          <h1>{label}</h1>
          <p>{email}</p>
        </div>
      </div>
      {isTemplateOperator && (
        <div className="flex items-center gap-2 text-xs text-yellow-400">
          <FaStar />
          <p>หน้าที่ฉันเอง เลือกเลย!</p>
        </div>
      )}
    </div>
  )
}

export default ProfileOptionBox
