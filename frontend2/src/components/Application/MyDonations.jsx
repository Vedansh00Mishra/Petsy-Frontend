import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../AppWrapper";

const MyDonations = () => {
  const { user, isAuthorized } = useContext(Context);
  const [donations, setDonations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/pets/donations/me", {
          withCredentials: true,
        });
        setDonations(response.data.donations);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthorized) {
      fetchDonations();
    } else {
      navigate("/users/login");
    }
  }, [isAuthorized, navigate]);

  const deleteDonation = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/pets/donations/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setDonations((prevDonations) =>
            prevDonations.filter((donation) => donation._id !== id)
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openModal = (donation) => {
    setSelectedDonation(donation);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDonation(null);
    setModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="my_donations py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">My Donations</h1>
        {donations.length === 0 ? (
          <h4 className="text-xl">No Donations Found</h4>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donations.map((donation) => (
              <DonationCard
                key={donation._id}
                donation={donation}
                deleteDonation={deleteDonation}
                openModal={openModal}
              />
            ))}
          </div>
        )}
      </div>
      {modalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
            <span className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 cursor-pointer text-2xl" onClick={closeModal}>&times;</span>
            <div className="modal-body">
              <h2 className="text-xl font-bold mb-2">Donation Details</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <p><span className="font-bold">Pet Name:</span> {selectedDonation.petName}</p>
                <p><span className="font-bold">Pet Type:</span> {selectedDonation.petType}</p>
                <p><span className="font-bold">Age:</span> {selectedDonation.age}</p>
                <p><span className="font-bold">Gender:</span> {selectedDonation.gender}</p>
                <p><span className="font-bold">Owner's Name:</span> {selectedDonation.ownersName}</p>
                <p><span className="font-bold">Owner's Phone:</span> {selectedDonation.ownersPhone}</p>
                <p><span className="font-bold">State:</span> {selectedDonation.state}</p>
                <p><span className="font-bold">City:</span> {selectedDonation.city}</p>
                <p><span className="font-bold">Reason for Donation:</span> {selectedDonation.reasonForDonation}</p>
              </div>
              {selectedDonation.image && selectedDonation.image.secure_url && (
                <div className="mt-4">
                  <img src={selectedDonation.image.secure_url} alt="pet" className="rounded-lg shadow-md max-h-80 w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const DonationCard = ({ donation, deleteDonation, openModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="detail">
        <p><span className="font-bold">Pet Name:</span> {donation.petName}</p>
        <p><span className="font-bold">Pet Type:</span> {donation.petType}</p>
        <p><span className="font-bold">Age:</span> {donation.age}</p>
        <p><span className="font-bold">Gender:</span> {donation.gender}</p>
        <p><span className="font-bold">Owner's Name:</span> {donation.ownersName}</p>
        <p><span className="font-bold">Owner's Phone:</span> {donation.ownersPhone}</p>
        <p><span className="font-bold">State:</span> {donation.state}</p>
        <p><span className="font-bold">City:</span> {donation.city}</p>
        <p><span className="font-bold">Reason for Donation:</span> {donation.reasonForDonation}</p>
      </div>
      {donation.image && donation.image.secure_url && (
        <div className="mt-4">
          <img src={donation.image.secure_url} alt="pet" className="rounded-lg shadow-md max-h-40 w-full object-cover cursor-pointer" onClick={() => openModal(donation)} />
        </div>
      )}
      <div className="btn_area mt-4">
        <button className="bg-red-500 text-white py-1 px-1 rounded-lg shadow-md hover:bg-red-600" onClick={() => deleteDonation(donation._id)}>Delete Donation</button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <button className="bg-yellow-500 text-white py-1 px-1 rounded-lg shadow-md hover:bg-yellow-600" onClick={() => deleteDonation(donation._id)}>Edit Donation</button>
      </div>
    </div>
  );
};

export default MyDonations;
