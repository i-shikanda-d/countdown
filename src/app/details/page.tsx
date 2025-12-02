/**
 * /details page
 * Third step: Add optional description and image
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepLayout } from "@/components/ui/StepLayout";
import { useCountdownStore } from "@/lib/store";
import { isValidImageFile } from "@/lib/utils";
import Image from "next/image";

export default function DetailsPage() {
  const router = useRouter();
  const {
    label,
    type,
    date,
    time,
    description,
    imageFile,
    setDescription,
    setImageFile,
    reset,
  } = useCountdownStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      setError("Image must be JPG, PNG, WebP, or GIF under 5MB");
      return;
    }

    setImageFile(file);
    setError("");

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    if (!label || !type || !date) {
      setError("Missing required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("label", label);
      formData.append("type", type);
      formData.append("date", date);
      if (time) formData.append("time", time);
      if (description) formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch("/api/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create countdown");
      }

      const data = await response.json();
      reset();
      router.push(`/c/${data._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <StepLayout
      step={3}
      totalSteps={3}
      title="Add extra details"
      previousHref="/date"
    >
      <div className="space-y-6">
        {/* Summary */}
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600">📊 Countdown Summary</p>
          <p className="text-lg font-semibold text-slate-900">{label}</p>
          <p className="text-sm text-slate-600 mt-1">
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {time && ` at ${time}`}
          </p>
        </div>

        {/* Description textarea */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            📝 Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a message or details about this countdown..."
            maxLength={1000}
            rows={4}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          />
          <p className="text-xs text-slate-600 mt-1">
            {description.length}/1000 characters
          </p>
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            🖼️ Image (optional)
          </label>
          <div className="space-y-3">
            {imagePreview ? (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  height={1200}
                  width={1200}
                  className="w-full h-48 object-cover rounded-lg border border-slate-300"
                />
                <button
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview("");
                  }}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer block">
                  <p className="text-slate-700 font-semibold">
                    Click to upload
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    JPG, PNG, WebP, GIF up to 5MB
                  </p>
                </label>
              </div>
            )}
          </div>
        </div>

        {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}
      </div>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {loading ? "⏳ Creating..." : "✨ Create Countdown"}
      </button>
    </StepLayout>
  );
}
