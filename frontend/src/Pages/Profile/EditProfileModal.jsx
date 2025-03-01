import React, { useState } from "react";

const EditProfileModal = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault()
    console.log('Profile updated')
  } 

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button 
        className="btn border border-gray-200 rounded-full" 
        onClick={() => document.getElementById("edit_profile_modal").showModal()}
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Update Profile</h3>
          <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
            <div className="flex gap-2">
              <input 
                className="flex-1 p-3 rounded-lg outline-none" 
                type="text" 
                placeholder="Fullname" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} />
              <input 
                className="flex-1 p-3 rounded-lg outline-none" 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <textarea 
              className='w-full outline-none resize-none p-3 rounded-lg'
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <button className='w-full font-bold text-white bg-blue-500 rounded-full py-2'>Update</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default EditProfileModal;
