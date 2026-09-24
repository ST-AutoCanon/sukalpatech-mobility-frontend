import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Bus from "../assets/Busbanner.png";
import BusSlide from "../assets/MobileBusbanner.png";
import { ArrowRight } from "lucide-react";
import onsitediagnostic from "../assets/onsite.png";
import homologation from "../assets/homologation.png";
import Test1 from "../assets/Test1.png";
import Test2 from "../assets/Test2.png";
import Test3 from "../assets/Test3.png";
import prepost from "../assets/pre-post.png";
import {
    RefreshCw,
    Headset,
    Users,
    Cpu,
    ShieldCheck,
    Leaf,
    Package,
    Truck,
    BookOpen,
    FileCheck,
    Wrench,
    MonitorCog
} from "lucide-react";


const Home = () => {
    const [showCapabilitiesDropdown, setShowCapabilitiesDropdown] = useState(false);

    const servicesRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scrollToServices = () => {
        servicesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    // const testimonials = [
    //     {
    //         image: Test3,
    //         name: "Nat Reynolds",
    //         role: "Fleet Operations Manager",
    //         review:
    //             "Sukalpa Mobility has consistently provided reliable after-sales support. Their technical team responds quickly and keeps our EV fleet running efficiently.",
    //     },
    //     {
    //         image: Test1,
    //         name: "Celia Almeida",
    //         role: "Service Coordinator",
    //         review:
    //             "Their engineering expertise and proactive maintenance support have significantly reduced vehicle downtime. The overall service experience has been excellent.",
    //     },
    //     {
    //         image: Test2,
    //         name: "Bob Roberts",
    //         role: "Technical Manager",
    //         review:
    //             "From diagnostics to commissioning support, the team delivers professional service with great attention to detail. Highly recommended for EV fleet support.",
    //     },
    // ];
    return (
        <>
            <section className="relative w-full min-h-[1300px] lg:min-h-screen overflow-visible">

                {/* Desktop Image */}
                <img
                    src={Bus}
                    alt="Bus"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                />

                {/* Mobile Image */}
                <img
                    src={BusSlide}
                    alt="Sukalpa Mobility"
                    className="block lg:hidden absolute inset-0 w-full h-full object-cover object-fill"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10"></div>

                {/* Hero Content */}
                <div className="relative z-10">
                    <div className="w-full lg:w-[42%] xl:w-[40%] px-6 sm:px-8 lg:pl-10 xl:pl-16 pt-20 lg:pt-20 pb-12 lg:pb-20">

                        <div className="-translate-y-16 sm:-translate-y-12 lg:-translate-y-10">

                            {/* Tagline */}
                            <p className="uppercase tracking-wide text-sm font-semibold mb-5 lg:ml-1">
                                <span className="text-[#7BAF2A]">
                                    CARE THAT FLOWS WITH YOU.
                                </span>
                            </p>

                            {/* Heading */}
                            <h1 className="text-[30px] sm:text-[38px] lg:text-[46px] xl:text-[52px] font-bold leading-[1.1] text-[#0A2D63]">
                                Powering the
                                <br />
                                Future of Mobility.
                            </h1>

                            <h2 className="text-[30px] sm:text-[38px] lg:text-[46px] xl:text-[52px] font-bold leading-[1.1] text-[#7BAF2A]">
                                Together.
                            </h2>

                            {/* Description */}
                            <p className="mt-5 max-w-[500px] text-base sm:text-lg lg:text-xl font-semibold leading-snug text-[#1f2937]">
                                End-to-End EV After Sales & Lifecycle Support
                                <br />
                                for Every Journey.
                            </p>

                            <p className="mt-6 max-w-[420px] text-sm lg:text-base text-gray-700 leading-7">
                                Professional EV diagnostics, field service,
                                commissioning, warranty support, and technical consulting
                                across India.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-row gap-3 mt-8 w-full">

                                {/* Buttons */}
                                <div className="
    mt-8
    grid
    grid-cols-2
    gap-3
    w-full
    -translate-y-3
    sm:-translate-y-2
    lg:translate-y-0
">

                                    {/* Request Services */}
                                    <button
                                        onClick={() => {
                                            navigate("/enquiry");
                                            window.scrollTo(0, 0);
                                        }}
                                        className="
    inline-flex
    w-full
    h-[54px]
    justify-center
    items-center
    bg-[#0A2D63]
    text-white
    px-4
    py-2
    rounded-full
    hover:bg-[#7BAF2A]
    transition
    text-center
    leading-tight

    max-lg:px-3
  "
                                    >
                                        <span className="max-lg:max-w-[65px] lg:whitespace-nowrap">
                                            Request Services
                                        </span>
                                        <ArrowRight size={16} className="shrink-0" />
                                    </button>

                                    {/* Explore Services */}
                                    <button
                                        onClick={scrollToServices}
                                        className="
    inline-flex
    w-full
    h-[54px]
    justify-center
    items-center
    gap-1
    bg-[#7BAF2A]
    text-white
    px-4
    py-2
    rounded-full
    hover:bg-[#0A2D63]
    transition
    text-center
    leading-tight

    max-lg:px-2
  "
                                    >
                                        <span className="max-lg:max-w-[65px] lg:whitespace-nowrap">
                                            Explore Services
                                        </span>

                                        <ArrowRight size={16} className="shrink-0" />
                                    </button>
                                    {/* Request Scanner Service */}
                                    <button
                                        onClick={() => {
                                            navigate("/services/scanner-availability");
                                            window.scrollTo(0, 0);
                                        }}
                                        className="
            col-span-2
            justify-self-center
            inline-flex
            items-center
            justify-center
            gap-2
            bg-[#0A2D63]
            text-white
            px-7
            py-3
            rounded-full
            hover:bg-[#7BAF2A]
            transition
            whitespace-nowrap
        "
                                    >
                                        Request Scanner Service
                                        <ArrowRight size={18} />
                                    </button>

                                </div>


                            </div>

                        </div>

                    </div>
                </div>

                {/* Feature Card */}
                <div
                    className="
        relative
        top-[480px]
        sm:mt-[420px]
        md:mt-[460px]
        lg:absolute
        lg:top-auto
        lg:left-1/2
        lg:-translate-x-1/2
        lg:-bottom-16
        w-[94%]
        lg:w-[90%]
        mx-auto
        bg-white
        rounded-3xl
        lg:rounded-full
        shadow-xl
        px-5
        py-5
        lg:py-4
    "
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 lg:gap-0 lg:divide-x divide-gray-200">
                        {/* Item 1 */}
                        <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left gap-2 lg:gap-3 px-2 py-3">
                            <RefreshCw className="w-10 h-10 text-[#0A2D63] flex-shrink-0" /> <div>
                                <h3 className="text-2xl font-bold text-[#0A2D63]">360°</h3>
                                <p className="text-sm text-gray-600 whitespace-nowrap"> Lifecycle Support </p>
                            </div>
                        </div>
                        {/* Item 2 */}
                        <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left gap-2 lg:gap-3 px-2 py-3">
                            <Headset className="w-10 h-10 text-[#0A2D63] flex-shrink-0" />
                            <div> <h3 className="text-2xl font-bold text-[#0A2D63]">24/7</h3>
                                <p className="text-sm text-gray-600 whitespace-nowrap"> Customer Assistance </p>
                            </div>
                        </div>
                        {/* Item 3 */}
                        <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left gap-2 lg:gap-3 px-2 py-3">
                            <Users className="w-10 h-10 text-[#0A2D63] flex-shrink-0" />
                            <div> <h3 className="text-2xl font-bold text-[#0A2D63]">100+</h3>
                                <p className="text-sm text-gray-600 whitespace-nowrap"> Service Network </p>
                            </div> </div> {/* Item 4 */}
                        <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left gap-2 lg:gap-3 px-2 py-3">
                            <Cpu className="w-10 h-10 text-[#0A2D63] flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-[#0A2D63]"> AI-Powered </h3>
                                <p className="text-sm text-gray-600 whitespace-nowrap"> Smart Solutions </p>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            <section className="pt-24 lg:pt-29 pb-12 bg-white">
                <div className="w-[94%] lg:w-[87%] mx-auto lg:translate-x-[-35px]">

                    <div className="max-w-6xl lg:pl-3">

                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2D63]">
                            About <span className="text-[#7BAF2A]">Us</span>
                        </h2>

                        <div className="w-14 h-1 bg-[#7BAF2A] rounded-full mt-3 mb-8"></div>
                        <div className="mt-6 text-gray-600 text-base sm:text-lg leading-7 sm:leading-8 text-left lg:text-justify">
                            <p>
                                Sukalpa Mobility Services is a leading EV after-sales service provider dedicated
                                to maximizing vehicle uptime and ensuring reliable fleet performance.
                            </p>

                            <p className="mt-6">
                                With expertise in electric buses, commercial EVs, diagnostics,
                                commissioning, and technical support, we partner with OEMs and fleet
                                operators to deliver world-class service solutions across India.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                navigate("/about");
                                window.scrollTo(0, 0);
                            }}
                            className="mt-10 bg-[#0A2D63] hover:bg-[#7BAF2A] transition text-white px-8 py-3 rounded-full"
                        >
                            View More
                        </button>

                    </div>

                </div>
            </section>

            <section
                ref={servicesRef}
                className="bg-white pt-0 pb-16"
            >
                <div className="w-[94%] lg:w-[89%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">

                    {/* OUR SERVICES */}
                    <div className="bg-white rounded-[32px] shadow-lg border border-gray-100 p-8 flex flex-col">

                        <p className="text-2xl font-bold tracking-wide uppercase">
                            <span className="text-[#0A2D63]">Our </span>
                            <span className="text-[#7BAF2A]">Services</span>
                        </p>

                        <div className="w-12 h-1 bg-[#7BAF2A] rounded-full mt-2 mb-8"></div>

                        {/* Content */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Card 1 */}
                            <div className="bg-[#F8FAFC] rounded-3xl shadow-md p-6 flex flex-col h-full">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5 min-h-[72px]">
                                    <Package className="w-12 h-12 text-[#7BAF2A] flex-shrink-0" />

                                    <h3 className="font-bold text-[#0A2D63] text-xl leading-tight min-h-[56px] flex items-center">
                                        SPARE PART MANAGEMENT
                                    </h3>
                                </div>

                                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                                    <li>Optimized component lines</li>
                                    <li>Supply chain efficiency</li>
                                    <li>Minimized asset standby</li>
                                </ul>
                            </div>


                            {/* Card 2 */}
                            <div className="bg-[#F8FAFC] rounded-3xl shadow-md p-6 flex flex-col h-full">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5 min-h-[72px]">
                                    <Truck className="w-12 h-12 text-[#0A2D63] flex-shrink-0" />

                                    <h3 className="font-bold text-[#0A2D63] text-xl leading-tight min-h-[56px] flex items-center">
                                        MOBILE SERVICE VEHICLES
                                    </h3>
                                </div>

                                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                                    <li>Rapid dispatch vans</li>
                                    <li>Specialized toolkits</li>
                                    <li>Real-time on-field service</li>
                                </ul>
                            </div>


                            {/* Card 3 */}
                            <div className="bg-[#F8FAFC] rounded-3xl shadow-md p-6 flex flex-col h-full">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5 min-h-[72px]">
                                    <Headset className="w-12 h-12 text-[#7BAF2A] flex-shrink-0" />

                                    <h3 className="font-bold text-[#0A2D63] text-xl leading-tight min-h-[56px] flex items-center">
                                        TECHNICAL SUPPORT CELL
                                    </h3>
                                </div>

                                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                                    <li>Dedicated engineering helpline</li>
                                    <li>Real-time fault diagnostics</li>
                                    <li>24×7 continuous support</li>
                                </ul>
                            </div>


                            {/* Card 4 */}
                            <div className="bg-[#F8FAFC] rounded-3xl shadow-md p-6 flex flex-col h-full">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5 min-h-[72px]">
                                    <BookOpen className="w-12 h-12 text-[#0A2D63] flex-shrink-0" />

                                    <h3 className="font-bold text-[#0A2D63] text-xl leading-tight min-h-[56px] flex items-center">
                                        MANUAL, MMI & TRAINING
                                    </h3>
                                </div>

                                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                                    <li>Standard operating procedures</li>
                                    <li>Workforce training programs</li>
                                    <li>Technical manual curation</li>
                                </ul>
                            </div>

                        </div>

                        {/* Button */}
                        <button
                            onClick={() => {
                                navigate("/services/spare-parts");
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                });
                            }}
                            className="mt-auto pt-8 text-xl font-semibold flex items-center gap-2 group"
                        >
                            <span className="text-[#7BAF2A] group-hover:text-[#0A2D63] transition">
                                Explore All Services
                            </span>
                            <ArrowRight className="w-5 h-5 text-[#7BAF2A] group-hover:text-[#0A2D63] transition" />
                        </button>
                    </div>

                    {/* OUR CAPABILITIES */}
                    <div className="bg-white rounded-[32px] shadow-lg border border-gray-100 p-8 flex flex-col">
                        <p className="text-2xl font-bold tracking-wide uppercase">
                            <span className="text-[#0A2D63]">Our </span>
                            <span className="text-[#7BAF2A]">CAPABILITIES</span>
                        </p>

                        <div className="w-12 h-1 bg-[#7BAF2A] rounded-full mt-2 mb-8"></div>



                        <div className="space-y-4 flex-grow">


                            {/* Capability Card 1 */}
                            <div className="bg-[#F8FAFC] rounded-3xl shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 min-h-[170px]">

                                {/* Image */}
                                <img
                                    src={onsitediagnostic}
                                    className="w-full h-48 sm:w-32 sm:h-28 rounded-xl object-cover flex-shrink-0"
                                />

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="font-bold text-[#0A2D63] text-lg">
                                        NEW PROTO DEVELOPMENT
                                    </h3>

                                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                        We initiate multi-vehicle audits,in-depth logs of cycle
                                        evaluations,rapid corrective rapid conimize downtime minimize
                                        downtime and improve performance
                                    </p>
                                </div>
                                {/* Right Icon */}
                                <div className="w-10 h-10 rounded-full border border-[#7BAF2A] flex items-center justify-center">
                                    <MonitorCog className="w-5 h-5 text-[#7BAF2A]" />
                                </div>

                            </div>
                            <div className="bg-[#F8FAFC] rounded-3xl shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 min-h-[170px]">


                                <img
                                    src={homologation}
                                    className="w-full h-48 sm:w-32 sm:h-28 rounded-xl object-cover flex-shrink-0"
                                />
                                <div className="flex-1">

                                    <h3 className="font-bold text-[#0A2D63] text-lg">
                                        PRE HOMOLOGATION AND VEHICLE CERTIFICATION
                                    </h3>


                                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                        We provide pre-homologation support for testing and
                                        certification,ensuring commercial vehicle achieve first-time
                                        regulatory compliance
                                    </p>

                                </div>
                                <div className="w-10 h-10 rounded-full border border-[#7BAF2A] flex items-center justify-center">
                                    <FileCheck className="w-5 h-5 text-[#7BAF2A]" />
                                </div>

                            </div>
                            {/* Capability Card 2 */}
                            <div className="bg-[#F8FAFC] rounded-3xl shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 min-h-[170px]">
                                <img
                                    src={prepost}
                                    alt="Post Production Services"
                                    className="w-full h-48 sm:w-32 sm:h-28 rounded-xl object-cover flex-shrink-0"
                                />
                                <div className="flex-1">

                                    <h3 className="font-bold text-[#0A2D63] text-lg">
                                        POST PRODUCTION SERVICES
                                    </h3>


                                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                        We provide comprehensive pre-and post-production support,
                                        ensuring every electric vehicle(EV) is optimized for physical
                                        assembly,accurate technical integration,and long-term reliability.
                                    </p>

                                </div>

                                <div className="w-10 h-10 rounded-full border border-[#7BAF2A] flex items-center justify-center">
                                    <Wrench className="w-5 h-5 text-[#7BAF2A]" />
                                </div>

                            </div>
                        </div>

                        <button
                            onClick={() => {
                                navigate("/capabilities");
                                window.scrollTo(0, 0);
                            }}
                            className="mt-auto pt-8 text-xl font-semibold flex items-center gap-2 group"
                        >
                            <span className="text-[#7BAF2A] group-hover:text-[#0A2D63] transition">
                                Explore All Capabilities
                            </span>
                            <ArrowRight className="w-5 h-5 text-[#7BAF2A] group-hover:text-[#0A2D63] transition" />
                        </button>
                    </div>
                </div>
            </section>

            { }

            <section className="bg-white pt-8 pb-2">

                <div className="w-[94%] lg:w-[89%] mx-auto">

                    {/* Heading */}
                    <div className="max-w-4xl mb-10">

                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2D63]">
                            Why <span className="text-[#7BAF2A]">Sukalpa</span>
                        </h2>

                        <div className="w-14 h-1 bg-[#7BAF2A] rounded-full mt-3"></div>

                    </div>

                    {/* Content */}
                    <div className="bg-[#F8FAFC] rounded-3xl px-8 py-6 shadow-sm">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-gray-200">

                            {/* Card 1 */}
                            <div className="flex items-center gap-5 px-6">

                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-[#7BAF2A]">
                                    <Leaf className="w-7 h-7 text-[#7BAF2A]" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#0A2D63] text-lg">
                                        Sustainable by Design
                                    </h3>

                                    <p className="text-gray-600 text-sm mt-1">
                                        Environment-first approach
                                        for a better tomorrow.
                                    </p>
                                </div>

                            </div>

                            {/* Card 2 */}
                            <div className="flex items-center gap-5 px-6">

                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-[#7BAF2A]">
                                    <ShieldCheck className="w-7 h-7 text-[#7BAF2A]" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#0A2D63] text-lg">
                                        Experienced EV Engineers
                                    </h3>

                                    <p className="text-gray-600 text-sm mt-1">
                                        Skilled professionals with extensive expertise in electric mobility solutions.
                                    </p>
                                </div>

                            </div>

                            {/* Card 3 */}
                            <div className="flex items-center gap-5 px-6">

                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-[#7BAF2A]">
                                    <Users className="w-7 h-7 text-[#7BAF2A]" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#0A2D63] text-lg">
                                        Pan India Support
                                    </h3>

                                    <p className="text-gray-600 text-sm mt-1">
                                        Nationwide service network providing timely support wherever you operate.
                                    </p>
                                </div>

                            </div>

                            {/* Card 4 */}
                            <div className="flex items-center gap-5 px-6">

                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-[#7BAF2A]">
                                    <Cpu className="w-7 h-7 text-[#7BAF2A]" />
                                </div>

                                <div>


                                    <h3 className="font-bold text-[#0A2D63] text-lg">
                                        Fast Response Time
                                    </h3>

                                    <p className="text-gray-600 text-sm mt-1">
                                        Rapid diagnostics and quick resolution to maximize fleet uptime.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* <section className="pt-5 pb-10 bg-white">

                <div className="w-[94%] lg:w-[89%] mx-auto">
                    <div className="text-center mb-16">

                        <p className="uppercase tracking-[4px] text-lg font-bold text-gray-600">
                            TESTIMONIALS
                        </p>

                        <h2 className="text-4xl lg:text-5xl font-bold mt-3">

                            <span className="text-[#0A2D63]">
                                What Clients
                            </span>{" "}

                            <span className="text-[#7BAF2A]">
                                Say
                            </span>

                        </h2>

                        <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
                            We place huge value on strong relationships and have seen the benefit they bring to our business. Customer feedback is vital in helping us improve our services.
                        </p>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-10">

                        {testimonials.map((item, index) => (

                            <div
                                key={index}
                                className="relative bg-[#F8F8F8] rounded-3xl shadow-md px-8 pt-16 pb-8 text-center hover:shadow-xl transition-all duration-300"
                            >

                                <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <p className="text-gray-600 italic leading-7">
                                    "{item.review}"
                                </p>

                                <h3 className="mt-8 text-xl font-semibold text-[#0A2D63]">
                                    {item.name}
                                </h3>

                                <p className="text-[#7BAF2A] font-medium">
                                    {item.role}
                                </p>

                            </div>

                        ))}

                    </div>
                </div>
            </section> */}
            {/* ================= CALL TO ACTION ================= */}
            <section className="bg-white pt-8 pb-8 lg:pt-12 lg:pb-12">
                <div className="w-[94%] lg:w-[89%] mx-auto">
                    <div className="bg-[#F8FAFC] rounded-3xl px-8 py-10 lg:py-12 text-center shadow-sm">

                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2D63]">
                            Ready to Power
                            <span className="text-[#7BAF2A]"> Your Mobility?</span>
                        </h2>

                        <button
                            onClick={() => {
                                navigate("/enquiry");
                                window.scrollTo(0, 0);
                            }}
                            className="mt-8 bg-[#7BAF2A] hover:bg-[#0A2D63] transition text-white px-8 py-3 rounded-full inline-flex items-center gap-2"
                        >
                            Query Form
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
