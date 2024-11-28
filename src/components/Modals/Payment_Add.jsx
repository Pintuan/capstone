import React, { useState } from "react";
import Save_Admin from "./Save_Admin";

const Payment_Add = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveAdminOpen, setIsSaveAdminOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    publicKey: "",
    secretKey: "",
    apiSecretKey: "",
    paymentAddress: "",
  });

  const handleOpenSaveAdmin = () => {
    setIsSaveAdminOpen(true); // Opens Save_Admin modal
  };

  const handleConfirmSave = () => {
    setIsSaveAdminOpen(false); // Closes Save_Admin modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment details submission (e.g., send to API)
    alert("Payment Details Saved!");
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Add Payment
      </button>

      {/* Payment Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="relative p-6 bg-white rounded-md shadow-md max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="text-center justify-between">
              <h2 className="font-bold text-lg text-gray-700 mb-4">
                Payment Configuration
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Payment Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Payment Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={paymentDetails.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter Payment Name (e.g., Xendit, Paymongo)"
                  required
                />
              </div>

              {/* Public Key */}
              <div className="mb-4">
                <label
                  htmlFor="publicKey"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Public Key
                </label>
                <input
                  type="text"
                  id="publicKey"
                  name="publicKey"
                  value={paymentDetails.publicKey}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter Public Key"
                  required
                />
              </div>

              {/* Secret Key */}
              <div className="mb-4">
                <label
                  htmlFor="secretKey"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Secret Key
                </label>
                <input
                  type="text"
                  id="secretKey"
                  name="secretKey"
                  value={paymentDetails.secretKey}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter Secret Key"
                  required
                />
              </div>

              {/* API Secret Key */}
              <div className="mb-4">
                <label
                  htmlFor="apiSecretKey"
                  className="block text-gray-600 font-medium mb-2"
                >
                  API Secret Key
                </label>
                <input
                  type="text"
                  id="apiSecretKey"
                  name="apiSecretKey"
                  value={paymentDetails.apiSecretKey}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter API Secret Key"
                  required
                />
              </div>

              {/* Payment Address */}
              <div className="mb-4">
                <label
                  htmlFor="paymentAddress"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Payment Address
                </label>
                <input
                  type="text"
                  id="paymentAddress"
                  name="paymentAddress"
                  value={paymentDetails.paymentAddress}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter Payment Address"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleOpenSaveAdmin}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Save_Admin
        isOpen={isSaveAdminOpen}
        onClose={() => setIsSaveAdminOpen(false)}
        onConfirm={handleConfirmSave}
      />
    </div>
  );
};

export default Payment_Add;
