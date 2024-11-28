import React from "react";
import Slider from "react-slick";
import { Link as ScrollLink } from "react-scroll";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="relative w-full h-screen">
        <video
          src="/map.mp4"
          alt="Video Background"
          className="w-full h-full object-cover absolute top-0 left-0 opacity-92 dark:opacity-70"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-4 z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Welcome to One Konek
          </h1>
          <p className="text-lg md:text-lg text-white opacity-80 px-4">
            "Stay Connected Anytime, Anywhere"
          </p>
          <ScrollLink
            to="plans"
            smooth={true}
            duration={500}
            className="cursor-pointer bg-green-600 dark:bg-green-800 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold transition-all hover:bg-green-800 dark:hover:bg-green-900 transform hover:scale-105"
          >
            Explore Our Plans
          </ScrollLink>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16 mb-4">
        <div className="text-center mb-12">
          <h4 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-200 bg-blue-400 dark:bg-gray-800 text-white py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-lg inline-block transform hover:scale-105">
            WHY CHOOSE ONE KONEK?
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              icon: "fas fa-users",
              bgColor: "bg-teal-500",
              title: "Community-Centered Service",
              text: "As a locally operated provider, we prioritize accessibility and deliver fast, responsive support tailored to the specific needs of our community.",
              textColor: "text-teal-500",
            },
            {
              icon: "fas fa-clipboard-check",
              bgColor: "bg-yellow-500",
              title: "Reliability and Transparency",
              text: "We believe in open communication, ensuring our customers can trust and depend on our services every day.",
              textColor: "text-yellow-500",
            },
            {
              icon: "fas fa-cogs",
              bgColor: "bg-blue-500",
              title: "Innovation with Local Reach",
              text: "Combining advanced technology with a deep local presence, we offer efficient, adaptable solutions for digital access.",
              textColor: "text-blue-500",
            },
            {
              icon: "fas fa-user-check",
              bgColor: "bg-green-500",
              title: "Customer Empowerment",
              text: "We empower our clients through services that improve connectivity, security, and access to essential digital solutions in everyday life.",
              textColor: "text-green-500",
            },
          ].map(({ icon, bgColor, title, text, textColor }, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col h-full"
            >
              <div className="flex items-center mb-4">
                <div className={`${bgColor} p-3 rounded-full text-white mr-4`}>
                  <i className={`${icon} fa-lg`}></i>
                </div>
                <h3 className={`text-2xl font-semibold ${textColor}`}>
                  {title}
                </h3>
              </div>
              <p className="text-gray-800 dark:text-gray-200 text-lg flex-grow">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 md:px-12 lg:px-24 space-y-8 lg:space-y-0">
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 lg:mr-6 text-center lg:text-left">
            <h2 className="text-lg md:text-xl font-semibold text-green-700 dark:text-green-600 mb-4">
              Smart Solutions for Your Digital Needs
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Whether you need internet for personal use or for your business,
              our tailored plans ensure fast, reliable connectivity without
              breaking the bank. We empower you to thrive in the digital world.
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="shadow-2xl dark:shadow-none relative px-10 sm:px-6">
              <Slider
                className="relative"
                arrows
                prevArrow={
                  <button className="absolute top-1/2 right-4 sm:right-0 transform -translate-y-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-blue-700 hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                }
                nextArrow={
                  <button className="absolute top-1/2 right-2 sm:right-0 transform translate-x-0 sm:translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-blue-700 hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                }
              >
                {[
                  {
                    title: "SULIT PLAN",
                    price: "₱ 749",
                    speed: "75Mbps",
                    description:
                      "Affordable option for small households, ideal for basic browsing, video calls, and streaming in HD.",
                  },
                  {
                    title: "OKAY PLAN",
                    price: "₱ 949",
                    speed: "100Mbps",
                    description:
                      "Perfect for 5-7 devices, offering stable speeds for browsing, HD streaming, and light downloading with 100Mbps for a smooth multi-device experience.",
                  },
                  {
                    title: "WOW PLAN",
                    price: "₱ 1,449",
                    speed: "200Mbps",
                    description:
                      "Ideal for 8-12 devices, offering reliable 200Mbps speeds for heavy browsing, streaming, and gaming.",
                  },
                  {
                    title: "PANALO PLAN",
                    price: "₱ 1,949",
                    speed: "300Mbps",
                    description:
                      "Designed for large households or businesses, delivering fast and reliable 300Mbps speeds for high-demand connectivity.",
                  },
                ].map(({ title, speed, description, price }) => (
                  <div
                    key={title}
                    className="w-72 sm:w-80 mx-auto bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 text-center"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-blue-500 dark:text-blue-300">
                      {title}
                    </h3>
                    <p className="text-4xl md:text-5xl text-blue-500 dark:text-blue-300 font-bold mt-4">
                      {price}
                    </p>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-300">
                      per month
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-4 text-sm md:text-base">
                      {description}
                    </p>
                    <div className="mt-4 bg-blue-700 dark:bg-gray-900 rounded-lg text-white px-4 py-2 inline-block">
                      <p className="text-sm md:text-lg font-semibold">
                        {speed}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="py-6 md:py-16 dark:bg-gray-900">
        <h2 className="text-2xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 text-center mb-6 md:mb-12">
          Internet Subscription Plans
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4 sm:px-6 md:px-12 lg:px-24">
          {[
            {
              title: "SULIT PLAN",
              price: "₱ 749",
              speed: "75Mbps",
              description:
                "Best for 3-5 devices, ideal for general use like browsing, streaming, and casual gaming.",
            },
            {
              title: "OKAY PLAN",
              price: "₱ 949",
              speed: "100Mbps",
              description:
                "Perfect for 5-7 devices, stable speeds for browsing, streaming, and light downloading.",
            },
            {
              title: "WOW PLAN",
              price: "₱ 1,449",
              speed: "200Mbps",
              description:
                "Suitable for 8-12 devices, offering reliable speeds for demanding tasks.",
            },
            {
              title: "PANALO PLAN",
              price: "₱ 1,949",
              speed: "300Mbps",
              description:
                "For large households or businesses, supporting extensive, high-speed connectivity.",
            },
          ].map(({ title, speed, description, price }) => (
            <div
              key={title}
              className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-4 sm:p-6 md:p-8 text-center flex flex-col justify-between h-full">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-500 dark:text-blue-300">
                  {title}
                </h3>
                <p className="text-4xl sm:text-5xl text-blue-500 dark:text-blue-400 font-bold mt-4">
                  {price}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                  per month
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm sm:text-base">
                  {description}
                </p>
                <div className="mt-4 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-full inline-block">
                  <p className="text-sm sm:text-lg font-semibold">{speed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-800 text-center mt-14">
        <h2 className="text-3xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-12">
          Connecting You to What Matters: The One Konek Experience
        </h2>
        <p className="px-6 text-lg sm:text-base mx-auto md:w-3/4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <span className="font-semibold text-green-500">One Konek</span> is
          your trusted internet provider for home and business, offering plans
          that guarantee speed, reliability, and affordability. Whether you are
          working remotely, streaming, or gaming, we ensure seamless
          connectivity. We're delighted to have you here. At One Konek, we
          believe in connecting you to what matters to you the most: family,
          work, or leisure. Our commitment to providing seamless and reliable
          internet services ensures that you enjoy fast, uninterrupted
          connectivity at home or in the office. With a variety of flexible
          plans tailored to meet your needs, we empower you to explore, engage,
          and thrive in a digital world. Join us on this journey toward better,
          faster internet, and experience the One Konek difference today!
        </p>
      </section>

      <footer className="py-8 bg-gray-800 dark:bg-gray-900 text-center text-white">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} One Konek. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;