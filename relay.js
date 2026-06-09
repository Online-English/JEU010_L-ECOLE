// =========================================================================
// --- VARIABLES LOCALES DE GESTION DES JEUX & MODES ---
// =========================================================================
let slideshowTimeout = null;
let isSlideshowActive = false;
let currentFlashIndex = 0;
let quizTimeout = null;  
let speakTimeout = null; 

let quizStep = 1;
let quizScore = 0;
let currentQuizItem = null;
let currentSpeakItem = null;
let speakScore = 0; 
let selectedEnglishNode = null;
let selectedFrenchNode = null;
let isProcessingMatch = false; 

// Variables pour le mode Contre-la-montre (Time Attack)
let taTimerInterval = null;
let taTimeout = null; 
let taTimeLeft = 60;
let taScore = 0;
let currentTAItem = null;

// =========================================================================
// --- INITIALISATION AU DÉMARRAGE ---
// =========================================================================
window.onload = () => {
    loadStats(); 
    if (document.getElementById('stat-high-quiz')) document.getElementById('stat-high-quiz').innerText = highScores.quiz;
    if (document.getElementById('stat-high-speak')) document.getElementById('stat-high-speak').innerText = highScores.speak || 0;
    if (document.getElementById('stat-high-timeattack')) document.getElementById('stat-high-timeattack').innerText = highScores.timeattack || 0;
    if (document.getElementById('stat-max-streak')) document.getElementById('stat-max-streak').innerText = maxStreak;
    
    updateLevelLockUI();
    renderDict();
    updateFlashcard();
    renderBadgesUI();
    renderErrorHistory();
};

// =========================================================================
// --- SYNCHRONISATION DU MENU DÉROULANT DES MATIÈRES ---
// =========================================================================
function setVocabLevel(level) {
    selectedVocabularyLevel = parseInt(level);
    const selectEl = document.getElementById('vocab-level-select');
    if (selectEl) selectEl.value = level;
    
    renderDict();
    updateFlashcard();
    resetQuizToMenu();
}

function updateLevelLockUI() {
    const playerLevel = getUserPlayerLevel();
    const hint = document.getElementById('vocab-unlock-hint');
    const selectEl = document.getElementById('vocab-level-select');
    if (!hint || !selectEl) return;

    const levelsConfig = [
        { level: 2, req: 3, label: "Niveau 2 : La trousse & Les fournitures" },
        { level: 3, req: 6, label: "Niveau 3 : Le sac à dos & Le matériel" },
        { level: 4, req: 9, label: "Niveau 4 : Les matières scolaires" },
        { level: 5, req: 12, label: "Niveau 5 : L'administration & Le personnel" },
        { level: 6, req: 15, label: "Niveau 6 : Évaluations & Projets" },
        { level: 7, req: 18, label: "Niveau 7 : Verbes de l'apprentissage" }
    ];

    levelsConfig.forEach(cfg => {
        const opt = document.getElementById(`opt-level-${cfg.level}`);
        if (!opt) return;

        if (playerLevel >= cfg.req) {
            opt.disabled = false;
            opt.innerText = cfg.label;
        } else {
            opt.disabled = true;
            opt.innerText = `🔒 Niv.${cfg.level} (Requis Jv. ${cfg.req})`;
            
            if (selectedVocabularyLevel === cfg.level) {
                selectedVocabularyLevel = 1;
                selectEl.value = "1";
            }
        }
    });

    if (playerLevel >= 18) {
        hint.innerText = "Félicitations ! Tout le programme scolaire est entièrement débloqué.";
    } else {
        const nextUnlock = levelsConfig.find(cfg => playerLevel < cfg.req);
        if (nextUnlock) {
            hint.innerText = `Astuce : Atteignez le niveau joueur ${nextUnlock.req} pour débloquer la catégorie suivante !`;
        }
    }
}

