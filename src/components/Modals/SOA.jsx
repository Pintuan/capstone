import React, { useState, useRef } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import axios from "axios";

const AcceptPayment = ({ account_id }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bill, setBill] = useState([]);
  const componentRef = useRef(); // Reference to the component

  let x = 0;

  const getBills = async () => {
    try {
      const response = await axios.post(
        window.host + "/auth/getBillHistory",
        {
          authorizationToken: 105522,
          customerId: account_id,
        }
      );
      setBill(response.data.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportPDF = async () => {
    const element = componentRef.current; // Get the component DOM element
    const canvas = await html2canvas(element); // Render the element to a canvas
    const imgData = canvas.toDataURL("image/png"); // Get the image data from the canvas

    const pdf = new jsPDF("p", "mm", "legal");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Add the image to the PDF
    pdf.save(account_id + "SOA" + Date.now() + ".pdf"); // Save the PDF
  };

  useState();
  const renderData = [];
  const bill_id = [];
  const paid = [bill.length];
  let i = 0;
  let invoicedAmmount = 0;
  let ammount_paid = 0;
  let fullName = "";
  let address = "";
  while (i < bill.length) {
    renderData.push(
      <tr key={i}>
        <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {new Date(bill[i].due_date).toISOString().split('T')[0]}
        </td>
        <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {bill[i].bill_id}
        </td>
        <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
        </td>
        <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {bill[i].ammount}
        </td>
        <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {bill[i].ammount_paid}
        </td><td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {parseInt(bill[i].ammount) - parseInt(bill[i].ammount_paid)}
        </td>
      </tr>
    );
    bill_id.push(bill[i].bill_id);
    x += parseInt(bill[i].ammount) - parseInt(bill[i].ammount_paid);
    invoicedAmmount += parseInt(bill[i].ammount);
    ammount_paid += parseInt(bill[i].ammount_paid);
    fullName = bill[i].first_name + " " + bill[i].last_name;
    address = bill[i].address;
    i++;
  }
  return (
    <>
      <button
        className="px-4 py-2 tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-800 rounded-lg hover:bg-green-900 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
        onClick={() => {
          console.log("clicked");
          getBills();
          setShowModal(true);
        }}
      >
        View Statement of Account
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
            <div className="relative w-full max-w-6xl mx-4">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
                <div className="bg-gray-100 text-gray-800 font-sans max-w-5xl mx-auto p-5 border border-gray-300 rounded-lg">
                  {/* SOA1 */}
                  <div className="flex justify-between items-center mb-5">

                    <div>
                      <button onClick={handleExportPDF} className="mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Download PDF
                      </button>
                    </div>
                  </div>
                  <div
                    ref={componentRef}
                    style={{
                      padding: "20px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      marginTop: "20px",
                    }}
                  >
                    <div className="mt-10 text-gray-800">

                      <div className="flex justify-between mb-5">
                        <div>
                          <p>To</p>
                          <p className="font-semibold">{fullName}</p>
                          <p>{address}</p>
                        </div>
                        <div className="text-right">
                          <h2 className="text-lg font-bold">
                            ONE-KONEK NETWORK AND DATA SOLUTION
                          </h2>
                          <p>Company ID: 001</p>
                          <p>Tax ID: 343297890000</p>
                          <p>0505 Purok 2 Looban</p>
                          <p>Barangay Santa Elena</p>
                          <p>Hagonoy Bulacan 3002, Philippines</p>
                        </div>
                      </div>

                      <div className="flex justify-end w-full">
                        <div className="w-1/3">
                          <h3 className="text-center text-xl font-bold mb-2">
                            STATEMENT OF ACCOUNT
                          </h3>
                          <p className="text-right border-y border-y-gray-900 text-center mb-2">
                            01 Jan 2024 To 31 Dec 2024
                          </p>

                          <div className="flex justify-between mb-5">
                            <div className="w-full">
                              <div className="bg-gray-300  rounded-md text-left">
                                <h4 className="ml-2 font-semibold p-2">Account Summary</h4>
                              </div>
                              <table className="w-full border-collapse">
                                <tbody>
                                  <tr>
                                    <td className="px-3 py-2">Invoiced Amount</td>
                                    <td className="px-3 py-2 text-right">PHP {invoicedAmmount}</td>
                                  </tr>
                                  <tr>
                                    <td className="px-3 py-2">Amount Paid</td>
                                    <td className="px-3 py-2 text-right">PHP {ammount_paid}</td>
                                  </tr>
                                  <tr className="bg-gray-200">
                                    <td className="px-3 py-2">Balance Due</td>
                                    <td className="px-3 py-2 text-right">PHP {invoicedAmmount - ammount_paid}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <table className="w-full border-collapse border border-gray-300 mt-5">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-3 py-2">Date</th>
                            <th className="border border-gray-300 px-3 py-2">Transactions</th>
                            <th className="border border-gray-300 px-3 py-2">Details</th>
                            <th className="border border-gray-300 px-3 py-2">Amount</th>
                            <th className="border border-gray-300 px-3 py-2">Payments</th>
                            <th className="border border-gray-300 px-3 py-2">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="5" className="text-center">
                                Loading...
                              </td>
                            </tr>
                          ) : error ? (
                            <tr>
                              <td
                                colSpan="5"
                                className="text-center text-red-600"
                              >
                                {error}
                              </td>
                            </tr>
                          ) : renderData.length > 0 ? (
                            renderData
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">
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
            </div>

          </div>
        </>
      )}
    </>
  );
};

export default AcceptPayment;
