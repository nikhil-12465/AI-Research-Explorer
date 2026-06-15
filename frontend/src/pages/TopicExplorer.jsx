import { useState } from "react";
import api from "../services/api";

function TopicExplorer() {

    const [topic, setTopic] =
        useState("");

    const [result, setResult] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const exploreTopic = async () => {

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
                    "/topic",
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

            console.log(error);

            alert(
                "Topic Exploration Failed"
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
                    Topic Explorer
                </h1>

                <p
                    style={{
                        color: "#64748b"
                    }}
                >
                    Explore a research topic
                    using insights from your
                    uploaded papers.
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
                    onClick={exploreTopic}
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
                    Explore Topic
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
                            Exploring Topic...
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
                            Topic Analysis
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
                            Explanation
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
                                result.answer
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

export default TopicExplorer;