// =========================================================================
// --- INTERCEPTEUR & ROUTEUR DE CHANGEMENT D'ONGLET ---
// =========================================================================
function switchTab(event, tabName) {
    stopSlideshow();
    stopTimeAttack();
    
    if (quizTimeout) clearTimeout(quizTimeout);
    if (speakTimeout) clearTimeout(speakTimeout);
    
    resetQuizToMenu();

    document.querySelectorAll('.tab-content').forEach(el => { 
        el.classList.add('hidden'); 
        el.classList.remove('active'); 
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = "tab-btn bg-gray-100 dark:bg-gray-700 text-brandBlue dark:text-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition";
    });

    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) {
        targetTab.classList.remove('hidden'); 
        targetTab.classList.add('active');
    }
    
    if (event && event.currentTarget) {
        event.currentTarget.className = "tab-btn bg-brandBlue text-white px-4 py-2 rounded-lg font-medium text-sm transition";
    }

    const autoplayContainer = document.getElementById('autoplay-container');
    if (autoplayContainer) {
        autoplayContainer.className = tabName === 'flash' ? "flex items-center gap-2" : "hidden";
    }

    if (tabName === 'speak') initSpeak();
    if (tabName === 'match') initMatching();
    if (tabName === 'stats') {
        renderBadgesUI();
        renderErrorHistory();
    }
}

function processAnswerResult(isCorrect) {
    if (isCorrect) {
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
        playSoundEffect('success');
        totalPoints += 10;
        if (document.getElementById('total-points')) document.getElementById('total-points').innerText = totalPoints;
        updateLevelAndTitle();
        if (currentStreak >= 15) checkAndUnlockBadge("streak_15");
    } else {
        currentStreak = 0;
        playSoundEffect('fail');
    }
    if (document.getElementById('streak-count')) document.getElementById('streak-count').innerText = currentStreak;
    if (document.getElementById('stat-max-streak')) document.getElementById('stat-max-streak').innerText = maxStreak;
    saveStats();
}

// =========================================================================
// --- MODULE 1 : DICTIONNAIRE INVERSÉ ---
// =========================================================================
function toggleDirectionDico() {
    searchDirection = (searchDirection === 'EN_FR') ? 'FR_EN' : 'EN_FR';
    const label = document.getElementById('direction-label');
    const input = document.getElementById('search-input');
    
    if (label) label.innerText = (searchDirection === 'EN_FR') ? 'FR ➔ EN' : 'EN ➔ FR';
    if (input) input.placeholder = (searchDirection === 'EN_FR') ? 'Rechercher un terme scolaire...' : 'Search for a school item...';
    
    filterWords();
}

