import { useParams, Link } from "react-router-dom";
import createSocketConnection from "../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";

const Chat = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const connections = useSelector(state => state.connections);
    const currentUser = user?.currentUser;
    const userId = currentUser?._id;

    // Find the target user from connections (if available) to show name/avatar
    const targetUser = Array.isArray(connections) ? connections.find(c => c._id === id) : null;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);
    const lastTypingTimeRef = useRef(0); // Throttle typing events

    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Fetch connections if missing (to get target user details)
    useEffect(() => {
        const fetchConnections = async () => {
            // If connections is null or empty, we attempt to fetch. 
            // Ideally we check if we found the user. If not found, we fetch.
            if (!connections || connections.length === 0 || !targetUser) {
                try {
                    const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
                    dispatch(addConnection(res.data));
                } catch (err) {
                    console.error("Failed to fetch connections:", err);
                }
            }
        };
        fetchConnections();
    }, [connections, dispatch, targetUser]);

    // Socket Connection
   useEffect(() => {
  if (!userId) return;

  const socket = createSocketConnection();
  socketRef.current = socket;

  socket.on("connect", () => {
    console.log("✅ socket connected", socket.id);
    socket.emit("joinChat", userId, id);
  });

  socket.on("chatHistory", setMessages);
  socket.on("receiveMessage", (msg) =>
    setMessages((prev) => [...prev, msg])
  );

  socket.on("userTyping", () => setIsTyping(true));
  socket.on("userStopTyping", () => setIsTyping(false));

  return () => {
    socket.off();          // remove listeners
    socket.disconnect();   // disconnect ON UNMOUNT ONLY
  };
}, []); // 👈 EMPTY dependency array

useEffect(() => {
  if (socketRef.current?.connected) {
    socketRef.current.emit("joinChat", userId, id);
  }
}, [id]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit("sendMessage", userId, id, newMessage);
            socketRef.current.emit("userStopTyping", userId, id);

            // Optimistic update
            const msg = {
                _id: Date.now().toString() + Math.random().toString(), // Temp ID
                text: newMessage,
                sender: userId,
                createdAt: new Date().toISOString()
            };
            setMessages((prev) => [...prev, msg]);
            setNewMessage("");

            clearTimeout(typingTimeoutRef.current);
        } else {
            // Fallback: Store optimistically but maybe mark as pending? 
            // For now we just don't send if not connected to avoid data loss confusion.
            console.warn("Socket not connected, message not sent.");
        }
    }

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);

        if (!socketRef.current || !socketRef.current.connected) return;

        const now = Date.now();
        // Throttle "userTyping" event
        if (now - lastTypingTimeRef.current > 2000) {
            socketRef.current.emit("userTyping", userId, id);
            lastTypingTimeRef.current = now;
        }

        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            if (socketRef.current) {
                socketRef.current.emit("userStopTyping", userId, id);
            }
        }, 1000);
    };

    // Prevent rendering until we have the current user to avoid socket/logic errors
    if (!currentUser) return (
        <div className="flex justify-center items-center h-[calc(100vh-4rem)] bg-base-200">
            <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
    );

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-base-200">
            {/* Chat Header */}
            <div className="flex items-center px-4 py-3 bg-base-100/80 backdrop-blur-md border-b border-base-300 shadow-sm z-10 sticky top-0">
                <Link to="/connections" className="btn btn-ghost btn-circle btn-sm mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </Link>

                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                        {targetUser?.photoUrl ? (
                            <img src={targetUser.photoUrl} alt={targetUser.name} />
                        ) : (
                            <span className="text-xl">{targetUser?.name?.[0] || "?"}</span>
                        )}
                    </div>
                </div>

                <div className="ml-3">
                    <h2 className="font-bold text-base-content">{targetUser?.name || "Chat Room"}</h2>
                    <p className="text-xs text-base-content/60">{isTyping ? "Typing..." : (targetUser ? "Online" : "Connecting...")}</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-base-content/40">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        <p>No messages yet. Say hello!</p>
                    </div>
                )}

                {messages.map((msg) => {
                    const isMe = msg.sender === userId;
                    return (
                        <div key={msg._id} className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
                            <div className="chat-image avatar">
                                <div className="w-8 rounded-full">
                                    {isMe ? (
                                        <img src={viewProfilePhoto(currentUser, isMe)} alt="Me" />
                                    ) : (
                                        targetUser?.photoUrl ? <img src={targetUser.photoUrl} alt="Other" /> : <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center rounded-full"><span>?</span></div>
                                    )}
                                </div>
                            </div>
                            <div className="chat-header opacity-50 text-xs mb-1">
                                {isMe ? "You" : (targetUser?.name || "User")}
                                <time className="ml-1 text-[10px]">{formatTime(msg.createdAt)}</time>
                            </div>
                            <div className={`chat-bubble ${isMe ? "chat-bubble-primary shadow-lg" : "chat-bubble-base-100 shadow-sm bg-white text-black dark:bg-gray-800 dark:text-white"}`}>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}

                {isTyping && (
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-8 rounded-full">
                                {targetUser?.photoUrl ? <img src={targetUser.photoUrl} alt="Typing..." /> : <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center rounded-full"><span>?</span></div>}
                            </div>
                        </div>
                        <div className="chat-bubble bg-base-100 text-base-content/70 shadow-sm">
                            <span className="loading loading-dots loading-xs"></span>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-base-100/80 backdrop-blur-md border-t border-base-300">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="input input-bordered w-full rounded-full pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm glass-input"
                        value={newMessage}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className={`btn btn-circle btn-primary absolute right-1 z-1 transition-transform ${newMessage.trim() ? "scale-100" : "scale-90 opacity-80"}`}
                        disabled={!newMessage.trim()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

// Helper for profile photo to handle missing url or data
const viewProfilePhoto = (user, isMe) => {
    if (isMe && user?.photoUrl) return user.photoUrl;
    return "https://via.placeholder.com/150";
}

export default Chat;