import os
from groq import AsyncGroq
from dotenv import load_dotenv
from system_prompt import get_system_prompt

load_dotenv()

client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))

async def get_claude_response(messages: list) -> str:
    # Only keep the last 5 messages to avoid hitting Groq's token limits
    recent_messages = messages[-5:]
    
    response = await client.chat.completions.create(
        model="llama-3.1-8b-instant",
        max_tokens=1024,
        messages=[
            {"role": "system", "content": get_system_prompt()},
            *recent_messages
        ]
    )
    
    return response.choices[0].message.content