function renderDict(data = null) {
    const container = document.getElementById('dict-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (data === null) {
        data = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    }
    if (data.length === 0) {
        container.innerHTML = `<p class="text-center text-sm py-4 text-gray-400">Aucun élément trouvé dans cette zone.</p>`;
        return;
    }

    data.forEach(item => {
        const isFav = favoriteFruits.includes(item.en);
        const div = document.createElement('div');
        div.className = "bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center cursor-pointer active:bg-gray-100 dark:active:bg-gray-700 transition duration-150";
        div.onclick = () => playAudio(item.en);
        
        const primaryText = (searchDirection === 'EN_FR') ? item.en : item.fr;
        const secondaryText = (searchDirection === 'EN_FR') ? item.fr : item.en;

        div.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-3xl">${item.emoji}</span>
                <div>
                    <p class="font-bold text-sm sm:text-base text-brandBlue dark:text-white">${primaryText}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${secondaryText}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="toggleFavorite('${item.en}', event)" class="p-2 text-base sm:text-xl transition text-gray-300 dark:text-gray-600 hover:text-yellow-400">
                    <i class="${isFav ? 'fa-solid text-yellow-400' : 'fa-regular'} fa-star"></i>
                </button>
                <span class="text-brandBlue dark:text-gray-400 p-2 text-base sm:text-lg"><i class="fa-solid fa-volume-high"></i></span>
            </div>
        `;
        container.appendChild(div);
    });
}

function filterWords() {
    const queryEl = document.getElementById('search-input');
    const query = queryEl ? queryEl.value.toLowerCase() : '';
    
    let sourceData = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    if (filterOnlyFavs) sourceData = sourceData.filter(f => favoriteFruits.includes(f.en));
    
    const filtered = sourceData.filter(f => f.en.toLowerCase().includes(query) || f.fr.toLowerCase().includes(query));
    renderDict(filtered);
}

function toggleFavorite(englishName, event) {
    if (event) event.stopPropagation();
    const index = favoriteFruits.indexOf(englishName);
    if (index > -1) favoriteFruits.splice(index, 1);
    else favoriteFruits.push(englishName);
    localStorage.setItem('oe_fav_school', JSON.stringify(favoriteFruits));
    filterWords();
}

function toggleFavFilter() {
    filterOnlyFavs = !filterOnlyFavs;
    const btn = document.getElementById('fav-filter-btn');
    if (btn) {
        btn.className = filterOnlyFavs 
            ? "px-4 bg-yellow-500 text-white border-2 border-yellow-500 rounded-xl transition"
            : "px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 hover:text-yellow-500 transition";
    }
    filterWords();
}

// =========================================================================
// --- MODULE 2 : FLASHCARDS & REPLAY DIAPORAMA ---
// =========================================================================
function updateFlashcard() {
    const card = document.getElementById('main-flashcard');
    if (!card) return;
    card.classList.remove('flipped');
    
    const activeLevelWords = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    if (activeLevelWords.length === 0) return;
    if (currentFlashIndex >= activeLevelWords.length) currentFlashIndex = 0;

    setTimeout(() => {
        const item = activeLevelWords[currentFlashIndex];
        if (document.getElementById('flash-emoji')) document.getElementById('flash-emoji').innerText = item.emoji;
        if (document.getElementById('flash-en')) document.getElementById('flash-en').innerText = item.en;
        if (document.getElementById('flash-fr')) document.getElementById('flash-fr').innerText = item.fr;
        
        const autoplayCb = document.getElementById('autoplay-checkbox');
        if (autoplayCb && autoplayCb.checked && !isSlideshowActive) {
            playAudio(item.en);
        }
    }, 150);
}

function nextFlashcard() { 
    const maxLen = fruitsData.filter(f => f.level === selectedVocabularyLevel).length;
    if (maxLen === 0) return;
    currentFlashIndex = (currentFlashIndex + 1) % maxLen; 
    updateFlashcard(); 
}

function prevFlashcard() { 
    const maxLen = fruitsData.filter(f => f.level === selectedVocabularyLevel).length;
    if (maxLen === 0) return;
    currentFlashIndex = (currentFlashIndex - 1 + maxLen) % maxLen; 
    updateFlashcard(); 
}

function toggleSlideshow() { if (isSlideshowActive) stopSlideshow(); else startSlideshow(); }

function startSlideshow() {
    isSlideshowActive = true;
    const btn = document.getElementById('slideshow-btn');
    if (btn) {
        btn.className = "bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow transition hover:scale-105 active:scale-95";
        btn.innerHTML = `<i class="fa-solid fa-square mr-1"></i> Arrêter le Diaporama`;
    }
    
    ['flash-prev-btn', 'flash-next-btn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.disabled = true; el.classList.add('opacity-40'); }
    });
    runSlideshowLoop();
}

function stopSlideshow() {
    isSlideshowActive = false;
    clearTimeout(slideshowTimeout);
    
    const btn = document.getElementById('slideshow-btn');
    if (btn) {
        btn.className = "bg-brandGreen text-white px-4 py-2 rounded-xl text-sm font-bold shadow transition hover:scale-105 active:scale-95";
        btn.innerHTML = `<i class="fa-solid fa-play mr-1"></i> Mode Diaporama`;
    }
    
    ['flash-prev-btn', 'flash-next-btn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.disabled = false; el.classList.remove('opacity-40'); }
    });
    
    const card = document.getElementById('main-flashcard');
    if (card) card.classList.remove('flipped');
}

function runSlideshowLoop() {
    if (!isSlideshowActive) return;
    const activeLevelWords = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    if (activeLevelWords.length === 0) return;
    
    const card = document.getElementById('main-flashcard');
    if (card) card.classList.remove('flipped');
    
    playAudio(activeLevelWords[currentFlashIndex].en);

    slideshowTimeout = setTimeout(() => {
        if (!isSlideshowActive) return;
        if (card) card.classList.add('flipped');
        
        slideshowTimeout = setTimeout(() => {
            if (!isSlideshowActive) return;
            currentFlashIndex = (currentFlashIndex + 1) % activeLevelWords.length;
            updateFlashcard();
            runSlideshowLoop();
        }, 3000);
    }, 2500);
}

// =========================================================================
// --- MODULE 3 : INTERFACE & STRATÉGIE DU QUIZ CLASSIQUE ---
// =========================================================================
function resetQuizToMenu() {
    if (document.getElementById('quiz-mode-menu')) document.getElementById('quiz-mode-menu').classList.remove('hidden');
    if (document.getElementById('quiz-classic-zone')) document.getElementById('quiz-classic-zone').classList.add('hidden');
    if (document.getElementById('quiz-timeattack-zone')) document.getElementById('quiz-timeattack-zone').classList.add('hidden');
}

function launchStandardQuiz() {
    if (document.getElementById('quiz-mode-menu')) document.getElementById('quiz-mode-menu').classList.add('hidden');
    if (document.getElementById('quiz-classic-zone')) document.getElementById('quiz-classic-zone').classList.remove('hidden');
    quizStep = 1; 
    quizScore = 0; 
    if (document.getElementById('quiz-score')) document.getElementById('quiz-score').innerText = quizScore; 
    generateQuizQuestion();
}

function generateQuizQuestion() {
    if (quizStep > 10) {
        if (quizScore > highScores.quiz) { highScores.quiz = quizScore; saveStats(); }
        if (quizScore === 10) {
            triggerConfetti();
            checkAndUnlockBadge("first_perfect");
        }
        alert(`Quiz terminé ! Score de l'élève : ${quizScore}/10.`);
        if (document.getElementById('stat-high-quiz')) document.getElementById('stat-high-quiz').innerText = highScores.quiz;
        resetQuizToMenu();
        return;
    }
    
    if (document.getElementById('quiz-current')) document.getElementById('quiz-current').innerText = quizStep;
    currentQuizItem = getNextExerciseWord(); 
    if (document.getElementById('quiz-question')) document.getElementById('quiz-question').innerText = currentQuizItem.en;

    const activePack = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    let choices = [currentQuizItem.fr];
    while (choices.length < Math.min(4, activePack.length)) {
        let randomFr = activePack[Math.floor(Math.random() * activePack.length)].fr;
        if (!choices.includes(randomFr)) choices.push(randomFr);
    }
    choices.sort(() => Math.random() - 0.5);

    const container = document.getElementById('quiz-options');
    if (!container) return;
    container.innerHTML = '';
    
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = "w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-brandBlue dark:text-white p-3 rounded-xl font-medium text-left transition hover:border-brandBlue";
        btn.innerText = choice;
        btn.onclick = () => checkQuizAnswer(btn, choice);
        container.appendChild(btn);
    });
}

