import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "@/shared/config/api";
import { useNavigate, useParams } from "react-router-dom";

const EventImageUploadPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file || !eventId) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(`/events/${eventId}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto py-10">
      <h2 className="text-xl font-semibold pt-30">Upload Event Image</h2>

      <Label htmlFor="image">Choose an image</Label>
      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <Button onClick={handleUpload} disabled={!file}>
        Upload
      </Button>
    </div>
  );
};

export default EventImageUploadPage;
