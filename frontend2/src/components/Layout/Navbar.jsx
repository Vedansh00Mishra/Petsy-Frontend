import React, { useContext, useState } from "react";
import { Context } from "../../AppWrapper";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/users/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/users/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true); // Keep user authorized on error (handle as needed)
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/LOGO.png" alt=""  />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/pets/donations"} onClick={() => setShow(false)}>
              PETS
            </Link>
          </li>
          <li>
            <Link to={"/pets/donations/me"} onClick={() => setShow(false)}>
            My Donations
            </Link>
          </li>
        
            <>
              <li>
                <Link to={"/pets/donate/post"} onClick={() => setShow(false)}>
                  POST Donation
                </Link>
              </li>
              
            </>
        
          <button onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "LOGOUT"}
          </button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
    
  );

};

export default Navbar;