function checkQuizAnswer(button, selected) {
    document.querySelectorAll('#quiz-options button').forEach(b => b.disabled = true);
    if (selected === currentQuizItem.fr) {
        button.className = "w-full bg-brandGreen text-white p-3 rounded-xl font-medium text-left transition";
        quizScore++;
        if (document.getElementById('quiz-score')) document.getElementById('quiz-score').innerText = quizScore;
        removeError(currentQuizItem.en);
        processAnswerResult(true);
    } else {
        button.className = "w-full bg-red-500 text-white p-3 rounded-xl font-medium text-left transition";
        registerError(currentQuizItem);
        processAnswerResult(false);
        document.querySelectorAll('#quiz-options button').forEach(b => {
            if (b.innerText === currentQuizItem.fr) b.className = "w-full bg-brandGreen text-white p-3 rounded-xl font-medium text-left transition";
        });
    }
    quizTimeout = setTimeout(() => { quizStep++; generateQuizQuestion(); }, 1200);
}

// =========================================================================
// --- MODULE 4 : MODE CONTRE-LA-MONTRE (TIME ATTACK) ---
// =========================================================================
function launchTimeAttack() {
    if (document.getElementById('quiz-mode-menu')) document.getElementById('quiz-mode-menu').classList.add('hidden');
    if (document.getElementById('quiz-timeattack-zone')) document.getElementById('quiz-timeattack-zone').classList.remove('hidden');
    taScore = 0; 
    taTimeLeft = 60;
    if (document.getElementById('ta-score')) document.getElementById('ta-score').innerText = taScore;
    if (document.getElementById('ta-timer')) document.getElementById('ta-timer').innerText = taTimeLeft;
    generateTAQuestion();

    clearInterval(taTimerInterval);
    taTimerInterval = setInterval(() => {
        taTimeLeft--;
        if (document.getElementById('ta-timer')) document.getElementById('ta-timer').innerText = taTimeLeft;
        if (taTimeLeft <= 0) stopTimeAttack(true);
    }, 1000);
}

