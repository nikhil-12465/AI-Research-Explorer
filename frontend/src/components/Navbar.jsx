import React from "react";

function Navbar() {

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "username"
        );

        localStorage.removeItem(
            "email"
        );

        window.location.href =
            "/";
    };

    return (

        <div
            style={{
                height: "70px",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 25px",
                borderBottom:
                "1px solid #e2e8f0",
                boxShadow:
                "0 2px 4px rgba(0,0,0,0.05)"
            }}
        >

            <h2
                style={{
                    color: "#0f172a",
                    margin: 0
                }}
            >
                Dashboard
            </h2>

            <div
                onClick={logout}
                style={{
                    padding: "10px 18px",
                    background: "#fef2f2",
                    color: "#dc2626",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                    border:
                    "1px solid #fecaca"
                }}
            >
                🚪 Logout
            </div>

        </div>
    );
}

export default Navbar;