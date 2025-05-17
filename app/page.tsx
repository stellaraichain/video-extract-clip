'use client';

import { useState } from 'react';

const NGROK_API_URL = "https://d23b-2a03-cfc0-8000-29-00-9532-6075.ngrok-free.app/process";

export default function Home() {
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [query, setQuery] = useState('');
  const [fragmentStart, setFragmentStart] = useState<number | null>(null);
  const [fragmentEnd, setFragmentEnd] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [clippedVideoUrl, setClippedVideoUrl] = useState('');

  const handleExtract = async () => {
    setError('');
    setFragmentStart(null);
    setFragmentEnd(null);
    if (!videoUrlInput.trim() || !query.trim()) {
      setError('Please enter both a video URL and a query.');
      return;
    }
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('query', query);
      formData.append('video_url', videoUrlInput);
      const response = await fetch(NGROK_API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      if (data && data.cliped_url) {
        setClippedVideoUrl(data.cliped_url);
        if (data.fragmentStartTime) setFragmentStart(Number(data.fragmentStartTime));
        if (data.fragmentEndTime) setFragmentEnd(Number(data.fragmentEndTime));
      } else {
        setClippedVideoUrl('');
        setError('No clipped video found.');
      }
    } catch (err) {
      setError('Error extracting fragment times.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Extract Video Fragments</h1>
        <input
          type="text"
          value={videoUrlInput}
          onChange={e => setVideoUrlInput(e.target.value)}
          placeholder="Paste a video URL..."
          className="w-full p-2 border rounded mb-4 text-gray-900"
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter your query..."
          className="w-full p-2 border rounded mb-4 text-gray-900"
        />
        <button
          onClick={handleExtract}
          disabled={isProcessing}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isProcessing ? 'Extracting...' : 'Extract'}
        </button>
        {error && <div className="mt-4 text-red-600">{error}</div>}
        {fragmentStart !== null && fragmentEnd !== null && (
          <div className="mt-6 p-4 bg-green-100 rounded text-green-900">
            <div><strong>Fragment Start Time:</strong> {fragmentStart} seconds</div>
            <div><strong>Fragment End Time:</strong> {fragmentEnd} seconds</div>
          </div>
        )}
        {clippedVideoUrl && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Clipped Video Preview</h3>
            <video
              src={clippedVideoUrl}
              controls
              className="w-full max-w-2xl rounded"
            />
          </div>
        )}
      </div>
    </main>
  );
}
