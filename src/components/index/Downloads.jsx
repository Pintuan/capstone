import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Downloads = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/splashscreen_app.png",
    "/login_app.png",
    "/landingpage_app.png",
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-screen-lg mx-auto">
        {/* Carousel Section */}
        <div className="w-full md:w-1/3 flex items-center justify-center py-4 md:py-0">
          <div className="relative w-full max-w-[300px] md:max-w-[500px] h-auto">
            <div className="relative w-full h-[300px] md:h-[750px] mx-auto mt-12 md:mt-0">
              <img
                src="/phone-mockup.png"
                alt="phone mockup"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="w-full h-full flex justify-center items-center overflow-hidden">
                  <img
                    src={images[currentIndex]}
                    alt="carousel"
                    className="object-contain w-[80%] h-[80%] rounded-lg"
                  />
                </div>
                {/* Prev and Next Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-[-20px] md:left-[-30px] top-1/2 transform -translate-y-1/2 p-3 md:p-4 bg-white text-black rounded-full shadow-lg hover:bg-gray-300 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
                >
                  &#10094;
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-[-20px] md:right-[-30px] top-1/2 transform -translate-y-1/2 p-3 md:p-4 bg-white text-black rounded-full shadow-lg hover:bg-gray-300 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
                >
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center text-center py-8 md:py-0">
          <h1 className="text-2xl md:text-3xl sm:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Download Our App
          </h1>
          <p className="text-sm md:text-base sm:text-lg text-gray-700 mb-6 md:mb-8 max-w-xs sm:max-w-md md:max-w-xl mx-auto">
            Experience the fastest and most reliable way to access our services.
            Download the app today and enjoy seamless functionality, available
            for Android!
          </p>
          <div className="mb-6 md:mb-8">
            <a
              href="https://www.mediafire.com/file/gam182rf6j8lz7b/OneKonekMobileAppV5.6.3s.apk/file"
              download
              className="flex items-center bg-blue-500 text-white py-2 px-6 md:py-3 md:px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6 md:w-8 md:h-8 mr-3 md:mr-4"
              >
                <path d="M12 5v14m7-7l-7 7-7-7" />
              </svg>
              <span className="font-semibold text-lg md:text-xl">
                Download Now
              </span>
            </a>
          </div>
          <div className="text-center mt-6 md:mt-8 border-t border-gray-600 pt-4">
            <p className="text-xs md:text-sm text-gray-400">
              © 2024 ONE-KONEK Network and Data Solutions. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
