from pypdf import PdfReader
import sys
import re

# Handling unicode characters for Windows console
sys.stdout.reconfigure(encoding='utf-8')

# Trying the other file
pdf_path = r"C:\Users\elloc\Downloads\certificados camara de representantes\CV_completo_cristian_morales_2026.pdf"

try:
    reader = PdfReader(pdf_path)
    text = ""
    # Read first 5 pages which likely contain experience
    for i in range(min(5, len(reader.pages))):
        page = reader.pages[i]
        text += page.extract_text() + "\n"
    
    # Simple cleanup to make it readable in console
    text = re.sub(r'\n\s*\n', '\n', text)
    print(text[:4000]) # Print first 4000 chars
except Exception as e:
    print(f"Error reading PDF: {e}")
