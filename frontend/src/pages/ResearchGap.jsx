import { useState } from "react";
import api from "../services/api";

function ResearchGap() {

    const [topic, setTopic] =
        useState("");

    const [result, setResult] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const findGap = async () => {

        if (!topic) {

            alert(
                "Enter Topic"
            );

            return;
        }

        setLoading(true);

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await api.post(
                    "/research-gap",
                    {
                        topic
                    },
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`
                        }
                    }
                );

            setResult(
                response.data
            );

        }

        catch (error) {

            console.log(
                "FULL ERROR:",
                error
            );

            console.log(
                "RESPONSE:",
                error.response
            );

            console.log(
                "DATA:",
                error.response?.data
            );

            console.log(
                "STATUS:",
                error.response?.status
            );

            alert(
                "Research Gap Generation Failed"
            );
        }

        finally {

            setLoading(false);
        }
    };

    return (

        <div
            style={{
                padding: "30px",
                maxWidth: "1000px",
                margin: "0 auto"
            }}
        >

            <div
                style={{
                    marginBottom: "25px"
                }}
            >

                <h1
                    style={{
                        color: "#0f172a",
                        marginBottom: "5px"
                    }}
                >
                    Research Gap Finder
                </h1>

                <p
                    style={{
                        color: "#64748b"
                    }}
                >
                    Identify unexplored areas,
                    limitations and future
                    research opportunities.
                </p>

            </div>

            <div
                style={{
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)"
                }}
            >

                <input
                    type="text"
                    placeholder="Enter Topic"
                    value={topic}
                    onChange={(e) =>
                        setTopic(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        border:
                        "1px solid #cbd5e1",
                        boxSizing:
                        "border-box"
                    }}
                />

                <br />
                <br />

                <button
                    onClick={findGap}
                    style={{
                        padding:
                        "12px 24px",
                        background:
                        "#2563eb",
                        color:
                        "white",
                        border:
                        "none",
                        borderRadius:
                        "10px",
                        cursor:
                        "pointer",
                        fontWeight:
                        "600"
                    }}
                >
                    Find Research Gaps
                </button>

            </div>

            {
                loading && (

                    <div
                        style={{
                            marginTop:
                            "20px"
                        }}
                    >
                        <p>
                            Finding Research Gaps...
                        </p>
                    </div>

                )
            }

            {
                result && (

                    <div
                        style={{
                            marginTop:
                            "25px",
                            background:
                            "#ffffff",
                            padding:
                            "25px",
                            borderRadius:
                            "15px",
                            boxShadow:
                            "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >

                        <h2
                            style={{
                                color:
                                "#0f172a"
                            }}
                        >
                            Research Gap Analysis
                        </h2>

                        <hr />

                        <h3>
                            Topic
                        </h3>

                        <p
                            style={{
                                color:
                                "#334155"
                            }}
                        >
                            {result.topic}
                        </p>

                        <hr />

                        <h3>
                            Identified Research Gaps
                        </h3>

                        <div
                            style={{
                                whiteSpace:
                                "pre-wrap",
                                lineHeight:
                                "1.8",
                                color:
                                "#334155"
                            }}
                        >
                            {
                                result.research_gaps
                            }
                        </div>

                        <hr />

                        <h3>
                            Sources Used
                        </h3>

                        <ul
                            style={{
                                color:
                                "#2563eb"
                            }}
                        >

                            {
                                result.sources?.map(
                                    (
                                        source,
                                        index
                                    ) => (

                                        <li
                                            key={index}
                                        >
                                            {source}
                                        </li>

                                    )
                                )
                            }

                        </ul>

                    </div>

                )
            }

        </div>
    );
}

export default ResearchGap;