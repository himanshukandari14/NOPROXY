// FaceRecognition.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Loader from './Loader';

interface FaceRecognitionProps {
  onAttendanceMarked: (studentName: string) => void;
  onFaceNotDetected: () => void;
  onFaceDetected: (studentName: string) => void;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ onAttendanceMarked, onFaceNotDetected, onFaceDetected }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [faceStatus, setFaceStatus] = useState<string>('');

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded && videoRef.current) {
      startVideo();
    }
  }, [modelsLoaded]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));
  };

  const handleVideoPlay = async () => {
    const labeledDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

    const lastMarkedTime: { [key: string]: number } = {};

    const intervalId = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
          return; // Skip if video dimensions are not set
        }

        setScanning(true); // Show scanning overlay
        setFaceStatus('Scanning...');

        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        });

        if (canvasRef.current) {
          canvasRef.current.innerHTML = ''; // Clear previous canvas content
          faceapi.matchDimensions(canvasRef.current, {
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
          });

          const results = resizedDetections.map((d) =>
            faceMatcher.findBestMatch(d.descriptor)
          );

          let faceDetected = false;

          results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });

            if (canvasRef.current) {
              drawBox.draw(canvasRef.current);
            }

            const studentName = result.label;
            const now = Date.now();

            if (studentName !== 'unknown') {
              faceDetected = true;
              setFaceStatus(`Face detected: ${studentName}`);
              if (!lastMarkedTime[studentName] || now - lastMarkedTime[studentName] > 1800000) { // 30 minutes
                lastMarkedTime[studentName] = now;
                onAttendanceMarked(studentName);
              }
            }
          });

          if (!faceDetected) {
            onFaceNotDetected();
            setFaceStatus('No face detected. Please position your face within the frame.');
          } else {
            setScanning(false); // Hide scanning overlay
            setFaceStatus('');
          }
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  };

  const loadLabeledImages = async () => {
    const labels = ['Himanshu',"Paarth","Lakshay","Armaan"]; // Update with actual names
    return Promise.all(
      labels.map(async (label) => {
        const descriptions: Float32Array[] = [];
        for (let i = 1; i <= 2; i++) { // Adjust based on the number of images per student
          try {
            const imagePath = `/labeled_images/${label}/${i}.jpg`;
            console.log(`Fetching image from: ${imagePath}`);
            const img = await faceapi.fetchImage(imagePath);
            const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor();
            if (detections?.descriptor) {
              descriptions.push(detections.descriptor);
            }
          } catch (error) {
            console.error(`Error fetching image for ${label}:`, error);
          }
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  };

  return (
    <div className="relative bg-black rounded-lg shadow-lg overflow-hidden">
      {!modelsLoaded && <Loader />}
      <video ref={videoRef} onPlay={handleVideoPlay} autoPlay muted className="w-full h-auto rounded-lg" />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      {scanning && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
          Scanning...
        </div>
      )}
      {faceStatus && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl bg-black bg-opacity-30">
          {faceStatus}
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-center border-t-2 border-dashed border-white bg-black bg-opacity-50 rounded-b-lg">
        <span className="text-white text-xl">Position your face within this frame</span>
      </div>
    </div>
  );
};

export default FaceRecognition;
