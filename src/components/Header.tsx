import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/SukalpaLogo.png";

const getActiveTabFromPath = (pathname: string) => {
  if (pathname === "/") return "Home";
  if (pathname === "/about") return "About Us";
  if (pathname === "/careers") return "Careers";
  if (pathname === "/enquiry") return "Contact Us";

  if (pathname.startsWith("/services/")) return "Services";
  if (pathname.startsWith("/capabilities/")) return "Capabilities";

  return "";
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(() =>
    getActiveTabFromPath(location.pathname)
  );

  /*
   * Only close menus when the URL actually changes.
   * Do NOT set activeTab here.
   *
   * This allows:
   * Careers -> Services
   * and Services becomes active immediately even though
   * the current URL may still be /careers.
   */
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setCapabilitiesOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <header className="w-full bg-white shadow-sm relative">
      <div className="w-full px-4 sm:px-6 lg:px-7 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setActiveTab("Home")}
          className="flex items-center gap-3 ml-3 sm:ml-4 lg:ml-9"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-14 sm:h-16 lg:h-20 w-auto"
          />

          <div>
            <h1
              className="text-2xl sm:text-3xl lg:text-[35px] font-semibold text-[#0A2D63] leading-none"
              style={{ fontFamily: "'Insignia Roman', serif" }}
            >
              Sukalpa
            </h1>

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

          {/* Home + About Us */}
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              onClick={() => {
                setActiveTab(item.name);
                setServicesOpen(false);
                setCapabilitiesOpen(false);
              }}
              className={() =>
                `relative pb-1 ${
                  activeTab === item.name
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              {item.name}

              {activeTab === item.name && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600" />
              )}
            </NavLink>
          ))}

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setServicesOpen((prev) => !prev);
                setCapabilitiesOpen(false);
                setActiveTab("Services");
              }}
              className={`relative flex items-center gap-1 py-2 ${
                activeTab === "Services"
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Services

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />

              {activeTab === "Services" && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600" />
              )}
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">

                <Link
                  to="/services/spare-parts"
                  onClick={() => {
                    setActiveTab("Services");
                    setServicesOpen(false);
                  }}
                  className="block px-5 py-4 hover:bg-[#0A2D63] hover:text-white"
                >
                  Spare Parts Management
                </Link>

                <Link
                  to="/services/technical-support"
                  onClick={() => {
                    setActiveTab("Services");
                    setServicesOpen(false);
                  }}
                  className="block px-5 py-4 border-t hover:bg-[#0A2D63] hover:text-white"
                >
                  Technical Support
                </Link>

                <Link
                  to="/services/technical-documentation"
                  onClick={() => {
                    setActiveTab("Services");
                    setServicesOpen(false);
                  }}
                  className="block px-5 py-4 border-t hover:bg-[#0A2D63] hover:text-white"
                >
                  Technical Documentation
                </Link>

                <Link
                  to="/services/scanner-availability"
                  onClick={() => {
                    setActiveTab("Services");
                    setMenuOpen(false);
                    setServicesOpen(false);
                  }}
                  className="block px-5 py-4 border-t hover:bg-[#0A2D63] hover:text-white"
                >
                  3D Scanning
                </Link>
              </div>
            )}
          </div>

          {/* Capabilities Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setCapabilitiesOpen((prev) => !prev);
                setServicesOpen(false);
                setActiveTab("Capabilities");
              }}
              className={`relative flex items-center gap-1 py-2 ${
                activeTab === "Capabilities"
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Capabilities

              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  capabilitiesOpen ? "rotate-180" : ""
                }`}
              />

              {activeTab === "Capabilities" && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600" />
              )}
            </button>

            {capabilitiesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">

                <Link
                  to="/capabilities/new-proto-development"
                  onClick={() => {
                    setActiveTab("Capabilities");
                    setCapabilitiesOpen(false);
                  }}
                  className="block px-5 py-4 text-gray-700 hover:bg-[#0A2D63] hover:text-white transition"
                >
                  New Proto Development
                </Link>

                <Link
                  to="/capabilities/pre-homologation"
                  onClick={() => {
                    setActiveTab("Capabilities");
                    setCapabilitiesOpen(false);
                  }}
                  className="block px-5 py-4 text-gray-700 hover:bg-[#0A2D63] hover:text-white border-t transition"
                >
                  Pre Homologation
                </Link>

                <Link
                  to="/capabilities/post-production"
                  onClick={() => {
                    setActiveTab("Capabilities");
                    setCapabilitiesOpen(false);
                  }}
                  className="block px-5 py-4 text-gray-700 hover:bg-[#0A2D63] hover:text-white border-t transition"
                >
                  Post Production
                </Link>
              </div>
            )}
          </div>

          {/* Careers */}
          <NavLink
            to="/careers"
            onClick={() => {
              setActiveTab("Careers");
              setServicesOpen(false);
              setCapabilitiesOpen(false);
            }}
            className={() =>
              `relative pb-1 ${
                activeTab === "Careers"
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            Careers

            {activeTab === "Careers" && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600" />
            )}
          </NavLink>

          {/* Contact Us */}
          <NavLink
            to="/enquiry"
            onClick={() => {
              setActiveTab("Contact Us");
              setServicesOpen(false);
              setCapabilitiesOpen(false);
            }}
            className={() =>
              `relative pb-1 ${
                activeTab === "Contact Us"
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`
            }
          >
            Contact Us

            {activeTab === "Contact Us" && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600" />
            )}
          </NavLink>

          {/* Login */}
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

            {/* Home + About Us */}
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={() => {
                  setActiveTab(item.name);
                  setMenuOpen(false);
                }}
                className={() =>
                  `block px-6 py-4 font-semibold ${
                    activeTab === item.name
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
                  setActiveTab("Services");
                }}
                className={`w-full flex justify-between items-center px-6 py-4 font-semibold ${
                  activeTab === "Services"
                    ? "text-green-600"
                    : "text-gray-700"
                }`}
              >
                Services

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="bg-gray-50">
                  <Link
                    to="/services/spare-parts"
                    onClick={() => {
                      setActiveTab("Services");
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
                      setActiveTab("Services");
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
                      setActiveTab("Services");
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
                      setActiveTab("Services");
                      setMenuOpen(false);
                      setServicesOpen(false);
                    }}
                    className="block px-10 py-3 hover:bg-gray-100"
                  >
                    3D Scanning
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
                  setActiveTab("Capabilities");
                }}
                className={`w-full flex justify-between items-center px-6 py-4 font-semibold ${
                  activeTab === "Capabilities"
                    ? "text-green-600"
                    : "text-gray-700"
                }`}
              >
                Capabilities

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    capabilitiesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {capabilitiesOpen && (
                <div className="bg-gray-50">
                  <Link
                    to="/capabilities/new-proto-development"
                    onClick={() => {
                      setActiveTab("Capabilities");
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
                      setActiveTab("Capabilities");
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
                      setActiveTab("Capabilities");
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
              onClick={() => {
                setActiveTab("Careers");
                setMenuOpen(false);
              }}
              className={() =>
                `block px-6 py-4 font-semibold ${
                  activeTab === "Careers"
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
              onClick={() => {
                setActiveTab("Contact Us");
                setMenuOpen(false);
              }}
              className={() =>
                `block px-6 py-4 font-semibold ${
                  activeTab === "Contact Us"
                    ? "text-green-600 bg-gray-50"
                    : "text-gray-700"
                }`
              }
            >
              Contact Us
            </NavLink>

            {/* Login */}
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