import { useEffect, useState } from "react";
import api from "../services/api";

function RecentActivity() {

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
                marginTop: "30px",
                padding: "20px",
                background: "#ffffff",
                borderRadius: "15px",
                boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)"
            }}
        >

            <h2>
                ⚡ Recent Activity
            </h2>

            <hr />

            {
                activities
                .slice(-5)
                .reverse()
                .map(
                    (activity) => (

                    <div
                        key={activity.id}
                        style={{
                            padding: "10px 0",
                            borderBottom:
                            "1px solid #e2e8f0"
                        }}
                    >

                        {activity.action}

                    </div>

                ))
            }

        </div>
    );
}

export default RecentActivity;