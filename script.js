// =========================================================================
// --- BASE DE DONNÉES CONSOLIDÉE (140 Mots de l'École sur 7 Niveaux) ---
// =========================================================================
const fruitsData = [
    // NIVEAU 1 : La rentrée & Les lieux de l'école (20 mots)
    { en: "School", fr: "École", emoji: "🏫", level: 1 },
    { en: "Classroom", fr: "Classe / Salle de classe", emoji: "🏫", level: 1 },
    { en: "Desk", fr: "Bureau (Table)", emoji: "🪑", level: 1 },
    { en: "Playground", fr: "Cour de récréation", emoji: "🛝", level: 1 },
    { en: "Blackboard", fr: "Tableau noir", emoji: "🔲", level: 1 },
    { en: "Recess", fr: "Récréation", emoji: "🔔", level: 1 },
    { en: "Back-to-school", fr: "Rentrée des classes", emoji: "🎒", level: 1 },
    { en: "Teacher", fr: "Professeur / Enseignant", emoji: "🧑‍🏫", level: 1 },
    { en: "Student", fr: "Élève / Étudiant", emoji: "🧑‍🎓", level: 1 },
    { en: "Whiteboard", fr: "Tableau blanc", emoji: "⬜", level: 1 },
    { en: "Chair", fr: "Chaise", emoji: "🪑", level: 1 },
    { en: "Door", fr: "Porte", emoji: "🚪", level: 1 },
    { en: "Window", fr: "Fenêtre", emoji: "🪟", level: 1 },
    { en: "Floor", fr: "Sol", emoji: "🪵", level: 1 },
    { en: "Hallway", fr: "Couloir", emoji: "🚶", level: 1 },
    { en: "Courtyard", fr: "Cour intérieure", emoji: "🧱", level: 1 },
    { en: "School uniform", fr: "Uniforme scolaire", emoji: "👔", level: 1 },
    { en: "First day", fr: "Premier jour", emoji: "🗓️", level: 1 },
    { en: "Clock", fr: "Horloge", emoji: "🕒", level: 1 },
    { en: "Locker", fr: "Casier", emoji: "🔒", level: 1 },

    // NIVEAU 2 : La trousse & Les fournitures de base (Partie 1) (20 mots)
    { en: "Pencil", fr: "Crayon", emoji: "✏️", level: 2 },
    { en: "Pen", fr: "Stylo", emoji: "🖊️", level: 2 },
    { en: "Eraser", fr: "Gomme", emoji: "🧽", level: 2 },
    { en: "Pencil case", fr: "Trousse", emoji: "👝", level: 2 },
    { en: "Sharpener", fr: "Taille-crayon", emoji: "✏️", level: 2 },
    { en: "Ruler", fr: "Règle", emoji: "📏", level: 2 },
    { en: "Scissors", fr: "Ciseaux", emoji: "✂️", level: 2 },
    { en: "Glue", fr: "Colle", emoji: "🧴", level: 2 },
    { en: "Marker", fr: "Feutre / Marqueur", emoji: "🖊️", level: 2 },
    { en: "Highlighter", fr: "Surligneur", emoji: "🖍️", level: 2 },
    { en: "Colored pencil", fr: "Crayon de couleur", emoji: "✏️", level: 2 },
    { en: "Pencil lead", fr: "Mine de crayon", emoji: "✏️", level: 2 },
    { en: "Ink", fr: "Encre", emoji: "✒️", level: 2 },
    { en: "Fountain pen", fr: "Stylo-plume", emoji: "✒️", level: 2 },
    { en: "Correction tape", fr: "Correcteur / Blanco", emoji: "🩹", level: 2 },
    { en: "Compass", fr: "Compas", emoji: "Compass", level: 2 },
    { en: "Protractor", fr: "Rapporteur", emoji: "📐", level: 2 },
    { en: "Set square", fr: "Équerre", emoji: "📐", level: 2 },
    { en: "Chalk", fr: "Craie", emoji: "🖍️", level: 2 },
    { en: "Pencil pouch", fr: "Pochette à crayons", emoji: "👝", level: 2 },

    // NIVEAU 3 : Le sac à dos & Le matériel de bureau (Partie 2) (20 mots)
    { en: "Backpack", fr: "Sac à dos", emoji: "🎒", level: 3 },
    { en: "Notebook", fr: "Cahier", emoji: "📓", level: 3 },
    { en: "Textbook", fr: "Manuel scolaire / Livre", emoji: "📚", level: 3 },
    { en: "Folder", fr: "Chemise / Pochette", emoji: "📁", level: 3 },
    { en: "Sheet of paper", fr: "Feuille de papier", emoji: "📄", level: 3 },
    { en: "Calculator", fr: "Calculatrice", emoji: "🧮", level: 3 },
    { en: "Binder", fr: "Classeur", emoji: "📂", level: 3 },
    { en: "Dictionary", fr: "Dictionnaire", emoji: "📖", level: 3 },
    { en: "Tape", fr: "Ruban adhésif / Scotch", emoji: "🩹", level: 3 },
    { en: "Stapler", fr: "Agrafeuse", emoji: "📎", level: 3 },
    { en: "Paperclip", fr: "Trombone", emoji: "📎", level: 3 },
    { en: "Agenda", fr: "Agenda / Journal de classe", emoji: "📅", level: 3 },
    { en: "Workbook", fr: "Cahier d'exercices", emoji: "📝", level: 3 },
    { en: "Clipboard", fr: "Porte-bloc", emoji: "📋", level: 3 },
    { en: "Post-it", fr: "Note adhésive / Post-it", emoji: "📝", level: 3 },
    { en: "Cardboard", fr: "Carton", emoji: "📦", level: 3 },
    { en: "Magnifying glass", fr: "Loupe", emoji: "🧐", level: 3 },
    { en: "Paintbrush", fr: "Pinceau", emoji: "🖌️", level: 3 },
    { en: "Palette", fr: "Palette de peinture", emoji: "🎨", level: 3 },
    { en: "Desk lamp", fr: "Lampe de bureau", emoji: "💡", level: 3 },

    // NIVEAU 4 : Les matières scolaires principales (20 mots)
    { en: "Mathematics", fr: "Mathématiques", emoji: "🧮", level: 4 },
    { en: "English", fr: "Anglais", emoji: "🇬🇧", level: 4 },
    { en: "History", fr: "Histoire", emoji: "📜", level: 4 },
    { en: "Geography", fr: "Géographie", emoji: "🗺️", level: 4 },
    { en: "Science", fr: "Sciences", emoji: "🧪", level: 4 },
    { en: "Art", fr: "Arts plastiques / Dessin", emoji: "🎨", level: 4 },
    { en: "Music", fr: "Musique", emoji: "🎵", level: 4 },
    { en: "Physical Education", fr: "Éducation physique / Gym", emoji: "🏃", level: 4 },
    { en: "Biology", fr: "Biologie", emoji: "🧬", level: 4 },
    { en: "Chemistry", fr: "Chimie", emoji: "🧪", level: 4 },
    { en: "Physics", fr: "Physique", emoji: "⚡", level: 4 },
    { en: "French", fr: "Français", emoji: "🇫🇷", level: 4 },
    { en: "Literature", fr: "Littérature", emoji: "📚", level: 4 },
    { en: "Computer science", fr: "Informatique", emoji: "💻", level: 4 },
    { en: "Foreign language", fr: "Langue étrangère", emoji: "🗣️", level: 4 },
    { en: "Philosophy", fr: "Philosophie", emoji: "🧠", level: 4 },
    { en: "Drama", fr: "Théâtre (Matière)", emoji: "🎭", level: 4 },
    { en: "Economics", fr: "Économie", emoji: "📊", level: 4 },
    { en: "Religion", fr: "Religion", emoji: "⛪", level: 4 },
    { en: "Geometry", fr: "Géométrie", emoji: "📐", level: 4 },

    // NIVEAU 5 : L'administration, le personnel & La vie quotidienne (20 mots)
    { en: "Principal", fr: "Directeur / Préfet", emoji: "🧑‍💼", level: 5 },
    { en: "Librarian", fr: "Bibliothécaire", emoji: "📚", level: 5 },
    { en: "Janitor", fr: "Concierge / Agent d'entretien", emoji: "🧹", level: 5 },
    { en: "Classmate", fr: "Camarade de classe", emoji: "🧑‍🤝‍🧑", level: 5 },
    { en: "Timetable", fr: "Emploi du temps", emoji: "📅", level: 5 },
    { en: "Report card", fr: "Bulletin scolaire", emoji: "📊", level: 5 },
    { en: "Cafeteria", fr: "Cantine / Réfectoire", emoji: "🍽️", level: 5 },
    { en: "Library", fr: "Bibliothèque", emoji: "📚", level: 5 },
    { en: "School bus", fr: "Bus scolaire", emoji: "🚌", level: 5 },
    { en: "Staff room", fr: "Salle des professeurs", emoji: "☕", level: 5 },
    { en: "Infirmary", fr: "Infirmerie", emoji: "🏥", level: 5 },
    { en: "School nurse", fr: "Infirmière scolaire", 

emoji: "🩺", level: 5 },
    { en: "Secretary", fr: "Secrétaire", emoji: "🧑‍💻", level: 5 },
    { en: "Courtyard supervisor", fr: "Surveillant", emoji: "🗣️", level: 5 },
    { en: "Parent-teacher meeting", fr: "Réunion parents-profs", emoji: "👥", level: 5 },
    { en: "School fees", fr: "Frais scolaires", emoji: "💵", level: 5 },
    { en: "Registration", fr: "Inscription", emoji: "📝", level: 5 },
    { en: "Absence", fr: "Absence", emoji: "❌", level: 5 },
    { en: "Delay", fr: "Retard", emoji: "🕒", level: 5 },
    { en: "Permission slip", fr: "Autorisation parentale", emoji: "📜", level: 5 },

    // NIVEAU 6 : Évaluations, projets & Examens (20 mots)
    { en: "Homework", fr: "Devoirs", emoji: "📝", level: 6 },
    { en: "Exam", fr: "Examen", emoji: "📄", level: 6 },
    { en: "Test", fr: "Interrogation / Contrôle", emoji: "📝", level: 6 },
    { en: "Mark", fr: "Note / Points", emoji: "📊", level: 6 },
    { en: "Question", fr: "Question", emoji: "❓", level: 6 },
    { en: "Answer", fr: "Réponse", emoji: "💡", level: 6 },
    { en: "Project", fr: "Projet", emoji: "📊", level: 6 },
    { en: "Graduation", fr: "Remise des diplômes", emoji: "🎓", level: 6 },
    { en: "Diploma", fr: "Diplôme", emoji: "📜", level: 6 },
    { en: "Certificate", fr: "Certificat", emoji: "🎖️", level: 6 },
    { en: "Presentation", fr: "Exposé / Présentation", emoji: "🗣️", level: 6 },
    { en: "Exercise", fr: "Exercice", emoji: "📝", level: 6 },
    { en: "Mistake", fr: "Erreur / Faute", emoji: "❌", level: 6 },
    { en: "Correction", fr: "Correction", emoji: "🖊️", level: 6 },
    { en: "Average", fr: "Moyenne", emoji: "📊", level: 6 },
    { en: "Punishment", fr: "Punition", emoji: "🔲", level: 6 },
    { en: "Detention", fr: "Retenue / Heure de colle", emoji: "🪑", level: 6 },
    { en: "School trip", fr: "Excursion scolaire", emoji: "🚌", level: 6 },
    { en: "Vacation", fr: "Vacances scolaires", emoji: "🏖️", level: 7 }, // Équilibré
    { en: "Degree", fr: "Grade / Diplôme d'études", emoji: "🎓", level: 6 },

    // NIVEAU 7 : Les verbes de l'apprentissage (L'action en classe) (20 mots)
    { en: "To learn", fr: "Apprendre", emoji: "🧠", level: 7 },
    { en: "To study", fr: "Étudier", emoji: "📖", level: 7 },
    { en: "To read", fr: "Lire", emoji: "📖", level: 7 },
    { en: "To write", fr: "Écrire", emoji: "✍️", level: 7 },
    { en: "To listen", fr: "Écouter", emoji: "👂", level: 7 },
    { en: "To understand", fr: "Comprendre", emoji: "💡", level: 7 },
    { en: "To pass", fr: "Réussir (un examen)", emoji: "✅", level: 7 },
    { en: "To fail", fr: "Échouer / Rater", emoji: "❌", level: 7 },
    { en: "To count", fr: "Compter", emoji: "🧮", level: 7 },
    { en: "To draw", fr: "Dessiner", emoji: "🎨", level: 7 },
    { en: "To repeat", fr: "Répéter", emoji: "🔄", level: 7 },
    { en: "To ask", fr: "Demander / Poser une question", emoji: "❓", level: 7 },
    { en: "To answer", fr: "Répondre", emoji: "🗣️", level: 7 },
    { en: "To spell", fr: "Épeler", emoji: "🔤", level: 7 },
    { en: "To copy", fr: "Copier", emoji: "📝", level: 7 },
    { en: "To erase", fr: "Effacer / Gommer", emoji: "🧽", level: 7 },
    { en: "To practice", fr: "S'exercer / Pratiquer", emoji: "🏋️", level: 7 },
    { en: "To explain", fr: "Expliquer", emoji: "🗣️", level: 7 },
    { en: "To memorize", fr: "Mémoriser", emoji: "🧠", level: 7 },
    { en: "To graduate", fr: "Obtenir son diplôme", emoji: "🎓", level: 7 }
];

