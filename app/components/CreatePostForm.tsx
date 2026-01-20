import React, { useState } from "react";
import { Form, useNavigation } from "react-router";
import { createPostInputSchema } from "~/schemas/post.schema";
import { z } from "zod";

type FormErrors = z.ZodIssue[];

export function CreatePostForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>([]);

  const imageError = errors.find((e) => e.path[0] === "image")?.message;
  const captionError = errors.find((e) => e.path[0] === "caption")?.message;


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]); // Clear previous errors

    // Client-side validation
    const validationResult = createPostInputSchema.safeParse({
      caption,
      image: imageFile || undefined,
    });

    if (!validationResult.success) {
      setErrors(validationResult.error.issues);
      return;
    }

    // If validation passes, proceed with form submission
    const formData = new FormData();
    if (caption) formData.append("caption", caption);
    if (imageFile) formData.append("file", imageFile); // 'file' matches backend expected field name

    // Programmatically submit the form data using useNavigation's form ref
    // (Alternatively, use a ref on the Form component if more complex logic is needed before submission)
    (event.target as HTMLFormElement).submit();
  };

  return (
    // NOTE: no max-w here — page controls width
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Create post</h2>
          <p className="mt-0.5 text-xs text-gray-500">Upload an image and add a caption.</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-gray-100" />
      </div>

      <div className="p-5">
        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Image */}
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium text-gray-800">
              Photo
            </label>

            <div
              className={[
                "rounded-xl border border-dashed p-4 bg-white transition",
                imageError
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
              ].join(" ")}
            >
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600
                  file:mr-4 file:rounded-full file:border-0
                  file:bg-gray-900 file:px-4 file:py-2
                  file:text-sm file:font-semibold file:text-white
                  hover:file:bg-black
                  focus:outline-none"
              />

              <p className="mt-2 text-xs text-gray-500">
                PNG, JPG, or WEBP. Square-ish images look best.
              </p>

              {previewUrl && (
                <div className="mt-4 overflow-hidden rounded-xl border bg-white">
                  <img
                    src={previewUrl}
                    alt="Image Preview"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              )}
            </div>

            {imageError && <p className="text-sm text-red-600">{imageError}</p>}
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="caption" className="text-sm font-medium text-gray-800">
                Caption
              </label>
              <span className="text-xs text-gray-400">{caption.length}/2200</span>
            </div>

            <textarea
              id="caption"
              name="caption"
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className={[
                "block w-full rounded-xl border bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition",
                "placeholder:text-gray-400",
                captionError
                  ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200"
                  : "border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
              ].join(" ")}
            />

            {captionError && <p className="text-sm text-red-600">{captionError}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={[
              "w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition",
              "bg-gray-900 hover:bg-black",
              "focus:outline-none focus:ring-2 focus:ring-gray-300",
              "disabled:cursor-not-allowed disabled:opacity-50",
            ].join(" ")}
          >
            {isSubmitting ? "Creating..." : "Share"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Tip: use a short caption + emojis for that IG vibe ✨
          </p>
        </Form>
      </div>
    </div>
  );
}
