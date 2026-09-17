import React, { useState } from "react";
import { LockKeyhole, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScannerAdminLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        try {
            setIsLoading(true);

            const response = await fetch(
                "http://localhost:3000/api/scanner-admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || "Invalid email or password."
                );
            }

            // Save JWT token
            localStorage.setItem(
                "scannerAdminToken",
                result.token
            );

            // Save admin information
            localStorage.setItem(
                "scannerAdmin",
                JSON.stringify(result.data)
            );

            // Redirect to dashboard
            navigate("/scanner-admin/dashboard");
        } catch (error: any) {
            setError(
                error.message ||
                    "Unable to login. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-md">

                {/* Logo / Heading */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A2D63] text-white shadow-lg">
                        <LockKeyhole size={28} />
                    </div>

                    <h1 className="text-2xl font-bold text-[#0A2D63]">
                        STS Mobility
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Scanner Administration
                    </p>

                </div>

                {/* Login Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">

                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Admin Login
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Sign in to manage scanner bookings.
                        </p>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter admin email"
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#0A2D63] focus:ring-2 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <div className="relative">

                                <LockKeyhole
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter password"
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-[#0A2D63] focus:ring-2 focus:ring-blue-100"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A2D63] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#08234e] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? (
                                "Signing in..."
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    Login
                                </>
                            )}
                        </button>

                    </form>

                </div>

                <p className="mt-6 text-center text-xs text-gray-400">
                    STS Mobility Scanner Management System
                </p>

            </div>

        </div>
    );
};

export default ScannerAdminLogin;