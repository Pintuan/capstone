import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modals/Solve";
import Install from "../Modals/Install";
import DenyInstallation from "../Modals/DenyInstallation";

const Technician = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({ title: "", body: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.post(
        window.host + "/auth/installationRequests",
        {
          token: sessionStorage.getItem(
            "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
          ),
        }
      );
      setRequests(response.data.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const closeModal = () => {
    setToggle(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  let i = 0;
  const renderData = requests.map((requests) => (
    <tr
      key={requests.user_id}
      className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 break-words whitespace-normal">
        {requests.fullname}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 break-words whitespace-normal">
        {requests.email}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 break-words whitespace-normal">
        {requests.contact_num}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 break-words whitespace-normal">
        {requests.mother_maiden_name}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 break-words whitespace-normal">
        {requests.address}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 break-words whitespace-normal">
        {requests.nearest_landmark}
      </td>
      <td className="px-4 py-4 text-sm break-words whitespace-normal">
        <div className="flex justify-center items-center">
          <Install
            email={requests.email}
            accountId={requests.user_id}
            user_id={requests.user_id}
          />
          <DenyInstallation account_id={requests.user_id} />
        </div>
      </td>
    </tr>
  ));

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <div className="flex justify-end items-end">
          <h2 className="font-bold mx-10 pt-5 text-lg font-lg text-gray-800 dark:text-white">
            Installation Requests
          </h2>
        </div>
      </div>
      <div className="flex flex-col mt-6 items-center w-full">
        <div className="w-full">
          <div className="inline-block w-full py-2 mx-4 align-middle text-center">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full w-full table-fixed">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 break-words">
                      Full Name
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 break-words">
                      Email
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 break-words">
                      Contact Number
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 break-words">
                      Mother's Maiden Name
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 break-words">
                      Address
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 break-words">
                      Nearest Landmark
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 break-words">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="7" className="text-center text-red-600">
                        {error}
                      </td>
                    </tr>
                  ) : renderData.length > 0 ? (
                    renderData
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Nothing to Show
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          data={selectedStaff}
          onSubmit={() => {
            console.log("Approved button clicked");
            setShowModal(false);
          }}
        />
      )}
    </section>
  );
};

export default Technician;
