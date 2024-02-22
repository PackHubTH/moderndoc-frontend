const ProfileButton = () => {
  return (
    <div className="flex items-center gap-[15px] text-xs font-semibold">
      <div className="relative inline-block">
        <img
          className="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt="profile-img"
        />
        <span className="absolute end-0 top-0 block h-1.5 w-1.5 rounded-full bg-teal-400 ring-2 ring-white"></span>
      </div>
      <p>TEST</p>
    </div>
  )
}

export default ProfileButton
