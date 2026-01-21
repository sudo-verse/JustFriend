import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      dispatch(addConnection(res.data));
      console.log(res.data);
    }
    catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) {
    return (
      <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (connections.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center mt-20 text-center opacity-60'>
        <div className='text-6xl mb-4'>👥</div>
        <h1 className='text-2xl font-bold'>No connections yet</h1>
        <p className='mt-2 max-w-xs mx-auto'>Start exploring the feed to find new people and make connections!</p>
      </div>
    )
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="card-body items-center text-center">
              <img
                src={connection.photoUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-primary mb-4"
              />

              <h2 className="text-lg font-semibold">
                {connection.name}
              </h2>

              <p className="text-sm text-gray-500">
                {connection.email}
              </p>

              <div className="mt-4">
                <button className="btn btn-outline btn-primary btn-sm">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Connections
