import React from 'react';

const doctorsData = [
  {
    id: 1,
    name: "Dr. Priyanka Das",
    
    image: "/das.jpg", // Replace with actual image paths
    // Removed twitter: "https://twitter.com/janedoe",
  },
  {
    id: 2,
    name: "Dr. Dhiraj Gupta",
    image: "/Gupta.avif",
    // Removed twitter: "https://twitter.com/johnsmith",
  },
  {
    id: 3,
    name: "Dr. Asimayan Nandi",
    image: "/Nandi.avif",
    // Removed twitter: "https://twitter.com/emilywhite",
  },
];

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      {/* Email Icon */}
      <button className="mail-button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_273_8)">
            <path
              d="M4.98035 4.39001H20.9803C22.0842 4.39001 22.9803 5.28618 22.9803 6.39001V18.39C22.9803 19.4938 22.0842 20.39 20.9803 20.39H4.98035C3.87652 20.39 2.98035 19.4938 2.98035 18.39V6.39001C2.98035 5.28618 3.87652 4.39001 4.98035 4.39001"
              stroke="#000000ff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22.9803 7.39001L14.0103 13.09C13.3804 13.4847 12.5803 13.4847 11.9503 13.09L2.98035 7.39001"
              stroke="#000000ff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_273_8">
              <rect width="24" height="24" fill="black" transform="translate(0.980347 0.390015)" />
            </clipPath>
          </defs>
        </svg>
      </button>

      {/* Profile Picture and Info */}
      <div className="profile-pic-container">
        {doctor.image ? (
          <img src={doctor.image} alt={doctor.name} />
        ) : (
          <svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M16 16c3.089 0 5.617-2.528-5.617-5.617s-2.528-5.617-5.617-5.617-5.617 2.528-5.617 5.617 2.528 5.617 5.617 5.617zM26.494 29.494c0.552 0 1-0.448 1-1 0-5.756-4.66-10.416-10.416-10.416s-10.416 4.66-10.416 10.416c0 0.552 0.448 1 1 1h18.832z"></path>
            </g>
          </svg>
        )}
      </div>

      {/* Bottom Purple Section */}
      <div className="bottom-section">
        <div className="content">
          <span className="doctor-name">{doctor.name}</span>
          <span className="doctor-specialty">{doctor.specialty || ""}</span>
        </div>
        {/* Removed bottom-bottom div as it contained the social links and contact button */}
      </div>
    </div>
  );
}

export default function MeetOurDoctors() {
  return (
    <>
      {/* Embedded CSS for the DoctorCard component */}
      <style>{`
        .doctor-card {
          width: 320px; /* Increased width */
          height: 450px; /* Increased height */
          background: black;
          border-radius: 32px;
          padding: 3px;
          position: relative;
          box-shadow: #604b4a30 0px 70px 30px -50px;
          transition: all 0.5s ease-in-out;
        }

        .doctor-card .mail-button {
          position: absolute;
          right: 2rem;
          top: 1.4rem;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 4; /* Ensure it's above other elements during hover */
        }

        .doctor-card .mail-button svg {
          stroke: #ffffff;
          stroke-width: 3px;
          transition: stroke 0.3s ease-in-out;
        }

        .doctor-card .mail-button svg:hover {
          stroke: #f55d56;
        }

        .doctor-card .profile-pic-container {
          position: absolute;
          width: calc(100% - 6px);
          height: calc(100% - 6px);
          top: 3px;
          left: 3px;
          border-radius: 29px;
          z-index: 1;
          border: 0px solid #ddd6ff; /* Corresponds to purple-200 */
          overflow: hidden;
          transition: all 0.5s ease-in-out 0.2s, z-index 0.5s ease-in-out 0.2s;
        }

        .doctor-card .profile-pic-container img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          object-position: 0px 0px; /* Default: top-left */
          transition: all 0.5s ease-in-out 0s;
        }

        /* MODIFIED: Removed image zoom on hover */
        .doctor-card:hover .profile-pic-container img {
          /* Removed: transform: scale(2.5); */
          /* Removed: object-position: center; */
          transition: all 0.5s ease-in-out 0.5s;
        }

        .doctor-card .bottom-section {
          position: absolute;
          bottom: 3px;
          left: 3px;
          right: 3px;
          background: #ddd6ff; /* Corresponds to purple-200 */
          top: 80%;
          border-radius: 29px;
          z-index: 2;
          box-shadow: rgba(96, 75, 74, 0.188) 0px 5px 5px 0px inset;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
        }

        .doctor-card .bottom-section .content {
          position: absolute;
          bottom: 0;
          left: 1.5rem;
          right: 1.5rem;
          height: 100%; /* Make content take full height of bottom section */
          padding-top: 1rem; /* Space from the top when expanded */
          display: flex; /* Use flexbox for vertical centering */
          flex-direction: column;
          justify-content: center; /* Center vertically */
          align-items: flex-start; /* Align text to the left */
        }

        .doctor-card .bottom-section .content .doctor-name {
          display: block;
          font-size: 1.4rem; /* Adjusted for larger card */
          color: white;
          font-weight: bold;
          font-family: 'Playfair Display', serif;
          margin-bottom: 0.5rem; /* Add some space between name and specialty */
        }

        .doctor-card .bottom-section .content .doctor-specialty {
          display: block;
          font-size: 1.0rem; /* Adjusted for larger card */
          color: black;
          /* margin-top: 0.5rem; Removed as flexbox handles spacing */
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Removed .doctor-card .bottom-bottom and its children */

        .doctor-card:hover {
          border-top-left-radius: 55px;
        }

        .doctor-card:hover .bottom-section {
          top: 25%; /* Adjusted for larger card */
          border-radius: 80px 29px 29px 29px;
          transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
        }

        .doctor-card:hover .profile-pic-container {
          width: 110px; /* Adjusted for larger card */
          height: 110px; /* Adjusted for larger card */
          aspect-ratio: 1;
          top: 15px; /* Adjusted for larger card */
          left: 15px; /* Adjusted for larger card */
          border-radius: 50%; /* This is key for the circular shape */
          z-index: 3;
          border: 7px solid #ddd6ff;
          box-shadow: rgba(96, 75, 74, 0.188) 0px 5px 5px 0px;
          transition: all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s;
        }

        .doctor-card:hover .profile-pic-container:hover {
          transform: scale(1.3); /* This will scale the circular container slightly */
          border-radius: 0px; /* This will make the circle square on hover */
        }
      `}</style>

  <section className="bg-white py-16 lg:py-24 px-4 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-black text-4xl lg:text-7xl mb-4">
              Meet Our Doctors
            </h2>
            <p className="font-source text-black text-lg lg:text-xl">
              Compassionate experts dedicated to your recovery and well-being.
            </p>
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 justify-center">
            {doctorsData.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}