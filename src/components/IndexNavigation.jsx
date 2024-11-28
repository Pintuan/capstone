import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import logo from "/onekonek_white.png";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Logo = logo;
  if (window.location.pathname == "/Admin") return null;

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-10 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              className="w-auto h-12 m-0 p-0"
              viewBox="0 0 5 8"
              src={Logo}
              alt="Logo"
            />
          </Link>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
            } absolute inset-x-0 z-20 w-full px-2 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
        >
          <div className="font-sans font-semibold text-lg flex flex-col md:flex-row md:mx-2">
            <Link
              to="/"
              className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-lg mx-1"
            >
              {" "}
              Home{" "}
            </Link>
            <Link
              to="/ContactUs"
              className="hover:bg-gray-200 my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 dark:hover:bg-gray-700 p-4 rounded-lg mx-1"
            >
              {" "}
              Inquire{" "}
            </Link>
            <Link
              to="/About"
              className="hover:bg-gray-200 my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 dark:hover:bg-gray-700 p-4 rounded-lg mx-1"
            >
              {" "}
              About
            </Link>
            <Link
              to="/Downloads"
              className="hover:bg-gray-200 my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 dark:hover:bg-gray-700 p-4 rounded-lg mx-1"
            >
              {" "}
              Download
            </Link>
            <Link
              to="/Login"
              className="hover:bg-gray-200 my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 dark:hover:bg-gray-700 p-4 rounded-lg mx-1"
            >
              {" "}
              Login
            </Link>

            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
