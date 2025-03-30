// Variabilă globală pentru starea de autentificare
let isLoggedIn = false;

// Funcție pentru a gestiona vizibilitatea elementelor de autentificare
function updateAuthUI() {
    const userDropdown = document.getElementById('userDropdown');
    const authTabs = document.getElementById('authTabs');
    const userName = document.getElementById('userName');
    
    if (isLoggedIn) {
        if (userDropdown) userDropdown.style.display = 'block';
        if (authTabs) authTabs.style.display = 'none';
        if (userName) userName.textContent = localStorage.getItem('userName') || 'Utilizator';
    } else {
        if (userDropdown) userDropdown.style.display = 'none';
        if (authTabs) authTabs.style.display = 'block';
    }
}

// Funcție pentru a deschide pagina de autentificare
function openAuthPage() {
    const currentPath = window.location.pathname;
    const authPath = currentPath.includes('/pages/') ? 'autentificare.html' : 'pages/autentificare.html';
    window.location.href = authPath;
}

// Funcție pentru autentificare
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Verificare simplă pentru test
    if (email === 'test@test.com' && password === 'test123') {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Edoardo Vrajitoru');
        
        // Actualizăm UI-ul pe toate paginile
        updateAuthUI();
        
        // Redirecționăm către pagina principală
        window.location.href = 'index.html';
    } else {
        alert('Email sau parolă incorectă!');
    }
}

// Funcție pentru deconectare
function handleLogout() {
    isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    
    // Actualizăm UI-ul pe toate paginile
    updateAuthUI();
    
    // Redirecționăm către pagina principală
    window.location.href = 'index.html';
}

// Verificăm starea de autentificare la încărcarea paginii
document.addEventListener('DOMContentLoaded', function() {
    // Verificăm starea de autentificare din localStorage
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Actualizăm UI-ul imediat
    updateAuthUI();
    
    // Adăugăm event listener pentru formularul de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Adăugăm event listener pentru tab-ul de autentificare
    const authTab = document.querySelector('#authTabs .nav-link');
    if (authTab) {
        authTab.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthPage();
        });
    }

    // Adăugăm event listener pentru butonul de logout
    const logoutButton = document.querySelector('.dropdown-item[onclick="handleLogout()"]');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
}); 