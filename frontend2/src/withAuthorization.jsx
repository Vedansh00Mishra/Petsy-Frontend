import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./main";
import axios from "axios";

const withAuthorization = (WrappedComponent) => {
  return (props) => {
    const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
    const navigate = useNavigate();

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
    }, []); // Empty dependency array to run only on mount

    useEffect(() => {
      // Redirect if not authorized
      if (!isAuthorized) {
        navigate("/users/login");
      }
    }, [isAuthorized, navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;