// --- ÉTATS GÉNÉRAUX & STATISTIQUES ---
let currentStreak = 0, maxStreak = 0, totalPoints = 0;
let highScores = { quiz: 0, speak: 0, timeattack: 0 };
let favoriteFruits = [];
let errorHistory = []; 
let unlockedBadges = []; 
let audioSpeed = 1.0;
let filterOnlyFavs = false;
let searchDirection = 'EN_FR';
let globalAudioCtx = null; 
let selectedVocabularyLevel = 1; 

// --- CONFIGURATION DES BADGES ---
const badgesDatabase = [
    { id: "first_perfect", title: "Sans Faute !", desc: "Faire un 10/10 en QCM", icon: "🏅", color: "bg-yellow-500" },
    { id: "streak_15", title: "Inarrêtable", desc: "Atteindre une série de 15 bonnes réponses", icon: "🔥", color: "bg-orange-500" },
    { id: "time_20", title: "Chasseur de Chrono", desc: "Marquer 20 points en Time Attack", icon: "⚡", color: "bg-cyan-500" },
    { id: "polyglotte", title: "Major", desc: "Débloquer de nouvelles matières", icon: "🗣️", color: "bg-purple-500" }
];

function getNextExerciseWord() {
    const currentLevelWords = fruitsData.filter(f => f.level === parseInt(selectedVocabularyLevel));
    const currentLevelErrors = errorHistory.filter(err => err.level === parseInt(selectedVocabularyLevel));
    if (currentLevelErrors.length > 0 && Math.random() < 0.35) {
        return currentLevelErrors[Math.floor(Math.random() * currentLevelErrors.length)];
    }
    return currentLevelWords[Math.floor(Math.random() * currentLevelWords.length)];
}

