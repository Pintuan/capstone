import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../Modals/EditStaff";
import Promote from "../Modals/Promote";
import Deactivate from "../Modals/Deactivate";

const Staff = () => {
    const [staff, setStaff] = useState([]); // Initial state as an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState({ title: "", body: "" });
    // Fetch data from the backend
    const fetchData = async () => {
        try {
            const response = await axios.post("http://13.211.183.92/auth/getStaff", {
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
                "http://13.211.183.92/auth/fgbjmndo234bnkjcslknsqewrSADqwebnSFasq",
                { authorizationToken }
            )
        );
        setToggle(true);
    };
    const handleSubmit = () => { };
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
                <Promote user_id={staffMember.id} />
                <Deactivate user_id={staffMember.id} />
            </td>
        </tr>
    ));

    return (
        <section className="container px-4 mx-auto">
            <div className="flex items-center gap-x-3">
                <div className="flex justify-end items-end">
                    <h2 className="font-bold mx-10 pt-5 text-lg font-lg text-gray-800 dark:text-white">
                        Staff
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
                                            Email
                                        </th>
                                        <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Contact Number
                                        </th>
                                        <th className="py-3.5 px-4 text-base font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            Position
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
            <Modal
                isOpen={toggle}
                onClose={closeModal}
                data={data}
                onSubmit={handleSubmit}
            />
        </section>
    );
};

export default Staff;
