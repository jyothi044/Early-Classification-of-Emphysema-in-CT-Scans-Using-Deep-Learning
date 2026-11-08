# Early Classification of Emphysema in CT Scans Using Deep Learning

**Final year project | React + Flask + TensorFlow/Keras | 2023–24**

This project explores image-based emphysema classification using deep learning. It includes a React web interface for uploading a lung CT image, a Flask API that runs a saved model, and a research notebook for image conversion, augmentation, clustering, and DenseNet121 training.

In simple terms, the user chooses an image, the backend prepares it for the neural network, and the interface displays the predicted class, category, and a Yes/No emphysema flag. This is an academic prototype; the included experiments do not establish clinical diagnostic performance.

## Features

- Upload an image through a React interface.
- Send the image to a Flask prediction endpoint.
- Convert input images to RGB, resize them to **224 × 224**, and normalize pixel values.
- Run inference using the supplied `disease_model.h5` file.
- Display the predicted class index, category, and emphysema flag.
- Explore an additional information page at `/typesofemphysema`.
- Use the notebook to study TIFF-to-JPEG conversion, image augmentation, K-Means clustering, and DenseNet121 transfer learning.

## How it works

```text
Select an image in React
          |
          v
POST /predict with multipart field "image"
          |
          v
Flask + Pillow: decode -> RGB -> resize to 224 x 224
          |
          v
NumPy: add batch dimension -> divide pixels by 255.0
          |
          v
TensorFlow/Keras: load saved model -> predict -> argmax
          |
          v
Return JSON -> display class, category, and emphysema flag
```

### Current API labels

The backend currently maps model output indices as follows:

| Index | Category | Intended meaning | API emphysema flag |
| --- | --- | --- | --- |
| `0` | `NT` | Normal tissue | `No` |
| `1` | `CLE` | Centrilobular emphysema | `Yes` |
| `2` | `PSE` | Paraseptal emphysema | `Yes` |

**Important implementation detail:** the training notebook uses **four** cluster categories (`NT`, `PLE`, `PSE`, `CLE`), with a different index mapping from the API. Before interpreting predictions, verify the saved model's output size and training label order against `categories` in `app.py`. An output index of `3` cannot be mapped by the current three-entry API list. The table above describes the API code, not a verified mapping for the saved model.

## Project structure

```text
emphysema project/
├── README.md
└── emphysema/
    ├── disease-backend/
    │   ├── augmentation process.ipynb
    │   ├── image_cluster_labels1.csv
    │   ├── slices/                    # Source TIFF images
    │   └── slicesjpeg1/               # Converted and augmented images
    ├── dlp/
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── public/
    │   ├── src/
    │   │   ├── App.js
    │   │   └── Components/
    │   │       ├── Home.js
    │   │       ├── PredictionForm.jsx
    │   │       └── ...
    │   └── flask-server/
    │       ├── app.py
    │       ├── disease_model.h5
    │       └── image_cluster_labels.csv
    ├── final report GT05.pdf
    ├── RS final paper GT5.pdf
    └── doc.pdf
```

Despite its name, `disease-backend` holds the research notebook and image data. The web application's backend is **`dlp/flask-server/app.py`**.

## Technology stack

| Part | Technologies |
| --- | --- |
| Frontend | React 18, React Router 6, Create React App / react-scripts 5 |
| API | Python, Flask, Flask-CORS |
| Inference | TensorFlow/Keras, NumPy, Pillow |
| Research notebook | DenseNet121, OpenCV, scikit-learn, pandas, Matplotlib, seaborn |
| Saved model | Keras HDF5 file (`.h5`) |

## Run the web application locally

### Download the project and model

The saved model is stored with **Git Large File Storage (Git LFS)**. Install Git LFS before cloning, then run:

```powershell
git lfs install
git clone https://github.com/jyothi044/Early-Classification-of-Emphysema-in-CT-Scans-Using-Deep-Learning.git
cd Early-Classification-of-Emphysema-in-CT-Scans-Using-Deep-Learning
git lfs pull
```

If `disease_model.h5` is only a small text pointer rather than approximately 337 MB, run `git lfs pull` before starting the backend. The local setup commands below use the original author's folder path; replace it with your clone location.

You need **Node.js with npm** and a **Python version supported by your TensorFlow installation**. The project includes an npm lockfile, but does not include pinned Python dependencies or a verified Python/TensorFlow environment specification.

Run the backend and frontend in **two separate terminals**. The commands below are for Windows PowerShell and start from this project's root folder.

### 1. Start the Flask backend

```powershell
cd "C:\Users\Jyothi\Desktop\Project\emphysema project"
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install flask flask-cors tensorflow numpy pillow
cd "emphysema\dlp\flask-server"
..\..\..\.venv\Scripts\python.exe app.py
```

Keep the terminal open. The server runs on **port 5000**. Look for `Model loaded successfully.` in the startup output.

Start the server from `flask-server`: the model path in `app.py` is relative to the current working directory. The bundled model is approximately **337 MB**, so startup may take time and needs sufficient memory. A model-loading error is printed but does not stop the server; the server starting alone does not confirm that inference works.

### 2. Start the React frontend

In a second terminal:

```powershell
cd "C:\Users\Jyothi\Desktop\Project\emphysema project\emphysema\dlp"
npm ci
npm start
```

