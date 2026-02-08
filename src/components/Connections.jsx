import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
        dispatch(addConnection(res.data));
      }
      catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConnections();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-base-300 relative overflow-hidden text-center p-6">
        {/* Background Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

        <div className="glass-card p-10 rounded-3xl max-w-md w-full relative z-10">
          <div className="text-6xl mb-4">👥</div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">No connections yet</h1>
          <p className="mt-4 text-base-content/70">Start exploring the feed to find new people and make connections!</p>
          <Link to="/feed" className="btn btn-primary mt-6 rounded-full px-8">Explore Feed</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-300 p-4 md:p-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-sm">
          Your Connections
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {connections.map((connection) => (
            <div
              key={connection._id}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 group"
            >
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-primary to-secondary">
                  <img
                    src={connection.photoUrl || "https://via.placeholder.com/150"}
                    alt={connection.name}
                    className="w-full h-full rounded-full object-cover border-2 border-base-100"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div>
              </div>

              <h2 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors">
                {connection.name}
              </h2>

              <p className="text-xs text-base-content/60 mb-2 max-w-[200px] truncate">
                {connection.about || "No bio available"}
              </p>

              <p className="text-xs text-base-content/40 mb-4 font-mono">
                {connection.email}
              </p>

              <Link to={`/chat/${connection._id}`} className="w-full">
                <button className="btn btn-primary btn-sm rounded-full w-full gap-2 shadow-lg shadow-primary/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 003.444-.33c1.436-.23 2.429-1.487 2.429-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5zm-5.25.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm11.25-.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  Message
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Connections
