import React, { useState } from 'react';
import axios from 'axios';

const Settungs = () => {

    const [error, setError] = useState('');
    const [fName, setfName] = useState(sessionStorage.getItem('firstName'));
    const [mName, setmName] = useState(sessionStorage.getItem('middleName'));
    const [lName, setlName] = useState(sessionStorage.getItem('lastName'));
    const [address, setAddress] = useState(sessionStorage.getItem('address'));
    const [contactNum, setcontactNum] = useState(sessionStorage.getItem('contactNum'));
    const [email, setemail] = useState(sessionStorage.getItem('email'));
    const [profilePic, setprofilePic] = useState('');
    const [username, setusername] = useState(sessionStorage.getItem('username'));
    const [password, setpassword] = useState('');
    const [confPass, setconfPass] = useState('');
    const [passConfirm, setpassConfirm] = useState('');
    const [type, setType] = useState('password');
    const handlePersonalInfoSubmit = async (event) => {
        event.preventDefault();
        console.log(password + confPass);
        if (passConfirm) {
            setError(false);
            const hsdn2owet = sessionStorage.getItem(sessionStorage.getItem('3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0'));
            const response = await axios.post(window.host+'/auth/zxT10Rrshxb', {
                hsdn2owet,
                fName,
                mName,
                lName,
                contactNum,
                email,
                profilePic,
                passConfirm
            });
            console.log(response);
        }
    };
    const handleLoginInfoSubmit = async (event) => {
        event.preventDefault();
        console.log(password + confPass);
        if (passConfirm) {
            setError(false);
            const hsdn2owet = sessionStorage.getItem(sessionStorage.getItem('3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0'));
            const response = await axios.post(window.host + "/auth/zxT10Rrshxb", {
                hsdn2owet,
                username,
                password,
                confPass,
                passConfirm
            });
            console.log(response);
        }
    };
    const toggleInput = () => {
        setType(type === 'password' ? 'text' : 'password')
    };

    return (

        <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                {/* Dashboard actions */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">

                    {/* Left: Title */}
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Account Settings</h1>
                    </div>

                </div>

                {/* Cards */}
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Personal Information</h2>

                    <form onSubmit={handlePersonalInfoSubmit}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="profilePic">Profile Photo</label>
                                    <img className="w-auto" src={`data:image;base64,${sessionStorage.getItem('image')}`} alt="../onekonek_white.png" />
                                </div>
                                <div>

                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="newProfile">Upload file</label>
                                    <input onChange={(e) => setprofilePic(e.target.value)} id="newProfile" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" />

                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="FName">First Name</label>
                                    <input onChange={(e) => setfName(e.target.value)} value={fName} id="FName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                </div>
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="MName">Middle Name</label>
                                    <input onChange={(e) => setmName(e.target.value)} value={mName} id="MName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                </div>
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="LName">Last Name</label>
                                    <input onChange={(e) => setlName(e.target.value)} value={lName} id="LName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="address">Complete Address</label>
                                <input onChange={(e) => setAddress(e.target.value)} value={address} id="address" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="contactNum">Contact Number</label>
                                <div className="flex items-center mt-2">
                                    <p className="py-2.5 px-3 text-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-r-0 rtl:rounded-r-lg rtl:rounded-l-none rtl:border-l-0 rtl:border-r rounded-l-lg">+63</p>
                                    <input onChange={(e) => setcontactNum(e.target.value)} value={contactNum} id="contactNum" type="text" placeholder="9XXXXXXXX" className="block w-full rounded-l-none rtl:rounded-l-lg rtl:rounded-r-none placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                                <input onChange={(e) => setemail(e.target.value)} value={email} id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="confirmPass">Confirn using your Current Password</label>
                            <div className="relative flex items-center mt-2">
                                <button className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto" onClick={toggleInput}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <input onChange={(e) => setpassConfirm(e.target.value)} id="passwordPersonalInfoConfirm" type={type} placeholder="" className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                        </div>
                    </form>
                </section>
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Login Details</h2>

                    <form onSubmit={handleLoginInfoSubmit}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
                                <input onChange={(e) => setusername(e.target.value)} value={username} id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
                                    <div className="relative flex items-center mt-2">
                                        <button className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto" onClick={toggleInput}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <input onChange={(e) => setpassword(e.target.value)} id="password" type={type} placeholder="" className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="confirmPass">Password Confirmation</label>
                                    <div className="relative flex items-center mt-2">
                                        <button className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto" onClick={toggleInput}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <input onChange={(e) => setconfPass(e.target.value)} id="confirmPass" type={type} placeholder="" className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                </div>
                            </div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="confirmPass">Confirn using your Current Password</label>
                            <div className="relative flex items-center mt-2">
                                <button className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto" onClick={toggleInput}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <input onChange={(e) => setpassConfirm(e.target.value)} id="passwordLoginInfoConfirm" type={type} placeholder="" className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}

export default Settungs;