import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const UserCard = ({ user, refreshFeed }) => {
  if (!user) return null;

  const handleInterest = async () => {
    try {
      await axios.post(
        BASE_URL + '/request/send/interested/' + user._id,
        null,
        { withCredentials: true }
      );
      refreshFeed();
    } catch (err) {
      console.error(err);
    }
  };

  const handleIgnore = async () => {
    try {
      await axios.post(
        BASE_URL + '/request/send/ignored/' + user._id,
        null,
        { withCredentials: true }
      );
      refreshFeed();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="w-full h-64 overflow-hidden">
        <img
          src={user.photoUrl}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{user.name}</h2>
        <p>{user.gender}</p>
        <p>{user.about}</p>

        <div className="card-actions justify-center">
          <button className="btn btn-error" onClick={handleIgnore}>
            Ignore
          </button>
          <button className="btn btn-primary" onClick={handleInterest}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
