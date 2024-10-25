from dotenv import load_dotenv
import os
import tempfile
from flask import Flask, jsonify, request, send_file, url_for
from flask_cors import CORS
import google.generativeai as genai
from fpdf import FPDF

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Configure Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# function to get the full path to the image
def get_image_path():
    return os.path.join(app.root_path, 'static', 'WaterImage.png')

# function to format the Gemini response and apply bold to headings
def format_gemini_response(response_text):
    formatted_text = ""
    lines = response_text.splitlines()
    for line in lines:
        if "Analysis" in line or "Evaluation" in line or "Conclusion" in line:
            formatted_text += f"**{line}**\n"  # Bold the headings
        else:
            formatted_text += f"{line}\n"
    return formatted_text

def get_gemini_response(lat, lng, water_level, pH, District, BlockName):
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = (f"Generate a concise report on water conditions for location at District {District} and Block {BlockName}. "
              f"The water level is {water_level} meters, and the water pH is {pH}. "
              f" First Analyze the given details. Provide an evaluation of the safety for building construction, "
              f"farming, and give a conclusion. Avoid unnecessary symbols like stars and #. Give 3 headings: analysis, evaluation, and conclusion. In analysis don't again add water details and district details. Just give clear analysis of given water details")
    gemini_response = model.generate_content(prompt)
    
    # Clean and format the response text
    cleaned_response = gemini_response.text.replace('*', '')
    return format_gemini_response(cleaned_response)

@app.route('/getReport', methods=['POST'])
def get_report():
    data = request.json
    details = data.get('Details')
    
    if not details:
        return jsonify({"error": "Details are missing"}), 400

    latitude = details.get('LATITUDE')
    longitude = details.get('LONGITUDE')
    District = details.get('DISTRICT')
    BlockName = details.get('BLOCK_NAME')
    water_level = details.get('WATER_LEVEL')
    pH = details.get('pH')

    # Generate the report content using Gemini
    report_content = get_gemini_response(latitude, longitude, water_level, pH, District, BlockName)

    # Create a PDF file for the report
    pdf = FPDF()
    pdf.add_page()

    # Draw border around the page
    pdf.rect(5, 5, 200, 287)  # Parameters: x, y, width, height

    # Set margins and font
    pdf.set_left_margin(10)
    pdf.set_right_margin(10)
    pdf.set_font("Arial", size=12)

    # Add water image at the top
    image_path = get_image_path()
    try:
        pdf.image(image_path, x=10, y=8, w=30)  # Image from static folder
    except Exception as e:
        print(f"Image loading error: {e}")

    # Add a title
    pdf.set_xy(10, 40)  # Adjust position after the image
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(190, 10, txt="Water Level and Quality Report", ln=True, align='C')
    pdf.ln(10)

    # Add bold headings and location details
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(190, 10, txt="Location Details:", ln=True)  # Heading without border
    pdf.set_font("Arial", size=12)
    
    # Aligning details to the right
    pdf.cell(190, 10, txt=f"District: {District}", ln=True, align='R')  # Right-aligned text
    pdf.cell(190, 10, txt=f"Block Name: {BlockName}", ln=True, align='R')  # Right-aligned text
    pdf.cell(190, 10, txt=f"Water Level: {water_level} meters", ln=True, align='R')  # Right-aligned text
    pdf.cell(190, 10, txt=f"Water pH: {pH}", ln=True, align='R')  # Right-aligned text
    pdf.ln(10)

    # Summary and Use Cases (from Gemini API response)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(190, 10, txt="Summary of Water Condition:", ln=True)  # Section heading without border
    pdf.set_font("Arial", size=12)

    # Process the Gemini response text and handle bold formatting for headings
    lines = report_content.split("\n")
    for line in lines:
        if line.strip().startswith("**") and line.strip().endswith("**"):  # Check for bold text
            pdf.set_font("Arial", 'B', 12)
            line = line.replace("**", "")  # Remove the custom bold indicators
            pdf.cell(190, 10, txt=line, ln=True)
            pdf.set_font("Arial", size=12)  # Reset to normal text after headings
        else:
            pdf.multi_cell(190, 10, txt=line, border=0)

    # Save the PDF to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
        pdf.output(temp_file.name)  # Save the PDF to the temporary file
        temp_file_name = temp_file.name  # Save the file name for later use

    return send_file(temp_file_name, as_attachment=True, download_name="Water_Report.pdf", mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True)
