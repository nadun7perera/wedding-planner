// src/components/FileUpload.tsx
import { useState } from "react";
import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface FileUploadProps {
  onUpload: (url: string) => void;
  folderPath: string;
}

export default function FileUpload({ onUpload, folderPath }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    // Use the dynamic folderPath here:
    const storageRef = ref(
      storage,
      `${folderPath}/${Date.now()}_${file.name}`
    );
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    onUpload(url);
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">PDF Catalogue</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={uploading}
        className="mt-1"
      />
      {uploading && <p className="text-sm text-gray-500">Uploading…</p>}
    </div>
  );
}
