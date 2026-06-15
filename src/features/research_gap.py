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
# RESEARCH GAP FINDER
# ==============================

def find_research_gaps(topic):

    # Create Embedding

    query_embedding = embedding_model.encode(
        topic
    )

    # Retrieve Relevant Chunks

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
You are an expert research analyst.

Using ONLY the provided research context,
identify research gaps for the topic.

Topic:
{topic}

Context:
{context}

For each research gap provide:

1. Gap Title
2. Description
3. Why it matters
4. Current limitations
5. Possible future research direction

Be specific and academic.

Only use information available in the context.
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

        "research_gaps":
        response["message"]["content"],

        "sources":
        list(papers)
    }