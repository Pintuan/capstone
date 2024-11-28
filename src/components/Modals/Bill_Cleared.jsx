import React, { useState } from "react";

const Bill_Cleared = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <button
        onClick={() => { setIsModalOpen(true) }}
        className="px-4 py-4 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Accept Payment
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg- p-4 w-3/12 h-3/6 max-w-md rounded-lg shadow-lg">
            <div className="relative flex flex-col items-center justify-center h-full">
              {/* Overlapping h1 */}
              <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-lg font-semibold mb-4 text-center text-white z-10">
                Bill Accepted!
              </h1>
              <iframe
                src="https://lottie.host/embed/aca1b28b-c7ed-47d5-888c-0c6bcf6480c5/t88eBbUCAG.lottie"
                className="w-full h-full absolute top-0 left-0"
                style={{
                  objectFit: "cover", // Ensure gif fills the modal without white space
                  borderRadius: "8px", // Optional: rounds the iframe's corners to match modal
                }}
              ></iframe>
              <div className="absolute bottom-4 w-full flex justify-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bill_Cleared;
