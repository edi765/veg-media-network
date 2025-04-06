// Chatbot Functions
function toggleChat() {
    const chatContainer = document.querySelector('.chatbot-container');
    chatContainer.style.display = chatContainer.style.display === 'none' || !chatContainer.style.display ? 'flex' : 'none';
    if (chatContainer.style.display === 'flex') {
        document.getElementById('chatInput').focus();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulare răspuns bot
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.querySelector('.chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Răspunsuri predefinite
    if (lowerMessage.includes('salut') || lowerMessage.includes('buna') || lowerMessage.includes('hey')) {
        return 'Bună! Cu ce te pot ajuta?';
    }
    
    if (lowerMessage.includes('curs') || lowerMessage.includes('cursuri')) {
        return 'Oferim o varietate de cursuri în domenii precum tehnologie, dezvoltare personală, limbi străine și gastronomie. Care domeniu te interesează?';
    }
    
    if (lowerMessage.includes('pret') || lowerMessage.includes('cost')) {
        return 'Prețurile cursurilor variază în funcție de domeniu și durată. Pentru detalii specifice, te rog să accesezi pagina cursului care te interesează sau să contactezi echipa noastră.';
    }
    
    if (lowerMessage.includes('certificat')) {
        return 'Da, oferim certificate de absolvire pentru toate cursurile finalizate cu succes. Acestea sunt recunoscute în industrie și pot fi adăugate în CV-ul tău.';
    }
    
    if (lowerMessage.includes('cont') || lowerMessage.includes('inregistrare')) {
        return 'Te poți înregistra gratuit accesând butonul "Autentificare" din meniul principal. Procesul durează doar câteva minute.';
    }
    
    if (lowerMessage.includes('ajutor') || lowerMessage.includes('suport')) {
        return 'Echipa noastră de suport este disponibilă 24/7. Poți contacta un reprezentant la numărul +40 123 456 789 sau prin email la contact@vegmedianetwork.ro';
    }
    
    return 'Îmi pare rău, nu am înțeles exact întrebarea. Poți să reformulezi sau să îmi spui mai specific cu ce te pot ajuta?';
}

// Adaugă HTML-ul chatbot-ului când documentul este încărcat
document.addEventListener('DOMContentLoaded', function() {
    const chatbotHTML = `
        <!-- Chatbot -->
        <button class="chatbot-button" onclick="toggleChat()">
            <i class="fas fa-comments"></i>
        </button>

        <div class="chatbot-container">
            <div class="chatbot-header">
                <h4><i class="fas fa-robot me-2"></i>Asistent Virtual</h4>
                <button class="chatbot-close" onclick="toggleChat()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chatbot-messages">
                <div class="message bot-message">
                    Bună! Sunt asistentul virtual al platformei VEG Media Network. Cu ce te pot ajuta?
                </div>
            </div>
            <div class="chatbot-input">
                <input type="text" placeholder="Scrie un mesaj..." id="chatInput" onkeypress="handleKeyPress(event)">
                <button onclick="sendMessage()">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    // Adaugă chatbot-ul la sfârșitul body-ului
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}); 