function generateTAQuestion() {
    currentTAItem = getNextExerciseWord();
    if (document.getElementById('ta-question')) document.getElementById('ta-question').innerText = currentTAItem.en;
    
    const activePack = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    let choices = [currentTAItem.fr];
    while (choices.length < Math.min(4, activePack.length)) {
        let randomFr = activePack[Math.floor(Math.random() * activePack.length)].fr;
        if (!choices.includes(randomFr)) choices.push(randomFr);
    }
    choices.sort(() => Math.random() - 0.5);

    const container = document.getElementById('ta-options');
    if (!container) return;
    container.innerHTML = '';
    
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = "w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-brandBlue dark:text-white p-3 rounded-xl font-medium text-left transition hover:border-brandOrange";
        btn.innerText = choice;
        btn.onclick = () => checkTAAnswer(btn, choice);
        container.appendChild(btn);
    });
}

function checkTAAnswer(button, selected) {
    document.querySelectorAll('#ta-options button').forEach(b => b.disabled = true);
    if (selected === currentTAItem.fr) {
        taScore++;
        if (document.getElementById('ta-score')) document.getElementById('ta-score').innerText = taScore;
        removeError(currentTAItem.en);
        processAnswerResult(true);
        generateTAQuestion(); 
    } else {
        button.className = "w-full bg-red-500 text-white p-3 rounded-xl font-medium text-left transition";
        registerError(currentTAItem);
        processAnswerResult(false);
        taTimeout = setTimeout(() => { generateTAQuestion(); }, 400);
    }
}

function stopTimeAttack(isFinishedFinished = false) {
    clearInterval(taTimerInterval);
    if (taTimeout) clearTimeout(taTimeout);
    if (isFinishedFinished) {
        alert(`Fin du Chrono ! Mots validés : ${taScore} !`);
        if (taScore >= 20) checkAndUnlockBadge("time_20");
        if (taScore > highScores.timeattack) {
            highScores.timeattack = taScore;
            if (document.getElementById('stat-high-timeattack')) document.getElementById('stat-high-timeattack').innerText = taScore;
            saveStats();
        }
        resetQuizToMenu();
    }
}

// =========================================================================
// --- MODULE 5 : QUIZ DE RECONNAISSANCE VOCALE (PRONONCIATION) ---
// =========================================================================
function initSpeak() {
    speakScore = 0;
    if (document.getElementById('speak-score')) document.getElementById('speak-score').innerText = speakScore;
    generateSpeakQuestion();
}

function generateSpeakQuestion() {
    currentSpeakItem = getNextExerciseWord();
    if (document.getElementById('speak-emoji')) document.getElementById('speak-emoji').innerText = currentSpeakItem.emoji;
    if (document.getElementById('speak-prompt-fr')) document.getElementById('speak-prompt-fr').innerText = currentSpeakItem.fr;
    
    const resultBox = document.getElementById('speech-result');
    if (resultBox) resultBox.className = "hidden text-base font-bold p-3 rounded-xl";
    if (document.getElementById('speech-status')) document.getElementById('speech-status').innerText = "Cliquez sur le micro pour parler";
    if (document.getElementById('mic-pulse')) document.getElementById('mic-pulse').classList.add('hidden');
}

function startSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("La reconnaissance vocale n'est pas supportée sur ce navigateur. Veuillez utiliser Google Chrome ou Safari.");
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 
    recognition.interimResults = false; 
    recognition.maxAlternatives = 1;

    const pulse = document.getElementById('mic-pulse');
    const statusText = document.getElementById('speech-status');
    const resultBox = document.getElementById('speech-result');

    if (pulse) pulse.classList.remove('hidden');
    if (statusText) statusText.innerText = "Écoute active... Parlez !";
    if (resultBox) resultBox.className = "hidden text-base font-bold p-3 rounded-xl";
    
    recognition.start();

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript.trim().toLowerCase();
        const targetWord = currentSpeakItem.en.toLowerCase();
        
        if (!resultBox) return;
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `L'élève a dit : <span class="italic">"${speechResult}"</span>`;

        if (speechResult === targetWord) {
            resultBox.classList.add('bg-green-100', 'text-green-700', 'dark:bg-green-900/30', 'dark:text-green-400');
            if (statusText) statusText.innerText = "Excellente prononciation ! +10 XP";
            speakScore++;
            if (document.getElementById('speak-score')) document.getElementById('speak-score').innerText = speakScore;
            
            if (speakScore > highScores.speak) {
                highScores.speak = speakScore;
                if (document.getElementById('stat-high-speak')) document.getElementById('stat-high-speak').innerText = speakScore;
                saveStats();
            }
            removeError(currentSpeakItem.en); 
            processAnswerResult(true);
            speakTimeout = setTimeout(() => generateSpeakQuestion(), 2000);
        } else {
            resultBox.classList.add('bg-red-100', 'text-red-700', 'dark:bg-red-900/30', 'dark:text-red-400');
            if (statusText) statusText.innerText = "Essaye encore !";
            registerError(currentSpeakItem); 
            processAnswerResult(false);
        }
    };
    
    recognition.onspeechend = () => { recognition.stop(); if (pulse) pulse.classList.add('hidden'); };
    recognition.onerror = () => { if (pulse) pulse.classList.add('hidden'); if (statusText) statusText.innerText = "Aucun son détecté. Réessayez."; };
}

// =========================================================================
// --- MODULE 6 : MATCHING GAME (ASSOCIATION DE CARTES) ---
// =========================================================================
function initMatching() {
    isProcessingMatch = false;
    const grid = document.getElementById('matching-grid'); 
    if (!grid) return;
    grid.innerHTML = '';
    
    const activePack = fruitsData.filter(f => f.level === selectedVocabularyLevel);
    let shuffled = [...activePack].sort(() => Math.random() - 0.5).slice(0, 4);
    let englishCards = shuffled.map(f => ({ text: f.en, type: 'en', id: f.en }));
    let frenchCards = shuffled.map(f => ({ text: f.fr, type: 'fr', id: f.en }));
    
    englishCards.sort(() => Math.random() - 0.5); 
    frenchCards.sort(() => Math.random() - 0.5);

    for (let i = 0; i < englishCards.length; i++) {
        const btnEn = document.createElement('button');
        btnEn.className = "bg-white dark:bg-gray-800 border-2 border-brandBlue text-brandBlue dark:text-cyan-400 p-3 rounded-xl font-bold text-center text-xs sm:text-sm";
        btnEn.innerText = englishCards[i].text; 
        btnEn.onclick = () => { btnEn.dataset.id = englishCards[i].id; btnEn.dataset.type = 'en'; handleMatchSelect(btnEn); };

        const btnFr = document.createElement('button');
        btnFr.className = "bg-white dark:bg-gray-800 border-2 border-brandOrange text-brandOrange p-3 rounded-xl font-bold text-center text-xs sm:text-sm";
        btnFr.innerText = frenchCards[i].text; 
        btnFr.onclick = () => { btnFr.dataset.id = frenchCards[i].id; btnFr.dataset.type = 'fr'; handleMatchSelect(btnFr); };

        grid.appendChild(btnEn); 
        grid.appendChild(btnFr);
    }
}

