import React, { useContext, useEffect } from "react";
import "./App.css";
import "./index.css";
import { Context } from "./AppWrapper"; // Adjust the path if necessary
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Donations from "./components/Job/Donations";
import NotFound from "./components/NotFound/NotFound";
import DonationDetails from "./components/Job/PetDetails";
import PostDonation from "./components/Job/PostDonation";
import Signup from "./components/Auth/Register";
import MyDonations from "./components/Application/MyDonations";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users/getuser", {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    fetchUser();
  }, [setIsAuthorized, setUser]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Signup />} />
        <Route path="/" element={<Home />} />
        
        <Route path="/pets/donations" element={<Donations />} /> {/* Shows all donations  */}
        <Route path="/pets/donate/:id" element={<DonationDetails />} /> {/* Shows a particular donation detail */}
        <Route path="pets/donate/post" element={<PostDonation />} /> {/* Shows post donation form  */}
        <Route path="/pets/donations/me" element={<MyDonations />} /> {/* Shows all my or a users donations  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
