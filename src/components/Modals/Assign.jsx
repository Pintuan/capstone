import axios from "axios";
import React, { useState } from "react";

const Assign = (ticketId) => {
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tech, setTech] = useState("");
  const [tl, setTL] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        window.host+"/auth/solveTicket",
        {
          token: sessionStorage.getItem("user_id"),
          ticketId: ticketId.ticket_id,
          technician_id: tech,
          tl_id: tl
        }
      );
      setShowModal(false); // Close modal on successful submission
    } catch (err) {
      setError("Failed to submit form: " + err.message);
    }
  };
  return (
    <>
      <button
        className="px-4 py-2 mr-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-800 rounded-lg hover:bg-green-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {" "}
        Assign
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="relative p-6 bg-white rounded-md shadow-md dark:bg-gray-800 max-w-6xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-4">
                  Assign
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="ml-2 max-w-6xl p-6 mx-auto bg-white dark:bg-gray-800 mt-4 overflow-y-auto max-h-[80vh] text-left">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Team Leader
                      </label>
                      <select
                        value={tl}
                        onChange={(e) => setTL(e.target.value)}
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      >
                        <option value="" disabled>
                          Select Team Leader
                        </option>
                        <option value="16458364983">JAKE JARELLE CARLOS</option>
                        <option value="16458364984">ARMAN PEÑARANDA</option>
                        <option value="16458364985">CHRISTOPHER ALFONSO</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Technician
                      </label>
                      <select
                        value={tech}
                        onChange={(e) => setTech(e.target.value)}
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      >
                        <option value="" disabled>
                          Select Tech
                        </option>
                        <option value="16458364984">JOEL FELIPE</option>
                        <option value="16458364987">JAKE JARELLE CARLOS</option>
                        <option value="16458364982">JAIME LUMPAYAO</option>
                      </select>
                    </div>
                    {error && (
                      <p className="mt-4 text-red-600 dark:text-red-400 text-right">
                        {error}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="flex items-center justify-center w-50 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 hover:bg-blue-800 rounded-lg bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      <span className="text-center">Submit</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default Assign;
