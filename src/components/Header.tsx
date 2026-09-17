import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/SukalpaLogo.png";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },

  ];

  return (
    <header className="w-full bg-white shadow-sm relative">
      <div className="w-full px-4 sm:px-6 lg:px-7 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 ml-3 sm:ml-4 lg:ml-9">
          {/* Logo symbol only */}
          <img
            src={logo}
            alt="Logo"
            className="h-14 sm:h-16 lg:h-20 w-auto"
          />

          <div>
            {/* Sukalpa */}
            <h1
              className="text-2xl sm:text-3xl lg:text-[35px] font-semibold text-[#0A2D63] leading-none"
              style={{ fontFamily: "'Insignia Roman', serif" }}
            >
              Sukalpa
            </h1>

            {/* Mobility Services */}
            <p
              className="text-[10px] sm:text-xs lg:text-[16px] uppercase tracking-wide text-[#7BAF2A] leading-none mt-1"
              style={{ fontFamily: "'Tamrin', sans-serif" }}
            >
              Mobility Services
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-9 text-lg font-semibold ml-2">

          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `relative pb-1 ${isActive
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600" />
                  )}
                </>
              )}
            </NavLink>
          ))}


          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setServicesOpen((prev) => !prev);
                setCapabilitiesOpen(false);
              }}
              className="flex items-center gap-1 text-gray-700 hover:text-green-600 py-2"
            >
              Services
              <ChevronDown
                size={18}
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">

                <Link
                  to="/services/spare-parts"
                  onClick={() => setServicesOpen(false)}
                  className="block px-5 py-4 hover:bg-[#0A2D63] hover:text-white"
                >
                  Spare Parts Management
                </Link>

                <Link
                  to="/services/technical-support"
                  onClick={() => setServicesOpen(false)}
                  className="block px-5 py-4 border-t hover:bg-[#0A2D63] hover:text-white"
                >
                  Technical Support
                </Link>

                <Link
                  to="/services/technical-documentation"
                  onClick={() => setServicesOpen(false)}
                  className="block px-5 py-4 border-t hover:bg-[#0A2D63] hover:text-white"
                >
                  Technical Documentation
                </Link>

                <Link
                  to="/services/scanner-availability"
                  onClick={() => {
                    setMenuOpen(false);
                    setServicesOpen(false);
                  }}
                  className="block px-5 py-4 border-t hover:bg-[#0A2D63] hover:text-white"
                >
                  Scanner Availability
                </Link>

              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setCapabilitiesOpen((prev) => !prev);
                setServicesOpen(false);
              }}
              className="flex items-center gap-1 text-gray-700 hover:text-green-600 py-2"
            >
              Capabilities
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${capabilitiesOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {capabilitiesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                <Link
                  to="/capabilities/new-proto-development"
                  onClick={() => setCapabilitiesOpen(false)}
                  className="block px-5 py-4 text-gray-700 hover:bg-[#0A2D63] hover:text-white transition"
                >
                  New Proto Development
                </Link>

                <Link
                  to="/capabilities/pre-homologation"
                  onClick={() => setCapabilitiesOpen(false)}
                  className="block px-5 py-4 text-gray-700 hover:bg-[#0A2D63] hover:text-white border-t transition"
                >
                  Pre Homologation
                </Link>

                <Link
                  to="/capabilities/post-production"
                  onClick={() => setCapabilitiesOpen(false)}
                  className="block px-5 py-4 text-gray-700 hover:bg-[#0A2D63] hover:text-white border-t transition"
                >
                  Post Production
                </Link>
              </div>
            )}
          </div>
          <NavLink
            to="/careers"
            className={({ isActive }) =>
              `relative pb-1 ${isActive
                ? "text-green-600"
                : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Careers
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/enquiry"
            className={({ isActive }) =>
              `relative pb-1 ${isActive
                ? "text-green-600"
                : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Contact Us
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600" />
                )}
              </>
            )}
          </NavLink>
          <button
            onClick={() => navigate("/scanner-admin/login")}
            className="ml-2 rounded-lg bg-[#0A2D63] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#08234e]"
          >
             Login
          </button>

        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
        >
          {menuOpen ? (
            <X className="w-7 h-7 text-[#0A2D63]" />
          ) : (
            <Menu className="w-7 h-7 text-[#0A2D63]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <div className="flex flex-col py-2">

            {/* Home, About, Contact */}
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-4 font-semibold ${isActive
                    ? "text-green-600 bg-gray-50"
                    : "text-gray-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Services */}
            <div>
              <button
                onClick={() => {
                  setServicesOpen((prev) => !prev);
                  setCapabilitiesOpen(false);
                }}
                className="w-full flex justify-between items-center px-6 py-4 font-semibold text-gray-700"
              >
                Services
                <ChevronDown
                  size={18}
                  className={`transition-transform ${servicesOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {servicesOpen && (
                <div className="bg-gray-50">
                  <Link
                    to="/services/spare-parts"
                    onClick={() => {
                      setMenuOpen(false);
                      setServicesOpen(false);
                    }}
                    className="block px-10 py-3 hover:bg-gray-100"
                  >
                    Spare Parts Management
                  </Link>

                  <Link
                    to="/services/technical-support"
                    onClick={() => {
                      setMenuOpen(false);
                      setServicesOpen(false);
                    }}
                    className="block px-10 py-3 hover:bg-gray-100"
                  >
                    Technical Support
                  </Link>

                  <Link
                    to="/services/technical-documentation"
                    onClick={() => {
                      setMenuOpen(false);
                      setServicesOpen(false);
                    }}
                    className="block px-10 py-3 hover:bg-gray-100"
                  >
                    Technical Documentation
                  </Link>
                  <Link
                    to="/services/scanner-availability"
                    onClick={() => {
                      setMenuOpen(false);
                      setServicesOpen(false);
                    }}
                    className="block px-10 py-3 hover:bg-gray-100"
                  >
                    Scanner Availability
                  </Link>
                </div>
              )}
            </div>

            {/* Capabilities */}
            <div>
              <button
                onClick={() => {
                  setCapabilitiesOpen((prev) => !prev);
                  setServicesOpen(false);
                }}
                className="w-full flex justify-between items-center px-6 py-4 font-semibold text-gray-700"
              >
                Capabilities
                <ChevronDown
                  size={18}
                  className={`transition-transform ${capabilitiesOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {capabilitiesOpen && (
                <div className="bg-gray-50">
                  <Link
                    to="/capabilities/new-proto-development"
                    onClick={() => {
                      setMenuOpen(false);
                      setCapabilitiesOpen(false);
                    }}
                    className="block px-10 py-3 hover:bg-gray-100"
                  >
                    New Proto Development
                  </Link>

                  <Link
                    to="/capabilities/pre-homologation"
                    onClick={() => {
                      setMenuOpen(false);
                      setCapabilitiesOpen(false);
                    }}
                    className="block px-10 py-3 hover:bg-gray-100"
                  >
                    Pre Homologation
                  </Link>

                  <Link
                    to="/capabilities/post-production"
                    onClick={() => {
                      setMenuOpen(false);
                      setCapabilitiesOpen(false);
                    }}
                    className="block px-10 py-3 hover:bg-gray-100"
                  >
                    Post Production
                  </Link>
                </div>
              )}
            </div>
            {/* Careers */}
            <NavLink
              to="/careers"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 font-semibold ${isActive
                  ? "text-green-600 bg-gray-50"
                  : "text-gray-700"
                }`
              }
            >
              Careers
            </NavLink>

            {/* Contact Us */}
            <NavLink
              to="/enquiry"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 font-semibold ${isActive
                  ? "text-green-600 bg-gray-50"
                  : "text-gray-700"
                }`
              }
            >
              Contact Us
            </NavLink>
           <button
  onClick={() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setCapabilitiesOpen(false);
    navigate("/scanner-admin/login");
  }}
  className="mx-6 my-2 rounded-lg bg-[#0A2D63] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#08234e]"
>
  Login
</button>
            

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;