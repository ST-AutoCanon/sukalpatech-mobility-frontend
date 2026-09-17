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


    const [selectedDate, setSelectedDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [requestAnyway, setRequestAnyway] = useState(false);

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

        setSelectedDate("");
        setAvailability([]);
        setRequestAnyway(false);
        setIsSubmitting(false);
        setAvailabilityLoading(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };


    const availableTimes = [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
    ];
    interface BookingAvailability {
        date: string;
        startTime: string;
        endTime: string;
        status: "pending" | "approved";
    }

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
                `http://localhost:3000/api/scanner/availability?startDate=${date}&endDate=${date}`
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch availability."
                );
            }

            setAvailability(result.data || []);
        } catch (error) {
            console.error("Availability error:", error);
            setAvailability([]);
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
                `http://localhost:3000/api/scanner/availability?startDate=${startDate}&endDate=${endDate}`
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch monthly availability."
                );
            }

            setAvailability(result.data || []);
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

            if (!formData.date) {
                alert("Please select a date.");
                return;
            }

            if (!formData.startTime) {
                alert("Please select a start time.");
                return;
            }

            if (!formData.endTime) {
                alert("Please select an end time.");
                return;
            }

            const startMinutes = convertTimeToMinutes(
                formData.startTime
            );

            const endMinutes = convertTimeToMinutes(
                formData.endTime
            );

            if (endMinutes <= startMinutes) {
                alert("End time must be later than start time.");
                return;
            }


            setIsSubmitting(true);
            console.log("Booking payload:", formData);

            const response = await fetch(
                "http://localhost:3000/api/scanner/bookings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        requestAnyway,
                    }),
                }
            );

            const result = await response.json();

            console.log("Booking API status:", response.status);
            console.log("Booking API response:", result);

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

            setSelectedDate("");
            setAvailability([]);

            onClose();
        } catch (error) {
            console.error("Scanner booking error:", error);

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
        // Do not allow selecting past dates
        if (isPastDate(date)) {
            return;
        }

        setSelectedDate(date);

        setRequestAnyway(false);

        setFormData((prev) => ({
            ...prev,
            date,
            startTime: "",
            endTime: "",
        }));

        await fetchAvailability(date);
    };


    const getDateStatus = (date: string) => {
        const bookingsForDate = availability.filter(
            (item) => item.date === date
        );

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

    const getSelectedTimeStatus = () => {
        if (
            !selectedDate ||
            !formData.startTime ||
            !formData.endTime
        ) {
            return null;
        }

        const startMinutes = convertTimeToMinutes(formData.startTime);
        const endMinutes = convertTimeToMinutes(formData.endTime);

        if (endMinutes <= startMinutes) {
            return "invalid";
        }

        const bookingsForDate = availability.filter(
            (item) => item.date === selectedDate
        );

        const overlappingBooking = bookingsForDate.find((booking) =>
            isTimeOverlapping(
                formData.startTime,
                formData.endTime,
                booking.startTime,
                booking.endTime
            )
        );

        if (!overlappingBooking) {
            return "available";
        }

        if (overlappingBooking.status === "approved") {
            return "reserved";
        }

        return "pending";
    };

    const selectedTimeStatus = getSelectedTimeStatus();

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

                                            const isSelected = selectedDate === date;


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
                            {selectedDate && (
                                <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-lg px-3 sm:px-4 py-3">

                                    <p className="text-[13px] sm:text-base font-medium text-[#4334E8]">
                                        Selected Date:{" "}
                                        <span className="font-bold">
                                            {new Date(
                                                `${selectedDate}T00:00:00`
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>
                                    </p>

                                </div>
                            )}

                        </div>

                        {/* Time */}
                        {/* Time Selection */}
                        <div className="mb-6 sm:mb-7">

                            <label className="block text-[14px] sm:text-base font-semibold text-[#0A2D63] mb-3">
                                Select Time
                            </label>

                            {!selectedDate ? (
                                <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 sm:px-4 py-3.5 text-[13px] sm:text-sm text-[#4334E8]">
                                    Please select a date first.
                                </div>
                            ) : availabilityLoading ? (
                                <div className="rounded-lg border border-indigo-100 bg-gray-50 px-3 sm:px-4 py-3.5 text-[13px] sm:text-sm text-gray-500">
                                    Checking scanner availability...
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                        {/* Start Time */}
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1.5">
                                                Start Time
                                            </label>

                                            <select
                                                name="startTime"
                                                value={formData.startTime}
                                                onChange={(e) => {
                                                    setRequestAnyway(false);

                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        startTime: e.target.value,
                                                        endTime: "",
                                                    }));
                                                }}
                                                className="w-full border border-indigo-200 rounded-lg px-3 sm:px-4 py-3 bg-white text-sm sm:text-base text-gray-900 outline-none focus:border-[#4334E8]"
                                            >
                                                <option value="">
                                                    Select start time
                                                </option>

                                                {availableTimes.map((time) => (
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
                                            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1.5">
                                                End Time
                                            </label>

                                            <select
                                                name="endTime"
                                                value={formData.endTime}
                                                disabled={!formData.startTime}
                                                onChange={(e) => {
                                                    setRequestAnyway(false);
                                                    handleChange(e);
                                                }}
                                                className="w-full border border-indigo-200 rounded-lg px-3 sm:px-4 py-3 bg-white text-sm sm:text-base text-gray-900 outline-none focus:border-[#4334E8] disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            >
                                                <option value="">
                                                    {formData.startTime
                                                        ? "Select end time"
                                                        : "Select start time first"}
                                                </option>

                                                {availableTimes
                                                    .filter(
                                                        (time) =>
                                                            convertTimeToMinutes(time) >
                                                            convertTimeToMinutes(
                                                                formData.startTime
                                                            )
                                                    )
                                                    .map((time) => (
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
                                    {selectedTimeStatus === "reserved" && (
                                        <div className="mt-3 rounded-lg border border-pink-200 bg-pink-50 p-3">
                                            <p className="text-sm font-semibold text-pink-700">
                                                ✕ This time slot is already reserved
                                            </p>

                                            <p className="mt-1 text-xs text-pink-600">
                                                This time overlaps with an existing booking.
                                                Please select another time.
                                            </p>

                                            {!requestAnyway ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setRequestAnyway(true)}
                                                    className="mt-3 rounded-lg bg-pink-600 px-4 py-2 text-xs font-semibold text-white hover:bg-pink-700 transition"
                                                >
                                                    Request Anyway
                                                </button>
                                            ) : (
                                                <p className="mt-2 text-xs font-semibold text-pink-700">
                                                    ✓ You can submit a request for this time slot.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {selectedTimeStatus === "pending" && (
                                        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                                            <p className="text-sm font-semibold text-yellow-700">
                                                ⚠ This time slot has a pending request
                                            </p>

                                            <p className="mt-1 text-xs text-yellow-600">
                                                Someone has already requested this time slot.
                                                You can still submit your request if needed.
                                            </p>

                                            {!requestAnyway ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setRequestAnyway(true)}
                                                    className="mt-3 rounded-lg bg-yellow-600 px-4 py-2 text-xs font-semibold text-white hover:bg-yellow-700 transition"
                                                >
                                                    Request Anyway
                                                </button>
                                            ) : (
                                                <p className="mt-2 text-xs font-semibold text-yellow-700">
                                                    ✓ You can submit a request for this time slot.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Selected interval */}
                                    {formData.startTime &&
                                        formData.endTime && (
                                            <div className="mt-3 rounded-lg bg-indigo-50 border border-indigo-100 px-3 sm:px-4 py-3">
                                                <p className="text-xs sm:text-sm text-[#0A2D63]">
                                                    Selected time:
                                                    <span className="font-bold ml-1">
                                                        {formData.startTime}
                                                        {" - "}
                                                        {formData.endTime}
                                                    </span>
                                                </p>
                                            </div>
                                        )}



                                    {/* Existing bookings */}
                                    {availability.length > 0 && (
                                        <div className="mt-4">

                                            <p className="text-xs sm:text-sm font-semibold text-[#0A2D63] mb-2">
                                                Existing bookings for this date
                                            </p>

                                            <div className="space-y-2">

                                                {availability.map(
                                                    (booking, index) => (
                                                        <div
                                                            key={`${booking.date}-${booking.startTime}-${booking.endTime}-${index}`}
                                                            className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
                                                        >

                                                            <span className="text-xs sm:text-sm font-medium text-gray-700">
                                                                {booking.startTime}
                                                                {" - "}
                                                                {booking.endTime}
                                                            </span>

                                                            <span
                                                                className={`shrink-0 rounded-full px-2 py-1 text-[10px] sm:text-xs font-semibold ${booking.status ===
                                                                    "approved"
                                                                    ? "bg-pink-100 text-pink-700"
                                                                    : "bg-yellow-100 text-yellow-700"
                                                                    }`}
                                                            >
                                                                {booking.status ===
                                                                    "approved"
                                                                    ? "Reserved"
                                                                    : "Pending"}
                                                            </span>

                                                        </div>
                                                    )
                                                )}

                                            </div>
                                        </div>
                                    )}
                                </>
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
