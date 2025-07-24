import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
    const navigate = useNavigate();
    const query = useQuery();
  const email = query.get("email");
  const [formData, setFormData] = useState({
    email:email,
    newPassword: '',
    confirmNewPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlechangePassword = async (e) => {
    setMessage('');
    setError('');
    const { newPassword, confirmNewPassword } = formData;

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
        let url = `http://localhost:2027/saveuser/doresetpassword`;
        const resp = await axios.post(url,formData,{headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }})
        if(resp.data.status)
        {
            alert("Password Changed Successfully");
            setFormData({
                email: '',
                newPassword: '',
                confirmNewPassword: '',
            });
            navigate('/');
        }
        else{
            setError(resp.data.msg)
        } 
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div className="max-w-md w-full mx-auto mt-16 px-6 sm:px-8">
      <div className="bg-white shadow-md rounded-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Change Password
        </h2>

        <form  className="space-y-5">
        
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handlechangePassword}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-950 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-900 transition disabled:opacity-60 cursor-pointer"
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            Change Password
          </button>

          {message && (
            <p className="text-green-600 text-center text-sm mt-3">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-center text-sm mt-3">{error}</p>
          )}
        </form>
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;
