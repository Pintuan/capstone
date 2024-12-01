import React, { useState } from "react";
import Save_Admin from "./Save_Admin";

const Promote = ({ account_id, handleClick }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls the Promote modal

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleOpenSaveAdmin = () => {
    setIsSaveAdminOpen(true); // Opens Save_Admin modal
  };

  const handleConfirmSave = () => {
    setIsSaveAdminOpen(false); // Closes Save_Admin modal
  };

  return (
    <div>
      <button
        onClick={() => {
          openModal();
          handleClick(staffMember.id);
        }}
        className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        type="button"
      >
        <span>Promote</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 w-96 relative rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 px-3 py-2 text-gray-700 rounded-full focus:outline-none"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
              Adjust Plan
            </h2>
            <label
              className="block text-sm text-left font-medium mb-1 text-gray-600"
              htmlFor="options"
            >
              Select an Option:
            </label>
            <select
              id="options"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose an option</option>
              <option value="10293312812">Sulit Plan</option>
              <option value="10293312815">OK Plan</option>
              <option value="10293312817">WOW Plan</option>
              <option value="10293312817">Panalo Plan</option>
            </select>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleOpenSaveAdmin}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Save
              </button>
            </div>
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

export default Promote;
