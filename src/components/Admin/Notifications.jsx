import React, { useState, useEffect } from "react";
import axios from "axios";
import NotifModal from "../Modals/Notification_Modal";
import {format} from 'date-fns'

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        window.host + "/auth/getNotifications",
        {
          token: sessionStorage.getItem("user_id"),
        }
      ); // Replace with your actual endpoint
      // Populate notifications after the data is fetched
      setNotifications(response.data.results);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false); // Set loading to false if an error occurs
    }
  };

  // Example of handling a click to fetch additional data (replace with your actual function)
  const handleClick = (id) => {
    fetchStaffData(id); // Assuming this is a function to fetch staff data
    setToggle(true);
  };

  // Close modal
  const closeModal = () => {
    setToggle(false);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData(); // Fetch notifications on initial render
  }, []);

  return (
    <div className="m-6 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
      <NotifModal />
      <div className="h-full overflow-y-auto">
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
          <table className="rounded-lg shadow-lg min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-gray-700 dark:border-white">
            <thead className="text-center bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Title
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Description
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Start Date
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <tr key={notification.notif_id} className="text-center">
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {notification.notif_title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {notification.notif_body}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {format(new Date(notification.notif_creation_date), "yyyy-MM-dd")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {format(new Date(notification.notif_ending_date), "yyyy-MM-dd")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No notifications to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>{" "}
        {/* Closing div */}
      </div>
    </div>
  );
};

export default Notifications;
