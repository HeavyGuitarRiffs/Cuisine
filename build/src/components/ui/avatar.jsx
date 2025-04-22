import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { Upload, X, Check, Camera } from "lucide-react";
import { motion } from "framer-motion";

const AvatarUploader = ({ onUpload }) => {
  const [avatar, setAvatar] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [scale, setScale] = useState(1.2);
  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef(null);
  const editorRef = useRef(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setAvatar(URL.createObjectURL(file));
      }
    },
  });

  const capturePhoto = () => {
    setCapturing(true);
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  };

  const takeSnapshot = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setAvatar(canvas.toDataURL("image/png"));
      video.srcObject.getTracks().forEach((track) => track.stop());
      setCapturing(false);
    }
  };

  const cropImage = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedURL = canvas.toDataURL();
      setCroppedImage(croppedURL);
      if (onUpload) onUpload(croppedURL);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!avatar ? (
        <>
          <motion.div
            {...getRootProps()}
            className={`border-2 border-dashed p-4 rounded-xl cursor-pointer text-center transition-all 
            ${isDragActive ? "border-blue-500 bg-blue-50 scale-105" : "border-gray-300"}`}
            whileHover={{ scale: 1.05 }}
          >
            <input {...getInputProps()} />
            <Upload className="text-gray-500 mb-2" />
            <p className="text-gray-500 text-sm">Drag & drop or click to upload</p>
          </motion.div>
          <button
            onClick={capturePhoto}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            <Camera size={16} /> Take Photo
          </button>
        </>
      ) : (
        <motion.div className="relative">
          <AvatarEditor
            ref={editorRef}
            image={avatar}
            width={150}
            height={150}
            border={20}
            color={[255, 255, 255, 0.6]}
            scale={scale}
            rotate={0}
            className="rounded-full"
          />
          <input
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full mt-2"
          />
          <div className="flex gap-2 mt-2">
            <button onClick={cropImage} className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
              <Check size={16} />
            </button>
            <button onClick={() => setAvatar(null)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
      {capturing && (
        <div className="relative">
          <video ref={videoRef} autoPlay className="rounded-lg shadow-lg" />
          <button
            onClick={takeSnapshot}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Capture
          </button>
        </div>
      )}
      {croppedImage && (
        <motion.img
          src={croppedImage}
          alt="Cropped Avatar"
          className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}
    </div>
  );
};

export default AvatarUploader;


import React from "react";

const Avatar = ({ className, children }) => (
  <div className={`rounded-full bg-gray-300 ${className}`}>{children}</div>
);

const AvatarImage = ({ src, alt }) => (
  <img className="w-full h-full rounded-full" src={src} alt={alt} />
);

const AvatarFallback = ({ children }) => (
  <div className="flex items-center justify-center w-full h-full text-gray-600">
    {children}
  </div>
);

export { Avatar, AvatarImage, AvatarFallback };
