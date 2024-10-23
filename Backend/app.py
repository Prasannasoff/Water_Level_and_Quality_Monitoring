from dotenv import load_dotenv
import os
import tempfile
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import requests
import google.generativeai as genai
import io
from fpdf import FPDF

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Configure Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_gemini_response(lat, lng, water_level, pH):
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"Generate a report on water conditions for location at latitude {lat} and longitude {lng}. The water level is {water_level} meters, and the water pH is {pH}. Based on this, evaluate whether it is safe for building construction, farming, and other uses."
    gemini_response = model.generate_content(prompt)
    return gemini_response.text

@app.route('/getReport', methods=['POST'])
def get_report():
    data = request.json
    details = data.get('Details')

    if not details:
        return jsonify({"error": "Details are missing"}), 400

    latitude = details.get('LATITUDE')
    longitude = details.get('LONGITUDE')
    water_level = details.get('WATER_LEVEL')
    pH = details.get('pH')

    # Generate the report content using Gemini
    report_content = get_gemini_response(latitude, longitude, water_level, pH)
    print(report_content)

    # Create a PDF file for the report
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Water Level and Quality Report", ln=True, align='C')
    pdf.ln(10)

    # Add the details and generated content to the PDF
    pdf.multi_cell(0, 10, txt=f"Location: ({latitude}, {longitude})")
    pdf.multi_cell(0, 10, txt=f"Water Level: {water_level} meters")
    pdf.multi_cell(0, 10, txt=f"Water pH: {pH}")
    pdf.ln(10)
    pdf.multi_cell(0, 10, txt=report_content)

    # Save the PDF to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
        pdf.output(temp_file.name)  # Save the PDF to the temporary file
        temp_file_name = temp_file.name  # Save the file name for later use

    # Send the PDF file as a downloadable file
    return send_file(temp_file_name, as_attachment=True, download_name="Water_Report.pdf", mimetype='application/pdf')


if __name__ == '__main__':
    app.run(debug=True)