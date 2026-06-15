import { useState } from "react";
import api from "../services/api";

function Query() {

    const [question, setQuestion] =
        useState("");

    const [answer, setAnswer] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const askQuestion = async () => {

        if (!question) {

            alert(
                "Enter a question"
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
                    "/query",
                    {
                        question
                    },
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`
                        }
                    }
                );

            setAnswer(
                response.data
            );

        }

        catch (error) {

            console.log(error);

            alert(
                "Query Failed"
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
                    Research Assistant
                </h1>

                <p
                    style={{
                        color: "#64748b"
                    }}
                >
                    Ask questions about your
                    uploaded research papers
                    using AI-powered retrieval.
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

                <textarea
                    rows="6"
                    placeholder=
                    "Ask a question about uploaded papers..."
                    value={question}
                    onChange={(e) =>
                        setQuestion(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "15px",
                        borderRadius: "10px",
                        border:
                        "1px solid #cbd5e1",
                        boxSizing:
                        "border-box",
                        resize:
                        "vertical"
                    }}
                />

                <br />
                <br />

                <button
                    onClick={
                        askQuestion
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
                    Ask Question
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
                            Generating Answer...
                        </p>
                    </div>

                )
            }

            {
                answer && (

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
                            Research Answer
                        </h2>

                        <hr />

                        <h3>
                            Question
                        </h3>

                        <p
                            style={{
                                color:
                                "#334155"
                            }}
                        >
                            {
                                answer.question
                            }
                        </p>

                        <hr />

                        <h3>
                            Answer
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
                                answer.answer
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
                                answer.sources?.map(
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

export default Query;