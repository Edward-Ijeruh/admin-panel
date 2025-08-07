"use client";

import { useEffect, useState } from "react";
import { Trash2, X, UploadCloud, Plus } from "lucide-react";
import { supabase } from './../supabaseClient';


export default function Events() {
  const [showCreateForm, setShowCreateForm] = useState(false);
    const [events, setEvents] = useState([]);
      const [loading, setLoading] = useState(true);


  
    useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select() // Or select only the fields you need
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error.message);
      } else {
        console.log('Fetched Events: ', data);
        setEvents(data);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);



  return (
    <main className="flex-1 py-4 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Events
          </h2>
          <p className="text-sm text-gray-500">
            Manage and create your company’s events.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm px-6 py-3 transition flex items-center gap-2 cursor-pointer w-auto md:w-auto"
        >
          {showCreateForm ? (
            <>
              <X className="w-4 h-4" /> Cancel
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> Create Event
            </>
          )}
        </button>
      </div>

      {showCreateForm ? (
        <CreateEventForm />
      ) : (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-xl font-semibold mb-4 sm:mb-6 text-gray-900">
            Event List
          </h3>

          <ul className="space-y-4">



            {events.map((event) => (
              <li
                key={event.id}
                className="flex flex-wrap items-center gap-3 border-b pb-4 last:border-b-0"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium text-gray-800 truncate">
                    {event.title}
                  </p>
                </div>

                <span
                  className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                    "bg-indigo-100 text-indigo-700"
                      }`}
                >
                  {"Published"}
                </span>

                <p className="text-xs sm:text-sm text-gray-500 text-right w-20 flex-shrink-0">
                  {"07/08/2025"}
                </p>

                <button
                  onClick={() => onDelete(event.id)}
                  className="text-red-600 hover:text-red-800 transition-colors duration-150 cursor-pointer flex-shrink-0"
                  title="Delete Event"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

function CreateEventForm() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [videoURL, setVideoURL] = useState("");
  const [pdf, setPdf] = useState(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState('');

  const handleImageUpload = (e) => {
    if (e.target.files) setSelectedImages(Array.from(e.target.files));
  };

  const handlePdfUpload = (e) => {
    if (e.target.files && e.target.files.length > 0)
      setSelectedPdf(e.target.files[0]);
  };

  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files.length > 0)
      setSelectedVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      //images,
      //videoURL,
      //pdf,
      location
    };
    console.log("Event submitted:", data);
    alert("Announcement Sent!");
    const { error } = await supabase
    .from('events')
    .insert(data)
    // alert(
    //   `Form submitted. Images: ${selectedImages.length}, Video: ${
    //     selectedVideo ? selectedVideo.name : "None"
    //   }, PDF: ${selectedPdf ? selectedPdf.name : "None"}`
    // );
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Event
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition"
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition"
            rows={4}
            placeholder="Enter event description"
            required
          ></textarea>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Location
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition"
            placeholder="Enter event location"
            required
          ></input>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Uploads
          </label>
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-400 transition">
            <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-500 text-sm">
              Click to upload images
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {selectedImages.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              {selectedImages.length} image(s) selected.
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Upload
          </label>
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-400 transition">
            <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-500 text-sm">Click to upload video</span>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
          </label>
          {selectedVideo && (
            <div className="mt-2 text-sm text-gray-600">
              Selected video: {selectedVideo.name}
            </div>
          )}
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDF Brochure
          </label>
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-400 transition">
            <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-500 text-sm">Click to upload PDF</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />
          </label>
          {selectedPdf && (
            <div className="mt-2 text-sm text-gray-600">
              Selected PDF: {selectedPdf.name}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-3 transition cursor-pointer text-sm"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
