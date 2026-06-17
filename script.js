// ==========================================
// 1. SISTEMA SPA: SISTEMA DE ALTERNÂNCIA DE ABAS
// ==========================================
function switchTab(event, tabId) {
    if (event) event.preventDefault();

    // Desativa todos os links de abas e conteúdos
    document.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Ativa a aba clicada
    document.getElementById(tabId).classList.add('active');
    if (event) event.target.classList.add('active');

    // Inicializadores automáticos de subsistemas
    if (tabId === 'simulador-crise') {
        initGame();
    }
    
    window.scrollTo(0, 0);
}

// ==========================================
// 2. MODO CLARO / ESCURO (PERSISTENTE)
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
});


// ==========================================
// 3. ORIGINAL MINI-QUIZ INTERATIVO
// ==========================================
const quizData = [
    { question: "1. As deepfakes utilizam Inteligência Artificial para gerar áudios e vídeos falsos altamente realistas.", answer: true },
    { question: "2. Atualmente, os vídeos manipulados por IA já conseguem imitar perfeitamente o comportamento humano, não deixando nenhuma pista ou falha visual.", answer: false },
    { question: "3. Compartilhar uma notícia duvidosa só para 'alertar' as pessoas, sem checar antes, ajuda a combater a desinformação.", answer: false }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const quizBox = document.getElementById('quiz-box');
const quizResult = document.getElementById('quiz-result');
const resultText = document.getElementById('result-text');

function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        questionText.textContent = quizData[currentQuestionIndex].question;
    } else {
        showResults();
    }
}

function checkAnswer(userChoice) {
    if (userChoice === quizData[currentQuestionIndex].answer) score++;
    currentQuestionIndex++;
    loadQuestion();
}

