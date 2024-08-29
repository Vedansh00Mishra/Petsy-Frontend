import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../AppWrapper";

const DonationDetails = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();
  const { isAuthorized } = useContext(Context);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/pets/donate/${id}`, {
          withCredentials: true,
        });
        setDonation(data.donation);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.error : "Server Error");
        setLoading(false);
        navigateTo("/notfound");
      }
    };

    fetchDonation();
  }, [id, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/users/login");
    }
  }, [isAuthorized, navigateTo]);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;
  }

  if (!donation) {
    return <p className="text-center mt-4">Donation not found</p>;
  }

  // Ensure donation.image exists before accessing secure_url
  const imageUrl = donation.image ? donation.image.secure_url : "";

  return (
    <section className="donationDetail page">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-4">Donation Details</h3>
        <div className="banner bg-gray-100 rounded-lg p-4">
          <div className="image mb-4">
            {donation.image ? (
              <img src={imageUrl} alt={donation.petName} className="w-full rounded-lg shadow-lg" />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <p className="mb-2"><span className="font-bold">Pet Name:</span> {donation.petName}</p>
              <p className="mb-2"><span className="font-bold">Pet Type:</span> {donation.petType}</p>
              <p className="mb-2"><span className="font-bold">Pet Breed:</span> {donation.petBreed}</p>
              <p className="mb-2"><span className="font-bold">Age:</span> {donation.Age}</p>
              <p className="mb-2"><span className="font-bold">Gender:</span> {donation.Gender}</p>
              <p className="mb-2"><span className="font-bold">Owner's Name:</span> {donation.OwnersName}</p>
              <p className="mb-2"><span className="font-bold">Owner's Phone:</span> {donation.OwnersPhone}</p>
              <p className="mb-2"><span className="font-bold">State:</span> {donation.State}</p>
              <p className="mb-2"><span className="font-bold">City:</span> {donation.City}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="mb-2"><span className="font-bold">Vaccinated:</span> {donation.petVaccinated ? 'Yes' : 'No'}</p>
              <p className="mb-2"><span className="font-bold">Neutered:</span> {donation.petNeutered ? 'Yes' : 'No'}</p>
              <p className="mb-2"><span className="font-bold">Spayed:</span> {donation.petSpayed ? 'Yes' : 'No'}</p>
              <p className="mb-2"><span className="font-bold">Shots:</span> {donation.petShots ? 'Yes' : 'No'}</p>
              <p className="mb-2"><span className="font-bold">Good with Dogs:</span> {donation.petIsGoodWithDogs ? 'Yes' : 'No'}</p>
              <p className="mb-2"><span className="font-bold">Good with Cats:</span> {donation.petIsGoodWithCats ? 'Yes' : 'No'}</p>
              <p className="mb-2"><span className="font-bold">Good with Kids:</span> {donation.petIsGoodWithKids ? 'Yes' : 'No'}</p>
              <p className="mb-2"><span className="font-bold">Reason for Donation:</span> {donation.reasonForDonation}</p>
              <p className="mb-2"><span className="font-bold">Posted By:</span> {donation.owner ? donation.owner.fullName : "Unknown"}</p>
              <p className="mb-2"><span className="font-bold">Posted On:</span> {new Date(donation.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationDetails;
