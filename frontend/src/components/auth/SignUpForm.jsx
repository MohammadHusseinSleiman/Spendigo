import { useState } from "react";

import Button from "../common/Button";
import Input from "../common/Input";

export default function SignUpForm() {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    function handleChange(event) {
        setForm((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log(form);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
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

            <Button type="submit">
                Create Account
            </Button>
        </form>
    );
}