import { useEffect, useState } from "react";
import api from "../services/api";

function DashboardCards() {

    const [documentsCount,
        setDocumentsCount] =
        useState(0);

    const [activityCount,
        setActivityCount] =
        useState(0);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const headers = {

                Authorization:
                `Bearer ${token}`
            };

            const documents =
                await api.get(
                    "/my-documents",
                    { headers }
                );

            const activities =
                await api.get(
                    "/activity",
                    { headers }
                );

            setDocumentsCount(
                documents.data.length
            );

            setActivityCount(
                activities.data.length
            );

        }

        catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                display: "flex",
                gap: "25px",
                marginTop: "20px"
            }}
        >

            <div
                style={{
                    width: "250px",
                    padding: "25px",
                    background: "#ffffff",
                    borderRadius: "15px",
                    boxShadow:
                    "0 4px 12px rgba(0,0,0,0.1)"
                }}
            >

                <h3>
                    📄 Documents
                </h3>

                <h1>
                    {documentsCount}
                </h1>

            </div>

            <div
                style={{
                    width: "250px",
                    padding: "25px",
                    background: "#ffffff",
                    borderRadius: "15px",
                    boxShadow:
                    "0 4px 12px rgba(0,0,0,0.1)"
                }}
            >

                <h3>
                    ⚡ Activities
                </h3>

                <h1>
                    {activityCount}
                </h1>

            </div>

        </div>
    );
}

export default DashboardCards;