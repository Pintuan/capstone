import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";

const AcceptPayment = ({ account_id, email }) => { // Ensure 'email' is passed as a prop
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bill, setBill] = useState([]);
  const componentRef = useRef(); // Reference to the component

  const getBills = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${window.host}/auth/getBillHistory`, {
        authorizationToken: 105522,
        customerId: account_id,
      });
      setBill(response.data.data);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch bill history. Please try again later.");
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!componentRef.current) return; // Ensure the ref is attached
  
    try {
      setLoading(true);
      setError("");
  
      console.log("Generating PDF...");
      const element = componentRef.current; // Get the component DOM element
      const canvas = await html2canvas(element, { scale: 1 }); // Reduced scale factor
      const imgData = canvas.toDataURL("image/jpeg", 0.8); // Use JPEG with 80% quality
  
      const pdf = new jsPDF("p", "mm", "A4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight); // Use JPEG format
  
      // Convert PDF to Blob
      const pdfBlob = pdf.output("blob");
  
      // Create FormData and append the PDF Blob
      const formData = new FormData();
      formData.append("file", pdfBlob, `${account_id}_SOA_${Date.now()}.pdf`);
      formData.append("email", email);
  
      console.log("Sending POST request to the server...");
      // Send POST request to the server
      const response = await axios.post(`${window.host}/auth/send-soa`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Server response:", response);
      // Handle the response from the server
      if (response.status === 200) {
        alert("PDF emailed successfully!");
        setShowModal(false); // Optionally close the modal after success
      } else {
        alert("Failed to email PDF.");
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      setError("An error occurred while exporting the PDF.");
      setLoading(false);
    }
  };
  

  const renderData = [];
  const bill_id = [];
  let i = 0;
  let invoicedAmount = 0; // Corrected spelling
  let amount_paid = 0; // Corrected spelling
  let fullName = "";
  let address = "";
  while (i < bill.length) {
    renderData.push(
      <tr
        key={i}
        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
      >
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          {new Date(bill[i].due_date).toLocaleDateString()}
        </td>
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          {bill[i].bill_id}
        </td>
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          {/* Add details here if available */}
          N/A
        </td>
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          PHP {Number(bill[i].ammount).toFixed(2)}
        </td>
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          PHP {Number(bill[i].ammount_paid).toFixed(2)}
        </td>
        <td className="px-4 py-3 text-sm text-center text-gray-700 whitespace-nowrap">
          PHP {(Number(bill[i].ammount) - Number(bill[i].ammount_paid)).toFixed(2)}
        </td>
      </tr>
    );
    bill_id.push(bill[i].bill_id);
    invoicedAmount += Number(bill[i].ammount);
    amount_paid += Number(bill[i].ammount_paid);
    fullName = `${bill[i].first_name} ${bill[i].last_name}`;
    address = bill[i].address;
    i++;
  }

  return (
    <>
      <button
        className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
        onClick={() => {
          console.log("View Statement of Account clicked");
          getBills();
          setShowModal(true);
        }}
      >
        View Statement of Account
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="relative w-full max-w-6xl mx-4">
            <div className="border-0 rounded-lg shadow-lg flex flex-col w-full bg-white dark:bg-gray-800">
              <button
                className="absolute top-[26px] right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none border-[1px] border-gray-200 rounded-sm px-2 py-1"
                onClick={() => setShowModal(false)}
                aria-label="Close Modal"
              >
                ✕
              </button>
              <div className="p-6 overflow-y-auto max-h-screen">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleExportPDF}
                    className="mr-8 px-8 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Processing..." : "Send PDF to Email"}
                  </button>
                </div>
                <div
                  ref={componentRef}
                  className="p-8 bg-gray-100 border border-gray-300 rounded-lg"
                >
                  <div className="flex items-center mb-6">
                    <img
                      src="/onekonek logo_only.svg"
                      alt="OneKonek Logo"
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">
                        ONE-KONEK NETWORK AND DATA SOLUTION
                      </h1>
                      <p className="text-gray-600">Company ID: 001</p>
                      <p className="text-gray-600">Tax ID: 343297890000</p>
                      <p className="text-gray-600">0505 Purok 2 Looban</p>
                      <p className="text-gray-600">Barangay Santa Elena</p>
                      <p className="text-gray-600">
                        Hagonoy Bulacan 3002, Philippines
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-gray-700">To:</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {fullName}
                      </p>
                      <p className="text-gray-600">{address}</p>
                    </div>
                    <div className="text-right">
                      <h2 className="text-xl font-bold text-gray-800">
                        STATEMENT OF ACCOUNT
                      </h2>
                      <p className="mt-2 text-gray-600">
                        {new Date().toLocaleString("default", {
                          month: "long",
                        })}{" "}
                        01, {new Date().getFullYear()} To{" "}
                        {new Date().toLocaleString("default", {
                          month: "long",
                        })}{" "}
                        31, {new Date().getFullYear()}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="bg-gray-300 rounded-md p-4 mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Account Summary
                      </h4>
                    </div>
                    <table className="w-full table-auto">
                      <tbody>
                        <tr className="bg-white">
                          <td className="px-4 py-2 text-gray-700">
                            Invoiced Amount
                          </td>
                          <td className="px-4 py-2 text-right text-gray-700">
                            PHP {invoicedAmount.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2 text-gray-700">
                            Amount Paid
                          </td>
                          <td className="px-4 py-2 text-right text-gray-700">
                            PHP {amount_paid.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-2 text-gray-700">
                            Balance Due
                          </td>
                          <td className="px-4 py-2 text-right text-gray-700">
                            PHP {(invoicedAmount - amount_paid).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Date
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Transactions
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Details
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Amount
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Payments
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-4 py-6 text-center text-gray-600"
                            >
                              Loading...
                            </td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-4 py-6 text-center text-red-600"
                            >
                              {error}
                            </td>
                          </tr>
                        ) : renderData.length > 0 ? (
                          renderData
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-4 py-6 text-center text-gray-600"
                            >
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
      )}
    </>
  );
};

export default AcceptPayment;