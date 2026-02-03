from pypdf import PdfReader
import sys

# Handling unicode characters for Windows console
sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"C:\Users\elloc\Downloads\certificados camara de representantes\CV_completo_cristian_morales_2026 _1.pdf"

try:
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    print(text)
except Exception as e:
    print(f"Error reading PDF: {e}")
