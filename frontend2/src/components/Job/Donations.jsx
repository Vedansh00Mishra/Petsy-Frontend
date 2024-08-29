import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../AppWrapper";
import Footer from "../Layout/Footer";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  // Fetch donations from API on component mount
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/pets/donations", {
          withCredentials: true,
        });
        setDonations(data.donations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDonations();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Redirect to home page if user is not authorized
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="donations page">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">All Donations</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {donations.length > 0 ? (
            donations.map((donation) => (
              <div key={donation._id} className="bg-white rounded-lg overflow-hidden shadow-xl">
                {donation.image ? (
                  <img src={donation.image.secure_url} alt={donation.petName} className="w-full h-48 object-cover rounded-t-lg" />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gray-200 text-gray-600">
                    No Image Available
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xl font-bold mb-2">Pet Name: {donation.petName}</p>
                  <p className="text-gray-700 mb-2">Pet Type: {donation.petType}</p>
                  <p className="text-gray-700 mb-4">Owner's Name: {donation.ownersName}</p>
                  <Link to={`/pets/donate/${donation._id}`} className="text-blue-500 hover:underline">Donation Details</Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl font-bold">No donations available.</p>
          )}
        </div>
      </div>
    </section>
  );
};
<Footer/>
export default Donations;
