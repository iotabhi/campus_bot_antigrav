from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from llm_client import get_claude_response

app = FastAPI(title="Campus Chatbot API")

# Setup CORS so the frontend on Vercel can access it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://nist.edu/"],  # In production, replace "*" with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]

@app.get("/")
async def root():
    return {"message": "Welcome to the Campus Chatbot API. POST to /chat to interact."}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Pass the message history to the LLM
        response_text = await get_claude_response(request.messages)
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
