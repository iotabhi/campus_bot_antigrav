(function () {
    // Inject styles
    const style = document.createElement('style');
    style.innerHTML = `
    #nist-chat-bubble {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      background: #4f46e5;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 9999;
    }
    #nist-chat-bubble svg {
      width: 28px;
      height: 28px;
      fill: white;
    }
    #nist-chat-iframe {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 380px;
      height: 560px;
      border: none;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      z-index: 9998;
      display: none;
    }
  `;
    document.head.appendChild(style);

    // Create bubble button
    const bubble = document.createElement('div');
    bubble.id = 'nist-chat-bubble';
    bubble.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l4.93-1.37A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
  </svg>`;
    document.body.appendChild(bubble);

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'nist-chat-iframe';
    iframe.src = 'https://your-vercel-app.vercel.app'; // 👈 Replace with your actual Vercel URL
    document.body.appendChild(iframe);

    // Toggle on bubble click
    bubble.addEventListener('click', () => {
        iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
    });
})();