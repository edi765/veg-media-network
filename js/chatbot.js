// Funcție pentru comutarea vizibilității ferestrei de chat
function toggleChat() {
    const chatWindow = document.querySelector('.chatbot-window');
    chatWindow.classList.toggle('active');
}

// Funcție pentru gestionarea apăsării tastei Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Funcție pentru trimiterea mesajului
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        // Adaugă mesajul utilizatorului
        addMessage(message, 'user');
        
        // Simulează răspunsul botului
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
        
        // Curăță câmpul de input
        input.value = '';
    }
}

// Funcție pentru adăugarea unui mesaj în fereastra de chat
function addMessage(text, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    
    // Derulează la ultimul mesaj
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Funcție pentru generarea răspunsului botului
function getBotResponse(message) {
    message = message.toLowerCase();
    
    // Răspunsuri pentru diferite cuvinte cheie
    if (message.includes('bună') || message.includes('salut') || message.includes('hello') || message.includes('hi')) {
        return 'Bună! Sunt Eduțuu, asistentul virtual al VEG Media Network. Cum te pot ajuta astăzi?';
    }
    
    if (message.includes('cum te cheama') || message.includes('numele tău') || message.includes('cine ești') || 
        message.includes('cum te numești') || message.includes('cum te numesc')) {
        return 'Mă numesc Eduțuu și sunt asistentul virtual al VEG Media Network. Sunt aici să te ajut cu orice întrebare ai avea despre platforma noastră.';
    }
    
    if (message.includes('cine te a creat') || message.includes('cine te a făcut') || message.includes('cine te a dezvoltat') || 
        message.includes('cine te a programat') || message.includes('cine te a inventat')) {
        return 'Am fost creat de Edi, Administratorul Firmei VEG Media Network. El este responsabil pentru dezvoltarea și menținerea platformei noastre educaționale.';
    }
    
    if (message.includes('cursuri') || message.includes('curs') || message.includes('cursuri disponibile') || 
        message.includes('ce cursuri aveti') || message.includes('cursuri noi')) {
        return 'Avem o varietate de cursuri disponibile în platformă. Poți găsi cursuri despre dezvoltare web, marketing digital, design grafic și multe altele. Dorești să vezi lista completă de cursuri?';
    }
    
    if (message.includes('preț') || message.includes('cost') || message.includes('tarif') || 
        message.includes('cât costă') || message.includes('prețuri') || message.includes('costuri')) {
        return 'Prețurile cursurilor variază în funcție de tipul și durata cursului. Poți găsi toate informațiile despre prețuri în secțiunea de cursuri. Dorești să vezi prețurile pentru un curs specific?';
    }
    
    if (message.includes('certificat') || message.includes('certificare') || message.includes('diplomă') || 
        message.includes('certificare curs') || message.includes('diplomă curs')) {
        return 'Da, oferim certificate de finalizare pentru toate cursurile noastre. Pentru a obține un certificat, trebuie să finalizezi toate modulele cursului și să obții o notă minimă de trecere.';
    }
    
    if (message.includes('contact') || message.includes('ajutor') || message.includes('suport') || 
        message.includes('ajutor tehnic') || message.includes('probleme') || message.includes('soluționare')) {
        return 'Poți să ne contactezi prin formularul de contact din secțiunea "Contact" sau să ne trimiți un email la support@vegmedia.ro. Suntem aici să te ajutăm!';
    }
    
    if (message.includes('despre') || message.includes('cine sunteți') || message.includes('ce faceți') || 
        message.includes('despre companie') || message.includes('despre platformă')) {
        return 'VEG Media Network este o platformă educațională dedicată oferirii de cursuri de calitate în domeniul IT și media. Suntem pasionați de educație și ne dorim să facem cunoașterea accesibilă tuturor.';
    }
    
    if (message.includes('înregistrare') || message.includes('cont nou') || message.includes('creare cont') || 
        message.includes('cum mă înregistrez') || message.includes('vreau cont nou')) {
        return 'Pentru a crea un cont nou, poți accesa pagina de înregistrare. Este un proces simplu și rapid. După înregistrare, vei avea acces la toate funcționalitățile platformei.';
    }
    
    if (message.includes('autentificare') || message.includes('login') || message.includes('conectare') || 
        message.includes('cum mă loghez') || message.includes('cum mă conectez')) {
        return 'Pentru a te autentifica, folosește adresa ta de email și parola. Dacă ai uitat parola, poți folosi opțiunea de recuperare. Ai nevoie de ajutor cu procesul de autentificare?';
    }
    
    if (message.includes('profil') || message.includes('contul meu') || message.includes('datele mele') || 
        message.includes('informații personale') || message.includes('profil utilizator')) {
        return 'În profilul tău poți gestiona toate informațiile personale, vedea progresul în cursuri și accesa certificatele tale. Dorești să știi mai multe detalii despre funcționalitățile profilului?';
    }
    
    if (message.includes('setări') || message.includes('preferințe') || message.includes('configurare') || 
        message.includes('personalizare') || message.includes('opțiuni')) {
        return 'Poți personaliza experiența ta pe platformă prin setările din contul tău. Aici poți modifica preferințele de notificare, limba interfeței și alte opțiuni.';
    }

    if (message.includes('mulțumesc') || message.includes('mersi') || message.includes('thanks') || 
        message.includes('thank you') || message.includes('gracias')) {
        return 'Cu plăcere! Sunt aici să te ajut oricând ai nevoie. Mai pot să te ajut cu ceva?';
    }

    if (message.includes('la revedere') || message.includes('pa') || message.includes('bye') || 
        message.includes('goodbye') || message.includes('ciao')) {
        return 'La revedere! Dacă mai ai întrebări, sunt aici să te ajut. O zi bună!';
    }

    if (message.includes('ce poți face') || message.includes('ce știi să faci') || message.includes('capacități') || 
        message.includes('funcționalități') || message.includes('abilități')) {
        return 'Pot să te ajut cu informații despre cursuri, prețuri, certificate, procesul de înregistrare și autentificare, gestionarea profilului și multe altele. Cu ce te pot ajuta?';
    }

    if (message.includes('program') || message.includes('programare') || message.includes('când') || 
        message.includes('orar') || message.includes('schedule')) {
        return 'Cursurile noastre sunt disponibile online și poți să le urmezi în ritmul tău. Nu există un program fix, poți accesa conținutul oricând dorești.';
    }

    if (message.includes('durată') || message.includes('cât durează') || message.includes('timp') || 
        message.includes('perioadă') || message.includes('length')) {
        return 'Durata cursurilor variază în funcție de complexitatea lor. Poți găsi informații despre durata fiecărui curs în descrierea sa.';
    }

    if (message.includes('nivel') || message.includes('dificultate') || message.includes('avansat') || 
        message.includes('începător') || message.includes('intermediar')) {
        return 'Oferim cursuri pentru toate nivelurile, de la începători până la avansați. Fiecare curs specifică nivelul recomandat în descrierea sa.';
    }
    
    // Răspuns implicit pentru mesaje nerecunoscute
    return 'Îmi pare rău, dar nu am înțeles exact întrebarea ta. Poți să o reformulezi sau să-mi spui altceva cu ce te pot ajuta?';
} 