from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import math
from keras.models import load_model
from cvzone.HandTrackingModule import HandDetector
import base64

app = Flask(__name__)
CORS(app)

# Load the model and labels
model = load_model("Model/keras_model.h5")
labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N"]
detector = HandDetector(maxHands=1)
offset = 20
imgSize = 300

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    if 'image' not in data:
        return jsonify({'error': 'Image not provided'}), 400

    # Decode the base64 image
    img_data = base64.b64decode(data['image'].split(',')[1])
    nparr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    hands, img = detector.findHands(img)
    prediction_text = "-"
    confidence = "-"

    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']
        height, width, _ = img.shape
        x1 = max(0, x - offset)
        y1 = max(0, y - offset)
        x2 = min(x + w + offset, width)
        y2 = min(y + h + offset, height)

        imgCrop = img[y1:y2, x1:x2]
        aspectRatio = h / w

        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255

        try:
            if aspectRatio > 1:
                k = imgSize / h
                wCal = math.ceil(k * w)
                imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                wGap = math.ceil((imgSize - wCal) / 2)
                imgWhite[:, wGap:wCal + wGap] = imgResize
            else:
                k = imgSize / w
                hCal = math.ceil(k * h)
                imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                hGap = math.ceil((imgSize - hCal) / 2)
                imgWhite[hGap:hCal + hGap, :] = imgResize

            imgInput = cv2.resize(imgWhite, (224, 224))
            imgInput = imgInput.astype(np.float32) / 255.0
            imgInput = np.expand_dims(imgInput, axis=0)

            prediction = model.predict(imgInput)[0]
            index = np.argmax(prediction)
            prediction_text = labels[index]
            confidence = float(prediction[index] * 100)

        except Exception as e:
            return jsonify({'error': f'Error processing image: {str(e)}'}), 500

    return jsonify({
        'prediction': prediction_text,
        'confidence': round(confidence, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)
