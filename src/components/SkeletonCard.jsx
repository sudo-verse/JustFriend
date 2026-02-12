import React from 'react'

// Skeleton for Feed UserCard
export const FeedSkeleton = () => (
    <div className="relative w-full max-w-sm h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-base-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-base-300/90 via-base-300/40 to-transparent" />
        <div className="absolute bottom-28 left-6 right-6 space-y-3">
            <div className="h-8 bg-base-300 rounded-lg w-2/3"></div>
            <div className="h-4 bg-base-300 rounded w-1/4"></div>
            <div className="h-4 bg-base-300 rounded w-full mt-4"></div>
            <div className="h-4 bg-base-300 rounded w-3/4"></div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 px-6">
            <div className="w-14 h-14 rounded-full bg-base-300"></div>
            <div className="w-14 h-14 rounded-full bg-base-300"></div>
        </div>
    </div>
)

// Skeleton for Connection/Request cards
export const CardSkeleton = () => (
    <div className="glass-card rounded-2xl p-6 flex flex-col items-center animate-pulse">
        <div className="w-24 h-24 rounded-full bg-base-300 mb-4"></div>
        <div className="h-5 bg-base-300 rounded w-28 mb-2"></div>
        <div className="h-3 bg-base-300 rounded w-40 mb-2"></div>
        <div className="h-3 bg-base-300 rounded w-32 mb-4"></div>
        <div className="h-9 bg-base-300 rounded-full w-full"></div>
    </div>
)

// Grid of card skeletons
export const CardGridSkeleton = ({ count = 8 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
)

export default FeedSkeleton
