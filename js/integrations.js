// Configurare pentru integrări
const integrationsConfig = {
    googleCalendar: {
        clientId: 'YOUR_GOOGLE_CLIENT_ID',
        apiKey: 'YOUR_GOOGLE_API_KEY',
        scopes: 'https://www.googleapis.com/auth/calendar.readonly'
    },
    github: {
        clientId: 'YOUR_GITHUB_CLIENT_ID',
        clientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
        scopes: 'repo,user'
    },
    linkedin: {
        clientId: 'YOUR_LINKEDIN_CLIENT_ID',
        clientSecret: 'YOUR_LINKEDIN_CLIENT_SECRET',
        scopes: 'r_liteprofile r_emailaddress'
    }
};

// Stare integrări
let integrationsState = {
    googleCalendar: {
        connected: false,
        accessToken: null,
        events: []
    },
    github: {
        connected: false,
        accessToken: null,
        repos: []
    },
    linkedin: {
        connected: false,
        accessToken: null,
        profile: null
    }
};

// Funcție pentru conectarea cu Google Calendar
async function connectGoogleCalendar() {
    try {
        // Construiește URL-ul de autorizare
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${integrationsConfig.googleCalendar.clientId}&` +
            `redirect_uri=${window.location.origin}&` +
            `response_type=token&` +
            `scope=${integrationsConfig.googleCalendar.scopes}&` +
            `include_granted_scopes=true&` +
            `state=google_calendar`;

        // Redirecționează utilizatorul către pagina de autorizare
        window.location.href = authUrl;
    } catch (error) {
        console.error('Eroare la conectarea cu Google Calendar:', error);
        showNotification('Eroare la conectarea cu Google Calendar: ' + error.message, 'error');
    }
}

// Funcție pentru procesarea răspunsului OAuth
function handleOAuthResponse() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const state = params.get('state');

    if (accessToken && state === 'google_calendar') {
        // Salvează token-ul și actualizează UI-ul
        integrationsState.googleCalendar.accessToken = accessToken;
        integrationsState.googleCalendar.connected = true;
        localStorage.setItem('googleCalendarToken', accessToken);
        updateIntegrationUI();
        showNotification('Conectat cu succes la Google Calendar', 'success');
        syncGoogleCalendarEvents();
    }
}

// Adaugă event listener pentru procesarea răspunsului OAuth
document.addEventListener('DOMContentLoaded', () => {
    handleOAuthResponse();
});

// Funcție pentru conectarea cu GitHub
async function connectGithub() {
    try {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${integrationsConfig.github.clientId}&redirect_uri=${window.location.origin}/oauth/github&scope=${integrationsConfig.github.scopes}`;
        window.location.href = authUrl;
    } catch (error) {
        console.error('Eroare la conectarea cu GitHub:', error);
        showNotification('Eroare la conectarea cu GitHub', 'error');
    }
}

// Funcție pentru conectarea cu LinkedIn
async function connectLinkedIn() {
    try {
        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${integrationsConfig.linkedin.clientId}&redirect_uri=${window.location.origin}/oauth/linkedin&scope=${integrationsConfig.linkedin.scopes}`;
        window.location.href = authUrl;
    } catch (error) {
        console.error('Eroare la conectarea cu LinkedIn:', error);
        showNotification('Eroare la conectarea cu LinkedIn', 'error');
    }
}

// Funcție pentru sincronizarea evenimentelor din Google Calendar
async function syncGoogleCalendarEvents() {
    if (!integrationsState.googleCalendar.connected) return;
    
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            headers: {
                'Authorization': `Bearer ${integrationsState.googleCalendar.accessToken}`
            }
        });
        
        const data = await response.json();
        integrationsState.googleCalendar.events = data.items;
        updateCalendarUI();
    } catch (error) {
        console.error('Eroare la sincronizarea evenimentelor:', error);
        showNotification('Eroare la sincronizarea evenimentelor', 'error');
    }
}

// Funcție pentru sincronizarea repository-urilor GitHub
async function syncGithubRepos() {
    if (!integrationsState.github.connected) return;
    
    try {
        const response = await fetch('https://api.github.com/user/repos', {
            headers: {
                'Authorization': `token ${integrationsState.github.accessToken}`
            }
        });
        
        const data = await response.json();
        integrationsState.github.repos = data;
        updateGithubUI();
    } catch (error) {
        console.error('Eroare la sincronizarea repository-urilor:', error);
        showNotification('Eroare la sincronizarea repository-urilor', 'error');
    }
}

// Funcție pentru sincronizarea profilului LinkedIn
async function syncLinkedInProfile() {
    if (!integrationsState.linkedin.connected) return;
    
    try {
        const response = await fetch('https://api.linkedin.com/v2/me', {
            headers: {
                'Authorization': `Bearer ${integrationsState.linkedin.accessToken}`
            }
        });
        
        const data = await response.json();
        integrationsState.linkedin.profile = data;
        updateLinkedInUI();
    } catch (error) {
        console.error('Eroare la sincronizarea profilului LinkedIn:', error);
        showNotification('Eroare la sincronizarea profilului LinkedIn', 'error');
    }
}

// Funcție pentru adăugarea unui eveniment în Google Calendar
async function addCalendarEvent(event) {
    if (!integrationsState.googleCalendar.connected) return;
    
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${integrationsState.googleCalendar.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });
        
        const data = await response.json();
        await syncGoogleCalendarEvents();
        showNotification('Eveniment adăugat cu succes', 'success');
    } catch (error) {
        console.error('Eroare la adăugarea evenimentului:', error);
        showNotification('Eroare la adăugarea evenimentului', 'error');
    }
}

// Funcție pentru deconectarea serviciilor
function disconnectService(service) {
    switch (service) {
        case 'googleCalendar':
            integrationsState.googleCalendar = {
                connected: false,
                accessToken: null,
                events: []
            };
            break;
        case 'github':
            integrationsState.github = {
                connected: false,
                accessToken: null,
                repos: []
            };
            break;
        case 'linkedin':
            integrationsState.linkedin = {
                connected: false,
                accessToken: null,
                profile: null
            };
            break;
    }
    
    localStorage.removeItem(`${service}Token`);
    updateIntegrationUI();
    showNotification('Deconectat cu succes', 'success');
}

// Funcție pentru afișarea notificărilor
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Inițializare la încărcarea paginii
document.addEventListener('DOMContentLoaded', () => {
    // Verifică starea integrărilor din localStorage
    const savedState = localStorage.getItem('integrationsState');
    if (savedState) {
        integrationsState = JSON.parse(savedState);
    }
    
    // Actualizează UI-ul
    updateIntegrationUI();
}); 