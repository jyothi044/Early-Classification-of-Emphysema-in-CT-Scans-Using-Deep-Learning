from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load model
model_path = "disease_model.h5"  # Update with correct path
try:
    model = tf.keras.models.load_model(model_path)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")

# Define image size
img_size = (224, 224)

# Define categories
categories = ['NT', 'CLE', 'PSE']  # Update with your actual category labels

# Prediction function
def predict(image_array):
    # Add batch dimension
    img = np.expand_dims(image_array, axis=0)
    img = img / 255.0  # Normalize pixel values
    prediction = model.predict(img)
    return prediction

# Define Flask routes
@app.route('/predict', methods=['POST'])
def prediction():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in request'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Read the image file as a PIL image
        img = Image.open(io.BytesIO(image_file.read()))
        # Convert RGBA image to RGB
        img = img.convert('RGB')
        # Resize image to (224, 224)
        img = img.resize(img_size)
        # Convert PIL image to numpy array
        image_array = np.array(img)

        # Make prediction
        prediction_result = predict(image_array)
        class_label = np.argmax(prediction_result)  # Assuming class label is index of maximum probability
        emphysema = 'Yes' if class_label != 0 else 'No'

        # Get category label based on class label
        category_label = categories[class_label]

        return jsonify({'class': int(class_label), 'category': category_label, 'emphysema': emphysema}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
