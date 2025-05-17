# 🎬 Video Clip Extractor

A full-stack application to extract and preview relevant video clips from any video URL using natural language queries.

---
## Video that shows how it works
https://drive.google.com/file/d/1n43GDZphoMzLKPFJ35lmIe49oWeEYq6X/view?usp=sharing
## Usage

1. **Paste a video URL** (e.g, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4").
2. **Enter your query** (e.g., "Find a man with big nose").
3. **Click "Extract"**.
4. The app will show a video with only the clipped segment.

---


## Front-end

### How to run frontend?

```bash
git clone git@github.com:stellaraichain/video-extract-clip.git
cd video-extract-clip
cd front-end
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.



## Back-end

The frontend expects the backend to accept a `POST` request to `/process` with:
- `query`: The user's search query (string)
- `video_url`: The video URL (string)

### How to run Back-end?

#### 🛠️ Requirements

- Python 3.8+
- ffmpeg installed (`sudo apt install ffmpeg`)
- `.env` file with:
  ```env
  OPENINTERX_API_KEY=your_openinterx_api_key
  NGROQ_URL=https://your-ngrok-url.or.custom.domain
#### Installation
```
cd semantic_clip_backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### 🚦 Running the Server
```
uvicorn main:app --host 0.0.0.0 --port 8000
```

If you're using ngrok (for HTTPS callback support):
```
ngrok http 8000
```

Update .env with the HTTPS URL provided by ngrok.


**Example request:**
```bash
curl -X POST https://your-backend.com/process \
  -F "query=what is ai" \
  -F "video_url=https://www.youtube.com/watch?v=xxxx"
```

**Example response:**
```json
{
  "cliped_url": "https://your-backend.com/clips/clip_abc123.mp4",
  "fragmentStartTime": 280,
  "fragmentEndTime": 301,
  "description": "The speaker explains the basics of artificial intelligence."
}
```

---

## Notes

- The clipped video must be accessible via a public URL for the frontend to play it.
- The backend should handle all video processing and return the correct fields.
- The frontend will only show the clipped segment, not the full video.


## Contact

For questions or support, open an issue or contact oleksandrdiachuk023@gmail.com.

---
