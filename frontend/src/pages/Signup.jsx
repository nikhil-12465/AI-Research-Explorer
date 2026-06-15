import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Signup() {

    const [username,
        setUsername] =
        useState("");

    const [email,
        setEmail] =
        useState("");

    const [password,
        setPassword] =
        useState("");

    const signup = async () => {

        try {

            if (
                !username ||
                !email ||
                !password
            ) {

                alert(
                    "Please fill all fields"
                );

                return;
            }

            const response =
            await api.post(
                "/signup",
                {
                    username,
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

            alert(
                "Signup Successful"
            );

            window.location.href =
                "/login";

        }

        catch (error) {

            console.log(error);

            alert(
                "Signup Failed"
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
                    Create Account
                </h1>

                <p>
                    Join AI Research Explorer
                </p>

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        boxSizing: "border-box"
                    }}
                />

                <br />
                <br />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
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
                    onClick={signup}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px"
                    }}
                >
                    Sign Up
                </button>

                <p
                    style={{
                        marginTop: "15px"
                    }}
                >
                    Already have an account?

                    <Link to="/login">
                        {" "}Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Signup;