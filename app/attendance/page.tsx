// Attendance.tsx
"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { writeFile, utils } from 'xlsx';


const FaceRecognition = dynamic(() => import('@/components/FaceRecognition'), { ssr: false });

interface AttendanceEntry {
  studentName: string;
  timestamp: string;
}

const Attendance: React.FC = () => {
  const [attendance, setAttendance] = useState<AttendanceEntry[]>([]);
  const [status, setStatus] = useState<string>('');

  const handleAttendanceMarked = (studentName: string) => {
    const timestamp = new Date().toLocaleString();
    setAttendance((prevAttendance) => [...prevAttendance, { studentName, timestamp }]);
    setStatus(`Attendance marked for ${studentName}`);
  };

  const handleFaceNotDetected = () => {
    setStatus('No face detected');
  };

  const handleFaceDetected = (studentName: string) => {
    setStatus(`Face detected: ${studentName}`);
  };

  const handleDownload = () => {
    const worksheet = utils.json_to_sheet(attendance);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Attendance');
    writeFile(workbook, 'attendance.xlsx');
  };

  return (
    <div className="h-screen w-full bg-[#101222] flex flex-col items-center justify-center p-6">
     
      <h1 className="text-4xl font-extrabold text-white mb-8">Face Recognition <span className='text-[#F4C224]'>Attendance</span> </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <FaceRecognition
          onAttendanceMarked={handleAttendanceMarked}
          onFaceNotDetected={handleFaceNotDetected}
          onFaceDetected={handleFaceDetected}
        />
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleDownload}
            className="bg-[#F4C224] text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Download Attendance
          </button>
          <div className="text-lg font-medium text-gray-700">
            Status: <span className="font-bold text-gray-900">{status}</span>
          </div>
        </div>
        <ul className="mt-4 text-gray-700">
          {attendance.map((entry, index) => (
            <li key={index} className="py-1">
              {entry.studentName} - {entry.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Attendance;