function showResults() {
    quizBox.classList.add('hidden');
    quizResult.classList.remove('hidden');
    resultText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas.<br><br>` + 
    (score === quizData.length ? "Excelente reflexo digital!" : "Revise as dicas para se proteger melhor.");
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    quizResult.classList.add('hidden');
    quizBox.classList.remove('hidden');
    loadQuestion();
}


// ==========================================
// 4. LAB: DETECTAÇÃO DE URL
// ==========================================
function analisarURL() {
    const url = document.getElementById('url-input').value.trim();
    const box = document.getElementById('url-output');
    if(!url) return alert('Por favor, digite uma URL primeiro.');

    box.classList.remove('hidden');
    box.innerHTML = 'Escaneando banco de dados de metadados...';

    setTimeout(() => {
        let score = 0;
        let logs = [];

        if(url.startsWith('http://')) { score += 40; logs.push('Falta criptografia segura (HTTP sem S).'); }
        if(url.includes('-noticias') || url.includes('urgente')) { score += 30; logs.push('Presença de strings sensacionalistas no domínio.'); }
        if((url.match(/\./g) || []).length > 2) { score += 20; logs.push('Excesso de subdomínios (padrão de clonagem).'); }

        box.innerHTML = `
            <h4 style="color:${score > 40 ? '#ef4444':'#10b981'}">Análise: ${score > 40 ? 'Potencial Perigo':'Baixo Risco'} (${score}%)</h4>
            <ul style="margin-top:10px; padding-left:15px;">
                ${logs.map(l => `<li>${l}</li>`).join('') || '<li>Nenhuma anomalia crítica de texto encontrada na URL.</li>'}
            </ul>
        `;
    }, 600);
}


// ==========================================
// 5. LAB: ANÁLISE COMPRESSÃO IMAGEM
// ==========================================
function processarImagemSimulada(event) {
    const file = event.target.files[0];
    if(!file) return;

    document.getElementById('file-name-label').textContent = file.name;
    document.getElementById('forensic-display').classList.remove('hidden');
    document.getElementById('forensic-report').classList.remove('hidden');

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('img-orig-view').src = e.target.result;
        document.getElementById('noise-canvas-simulation').innerHTML = `
            <img src="${e.target.result}" style="width:100%; height:100%; filter: contrast(400%) invert(100%) grayscale(100%); opacity:0.6;">
        `;
    };
    reader.readAsDataURL(file);

    document.getElementById('forensic-report').innerHTML = 'Calculando divergência vetorial de matrizes...';
    setTimeout(() => {
        document.getElementById('forensic-report').innerHTML = '<strong>Resultado da Análise Forense:</strong> Modificações estruturais localizadas na região do tronco facial. Padrão compatível com síntese generativa profunda (Deepfake).';
    }, 1000);
}


// ==========================================
// 6. LAB: CÁLCULO BIOMÉTRICO
// ==========================================
function calcularBiometria() {
    let score = 0;
    document.querySelectorAll('.biometric-check').forEach(box => {
        if(box.checked) score += parseInt(box.value);
    });

    const output = document.getElementById('biometric-output');
    if(score === 0) output.textContent = '0% - Sem anomalias visíveis.';
    else if(score <= 45) output.textContent = `${score}% - Baixo indício de IA. Podem ser apenas falhas de compressão.`;
    else output.textContent = `${score}% - RISCO SEVERO DE SÍNTESE ARTIFICIAL PROFUNDA.`;
}


// ==========================================
// 7. MOTOR DO JOGO: SIMULADOR DE CRISE
// ==========================================
let gameStats = { trust: 100, panic: 0, integrity: 100, step: 0 };
const storyBranches = [
    {
        text: "Um vídeo manipulado por IA mostra o diretor vazando provas do vestibular da escola. O conteúdo está viralizando.",
        choices: [
            { text: "Publicar desmentido técnico demonstrando as anomalias da IA.", change: { trust: 5, panic: -10, integrity: 5 } },
            { text: "Apagar os comentários e fingir que nada ocorreu.", change: { trust: -25, panic: 30, integrity: -15 } }
        ]
    },
    {
        text: "Um áudio sintético copia a voz da professora alegando que as aulas do mês foram suspensas por segurança.",
        choices: [
            { text: "Convocar reunião ao vivo com os pais para validar os canais oficiais.", change: { trust: 15, panic: -15, integrity: 10 } },
            { text: "Criar outra IA para mandar um áudio brigando com os alunos.", change: { trust: -20, panic: 10, integrity: -30 } }
        ]
    }
];

function initGame() {
    gameStats = { trust: 100, panic: 0, integrity: 100, step: 0 };
    document.getElementById('game-active-panel').classList.remove('hidden');
    document.getElementById('game-over-panel').classList.add('hidden');
    renderGameStep();
}

function renderGameStep() {
    document.getElementById('hud-trust').textContent = `${gameStats.trust}%`;
    document.getElementById('hud-panic').textContent = `${gameStats.panic}%`;
    document.getElementById('hud-integrity').textContent = `${gameStats.integrity}%`;

    if(gameStats.trust <= 40 || gameStats.panic >= 60) {
        endGame("A desinformação destruiu a infraestrutura lógica da escola. O pânico venceu.");
        return;
    }

    if(gameStats.step >= storyBranches.length) {
        endGame("Parabéns! Você conteve os bots e manteve a comunidade unida e consciente!");
        return;
    }

    const currentData = storyBranches[gameStats.step];
    document.getElementById('game-step-label').textContent = `Cenário #${gameStats.step + 1}`;
    document.getElementById('game-story-text').textContent = currentData.text;

    const btnBox = document.getElementById('game-choices-box');
    btnBox.innerHTML = '';
    currentData.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'btn-primary';
        btn.textContent = choice.text;
        btn.onclick = () => {
            gameStats.trust = Math.min(100, Math.max(0, gameStats.trust + choice.change.trust));
            gameStats.panic = Math.min(100, Math.max(0, gameStats.panic + choice.change.panic));
            gameStats.integrity = Math.min(100, Math.max(0, gameStats.integrity + choice.change.integrity));
            gameStats.step++;
            renderGameStep();
        };
        btnBox.appendChild(btn);
    });
}

function endGame(msg) {
    document.getElementById('game-active-panel').classList.add('hidden');
    document.getElementById('game-over-panel').classList.remove('hidden');
    document.getElementById('game-result-desc').textContent = msg;
}

function restartGame() {
    initGame();
}

// Inicializações
window.onload = () => {
    loadQuestion();
};
