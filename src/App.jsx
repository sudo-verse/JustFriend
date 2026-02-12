import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { Toaster } from 'react-hot-toast'

// Public pages (lazy-loaded for code splitting)
const PublicLayout = lazy(() => import('./components/PublicLayout.jsx'))
const LandingPage = lazy(() => import('./components/LandingPage.jsx'))
const FeaturesPage = lazy(() => import('./components/FeaturesPage.jsx'))
const HowItWorksPage = lazy(() => import('./components/HowItWorksPage.jsx'))
const AboutPage = lazy(() => import('./components/AboutPage.jsx'))

// Authenticated route components (lazy-loaded)
const Login = lazy(() => import('./components/Login.jsx'))
const Profile = lazy(() => import('./components/Profile.jsx'))
const Feed = lazy(() => import('./components/Feed.jsx'))
const Connections = lazy(() => import('./components/Connections.jsx'))
const Requests = lazy(() => import('./components/Requests.jsx'))
const Premium = lazy(() => import('./components/Premium.jsx'))
const Chat = lazy(() => import('./components/Chat.jsx'))
const PaymentSuccess = lazy(() => import('./components/PaymentSuccess.jsx'))
const UserProfile = lazy(() => import('./components/UserProfile.jsx'))

// Loading fallback for code-split routes
const RouteFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <span className="loading loading-spinner loading-lg text-primary"></span>
  </div>
)

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <ErrorBoundary>
          <BrowserRouter basename='/'>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {/* ── PUBLIC ROUTES (SEO-friendly, no auth required) ── */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Route>

                {/* ── AUTHENTICATED ROUTES (behind Body auth wrapper) ── */}
                <Route path="/app" element={<Body />}>
                  <Route index element={<Feed />} />
                  <Route path="login" element={<Login />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="feed" element={<Feed />} />
                  <Route path="connections" element={<Connections />} />
                  <Route path="requests" element={<Requests />} />
                  <Route path="premium" element={<Premium />} />
                  <Route path="chat/:id" element={<Chat />} />
                  <Route path="payment-success" element={<PaymentSuccess />} />
                  <Route path="user/:id" element={<UserProfile />} />
                </Route>

                {/* ── LEGACY ROUTES (backward compatibility) ── */}
                <Route path="/login" element={<Body />}>
                  <Route index element={<Login />} />
                </Route>
                <Route path="/feed" element={<Body />}>
                  <Route index element={<Feed />} />
                </Route>
                <Route path="/profile" element={<Body />}>
                  <Route index element={<Profile />} />
                </Route>
                <Route path="/connections" element={<Body />}>
                  <Route index element={<Connections />} />
                </Route>
                <Route path="/requests" element={<Body />}>
                  <Route index element={<Requests />} />
                </Route>
                <Route path="/premium" element={<Body />}>
                  <Route index element={<Premium />} />
                </Route>
                <Route path="/chat/:id" element={<Body />}>
                  <Route index element={<Chat />} />
                </Route>
                <Route path="/payment-success" element={<Body />}>
                  <Route index element={<PaymentSuccess />} />
                </Route>
                <Route path="/user/:id" element={<Body />}>
                  <Route index element={<UserProfile />} />
                </Route>

                {/* ── 404 PAGE ── */}
                <Route path="*" element={
                  <div className="flex flex-col items-center justify-center min-h-screen bg-base-300 text-center">
                    <span className="text-9xl mb-4">🤔</span>
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">404</h1>
                    <p className="text-xl font-medium opacity-70">Oops! Looks like you're lost.</p>
                    <a href="/" className="btn btn-primary mt-8">Go Home</a>
                  </div>
                } />
              </Routes>
            </Suspense>
          </BrowserRouter>

          {/* Global Toast Container */}
          <Toaster
            toastOptions={{
              style: {
                borderRadius: '12px',
                background: 'oklch(var(--b1))',
                color: 'oklch(var(--bc))',
                border: '1px solid oklch(var(--b3))',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: 'oklch(var(--su))',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: 'oklch(var(--er))',
                  secondary: 'white',
                },
              },
            }}
          />
        </ErrorBoundary>
      </Provider>
    </div>
  )
}

export default App
