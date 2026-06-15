import { useState } from "react";
import api from "../services/api";

function ComparePaper() {

    const [paper1, setPaper1] =
        useState("");

    const [paper2, setPaper2] =
        useState("");

    const [result, setResult] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const comparePapers = async () => {

        if (!paper1 || !paper2) {

            alert(
                "Please enter both paper names"
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
                    "/compare",
                    {
                        paper1,
                        paper2
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
                "STATUS:",
                error.response?.status
            );

            console.log(
                "DATA:",
                error.response?.data
            );

            alert(
                "Comparison Failed"
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
                    Compare Papers
                </h1>

                <p
                    style={{
                        color: "#64748b"
                    }}
                >
                    Compare two research papers
                    and identify similarities,
                    differences, methodologies,
                    and findings.
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
                    placeholder="Enter Paper 1 Name"
                    value={paper1}
                    onChange={(e) =>
                        setPaper1(
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

                <input
                    type="text"
                    placeholder="Enter Paper 2 Name"
                    value={paper2}
                    onChange={(e) =>
                        setPaper2(
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
                    onClick={
                        comparePapers
                    }
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
                    Compare Papers
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
                            Comparing Papers...
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
                            Comparison Result
                        </h2>

                        <hr />

                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                flexWrap: "wrap"
                            }}
                        >

                            <div
                                style={{
                                    flex: 1,
                                    minWidth:
                                    "250px",
                                    background:
                                    "#f8fafc",
                                    padding:
                                    "15px",
                                    borderRadius:
                                    "10px"
                                }}
                            >

                                <h3>
                                    Paper 1
                                </h3>

                                <p>
                                    {
                                        result.paper1
                                    }
                                </p>

                            </div>

                            <div
                                style={{
                                    flex: 1,
                                    minWidth:
                                    "250px",
                                    background:
                                    "#f8fafc",
                                    padding:
                                    "15px",
                                    borderRadius:
                                    "10px"
                                }}
                            >

                                <h3>
                                    Paper 2
                                </h3>

                                <p>
                                    {
                                        result.paper2
                                    }
                                </p>

                            </div>

                        </div>

                        <hr />

                        <h3>
                            Detailed Comparison
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
                                result.comparison
                            }

                        </div>

                    </div>

                )
            }

        </div>
    );
}

export default ComparePaper;