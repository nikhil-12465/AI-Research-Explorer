import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#231a2e",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "'Inter', system-ui, sans-serif"
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    maxWidth: "860px",
                    padding: "40px"
                }}
            >

                <h1
                    style={{
                        fontSize: "46px",
                        fontWeight: "800",
                        color: "white",
                        letterSpacing: "-1px",
                        margin: "0 0 16px"
                    }}
                >
                    AI Research Explorer
                </h1>

                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                        marginBottom: "20px"
                    }}
                >
                    8+ AI-powered research tools in one platform
                </p>

                <p
                    style={{
                        fontSize: "18px",
                        color: "#cbd5e1",
                        marginTop: "12px",
                        marginBottom: "8px"
                    }}
                >
                    Explore research papers using Artificial Intelligence.
                </p>

                <p
                    style={{
                        fontSize: "14px",
                        color: "#94a3b8",
                        maxWidth: "520px",
                        margin: "0 auto 36px",
                        lineHeight: "1.7"
                    }}
                >
                    Upload PDFs, ask questions, generate summaries,
                    discover research gaps, compare papers,
                    create literature reviews and manage your
                    complete research workflow.
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "14px",
                        marginBottom: "64px"
                    }}
                >

                    <Link to="/login">

                        <button
                            style={{
                                padding: "12px 32px",
                                background: "#a2a48b",
                                color: "black",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "15px",
                                fontWeight: "600"
                            }}
                        >
                            Login
                        </button>

                    </Link>

                    <Link to="/signup">

                        <button
                            style={{
                                padding: "12px 32px",
                                background: "transparent",
                                color: "#cbd5e1",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "15px",
                                fontWeight: "600"
                            }}
                        >
                            Sign Up
                        </button>

                    </Link>

                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "12px"
                    }}
                >

                    {[
                        {
                            icon: "📄",
                            label: "Upload Papers"
                        },
                        {
                            icon: "❓",
                            label: "Ask Questions"
                        },
                        {
                            icon: "📝",
                            label: "Summarize Papers"
                        },
                        {
                            icon: "🔍",
                            label: "Topic Explorer"
                        },
                        {
                            icon: "📖",
                            label: "Literature Review"
                        },
                        {
                            icon: "🎯",
                            label: "Research Gap Finder"
                        },
                        {
                            icon: "⚖️",
                            label: "Compare Papers"
                        },
                        {
                            icon: "📊",
                            label: "Activity Tracking"
                        }
                    ].map(
                        ({
                            icon,
                            label
                        }) => (

                        <div
                            key={label}
                            style={{
                                background: "#1e293b",
                                border: "1px solid #334155",
                                borderRadius: "10px",
                                padding: "16px 12px",
                                color: "#cbd5e1",
                                fontSize: "13px",
                                fontWeight: "500"
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "20px",
                                    marginBottom: "8px"
                                }}
                            >
                                {icon}
                            </div>

                            {label}

                        </div>

                    ))}
                </div>

            </div>

        </div>
    );
}

export default LandingPage;