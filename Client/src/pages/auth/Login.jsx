import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../logic/apiService";

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    // Authenticate user
    function handleSubmit(e) {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            alert("Fill in all fields.");
            return;
        }

        apiService.post("/auth", credentials).then((res) => {
            if (res.success) {
                navigate("/feed");
            } else {
                alert(
                    "Login failed, Error: " +
                        res.message.toLowerCase().replace(/_/g, " "), // Replaces underscores with spaces and converts to lowercase
                );
            }
        });
    }

    // Update credentials state when input changes
    function onChange(e) {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="bg-dark-bg text-dark-text flex min-h-dvh flex-col items-center justify-center">
            <h1 className="pattaya my-6 text-3xl font-bold">Meer of Minder</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex w-full flex-col items-center justify-center gap-3">
                    <input
                        className="focus:border-dark-secondary bg-dark-bg border-dark-primary h-12 w-72 rounded border p-2 outline-none"
                        name="email"
                        value={credentials.email}
                        onChange={(e) => onChange(e)}
                        placeholder="Email"
                        type="email"
                    />
                    <input
                        className="focus:border-dark-secondary bg-dark-bg border-dark-primary h-12 w-72 rounded border p-2 outline-none"
                        name="password"
                        value={credentials.password}
                        onChange={(e) => onChange(e)}
                        placeholder="Password"
                        type="password"
                    />
                </div>
                <div className="flex h-min w-full items-center justify-end py-5">
                    {/* <Link className="text-dark-accent text-sm hover:underline">
                        Forgot password?
                    </Link> */}
                </div>
                <div className="flex w-72 flex-col items-center justify-center gap-3">
                    <button
                        type="submit"
                        className="bg-dark-secondary text-dark-text h-12 w-full rounded font-bold"
                    >
                        Login
                    </button>
                    <div className="flex w-full items-center justify-center">
                        <span className="bg-dark-primary h-px flex-grow" />
                        <span className="mx-4 -translate-y-px">or</span>
                        <span className="bg-dark-primary h-px flex-grow" />
                    </div>
                    <Link
                        to={"/auth/signup"}
                        className="border-dark-secondary text-dark-secondary flex h-12 w-full items-center justify-center rounded border font-bold"
                    >
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
}
