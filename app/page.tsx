// "use client";

// import { useState } from 'react';
// import dynamic from 'next/dynamic';
// import { writeFile, utils } from 'xlsx';

// const FaceRecognition = dynamic(() => import('../components/FaceRecognition'), { ssr: false });

// interface AttendanceEntry {
//   studentName: string;
//   timestamp: string;
// }

// const Home: React.FC = () => {
//   const [attendance, setAttendance] = useState<AttendanceEntry[]>([]);
//   const [status, setStatus] = useState<string>('');

//   const handleAttendanceMarked = (studentName: string) => {
//     const timestamp = new Date().toLocaleString();
//     setAttendance((prevAttendance) => [...prevAttendance, { studentName, timestamp }]);
//     setStatus(`Attendance marked for ${studentName}`);
//   };

//   const handleFaceNotDetected = () => {
//     setStatus('No face detected');
//   };

//   const handleFaceDetected = (studentName: string) => {
//     setStatus(`Face detected: ${studentName}`);
//   };

//   const handleDownload = () => {
//     const worksheet = utils.json_to_sheet(attendance);
//     const workbook = utils.book_new();
//     utils.book_append_sheet(workbook, worksheet, 'Attendance');
//     writeFile(workbook, 'attendance.xlsx');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Face Recognition Attendance</h1>
//       <FaceRecognition
//         onAttendanceMarked={handleAttendanceMarked}
//         onFaceNotDetected={handleFaceNotDetected}
//         onFaceDetected={handleFaceDetected}
//       />
//       <button
//         onClick={handleDownload}
//         className="mt-4 p-2 bg-blue-500 text-white rounded"
//       >
//         Download Attendance
//       </button>
//       <div className="mt-4">
//         <p>Status: {status}</p>
//       </div>
//       <ul className="mt-4">
//         {attendance.map((entry, index) => (
//           <li key={index}>
//             {entry.studentName} - {entry.timestamp}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;
import React from 'react'

const page = () => {
  return (
    <div>
      hy
    </div>
  )
}

export default page
