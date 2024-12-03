import React, { useState } from "react";
import Bill_Cleared from "./Bill_Cleared";
import axios from "axios";

const AcceptPayment = ({ id, name, address }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bill, setBill] = useState([]);
  const [bill_cleared, setBill_Cleared] = useState(false); // Modal visibility state
  const [message, setMessage] = useState("");
  const [totalPayment, setTotalPayment] = useState(0);
  const [proratedAmmount, setProratedAmmount] = useState(0);
  let x = 0;

  const handleOpenBill_Cleared = () => {
    setBill_Cleared(true); // Opens Bill_Cleared modal
  };

  const handleCloseBill_Cleared = () => {
    setBill_Cleared(false); // Closes Bill_Cleared modal
  };

  const handleConfirmSave = () => {
    alert("Changes saved successfully!");
    setBill_Cleared(false); // Closes Bill_Cleared modal
  };

  const getBills = async () => {
    try {
      const response = await axios.post(
        window.host + "/auth/getCustomerBills",
        {
          authorizationToken: sessionStorage.getItem(
            "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
          ),
          customerId: id,
        }
      );
      setBill(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  async function payBill() {
    let remainingPayment = totalPayment;
    let stat = "76522";
    if (remainingPayment < 0) {
      setMessage("enter ammount first");
    }
    for (let i = 0; i < bill.length; i++) {
      const remainingBalance = bill[i].ammount - paid[i];

      if (remainingPayment > 0) {

        const payment = Math.min(remainingBalance, remainingPayment);
        paid[i] += payment; // Update the `paid` field
        remainingPayment -= payment;
        if (paid[i] == bill[i].ammount) { stat = "76523" }
        const resp = await axios.post(window.host + "/auth/paybill",
          {
            token: sessionStorage.getItem(
              "3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0"
            ),
            reciever: sessionStorage.getItem("user_id"),
            amount: paid[i],
            bill_id: bill[i].bill_id,
            stat: stat,
            payment_type: 100000001,
            prorated : proratedAmmount
          });
        setMessage(resp.message);
      } else {
        break; // Stop distributing if payment is exhausted
      }
    }
  }


  const renderData = [];
  const bill_id = [];
  const paid = [bill.length];
  let i = 0;
  while (i < bill.length) {
    renderData.push(
      <tr key={i}>
        <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {bill[i].bill_id}
        </td>
        <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {bill[i].ammount}
        </td>
        <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {new Date(bill[i].due_date).toISOString().split('T')[0]}
        </td>
        <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {bill[i].plan_name}
        </td>
        <td className="px-12 py-4 text-sm text-center font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
            <h2 className="text-sm font-normal text-emerald-500">
              {parseInt((bill[i].ammount)) - parseInt(bill[i].ammount_paid)}
            </h2>
          </div>
        </td>
      </tr>
    );
    bill_id.push(bill[i].bill_id);
    x += parseInt(bill[i].ammount) - parseInt(bill[i].ammount_paid);
    paid.push(bill[i].ammount_paid);
    i++;
  }


  function payment(ammount) {
    if (ammount < (x / 2)) {
      setTotalPayment(parseInt(ammount));
      setMessage("must be at least 50% of the total amount");
    }
    else {
      setTotalPayment(parseInt(ammount));
      setMessage("");
    }
  }
  return (
    <>
      <button
        className="px-4 py-2 tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-800 rounded-lg hover:bg-green-900 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
        onClick={() => {
          getBills();
          setShowModal(true);
        }}
      >
        View Billing Record
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
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 rounded-t">
                  <h2 className="font-bold text-lg text-gray-800 dark:text-white">
                    Customer Bill Record
                  </h2>
                </div>

                <div className="p-2 flex items-center">
                  <h1 className="truncate text-xl font-bold text-gray-800 dark:text-gray-200 ml-4 mr-4">
                    {name}
                  </h1>
                  <div className="text-left bg-gray-100 dark:bg-gray-700 h-20 rounded-lg w-auto">
                    <h3 className="mt-2 ml-2 text-gray-800 dark:text-gray-200">
                      Address:
                    </h3>
                    <h5 className="text-gray-600 dark:text-gray-300 text-sm p-2 mr-2">
                      {address == null ? "No Record Found" : address}
                    </h5>
                  </div>
                </div>

                <div className="flex flex-col p-4">
                  <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
                      <div className="overflow-y-auto h-[400px] border border-gray-400 dark:border-gray-700 md:rounded-lg">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-300 dark:bg-gray-700">
                              <tr>
                                <th className="px-4 py-4 text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap">
                                  Bill ID
                                </th>
                                <th className="px-4 py-4 text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap">
                                  Bill Amount
                                </th>
                                <th className="px-4 py-4 text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap">
                                  Due Date
                                </th>
                                <th className="px-4 py-4 text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap">
                                  Plan Billed
                                </th>
                                <th className="px-4 py-4 text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap">
                                  Remaining Balance
                                </th>
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
                <div className="px-5 py-3 items-center dark:border-gray-700">
                  <div className="flex items-end justify-start">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white mr-4 mb-2">
                      Total Amount: {x}
                    </h1>
                  </div>
                  <div className="flex items-end justify-end">
                    <div className="flex items-center">
                      <p className="mt-3 text-xl text-red-400 dark:text-red-600">{message}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <h1 className="text-xl mr-2 font-bold text-gray-800 dark:text-white mt-1">
                        Prorated Ammount
                      </h1>
                      <input type="number" onChange={(e) => { proratedAmmount(e.target.value) }} max={x} className="mt-2 mr-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-500 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </div>
                    <div className="flex items-center justify-center">
                      <h1 className="text-xl mr-2 font-bold text-gray-800 dark:text-white mt-1">
                        Ammount Recieved
                      </h1>
                      <input type="number" onChange={(e) => { payment(e.target.value) }} max={x} className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-500 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </div>
                    <button
                      onClick={(e) => { payBill() }}
                      className="ml-2 px-4 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    >
                      Accept Payment
                    </button>
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
