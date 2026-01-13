import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const getFeed = async () => {
    try {
      const response = await axios.get(
        BASE_URL + '/user/feed',
        { withCredentials: true }
      );
      dispatch(addFeed(response.data));
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {feed?.data?.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          refreshFeed={getFeed}
        />
      ))}
    </div>
  );
};

export default Feed;
