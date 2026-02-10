import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.jsx';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../utils/constants.jsx';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png");
  const [uploading, setUploading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setErr(null);

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
      setErr("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const [showVerifyPopup, setShowVerifyPopup] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setErr(null); // Clear previous errors
      setSubmitting(true);
      if (isLogin) {
        const res = await axios.post(BASE_URL + '/login', {
          email,
          password
        }, { withCredentials: true });
        dispatch(addUser(res.data));
        navigate('/feed');
      } else {
        // Signup Logic
        const res = await axios.post(BASE_URL + '/signup', {
          name,
          gender,
          email,
          password,
          photoUrl // value from state
        }, { withCredentials: true });

        dispatch(addUser(res.data));
        navigate('/profile');
        setShowVerifyPopup(true);
      }
    } catch (err) {
      setErr(err.response?.data || "Something went wrong");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] bg-base-300 relative overflow-hidden p-4'>
      {/* Background/Decor */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-base-100 to-secondary/10 opacity-60"></div>

      <div className="card w-full max-w-md bg-base-100/40 backdrop-blur-xl shadow-2xl border border-white/10 relative z-10 animate-fade-in-up">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-center justify-center mb-6">
            {isLogin ? "Welcome Back" : "Join CampusVerse"}
          </h2>

          <div className="form-control gap-4">
            {!isLogin && (
              <div className="flex flex-col gap-4">
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative group cursor-pointer w-24 h-24">
                    <div className={`w-24 h-24 rounded-full overflow-hidden border-4 border-base-200 shadow-md ${uploading ? 'animate-pulse' : ''}`}>
                      <img
                        src={photoUrl || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label htmlFor="file-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    </label>
                    <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </div>
                  <span className="text-xs text-base-content/60">{uploading ? "Uploading..." : "Upload Profile Picture"}</span>
                </div>

                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full bg-base-100/50 focus:bg-base-100 transition-all font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="label">
                  <span className="label-text font-medium">Gender</span>
                </label>
                <select
                  className="input input-bordered w-full bg-base-100/50 focus:bg-base-100 transition-all font-medium"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled >
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

              </div>
            )}

            <div>
              <label className="label">
                <span className="label-text font-medium py-3">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full bg-base-100/50 focus:bg-base-100 transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium py-3">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full bg-base-100/50 focus:bg-base-100 transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {err && <div className="text-error text-sm text-center font-medium mt-2">{err}</div>}

            <button
              className="btn btn-primary w-full mt-6 shadow-lg shadow-primary/20"
              onClick={handleSubmit}
              disabled={uploading || submitting}
            >
              {isLogin ? (submitting ? "Logging in..." : "Login to Account") : (uploading ? "Uploading Image..." : (submitting ? "Creating Account..." : "Create Account"))}
            </button>

            <div className="divider text-xs opacity-50 my-4">OR</div>

            <p className="text-center text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="link link-primary font-bold no-underline hover:underline transition-all"
              >
                {isLogin ? "Sign Up Now" : "Login Here"}
              </button>
            </p>
          </div>
        </div>
      </div>
      {/* Verification Popup */}
      {showVerifyPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="card w-full max-w-sm bg-base-100 shadow-2xl border border-primary/20 p-6 m-4 animate-scale-up">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-3xl">
                ✉️
              </div>
              <h3 className="text-2xl font-bold mb-2 text-base-content">Verify Your Email</h3>
              <p className="text-base-content/70 mb-6">
                We've sent a verification link to <span className="font-semibold text-primary">{email}</span>.<br />
                Please check your inbox to activate your account.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    setShowVerifyPopup(false);
                    setIsLogin(true); // Switch to login view
                    window.open('https://gmail.com', '_blank'); // Optional helper
                  }}
                  className="btn btn-primary w-full shadow-lg shadow-primary/30"
                >
                  Open Email & Login
                </button>
                <button
                  onClick={() => setShowVerifyPopup(false)}
                  className="btn btn-ghost btn-sm"
                >
                  I'll do it later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
