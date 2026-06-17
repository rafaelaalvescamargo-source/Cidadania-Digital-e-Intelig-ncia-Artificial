// ==========================================
// 1. SISTEMA DE MODO ESCURO / CLARO
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
    // Verifica o tema atual no atributo customizado do HTML
    const currentTheme = htmlElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
    }
});


// ==========================================
// 2. SISTEMA DO MINI-QUIZ INTERATIVO
// ==========================================

// Banco de questões do Quiz (Verdadeiro ou Falso)
const quizData = [
    {
        question: "1. As deepfakes utilizam Inteligência Artificial para gerar áudios e vídeos falsos altamente realistas.",
        answer: true
    },
    {
        question: "2. Atualmente, os vídeos manipulados por IA já conseguem imitar perfeitamente o comportamento humano, não deixando nenhuma pista ou falha visual.",
        answer: false // Falso. Como visto nas dicas, há falhas de renderização, piscadas de olho, etc.
    },
    {
        question: "3. Compartilhar uma notícia duvidosa só para 'alertar' as pessoas, sem checar antes, ajuda a combater a desinformação.",
        answer: false // Falso. Compartilhar sem checar amplifica o alcance da fake news.
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Elementos da interface do Quiz
const questionText = document.getElementById('question-text');
const quizBox = document.getElementById('quiz-box');
const quizResult = document.getElementById('quiz-result');
const resultText = document.getElementById('result-text');

// Inicializa a primeira pergunta do Quiz
function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        questionText.textContent = quizData[currentQuestionIndex].question;
    } else {
        showResults();
    }
}

// Avalia a resposta escolhida pelo usuário
function checkAnswer(userChoice) {
    const correctAnswer = quizData[currentQuestionIndex].answer;
    
    if (userChoice === correctAnswer) {
        score++;
    }
    
    // Avança para a próxima questão
    currentQuestionIndex++;
    loadQuestion();
}

// Exibe o painel de resultados ao final das perguntas
function showResults() {
    quizBox.classList.add('hidden');
    quizResult.classList.remove('hidden');
    
    resultText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas.<br><br>` + 
    (score === quizData.length 
        ? "Parabéns! Você demonstra um ótimo entendimento sobre cidadania digital e identificação de ameaças digitais!" 
        : "Bom esforço! Que tal reler as dicas de identificação e segurança para aprimorar ainda mais seus conhecimentos?");
}

// Reinicia o fluxo do Quiz do zero
function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    quizResult.classList.add('hidden');
    quizBox.classList.remove('hidden');
    loadQuestion();
}

// Executa a inicialização do quiz assim que a página termina de carregar
window.onload = () => {
    loadQuestion();
};