Open **http://localhost:3000**, choose an image, and click **Submit**. Keep the Flask server running while using the interface.

`PredictionForm.jsx` sends requests directly to `http://127.0.0.1:5000/predict`. If the API runs at a different address, update that URL. `package.json` also defines a development proxy, but the current form uses the explicit API URL.

### 3. Frontend production build

From `emphysema/dlp`:

```powershell
npm run build
```

This creates the frontend's `build` directory. Hosting the build and deploying the Flask API require additional configuration, including the API address in the form.

## Prediction API

**Endpoint:** `POST http://127.0.0.1:5000/predict`

**Body:** multipart form data with a file field named **`image`**. Use an image that Pillow can decode, such as a PNG or JPEG. There is no DICOM-reading pipeline in the current server.

Example request from PowerShell:

```powershell
curl.exe -X POST http://127.0.0.1:5000/predict -F "image=@C:/path/to/scan.jpg"
```

Example response format, illustrating the current API mapping:

```json
{
  "class": 1,
  "category": "CLE",
  "emphysema": "Yes"
}
```

The API returns `400` for a missing image field or an empty filename, and `500` for processing or prediction errors. It does not currently return confidence scores. Visiting `/predict` directly in a browser sends a GET request; use the upload form or a POST request instead.

## Research notebook and data

Open [augmentation process.ipynb](emphysema/disease-backend/augmentation%20process.ipynb) to explore the research workflow:

1. Mount Google Drive and convert source TIFF images to RGB JPEG images.
2. Generate augmented images using rotations, shifts, shear, zoom, and horizontal flips.
3. Extract RGB histogram features using OpenCV.
4. Group images into four clusters with K-Means and assign category names through a hard-coded mapping.
5. Export image paths, cluster indices, and category names to a CSV.
6. Train a frozen ImageNet-pretrained DenseNet121 backbone with a classification head: `Flatten → Dense(512, ReLU) → Dropout(0.5) → Dense(num_classes, softmax)`.
7. Calculate classification metrics and explore confusion-matrix plots.

The training cells use 224 × 224 images, batch size 32, Adam with learning rate `0.0001`, five epochs, and a 20% validation split.

### Included data files

| Location | Contents |
| --- | --- |
| `emphysema/disease-backend/slices/` | 115 source TIFF files in the inspected folder. |
| `emphysema/disease-backend/slicesjpeg1/` | Converted and augmented image files. |
| `emphysema/disease-backend/image_cluster_labels1.csv` | 5,201 data rows with `Image Path`, `Cluster Label`, and `Category` columns. |
| `emphysema/dlp/flask-server/image_cluster_labels.csv` | A separate 2,266-row label CSV. The Flask prediction route does not read this file. |

### Running the notebook

The notebook was written for Google Colab. Install its research dependencies in that environment:

```python
%pip install tensorflow numpy pandas pillow opencv-python scikit-learn matplotlib seaborn
```

Update **all** dataset and CSV paths before running. The cells use several different Google Drive prefixes, including `/content/drive/My Drive/disease1` and `/content/drive/My Drive/disease/disease1`. Paths stored inside the CSVs also need to point to your image locations. For local Jupyter use, skip the Colab Drive-mount cell and use local paths.

The augmentation cell saves images into its input directory. Re-running it can augment previously generated images and increase the dataset substantially; use a separate working copy for experiments. Some imports use older Keras preprocessing APIs and may need adjustment for your installed environment.

### Research limitations to understand

- K-Means cluster IDs are assigned category names manually in code. Cluster membership does not itself validate a medical label.
- The training notebook and prediction API have different category counts and label orders. Verify their correspondence before using the model output.
- The notebook's evaluation generator uses the full dataframe, including training images, rather than an independent test set. Its reported metrics should not be treated as unseen-data performance.
- Some confusion-matrix cells use example labels or category encodings that differ from the numeric training labels. Review these cells before treating their plots as model evaluation.
- The notebook does not include a model-saving step linking its training run to the bundled `disease_model.h5`; the saved model's exact training provenance is not established by the available code.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| `Failed to fetch` or no prediction appears | Confirm Flask is running on port 5000. Inspect the browser console and backend terminal; the form currently logs errors to the console. |
| Model file not found | Run `app.py` from `emphysema/dlp/flask-server`, where `disease_model.h5` is stored. |
| Model fails to load | Read the startup error and check TensorFlow/Keras compatibility with the HDF5 model. Python dependencies are not pinned. |
| Category index error | Compare the saved model's output dimension and class order with the API's three-entry category list. |
| Invalid or unreadable image | Try a valid PNG or JPEG. The API does not implement DICOM decoding. |
| Notebook finds no images | Correct both notebook paths and the absolute image paths in the CSV. |
| Frontend opens but API requests fail on another computer | The form uses `127.0.0.1`, which refers to the computer running the browser. Configure an appropriate API address. |

## Project documents and team

- [Final report](emphysema/final%20report%20GT05.pdf)
- [Research paper](emphysema/RS%20final%20paper%20GT5.pdf)
- [Additional document](emphysema/doc.pdf)

**Team, as listed in the final report:** R. Jyoshna, B. Jyothi, T. Karthik Yadav, P. Sandhya Kumari, and SK Mahaboob Vali.

**Guide:** Dr. R. Karthik

**Institution:** Malla Reddy University, Hyderabad

**Academic year:** 2023–24
