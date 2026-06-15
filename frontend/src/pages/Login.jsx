import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const login = async () => {

        try {

            if (!email || !password) {

                alert(
                    "Please fill all fields"
                );

                return;
            }

            const response =
                await api.post(
                    "/login",
                    {
                        email,
                        password
                    }
                );

            if (!response.data.success) {

                alert(
                    response.data.message
                );

                return;
            }

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            window.location.href =
                "/dashboard";

        }

        catch (error) {

            console.log(error);

            alert(
                "Login Failed"
            );
        }
    };

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#271b3e"
            }}
        >

            <div
                style={{
                    background: "#8e72b7",
                    padding: "40px",
                    borderRadius: "15px",
                    width: "400px",
                    boxShadow:
                    "0 4px 15px rgba(0,0,0,0.1)"
                }}
            >

                <h1>
                    Welcome Back
                </h1>

                <p>
                    Login to AI Research Explorer
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "10px"
                    }}
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "12px"
                    }}
                />

                <br />
                <br />

                <button
                    onClick={login}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px"
                    }}
                >
                    Login
                </button>

                <p
                    style={{
                        marginTop: "15px"
                    }}
                >
                    Don't have an account?

                    <Link to="/signup">
                        {" "}Sign Up
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;