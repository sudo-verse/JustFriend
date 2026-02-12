import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'
import UserCard from './UserCard'
import { Eye, Pencil } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [mode, setMode] = useState('view'); // 'view' | 'edit'

  usePageTitle("Profile");

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-300 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>

      {/* Mode Toggle */}
      <div className="relative z-10 flex justify-center pt-6 pb-2">
        <div className="bg-base-200/50 backdrop-blur-sm rounded-full p-1 flex gap-1 border border-base-300">
          <button
            onClick={() => setMode('view')}
            className={`btn btn-sm rounded-full gap-2 transition-all ${mode === 'view' ? 'btn-primary shadow-md' : 'btn-ghost'
              }`}
          >
            <Eye size={15} />
            Preview
          </button>
          <button
            onClick={() => setMode('edit')}
            className={`btn btn-sm rounded-full gap-2 transition-all ${mode === 'edit' ? 'btn-primary shadow-md' : 'btn-ghost'
              }`}
          >
            <Pencil size={15} />
            Edit
          </button>
        </div>
      </div>

      {mode === 'edit' ? (
        <EditProfile />
      ) : (
        <div className="flex flex-col items-center p-6 relative z-10">
          <div className="mb-4">
            <span className="badge badge-primary badge-lg gap-2">
              <Eye size={14} />
              How others see your profile
            </span>
          </div>

          {/* Profile Preview Card */}
          <div className="pointer-events-none">
            <UserCard user={currentUser} onNext={() => { }} />
          </div>

          {/* Stats below */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm w-full">
            <div className="glass-card rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{currentUser.name?.split(' ').length > 1 ? '✓' : '—'}</p>
              <p className="text-xs text-base-content/50 mt-1">Full Name</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{currentUser.photoUrl ? '✓' : '✗'}</p>
              <p className="text-xs text-base-content/50 mt-1">Photo</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{currentUser.about ? '✓' : '✗'}</p>
              <p className="text-xs text-base-content/50 mt-1">Bio</p>
            </div>
          </div>

          <button
            onClick={() => setMode('edit')}
            className="btn btn-primary rounded-full px-8 mt-6 shadow-lg shadow-primary/30 gap-2"
          >
            <Pencil size={16} />
            Edit My Profile
          </button>
        </div>
      )}
    </div>
  )
}

export default Profile
