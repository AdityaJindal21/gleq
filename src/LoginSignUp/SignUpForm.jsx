import axios from "axios";
import React, { useState } from "react";

const SignUpForm = ({ closeModel, openModalLogin }) => {
  const [obj, setobj] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: ""
  });

  const [emailError, setEmailError] = useState(false);

  const isPasswordMatch =
    obj.password === obj.conpassword && obj.password.length > 0;

  function doupdate(event) {
    const { name, value } = event.target;
    setobj({ ...obj, [name]: value });

    if (name === "email") {
      setEmailError(!/^\S+@\S+\.\S+$/.test(value));
    }
  }

  async function dosaveuser() {
    let url = `http://localhost:2027/saveuser/registeruser`;
    var userinfo = {
      name: obj.name,
      email: obj.email,
      password: obj.password
    };
    let resp = await axios.post(url, userinfo, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    alert(resp.data.msg);
    closeModel();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">Ready to Get Started?</h2>
    <form className="space-y-5 bg-white p-6 rounded-lg shadow-lg border max-w-md w-full mx-auto">
      <h2 className="text-3xl font-semibold text-center text-blue-950 mb-4">Create Your Account</h2>

      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={obj.name}
          onChange={doupdate}
          className="w-full px-4 py-2.5 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 border-gray-300 transition"
        />
      </div>

      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={obj.email}
          onChange={doupdate}
          className={`w-full px-4 py-2.5 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition
            ${emailError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-900"}
          `}
        />
        {emailError && (
          <p className="text-red-600 text-sm mt-1">Please enter a valid email address.</p>
        )}
      </div>

      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={obj.password}
          onChange={doupdate}
          className="w-full px-4 py-2.5 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900 border-gray-300 transition"
        />
      </div>

      
      <div>
        <label htmlFor="conpassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="conpassword"
          value={obj.conpassword}
          onChange={doupdate}
          className={`w-full px-4 py-2.5 border rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition
            ${!isPasswordMatch && obj.conpassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-900"}
          `}
        />
        {!isPasswordMatch && obj.conpassword && (
          <p className="text-red-600 text-sm mt-1">❌ Passwords do not match</p>
        )}
      </div>

      
      <button
        type="button"
        onClick={dosaveuser}
        disabled={!isPasswordMatch || emailError}
        className={`w-full py-2.5 rounded-md font-semibold transition
          ${isPasswordMatch && !emailError
            ? "bg-blue-950 hover:bg-blue-900 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"}
        `}
      >
        Sign Up
      </button>

      
      <div className="text-center mt-2">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={openModalLogin}
            className="cursor-pointer text-indigo-600 hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;
