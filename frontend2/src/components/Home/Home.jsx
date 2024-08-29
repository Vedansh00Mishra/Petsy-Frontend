import React, { useContext, useRef } from "react";
import { Context } from "../../AppWrapper";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  const scrollContainerRef = useRef(null);

  if (!isAuthorized) {
    return <Navigate to={"/users/login"} />;
  }

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="homePage page">
        {/* Hero Section */}
        <section className="relative bg-blue-500 text-white py-20">
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Pet</h1>
            <p className="text-xl mb-6">Adopt a pet and bring joy to your home.</p>
            <Link to={`/pets/donations`} className="text-black p-1 rounded-md bg-white ">Browser Pets</Link>
          </div>
        </section>

        {/* Pet Adoption Journey */}
        <section className="py-20 bg-white">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1590634331662-660d6992a9f2?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Pet Adoption" className="h-vh w-2vw rounded-md" />
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
              <h2 className="text-3xl font-bold mb-4">Your Pet Adoption Journey With PETSY</h2>
              <p className="mb-4">
                <strong>Search Pet:</strong> Adopt a dog or cat who's right for you. Simply enter your city above to start your search.
              </p>
              <p className="mb-4">
                <strong>Connect:</strong> Once you find a pet, click "show number" to get contact info for their pet parent or rescue. Contact them to learn more about how to meet and adopt the pet.
              </p>
              <p className="mb-4">
                <strong>AdoptLove:</strong> The rescue or pet parents will walk you through their adoption process. Prepare your home for the arrival of your fur baby to help them adjust to their new family.
              </p>
              <p className="mb-4">
                <strong>Free Vet Consultation:</strong> ThePetNest will help your pet to settle down in its new home. Once you complete the adoption journey, reach out to us for a free vet consultation.
              </p>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:order-2">
              <img src="https://images.unsplash.com/photo-1504595403659-9088ce801e29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="About Us" className="rounded-md" />
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 md:mr-8 md:order-1">
              <h2 className="text-3xl font-bold mb-4">About Us</h2>
              <p className="mb-4">
                PETSY is dedicated to helping pets find their forever homes. We work with rescues and pet parents to provide a seamless adoption process.
              </p>
              <p className="mb-4">
                Our mission is to ensure every pet finds a loving and caring home. We offer resources and support to make the adoption journey smooth and joyful.
              </p>
              <p className="mb-4">
                Join us in our mission to provide a better life for pets. Whether you are looking to adopt or support our cause, PETSY is here to help.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae omnis explicabo ratione ipsa sint voluptas hic quaerat quam atque deleniti maiores architecto, dolores repellendus quia ex. Sequi autem est in dolorem omnis. Dignissimos ipsa minima eveniet assumenda eos culpa harum quasi in sapiente blanditiis, sint debitis?
              </p>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-20 bg-gray-200">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
            <div className="relative">
              <button onClick={handleScrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                &lt;
              </button>
              <div ref={scrollContainerRef} className="overflow-x-auto whitespace-nowrap space-x-4">
                <div className="inline-block bg-white rounded-lg shadow-lg p-6 w-80">
                  <p className="text-gray-700 mb-4">"Great experience adopting my dog from ThePetNest. Highly recommend!"</p>
                  <h4 className="font-bold">John Doe</h4>
                </div>
                <div className="inline-block bg-white rounded-lg shadow-lg p-6 w-80">
                  <p className="text-gray-700 mb-4">"Wonderful service and friendly staff. Found my perfect pet!"</p>
                  <h4 className="font-bold">Jane Smith</h4>
                </div>
                <div className="inline-block bg-white rounded-lg shadow-lg p-6 w-80">
                  <p className="text-gray-700 mb-4">"A seamless process from start to finish. Thank you, ThePetNest!"</p>
                  <h4 className="font-bold">Emily Johnson</h4>
                </div>
                <div className="inline-block bg-white rounded-lg shadow-lg p-6 w-80">
                  <p className="text-gray-700 mb-4">"A seamless process from start to finish. Thank you, ThePetNest!"</p>
                  <h4 className="font-bold">Emily Johnson</h4>
                </div>
                <div className="inline-block bg-white rounded-lg shadow-lg p-6 w-80">
                  <p className="text-gray-700 mb-4">"A seamless process from start to finish. Thank you, ThePetNest!"</p>
                  <h4 className="font-bold">Emily Johnson</h4>
                </div>
                <div className="inline-block bg-white rounded-lg shadow-lg p-6 w-80">
                  <p className="text-gray-700 mb-4">"A seamless process from start to finish. Thank you, ThePetNest!"</p>
                  <h4 className="font-bold">Emily Johnson</h4>
                </div>
                <div className="inline-block bg-white rounded-lg shadow-lg p-6 w-80">
                  <p className="text-gray-700 mb-4">"A seamless process from start to finish. Thank you, ThePetNest!"</p>
                  <h4 className="font-bold">Emily Johnson</h4>
                </div>
                {/* Add more reviews as needed */}
              </div>
              <button onClick={handleScrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                &gt;
              </button>
            </div>
          </div>
        </section>

        
      </section>
    </>
  );
};

export default Home;
