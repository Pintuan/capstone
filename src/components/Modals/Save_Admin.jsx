import React, { useState } from "react";

const Save_Admin = ({ isOpen, onClose, onConfirm }) => {
  const [adminPassword, setAdminPassword] = useState("");

  const handlePasswordChange = (e) => {
    setAdminPassword(e.target.value);
  };

  const handleSave = () => {
    if (adminPassword === "admin") { 
      alert("Your changes saved!");
      onConfirm();
      onClose(); 
    } else {
      alert("Incorrect admin password! Changes were not saved.");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Enter Admin Password
          </h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <p className="text-left text-gray-700 dark:text-gray-300 mb-6">
          To guarantee this change
        </p>
        <input
          type="password"
          placeholder="Admin Password"
          value={adminPassword}
          onChange={handlePasswordChange}
          className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Save_Admin;
