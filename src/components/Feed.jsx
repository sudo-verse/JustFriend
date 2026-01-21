import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed?.data || []);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const response = await axios.get(
          BASE_URL + "/user/feed",
          { withCredentials: true }
        );
        dispatch(addFeed(response.data));
        setCurrentIndex(0);
      } catch (err) {
        console.error(err);
      }
    };
    getFeed();
  }, []);

  if (!feed.length || currentIndex >= feed.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-base-300 text-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 opacity-50 blur-3xl"></div>
        <div className="relative z-10 glass-card p-10 rounded-2xl max-w-md w-full flex flex-col items-center animate-fade-in-up">
          <div className="text-6xl mb-4">😴</div>
          <h2 className="text-2xl font-bold mb-2">That's everyone for now!</h2>
          <p className="text-base-content/70">Check back later for more potential connections.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-base-300 relative overflow-hidden p-4">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

      <UserCard
        user={feed[currentIndex]}
        onNext={() => setCurrentIndex((prev) => prev + 1)}
      />
    </div>
  );
};

export default Feed;
