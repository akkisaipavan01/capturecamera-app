import React, { useRef, useState } from 'react';
import './App.css';

const CameraCapture = () => {
    const videoElement = useRef(null);
    const canvasElement = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);


    const handleCameraStart = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.current.srcObject = stream;
        } catch (err) {
            console.error("Unable to open camera: ", err);
        }
    };

    const handleCapture = () => {
        const ctx = canvasElement.current.getContext('2d');


        ctx.drawImage(videoElement.current, 0, 0, 640, 480);

        const timestamp = new Date().toLocaleString();
        ctx.font = '18px Arial';
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.textAlign = 'right';

        ctx.strokeText(timestamp, 620, 460);
        ctx.fillText(timestamp, 620, 460);


        const dataUrl = canvasElement.current.toDataURL('image/png');
        setCapturedImage(dataUrl);
    };


    const downloadImage = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = capturedImage;
        downloadLink.download = `captured-${new Date().toISOString()}.png`;
        downloadLink.click();
    };

    return (
        <div className="camera-div">
            <h2>Digitap.ai Task</h2>
            <h3>Capture image through camera with Timestamp</h3>
            <div>
                <button className="buttonstartcam" onClick={handleCameraStart}>Start Camera</button>
                <button className="button1" onClick={handleCapture}>Capture Image</button>
            </div>

            <video
                ref={videoElement}
                autoPlay
                width="640"
                height="480"
                className="Video-frame"
                style={{ display: capturedImage ? 'none' : 'block' }}
            ></video>

            <canvas
                ref={canvasElement}
                width="640"
                height="480"
                className="video-frame"
                style={{ display: 'none' }}
            ></canvas>

            {capturedImage && (
                <div>
                    <h2>Captured Image:</h2>
                    <img src={capturedImage} alt="Captured with timestamp" />
                    <br />
                    <button className="buttondownload" onClick={downloadImage}>Download Image</button>
                </div>
            )}
        </div>
    );
};

export default CameraCapture;
