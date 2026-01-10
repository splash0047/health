# Hygieia: AI-Powered Medical Disease Prediction Platform

## 1. Executive Summary
**Hygieia** is a comprehensive full-stack healthcare application designed to assist in the early detection and risk assessment of multiple diseases. By leveraging traditional Machine Learning (ML) models for structured clinical data and Generative AI (Google Gemini 2.0) for medical image analysis, Hygieia provides a dual-layer diagnostic approach.

The platform serves two main purposes:
1.  **Direct Prediction**: Allowing users to input symptoms or clinical metrics to get real-time risk assessments.
2.  **Educational Analysis**: Transparently displaying the data science behind predictions via interactive Jupyter Notebook viewers.

**Disclaimer**: *This tool is for educational and informational purposes only and does not replace professional medical diagnosis.*

---

## 2. System Architecture

Hygieia operates on a modern decoupled architecture:

### **Frontend (Client-Side)**
*   **Framework**: Next.js 16.1.0 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS & Glassmorphism UI
*   **Animations**: Framer Motion
*   **Visualization**: Plotly.js for interactive medical charts
*   **State Management**: React Context (ThemeContext)

### **Backend (Server-Side)**
*   **Framework**: FastAPI (Python)
*   **Server**: Uvicorn (running on port 8001)
*   **ML Libraries**: Scikit-learn, Pandas, NumPy, Joblib
*   **AI Integration**: Google Gemini 2.0 Flash (via `routes/image_processing.py`)

### **Data & Models**
*   **Training**: Jupyter Notebooks (`/Notebook` directory)
*   **Persistence**: Trained models saved as `.sav` files using Joblib.
*   **Validation**: Fallback mock predicting logic ensures system stability if model files are missing during development.

---

## 3. Key Functional Modules

### A. Structured Disease Prediction
The application allows users to manually input clinical parameters for specific conditions. Each prediction module is backed by a specific ML model.

| Module | Input Parameters (Examples) | ML Model Type |
| :--- | :--- | :--- |
| **Diabetes** | Glucose, BMI, Insulin, Age, Blood Pressure | Classification (Random Forest/Gradient Boost) |
| **Heart Disease** | Age, Cholesterol, Max Heart Rate, Chest Pain Type | Classification |
| **Liver Disease** | Bilirubin, Albumin, Alkaline Phosphotase | Classification |
| **Kidney Disease** | Blood Urea, Serum Creatinine, Hemoglobin | Classification |
| **Parkinson's** | Vocal features (Jitter, Shimmer, PPE) | Classification |
| **Lung Cancer** | Smoking history, Coughing, Anxiety, Age | Classification |
| **Breast Cancer** | Cell dimension metrics (Radius, Texture, Area) | Classification |

### B. General Symptom Checker
A multi-select interface where users can choose from over 100+ symptoms (e.g., "headache", "nausea", "abdominal pain"). The system aggregates these symptoms to predict the most likely general condition (e.g., Common Cold, Typhoid).

### C. Medical Image Analysis (AI-Powered)
Users can upload medical imagery (X-rays, skin lesions, etc.) for AI interpretation.
*   **Engine**: Google Gemini 2.0 Flash
*   **Functionality**:
    *   classifies the image type (e.g., "Medical Image" vs. "Unrelated").
    *   Identifies visible symptoms or anomalies.
    *   Provides a severity assessment and recommendations.
*   **Specialization**: Prompts are tailored based on the context (e.g., specific instructions for "Diabetes" foot ulcers vs. "Skin Cancer" lesions).

---

## 4. API Reference
The Backend runs on `http://localhost:8001`.

### Prediction Endpoints
*   `POST /predict/diabetes`: Classification based on clinical metrics.
*   `POST /predict/heart`: Heart disease risk assessment.
*   `POST /predict/liver`: Liver disease detection.
*   `POST /predict/kidney`: Chronic kidney disease checks.
*   `POST /predict/parkinsons`: Parkinson’s detection from vocal features.
*   `POST /predict/lung`: Lung cancer risk calculation.
*   `POST /predict/general`: General disease prediction from string list of symptoms.

### Image Processing Endpoints
*   `POST /image/{disease_type}`
    *   **Payload**: `multipart/form-data` (Image file)
    *   **Description**: Sends image to Gemini API with a prompt context-aware of the `{disease_type}`.
    *   **Response**: Textual analysis and severity score.

---

## 5. Installation & Setup

### Prerequisites
*   Node.js v18+
*   Python 3.9+
*   Google Gemini API Key

### Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install fastapi uvicorn scikit-learn pandas numpy joblib opencv-python-headless pillow requests python-dotenv
    ```
4.  Create a `.env` file in the `backend` folder:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```
5.  Start the server:
    ```bash
    uvicorn main:app --reload --port 8001
    ```

### Frontend Setup
1.  Navigate to the root directory:
    ```bash
    cd ..
    # or cd root-of-project
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Access the app at `http://localhost:3000`.

---

## 6. Project Structure

```
├── backend/
│   ├── main.py                 # FastAPI Application entry point
│   ├── disease_model.py        # logic for ML model handling
│   ├── helper.py               # Utility functions
│   ├── models/                 # Source code for model definitions
│   ├── saved_models/           # Pre-trained .sav files (Joblib)
│   └── routes/
│       └── image_processing.py # Gemini API integration
├── Notebook/                   # Jupyter Notebooks for data analysis
├── src/
│   └── app/
│       ├── api/                # Next.js API routes (if any)
│       ├── diabetes/           # Disease specific page
│       ├── heart/              # Disease specific page
│       ├── ...                 # Other disease pages
│       ├── components/         # Reusable UI components (Icon, FileUpload)
│       ├── context/            # React Context (Theme)
│       └── lib/                # Utilities
├── public/                     # Static assets
└── package.json                # Frontend dependencies
```
