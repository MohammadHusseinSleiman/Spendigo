import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import Input from "../common/Input";
import { useAuth } from "../../context/AuthContext";

export default function SignInForm({ email = "" }) {

    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: email,
        password: "",
    });
    const [error, setError] = useState("");

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
            await login(form);
            navigate("/dashboard");
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

            {error && (

                <p className="
                    rounded-xl
                    bg-red-50
                    p-3
                    text-sm
                    text-red-600
                ">
                    {error}
                </p>

            )}

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
                placeholder="Enter your password"
            />

            <Button type="submit">
                Sign In
            </Button>

        </form>

    );
}