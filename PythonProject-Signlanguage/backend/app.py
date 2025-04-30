from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
import cv2
import numpy as np
import base64
import math
from cvzone.HandTrackingModule import HandDetector

app = Flask(__name__)
CORS(app)

# Load the model and labels
model = load_model("Model/keras_model.h5")
labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N"]

# Initialize hand detector
detector = HandDetector(maxHands=1)
imgSize = 300
offset = 20

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        # Decode the image
        img_data = base64.b64decode(data['image'].split(',')[1])
        nparr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Hand detection
        hands, img = detector.findHands(img)
        prediction_text = "-"
        confidence = 0.0
        accuracy = 0.0

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

            # Model prediction
            imgInput = cv2.resize(imgWhite, (224, 224))
            imgInput = imgInput.astype(np.float32) / 255.0
            imgInput = np.expand_dims(imgInput, axis=0)

            prediction = model.predict(imgInput)[0]
            index = np.argmax(prediction)
            prediction_text = labels[index]
            confidence = float(prediction[index]) * 100
            accuracy = confidence  # You can update this if you have real accuracy logic

        return jsonify({
            "prediction": prediction_text,
            "confidence": round(confidence, 2),
            "accuracy": round(accuracy, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
