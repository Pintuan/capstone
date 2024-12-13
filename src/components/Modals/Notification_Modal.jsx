import React, { useState } from "react";
import axios from "axios";

const Notifications_Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaveAdminOpen, setIsSaveAdminOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [body, setBody] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const uploadNotification = async () => {
    try {
      const response = await axios.post(window.host + "/auth/newNotifications", {
        creator: sessionStorage.getItem(
          "user_id"
        ),
        type: selectedOption,
        body: body,
        start: startDate,
        end: endDate
      });
      if (response.data.message) {
        alert("Notification Created Successfully");
        closeModal();
      } else {
        alert("Failed to create notification");
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <button
        onClick={() => {
          openModal();
        }}
        className="my-4 px-4 py-2 mt-4 ml-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        type="button"
      >
        <span>Create New Notification</span>
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
              Create New Notification
            </h2>
            <label
              className="block text-sm text-left font-medium mb-1 text-gray-600"
              htmlFor="options"
            >
              Title of Notification
            </label>
            <select
              id="options"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose an option</option>
              <option value="1655523176">Service Interruption</option>
              <option value="1655523186">Plan Changes</option>
              <option value="1655523196">Service Reconnection</option>
            </select>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Body</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter the notification body"
                className="w-full h-20 px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={uploadNotification}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications_Modal;
