import { useEffect, useState } from "react";
import api from "../services/api";

function RecentDocuments() {

    const [documents,
        setDocuments] =
        useState([]);

    useEffect(() => {

        fetchDocuments();

    }, []);

    const fetchDocuments =
        async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await api.get(
                    "/my-documents",
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`
                        }
                    }
                );

            setDocuments(
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
                📚 Recent Documents
            </h2>

            <hr />

            {
                documents
                .slice(-5)
                .reverse()
                .map(
                    (doc) => (

                    <div
                        key={doc.id}
                        style={{
                            padding: "10px 0",
                            borderBottom:
                            "1px solid #e2e8f0"
                        }}
                    >

                        📄 {doc.paper_name}

                    </div>

                ))
            }

        </div>
    );
}

export default RecentDocuments;