import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../AppWrapper";

const PostDonation = () => {
  const { user } = useContext(Context);

  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [ownersName, setOwnersName] = useState("");
  const [ownersPhone, setOwnersPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [petVaccinated, setPetVaccinated] = useState("");
  const [petNeutered, setPetNeutered] = useState("");
  const [petSpayed, setPetSpayed] = useState("");
  const [petShots, setPetShots] = useState("");
  const [petIsGoodWithDogs, setPetIsGoodWithDogs] = useState("");
  const [petIsGoodWithCats, setPetIsGoodWithCats] = useState("");
  const [petIsGoodWithKids, setPetIsGoodWithKids] = useState("");
  const [reasonForDonation, setReasonForDonation] = useState("");
  const [image, setImage] = useState(null); // State to hold the selected image file

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Assuming single file upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to store both text and file data
    const formData = new FormData();
    formData.append("petName", petName);
    formData.append("petType", petType);
    formData.append("petBreed", petBreed);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("ownersName", ownersName);
    formData.append("ownersPhone", ownersPhone);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("petVaccinated", petVaccinated);
    formData.append("petNeutered", petNeutered);
    formData.append("petSpayed", petSpayed);
    formData.append("petShots", petShots);
    formData.append("petIsGoodWithDogs", petIsGoodWithDogs);
    formData.append("petIsGoodWithCats", petIsGoodWithCats);
    formData.append("petIsGoodWithKids", petIsGoodWithKids);
    formData.append("reasonForDonation", reasonForDonation);
    formData.append("image", image); // Append the selected image file
    formData.append("postedBy", user._id); // Append the user's ID

    try {
      const res = await axios.post("http://localhost:4000/api/pets/donate/post", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      // Reset form fields and state after successful submission
      setPetName("");
      setPetType("");
      setPetBreed("");
      setAge("");
      setGender("");
      setOwnersName("");
      setOwnersPhone("");
      setState("");
      setCity("");
      setPetVaccinated("");
      setPetNeutered("");
      setPetSpayed("");
      setPetShots("");
      setPetIsGoodWithDogs("");
      setPetIsGoodWithCats("");
      setPetIsGoodWithKids("");
      setReasonForDonation("");
      setImage(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="post_donation py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Post a Donation</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Name</label>
            <input type="text" value={petName} onChange={(e) => setPetName(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Type</label>
            <input type="text" value={petType} onChange={(e) => setPetType(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Breed</label>
            <input type="text" value={petBreed} onChange={(e) => setPetBreed(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
            <select value={age} onChange={(e) => setAge(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Select Age</option>
              <option value="puppyhood">Puppyhood</option>
              <option value="Adolescence">Adolescence</option>
              <option value="Adulthood">Adulthood</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Owner's Name</label>
            <input type="text" value={ownersName} onChange={(e) => setOwnersName(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Owner's Phone</label>
            <input type="text" value={ownersPhone} onChange={(e) => setOwnersPhone(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Vaccinated</label>
            <select value={petVaccinated} onChange={(e) => setPetVaccinated(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Neutered</label>
            <select value={petNeutered} onChange={(e) => setPetNeutered(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Spayed</label>
            <select value={petSpayed} onChange={(e) => setPetSpayed(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet Shots</label>
            <select value={petShots} onChange={(e) => setPetShots(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet is Good with Dogs</label>
            <select value={petIsGoodWithDogs} onChange={(e) => setPetIsGoodWithDogs(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet is Good with Cats</label>
            <select value={petIsGoodWithCats} onChange={(e) => setPetIsGoodWithCats(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pet is Good with Kids</label>
            <select value={petIsGoodWithKids} onChange={(e) => setPetIsGoodWithKids(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Reason for Donation</label>
            <textarea value={reasonForDonation} onChange={(e) => setReasonForDonation(e.target.value)} maxLength={300} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
            <input type="file" onChange={handleImageChange} accept="image/*" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">Submit Donation</button>
        </form>
      </div>
    </section>
  );
};

export default PostDonation;
