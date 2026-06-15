import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div
            style={{
                width: "260px",
                height: "100vh",
                background: "#0f172a",
                color: "white",
                padding: "20px",
                position: "sticky",
                top: 0
            }}
        >

            <h2>
                AI Research Explorer
            </h2>

            <hr />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "20px"
                }}
            >

                <Link
                    to="/dashboard"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    📊 Dashboard
                </Link>

                <Link
                    to="/upload"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    📤 Upload PDF
                </Link>

                <Link
                    to="/documents"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    📚 My Documents
                </Link>

                <Link
                    to="/query"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    ❓ Research Assistant
                </Link>
                <Link
                    to="/summarize"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    📝 Summarize Paper
                </Link>

                <Link
                    to="/topic"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    🔍 Topic Explorer
                </Link>

                <Link
                    to="/literature-review"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    📖 Literature Review
                </Link>

                <Link
                    to="/research-gap"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    🎯 Research Gap
                </Link>

                <Link
                    to="/compare-papers"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    ⚖️ Compare Papers
                </Link>
                

                <Link
                    to="/activity"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    📜 Activity
                </Link>

            </div>

        </div>
    );
}

export default Sidebar;