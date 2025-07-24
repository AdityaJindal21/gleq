import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ closeModellogin, openModalSignUp }) => {
  const [obj, setobj] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  function handleforgotpassword()
  {
    navigate('/forgotpassword')
  }

 
  function doupdate(event) {
    const { name, value } = event.target;
    setobj({ ...obj, [name]: value });
    setError(false); 
    if (name === 'email') {
      setEmailError(!/\S+@\S+\.\S+/.test(value)); 
    }
  }

  
  async function dologin() {
    if (!obj.email.trim() || !obj.password.trim()) {
      setError(true);
      return;
    }

    if (emailError) {
      setError(true);
      return;
    }

    try {
      const url = `http://localhost:2027/saveuser/loginuser`;
      const resp = await axios.post(url, obj, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (resp.data.status) {
        localStorage.setItem("studysync_token", resp.data.token);
        closeModellogin();
        navigate("/dashboard");
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(true);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Welcome Back</h2>
    <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg border max-w-md w-full mx-auto">
      <h2 className="text-3xl font-semibold text-center text-blue-950 mb-6">Login to StudySync</h2>

     
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          value={obj.email}
          onChange={doupdate}
          className={`w-full px-4 py-3 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition
            ${error || emailError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-900"}
          `}
        />
        {emailError && <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>}
      </div>

      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          value={obj.password}
          onChange={doupdate}
          className={`w-full px-4 py-3 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-900"}
          `}
        />
      </div>
      <div className="text-right">
        <span className="text-sm text-indigo-600 hover:underline cursor-pointer">
          <a onClick={handleforgotpassword}>
            Forgot Password?
            </a>
          </span>
        </div>

     
      {error && (
        <p className="text-red-600 text-sm text-center -mt-2">
          Invalid email or password.
        </p>
      )}

      
      <button
        type="button"
        onClick={dologin}
        className="w-full bg-blue-950 text-white py-3 rounded-md font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
      >
        Login
      </button>

     
      <div className="text-center mt-4">
  <p className="text-sm text-gray-500">
    Don't have an account?{" "}
    <span
      onClick={openModalSignUp}
      className="cursor-pointer text-indigo-600 hover:underline"
    >
      Sign Up
    </span>
  </p>
</div>
    </form>
    </div>
  );
};

export default LoginForm;
