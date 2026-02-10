import React from 'react'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-100 p-4">
            <div className="card w-full max-w-md bg-base-200/50 backdrop-blur-md shadow-xl border border-success/20">
                <div className="card-body items-center text-center py-10">
                    <div className="avatar placeholder mb-4">
                        <div className="bg-success text-success-content rounded-full w-24 h-24 ring ring-success ring-offset-base-100 ring-offset-2 animate-pulse shadow-lg shadow-success/40 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="card-title text-3xl font-bold text-success mb-2">Payment Successful!</h2>

                    <p className="opacity-70 mb-6">
                        Thank you for your purchase. Your premium membership is now active. Enjoy exclusive features!
                    </p>

                    <div className="flex flex-col gap-3 w-full">
                        <Link to="/feed" className="btn btn-primary w-full rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                            Go to Feed
                        </Link>
                        <Link to="/profile" className="btn btn-ghost btn-outline btn-sm w-full rounded-full">
                            Check Profile Status
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess
