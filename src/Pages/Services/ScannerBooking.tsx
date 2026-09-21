import React, { useEffect, useState } from "react";
import {
    CalendarDays,
    X,
    UserRound,
    Printer,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

interface ScannerBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ScannerBookingModal: React.FC<ScannerBookingModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        countryCode: "+91",
        mobile: "",
        department: "",
        contactMethod: "",
        date: "",
        startTime: "",
        endTime: "",
        purpose: "",
        concerns: "",
    });

    const [currentMonth, setCurrentMonth] = useState(
        new Date(2026, 8, 1)
    );


    const [selectedDates, setSelectedDates] = useState<string[]>([]);

    const [selectedSlots, setSelectedSlots] = useState<
        Record<string, { startTime: string; endTime: string }>
    >({});
    const [availabilityByDate, setAvailabilityByDate] = useState<
        Record<string, BookingAvailability[]>
    >({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [requestAnyway, setRequestAnyway] = useState(false);
    const [slotConflict, setSlotConflict] = useState<{
        date: string;
        startTime: string;
        endTime: string;
        status: "pending" | "approved";
    } | null>(null);

    const resetForm = () => {
        setFormData({
            fullName: "",
            email: "",
            countryCode: "+91",
            mobile: "",
            department: "",
            contactMethod: "",
            date: "",
            startTime: "",
            endTime: "",
            purpose: "",
            concerns: "",
        });

        setSelectedDates([]);
        setSelectedSlots({});
        setAvailability([]);
        setAvailabilityByDate({});
        setRequestAnyway(false);
        setIsSubmitting(false);
        setAvailabilityLoading(false);
        setSlotConflict(null);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };



    interface BookingAvailability {
        date: string;
        startTime: string;
        endTime: string;
        status: "pending" | "approved";
    }

    const timeOptions = [
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "01:00 PM",
        "01:30 PM",
        "02:00 PM",
        "02:30 PM",
        "03:00 PM",
        "03:30 PM",
        "04:00 PM",
        "04:30 PM",
        "05:00 PM",
        "05:30 PM",
        "06:00 PM",
    ];

    const convertTimeToMinutes = (time: string): number => {
        if (!time) return -1;

        const [timePart, modifier] = time.split(" ");
        let [hours, minutes] = timePart.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        }

        if (modifier === "AM" && hours === 12) {
            hours = 0;
        }

        return hours * 60 + minutes;
    };

    const isTimeOverlapping = (
        selectedStart: string,
        selectedEnd: string,
        bookingStart: string,
        bookingEnd: string
    ) => {
        const start = convertTimeToMinutes(selectedStart);
        const end = convertTimeToMinutes(selectedEnd);

        const bookingStartMinutes =
            convertTimeToMinutes(bookingStart);

        const bookingEndMinutes =
            convertTimeToMinutes(bookingEnd);

        return (
            start < bookingEndMinutes &&
            end > bookingStartMinutes
        );
    };
    const isPastDate = (date: string) => {
        const today = new Date();

        const todayString = `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        return date < todayString;
    };

    const [availability, setAvailability] = useState<
        BookingAvailability[]
    >([]);

    const [availabilityLoading, setAvailabilityLoading] =
        useState(false);

    const fetchAvailability = async (date: string) => {
        try {
            setAvailabilityLoading(true);

            const response = await fetch(
                `${API_BASE_URL}/scanner/availability?startDate=${date}&endDate=${date}`
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch availability."
                );
            }

            const data = result.data || [];

            setAvailabilityByDate((prev) => ({
                ...prev,
                [date]: data,
            }));

        } catch (error) {
            console.error("Availability error:", error);

            setAvailabilityByDate((prev) => ({
                ...prev,
                [date]: [],
            }));
        } finally {
            setAvailabilityLoading(false);
        }
    };
    const fetchMonthAvailability = async (date: Date) => {
        try {
            setAvailabilityLoading(true);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            const startDate = `${year}-${String(month).padStart(2, "0")}-01`;

            const lastDay = new Date(year, month, 0).getDate();

            const endDate = `${year}-${String(month).padStart(2, "0")}-${String(
                lastDay
            ).padStart(2, "0")}`;

            const response = await fetch(
                `${API_BASE_URL}/scanner/availability?startDate=${startDate}&endDate=${endDate}`
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch monthly availability."
                );
            }

            const monthAvailability = result.data || [];

            setAvailability(monthAvailability);

            const groupedAvailability: Record<
                string,
                BookingAvailability[]
            > = {};

            monthAvailability.forEach((item: BookingAvailability) => {
                if (!groupedAvailability[item.date]) {
                    groupedAvailability[item.date] = [];
                }

                groupedAvailability[item.date].push(item);
            });

            setAvailabilityByDate((prev) => ({
                ...prev,
                ...groupedAvailability,
            }));
        } catch (error) {
            console.error("Month availability error:", error);
            setAvailability([]);
        } finally {
            setAvailabilityLoading(false);
        }
    };
    useEffect(() => {
        if (isOpen) {
            fetchMonthAvailability(currentMonth);
        }
    }, [isOpen, currentMonth]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        if (name === "mobile") {
            const numbersOnly = value.replace(/\D/g, "").slice(0, 10);

            setFormData((prev) => ({
                ...prev,
                [name]: numbersOnly,
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
    try {
        if (!formData.fullName.trim()) {
            alert("Please enter your full name.");
            return;
        }

        if (!formData.email.trim()) {
            alert("Please enter your email.");
            return;
        }

        if (!formData.mobile) {
            alert("Please enter your mobile number.");
            return;
        }

        if (!formData.contactMethod) {
            alert("Please select a preferred contact method.");
            return;
        }

        // --------------------------------------------------
        // Validate selected dates
        // --------------------------------------------------

        if (!selectedDates.length) {
            alert("Please select at least one date.");
            return;
        }

        if (selectedDates.length > 3) {
            alert("You can select a maximum of 3 dates.");
            return;
        }

        // --------------------------------------------------
        // Build all selected date + time combinations
        // --------------------------------------------------

        const bookingDates = selectedDates.map((date) => {
            const slot = selectedSlots[date];

            return {
                date,
                startTime: slot?.startTime || "",
                endTime: slot?.endTime || "",
            };
        });

        // --------------------------------------------------
        // Validate every selected date
        // --------------------------------------------------

        for (const booking of bookingDates) {
            if (!booking.startTime) {
                alert(
                    `Please select a start time for ${booking.date}.`
                );
                return;
            }

            if (!booking.endTime) {
                alert(
                    `Please select an end time for ${booking.date}.`
                );
                return;
            }

            const startMinutes = convertTimeToMinutes(
                booking.startTime
            );

            const endMinutes = convertTimeToMinutes(
                booking.endTime
            );

            if (startMinutes < 0 || endMinutes < 0) {
                alert(
                    `Please select a valid time for ${booking.date}.`
                );
                return;
            }

            if (endMinutes <= startMinutes) {
                alert(
                    `End time must be later than start time for ${booking.date}.`
                );
                return;
            }
        }

        // --------------------------------------------------
        // Check conflicts for all selected dates
        // --------------------------------------------------

        if (!requestAnyway) {
            for (const booking of bookingDates) {
                const bookingsForDate =
                    availabilityByDate[booking.date] || [];

                const startMinutes = convertTimeToMinutes(
                    booking.startTime
                );

                const endMinutes = convertTimeToMinutes(
                    booking.endTime
                );

                const hasConflict = bookingsForDate.some(
                    (existingBooking) => {
                        const existingStart =
                            convertTimeToMinutes(
                                existingBooking.startTime
                            );

                        const existingEnd =
                            convertTimeToMinutes(
                                existingBooking.endTime
                            );

                        return (
                            startMinutes < existingEnd &&
                            endMinutes > existingStart
                        );
                    }
                );

                if (hasConflict) {
                    alert(
                        `The selected time on ${booking.date} is already reserved. Please select another time or choose Request Anyway.`
                    );
                    return;
                }
            }
        }

        // --------------------------------------------------
        // Submit
        // --------------------------------------------------

        setIsSubmitting(true);

        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            countryCode: formData.countryCode,
            mobile: formData.mobile,
            department: formData.department,
            contactMethod: formData.contactMethod,
            purpose: formData.purpose,
            concerns: formData.concerns,

            // ALL selected dates and times
            bookings: bookingDates,

            requestAnyway,
        };

        console.log("Booking payload:", payload);

        const response = await fetch(
            `${API_BASE_URL}/scanner/bookings`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await response.json();

        console.log(
            "Booking API status:",
            response.status
        );

        console.log(
            "Booking API response:",
            result
        );

        if (!response.ok) {
            alert(
                result.message ||
                    result.error ||
                    "Failed to submit scanner request."
            );
            return;
        }

        alert(
            `Scanner request submitted successfully.\n\nBooking ID: ${result.data.bookingId}`
        );

        // --------------------------------------------------
        // Reset form
        // --------------------------------------------------

        setFormData({
            fullName: "",
            email: "",
            countryCode: "+91",
            mobile: "",
            department: "",
            contactMethod: "",
            date: "",
            startTime: "",
            endTime: "",
            purpose: "",
            concerns: "",
        });

        setSelectedDates([]);
        setSelectedSlots({});
        setAvailability([]);
        setAvailabilityByDate({});
        setSlotConflict(null);
        setRequestAnyway(false);

        onClose();
    } catch (error) {
        console.error(
            "Scanner booking error:",
            error
        );

        alert(
            "Unable to submit scanner request. Please try again."
        );
    } finally {
        setIsSubmitting(false);
    }
};

    const getDaysInMonth = (date: Date) => {
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        ).getDay();
    };

    const formatDate = (
        year: number,
        month: number,
        day: number
    ) => {
        return `${year}-${String(month + 1).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;
    };

    const handleDateSelect = async (date: string) => {
        if (isPastDate(date)) {
            return;
        }

        setRequestAnyway(false);

        // If date is already selected → remove it
        if (selectedDates.includes(date)) {
            setSelectedDates((prev) =>
                prev.filter((item) => item !== date)
            );

            setSelectedSlots((prev) => {
                const updated = { ...prev };
                delete updated[date];
                return updated;
            });

            return;
        }

        // Maximum 3 dates
        if (selectedDates.length >= 3) {
            alert("You can select a maximum of 3 dates for a scanner request.");
            return;
        }

        // Add new date
        setSelectedDates((prev) => [...prev, date]);

        // Fetch availability for this specific date
        if (!availabilityByDate[date]) {
            await fetchAvailability(date);
        }
    };


    const getDateStatus = (date: string) => {
        const bookingsForDate =
            availabilityByDate[date] || [];

        if (bookingsForDate.length === 0) {
            return "available";
        }

        const hasPendingBooking = bookingsForDate.some(
            (item) => item.status === "pending"
        );

        const hasApprovedBooking = bookingsForDate.some(
            (item) => item.status === "approved"
        );

        if (hasApprovedBooking && hasPendingBooking) {
            return "mixed";
        }

        if (hasApprovedBooking) {
            return "reserved";
        }

        return "pending";
    };



    const previousMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
            )
        );
    };

    const nextMonth = () => {
        setCurrentMonth(
            new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
            )
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4">

            {/* Modal */}
            <div className="w-full max-w-7xl max-h-[96vh] sm:max-h-[95vh] overflow-y-auto bg-white rounded-xl sm:rounded-2xl shadow-2xl">

                {/* =====================================================
                    HEADER
                ===================================================== */}
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-gray-200">

                    <div className="flex items-center gap-3 sm:gap-5 min-w-0">

                        <div className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                            <Printer
                                size={26}
                                className="text-[#4334E8] sm:hidden"
                            />

                            <Printer
                                size={32}
                                className="text-[#4334E8] hidden sm:block lg:hidden"
                            />

                            <Printer
                                size={36}
                                className="text-[#4334E8] hidden lg:block"
                            />
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#0A2D63] leading-tight">
                                Request Scanner
                            </h2>

                            <p className="text-[13px] sm:text-[15px] lg:text-base leading-6 sm:leading-7 text-gray-600">
                                Raise a booking request for the scanner
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#0A2D63] hover:text-[#4334E8] transition shrink-0 ml-2"
                    >
                        <X
                            size={28}
                            strokeWidth={1.5}
                            className="sm:hidden"
                        />

                        <X
                            size={32}
                            strokeWidth={1.5}
                            className="hidden sm:block lg:hidden"
                        />

                        <X
                            size={36}
                            strokeWidth={1.5}
                            className="hidden lg:block"
                        />
                    </button>

                </div>

                {/* =====================================================
                    FORM
                ===================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">

                    {/* =================================================
                        BOOKING DETAILS
                    ================================================= */}
                    <div className="border border-indigo-100 rounded-xl p-4 sm:p-6 lg:p-7">

                        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">

                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                                <CalendarDays
                                    size={23}
                                    className="text-[#4334E8]"
                                />
                            </div>

                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0A2D63]">
                                Booking Details
                            </h3>

                        </div>

                        {/* Scanner Availability */}
                        <div className="mb-6 sm:mb-7">

                            <div className="flex items-center gap-3 mb-4">

                                <div>
                                    <h4 className="text-[15px] sm:text-base font-semibold text-[#0A2D63]">
                                        Scanner Availability
                                    </h4>

                                    <p className="text-[13px] sm:text-[15px] text-gray-600 leading-5 sm:leading-6">
                                        View availability of the scanner and select a date for booking
                                    </p>
                                </div>

                            </div>

                            {/* Legend */}
                            <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg px-3 sm:px-4 py-3 mb-4">

                                <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-[12px] sm:text-sm">

                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" />
                                        <span className="text-[#0A2D63]">
                                            Available
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-pink-400 shrink-0" />
                                        <span className="text-[#0A2D63]">
                                            Reserved
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 shrink-0" />
                                        <span className="text-[#0A2D63]">
                                            Pending Approval
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* Calendar */}
                            <div className="border border-indigo-100 rounded-xl p-2.5 sm:p-4">

                                {/* Month Navigation */}
                                <div className="flex items-center justify-center gap-3 sm:gap-8 mb-4">

                                    <button
                                        type="button"
                                        onClick={previousMonth}
                                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-indigo-50 text-[#4334E8] hover:bg-indigo-100 transition shrink-0"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    <h4 className="text-base sm:text-lg lg:text-xl font-bold text-[#0A2D63] min-w-0 sm:min-w-[170px] text-center">
                                        {currentMonth.toLocaleString(
                                            "default",
                                            {
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}
                                    </h4>

                                    <button
                                        type="button"
                                        onClick={nextMonth}
                                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-indigo-50 text-[#4334E8] hover:bg-indigo-100 transition shrink-0"
                                    >
                                        <ChevronRight size={18} />
                                    </button>

                                </div>

                                {/* Calendar Grid */}
                                <div className="border border-gray-200 rounded-lg overflow-hidden">

                                    {/* Week Days */}
                                    <div className="grid grid-cols-7 bg-indigo-50">

                                        {[
                                            "Sun",
                                            "Mon",
                                            "Tue",
                                            "Wed",
                                            "Thu",
                                            "Fri",
                                            "Sat",
                                        ].map((day) => (
                                            <div
                                                key={day}
                                                className="text-center text-[10px] xs:text-xs sm:text-sm font-semibold text-[#0A2D63] py-2 sm:py-2.5 border-r border-indigo-100 last:border-r-0"
                                            >
                                                {day}
                                            </div>
                                        ))}

                                    </div>

                                    {/* Dates */}
                                    <div className="grid grid-cols-7">

                                        {Array.from({
                                            length: getFirstDayOfMonth(
                                                currentMonth
                                            ),
                                        }).map((_, index) => (
                                            <div
                                                key={`empty-${index}`}
                                                className="h-9 sm:h-11 border-r border-t border-gray-100 bg-gray-50"
                                            />
                                        ))}

                                        {Array.from({
                                            length: getDaysInMonth(currentMonth),
                                        }).map((_, index) => {
                                            const day = index + 1;

                                            const date = formatDate(
                                                currentMonth.getFullYear(),
                                                currentMonth.getMonth(),
                                                day
                                            );

                                            const isSelected = selectedDates.includes(date);


                                            const dateStatus = getDateStatus(date);
                                            const pastDate = isPastDate(date);

                                            const dateStatusClass = pastDate
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : isSelected
                                                    ? "bg-[#4334E8] text-white"
                                                    : dateStatus === "reserved"
                                                        ? "bg-pink-100 text-pink-700 hover:bg-pink-200"
                                                        : dateStatus === "pending"
                                                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                                            : "bg-green-100 text-green-700 hover:bg-green-200";

                                            return (
                                                <button
                                                    key={date}
                                                    type="button"
                                                    onClick={() => !pastDate && handleDateSelect(date)}
                                                    className={`
                h-9 sm:h-11
                border-r border-t border-gray-100
                flex items-center justify-center
                text-[12px] sm:text-[15px]
                font-medium
                transition
                ${dateStatusClass}
                ${pastDate ? "cursor-not-allowed" : "cursor-pointer"}
            `}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        })}

                                    </div>

                                </div>

                            </div>

                            {/* Selected Date */}
                            {selectedDates.length > 0 && (
                                <div className="mt-3 rounded-lg border border-indigo-100 bg-indigo-50 p-3 sm:p-4">

                                    <div className="mb-2 flex items-center justify-between">
                                        <p className="text-sm font-semibold text-[#0A2D63]">
                                            Selected Dates
                                        </p>

                                        <span className="rounded-full bg-[#4334E8] px-2.5 py-1 text-xs font-semibold text-white">
                                            {selectedDates.length}/3
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {selectedDates.map((date) => {
                                            const dateObj = new Date(`${date}T00:00:00`);

                                            return (
                                                <div
                                                    key={date}
                                                    className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-3 py-2"
                                                >
                                                    <span className="text-xs sm:text-sm font-semibold text-[#0A2D63]">
                                                        {dateObj.toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                            weekday: "short",
                                                        })}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDateSelect(date)}
                                                        className="text-gray-400 hover:text-red-500"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            )}

                        </div>

                      

                        {/* =====================================================
    TIME SELECTION FOR EACH SELECTED DATE
===================================================== */}

                        <div className="mb-6 sm:mb-7">

                            <label className="block text-[14px] sm:text-base font-semibold text-[#0A2D63] mb-3">
                                Select Time for Each Date
                            </label>

                            {selectedDates.length === 0 ? (

                                <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 sm:px-4 py-3.5 text-[13px] sm:text-sm text-[#4334E8]">
                                    Please select at least one date first.
                                </div>

                            ) : availabilityLoading ? (

                                <div className="rounded-lg border border-indigo-100 bg-gray-50 px-3 sm:px-4 py-3.5 text-[13px] sm:text-sm text-gray-500">
                                    Checking scanner availability...
                                </div>

                            ) : (

                                <div className="space-y-4">

                                    {selectedDates.map((date, dateIndex) => {

                                        const dateObj = new Date(`${date}T00:00:00`);

                                        const bookingsForDate =
                                            availabilityByDate[date] || [];

                                        const selectedSlot =
                                            selectedSlots[date];

                                        const selectedStartTime =
                                            selectedSlot?.startTime || "";

                                        const selectedEndTime =
                                            selectedSlot?.endTime || "";

                                        /*
                                         * Check if currently selected time overlaps
                                         * with an existing pending/approved booking.
                                         */
                                        const conflictingBooking =
                                            selectedStartTime && selectedEndTime
                                                ? bookingsForDate.find((booking) =>
                                                    isTimeOverlapping(
                                                        selectedStartTime,
                                                        selectedEndTime,
                                                        booking.startTime,
                                                        booking.endTime
                                                    )
                                                )
                                                : null;

                                        const isConflict =
                                            !!conflictingBooking;

                                        return (
                                            <div
                                                key={date}
                                                className="rounded-xl border border-indigo-100 bg-white p-3 sm:p-4"
                                            >

                                                {/* Date Header */}
                                                <div className="mb-4 flex items-center gap-2">

                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4334E8] text-xs font-bold text-white">
                                                        {dateIndex + 1}
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-bold text-[#0A2D63]">
                                                            {dateObj.toLocaleDateString(
                                                                "en-IN",
                                                                {
                                                                    weekday: "short",
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </p>

                                                        <p className="text-[11px] text-gray-500">
                                                            Select start time and end time
                                                        </p>
                                                    </div>

                                                </div>

                                                {/* Time Selection */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                                    {/* Start Time */}
                                                    <div>

                                                        <label className="mb-2 block text-xs sm:text-sm font-semibold text-[#0A2D63]">
                                                            Start Time
                                                        </label>

                                                        <select
                                                            value={selectedStartTime}
                                                            onChange={(e) => {

                                                                const startTime =
                                                                    e.target.value;

                                                                setSlotConflict(null);
                                                                setRequestAnyway(false);

                                                                setSelectedSlots((prev) => ({
                                                                    ...prev,
                                                                    [date]: {
                                                                        startTime,
                                                                        endTime:
                                                                            prev[date]?.endTime ||
                                                                            "",
                                                                    },
                                                                }));

                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    date,
                                                                    startTime,
                                                                    endTime:
                                                                        prev.endTime || "",
                                                                }));
                                                            }}
                                                            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-[#4334E8] focus:ring-1 focus:ring-[#4334E8]"
                                                        >

                                                            <option value="">
                                                                Select start time
                                                            </option>

                                                            {timeOptions.map((time) => (
                                                                <option
                                                                    key={time}
                                                                    value={time}
                                                                >
                                                                    {time}
                                                                </option>
                                                            ))}

                                                        </select>

                                                    </div>

                                                    {/* End Time */}
                                                    <div>

                                                        <label className="mb-2 block text-xs sm:text-sm font-semibold text-[#0A2D63]">
                                                            End Time
                                                        </label>

                                                        <select
                                                            value={selectedEndTime}
                                                            onChange={(e) => {

                                                                const endTime =
                                                                    e.target.value;

                                                                setSlotConflict(null);
                                                                setRequestAnyway(false);

                                                                setSelectedSlots((prev) => ({
                                                                    ...prev,
                                                                    [date]: {
                                                                        startTime:
                                                                            prev[date]?.startTime ||
                                                                            "",
                                                                        endTime,
                                                                    },
                                                                }));

                                                                setFormData((prev) => ({
                                                                    ...prev,
                                                                    date,
                                                                    startTime:
                                                                        prev.startTime || "",
                                                                    endTime,
                                                                }));
                                                            }}
                                                            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-[#4334E8] focus:ring-1 focus:ring-[#4334E8]"
                                                        >

                                                            <option value="">
                                                                Select end time
                                                            </option>

                                                            {timeOptions.map((time) => (
                                                                <option
                                                                    key={time}
                                                                    value={time}
                                                                >
                                                                    {time}
                                                                </option>
                                                            ))}

                                                        </select>

                                                    </div>

                                                </div>

                                                {/* Duration Information */}
                                                {selectedStartTime &&
                                                    selectedEndTime && (
                                                        <div className="mt-3 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2">

                                                            <p className="text-xs text-[#0A2D63]">

                                                                Selected time:

                                                                <span className="ml-1 font-bold text-[#4334E8]">
                                                                    {selectedStartTime}
                                                                    {" - "}
                                                                    {selectedEndTime}
                                                                </span>

                                                            </p>

                                                            {(() => {

                                                                const start =
                                                                    convertTimeToMinutes(
                                                                        selectedStartTime
                                                                    );

                                                                const end =
                                                                    convertTimeToMinutes(
                                                                        selectedEndTime
                                                                    );

                                                                const duration =
                                                                    end - start;

                                                                if (duration > 0) {

                                                                    return (
                                                                        <p className="mt-1 text-[11px] text-gray-600">
                                                                            Duration:{" "}
                                                                            {Math.floor(
                                                                                duration / 60
                                                                            )}
                                                                            hr{" "}
                                                                            {duration % 60 > 0
                                                                                ? `${duration % 60} min`
                                                                                : ""}
                                                                        </p>
                                                                    );

                                                                }

                                                                return null;

                                                            })()}

                                                        </div>
                                                    )}

                                                {/* Conflict Warning */}
                                                {isConflict &&
                                                    selectedStartTime &&
                                                    selectedEndTime && (

                                                        <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-3 sm:p-4">

                                                            <div className="flex items-start gap-3">

                                                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">
                                                                    !
                                                                </div>

                                                                <div className="flex-1">

                                                                    <p className="text-sm font-semibold text-orange-800">

                                                                        This time slot is already{" "}

                                                                        {conflictingBooking?.status ===
                                                                            "approved"
                                                                            ? "reserved"
                                                                            : "pending approval"}.

                                                                    </p>

                                                                    <p className="mt-1 text-xs sm:text-sm leading-5 text-orange-700">

                                                                        Please select another date
                                                                        or time slot, or you can
                                                                        request this slot anyway.

                                                                    </p>

                                                                    <div className="mt-3 flex flex-col sm:flex-row gap-2">

                                                                        {/* Select Another */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {

                                                                                setRequestAnyway(
                                                                                    false
                                                                                );

                                                                                setSlotConflict(
                                                                                    null
                                                                                );

                                                                                setSelectedSlots(
                                                                                    (prev) => ({
                                                                                        ...prev,
                                                                                        [date]: {
                                                                                            startTime:
                                                                                                "",
                                                                                            endTime:
                                                                                                "",
                                                                                        },
                                                                                    })
                                                                                );

                                                                                setFormData(
                                                                                    (prev) => ({
                                                                                        ...prev,
                                                                                        date,
                                                                                        startTime:
                                                                                            "",
                                                                                        endTime:
                                                                                            "",
                                                                                    })
                                                                                );

                                                                            }}
                                                                            className="rounded-lg border border-orange-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-orange-700 hover:bg-orange-100 transition"
                                                                        >
                                                                            Select Another Slot
                                                                        </button>

                                                                        {/* Request Anyway */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setRequestAnyway(
                                                                                    true
                                                                                );

                                                                                setSlotConflict({
                                                                                    date,
                                                                                    startTime:
                                                                                        selectedStartTime,
                                                                                    endTime:
                                                                                        selectedEndTime,
                                                                                    status:
                                                                                        conflictingBooking!
                                                                                            .status,
                                                                                });
                                                                            }}
                                                                            className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition ${requestAnyway
                                                                                    ? "bg-green-600 text-white"
                                                                                    : "bg-orange-500 text-white hover:bg-orange-600"
                                                                                }`}
                                                                        >
                                                                            {requestAnyway
                                                                                ? "Request Anyway Selected"
                                                                                : "Request Anyway"}
                                                                        </button>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>
                                                    )}

                                            </div>
                                        );

                                    })}

                                </div>

                            )}

                        </div>
                        {/* Purpose */}
                        <div className="mb-6 sm:mb-7">

                            <label className="block text-[14px] sm:text-base font-semibold text-[#0A2D63] mb-3">
                                Purpose / Reason
                            </label>

                            <select
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                className="w-full border border-indigo-200 rounded-lg px-3 sm:px-4 py-3.5 bg-white text-[14px] sm:text-base text-gray-900 outline-none focus:border-black"
                            >
                                <option value="" disabled>
                                    Select purpose
                                </option>

                                <option value="Document Scanning">
                                    Document Scanning
                                </option>

                                <option value="Quality Inspection">
                                    Quality Inspection
                                </option>

                                <option value="Project Work">
                                    Project Work
                                </option>

                                <option value="Testing">
                                    Testing
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>

                        </div>

                        {/* Additional Concerns */}
                        <div>

                            <label className="block text-[14px] sm:text-base font-semibold text-[#0A2D63] mb-3">
                                Additional Concerns (Optional)
                            </label>

                            <textarea
                                name="concerns"
                                value={formData.concerns}
                                onChange={handleChange}
                                maxLength={300}
                                rows={5}
                                placeholder="Any specific requirements or concerns..."
                                className="w-full border border-indigo-200 rounded-lg px-3 sm:px-4 py-3.5 text-[14px] sm:text-base text-gray-900 placeholder:text-gray-400 outline-none resize-none focus:border-black"
                            />

                            <div className="text-right text-xs sm:text-sm text-[#0A2D63] mt-1">
                                {formData.concerns.length}/300
                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        YOUR DETAILS
                    ================================================= */}
                    <div className="border border-indigo-100 rounded-xl p-4 sm:p-6 lg:p-7">

                        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">

                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                                <UserRound
                                    size={23}
                                    className="text-[#4334E8]"
                                />
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-[#0A2D63]">
                                Your Details
                            </h3>

                        </div>

                        {/* Full Name */}
                        <div className="mb-6 sm:mb-7">

                            <label className="block text-[14px] sm:text-base font-semibold text-[#0A2D63] mb-3">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full border border-indigo-200 rounded-lg px-3 sm:px-4 py-3.5 bg-white text-[14px] sm:text-base text-gray-900 placeholder:text-gray-400 outline-none focus:border-black"
                            />

                        </div>

                        {/* Email */}
                        <div className="mb-6 sm:mb-7">

                            <label className="block text-[14px] sm:text-base font-semibold text-[#0A2D63] mb-3">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full border border-indigo-200 rounded-lg px-3 sm:px-4 py-3.5 bg-white text-[14px] sm:text-base text-gray-900 placeholder:text-gray-400 outline-none focus:border-black"
                            />

                        </div>

                        {/* Mobile */}
                        <div className="mb-6 sm:mb-7">

                            <label className="block text-[14px] sm:text-base font-semibold text-[#0A2D63] mb-3">
                                Mobile Number
                            </label>

                            <div className="grid grid-cols-[85px_1fr] sm:grid-cols-[110px_1fr] gap-2 sm:gap-3">

                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="w-full border border-indigo-200 rounded-lg px-2 sm:px-4 py-3.5 bg-white text-[14px] sm:text-base text-gray-900 outline-none focus:border-black"
                                >
                                    <option value="+91">
                                        +91
                                    </option>

                                    <option value="+1">
                                        +1
                                    </option>

                                    <option value="+44">
                                        +44
                                    </option>
                                </select>

                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    maxLength={10}
                                    placeholder="Enter mobile number"
                                    className="w-full min-w-0 border border-indigo-200 rounded-lg px-3 sm:px-4 py-3.5 bg-white text-[14px] sm:text-base text-gray-900 placeholder:text-gray-400 outline-none focus:border-black"
                                />

                            </div>

                        </div>

                        {/* Department */}
                        <div className="mb-6 sm:mb-7">

                            <label className="block text-[14px] sm:text-base font-semibold text-[#0A2D63] mb-3">
                                Department / Team (Optional)
                            </label>

                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="Enter department or team"
                                className="w-full border border-indigo-200 rounded-lg px-3 sm:px-4 py-3.5 bg-white text-[14px] sm:text-base text-gray-900 placeholder:text-gray-400 outline-none focus:border-black"
                            />

                        </div>

                        {/* Contact Method */}
                        <div>

                            <label className="block text-[14px] sm:text-base font-semibold text-[#0A2D63] mb-3">
                                Preferred Contact Method
                            </label>

                            <select
                                name="contactMethod"
                                value={formData.contactMethod}
                                onChange={handleChange}
                                className="w-full border border-indigo-200 rounded-lg px-3 sm:px-4 py-3.5 bg-white text-[14px] sm:text-base text-gray-900 outline-none focus:border-black"
                            >
                                <option value="" disabled>
                                    Select contact method
                                </option>

                                <option value="Email">
                                    Email
                                </option>

                                <option value="Phone">
                                    Phone
                                </option>

                                <option value="Both">
                                    Both
                                </option>
                            </select>

                        </div>

                    </div>

                </div>

                {/* =====================================================
                    FOOTER
                ===================================================== */}
                <div className="border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">

                    <button type="button" onClick={handleClose}
                        className="w-full sm:w-52 lg:w-64 border border-[#4334E8] text-[#4334E8] text-[14px] sm:text-base font-semibold rounded-lg px-5 py-3.5 hover:bg-indigo-50 transition order-2 sm:order-1"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full sm:w-64 lg:w-80 bg-[#4334E8] text-white text-[14px] sm:text-base font-semibold rounded-lg px-5 py-3.5 flex items-center justify-center gap-3 hover:bg-[#3025D8] transition disabled:opacity-60 disabled:cursor-not-allowed order-1 sm:order-2"
                    >
                        <span className="text-lg sm:text-xl">
                            ➤
                        </span>

                        {isSubmitting
                            ? "Submitting..."
                            : requestAnyway
                                ? "Submit Request Anyway"
                                : "Submit Request"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ScannerBookingModal;
