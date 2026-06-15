import { useEffect, useState } from "react";
import api from "../services/api";

function Activity() {

    const [activities,
        setActivities] =
        useState([]);

    useEffect(() => {

        fetchActivities();

    }, []);

    const fetchActivities =
        async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await api.get(
                    "/activity",
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`
                        }
                    }
                );

            setActivities(
                response.data
            );

        }

        catch (error) {

            console.log(error);
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
                    Activity Log
                </h1>

                <p
                    style={{
                        color: "#64748b"
                    }}
                >
                    Track all actions performed
                    inside your AI Research
                    Explorer workspace.
                </p>

            </div>

            {
                activities.length === 0 ?

                (

                    <div
                        style={{
                            background:
                            "#79799a",
                            padding:
                            "30px",
                            borderRadius:
                            "15px",
                            textAlign:
                            "center",
                            boxShadow:
                            "0 4px 12px rgba(0,0,0,0.08)"
                        }}
                    >

                        <h3>
                            No Activity Found
                        </h3>

                        <p>
                            Your recent actions
                            will appear here.
                        </p>

                    </div>

                )

                :

                (

                    <div
                        style={{
                            display: "flex",
                            flexDirection:
                            "column",
                            gap: "15px"
                        }}
                    >

                        {
                            activities.map(
                                (activity) => (

                                <div
                                    key={
                                        activity.id
                                    }
                                    style={{
                                        background:
                                        "#533f5b90",
                                        padding:
                                        "20px",
                                        borderRadius:
                                        "15px",
                                        boxShadow:
                                        "0 4px 12px rgba(0,0,0,0.08)",
                                        display:
                                        "flex",
                                        alignItems:
                                        "center",
                                        gap:
                                        "15px"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize:
                                            "24px"
                                        }}
                                    >
                                        📌
                                    </div>

                                    <div>

                                        <p
                                            style={{
                                                margin:
                                                0,
                                                color:
                                                "#334155",
                                                lineHeight:
                                                "1.6"
                                            }}
                                        >
                                            {
                                                activity.action
                                            }
                                        </p>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>
    );
}

export default Activity;