import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-base-300 text-center p-6 relative overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-error/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>

                    <div className="glass-card p-10 rounded-3xl max-w-md w-full relative z-10">
                        <div className="text-6xl mb-4">💥</div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-error to-warning mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-base-content/70 mb-6">
                            An unexpected error occurred. Please try refreshing the page.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="btn btn-primary rounded-full px-6"
                            >
                                Refresh Page
                            </button>
                            <button
                                onClick={() => {
                                    this.setState({ hasError: false, error: null })
                                    window.location.href = '/'
                                }}
                                className="btn btn-ghost rounded-full px-6"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
