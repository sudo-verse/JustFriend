import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { use, useEffect } from 'react';
import {BASE_URL} from '../utils/constants';
import UserCard from './UserCard';

const Feed = () => {
    const dispatch = useDispatch(); 
    const feed = useSelector((state) => state.feed);
    console.log(feed);
    const getFeed = async () => { 
      
        try {
            const response = await axios.get(BASE_URL + '/user/feed', { withCredentials: true }); 
            const data = await response.data;
            dispatch(addFeed(data)); 
        } catch (error) {
            console.error('Error fetching feed:', error);
        }
    }
    useEffect(() => {
        getFeed();
    }, []);
  return (
    <div>
      {feed.data && 
      (
        <div className="flex flex-wrap gap-4 justify-center mt-4">
            <UserCard user={feed.data[0]} />
        </div>
      )
      }
    </div>
  )
}

export default Feed
