import { useState } from "react";
import api from "../services/api";

function Summarize() {

    const [paperName,
        setPaperName] =
        useState("");

    const [result,
        setResult] =
        useState(null);

    const [loading,
        setLoading] =
        useState(false);

    const summarizePaper =
        async () => {

        if (!paperName) {

            alert(
                "Enter Paper Name"
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
                    "/summarize",
                    {
                        paper_name:
                        paperName
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

            console.log(error);

            alert(
                "Summarization Failed"
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
                    Summarize Paper
                </h1>

                <p
                    style={{
                        color: "#64748b"
                    }}
                >
                    Generate an AI-powered
                    summary from an uploaded
                    research paper.
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
                    placeholder=
                    "Enter Paper Name"
                    value={paperName}
                    onChange={(e) =>
                        setPaperName(
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
                        summarizePaper
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
                    Generate Summary
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
                            Generating Summary...
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
                            Summary
                        </h2>

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
                                result.summary ||
                                JSON.stringify(
                                    result,
                                    null,
                                    2
                                )
                            }

                        </div>

                    </div>

                )
            }

        </div>
    );
}

export default Summarize;