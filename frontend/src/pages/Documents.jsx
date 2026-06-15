import { useEffect, useState } from "react";
import api from "../services/api";

function Documents() {

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
                padding: "30px",
                maxWidth: "1000px",
                margin: "0 auto"
            }}
        >

            <h1
                style={{
                    color: "#0f172a"
                }}
            >
                My Documents
            </h1>

            <p
                style={{
                    color: "#64748b",
                    marginBottom: "30px"
                }}
            >
                View and manage all uploaded
                research papers.
            </p>

            {
                documents.length === 0 ?

                (

                    <div
                        style={{
                            background:
                            "#ffffff",
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
                            No Documents Found
                        </h3>

                        <p>
                            Upload your first
                            research paper.
                        </p>

                    </div>

                )

                :

                (

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                            "repeat(auto-fill,minmax(300px,1fr))",
                            gap: "20px"
                        }}
                    >

                        {
                            documents.map(
                                (doc) => (

                                <div
                                    key={doc.id}
                                    style={{
                                        background:
                                        "#ffffff",
                                        padding:
                                        "20px",
                                        borderRadius:
                                        "15px",
                                        boxShadow:
                                        "0 4px 12px rgba(0,0,0,0.08)"
                                    }}
                                >

                                    <div
                                        style={{
                                            fontSize:
                                            "40px"
                                        }}
                                    >
                                        📄
                                    </div>

                                    <h3
                                        style={{
                                            color:
                                            "#0f172a"
                                        }}
                                    >
                                        {
                                            doc.paper_name
                                        }
                                    </h3>

                                    <p
                                        style={{
                                            color:
                                            "#64748b"
                                        }}
                                    >
                                        Document ID:
                                        {doc.id}
                                    </p>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>
    );
}

export default Documents;