function checkAndUnlockBadge(badgeId) {
    if (!unlockedBadges.includes(badgeId)) {
        unlockedBadges.push(badgeId);
        localStorage.setItem('oe_unlocked_badges_school', JSON.stringify(unlockedBadges));
        triggerConfetti();
        if (typeof renderBadgesUI === 'function') renderBadgesUI();
    }
}

// --- MODULE AUDIO (Synthèse Vocale) ---
let preferredVoice = null;
function initVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return;
    let bestVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('en') && (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Neural') || voice.name.includes('Premium')));
    if (!bestVoice) bestVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('en') && !voice.name.includes('Desktop'));
    if (!bestVoice) bestVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('en'));
    if (bestVoice) preferredVoice = bestVoice;
}
if ('speechSynthesis' in window) {
    if (window.speechSynthesis.onvoiceschanged !== undefined) window.speechSynthesis.onvoiceschanged = initVoices;
    initVoices();
}

function setAudioSpeed(speed) {
    audioSpeed = speed;
    const btnNormal = document.getElementById('speed-normal');
    const btnSlow = document.getElementById('speed-slow');
    if (btnNormal && btnSlow) {
        if (speed === 1.0) {
            btnNormal.className = "px-2 py-1 bg-brandBlue text-white rounded font-bold";
            btnSlow.className = "px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded flex items-center gap-1";
        } else {
            btnNormal.className = "px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded font-bold";
            btnSlow.className = "px-2 py-1 bg-brandBlue text-white rounded flex items-center gap-1";
        }
    }
}

