// Configurare chatbot
const chatbotConfig = {
    greetings: [
        "Bună! Sunt asistentul virtual al platformei VEG Media Network. Cu ce te pot ajuta?",
        "Salut! Sunt aici să te ajut să navighezi prin platformă. Ce dorești să afli?",
        "Bine ai venit! Sunt asistentul tău virtual. Cum te pot ajuta astăzi?"
    ],
    suggestions: [
        "Cum pot începe un curs?",
        "Cum funcționează simulările?",
        "Cum mă pot înscrie într-un proiect?",
        "Cum pot da un test?",
        "Cum îmi pot vedea progresul?"
    ]
};

// Baza de cunoștințe pentru chatbot
const knowledgeBase = {
    // Cursuri
    cursuri: {
        keywords: ["curs", "cursuri", "învățare", "lecții", "modul", "module"],
        responses: {
            general: "Platforma noastră oferă o varietate de cursuri interactive. Poți accesa cursurile din meniul principal.",
            inscriere: "Pentru a te înscrie la un curs: 1) Selectează cursul dorit, 2) Apasă butonul 'Înscrie-te', 3) Urmează instrucțiunile.",
            progres: "Poți vedea progresul tău la cursuri în secțiunea 'Profil' -> 'Progres cursuri'.",
            certificare: "După finalizarea unui curs, vei primi un certificat digital care poate fi descărcat din profilul tău."
        }
    },
    // Simulări
    simulari: {
        keywords: ["simulare", "simulari", "practică", "exercițiu", "exercitii"],
        responses: {
            general: "Simulările noastre îți permit să exersezi în condiții reale diferite scenarii.",
            utilizare: "Pentru a începe o simulare: 1) Alege categoria dorită, 2) Selectează nivelul, 3) Urmează instrucțiunile.",
            tipuri: "Oferim simulări pentru: programare, design, marketing digital și multe altele.",
            salvare: "Progresul tău la simulări este salvat automat și poate fi accesat din profilul tău."
        }
    },
    // Proiecte
    proiecte: {
        keywords: ["proiect", "proiecte", "colaborare", "echipă", "team"],
        responses: {
            general: "Secțiunea de proiecte îți permite să lucrezi în echipă la proiecte reale.",
            participare: "Pentru a participa: 1) Alege un proiect, 2) Citește descrierea, 3) Aplică pentru un rol disponibil.",
            comunicare: "Comunicarea în proiecte se face prin chat-ul integrat și întâlniri virtuale.",
            finalizare: "La finalizarea proiectului, vei primi un certificat de participare și feedback."
        }
    },
    // Quiz-uri
    quizuri: {
        keywords: ["quiz", "test", "evaluare", "examen", "verificare"],
        responses: {
            general: "Quiz-urile sunt modalități interactive de a-ți testa cunoștințele.",
            participare: "Poți participa la quiz-uri din secțiunea 'Quiz' sau la finalul fiecărui modul de curs.",
            scor: "Scorurile tale sunt salvate automat și poți vedea istoricul în profilul tău.",
            pregatire: "Îți recomandăm să revezi materialele de curs înainte de a începe un quiz."
        }
    },
    // Cont și Profil
    cont: {
        keywords: ["cont", "profil", "setări", "autentificare", "înregistrare", "login"],
        responses: {
            general: "Poți gestiona contul tău din secțiunea 'Profil'.",
            editare: "Pentru a-ți edita profilul: 1) Accesează 'Setări cont', 2) Modifică informațiile dorite, 3) Salvează modificările.",
            securitate: "Îți recomandăm să folosești o parolă puternică și să activezi autentificarea în doi pași.",
            probleme: "Dacă întâmpini probleme cu contul tău, te rugăm să contactezi suportul tehnic."
        }
    }
};

// Stare chatbot
let chatbotState = {
    context: null,
    lastQuestion: null,
    conversationHistory: [],
    suggestionsShown: false
};

