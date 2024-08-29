import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "./AppWrapper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-hidden">
        {/* Form Section */}
        <section className="p-6 md:w-1/2 w-full flex flex-col justify-center">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Login to your account</h3>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  type="email"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline className="text-gray-500" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  type="password"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill className="text-gray-500" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <Link to="/users/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Register Now
              </Link>
            </div>
          </form>
        </section>
        {/* Logo Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
          <img src="/LOGO.png" alt="PETSY Logo" className="max-w-full max-h-full p-6" />
        </div>
      </div>
    </div>
  );
};

export default Login;
