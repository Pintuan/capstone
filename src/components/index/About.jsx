import React, { useState } from "react";

function About() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (section) => {
    if (section === "Contact Us") {
      const contactSection = document.getElementById("contact-section");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  return (
    <div className="flex flex-col items-center text-gray-800 dark:text-gray-200 bg-blen-darker-white dark:bg-gray-900">
      <div className="container px-12 py-8 text-center">
        <div className="flex flex-col lg:flex-row items-center lg:items-start mb-4">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start p-6 px-4 mt-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 dark:text-gray-200 mb-6 text-center lg:text-left lg:ml-8">
              About Us
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl tracking-wide leading-relaxed mb-6 max-w-2xl text-center lg:text-left lg:ml-8 text-gray-500 dark:text-gray-300">
              Established on December 12, 2020, ONE-KONEK Network and Data
              Solutions is a community-based internet service provider serving
              Bulacan and surrounding areas with high-quality, affordable, and
              locally managed internet. We enable individuals and businesses to
              connect reliably and efficiently with advanced technology and a
              commitment to local service.
            </p>
            <a
              href="#contact-footer"
              stroke="currentColor"
              className="font-medium mt-4 px-6 py-3 bg-green-500 dark:bg-green-800 text-white rounded-lg shadow-md hover:bg-green-800 dark:hover:bg-green-900 hover:shadow-lg transform hover:scale-105 transition duration-300 lg:ml-8"
            >
              Contact Us
            </a>
          </div>

          <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
            <img
              src="maskot.png"
              alt="Create a Plan"
              className="w-full sm:w-[60%] lg:w-[80%] object-cover mb-8 mt-1 rounded-full max-h-[50vh] sm:max-h-[40vh] lg:max-h-[80vh]"
            />
          </div>
        </div>
        <div className="py-10">
          <div className="mx-6 md:mx-12 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-18 sm:gap-2 md:gap-10">
            <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-auto sm:h-[270px] md:h-[300px] w-full">
              <div className="text-center max-w-md px-4">
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-blue-600 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4 dark:text-blue-400">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  To be the leading community-based internet service provider in
                  Bulacan, connecting communities through accessible, high-speed
                  internet and supporting them with reliable, locally-managed
                  technology solutions.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-auto sm:h-[270px] md:h-[300px] w-full">
              <div className="text-center max-w-md px-4">
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-blue-600 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-3-3v6m9 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4 dark:text-blue-400">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  ONE-KONEK is dedicated to bridging the digital gap in
                  communities with services that are accessible, reliable, and
                  responsive. "OK sa SPEED, OK sa PRESYO, OK sa SERBISYO - TATAK
                  One-Konek!"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start text-gray-800 dark:text-gray-200">
          <div className="container mx-auto px-6 sm:px-10 py-8 sm:py-12">
            {[
              {
                label: "Additional Services",
                content: (
                  <div className="p-4 text-gray-800 dark:text-gray-200">
                    <p className="text-lg leading-relaxed">
                      In addition to internet connectivity, ONE-KONEK provides a
                      wide range of technology solutions, enhancing convenience,
                      security, and digital access for local businesses,
                      institutions, and individual users.
                    </p>
                    <h4 className="text-xl font-semibold mt-6 mb-2">
                      CCTV Installation Services
                    </h4>
                    <p className="text-lg leading-relaxed">
                      We offer comprehensive{" "}
                      <span className="font-semibold text-blue-500">
                        CCTV installation
                      </span>{" "}
                      for homes, businesses, and community areas, enhancing
                      safety and security with high-quality surveillance
                      solutions. Our technicians ensure proper setup and
                      maintenance, allowing for dependable monitoring and peace
                      of mind.
                    </p>
                    <h4 className="text-xl font-semibold mt-6 mb-2">
                      Public Address System Installation Services
                    </h4>
                    <p className="text-lg leading-relaxed">
                      Our{" "}
                      <span className="font-semibold text-blue-500">
                        PA system installation
                      </span>{" "}
                      services are designed for a range of clients, including
                      businesses, schools, and Local Government Units (LGUs). By
                      providing reliable and efficient public address systems,
                      we enable clear and effective communication for events,
                      announcements, and other community needs. This service
                      ensures seamless audio solutions that are essential for
                      large gatherings and public spaces.
                    </p>
                    <h4 className="text-xl font-semibold mt-6 mb-2">
                      Computer and Printer Repair
                    </h4>
                    <p className="text-lg leading-relaxed">
                      ONE-KONEK’s skilled technicians offer fast and effective
                      repair services for{" "}
                      <span className="font-semibold text-blue-500">
                        computers
                      </span>{" "}
                      and{" "}
                      <span className="font-semibold text-blue-500">
                        printers
                      </span>
                      , ensuring these devices remain operational and efficient.
                      Whether for individual clients or small businesses, our
                      repair services help avoid downtime, keeping essential
                      technology running smoothly.
                    </p>
                    <h4 className="text-xl font-semibold mt-6 mb-2">
                      Smart Printing Solutions (Printer Rental Service)
                    </h4>
                    <p className="text-lg leading-relaxed">
                      Our flexible{" "}
                      <span className="font-semibold text-blue-500">
                        printer rental services
                      </span>{" "}
                      offer a convenient option for small businesses and
                      individuals needing printing capabilities without
                      long-term commitment. With a range of printer models
                      available, we provide tailored rental solutions that cater
                      to different usage levels and printing needs.
                    </p>
                    <h4 className="text-xl font-semibold mt-6 mb-2">
                      Document Printing Services
                    </h4>
                    <p className="text-lg leading-relaxed">
                      We provide high-quality{" "}
                      <span className="font-semibold text-blue-500">
                        document printing
                      </span>{" "}
                      services to meet both personal and business needs. From
                      single-page prints to bulk printing jobs, ONE-KONEK
                      ensures professional quality and fast turnaround,
                      supporting our clients’ document and branding
                      requirements.
                    </p>
                    <h4 className="text-xl font-semibold mt-6 mb-2">
                      Cash-In and Cash-Out Services for GCash and Maya
                    </h4>
                    <p className="text-lg leading-relaxed">
                      ONE-KONEK offers{" "}
                      <span className="font-semibold text-blue-500">
                        cash-in and cash-out services
                      </span>{" "}
                      for GCash and Maya users, this service enables secure and
                      easy digital transactions, supporting a digital-friendly
                      economy and accessible e-wallet services locally.
                    </p>
                  </div>
                ),
              },
              {
                label: "Free Internet Connection",
                content: (
                  <div className="text-gray-800 dark:text-gray-200 p-4">
                    <p className="text-lg leading-relaxed">
                      ONE-KONEK is more than just an internet provider—we are a
                      dedicated partner in bringing{" "}
                      <span className="font-bold text-blue-500">
                        accessible digital solutions
                      </span>{" "}
                      to Bulacan. Our{" "}
                      <span className="font-semibold text-blue-500">
                        Business Account setup
                      </span>{" "}
                      with major telecom providers and{" "}
                      <span className="font-semibold text-blue-500">
                        Joint Pole Agreements
                      </span>{" "}
                      with local power distributors ensure a reliable,
                      sustainable infrastructure that fully complies with
                      regulatory standards. Subscribers benefit from{" "}
                      <span className="font-semibold text-blue-500">
                        fast connectivity
                      </span>{" "}
                      and the peace of mind that comes with knowing their
                      service provider is committed to legal, long-term
                      operations.
                    </p>
                    <h4 className="text-xl font-semibold mt-6 mb-2">
                      Customer-Centered Technical Support
                    </h4>
                    <p className="text-lg leading-relaxed">
                      Our{" "}
                      <span className="font-semibold text-blue-500">
                        Technical Team Department
                      </span>{" "}
                      is always ready to address technical concerns quickly and
                      efficiently. Following our{" "}
                      <span className="font-bold text-blue-500">
                        Report-Now-Repair-Same-Day
                      </span>{" "}
                      model, we are committed to resolving connectivity issues
                      within the day they are reported.
                    </p>
                    <p className="mt-4 text-lg leading-relaxed">
                      This rapid response capability sets us apart, ensuring
                      subscribers experience minimal service interruptions and a{" "}
                      <span className="font-semibold text-blue-500">
                        seamless digital experience
                      </span>
                      .
                    </p>
                  </div>
                ),
              },
              {
                label: "Why Choose ONE-KONEK?",
                content: (
                  <div className="p-6 rounded-lg ">
                    <p className="text-gray-800 dark:text-gray-200">
                      ONE-KONEK is more than just an internet provider. We are a
                      committed partner dedicated to bringing accessible,
                      high-speed internet and digital solutions to Bulacan.
                    </p>
                    <section className="mt-6">
                      <h4 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                        Reliable, Sustainable Infrastructure
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        We ensure a stable and long-lasting internet connection
                        through strategic partnerships with major telecom
                        providers and joint agreements with local power
                        distributors. Our infrastructure is fully compliant with
                        regulatory standards, giving you peace of mind about the
                        reliability and legality of our services.
                      </p>
                    </section>
                    <section className="mt-6">
                      <h4 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                        Fast, Secure Connectivity
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        Our network infrastructure is designed for fast,
                        seamless internet connectivity. We focus on minimizing
                        downtimes and maintaining high-performance levels,
                        ensuring you can stay connected with confidence.
                      </p>
                    </section>
                    <section className="mt-6">
                      <h4 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                        Customer-Centered Technical Support
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        We prioritize customer support and are committed to
                        resolving technical issues promptly. With our
                        "Report-Now-Repair-Same-Day" model, we resolve most
                        connectivity issues on the same day they are reported,
                        ensuring minimal disruptions to your service.
                      </p>
                    </section>
                    <section className="mt-6">
                      <h4 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                        Why Customers Love Us
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mt-2 italic">
                        "ONE-KONEK's support team is incredibly responsive and
                        always resolves any issues fast. I can't imagine working
                        with any other internet provider!" – A satisfied
                        customer
                      </p>
                    </section>
                    <section className="mt-6">
                      <h4 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                        Get Started Today
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        Join the growing number of businesses and households
                        enjoying reliable, high-speed internet from ONE-KONEK.
                        Contact us now to get started!
                      </p>
                    </section>
                  </div>
                ),
              },
            ].map(({ label, content }) => (
              <div key={label} className="mt-4 w-full">
                <div
                  onClick={() => toggleDropdown(label)}
                  className="text-lg sm:text-xl md:text-2xl font-bold shadow-xl bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-between cursor-pointer text-gray-800 dark:text-gray-200 p-3 sm:p-4 hover:text-blue-800 dark:hover:text-blue-500"
                >
                  <span className="text-left ml-4">{label}</span>
                  <button
                    className={`transform transition-transform duration-200 ${activeDropdown === label ? "rotate-180" : ""
                      }`}
                  >
                    ➤
                  </button>
                </div>
                {activeDropdown === label && (
                  <div
                    className="rounded-lg dark:bg-gray-700 bg-gray-200 mt-2 text-gray-800 dark:text-gray-200 text-left p-3 sm:p-4 shadow-lg border border-gray-200 dark:border-gray-600"
                    style={{
                      maxHeight: "1000px",
                      overflow: "hidden",
                    }}
                  >
                    {content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer
        id="contact-footer"
        className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 text-white w-full py-4 px-6 md:px-24"
      >
        <h3 className="mt-8 text-3xl sm:text-4xl font-bold text-gray-100 mb-2 text-center transition duration-300 ease-in-out hover:text-blue-400">
          Contact Us
        </h3>
        <p className="text-sm sm:text-base text-gray-300 text-center max-w-3xl mx-auto mb-14">
          Your experience matters to us! Get in touch with our team and let us
          know how we can assist you. We’re here to ensure you have a smooth and
          enjoyable experience.
        </p>
        <div className="container mx-auto px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">
                Contact Numbers
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4 text-left">
                If you have inquiries or need assistance, contact us at:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-phone-alt mr-3 text-blue-400"></i>
                  <a href="tel:+639478980649" className="hover:underline">
                    0947-898-0649
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-phone-alt mr-3 text-blue-400"></i>
                  <a href="tel:+639478980690" className="hover:underline">
                    0947-898-0690
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-phone-alt mr-3 text-blue-400"></i>
                  <a href="tel:+639688566745" className="hover:underline">
                    0968-856-6745
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">
                Our Offices
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300 space-x-2 justify-center md:justify-start">
                  <i className="fas fa-map-marker-alt text-blue-400"></i>
                  <span className="text-sm sm:text-base">
                    <strong>Main Office:</strong>
                    <a
                      href="https://www.google.com/maps?q=0505+Purok+2,+Looban,+Santa+Elena,+Hagonoy,+Bulacan"
                      target="_blank"
                      className="text-blue-400 hover:underline"
                    >
                      0505 Purok 2, Looban, Santa Elena, Hagonoy, Bulacan
                    </a>
                  </span>
                </div>
                <div className="flex items-center text-gray-300 space-x-2 justify-center md:justify-start">
                  <i className="fas fa-map-marker-alt text-blue-400"></i>
                  <span className="text-sm sm:text-base">
                    <strong>Palapat Office:</strong>
                    <a
                      href="https://www.google.com/maps?q=2nd+Floor,+PetroJam+Commercial+Building,+PetroJam+Gas+Station,+Purok+6,+Palapat,+Hagonoy,+Bulacan"
                      target="_blank"
                      className="text-blue-400 hover:underline"
                    >
                      2nd Floor, PetroJam Commercial Building, PetroJam Gas
                      Station, Purok 6, Palapat, Hagonoy, Bulacan
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">
                Follow Us
              </h3>
              <ul className="space-y-3 text-gray-300 flex justify-center items-center flex-col text-sm sm:text-base">
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <i className="fas fa-envelope mr-3 text-blue-400 text-lg"></i>
                  <strong>Email:</strong>
                  <a
                    href="mailto:onekonekinternet@gmail.com"
                    className="ml-2 text-blue-400 hover:underline"
                  >
                    onekonekinternet@gmail.com
                  </a>
                </li>
                <li className="mb-2 flex items-center justify-center md:justify-start">
                  <i className="fab fa-facebook mr-3 text-blue-400 text-lg"></i>
                  <strong>Facebook:</strong>
                  <a
                    href="https://www.facebook.com/onekonekinternet"
                    className="ml-2 text-blue-400 hover:underline"
                  >
                    facebook.com/onekonek
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-600 pt-4">
          <p className="text-sm text-gray-400">
            © 2024 ONE-KONEK Network and Data Solutions. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
export default About;