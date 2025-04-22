import React, { useState } from "react";

const PlayerProfile = () => {
  const [image, setImage] = useState(localStorage.getItem("avatar") || "");
  const [tempImage, setTempImage] = useState(null); // Store the selected file
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempImage({ file, preview: imageUrl });
    }
  };

  const handleSaveAvatar = async () => {
    if (!tempImage?.file) return alert("Please select an image first.");

    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", tempImage.file);

    try {
      const response = await fetch("http://localhost:5000/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setImage(data.avatarUrl); // Assuming backend returns { avatarUrl: "image-url" }
      localStorage.setItem("avatar", data.avatarUrl);
      alert("Avatar updated successfully!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload avatar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Preview */}
      <img
        src={tempImage?.preview || image || "/default-avatar.png"}
        alt="User Avatar"
        className="w-32 h-32 rounded-full border"
      />
      
      {/* File Upload */}
      <input 
        type="file" 
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 rounded"
      />

      {/* Save Button */}
      <button 
        onClick={handleSaveAvatar}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Avatar"}
      </button>

      {/* Reset Button */}
      <button 
        onClick={() => {
          localStorage.removeItem("avatar");
          setImage("");
          setTempImage(null);
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Reset Avatar
      </button>
    </div>
  );
};

export default PlayerProfile;
