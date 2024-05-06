import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { onErrorProfileImage } from '../utils/imageUtils'

type PropsType = {
  name: string
  email: string
  profileImg: string
  timestamp?: string
}

const ProfileBox = ({ email, name, profileImg, timestamp }: PropsType) => {
  return (
    <div className="flex items-center gap-x-2 py-4">
      <img
        className="h-7 w-7 rounded-full object-cover"
        src={profileImg ?? 'https://via.placeholder.com/150'}
        onError={onErrorProfileImage}
        alt={`img-` + name.split(' ')[0]}
      />
      <div className="w-full text-xs">
        <div className="flex justify-between">
          <h1>{name}</h1>
          {timestamp && (
            <p>
              {format(timestamp, 'dd MMM yy', {
                locale: th,
              })}
            </p>
          )}
        </div>
        <p>{email}</p>
      </div>
    </div>
  )
}
export default ProfileBox
