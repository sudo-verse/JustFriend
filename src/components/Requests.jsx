import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'
import { useEffect, useState } from 'react'

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const [loading, setLoading] = useState(true);

  const handleAccept = async (userId, requestId) => {
    try {
      await axios.post(BASE_URL + '/request/review/accepted/' + requestId, { status: "accepted" }, { withCredentials: true });
      dispatch(removeRequest(userId));
    } catch (err) {
      console.error(err);
    }
  }

  const handleReject = async (userId, requestId) => {
    try {
      await axios.post(BASE_URL + '/request/review/rejected/' + requestId, { status: "rejected" }, { withCredentials: true });
      dispatch(removeRequest(userId));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(BASE_URL + '/user/request/received', { withCredentials: true });
        // Handle potential different response structures
        const data = res.data.data || res.data;
        dispatch(addRequest(data));
      }
      catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-base-300 relative overflow-hidden text-center p-6'>
        {/* Background Orbs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] animate-pulse delay-700"></div>

        <div className="glass-card p-10 rounded-3xl max-w-md w-full relative z-10">
          <div className='text-6xl mb-4'>📭</div>
          <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>No pending requests</h1>
          <p className='mt-2 text-base-content/70'>Check back later or go find some people yourself!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-300 p-4 md:p-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-sm">
          Friend Requests
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-primary to-secondary">
                  <img
                    src={request.fromUserId.photoUrl || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-base-100"
                  />
                </div>
              </div>

              <h2 className="text-lg font-bold text-base-content">
                {request.fromUserId.name}
              </h2>

              <p className="text-sm text-base-content/60 mb-2">
                {request.fromUserId.email}
              </p>

              <p className="text-xs text-base-content/50 mb-6 italic line-clamp-2">
                {request.fromUserId.about || "No bio available"}
              </p>

              <div className="flex gap-3 w-full">
                <button
                  className="btn btn-error btn-outline btn-sm flex-1 rounded-full hover:!text-white"
                  onClick={() => handleReject(request.fromUserId._id, request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-primary btn-sm flex-1 rounded-full shadow-lg shadow-primary/20"
                  onClick={() => handleAccept(request.fromUserId._id, request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Requests
