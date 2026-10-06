import { ArrowRight, Headset, Cpu, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SukalpaLogo.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-[#F8FAFC] overflow-hidden">
      {/* WAVE TOP BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-[260px] overflow-hidden z-0">
        <svg
          viewBox="0 0 1440 300"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#D4E8F5"
            d="M0 80 C220 10 420 20 650 80 C900 150 1180 160 1440 70 L1440 180 C1200 260 950 270 720 210 C450 140 220 150 0 230 Z"
          />

          <path
            fill="#DDECC8"
            d="M0 110 C250 40 500 50 720 120 C980 200 1200 190 1440 100 L1440 210 C1180 280 950 290 720 230 C450 170 220 180 0 250 Z"
          />

          <path
            fill="#F8FAFC"
            d="M0 220 C280 150 520 160 760 220 C1050 290 1250 270 1440 210 L1440 300 L0 300 Z"
          />
        </svg>
      </div>

      <div className="relative z-10 w-[94%] lg:w-[82%] mx-auto pt-55 lg:pt-[230px] pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
          {/* READY TO POWER */}
          <div>
            <h2 className="text-3xl font-bold text-[#0A2D63] leading-tight">
              Ready to Power
              <br />
              <span className="text-[#7BAF2A]">Your Mobility?</span>
            </h2>

            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              Let's build a smarter, cleaner and
              <br />
              more mobility future together.
            </p>
          </div>

          {/* BUTTON */}
          <div className="flex justify-start lg:justify-center">
            <button
              onClick={() => navigate("/enquiry")}
              className="bg-[#7BAF2A] text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-[#0A2D63] transition shadow-md"
            >
              Get in Touch
              <ArrowRight size={18} />
            </button>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
                <Headset size={18} className="text-[#7BAF2A]" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Call Us</p>
                <p className="text-sm font-semibold text-[#0A2D63]">
                  +918151035435 <br></br>
                  +917349758001
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
                <Cpu size={18} className="text-[#7BAF2A]" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-semibold text-[#0A2D63]">
                  om@sukalpamobility.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
                <Leaf size={18} className="text-[#7BAF2A]" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-semibold text-[#0A2D63]">
                  Belagavi, Karnataka 590019
                </p>
              </div>
            </div>
          </div>

          {/* LOGO */}
          <div className="flex justify-start lg:justify-end">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Sukalpa Logo"
                className="h-20 w-auto flex-shrink-0"
              />

              <div>
                <h1
                  className="text-2xl sm:text-3xl lg:text-[35px] font-semibold text-[#0A2D63] leading-none"
                  style={{ fontFamily: "'Insignia Roman', serif" }}
                >
                  Sukalpa
                </h1>

                {/* Mobility Services - Tamrin */}
                <p
                  className="text-[10px] sm:text-xs lg:text-[16px] font-normal uppercase tracking-wide text-[#7BAF2A] leading-none mt-1"
                  style={{ fontFamily: "'Tamrin', sans-serif" }}
                >
                  Mobility Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;