function playAudio(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = audioSpeed;
        if (!preferredVoice) initVoices();
        if (preferredVoice) utterance.voice = preferredVoice;
        window.speechSynthesis.speak(utterance);
    } else {
        const encodedText = encodeURIComponent(text.toLowerCase());
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodedText}`;
        const audio = new Audio(audioUrl);
        audio.playbackRate = audioSpeed;
        audio.play().catch(e => console.log("Audio failure:", e));
    }
}

function playSoundEffect(type) {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    if (!globalAudioCtx) globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (globalAudioCtx.state === 'suspended') globalAudioCtx.resume();
    const osc = globalAudioCtx.createOscillator();
    const gain = globalAudioCtx.createGain();
    osc.connect(gain); gain.connect(globalAudioCtx.destination);
    if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, globalAudioCtx.currentTime);
        osc.frequency.setValueAtTime(659.25, globalAudioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, globalAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, globalAudioCtx.currentTime + 0.3);
        osc.start(); osc.stop(globalAudioCtx.currentTime + 0.3);
    } else if (type === 'fail') {
        osc.frequency.setValueAtTime(196.00, globalAudioCtx.currentTime);
        osc.frequency.setValueAtTime(146.83, globalAudioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, globalAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, globalAudioCtx.currentTime + 0.4);
        osc.start(); osc.stop(globalAudioCtx.currentTime + 0.4);
    }
}

function triggerConfetti() {
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = ['#F58634', '#52B788', '#1C3D5A', '#FFD166'][Math.floor(Math.random() * 4)];
        confetti.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
        confetti.style.animationDelay = Math.random() * 1.2 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// --- CARNET DE REVISIONS ---
function registerError(fruitObj) {
    if (!errorHistory.some(f => f.en === fruitObj.en)) {
        errorHistory.push(fruitObj);
        localStorage.setItem('oe_error_history_school', JSON.stringify(errorHistory));
    }
}
function removeError(englishName) {
    errorHistory = errorHistory.filter(f => f.en !== englishName);
    localStorage.setItem('oe_error_history_school', JSON.stringify(errorHistory));
}

function getUserPlayerLevel() {
    return Math.floor(totalPoints / 150) + 1;
}

// --- ADAPTATION DES GRADES (Scolaire) ---
function updateLevelAndTitle() {
    const pLevel = getUserPlayerLevel();
    const levelEl = document.getElementById('user-level');
    const titleEl = document.getElementById('user-title');
    if (levelEl) levelEl.innerText = pLevel;

    let title = "Novice Scolaire";
    if (pLevel >= 3) title = "Élève Appliqué";
    if (pLevel >= 6) title = "Délégué de Classe";
    if (pLevel >= 9) title = "Major de Promotion";
    if (pLevel >= 12) title = "Professeur Adjoint";
    if (pLevel >= 15) title = "Directeur Académique";

    if (titleEl) titleEl.innerText = title;
    if (typeof updateLevelLockUI === 'function') updateLevelLockUI();
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('oe_dark_mode', isDark);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = isDark ? "fa-solid fa-sun text-yellow-300" : "fa-solid fa-moon text-yellow-300";
}

function resetStats() {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser toutes vos statistiques et votre progression École ?")) {
        const keysToRemove = ['oe_total_points_school', 'oe_high_quiz_school', 'oe_high_speak_school', 'oe_high_timeattack_school', 'oe_max_streak_school', 'oe_fav_school', 'oe_error_history_school', 'oe_unlocked_badges_school'];
        keysToRemove.forEach(key => localStorage.removeItem(key));
        totalPoints = 0; highScores = { quiz: 0, speak: 0, timeattack: 0 }; maxStreak = 0; currentStreak = 0; errorHistory = []; unlockedBadges = []; favoriteFruits = [];
        document.getElementById('total-points').innerText = totalPoints;
        document.getElementById('streak-count').innerText = currentStreak;
        document.getElementById('stat-high-quiz').innerText = 0;
        document.getElementById('stat-high-speak').innerText = 0;
        document.getElementById('stat-high-timeattack').innerText = 0;
        document.getElementById('stat-max-streak').innerText = 0;
        updateLevelAndTitle();
        if (typeof renderDict === 'function') renderDict();
        if (typeof updateFlashcard === 'function') updateFlashcard();
        if (typeof renderBadgesUI === 'function') renderBadgesUI();
        if (typeof renderErrorHistory === 'function') renderErrorHistory();
        alert("Statistiques Académiques réinitialisées !");
    }
}

function saveStats() {
    localStorage.setItem('oe_total_points_school', totalPoints);
    localStorage.setItem('oe_high_quiz_school', highScores.quiz);
    localStorage.setItem('oe_high_speak_school', highScores.speak); 
    localStorage.setItem('oe_high_timeattack_school', highScores.timeattack);
    localStorage.setItem('oe_max_streak_school', maxStreak);
}

function loadStats() {
    totalPoints = parseInt(localStorage.getItem('oe_total_points_school')) || 0;
    highScores.quiz = parseInt(localStorage.getItem('oe_high_quiz_school')) || 0;
    highScores.speak = parseInt(localStorage.getItem('oe_high_speak_school')) || 0; 
    highScores.timeattack = parseInt(localStorage.getItem('oe_high_timeattack_school')) || 0;
    maxStreak = parseInt(localStorage.getItem('oe_max_streak_school')) || 0;
    favoriteFruits = JSON.parse(localStorage.getItem('oe_fav_school')) || [];
    errorHistory = JSON.parse(localStorage.getItem('oe_error_history_school')) || [];
    unlockedBadges = JSON.parse(localStorage.getItem('oe_unlocked_badges_school')) || [];
    
    if (localStorage.getItem('oe_dark_mode') === 'true') {
        document.documentElement.classList.add('dark');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.className = "fa-solid fa-sun text-yellow-300";
    }
    const totalPointsEl = document.getElementById('total-points');
    if (totalPointsEl) totalPointsEl.innerText = totalPoints;
    updateLevelAndTitle();
}