// Adaugă răspunsurile personalizate
const raspunsuriPersonalizate = {
    "cine te a creat": "Creatorul meu este Edoardo Vrajitoru.",
    "cine este dezvoltatorul acestei platforme": "Edoardo Vrajitoru este dezvoltatorul platformei.",
    "unde invata edy": "La regina maria dorohoi.",
    "in ce clasa este edy": "In clasa 11F, care este cea mai tare clasa!!!",
    "cine este smecherul clasei": "Un baiat pe nume Surmei, n ai cum sa nu l stii....toata lumea il stie!"
};

// Funcție pentru procesarea mesajelor
function processMessage(message) {
    message = message.toLowerCase().trim();
    
    // Verifică dacă este o întrebare de salut
    if (isGreeting(message)) {
        return getRandomGreeting();
    }

    // Verifică dacă este o întrebare de ajutor
    if (isHelpRequest(message)) {
        return showSuggestions();
    }

    // Verificăm dacă mesajul conține vreuna dintre întrebările personalizate
    for (const [intrebare, raspuns] of Object.entries(raspunsuriPersonalizate)) {
        if (message.includes(intrebare)) {
            return raspuns;
        }
    }

    // Caută în baza de cunoștințe
    let bestMatch = findBestMatch(message);
    if (bestMatch) {
        chatbotState.context = bestMatch.category;
        return generateResponse(bestMatch);
    }

    // Răspuns pentru când nu înțelege întrebarea
    return generateFallbackResponse(message);
}

// Funcție pentru verificarea saluturilor
function isGreeting(message) {
    const greetings = ["buna", "salut", "hello", "hi", "bună ziua", "neata", "seara buna"];
    return greetings.some(greeting => message.includes(greeting));
}

// Funcție pentru verificarea cererilor de ajutor
function isHelpRequest(message) {
    const helpKeywords = ["ajutor", "help", "ajuta", "cum", "ce pot", "ce faci"];
    return helpKeywords.some(keyword => message.includes(keyword));
}

// Funcție pentru găsirea celui mai bun răspuns
function findBestMatch(message) {
    let bestMatch = {
        category: null,
        score: 0,
        responseType: 'general'
    };

    // Parcurge toate categoriile din baza de cunoștințe
    for (let category in knowledgeBase) {
        const categoryData = knowledgeBase[category];
        
        // Calculează scorul pentru potrivirea cuvintelor cheie
        let score = categoryData.keywords.reduce((acc, keyword) => {
            if (message.includes(keyword)) {
                acc += 1;
            }
            return acc;
        }, 0);

        // Actualizează cea mai bună potrivire
        if (score > bestMatch.score) {
            bestMatch = {
                category: category,
                score: score,
                responseType: determineResponseType(message, categoryData)
            };
        }
    }

    return bestMatch.score > 0 ? bestMatch : null;
}

// Funcție pentru determinarea tipului de răspuns
function determineResponseType(message, categoryData) {
    // Verifică pentru subiecte specifice în cadrul categoriei
    for (let responseType in categoryData.responses) {
        if (responseType !== 'general') {
            const specificKeywords = getSpecificKeywords(responseType);
            if (specificKeywords.some(keyword => message.includes(keyword))) {
                return responseType;
            }
        }
    }
    return 'general';
}

// Funcție pentru generarea răspunsului
function generateResponse(match) {
    const category = knowledgeBase[match.category];
    const response = category.responses[match.responseType];
    
    // Adaugă sugestii relevante dacă este cazul
    const suggestions = getSuggestionsForCategory(match.category);
    if (suggestions) {
        return response + "\n\n" + suggestions;
    }
    
    return response;
}

