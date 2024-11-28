import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modals/Solve";

const Technician = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({ title: "", body: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);


  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.post(window.host + "/auth/getStaff", {
        token: sessionStorage.getItem(
          "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
        ),
      });
      setStaff(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchStaffData = async (authorizationToken) => {
    setData(
      await axios.post(
        window.host + "/auth/fgbjmndo234bnkjcslknsqewrSADqwebnSFasq",
        { authorizationToken }
      )
    );
    setToggle(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Selected time: ${time.hour}:${time.minute} ${time.period}`);

    try {
      const response = await axios.post(
        window.host + "/auth/hjgsahdghasgdhgdahsgdSAKNB",
        {
          contactNum,
          time,
          tech,
          server,
          maps,
          plans,
          pppoe,
          napPort,
          napReading,
          insideReading,
          comment,
          status,
          tl,
          firstName,
          middleName,
          lastName,
          address,
          o_contact,
          opticalReading,
          duration,
          barangay,
          purok,
          street,
        }
      );
      setShowModal(false);
    } catch (err) {
      setError("Failed to submit form: " + err.message);
    }
  };
  const handleclick = (id) => {
    fetchStaffData(id);
    setToggle(true);
  };
  const closeModal = () => {
    setToggle(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  let i = 0;
  const renderData = staff.map((staffMember) => (
    <tr
      key={staffMember.id}
      className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {staffMember.name}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {staffMember.email}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
        +63{staffMember.contact}
      </td>
      <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {staffMember.position}
      </td>
      <td className="flex justify-center gap-2 py-4 px-4 whitespace-nowrap">
        <Modal />
        <button
          onClick={() => handleclick(staffMember.id)}
          className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
          type="button"
        >
          <span>Re-Schedule</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <div className="flex justify-end items-end">
          <h2 className="font-bold mx-10 pt-5 text-lg font-lg text-gray-800 dark:text-white">
            Technician
          </h2>
        </div>
      </div>
      <div className="flex flex-col mt-6 place-items-center w-full">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 text-center">
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      Name
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      Address
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      Status
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      Mother's Maiden Name
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="content-center">
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
