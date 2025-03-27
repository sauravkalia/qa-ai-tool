import { useState } from "react";
import axios from "axios";
import React from "react";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFileUrl(response.data.file_url);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-2">Upload Test Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} className="mb-2" />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {fileUrl && (
        <p className="mt-2 text-green-500">
          Video uploaded successfully! <a href={fileUrl} target="_blank">View</a>
        </p>
      )}
    </div>
  );
};

export default UploadForm;