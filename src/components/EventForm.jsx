import React, { useState } from "react";
import { supabase } from './../supabaseClient';


export default function EventForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [videoURL, setVideoURL] = useState("");
  const [pdf, setPdf] = useState(null);
  const [location, setLocation] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      desc,
      images,
      videoURL,
      pdf,
      location
    };
    console.log("Event submitted:", data);
    alert("Event submitted (check console)");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Create Event</h2>

      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full mt-1 border px-3 py-2 rounded"
          rows="4"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files))}
          className="mt-1"
        />
      </div>

      <div>
        <label className="block font-medium">Video URL (optional)</label>
        <input
          type="url"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          className="w-full mt-1 border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">PDF Brochure</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          className="mt-1"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
