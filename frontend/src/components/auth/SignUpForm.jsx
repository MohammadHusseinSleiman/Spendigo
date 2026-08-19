import { toast } from "sonner";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import Input from "../common/Input";
import { useAuth } from "../../context/AuthContext";

export default function SignUpForm({ onSuccess }) {

    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(event) {

        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });

    }

    async function handleSubmit(event) {

        event.preventDefault();
        setError("");

        try {
            await register(form);
            onSuccess(form.email);
            toast.success("Account created successfully.");
        } catch (error) {
            setError(
                error.response?.data?.message ??
                "Something went wrong."
            );
        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            {success && (
                <p
                    className="
                        rounded-xl
                        bg-emerald-50
                        p-3
                        text-sm
                        text-emerald-600

                        dark:bg-emerald-950/40
                        dark:text-emerald-400
                    "
                >
                    {success}
                </p>
            )}

            {error && (
                <p
                    className="
                        rounded-xl
                        bg-red-50
                        p-3
                        text-sm
                        text-red-600

                        dark:bg-red-950/40
                        dark:text-red-400
                    "
                >
                    {error}
                </p>
            )}

            <Input
                label="Full Name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter your full name"
            />

            <Input
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
            />

            <Input
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
            />

            <Input
                label="Confirm Password"
                name="confirm_password"
                type="password"
                value={form.confirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
            />

            <Button
                type="submit"
                className="
                    h-12
                    w-full
                    bg-emerald-600
                    text-sm
                    text-white
                    hover:bg-emerald-700
                "
            >
                Create Account
            </Button>

        </form>

    );
}