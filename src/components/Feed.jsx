import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, appendFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { FeedSkeleton } from "./SkeletonCard";
import usePageTitle from "../hooks/usePageTitle";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  usePageTitle("Feed");

  const fetchFeed = async (pageNum = 1, append = false) => {
    try {
      if (append) setLoadingMore(true); else setLoading(true);

      const response = await axios.get(
        `${BASE_URL}/user/feed?page=${pageNum}&limit=10`,
        { withCredentials: true }
      );

      const feedData = Array.isArray(response.data) ? response.data : response.data.data;
      const data = feedData || [];

      if (data.length < 10) setHasMore(false);

      if (append) {
        dispatch(appendFeed(data));
      } else {
        dispatch(addFeed(data));
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchFeed(1, false);
  }, [dispatch]);

  // Auto-load more when nearing end
  useEffect(() => {
    if (feed && currentIndex >= feed.length - 2 && hasMore && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFeed(nextPage, true);
    }
  }, [currentIndex, feed?.length]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-base-300 relative overflow-hidden p-4">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
        <FeedSkeleton />
      </div>
    );
  }

  // Empty Feed
  if (!feed || !feed.length || currentIndex >= feed.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-base-300 text-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 opacity-50 blur-3xl"></div>
        <div className="relative z-10 glass-card p-10 rounded-2xl max-w-md w-full flex flex-col items-center animate-fade-in-up">
          <div className="text-6xl mb-4">😴</div>
          <h2 className="text-2xl font-bold mb-2 text-base-content">That's everyone for now!</h2>
          <p className="text-base-content/70">Check back later for more potential connections.</p>
          <button
            onClick={() => {
              setPage(1);
              setHasMore(true);
              fetchFeed(1, false);
            }}
            className="btn btn-primary btn-sm mt-6 rounded-full px-6"
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-base-300 relative overflow-hidden p-4">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700"></div>



      {feed[currentIndex] && (
        <UserCard
          key={feed[currentIndex]._id}
          user={feed[currentIndex]}
          onNext={() => setCurrentIndex((prev) => prev + 1)}
        />
      )}

      {/* Loading more indicator */}
      {loadingMore && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
          <span className="loading loading-dots loading-sm text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default Feed;
