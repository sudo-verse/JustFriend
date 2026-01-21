import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.jsx';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.jsx';

const Login = () => {
  const [email, setEmail] = useState("dev@gmail.com");
  const [password, setPassword] = useState("DevPass123!");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [err, setErr] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      const res = await axios.post(BASE_URL + '/login', {
        email,
        password
      },
        { withCredentials: true })
      // console.log(res.data);
      dispatch(addUser(res.data));
      navigate('/feed');
    } catch (err) {
      setErr(err.response.data);
      console.error(err)
    }
  }
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] bg-base-300 relative overflow-hidden p-4'>
      {/* Background/Decor */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-base-100 to-secondary/10 opacity-60"></div>

      <div className="card w-full max-w-md bg-base-100/40 backdrop-blur-xl shadow-2xl border border-white/10 relative z-10 animate-fade-in-up">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-center justify-center mb-6">
            {isLogin ? "Welcome Back" : "Join JustFriend"}
          </h2>

          <div className="form-control gap-4">
            {!isLogin && (
              <div>
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
              </div>
            )}

            <div>
              <label className="label">
                <span className="label-text font-medium">Email Address</span>
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
                <span className="label-text font-medium">Password</span>
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

            <button className="btn btn-primary w-full mt-6 shadow-lg shadow-primary/20" onClick={handleSubmit}>
              {isLogin ? "Login to Account" : "Create Account"}
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
    </div>
  )
}

export default Login
