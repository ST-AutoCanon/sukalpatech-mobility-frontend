import React, { useState } from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import Scanner from "../../assets/EinScan Rigill.png";
import ScannerBookingModal from "./ScannerBooking";

import {
    Scan,
    Timer,
    Printer,
    ScanLine,
    FileText,
    Wifi,
} from "lucide-react";

const ScannerAvailability = () => {
    const [showBookingModal, setShowBookingModal] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-6 px-3 sm:px-4 md:px-6">
            <div className="max-w-[1500px] ml-0 sm:ml-4 md:ml-8 lg:ml-12 mr-0 sm:mr-4">

                {/* =====================================================
                    TOP SECTION
                ===================================================== */}
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-5 items-start">

                    {/* ================= LEFT - SCANNER DETAILS ================= */}
                    <div className="min-w-0">

                        <div className="bg-white rounded-xl border border-gray-200 px-4 sm:px-6 py-4 sm:py-5">

                            <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-4 sm:gap-6 items-center">

                                {/* Scanner Image */}
                                <div className="flex justify-center items-center">
                                    <img
                                        src={Scanner}
                                        alt="High Performance Document Scanner"
                                        className="w-full max-w-[210px] sm:max-w-[240px] md:max-w-[280px] h-[240px] sm:h-[300px] md:h-[350px] object-contain"
                                    />
                                </div>

                                {/* Scanner Information */}
                                <div className="min-w-0">

                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A2D63] mb-3">
                                        High-Performance Document Scanner
                                    </h1>

                                    <p className="mt-3 sm:mt-4 text-gray-600 text-[14px] sm:text-base leading-6 sm:leading-7 text-left xl:text-justify mb-3">
                                        Sukalpa Mobility provides high-precision 3D scanning
                                        services using EinScan Regil 3D scanners, enabling
                                        accurate and reliable digital capture of physical
                                        components, products, prototypes, and complex geometries.
                                    </p>

                                    <p className="text-gray-600 text-[14px] sm:text-base leading-6 sm:leading-7 text-left xl:text-justify mb-8">
                                        Whether you need reverse engineering, quality inspection,
                                        dimensional analysis, product development, or 3D
                                        documentation, our scanning services help convert
                                        physical objects into detailed digital 3D models.
                                    </p>

                                    {/* Scanner Features */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                                        {/* High Resolution */}
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                                <Scan
                                                    size={19}
                                                    strokeWidth={2}
                                                    className="text-[#4334E8]"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-[#0A2D63] text-[14px] sm:text-base">
                                                    High Resolution
                                                </h3>
                                                <p className="text-sm sm:text-[15px] text-gray-600 leading-6">
                                                    Up to 600 dpi
                                                </p>
                                            </div>
                                        </div>

                                        {/* Fast Scanning */}
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                                <Timer
                                                    size={19}
                                                    strokeWidth={2}
                                                    className="text-[#4334E8]"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-[#0A2D63] text-[14px] sm:text-base">
                                                    Fast Scanning
                                                </h3>
                                                <p className="text-sm sm:text-[15px] text-gray-600 leading-6">
                                                    Up to 40 ppm
                                                </p>
                                            </div>
                                        </div>

                                        {/* Auto Document Feeder */}
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                                <Printer
                                                    size={19}
                                                    strokeWidth={2}
                                                    className="text-[#4334E8]"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-[#0A2D63] text-[14px] sm:text-base">
                                                    Auto Document Feeder
                                                </h3>
                                                <p className="text-sm sm:text-[15px] text-gray-600 leading-6">
                                                    50-sheet capacity
                                                </p>
                                            </div>
                                        </div>

                                        {/* Duplex Scanning */}
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                                <ScanLine
                                                    size={19}
                                                    strokeWidth={2}
                                                    className="text-[#4334E8]"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-[#0A2D63] text-[14px] sm:text-base">
                                                    Duplex Scanning
                                                </h3>
                                                <p className="text-sm sm:text-[15px] text-gray-600 leading-6">
                                                    Scan both sides
                                                </p>
                                            </div>
                                        </div>

                                        {/* Multiple Formats */}
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                                <FileText
                                                    size={19}
                                                    strokeWidth={2}
                                                    className="text-[#4334E8]"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-[#0A2D63] text-[14px] sm:text-base">
                                                    Multiple Formats
                                                </h3>
                                                <p className="text-sm sm:text-[15px] text-gray-600 leading-6">
                                                    PDF, JPG, PNG, TIFF
                                                </p>
                                            </div>
                                        </div>

                                        {/* Easy Connectivity */}
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                                <Wifi
                                                    size={19}
                                                    strokeWidth={2}
                                                    className="text-[#4334E8]"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-[#0A2D63] text-[14px] sm:text-base">
                                                    Easy Connectivity
                                                </h3>
                                                <p className="text-sm sm:text-[15px] text-gray-600 leading-6">
                                                    USB 3.0 / Wi-Fi
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* =====================================================
                            KEY FEATURES + SPECIFICATIONS
                        ===================================================== */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

                            {/* Key Features */}
                            <div className="bg-white rounded-xl border border-gray-200 px-4 sm:px-6 py-4 sm:py-5">

                                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2D63] mb-4">
                                    Key Features
                                </h2>

                                <div className="flex flex-col gap-3">

                                    <p className="text-[#0A2D63] text-[14px] sm:text-base leading-6 sm:leading-7">
                                        <span className="font-semibold">
                                            Two Work modes:
                                        </span>{" "}
                                        IR and Laser Mode
                                    </p>

                                    <p className="text-[#0A2D63] text-[14px] sm:text-base leading-6 sm:leading-7">
                                        <span className="font-semibold">
                                            Hybrid light source:
                                        </span>{" "}
                                        Blue laser lines and VCSEL infrared
                                    </p>

                                    <p className="text-[#0A2D63] text-[14px] sm:text-base leading-6 sm:leading-7">
                                        <span className="font-semibold">
                                            Marker-Free Laser Scanning
                                        </span>
                                    </p>

                                    <p className="text-[#0A2D63] text-[14px] sm:text-base leading-6 sm:leading-7">
                                        <span className="font-semibold">
                                            Full-Wireless Workflow
                                        </span>
                                    </p>

                                    <p className="text-[#0A2D63] text-[14px] sm:text-base leading-6 sm:leading-7">
                                        <span className="font-semibold">
                                            Powerful Hardware
                                        </span>
                                    </p>

                                    <p className="text-[#0A2D63] text-[14px] sm:text-base leading-6 sm:leading-7">
                                        <span className="font-semibold">
                                            Full Color Texture Scanning
                                        </span>
                                    </p>

                                </div>
                            </div>

                            {/* Specifications */}
                            <div className="bg-white rounded-xl border border-gray-200 px-4 sm:px-6 py-4 sm:py-5">

                                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2D63] mb-4">
                                    Specifications
                                </h2>

                                <div className="divide-y divide-gray-200">

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 py-3 text-sm">
                                        <span className="text-gray-600 shrink-0">
                                            Scan Mode
                                        </span>

                                        <span className="font-medium text-[#0A2D63] sm:text-right">
                                            Laser & HD Light Source
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 py-3 text-sm">
                                        <span className="text-gray-600 shrink-0">
                                            Light Source
                                        </span>

                                        <span className="font-medium text-[#0A2D63] sm:text-right break-words">
                                            25+25 crossed blue laser lines / 7 blue laser lines / IR VCSEL
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 py-3 text-sm">
                                        <span className="text-gray-600 shrink-0">
                                            Resolution
                                        </span>

                                        <span className="font-medium text-[#0A2D63] sm:text-right">
                                            Laser: 0.05 - 10 mm / IR: 0.2 - 10 mm
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 py-3 text-sm">
                                        <span className="text-gray-600 shrink-0">
                                            Working Distance
                                        </span>

                                        <span className="font-medium text-[#0A2D63] sm:text-right">
                                            Laser: 170 - 550 mm / IR: 160 - 1500 mm
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 py-3 text-sm">
                                        <span className="text-gray-600 shrink-0">
                                            Camera Resolution
                                        </span>

                                        <span className="font-medium text-[#0A2D63] sm:text-right">
                                            3D: 2.3 MP × 2, 1.3 MP × 2 / Texture: 5 MP
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 py-3 text-sm">
                                        <span className="text-gray-600 shrink-0">
                                            Hardware
                                        </span>

                                        <span className="font-medium text-[#0A2D63] sm:text-right">
                                            8-core 2.4 GHz / 32 GB RAM / 1 TB SSD
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* =====================================================
                            HOW IT WORKS
                        ===================================================== */}
                        <div className="bg-white rounded-xl border border-gray-200 px-4 sm:px-6 py-4 sm:py-5 mt-5">

                            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2D63] mb-5">
                                How It Works
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                                {/* Step 1 */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#4334E8] flex items-center justify-center font-bold shrink-0">
                                        1
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[#0A2D63] text-[15px] sm:text-base mb-1">
                                            Check Availability
                                        </h3>

                                        <p className="text-[14px] sm:text-[15px] text-gray-600 leading-6">
                                            Select date & time to check scanner availability.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#4334E8] flex items-center justify-center font-bold shrink-0">
                                        2
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[#0A2D63] text-[15px] sm:text-base mb-1">
                                            Book Scanner
                                        </h3>

                                        <p className="text-[14px] sm:text-[15px] text-gray-600 leading-6">
                                            Fill in the booking form and submit your request.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#4334E8] flex items-center justify-center font-bold shrink-0">
                                        3
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[#0A2D63] text-[15px] sm:text-base mb-1">
                                            Approval
                                        </h3>

                                        <p className="text-[14px] sm:text-[15px] text-gray-600 leading-6">
                                            Get approval from admin via email or notification.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#4334E8] flex items-center justify-center font-bold shrink-0">
                                        4
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[#0A2D63] text-[15px] sm:text-base mb-1">
                                            Use Scanner
                                        </h3>

                                        <p className="text-[14px] sm:text-[15px] text-gray-600 leading-6">
                                            Visit at your slot and use the scanner.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* =====================================================
                        RIGHT SIDE
                    ===================================================== */}
                    <div className="space-y-5">

                        <div className="bg-gradient-to-br from-[#4B35F5] to-[#4030E8] rounded-xl p-4 sm:p-6 text-white shadow-md">

                            <div className="flex items-start gap-3 sm:gap-4">

                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <CalendarDays
                                        size={25}
                                        className="text-[#4334E8]"
                                    />
                                </div>

                                <div className="min-w-0">

                                    <h2 className="text-lg sm:text-xl font-bold">
                                        Need to use the scanner?
                                    </h2>

                                    <p className="text-white/90 text-[14px] sm:text-base leading-6 sm:leading-7 mt-1">
                                        Check availability and raise a booking request.
                                    </p>

                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() => setShowBookingModal(true)}
                                className="w-full mt-5 sm:mt-6 bg-white text-[#3025D8] font-semibold rounded-lg px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between hover:bg-gray-100 transition"
                            >
                                <span>Book Scanner Request</span>
                                <ArrowRight size={21} />
                            </button>

                            <ScannerBookingModal
                                isOpen={showBookingModal}
                                onClose={() => setShowBookingModal(false)}
                            />

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ScannerAvailability;
