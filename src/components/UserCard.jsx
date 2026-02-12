import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import toast from "react-hot-toast";

const UserCard = ({ user, onNext }) => {
  if (!user) return null;

  const [swipeDir, setSwipeDir] = useState(null); // 'left' | 'right' | null
  const [offsetX, setOffsetX] = useState(0);
  const [flyOut, setFlyOut] = useState(null); // 'left' | 'right'
  const [actionInProgress, setActionInProgress] = useState(false);
  const cardRef = useRef(null);

  const handleAction = async (type) => {
    if (actionInProgress) return;
    setActionInProgress(true);

    const direction = type === "interested" ? "right" : "left";

    try {
      await axios.post(
        `${BASE_URL}/request/send/${type}/${user._id}`,
        null,
        { withCredentials: true }
      );

      // Trigger fly-out animation
      setFlyOut(direction);
      toast.success(
        type === "interested"
          ? `💜 Interested in ${user.name}!`
          : `Passed on ${user.name}`,
        { duration: 2000, position: "bottom-center" }
      );

      // Wait for animation to complete before showing next card
      setTimeout(() => {
        setFlyOut(null);
        setOffsetX(0);
        setSwipeDir(null);
        setActionInProgress(false);
        onNext();
      }, 400);
    } catch (err) {
      const msg = err.response?.data;
      if (typeof msg === "string" && msg.includes("already exists")) {
        toast.error("Request already exists!", { position: "bottom-center" });
        setTimeout(() => {
          setActionInProgress(false);
          onNext();
        }, 500);
      } else {
        toast.error("Something went wrong", { position: "bottom-center" });
        setActionInProgress(false);
      }
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (e) => {
      if (actionInProgress) return;
      setOffsetX(e.deltaX);
      setSwipeDir(e.deltaX > 0 ? "right" : "left");
    },
    onSwipedLeft: () => {
      if (actionInProgress) return;
      if (Math.abs(offsetX) > 100) {
        handleAction("ignored");
      } else {
        setOffsetX(0);
        setSwipeDir(null);
      }
    },
    onSwipedRight: () => {
      if (actionInProgress) return;
      if (Math.abs(offsetX) > 100) {
        handleAction("interested");
      } else {
        setOffsetX(0);
        setSwipeDir(null);
      }
    },
    onTouchEndOrOnMouseUp: () => {
      if (Math.abs(offsetX) <= 100) {
        setOffsetX(0);
        setSwipeDir(null);
      }
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  // Calculate rotation and opacity based on swipe offset
  const rotation = offsetX * 0.08;
  const swipeOpacity = Math.min(Math.abs(offsetX) / 150, 1);

  // Fly-out transform
  let flyTransform = "";
  if (flyOut === "left") flyTransform = "translateX(-150%) rotate(-30deg)";
  else if (flyOut === "right") flyTransform = "translateX(150%) rotate(30deg)";

  return (
    <div
      ref={cardRef}
      {...swipeHandlers}
      className="relative w-full max-w-sm h-[600px] rounded-3xl overflow-hidden shadow-2xl group select-none touch-pan-y"
      style={{
        transform: flyOut
          ? flyTransform
          : `translateX(${offsetX}px) rotate(${rotation}deg)`,
        transition: flyOut || offsetX === 0 ? "transform 0.4s ease-out, opacity 0.3s" : "none",
        opacity: flyOut ? 0 : 1,
        cursor: actionInProgress ? "default" : "grab",
      }}
    >
      {/* Swipe Indicator Overlays */}
      {swipeDir === "right" && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ opacity: swipeOpacity }}
        >
          <div className="bg-success/20 backdrop-blur-sm absolute inset-0" />
          <span className="text-success text-6xl font-black rotate-[-15deg] border-4 border-success px-6 py-2 rounded-xl">
            LIKE
          </span>
        </div>
      )}
      {swipeDir === "left" && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ opacity: swipeOpacity }}
        >
          <div className="bg-error/20 backdrop-blur-sm absolute inset-0" />
          <span className="text-error text-6xl font-black rotate-[15deg] border-4 border-error px-6 py-2 rounded-xl">
            PASS
          </span>
        </div>
      )}

      {/* IMAGE */}
      <img
        src={user.photoUrl || "/default-avatar.png"}
        alt={user.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        draggable="false"
        loading="lazy"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* USER INFO */}
      <div className="absolute bottom-28 left-6 right-6 text-white z-10">
        <h2 className="text-3xl font-bold drop-shadow-md">
          {user.name}
        </h2>
        <div className="flex items-center gap-2 mt-1 opacity-90">
          <span className="badge badge-outline badge-sm text-white border-white/40 uppercase tracking-wider text-[10px] pb-[1px]">{user.gender}</span>
          {user.age && <span className="text-sm font-medium">{user.age} y/o</span>}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-200 line-clamp-3">
          {user.about || "No bio available."}
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 z-20 px-6">
        <button
          onClick={() => handleAction("ignored")}
          disabled={actionInProgress}
          className="btn btn-circle btn-lg bg-base-100/10 backdrop-blur-md border border-white/20 text-error hover:bg-error hover:border-error hover:text-white transition-all shadow-lg hover:shadow-error/30 disabled:opacity-50"
          aria-label="Pass"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          onClick={() => handleAction("interested")}
          disabled={actionInProgress}
          className="btn btn-circle btn-lg bg-base-100/10 backdrop-blur-md border border-white/20 text-success hover:bg-success hover:border-success hover:text-white transition-all shadow-lg hover:shadow-success/30 disabled:opacity-50"
          aria-label="Connect"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserCard;
