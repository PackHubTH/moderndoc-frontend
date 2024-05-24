import Badge from '@/components/Badge'
import { formatFullDatetime } from '@/utils/formatUtils'

type PropsType = {
  name: string
  email: string
  profileImg: string
  isProcessing?: boolean
  timestamp?: string
}

const ProfileBox = ({
  email,
  isProcessing,
  name,
  profileImg,
  timestamp,
}: PropsType) => {
  return (
    <div className="flex items-center gap-x-2 py-3">
      <img
        className="h-7 w-7 rounded-full object-cover"
        src={profileImg ?? 'https://via.placeholder.com/150'}
        alt={`img-` + name.split(' ')[0]}
      />
      <div className="w-full justify-between text-xs">
        <div className="flex justify-between">
          <h1>{name}</h1>
          {timestamp && <p>{formatFullDatetime(timestamp)}</p>}
        </div>
        <p>{email}</p>
      </div>
      {isProcessing && (
        <div className="flex w-full justify-end">
          <Badge label="กำลังดำเนินการ" variant="processing" />
        </div>
      )}
    </div>
  )
}
export default ProfileBox
