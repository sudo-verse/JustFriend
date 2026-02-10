import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(BASE_URL + "/payment/create", { membershipType: type }, { withCredentials: true });
      console.log(order);
      const { amount, keyId, currency, orderId } = order.data;
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: 'CampusVerse Premium',
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} Membership`,
        order_id: orderId, // This is the order_id created in the backend
        callback_url: 'https://campusverse.duckdns.org/payment-success', // Your success URL
        prefill: {
          name: 'User',
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: {
          color: type === 'gold' ? '#FFD700' : '#C0C0C0'
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-300 p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl z-10 items-stretch">

        {/* Silver Card */}
        <div className="flex-1 glass-card rounded-3xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl border border-white/20 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-300 to-gray-500"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gray-400/20 rounded-full blur-2xl group-hover:bg-gray-400/30 transition-colors"></div>

          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 mb-2">Silver</h1>
          <p className="text-sm font-semibold opacity-60 mb-8 uppercase tracking-widest">Standard Tier</p>

          <ul className="space-y-4 mb-8 text-base-content/80">
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Blue Tick Verification
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              100 Connections / day
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              5 Profile Boosts / day
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Ad-free Experience
            </li>
          </ul>
          <div className="mt-auto">
            <button onClick={() => handleBuyClick("silver")} className="btn w-full rounded-full bg-gradient-to-r from-gray-400 to-gray-600 border-none text-white hover:opacity-90 shadow-lg">
              Get Silver
            </button>
          </div>
        </div>

        {/* Gold Card */}
        <div className="flex-1 glass-card rounded-3xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl border border-yellow-500/30 relative overflow-hidden group shadow-[0_0_50px_-12px_rgba(255,215,0,0.3)]">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-2xl group-hover:bg-yellow-500/30 transition-colors"></div>

          <div className="absolute top-4 right-4 badge badge-warning gap-1 shadow-md">
            BEST VALUE
          </div>

          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 to-yellow-500 mb-2">Gold</h1>
          <p className="text-sm font-semibold text-yellow-500/80 mb-8 uppercase tracking-widest">Premium Tier</p>

          <ul className="space-y-4 mb-8 text-base-content/90 font-medium">
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Blue Tick Verification
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Unlimited Connections
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              10 Profile Boosts / day
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Ad-free Experience
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Priority Support
            </li>
          </ul>
          <div className="mt-auto">
            <button onClick={() => handleBuyClick("gold")} className="btn w-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 border-none text-white hover:opacity-90 shadow-lg shadow-yellow-500/20">
              Get Gold
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Premium;
