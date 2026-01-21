import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { useEffect } from 'react'

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/request/received', { withCredentials: true });
      console.log(res.data);
      dispatch(addRequest(res.data));
    }
    catch (err) {
      console.error(err);
    }
  }
  const handleAccept = async (userId) => {
    try {
      await axios.post(BASE_URL + '/request/review/accepted/' + userId, null, { withCredentials: true });
      fetchRequests();
    }
    catch (err) {
      console.error(err);
    }
  }

  const handleReject = async (userId) => {
    try {
      await axios.post(BASE_URL + '/request/review/rejected/' + userId, null, { withCredentials: true });
      fetchRequests();
    }
    catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) {
    return (
      <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (requests.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center mt-20 text-center opacity-60'>
        <div className='text-6xl mb-4'>📬</div>
        <h1 className='text-2xl font-bold'>No pending requests</h1>
        <p className='mt-2 max-w-xs mx-auto'>Check back later or go find some people yourself!</p>
      </div>
    )
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300"
          >

            <div className="card-body items-center text-center">
              <img
                src={request.fromUserId.photoUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-primary mb-4"
              />

              <h2 className="text-lg font-semibold">
                {request.fromUserId.name}
              </h2>

              <p className="text-sm text-gray-500">
                {request.fromUserId.email}
              </p>

              <div className="mt-4">
                <button className="btn btn-outline btn-primary btn-sm">
                  View Profile
                </button>
              </div>
              <div className="mt-4 flex gap-4">
                <button className="btn btn-error" onClick={() => handleReject(request.fromUserId._id)}>Reject</button>
                <button className="btn btn-success" onClick={() => handleAccept(request.fromUserId._id)}>Accept</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Requests
