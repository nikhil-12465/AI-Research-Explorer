from pypdf import PdfReader
import os

CHUNK_SIZE = 1000

data_folder = "data"

all_chunks = []

for root, dirs, files in os.walk(data_folder):

    for file in files:

        if file.endswith(".pdf"):

            pdf_path = os.path.join(root, file)

            reader = PdfReader(pdf_path)

            text = ""

            for page in reader.pages:

                extracted = page.extract_text()

                if extracted:
                    text += extracted

            for i in range(0, len(text), CHUNK_SIZE):

                chunk = text[i:i + CHUNK_SIZE]

                all_chunks.append(chunk)

print("Total Chunks:", len(all_chunks))

print("\nFirst Chunk:\n")
print('x')
print(all_chunks[0][:500])