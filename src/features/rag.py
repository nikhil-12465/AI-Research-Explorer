import chromadb
from sentence_transformers import SentenceTransformer
import ollama

# ==============================
# INITIALIZATION (LOAD ONCE)
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
# RAG FUNCTION
# ==============================

def ask_question(question):

    # Create Query Embedding

    query_embedding = embedding_model.encode(
        question
    )

    # Retrieve Chunks

    results = collection.query(
        query_embeddings=[
            query_embedding.tolist()
        ],
        n_results=5
    )

    # Extract Sources

    papers = set()

    source_details = []

    for meta in results["metadatas"][0]:

        if meta:

            papers.add(
                meta["paper"]
            )

            source_details.append(
                {
                    "paper": meta["paper"],
                    "chunk_id": meta.get("chunk_id","NA")
                }
            )

    # Build Context

    context = "\n".join(
        results["documents"][0]
    )

    # Prompt

    prompt = f"""
You are an AI Research Assistant.

Use ONLY the provided context.

Context:
{context}

Question:
{question}

Instructions:

1. Answer only from context.
2. If answer is unavailable say:
'I could not find enough information in the research papers.'
3. Give concise and accurate answer.
"""

    # Generate Answer

    response = ollama.chat(
        model="qwen2.5:1.5b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    # Return Structured Response

    return {

        "question": question,

        "answer":
        response["message"]["content"],

        "sources":
        list(papers),

        "source_details":
        source_details
    }