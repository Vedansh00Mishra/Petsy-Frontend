import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../AppWrapper";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/signup",
        { fullName, username, email, phone, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setFullName("");
      setUsername("");
      setEmail("");
      setPhone("");
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://plus.unsplash.com/premium_photo-1661724637207-be0c86fa6269?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Register Illustration"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Form Section */}
        <section className="p-6 md:w-1/2 w-full flex flex-col justify-center">
          <div className="text-center mb-6">
            
            <h3 className="text-2xl font-bold">Create a new account</h3>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  type="text"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <FaPencilAlt className="text-gray-500" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  type="text"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FaPencilAlt className="text-gray-500" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  type="email"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline className="text-gray-500" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  type="tel"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPencilAlt className="text-gray-500" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  type="password"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill className="text-gray-500" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                onClick={handleRegister}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
              <Link
                to="/users/login"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Login Now
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Signup;
