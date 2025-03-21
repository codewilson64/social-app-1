import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfileModal = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null)

  const { user, dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    const userProfile = { fullName, username, bio }

    const response = await fetch('http://localhost:3050/api/user/update', {
      method: 'PATCH',
      body: JSON.stringify(userProfile),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
    }

    if(response.ok) {
      dispatch({type: 'LOGIN', payload: data})
    }
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
