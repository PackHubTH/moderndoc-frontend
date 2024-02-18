type PropsType = {
  name: string
  email: string
  timestamp?: number
}

const ProfileBox = ({ email, name, timestamp }: PropsType) => {
  return (
    <div className="mx-4 flex items-center gap-x-1 border-b-2 py-4">
      <img
        className="h-7 w-7 rounded-full object-cover"
        src="https://via.placeholder.com/150"
        alt={`img-` + name.split(' ')[0]}
      />
      <div className="w-full text-xs">
        <div className="flex justify-between">
          <h1>{name}</h1>
          <p>{timestamp}</p>
        </div>
        <p>{email}</p>
      </div>
    </div>
  )
}
export default ProfileBox
