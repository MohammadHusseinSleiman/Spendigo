import { useState } from "react";

import Button from "../common/Button";
import Input from "../common/Input";

export default function SignInForm() {
    const [form, setForm] = useState({
        email: "",
        password: "",
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