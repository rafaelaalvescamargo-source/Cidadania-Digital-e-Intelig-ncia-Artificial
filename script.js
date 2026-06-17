// ==========================================
// 1. ROTEAMENTO DE PÁGINAS MÚLTIPLAS (SPA)
// ==========================================
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-section');

function navigateTo(pageId) {
    // Remove classe ativa de todas as seções e links do menu
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    // Ativa a página solicitada
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Ativa o link correspondente no menu de navegação
    const targetLink = document.querySelector(`[data-page="${pageId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // Fecha o menu mobile caso esteja aberto após o clique
    document.getElementById('nav-menu').classList.remove('open');
    
    // Rola a janela de volta para o topo da "nova" página
    window.scrollTo(0, 0);
}

// Vincula o evento de clique nos links da navbar
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        navigateTo(pageId);
    });
});


// ==========================================
// 2. ALTERNADOR DE TEMA (DARK/LIGHT)
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
});


// ==========================================
// 3. MENU MOBILE RESPONSIVO
// ==========================================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});


// ==========================================
// 4. FEATURE NOVO: SIMULADOR DE CHECAGEM
// ==========================================
function analyzeFact() {
    const userInput = document.getElementById('report-input').value.trim();
    const resultBox = document.getElementById('analysis-result');
    
    if (userInput === "") {
        alert("Por favor, digite ou cole algo para ser analisado.");
        return;
    }

    resultBox.classList.remove('hidden', 'alert', 'safe');
    resultBox.innerHTML = "Analisando padrões linguísticos e metadados...";

    // Simulação de análise heurística simples
    setTimeout(() => {
        const lowerText = userInput.toLowerCase();
        
        // Gatilhos comuns de fake news e deepfakes sensacionalistas
        if (lowerText.includes("urgente") || lowerText.includes("revelado") || lowerText.includes("olha o que ele disse") || lowerText.includes("vazou")) {
            resultBox.classList.add('alert');
            resultBox.innerHTML = "⚠️ ALERTA: Esse conteúdo possui forte teor sensacionalista e termos comumente usados em Deepfakes e Desinformação. Verifique canais oficiais antes de repassar!";
        } else {
            resultBox.classList.add('safe');
            resultBox.innerHTML = "🔍 ANÁLISE CONCLUÍDA: Não encontramos padrões alarmantes imediatos, mas lembre-se de cruzar o conteúdo com pelo menos duas fontes confiáveis na internet.";
        }
    }, 1200); // Delay para simular processamento
}


// ==========================================
// 5. MINI-QUIZ COM PLACAR DINÂMICO
// ==========================================
const quizData = [
    { question: "1. As deepfakes utilizam Inteligência Artificial para gerar áudios e vídeos falsos altamente realistas.", answer: true },
    { question: "2. Atualmente, os vídeos manipulados por IA já conseguem imitar perfeitamente o comportamento humano, não deixando nenhuma pista visual.", answer: false },
    { question: "3. Compartilhar uma notícia duvidosa só para 'alertar' as pessoas, sem checar antes, ajuda a combater a desinformação.", answer: false }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const quizProgress = document.getElementById('quiz-progress');
const quizBox = document.getElementById('quiz-box');
const quizResult = document.getElementById('quiz-result');
const resultText = document.getElementById('result-text');

function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        quizProgress.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
        questionText.textContent = quizData[currentQuestionIndex].question;
    } else {
        showResults();
    }
}

function checkAnswer(userChoice) {
    if (userChoice === quizData[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    quizBox.classList.add('hidden');
    quizResult.classList.remove('hidden');
    
    resultText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas.<br><br>` + 
    (score === quizData.length 
        ? "Parabéns! Excelente nível de cidadania e consciência digital!" 
        : "Bom treino! Revise as seções anteriores para afiar ainda mais seus critérios de avaliação.");
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    quizResult.classList.add('hidden');
    quizBox.classList.remove('hidden');
    loadQuestion();
}

// Inicialização padrão ao carregar o arquivo
window.onload = () => {
    loadQuestion();
};
