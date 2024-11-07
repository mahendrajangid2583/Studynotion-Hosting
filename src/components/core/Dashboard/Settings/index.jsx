import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <>
      <h1 className="mb-14 lg:ml-10 ml-4 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      
       <div className=" w-11/12 max-w-[792px] mx-auto space-y-5">
            {/* Change Profile Picture */}
            <ChangeProfilePicture />
            {/* Profile */}
            <EditProfile />
            {/* Password */}
            <UpdatePassword />
            {/* Delete Account */}
            <DeleteAccount />
       </div>
      
    </>
  )
}

