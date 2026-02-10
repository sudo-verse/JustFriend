import { io } from "socket.io-client";

let socket;

const createSocketConnection = () => {
    if (!socket) {
        socket = io("https://campusverse.duckdns.org", {
            transports: ["websocket"], // force upgrade
            reconnection: true,
            reconnectionAttempts: 5,
            timeout: 10000,
        });
    }
    return socket;
};

export default createSocketConnection;
