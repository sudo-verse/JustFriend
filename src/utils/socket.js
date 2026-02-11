import { io } from "socket.io-client";

let socket;

const SOCKET_URL =
    location.hostname === "localhost"
        ? "http://localhost:7776"
        : window.location.origin; // In production, nginx proxies /socket.io/ to the backend

const createSocketConnection = () => {
    // If socket exists but is disconnected, clear it so we create a fresh one
    if (socket && socket.disconnected) {
        socket.removeAllListeners();
        socket = null;
    }

    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ["websocket", "polling"], // allow polling fallback for mobile
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
            timeout: 20000,
        });
    }
    return socket;
};

export const destroySocketConnection = () => {
    if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
        socket = null;
    }
};

export default createSocketConnection;
