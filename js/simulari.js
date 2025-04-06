// Date pentru simulări
const simulariData = {
    programare: {
        titlu: "Simulare Programare",
        descriere: "Testează-ți cunoștințele de programare cu aceste exerciții practice.",
        exercitii: [
            {
                intrebare: "Ce va afișa următorul cod?\n\n```javascript\nlet x = 5;\nlet y = '5';\nconsole.log(x == y);\n```",
                raspunsuri: ["true", "false", "undefined", "error"],
                raspunsCorect: 0,
                explicatie: "Operatorul == face conversie de tip, deci '5' este convertit la număr."
            },
            {
                intrebare: "Care este rezultatul lui 2 + '2' în JavaScript?",
                raspunsuri: ["4", "22", "NaN", "error"],
                raspunsCorect: 1,
                explicatie: "JavaScript convertește numărul la string și face concatenare."
            }
        ]
    },
    matematica: {
        titlu: "Simulare Matematică",
        descriere: "Rezolvă probleme de matematică și verifică-ți cunoștințele.",
        exercitii: [
            {
                intrebare: "Care este rezultatul lui (2 + 3) × 4?",
                raspunsuri: ["20", "14", "24", "10"],
                raspunsCorect: 0,
                explicatie: "Mai întâi se face adunarea (2+3=5), apoi înmulțirea (5×4=20)."
            },
            {
                intrebare: "Care este valoarea lui x în ecuația 2x + 5 = 15?",
                raspunsuri: ["5", "10", "7.5", "20"],
                raspunsCorect: 0,
                explicatie: "2x = 15 - 5 = 10, deci x = 10/2 = 5"
            }
        ]
    },
    fizica: {
        titlu: "Simulare Fizică",
        descriere: "Testează-ți cunoștințele de fizică cu aceste probleme practice.",
        exercitii: [
            {
                intrebare: "Care este formula pentru calculul vitezei?",
                raspunsuri: ["v = d/t", "v = t/d", "v = d×t", "v = d²/t"],
                raspunsCorect: 0,
                explicatie: "Viteza este egală cu distanța împărțită la timp."
            },
            {
                intrebare: "Ce unitate de măsură are forța?",
                raspunsuri: ["Newton (N)", "Joule (J)", "Watt (W)", "Pascal (Pa)"],
                raspunsCorect: 0,
                explicatie: "Forța se măsoară în Newtoni (N)."
            }
        ]
    },
    chimie: {
        titlu: "Simulare Chimie",
        descriere: "Verifică-ți cunoștințele de chimie cu aceste exerciții.",
        exercitii: [
            {
                intrebare: "Care este formula chimică a apei?",
                raspunsuri: ["H₂O", "CO₂", "O₂", "H₂"],
                raspunsCorect: 0,
                explicatie: "Apa este formată din 2 atomi de hidrogen și 1 atom de oxigen."
            },
            {
                intrebare: "Ce este pH-ul?",
                raspunsuri: ["Măsura acidității", "Măsura temperaturii", "Măsura presiunii", "Măsura densității"],
                raspunsCorect: 0,
                explicatie: "pH-ul măsoară aciditatea sau bazicitatea unei soluții."
            }
        ]
    }
};

// Variabile globale
let simulareCurenta = null;
let scor = 0;
let intrebareCurenta = 0;

// Funcție pentru inițializarea simulării
function initSimulare(categorie) {
    console.log('Inițializare simulare pentru categoria:', categorie);
    simulareCurenta = simulariData[categorie];
    scor = 0;
    intrebareCurenta = 0;
    
    // Ascunde toate cardurile de simulare
    document.querySelector('.simulation-cards').style.display = 'none';
    
    // Actualizează UI-ul
    document.getElementById('simulare-titlu').textContent = simulareCurenta.titlu;
    document.getElementById('simulare-descriere').textContent = simulareCurenta.descriere;
    document.getElementById('simulare-container').style.display = 'block';
    
    // Afișează prima întrebare
    afiseazaIntrebare();
}

// Funcție pentru afișarea întrebării curente
function afiseazaIntrebare() {
    const intrebare = simulareCurenta.exercitii[intrebareCurenta];
    const container = document.getElementById('intrebare-container');
    
    container.innerHTML = `
        <div class="intrebare">
            <h3>Întrebarea ${intrebareCurenta + 1}/${simulareCurenta.exercitii.length}</h3>
            <p>${intrebare.intrebare}</p>
            <div class="raspunsuri">
                ${intrebare.raspunsuri.map((raspuns, index) => `
                    <button class="btn-raspuns" onclick="verificaRaspuns(${index})">
                        ${raspuns}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Funcție pentru verificarea răspunsului
function verificaRaspuns(raspunsIndex) {
    const intrebare = simulareCurenta.exercitii[intrebareCurenta];
    const raspunsuri = document.querySelectorAll('.btn-raspuns');
    
    // Dezactivează toate butoanele
    raspunsuri.forEach(btn => btn.disabled = true);
    
    // Verifică răspunsul
    if (raspunsIndex === intrebare.raspunsCorect) {
        scor++;
        raspunsuri[raspunsIndex].classList.add('corect');
    } else {
        raspunsuri[raspunsIndex].classList.add('gresit');
        raspunsuri[intrebare.raspunsCorect].classList.add('corect');
    }
    
    // Afișează explicația
    const container = document.getElementById('intrebare-container');
    container.innerHTML += `
        <div class="explicatie">
            <p>${intrebare.explicatie}</p>
            <button class="btn-continua" onclick="urmatoareaIntrebare()">
                Continuă
            </button>
        </div>
    `;
}

// Funcție pentru trecerea la următoarea întrebare
function urmatoareaIntrebare() {
    intrebareCurenta++;
    
    if (intrebareCurenta < simulareCurenta.exercitii.length) {
        afiseazaIntrebare();
    } else {
        finalizeazaSimulare();
    }
}

// Funcție pentru finalizarea simulării
function finalizeazaSimulare() {
    const container = document.getElementById('intrebare-container');
    const procentaj = (scor / simulareCurenta.exercitii.length) * 100;
    
    container.innerHTML = `
        <div class="rezultat">
            <h3>Simulare finalizată!</h3>
            <div class="scor">
                <div class="scor-cerc" style="background: conic-gradient(#4CAF50 ${procentaj}%, #f0f0f0 0)">
                    <span>${Math.round(procentaj)}%</span>
                </div>
            </div>
            <p>Ai răspuns corect la ${scor} din ${simulareCurenta.exercitii.length} întrebări.</p>
            <div class="actiuni">
                <button class="btn-reincepe" onclick="initSimulare('${Object.keys(simulariData).find(key => simulariData[key] === simulareCurenta)}')">
                    Reîncepe
                </button>
                <button class="btn-inapoi" onclick="document.getElementById('simulare-container').style.display = 'none'; document.querySelector('.simulation-cards').style.display = 'grid'">
                    Înapoi la categorii
                </button>
            </div>
        </div>
    `;
}

// Adaugă event listener pentru butoanele de simulare
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM încărcat, adăugare event listeners...');
    
    // Event listener pentru butoanele de simulare
    const simulari = document.querySelectorAll('.btn-primary-simulation');
    simulari.forEach(btn => {
        btn.addEventListener('click', () => {
            const categorie = btn.dataset.categorie;
            console.log('Buton simulare apăsat:', categorie);
            if (categorie) {
                initSimulare(categorie);
            }
        });
    });
}); 