import chromadb
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

# ==============================
# PAPER SUMMARIZER
# ==============================

def summarize_paper(paper_name):

    # Retrieve all chunks

    results = collection.get(
        where={
            "paper": paper_name
        }
    )

    documents = results["documents"]

    if not documents:

        return {
            "success": False,
            "message": f"{paper_name} not found."
        }

    # Build Context

    context = "\n".join(
        documents[:20]
    )

    # Prompt

    prompt = f"""
You are an expert research assistant.

Generate a structured summary of this research paper.

Paper:
{paper_name}

Context:
{context}

Provide:

1. Problem Statement
2. Methodology
3. Key Contributions
4. Results
5. Limitations
6. Conclusion

Use only the provided context.
"""

    # Generate Summary

    response = ollama.chat(
        model="qwen2.5:1.5b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {

        "success": True,

        "paper":
        paper_name,

        "summary":
        response["message"]["content"]
    }