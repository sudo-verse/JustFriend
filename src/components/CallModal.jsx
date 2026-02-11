import { useState, useEffect, useRef, useCallback } from "react";

// ICE servers for NAT traversal
const ICE_SERVERS = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
    ],
};

const CallModal = ({
    socket,
    userId,
    targetUserId,
    targetUserName,
    targetUserPhoto,
    callType: initialCallType, // "audio" | "video"
    isIncoming,
    incomingOffer,
    callerName,
    callerPhoto,
    onClose,
}) => {
    const [callState, setCallState] = useState(isIncoming ? "ringing" : "calling");
    // calling → waiting for answer  |  ringing → incoming  |  connected  |  ended
    const [callDuration, setCallDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [callType, setCallType] = useState(initialCallType);

    const peerRef = useRef(null);
    const localStreamRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const timerRef = useRef(null);
    const ringtoneRef = useRef(null);

    // ── Cleanup function ──
    const cleanup = useCallback(() => {
        clearInterval(timerRef.current);

        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((t) => t.stop());
            localStreamRef.current = null;
        }
        if (peerRef.current) {
            peerRef.current.close();
            peerRef.current = null;
        }
        if (ringtoneRef.current) {
            ringtoneRef.current.pause();
            ringtoneRef.current = null;
        }
    }, []);

    // ── Start call timer ──
    const startTimer = useCallback(() => {
        timerRef.current = setInterval(() => setCallDuration((d) => d + 1), 1000);
    }, []);

    // ── Create RTCPeerConnection ──
    const createPeer = useCallback(() => {
        const peer = new RTCPeerConnection(ICE_SERVERS);

        peer.onicecandidate = (event) => {
            if (event.candidate && socket) {
                socket.emit("iceCandidate", {
                    to: targetUserId,
                    candidate: event.candidate,
                });
            }
        };

        peer.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        peer.oniceconnectionstatechange = () => {
            if (peer.iceConnectionState === "disconnected" || peer.iceConnectionState === "failed") {
                handleEndCall();
            }
        };

        peerRef.current = peer;
        return peer;
    }, [socket, targetUserId]);

    // ── Get local media ──
    const getLocalMedia = useCallback(async () => {
        try {
            const constraints = {
                audio: true,
                video: callType === "video" ? { facingMode: "user" } : false,
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            localStreamRef.current = stream;
            // Attach to video element immediately if ref is available
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
                // Force play for mobile browsers
                localVideoRef.current.play().catch(() => { });
            }
            return stream;
        } catch (err) {
            console.error("Failed to get media:", err);
            setCallState("ended");
            return null;
        }
    }, [callType]);

    // ── Initiate outgoing call ──
    const initiateCall = useCallback(async () => {
        const stream = await getLocalMedia();
        if (!stream) return;

        const peer = createPeer();
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));

        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        socket.emit("callUser", {
            from: userId,
            to: targetUserId,
            offer,
            callerName: targetUserName, // actually current user's name
            callerPhoto: "",
            callType,
        });
    }, [getLocalMedia, createPeer, socket, userId, targetUserId, callType, targetUserName]);

    // ── Answer incoming call ──
    const answerCall = useCallback(async () => {
        setCallState("connected");
        startTimer();

        const stream = await getLocalMedia();
        if (!stream) return;

        const peer = createPeer();
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));

        await peer.setRemoteDescription(new RTCSessionDescription(incomingOffer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        socket.emit("answerCall", { to: targetUserId, answer });
    }, [getLocalMedia, createPeer, socket, targetUserId, incomingOffer, startTimer]);

    // ── Reject incoming call ──
    const rejectCall = useCallback(() => {
        socket.emit("rejectCall", { to: targetUserId });
        setCallState("ended");
        setTimeout(() => {
            cleanup();
            onClose();
        }, 500);
    }, [socket, targetUserId, cleanup, onClose]);

    // ── End active call ──
    const handleEndCall = useCallback(() => {
        socket.emit("endCall", { to: targetUserId });
        setCallState("ended");
        setTimeout(() => {
            cleanup();
            onClose();
        }, 800);
    }, [socket, targetUserId, cleanup, onClose]);

    // ── Toggle mute ──
    const toggleMute = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
            setIsMuted((m) => !m);
        }
    };

    // ── Toggle video ──
    const toggleVideo = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
            setIsVideoOff((v) => !v);
        }
    };

    // ── Format duration ──
    const formatDuration = (s) => {
        const mins = Math.floor(s / 60).toString().padStart(2, "0");
        const secs = (s % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };

    // ── Setup socket listeners & initiate ──
    useEffect(() => {
        if (!socket) return;

        // Caller: when callee answers
        const onCallAnswered = async ({ answer }) => {
            if (peerRef.current) {
                await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
                setCallState("connected");
                startTimer();
            }
        };

        // ICE candidates from peer
        const onIceCandidate = async ({ candidate }) => {
            if (peerRef.current && candidate) {
                try {
                    await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (e) {
                    console.error("Error adding ICE candidate:", e);
                }
            }
        };

        // Call ended by peer
        const onCallEnded = () => {
            setCallState("ended");
            setTimeout(() => {
                cleanup();
                onClose();
            }, 800);
        };

        // Call rejected by peer
        const onCallRejected = () => {
            setCallState("ended");
            setTimeout(() => {
                cleanup();
                onClose();
            }, 800);
        };

        // Call failed (user offline)
        const onCallFailed = ({ reason }) => {
            console.warn("Call failed:", reason);
            setCallState("ended");
            setTimeout(() => {
                cleanup();
                onClose();
            }, 1500);
        };

        socket.on("callAnswered", onCallAnswered);
        socket.on("iceCandidate", onIceCandidate);
        socket.on("callEnded", onCallEnded);
        socket.on("callRejected", onCallRejected);
        socket.on("callFailed", onCallFailed);

        // If outgoing, start now
        if (!isIncoming) {
            initiateCall();
        }

        return () => {
            socket.off("callAnswered", onCallAnswered);
            socket.off("iceCandidate", onIceCandidate);
            socket.off("callEnded", onCallEnded);
            socket.off("callRejected", onCallRejected);
            socket.off("callFailed", onCallFailed);
        };
    }, [socket, isIncoming, initiateCall, startTimer, cleanup, onClose]);

    // ── Re-attach streams when video refs become available (crucial for mobile) ──
    useEffect(() => {
        if (callState === "connected") {
            if (localVideoRef.current && localStreamRef.current && !localVideoRef.current.srcObject) {
                localVideoRef.current.srcObject = localStreamRef.current;
                localVideoRef.current.play().catch(() => { });
            }
            if (remoteVideoRef.current && peerRef.current) {
                const receivers = peerRef.current.getReceivers();
                if (receivers.length > 0 && !remoteVideoRef.current.srcObject) {
                    const remoteStream = new MediaStream();
                    receivers.forEach(receiver => {
                        if (receiver.track) remoteStream.addTrack(receiver.track);
                    });
                    if (remoteStream.getTracks().length > 0) {
                        remoteVideoRef.current.srcObject = remoteStream;
                        remoteVideoRef.current.play().catch(() => { });
                    }
                }
            }
        }
    }, [callState]);

    // ── Auto-timeout for ringing (30s) ──
    useEffect(() => {
        if (callState === "calling" || callState === "ringing") {
            const timeout = setTimeout(() => {
                if (callState === "calling" || callState === "ringing") {
                    handleEndCall();
                }
            }, 30000);
            return () => clearTimeout(timeout);
        }
    }, [callState, handleEndCall]);

    // ── Determine display name / photo ──
    const displayName = isIncoming ? callerName || "Unknown" : targetUserName || "User";
    const displayPhoto = isIncoming ? callerPhoto : targetUserPhoto;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

            {/* Call Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-between overflow-hidden">

                {/* ── Background glow effect ── */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${callState === "connected" ? "bg-emerald-500" : callState === "ended" ? "bg-red-500" : "bg-violet-500"}`} />
                </div>

                {/* ── Video / Audio elements (always mounted so refs are available) ── */}
                {/* Remote video – full screen when video call is connected, hidden otherwise */}
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    webkit-playsinline="true"
                    className={callType === "video" && callState === "connected"
                        ? "absolute inset-0 w-full h-full object-cover"
                        : "hidden"
                    }
                />
                {/* Local video – PIP when video call is connected, hidden otherwise */}
                <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    webkit-playsinline="true"
                    className={callType === "video" && callState === "connected"
                        ? "absolute top-20 right-4 w-36 h-48 rounded-2xl object-cover border-2 border-white/20 shadow-2xl z-20"
                        : "hidden"
                    }
                />

                {/* ── Top status bar ── */}
                <div className="relative z-20 w-full pt-12 pb-4 text-center">
                    <p className="text-white/60 text-sm font-medium tracking-wider uppercase">
                        {callState === "calling" && "Calling..."}
                        {callState === "ringing" && "Incoming Call"}
                        {callState === "connected" && formatDuration(callDuration)}
                        {callState === "ended" && "Call Ended"}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                        {callType === "video" ? "Video Call" : "Voice Call"}
                    </p>
                </div>

                {/* ── User info (shown when not in active video) ── */}
                {!(callType === "video" && callState === "connected") && (
                    <div className="relative z-20 flex flex-col items-center flex-1 justify-center -mt-12">
                        {/* Avatar */}
                        <div className={`relative mb-6 ${callState === "calling" || callState === "ringing" ? "animate-pulse" : ""}`}>
                            <div className={`w-32 h-32 rounded-full overflow-hidden border-4 transition-colors duration-500 shadow-2xl ${callState === "connected" ? "border-emerald-400/60" : callState === "ended" ? "border-red-400/60" : "border-white/20"}`}>
                                {displayPhoto ? (
                                    <img src={displayPhoto} alt={displayName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center">
                                        <span className="text-white text-5xl font-bold">{displayName[0]?.toUpperCase()}</span>
                                    </div>
                                )}
                            </div>
                            {/* Ripple rings for calling/ringing state */}
                            {(callState === "calling" || callState === "ringing") && (
                                <>
                                    <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-ping" />
                                    <div className="absolute -inset-3 rounded-full border border-white/5 animate-ping" style={{ animationDelay: "0.5s" }} />
                                    <div className="absolute -inset-6 rounded-full border border-white/5 animate-ping" style={{ animationDelay: "1s" }} />
                                </>
                            )}
                            {/* Connected indicator */}
                            {callState === "connected" && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-black/50 shadow-lg" />
                            )}
                        </div>

                        {/* Name */}
                        <h2 className="text-white text-3xl font-bold mb-2 tracking-tight">{displayName}</h2>
                        <p className={`text-sm font-medium transition-colors ${callState === "connected" ? "text-emerald-400" : callState === "ended" ? "text-red-400" : "text-white/50"}`}>
                            {callState === "calling" && "Ringing..."}
                            {callState === "ringing" && "wants to connect"}
                            {callState === "connected" && "Connected"}
                            {callState === "ended" && "Call Ended"}
                        </p>
                    </div>
                )}

                {/* ── Controls ── */}
                <div className="relative z-20 w-full pb-12 pt-6">
                    {/* Incoming call – accept/reject */}
                    {callState === "ringing" && (
                        <div className="flex items-center justify-center gap-16">
                            <button
                                onClick={rejectCall}
                                className="group flex flex-col items-center gap-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all hover:scale-110 active:scale-95">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-white rotate-[135deg]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <span className="text-white/60 text-xs font-medium">Decline</span>
                            </button>
                            <button
                                onClick={answerCall}
                                className="group flex flex-col items-center gap-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all hover:scale-110 active:scale-95 animate-bounce">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <span className="text-white/60 text-xs font-medium">Accept</span>
                            </button>
                        </div>
                    )}

                    {/* Active call controls */}
                    {callState === "connected" && (
                        <div className="flex items-center justify-center gap-6">
                            {/* Mute */}
                            <button onClick={toggleMute} className="flex flex-col items-center gap-1.5">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${isMuted ? "bg-white text-black" : "bg-white/15 text-white hover:bg-white/25"}`}>
                                    {isMuted ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 19L17.591 17.591L5.409 5.409L4 4" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 01-6-6v-1.5m6 7.5a6 6 0 006-6v-1.5m-6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-white/50 text-[10px] font-medium">{isMuted ? "Unmute" : "Mute"}</span>
                            </button>

                            {/* Toggle video */}
                            {callType === "video" && (
                                <button onClick={toggleVideo} className="flex flex-col items-center gap-1.5">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${isVideoOff ? "bg-white text-black" : "bg-white/15 text-white hover:bg-white/25"}`}>
                                        {isVideoOff ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V7.5a2.25 2.25 0 012.25-2.25h11.5M3 3l18 18" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-white/50 text-[10px] font-medium">{isVideoOff ? "Camera On" : "Camera Off"}</span>
                                </button>
                            )}

                            {/* End call */}
                            <button onClick={handleEndCall} className="flex flex-col items-center gap-1.5">
                                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all hover:scale-110 active:scale-95">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-white rotate-[135deg]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <span className="text-white/50 text-[10px] font-medium">End</span>
                            </button>
                        </div>
                    )}

                    {/* Calling / outgoing – just end button */}
                    {callState === "calling" && (
                        <div className="flex items-center justify-center">
                            <button onClick={handleEndCall} className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all hover:scale-110 active:scale-95">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-white rotate-[135deg]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <span className="text-white/60 text-xs font-medium">Cancel</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CallModal;
