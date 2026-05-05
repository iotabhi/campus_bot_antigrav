# NISTCampusConnect ðŸŽ“

An AI-powered campus chatbot built exclusively for NIST college students. Get instant answers about admissions, academics, fees, hostel facilities, and placements â€” 24/7, no waiting.

ðŸ”— **Live Demo:** [campus-bot-antigrav.vercel.app](https://campus-bot-antigrav.vercel.app/)

---

## ðŸš€ Features

- ðŸ’¬ Real-time AI responses powered by **Groq AI**
- âš¡ Lightning-fast inference using the **Groq API**
- ðŸŽ¯ Specifically trained for NIST college â€” not a generic chatbot
- ðŸ’¡ Quick suggestion chips for common questions
- ðŸ“± Fully responsive on desktop and mobile
- ðŸŸ¢ Always online â€” deployed on Vercel + Render

---

## ðŸ§  What It Can Answer

- Admissions process and eligibility
- Academic programs and courses
- Fees and scholarships
- Hostel facilities
- Placement statistics and opportunities

---

## ðŸ› ï¸ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, FastAPI |
| AI Model | Groq AI API |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Built With | Antigravity (AI coding agent) |

---

## ðŸ“ Project Structure

```
.antigravity/
â””â”€â”€ campus_chatbot/
    â”œâ”€â”€ backend/
    â”‚   â”œâ”€â”€ main.py           # FastAPI app and API routes
    â”‚   â”œâ”€â”€ llm_client.py     # Groq AI API integration
    â”‚   â”œâ”€â”€ requirements.txt  # Python dependencies
    â”‚   â””â”€â”€ system_prompt...  # CampusBot personality & knowledge
    â””â”€â”€ frontend/
        â”œâ”€â”€ index.html        # Main UI
        â”œâ”€â”€ script.js         # Chat logic and API calls
        â””â”€â”€ style.css         # Styling
```

---

## âš™ï¸ Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/campus-chatbot.git
cd campus-chatbot
```

### 2. Set up the backend

```bash
cd backend
pip install -r requirements.txt
```

### 3. Add your Groq API key

Create a `.env` file in the backend folder:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run the backend

```bash
uvicorn main:app --reload
```

### 5. Open the frontend

Simply open `frontend/index.html` in your browser, or use a live server extension.

---

## ðŸŒ Deployment

- **Frontend** is deployed on [Vercel](https://vercel.com) â€” just connect your GitHub repo and it auto-deploys.
- **Backend** is deployed on [Render](https://render.com) â€” connect your repo, set the start command to `uvicorn main:app --host 0.0.0.0 --port 10000`, and add your `GROQ_API_KEY` as an environment variable.

---

## ðŸ”’ CORS Configuration

In `main.py`, update the allowed origins to match your frontend URL:

```python
allow_origins=["https://your-vercel-app.vercel.app"]
```

---

## ðŸ¤– About the System Prompt

The system prompt is the core of what makes CampusBot specific to NIST. It defines the bot's personality, its knowledge about the college, and the boundaries of what it should and shouldn't answer. This is what separates it from a generic AI chatbot.

---

## ðŸ‘¨â€ðŸ’» Built With

This project was built using **Antigravity** â€” an AI-powered coding agent that helped write, debug, and structure the entire codebase, making development significantly faster.

---

## ðŸ“„ License

This project is open source and available under the [MIT License](LICENSE).

---

> Made with â¤ï¸ for NIST students
