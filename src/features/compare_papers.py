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
# PAPER COMPARISON
# ==============================

def compare_papers(
    paper1,
    paper2
):

    # Get Paper 1 Chunks

    result1 = collection.get(
        where={
            "paper": paper1
        }
    )

    # Get Paper 2 Chunks

    result2 = collection.get(
        where={
            "paper": paper2
        }
    )

    docs1 = result1["documents"]
    docs2 = result2["documents"]

    if not docs1:

        return {
            "success": False,
            "message": f"{paper1} not found."
        }

    if not docs2:

        return {
            "success": False,
            "message": f"{paper2} not found."
        }

    # Build Context

    context1 = "\n".join(
        docs1[:15]
    )

    context2 = "\n".join(
        docs2[:15]
    )

    # Prompt

    prompt = f"""
You are an expert research assistant.

Compare the following two research papers.

Paper 1:
{paper1}

Context:
{context1}

Paper 2:
{paper2}

Context:
{context2}

Provide:

1. Goal Comparison
2. Methodology Comparison
3. Key Contributions
4. Advantages
5. Limitations
6. Final Verdict

Write clearly and professionally.
"""

    # Generate Comparison

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

        "paper1": paper1,

        "paper2": paper2,

        "comparison":
        response["message"]["content"]
    }