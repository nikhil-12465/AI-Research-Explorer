import chromadb
from sentence_transformers import SentenceTransformer
import ollama

# ==============================
# INITIALIZATION
# ==============================

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_collection(
    "research_papers"
)

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# ==============================
# LITERATURE REVIEW
# ==============================

def generate_review(topic):

    # Create Embedding

    query_embedding = embedding_model.encode(
        topic
    )

    # Retrieve Chunks

    results = collection.query(
        query_embeddings=[
            query_embedding.tolist()
        ],
        n_results=15
    )

    # Collect Sources

    papers = set()

    for meta in results["metadatas"][0]:

        if meta:

            papers.add(
                meta["paper"]
            )

    # Build Context

    context = "\n".join(
        results["documents"][0]
    )

    # Prompt

    prompt = f"""
You are an expert research assistant.

Generate a detailed literature review.

Topic:
{topic}

Context:
{context}

Structure your response as:

# Introduction

# Related Work

# Methodologies

# Strengths and Weaknesses

# Research Gaps

# Future Directions

# Conclusion

Use ONLY the provided context.
Write in academic style.
"""

    # Generate Review

    response = ollama.chat(
        model="qwen2.5:1.5b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    # Return API Response

    return {

        "success": True,

        "topic": topic,

        "literature_review":
        response["message"]["content"],

        "sources":
        list(papers)
    }