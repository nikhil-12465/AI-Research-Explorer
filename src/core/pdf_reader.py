from pypdf import PdfReader
import os

data_folder = "data"

pdf_count = 0

for root, dirs, files in os.walk(data_folder):

    for file in files:

        if file.endswith(".pdf"):

            pdf_count += 1

            pdf_path = os.path.join(root, file)

            print("\n" + "=" * 60)
            print("Reading:", file)

            try:

                reader = PdfReader(pdf_path)

                text = ""

                for page in reader.pages:
                    extracted = page.extract_text()

                    if extracted:
                        text += extracted

                print("Characters extracted:", len(text))

            except Exception as e:
                print("Error:", e)

print("\nTotal PDFs Found:", pdf_count)