function handleMatchSelect(node) {
    if (isProcessingMatch) return;
    if (node.dataset.type === 'en') {
        if (selectedEnglishNode) selectedEnglishNode.classList.remove('bg-brandBlue/20', 'dark:bg-brandBlue/40');
        selectedEnglishNode = node; 
        selectedEnglishNode.classList.add('bg-brandBlue/20', 'dark:bg-brandBlue/40');
    } else {
        if (selectedFrenchNode) selectedFrenchNode.classList.remove('bg-brandOrange/20', 'dark:bg-brandOrange/40');
        selectedFrenchNode = node; 
        selectedFrenchNode.classList.add('bg-brandOrange/20', 'dark:bg-brandOrange/40');
    }

    if (selectedEnglishNode && selectedFrenchNode) {
        if (selectedEnglishNode.dataset.id === selectedFrenchNode.dataset.id) {
            selectedEnglishNode.className = "bg-brandGreen text-white p-3 rounded-xl font-bold text-center pointer-events-none transition text-xs sm:text-sm matched-card";
            selectedFrenchNode.className = "bg-brandGreen text-white p-3 rounded-xl font-bold text-center pointer-events-none transition text-xs sm:text-sm matched-card";
            removeError(selectedEnglishNode.dataset.id); 
            processAnswerResult(true);
            selectedEnglishNode = null; 
            selectedFrenchNode = null;

            const totalMatched = document.querySelectorAll('.matched-card').length;
            if (totalMatched === 8) {
                setTimeout(() => { triggerConfetti(); alert("Excellent ! Grille complétée !"); initMatching(); }, 500);
            }
        } else {
            isProcessingMatch = true; 
            const eNode = selectedEnglishNode, fNode = selectedFrenchNode;
            eNode.className = "bg-red-500 text-white p-3 rounded-xl font-bold text-center text-xs sm:text-sm";
            fNode.className = "bg-red-500 text-white p-3 rounded-xl font-bold text-center text-xs sm:text-sm";
            
            const failFruit = fruitsData.find(f => f.en === eNode.dataset.id);
            if (failFruit) registerError(failFruit);
            processAnswerResult(false);
            
            setTimeout(() => {
                eNode.className = "bg-white dark:bg-gray-800 border-2 border-brandBlue text-brandBlue dark:text-cyan-400 p-3 rounded-xl font-bold text-center text-xs sm:text-sm";
                fNode.className = "bg-white dark:bg-gray-800 border-2 border-brandOrange text-brandOrange p-3 rounded-xl font-bold text-center text-xs sm:text-sm";
                isProcessingMatch = false; 
            }, 800);
            selectedEnglishNode = null; 
            selectedFrenchNode = null;
        }
    }
}

// =========================================================================
// --- MODULE 7 & 8 : PANNEAUX TROPHÉES & CARNET DE RÉVISIONS ---
// =========================================================================
function renderBadgesUI() {
    const container = document.getElementById('badges-list'); 
    if (!container) return; 
    container.innerHTML = '';
    
    badgesDatabase.forEach(badge => {
        const isUnlocked = unlockedBadges.includes(badge.id); 
        const div = document.createElement('div');
        div.className = `p-3 rounded-xl border flex items-center gap-3 transition ${isUnlocked ? 'bg-white dark:bg-gray-800 border-green-200 dark:border-green-900/40 opacity-100 shadow-sm' : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 opacity-40'}`;
        div.innerHTML = `
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-inner ${isUnlocked ? badge.color + ' text-white' : 'bg-gray-300 text-gray-500 dark:bg-gray-700'}">
                ${badge.icon}
            </div>
            <div class="text-left">
                <h4 class="font-bold text-xs text-brandBlue dark:text-white flex items-center gap-1">${badge.title} ${isUnlocked ? '<i class="fa-solid fa-circle-check text-brandGreen text-[10px]"></i>' : ''}</h4>
                <p class="text-[10px] text-gray-400 font-medium leading-tight">${badge.desc}</p>
            </div>`;
        container.appendChild(div);
    });
}

function renderErrorHistory() {
    const container = document.getElementById('error-history-list'); 
    if (!container) return; 
    container.innerHTML = '';
    
    if (errorHistory.length === 0) {
        container.innerHTML = `<p class="text-gray-400 italic text-center text-xs py-4">Aucun mot en révision. Félicitations !</p>`; 
        return;
    }
    
    errorHistory.forEach(item => {
        const div = document.createElement('div'); 
        div.className = "flex items-center justify-between p-2 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-lg text-xs";
        div.innerHTML = `
            <div class="flex items-center gap-2">
                <span>${item.emoji}</span>
                <span class="font-bold text-brandBlue dark:text-red-300">${item.en}</span>
                <span class="text-gray-400">(${item.fr}) - Liste ${item.level}</span>
            </div>
            <button onclick="clearWordFromRevision('${item.en}')" class="text-brandGreen hover:underline font-bold transition text-[10px]"><i class="fa-solid fa-check"></i> Acquis</button>`;
        container.appendChild(div);
    });
}

function clearWordFromRevision(englishName) { 
    removeError(englishName); 
    renderErrorHistory(); 
}