const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');
const themeToggle = document.getElementById('theme-toggle');

// In production, update this URL to your Render deployed backend URL
const API_URL = 'https://campus-bot-antigrav.onrender.com/chat'; 
// Example for production: const API_URL = 'https://campus-chatbot-backend.onrender.com/chat';

// Store conversation history for context
let messageHistory = [];

// Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-theme')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// Robust scroll function to handle dynamic content pushing
function scrollToBottom() {
    // Scroll immediately
    chatMessages.scrollTop = chatMessages.scrollHeight;
    // Scroll again after a tiny delay to account for rendering/animations
    setTimeout(() => {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }, 50);
}

// Helper function to format message with Markdown-like bold/italic support (simple version)
function formatMessage(text) {
    // Replace **text** with <strong>text</strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace *text* with <em>text</em>
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Replace newlines with <br>
    formattedText = formattedText.replace(/\n/g, '<br>');
    return formattedText;
}

function appendMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = isUser ? text : formatMessage(text); // Basic sanitization for user input, formatting for bot

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    scrollToBottom();
}

async function sendMessage(message) {
    // Show typing indicator
    typingIndicator.style.display = 'flex';
    scrollToBottom();
    
    // Add user message to history
    messageHistory.push({ role: 'user', content: message });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: messageHistory })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Add bot response to history
        messageHistory.push({ role: 'assistant', content: data.response });
        
        // Hide typing indicator before appending so it doesn't leave an empty gap
        typingIndicator.style.display = 'none';

        // Append to UI
        appendMessage(data.response, false);
    } catch (error) {
        console.error("Error communicating with the chatbot backend:", error);
        typingIndicator.style.display = 'none';
        appendMessage("Sorry, I'm having trouble connecting to the server right now. Please try again later.", false);
        // Remove the failed message from history
        messageHistory.pop();
        scrollToBottom();
    }
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (text) {
        appendMessage(text, true);
        sendMessage(text);
        userInput.value = '';
        
        // Hide suggestions once the user starts chatting
        const suggestions = document.getElementById('suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }
});

// Handle suggestion chips
document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const text = chip.innerText;
        appendMessage(text, true);
        sendMessage(text);
        
        // Hide suggestions
        const suggestions = document.getElementById('suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    });
});

// Handle sidebar topics
document.querySelectorAll('.sidebar-topic').forEach(topic => {
    topic.addEventListener('click', () => {
        // Extract text without the icon (just the text content)
        const text = "Tell me about " + topic.innerText.trim();
        appendMessage(text, true);
        sendMessage(text);
        
        // Hide suggestions if they are still visible
        const suggestions = document.getElementById('suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    });
});
