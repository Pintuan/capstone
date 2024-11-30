import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modals/Solve";
import Assign from "../Modals/Assign";
import Approved from "../Modals/Approved";

const Technician = () => {
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({ title: "", body: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);


  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.post(window.host + "/auth/get-ticket", {
        token: sessionStorage.getItem(
          "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
        ),
      });
      setTicket(response.data.data);
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
  const renderData = ticket.map((ticket) => {
    if (ticket.stat == "10")
      return (
        <tr
          key={ticket.ticked_id}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {ticket.ticked_id}
          </td>
          <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {ticket.ticket_title}
          </td>
          <td className="py-4 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {ticket.ticket_description}
          </td>
          <td className="px-4 py-4 mr-2 text-sm whitespace-nowrap">
            <div className="flex justify-center items-center">
              <Assign ticket_id={ticket.ticked_id} />
              <Approved ticketId={ticket.ticked_id}/>
            </div>

          </td>
        </tr>
      )
  });

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <div className="flex justify-end items-end">
          <h2 className="font-bold mx-10 pt-5 text-lg font-lg text-gray-800 dark:text-white">
            Complaint Tickets
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
                      Ticket ID
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      Problem
                    </th>
                    <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      Description
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