// Funcție pentru generarea răspunsului când nu se găsește o potrivire
function generateFallbackResponse(message) {
    const fallbackResponses = [
        "Îmi pare rău, dar nu am înțeles exact întrebarea. Poți să reformulezi?",
        "Nu sunt sigur că am înțeles corect. Iată câteva subiecte despre care pot vorbi:",
        "Hmm, această întrebare este puțin cam complicată pentru mine. Hai să încercăm altfel!"
    ];
    
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    return randomResponse + "\n\n" + showSuggestions();
}

// Funcție pentru afișarea sugestiilor
function showSuggestions() {
    if (!chatbotState.suggestionsShown) {
        chatbotState.suggestionsShown = true;
        return "Iată câteva lucruri despre care pot vorbi:\n" +
               chatbotConfig.suggestions.map(s => "• " + s).join("\n");
    }
    return null;
}

// Funcție pentru obținerea sugestiilor specifice categoriei
function getSuggestionsForCategory(category) {
    const categorySpecificSuggestions = {
        cursuri: [
            "Cum pot vedea toate cursurile disponibile?",
            "Care sunt cerințele pentru certificare?"
        ],
        simulari: [
            "Ce tipuri de simulări sunt disponibile?",
            "Cum pot salva progresul la simulări?"
        ],
        proiecte: [
            "Cum pot găsi un proiect potrivit pentru mine?",
            "Care sunt rolurile disponibile în proiecte?"
        ],
        quizuri: [
            "Cum pot vedea rezultatele anterioare?",
            "Există limită de timp pentru quiz-uri?"
        ]
    };

    if (categorySpecificSuggestions[category]) {
        return "\n\nÎntrebări frecvente pentru această categorie:\n" +
               categorySpecificSuggestions[category].map(s => "• " + s).join("\n");
    }
    return null;
}

// Funcție pentru obținerea unui salut aleatoriu
function getRandomGreeting() {
    return chatbotConfig.greetings[Math.floor(Math.random() * chatbotConfig.greetings.length)];
}

// Funcție pentru obținerea cuvintelor cheie specifice
function getSpecificKeywords(responseType) {
    const keywordMap = {
        inscriere: ["inscriere", "înscrie", "începe", "start", "cum încep"],
        progres: ["progres", "evolutie", "nivel", "status"],
        certificare: ["certificat", "diploma", "atestat"],
        utilizare: ["folosesc", "utilizez", "folosire", "cum se folosește"],
        participare: ["particip", "participa", "înscriere", "înscriu"],
        comunicare: ["comunic", "comunicare", "mesaj", "chat"],
        editare: ["editez", "modific", "schimb", "actualizez"],
        securitate: ["parola", "securitate", "protecție", "siguranta"]
    };
    return keywordMap[responseType] || [];
}

// Funcție pentru afișarea/ascunderea chatbot-ului
function toggleChat() {
    const chatContainer = document.querySelector('.chatbot-container');
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'flex';
    } else {
        chatContainer.style.display = 'none';
    }
}

// Funcție pentru trimiterea mesajului
function sendMessage() {
    const inputElement = document.getElementById('chatInput');
    const message = inputElement.value.trim();
    
    if (message) {
        // Adaugă mesajul utilizatorului
        addMessage(message, true);
        
        // Procesează mesajul și obține răspunsul
        const response = processMessage(message);
        
        // Adaugă răspunsul chatbot-ului cu o mică întârziere
        setTimeout(() => {
            addMessage(response, false);
        }, 500);
        
        // Curăță input-ul
        inputElement.value = '';
    }
}

// Funcție pentru gestionarea apăsării tastei Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Funcție pentru adăugarea mesajelor în chat
function addMessage(message, isUser = false) {
    const chatMessages = document.querySelector('.chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    
    // Scroll la ultimul mesaj
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inițializare chatbot
    const chatButton = document.querySelector('.chatbot-button');
    const chatContainer = document.querySelector('.chatbot-container');
    
    if (chatButton && chatContainer) {
        // Ascunde chatbot-ul inițial
        chatContainer.style.display = 'none';
        
        // Adaugă event listener pentru input
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', handleKeyPress);
        }
    }
}); 