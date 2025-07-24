import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStep(2);
    let url = `https://gleqbackend-production.up.railway.app/saveuser/sendotp?email=${email}`;
    const resp = await axios.get(url);
    if(resp.data.status)
    {
      alert(resp.data.msg);
    }
    else{
      alert(resp.data.msg);
    }
    setError("");
    
    
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }
    let url = `https://gleqbackend-production.up.railway.app/saveuser/verifyotp?email=${email}&otp=${otp}`
    const resp = await axios.get(url);
    if(resp.data.status)
    {
      alert(resp.data.msg);
      navigate(`/reset-password?email=${email}`);
    }
    else
    {
      alert(resp.data.msg);
    }

    setError("");
  };

  const handleCancel = () => {
    setEmail("");
    setOtp("");
    setError("");
    setStep(1);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg border max-w-md w-full mx-auto">
        <h2 className="text-3xl font-semibold text-center text-blue-950 mb-6">
          {step === 1 ? "Reset Your Password" : "Enter OTP"}
        </h2>

        
        {step === 1 && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition
                ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-900"}
              `}
            />
          </div>
        )}

        
        {step === 2 && (
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter the 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={`w-full px-4 py-3 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition
                ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-900"}
              `}
            />
          </div>
        )}

        
        {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

        
        <div className="flex justify-between gap-4">
          {step === 1 ? (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-blue-950 text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition duration-200"
            >
              Send OTP
            </button>
          ) : (
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full bg-blue-950 text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition duration-200"
            >
              Verify OTP
            </button>
          )}

          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-gray-700 text-white py-3 rounded-md font-semibold hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
