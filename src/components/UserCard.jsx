import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user, onNext }) => {
  if (!user) return null;

  const handleAction = async (type) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${type}/${user._id}`,
        null,
        { withCredentials: true }
      );
      onNext();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-full max-w-sm h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-primary/20 group">

      {/* IMAGE */}
      <img
        src={user.photoUrl || "/default-avatar.png"}
        alt={user.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
          className="btn btn-circle btn-lg bg-base-100/10 backdrop-blur-md border border-white/20 text-error hover:bg-error hover:border-error hover:text-white transition-all shadow-lg hover:shadow-error/30"
          aria-label="Pass"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          onClick={() => handleAction("interested")}
          className="btn btn-circle btn-lg bg-base-100/10 backdrop-blur-md border border-white/20 text-success hover:bg-success hover:border-success hover:text-white transition-all shadow-lg hover:shadow-success/30"
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
