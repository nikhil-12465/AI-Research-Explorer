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
# TOPIC EXPLORER FUNCTION
# ==============================

def explore_topic(topic):

    # Create Embedding

    query_embedding = embedding_model.encode(
        topic
    )

    # Retrieve Relevant Chunks

    results = collection.query(
        query_embeddings=[
            query_embedding.tolist()
        ],
        n_results=10
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
You are an AI Research Explorer.

Explain the topic using the research paper context.

Topic:
{topic}

Context:
{context}

Give:

1. Definition
2. Key Concepts
3. Applications
4. Limitations
5. Future Directions

Use ONLY the provided research context.
"""

    # Generate Response

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
    "answer": response["message"]["content"],
    "sources": list(papers)
}