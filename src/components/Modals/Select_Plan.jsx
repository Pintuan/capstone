import React, { useState } from "react";
import Save_Admin from "./Save_Admin";

const Select_Plan = ({ action, plan_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planName, setPlanName] = useState("");
  const [planSpeed, setPlanSpeed] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [isSaveAdminOpen, setIsSaveAdminOpen] = useState(false);

  const handleOpenSaveAdmin = () => {
    setIsSaveAdminOpen(true); // Opens Save_Admin modal
  };

  const handleConfirmSave = () => {
    setIsSaveAdminOpen(false); // Closes Save_Admin modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={() => {
          setIsModalOpen(true);
          console.log(plan_id);
        }}
        className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        {action} Plan
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-4 w-96 relative rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
              Select Plan
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="plan"
                  className="block text-left text-sm font-medium text-gray-600 mb-2"
                >
                  Plan Name:
                </label>
                <input
                  type="text"
                  id="plan"
                  name="plan"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Enter the plan name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="planDescription"
                  className="block text-left text-sm font-medium text-gray-600 mb-2"
                >
                  Plan Description:
                </label>
                <input
                  type="text"
                  id="planDescription"
                  name="planDescription"
                  value={planDescription}
                  onChange={(e) => setPlanDescription(e.target.value)}
                  placeholder="Enter the plan description"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="speed"
                  className="block text-left text-sm font-medium text-gray-600 mb-2"
                >
                  Plan Speed:
                </label>
                <input
                  type="text"
                  id="speed"
                  name="speed"
                  value={planSpeed}
                  onChange={(e) => setPlanSpeed(e.target.value)}
                  placeholder="Enter the plan description"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="price"
                  className="block text-left text-sm font-medium text-gray-600 mb-2"
                >
                  Plan Price:
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={planPrice}
                  onChange={(e) => setPlanPrice(e.target.value)}
                  placeholder="Enter the plan description"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleOpenSaveAdmin}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Submit
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

export default Select_Plan;
