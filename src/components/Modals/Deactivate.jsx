import React, { useState } from "react";

const Deactivate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true); 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (adminPassword === "admin123") {
      alert("Deactivation Successful!");
      setIsModalOpen(false); 
    } else {
      setIsPasswordCorrect(false); 
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-700 rounded-lg hover:bg-red-900 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
      >
        Deactivate
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
              Enter Admin Password to Deactivate
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm text-left font-medium text-gray-600 mb-2"
                  htmlFor="adminPassword"
                >
                  Admin Password:
                </label>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
                {!isPasswordCorrect && (
                  <p className="text-red-500 text-sm mt-2">
                    Incorrect password, please try again.
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deactivate;
