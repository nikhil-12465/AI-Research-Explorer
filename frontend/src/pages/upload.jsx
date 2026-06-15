import { useState } from "react";
import api from "../services/api";

function Upload() {

    const [file, setFile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const uploadFile = async () => {

        if (!file) {

            alert(
                "Select a PDF"
            );

            return;
        }

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        const token =
            localStorage.getItem(
                "token"
            );

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/upload",
                    formData,
                    {
                        headers: {
                            Authorization:
                            `Bearer ${token}`,
                            "Content-Type":
                            "multipart/form-data"
                        }
                    }
                );

            alert(
                "Upload Successful"
            );

            console.log(
                response.data
            );

            setFile(null);

        }

        catch (error) {

            console.log(error);

            alert(
                "Upload Failed"
            );
        }

        finally {

            setLoading(false);
        }
    };

    return (

        <div
            style={{
                minHeight:
                "calc(100vh - 70px)",
                display: "flex",
                justifyContent:
                "center",
                alignItems:
                "center",
                background:
                "#f8fafc",
                padding: "20px"
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: "700px",
                    background:
                    "#ffffff",
                    padding: "40px",
                    borderRadius:
                    "20px",
                    boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)"
                }}
            >

                <h1
                    style={{
                        textAlign:
                        "center",
                        color:
                        "#0f172a",
                        marginBottom:
                        "10px"
                    }}
                >
                    Upload Research Paper
                </h1>

                <p
                    style={{
                        textAlign:
                        "center",
                        color:
                        "#64748b",
                        marginBottom:
                        "30px"
                    }}
                >
                    Upload PDF papers for AI
                    analysis, summarization
                    and research exploration.
                </p>

                <div
                    style={{
                        border:
                        "2px dashed #cbd5e1",
                        borderRadius:
                        "15px",
                        padding:
                        "40px",
                        textAlign:
                        "center",
                        background:
                        "#f8fafc"
                    }}
                >

                    <div
                        style={{
                            fontSize:
                            "70px",
                            marginBottom:
                            "15px"
                        }}
                    >
                        📄
                    </div>

                    <h3>
                        Choose PDF File
                    </h3>

                    <p
                        style={{
                            color:
                            "#64748b",
                            marginBottom:
                            "20px"
                        }}
                    >
                        Supported Format: PDF
                    </p>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                            setFile(
                                e.target.files[0]
                            )
                        }
                    />

                    {
                        file && (

                            <div
                                style={{
                                    marginTop:
                                    "20px",
                                    background:
                                    "#eff6ff",
                                    padding:
                                    "12px",
                                    borderRadius:
                                    "10px",
                                    color:
                                    "#2563eb",
                                    fontWeight:
                                    "600"
                                }}
                            >
                                📄 {file.name}
                            </div>

                        )
                    }

                    <button
                        onClick={
                            uploadFile
                        }
                        style={{
                            marginTop:
                            "25px",
                            padding:
                            "12px 30px",
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
                        Upload Paper
                    </button>

                    {
                        loading && (

                            <p
                                style={{
                                    marginTop:
                                    "15px",
                                    color:
                                    "#2563eb",
                                    fontWeight:
                                    "500"
                                }}
                            >
                                Uploading PDF...
                            </p>

                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default Upload;