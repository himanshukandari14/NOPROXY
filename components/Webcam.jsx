import React, { useRef, useEffect } from 'react';

const Webcam = ({ onCapture }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startWebcam() {
      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      }
    }

    startWebcam();
  }, []);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    onCapture(canvas);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={handleCapture}>Capture</button>
    </div>
  );
};

export default Webcam;
