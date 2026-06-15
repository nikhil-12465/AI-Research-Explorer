from sentence_transformers import SentenceTransformer
# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Example chunks
chunks = [
    "ReAct combines reasoning and acting in language models.",
    "RAG retrieves relevant documents before generating answers.",
    "Vision Transformers use self-attention for image understanding."
]

# Generate embeddings
embeddings = model.encode(chunks)

print("Number of chunks:", len(chunks))
print("Embedding dimension:", len(embeddings[0]))

print("\nFirst 10 values of first embedding:")
print(embeddings[0][:10])