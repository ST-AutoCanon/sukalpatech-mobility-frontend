import React, { useEffect, useMemo, useState } from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Eye,
    LogOut,
    Menu,
    Search,
    X,
    XCircle,
} from "lucide-react";

type BookingStatus = "pending" | "approved" | "rejected";

interface Booking {
    _id: string;
    bookingId: string;
    fullName: string;
    email: string;
    mobile: string;
    department: string;
    contactMethod: string;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
    concerns: string;
    status: BookingStatus;
    adminComment: string;
    reviewedBy: string;
    reviewedAt: string | null;
}

const ScannerAdminDashboard = () => {
    const [activeFilter, setActiveFilter] = useState<
        "all" | BookingStatus
    >("all");

    const [searchTerm, setSearchTerm] = useState("");

    const [bookings, setBookings] = useState<Booking[]>([]);

    const [selectedBooking, setSelectedBooking] =
        useState<Booking | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const [adminComment, setAdminComment] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // --------------------------------------------------
    // Fetch bookings
    // --------------------------------------------------

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("scannerAdminToken");

            if (!token) {
                window.location.href = "/scanner-admin/login";
                return;
            }

            const response = await fetch(
                "http://localhost:3000/api/scanner-admin/bookings",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("scannerAdminToken");
                localStorage.removeItem("scannerAdmin");

                window.location.href = "/scanner-admin/login";
                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch bookings."
                );
            }

            setBookings(result.data || []);
        } catch (error) {
            console.error("Fetch bookings error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to load bookings."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // --------------------------------------------------
    // Counts
    // --------------------------------------------------

    const counts = useMemo(() => {
        return {
            total: bookings.length,
            pending: bookings.filter(
                (booking) => booking.status === "pending"
            ).length,
            approved: bookings.filter(
                (booking) => booking.status === "approved"
            ).length,
            rejected: bookings.filter(
                (booking) => booking.status === "rejected"
            ).length,
        };
    }, [bookings]);

    // --------------------------------------------------
    // Search + Filter
    // --------------------------------------------------

    const filteredBookings = useMemo(() => {
        return bookings.filter((booking) => {
            const matchesFilter =
                activeFilter === "all" ||
                booking.status === activeFilter;

            const search = searchTerm.toLowerCase().trim();

            const matchesSearch =
                booking.bookingId
                    .toLowerCase()
                    .includes(search) ||
                booking.fullName
                    .toLowerCase()
                    .includes(search) ||
                booking.email
                    .toLowerCase()
                    .includes(search);

            return matchesFilter && matchesSearch;
        });
    }, [bookings, activeFilter, searchTerm]);

    // --------------------------------------------------
    // Status
    // --------------------------------------------------

    const getStatusStyle = (status: BookingStatus) => {
        if (status === "approved") {
            return "bg-green-50 text-green-700 border-green-200";
        }

        if (status === "rejected") {
            return "bg-red-50 text-red-700 border-red-200";
        }

        return "bg-amber-50 text-amber-700 border-amber-200";
    };

    const getStatusLabel = (status: BookingStatus) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    // --------------------------------------------------
    // Date
    // --------------------------------------------------

    const formatDate = (date: string) => {
        return new Date(`${date}T00:00:00`).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // --------------------------------------------------
    // Logout
    // --------------------------------------------------

    const handleLogout = () => {
        localStorage.removeItem("scannerAdminToken");
        localStorage.removeItem("scannerAdmin");

        window.location.href = "/scanner-admin/login";
    };

    // --------------------------------------------------
    // Booking action
    // --------------------------------------------------

    const handleBookingAction = async (
        action: "approve" | "reject"
    ) => {
        if (!selectedBooking) return;

        try {
            setActionLoading(true);
            setActionError("");

            const token = localStorage.getItem("scannerAdminToken");

            if (!token) {
                window.location.href = "/scanner-admin/login";
                return;
            }

            const response = await fetch(
                `http://localhost:3000/api/scanner-admin/bookings/${selectedBooking._id}/${action}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        adminComment: adminComment.trim(),
                    }),
                }
            );

            const result = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("scannerAdminToken");
                localStorage.removeItem("scannerAdmin");

                window.location.href = "/scanner-admin/login";
                return;
            }

            if (!response.ok) {
                throw new Error(
                    result.message || `Failed to ${action} booking.`
                );
            }

            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === selectedBooking._id
                        ? result.data
                        : booking
                )
            );

            setSelectedBooking(result.data);
            setAdminComment("");
        } catch (error) {
            console.error(`${action} booking error:`, error);

            setActionError(
                error instanceof Error
                    ? error.message
                    : `Failed to ${action} booking.`
            );
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* --------------------------------------------------
                Desktop Sidebar
            -------------------------------------------------- */}

            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white xl:block">

                <div className="flex h-20 items-center border-b border-gray-100 px-6">
                    <div>
                        <h1 className="text-lg font-bold text-[#0A2D63]">
                            STS Mobility
                        </h1>

                        <p className="text-xs text-gray-500">
                            Scanner Administration
                        </p>
                    </div>
                </div>

                <div className="p-4">
                    <div className="rounded-xl bg-[#0A2D63] px-4 py-3 text-white">

                        <div className="flex items-center gap-3">
                            <CalendarDays size={19} />

                            <div>
                                <p className="text-sm font-semibold">
                                    Scanner Bookings
                                </p>

                                <p className="text-xs text-blue-100">
                                    Management
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 p-4">

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-medium text-gray-900 transition hover:bg-red-60 hover:text-red-600"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>
            </aside>

            {/* --------------------------------------------------
                Mobile Header
            -------------------------------------------------- */}

            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 xl:hidden">

                <div>
                    <h1 className="text-base font-bold text-[#0A2D63]">
                        STS Mobility
                    </h1>

                    <p className="text-[10px] text-gray-500">
                        Scanner Administration
                    </p>
                </div>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                >
                    {mobileMenuOpen ? (
                        <X size={21} />
                    ) : (
                        <Menu size={21} />
                    )}
                </button>

            </header>

            {/* --------------------------------------------------
                Mobile Menu
            -------------------------------------------------- */}

            {mobileMenuOpen && (
                <div className="fixed left-0 right-0 top-16 z-40 border-b border-gray-200 bg-white p-4 shadow-md xl:hidden">

                    <div className="rounded-xl bg-[#0A2D63] px-4 py-3 text-white">

                        <div className="flex items-center gap-3">
                            <CalendarDays size={19} />

                            <div>
                                <p className="text-sm font-semibold">
                                    Scanner Bookings
                                </p>

                                <p className="text-xs text-blue-100">
                                    Management
                                </p>
                            </div>
                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>
            )}

            {/* --------------------------------------------------
                Main
            -------------------------------------------------- */}

            <main className="w-full lg:ml-64 xl:w-[calc(100%-16rem)]">

                <div className="p-4 sm:p-8 lg:p-10">

                    {/* Welcome */}

                    <div className="mb-6 sm:mb-7">

                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                            Welcome back, Scanner Admin
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                            Here's an overview of your scanner booking requests.
                        </p>

                    </div>

                    {/* --------------------------------------------------
                        Stats
                    -------------------------------------------------- */}

                    <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">

                        {/* Total */}

                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

                            <div className="flex items-center justify-between gap-3">

                                <div>
                                    <p className="text-xs text-gray-500 sm:text-sm">
                                        Total Bookings
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-gray-800 sm:mt-2 sm:text-3xl">
                                        {counts.total}
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0A2D63] sm:h-11 sm:w-11">
                                    <CalendarDays size={20} />
                                </div>

                            </div>

                        </div>

                        {/* Pending */}

                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

                            <div className="flex items-center justify-between gap-3">

                                <div>
                                    <p className="text-xs text-gray-500 sm:text-sm">
                                        Pending
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-gray-800 sm:mt-2 sm:text-3xl">
                                        {counts.pending}
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 sm:h-11 sm:w-11">
                                    <Clock3 size={20} />
                                </div>

                            </div>

                        </div>

                        {/* Approved */}

                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

                            <div className="flex items-center justify-between gap-3">

                                <div>
                                    <p className="text-xs text-gray-500 sm:text-sm">
                                        Approved
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-gray-800 sm:mt-2 sm:text-3xl">
                                        {counts.approved}
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 sm:h-11 sm:w-11">
                                    <CheckCircle2 size={20} />
                                </div>

                            </div>

                        </div>

                        {/* Rejected */}

                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

                            <div className="flex items-center justify-between gap-3">

                                <div>
                                    <p className="text-xs text-gray-500 sm:text-sm">
                                        Rejected
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-gray-800 sm:mt-2 sm:text-3xl">
                                        {counts.rejected}
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 sm:h-11 sm:w-11">
                                    <XCircle size={20} />
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* --------------------------------------------------
                        Bookings
                    -------------------------------------------------- */}

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                        {/* Table Header */}

                        <div className="border-b border-gray-200 p-4 sm:p-5">

                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                                <div className="min-w-0">

                                    <h3 className="text-base font-bold text-gray-800 sm:text-lg">
                                        Booking Requests
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Review and manage scanner reservations
                                    </p>

                                </div>

                                {/* Search */}

                                <div className="relative w-full xl:w-64">

                                    <Search
                                        size={17}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search Booking/Applicant name"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#0A2D63] focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Filters */}

                            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:mt-5 sm:flex-wrap sm:overflow-visible sm:pb-0">

                                {[
                                    {
                                        value: "all",
                                        label: "All",
                                    },
                                    {
                                        value: "pending",
                                        label: "Pending",
                                    },
                                    {
                                        value: "approved",
                                        label: "Approved",
                                    },
                                    {
                                        value: "rejected",
                                        label: "Rejected",
                                    },
                                ].map((filter) => (

                                    <button
                                        key={filter.value}
                                        onClick={() =>
                                            setActiveFilter(
                                                filter.value as
                                                | "all"
                                                | BookingStatus
                                            )
                                        }
                                        className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${activeFilter === filter.value
                                                ? "bg-[#0A2D63] text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {filter.label}
                                    </button>

                                ))}

                            </div>

                        </div>

                        {/* Error */}

                        {error && (
                            <div className="m-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:m-5">
                                {error}
                            </div>
                        )}

                        {/* Table */}

                        <div className="w-full overflow-x-auto">

                            <table className="w-full min-w-[900px]">

                                <thead>

                                    <tr className="border-b border-gray-200 bg-gray-50 text-left">

                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">
                                            Booking
                                        </th>

                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">
                                            Applicant
                                        </th>

                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">
                                            Date
                                        </th>

                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">
                                            Time
                                        </th>

                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">
                                            Purpose
                                        </th>

                                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">
                                            Status
                                        </th>

                                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {loading ? (

                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-5 py-12 text-center text-sm text-gray-500"
                                            >
                                                Loading bookings...
                                            </td>
                                        </tr>

                                    ) : filteredBookings.length === 0 ? (

                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-5 py-12 text-center text-sm text-gray-500"
                                            >
                                                No bookings found.
                                            </td>
                                        </tr>

                                    ) : (

                                        filteredBookings.map((booking) => (

                                            <tr
                                                key={booking._id}
                                                className="border-b border-gray-100 transition hover:bg-gray-50"
                                            >

                                                <td className="px-4 py-4 sm:px-5">

                                                    <p className="text-sm font-semibold text-[#0A2D63]">
                                                        {booking.bookingId}
                                                    </p>

                                                </td>

                                                <td className="px-4 py-4 sm:px-5">

                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {booking.fullName}
                                                    </p>

                                                    <p className="mt-0.5 max-w-[220px] truncate text-xs text-gray-500">
                                                        {booking.email}
                                                    </p>

                                                </td>

                                                <td className="px-4 py-4 text-sm text-gray-600 sm:px-5">
                                                    {formatDate(booking.date)}
                                                </td>

                                                <td className="px-4 py-4 text-sm text-gray-600 sm:px-5">
                                                    {booking.startTime} - {booking.endTime}
                                                </td>

                                                <td className="max-w-[220px] px-4 py-4 text-sm text-gray-600 sm:px-5">
                                                    <p className="truncate">
                                                        {booking.purpose}
                                                    </p>
                                                </td>

                                                <td className="px-4 py-4 sm:px-5">

                                                    <span
                                                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                                            booking.status
                                                        )}`}
                                                    >
                                                        {getStatusLabel(
                                                            booking.status
                                                        )}
                                                    </span>

                                                </td>

                                                <td className="px-4 py-4 text-right sm:px-5">

                                                    <button
                                                        onClick={() => {
                                                            setSelectedBooking(
                                                                booking
                                                            );
                                                            setAdminComment(
                                                                booking.adminComment ||
                                                                ""
                                                            );
                                                            setActionError("");
                                                        }}
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-[#0A2D63] hover:bg-blue-50 hover:text-[#0A2D63]"
                                                    >
                                                        <Eye size={15} />
                                                        View
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </main>

            {/* --------------------------------------------------
                Details Modal
            -------------------------------------------------- */}

            {selectedBooking && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">

                    <div className="flex max-h-[96vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl">

                        {/* Modal Header */}

                        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5">

                            <div className="min-w-0">

                                <h3 className="text-base font-bold text-gray-800 sm:text-lg">
                                    Booking Details
                                </h3>

                                <p className="mt-1 truncate text-xs text-gray-500">
                                    {selectedBooking.bookingId}
                                </p>

                            </div>

                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="ml-3 shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                                <XCircle size={21} />
                            </button>

                        </div>

                        {/* Modal Content */}

                        <div className="overflow-y-auto">

                            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-6">

                                {/* Full Name */}

                                <div className="min-w-0">

                                    <p className="text-xs font-medium text-gray-500">
                                        Full Name
                                    </p>

                                    <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {selectedBooking.fullName}
                                    </p>

                                </div>

                                {/* Email */}

                                <div className="min-w-0">

                                    <p className="text-xs font-medium text-gray-500">
                                        Email
                                    </p>

                                    <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                                        {selectedBooking.email}
                                    </p>

                                </div>

                                {/* Mobile */}

                                <div className="min-w-0">

                                    <p className="text-xs font-medium text-gray-500">
                                        Mobile
                                    </p>

                                    <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {selectedBooking.mobile}
                                    </p>

                                </div>

                                {/* Department */}

                                <div className="min-w-0">

                                    <p className="text-xs font-medium text-gray-500">
                                        Department
                                    </p>

                                    <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {selectedBooking.department}
                                    </p>

                                </div>

                                {/* Date */}

                                <div className="min-w-0">

                                    <p className="text-xs font-medium text-gray-500">
                                        Date
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {formatDate(selectedBooking.date)}
                                    </p>

                                </div>

                                {/* Time Slot */}

                                <div className="min-w-0">

                                    <p className="text-xs font-medium text-gray-500">
                                        Time Slot
                                    </p>

                                    <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {selectedBooking.startTime} - {selectedBooking.endTime}
                                    </p>

                                </div>

                                {/* Contact Method */}

                                <div className="min-w-0">

                                    <p className="text-xs font-medium text-gray-500">
                                        Contact Method
                                    </p>

                                    <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {selectedBooking.contactMethod}
                                    </p>

                                </div>

                                {/* Purpose */}

                                <div className="min-w-0">

                                    <p className="text-xs font-medium text-gray-500">
                                        Purpose
                                    </p>

                                    <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {selectedBooking.purpose}
                                    </p>

                                </div>

                                {/* Concerns */}

                                <div className="sm:col-span-2">

                                    <p className="text-xs font-medium text-gray-800">
                                        Concerns / Requirements
                                    </p>

                                    <div className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {selectedBooking.concerns || "—"}
                                    </div>

                                </div>

                                {/* Admin Comment */}

                                <div className="sm:col-span-2">

                                    <p className="text-xs font-medium text-gray-800">
                                        Admin Comment
                                    </p>

                                    {selectedBooking.status === "pending" ? (

                                        <textarea
                                            value={adminComment}
                                            onChange={(e) =>
                                                setAdminComment(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter a comment for the applicant..."
                                            rows={4}
                                            className="mt-2 w-full resize-y rounded-lg border border-gray-300 px-3 py-3 text-sm text-gray-700 outline-none transition focus:border-[#0A2D63] focus:ring-2 focus:ring-blue-100 sm:px-4"
                                        />

                                    ) : (

                                        <div className="mt-1 break-words text-sm font-semibold text-gray-800">
                                            {selectedBooking.adminComment ||
                                                "—"}
                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Modal Footer */}

                        <div className="shrink-0 border-t border-gray-200 px-4 py-4 sm:px-6">

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                {/* Action Error */}

                                <div className="min-w-0 text-xs text-red-600 sm:text-sm">
                                    {actionError}
                                </div>

                                {/* Buttons */}

                                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end sm:gap-3">

                                    {selectedBooking.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleBookingAction(
                                                        "reject"
                                                    )
                                                }
                                                disabled={actionLoading}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                            >
                                                <XCircle size={17} />

                                                {actionLoading
                                                    ? "Processing..."
                                                    : "Reject"}
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleBookingAction(
                                                        "approve"
                                                    )
                                                }
                                                disabled={actionLoading}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                            >
                                                <CheckCircle2 size={17} />

                                                {actionLoading
                                                    ? "Processing..."
                                                    : "Approve"}
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => {
                                            setSelectedBooking(null);
                                            setAdminComment("");
                                            setActionError("");
                                        }}
                                        disabled={actionLoading}
                                        className="w-full rounded-lg bg-[#0A2D63] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#08234e] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                    >
                                        Close
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default ScannerAdminDashboard;
