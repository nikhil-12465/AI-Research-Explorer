import { useState } from "react";
import api from "../services/api";

function LiteratureReview() {

    const [topic, setTopic] =
        useState("");

    const [review, setReview] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const generateReview = async () => {

        if (!topic) {

            alert(
                "Enter a topic"
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
                    "/literature-review",
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

            setReview(
                response.data
            );

        }

        catch (error) {

            console.log(error);

            alert(
                "Literature Review Failed"
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
                    Literature Review Generator
                </h1>

                <p
                    style={{
                        color: "#64748b"
                    }}
                >
                    Generate a structured
                    literature review from
                    your uploaded research
                    papers.
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
                    "Enter Research Topic"
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
                    onClick={
                        generateReview
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
                    Generate Review
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
                            Generating Literature Review...
                        </p>
                    </div>

                )
            }

            {
                review && (

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
                            Literature Review
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
                            {
                                review.topic
                            }
                        </p>

                        <hr />

                        <h3>
                            Review
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
                                review.literature_review
                            }

                        </div>

                        {
                            review.sources && (

                                <>

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
                                            review.sources.map(
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

                                </>

                            )
                        }

                    </div>

                )
            }

        </div>

    );
}

export default LiteratureReview;