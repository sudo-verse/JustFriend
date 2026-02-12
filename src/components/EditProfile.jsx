import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { BASE_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [name, setName] = useState(currentUser?.name || '');
  const [gender, setGender] = useState(currentUser?.gender || '');
  const [photoUrl, setPhotoUrl] = useState(currentUser?.photoUrl || '');
  const [about, setAbout] = useState(currentUser?.about || '');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setPhotoUrl(res.data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMsg("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async () => {
    try {
      setErrorMsg('');
      const res = await axios.patch(BASE_URL + '/profile/edit', {
        name,
        gender,
        photoUrl,
        about
      },
        { withCredentials: true })
      dispatch(addUser(res.data));
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(''), 3000);

    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data || "Something went wrong");
    }
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setGender(currentUser.gender || '');
      setPhotoUrl(currentUser.photoUrl || '');
      setAbout(currentUser.about || '');
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-300 p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]"></div>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-5xl z-10">

        {/* LEFT: Edit Form */}
        <div className="glass-card w-full max-w-md rounded-3xl p-8 relative animate-fade-in-up">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6 text-center">Edit Profile</h1>

          <div className="flex flex-col gap-5">

            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center gap-3 mb-2">
              <div className="relative group cursor-pointer w-28 h-28">
                <div className={`w-28 h-28 rounded-full overflow-hidden border-4 border-base-200 shadow-xl ${uploading ? 'animate-pulse ring-4 ring-primary/50' : ''}`}>
                  <img
                    src={photoUrl || "/default-avatar.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label htmlFor="profile-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </label>
                <input id="profile-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">{uploading ? "Uploading..." : "Change Photo"}</span>
            </div>

            <div>
              <label className="label text-sm font-semibold ml-1">Full Name</label>
              <input className="input w-full glass-input rounded-xl" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
            </div>

            <div>
              <label className="label text-sm font-semibold ml-1">About</label>
              <textarea className="textarea w-full glass-input rounded-xl h-28 resize-none" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Tell us about yourself..." />
            </div>

            <div>
              <label className="label text-sm font-semibold ml-1">Gender</label>
              <select className="select w-full glass-input rounded-xl" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {errorMsg && <div className="text-error text-center text-sm font-medium mt-2 bg-error/10 p-2 rounded-lg">{errorMsg}</div>}
            {successMsg && <div className="text-success text-center text-sm font-medium mt-2 bg-success/10 p-2 rounded-lg animate-bounce">{successMsg}</div>}

            <button
              className="btn btn-primary w-full rounded-full mt-6 shadow-lg shadow-primary/30 disabled:opacity-50"
              onClick={handleEdit}
              disabled={uploading}
            >
              {uploading ? <span className="loading loading-spinner"></span> : "Save Changes"}
            </button>
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="hidden lg:block sticky top-24">
          <div className="alert bg-base-100/50 backdrop-blur-md mb-6 border-none shadow-sm rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="font-medium">Check how your profile looks to others!</span>
          </div>
          {/* Construct a temporary user object for preview */}
          <div className="pointer-events-none opacity-90 scale-95 origin-top transform transition-all duration-300">
            <UserCard user={{ ...currentUser, name, about, gender, photoUrl }} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default EditProfile
