/**
 * Cidadania Digital & IA - Arquivo de Lógica Unificado (SPA)
 * Build: 2026.4.1
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização de módulos globais
    initSPA();
    initTheme();
    initHamburgerMenu();
    initQuiz();
    initForensicLab();
    initGameEngine();
});

// ==========================================
// 1. SISTEMA SPA: GERENCIAMENTO DE ABAS NATIVO
// ==========================================
function initSPA() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            // Atualiza estado visual dos links
            tabLinks.forEach(l => {
                l.classList.remove('active');
                l.setAttribute('aria-selected', 'false');
            });
            link.classList.add('active');
            link.setAttribute('aria-selected', 'true');

            // Alterna visibilidade dos containers de conteúdo
            tabContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            // Fecha menu mobile automaticamente ao clicar se estiver aberto
            const navMenu = document.getElementById('navbar-menu');
            const hamburgerBtn = document.getElementById('hamburger-btn');
            if (navMenu.classList.contains('mobile-open')) {
                navMenu.classList.remove('mobile-open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }

            // Gatilho automático para reinicialização do jogo se entrar na aba dele
            if (targetId === 'simulador-crise') {
                window.initGameInstance();
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// ==========================================
// 2. INTERFACE: MODO ESCURO/CLARO & MOBILE
// ==========================================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', targetTheme);
    });
}

function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('navbar-menu');

    if (!hamburgerBtn || !navMenu) return;

    hamburgerBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('mobile-open');
        if (isOpen) {
            navMenu.classList.remove('mobile-open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        } else {
            navMenu.classList.add('mobile-open');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
        }
    });
}

// ==========================================
// 3. MÓDULO: MINI-QUIZ PEDAGÓGICO
// ==========================================
function initQuiz() {
    const quizData = [
        { question: "As deepfakes utilizam Inteligência Artificial baseada em redes neurais para gerar áudios e vídeos falsos imitando a realidade biológica.", answer: true },
        { question: "Atualmente, os vídeos manipulados por IA comercial já conseguem mimetizar com perfeição matemática absoluta todos os sinais orgânicos sem deixar vestígios.", answer: false },
        { question: "Compartilhar conteúdos duvidosos em massa dentro de grupos privados com o pretexto exclusivo de 'alertar' terceiros diminui o avanço de fake news.", answer: false }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionText = document.getElementById('question-text');
    const quizCounter = document.getElementById('quiz-counter');
    const progressBarFill = document.getElementById('quiz-progress-bar-fill');
    const quizBox = document.getElementById('quiz-box');
    const quizResult = document.getElementById('quiz-result');
    const resultText = document.getElementById('result-text');
    const btnTrue = document.getElementById('btn-quiz-true');
    const btnFalse = document.getElementById('btn-quiz-false');
    const btnRestart = document.getElementById('btn-quiz-restart');

    if (!questionText || !btnTrue || !btnFalse) return;

    function loadQuestion() {
        if (currentQuestionIndex < quizData.length) {
            // Atualiza Progresso e Texto
            questionText.textContent = quizData[currentQuestionIndex].question;
            quizCounter.textContent = `Etapa: ${currentQuestionIndex + 1} de ${quizData.length}`;
            
            const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
            if (progressBarFill) progressBarFill.style.width = `${progressPercent}%`;
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
        if (progressBarFill) progressBarFill.style.width = '100%';
        quizBox.classList.add('hidden');
        quizResult.classList.remove('hidden');

        const performance = (score / quizData.length) * 100;
        let diagnostic = "";

        if (performance === 100) {
            diagnostic = "Excelente reflexo digital! Suas barreiras cognitivas contra engenharia social estão operando perfeitamente.";
        } else if (performance >= 50) {
            diagnostic = "Boa percepção base, mas fique atento aos detalhes técnicos de compressão e cruzamento de metadados.";
        } else {
            diagnostic = "Alerta de vulnerabilidade informacional. Recomendamos revisar o Manual de Boas Práticas Digitais abaixo.";
        }

        resultText.innerHTML = `Você obteve aproveitamento de <strong>${score} de ${quizData.length}</strong> acertos.<br><br>${diagnostic}`;
    }

    btnTrue.addEventListener('click', () => checkAnswer(true));
    btnFalse.addEventListener('click', () => checkAnswer(false));
    btnRestart.addEventListener('click', () => {
        score = 0;
        currentQuestionIndex = 0;
        quizResult.classList.add('hidden');
        quizBox.classList.remove('hidden');
        loadQuestion();
    });

    // Carga Inicial do módulo
    loadQuestion();
}

// ==========================================
// 4. MÓDULO: LABORATÓRIO FORENSE DIGITAL
// ==========================================
function initForensicLab() {
    // 4.1 Verificador de URLs
    const btnAnalisarUrl = document.getElementById('btn-analisar-url');
    if (btnAnalisarUrl) {
        btnAnalisarUrl.addEventListener('click', () => {
            const urlInput = document.getElementById('url-input').value.trim();
            const outputBox = document.getElementById('url-output');

            if (!urlInput) {
                alert('Por favor, informe um endereço de rede (URL) válido para execução.');
                return;
            }

            outputBox.classList.remove('hidden');
            outputBox.innerHTML = '<p class="loading-text">Varrendo estrutura de strings e analisando certificados cadastrados...</p>';

            setTimeout(() => {
                let riskScore = 0;
                let logs = [];

                if (urlInput.startsWith('http://')) {
                    riskScore += 40;
                    logs.push("<strong>Ausência de Protocolo SSL/TLS:</strong> Tráfego de dados aberto (HTTP puro), padrão crítico de clonagem.");
                }
                if (/(-noticias|urgente|exclusivo|ia-verificado|globo|g1|vazado)/i.test(urlInput)) {
                    riskScore += 30;
                    logs.push("<strong>Engenharia de Domínio Evocativa:</strong> Presença de termos apelativos/sensacionalistas fundidos à marca corporativa.");
                }
                if ((urlInput.match(/\./g) || []).length > 2) {
                    riskScore += 20;
                    logs.push("<strong>Mascaramento de Subdomínios:</strong> Excesso de ramificações no link, tática comum para encobrir hosts falsificados.");
                }

                const isDanger = riskScore >= 40;
                outputBox.innerHTML = `
                    <h4 style="color: ${isDanger ? '#ef4444' : '#10b981'}; font-weight: bold; margin-bottom: 8px;">
                        Análise Heurística: ${isDanger ? 'Alto Índice de Risco de Phishing' : 'Estrutura dentro dos Limites Seguros'} (${riskScore}%)
                    </h4>
                    <ul style="padding-left: 20px; list-style-type: square;">
                        ${logs.map(log => `<li style="margin-bottom: 5px;">${log}</li>`).join('') || '<li>Nenhuma anomalia crítica detectada nos padrões de texto do subdomínio examinado.</li>'}
                    </ul>
                `;
            }, 800);
        });
    }

    // 4.2 Simulador ELA (Compressão de Imagens)
    const fileUpload = document.getElementById('forensic-upload');
    if (fileUpload) {
        fileUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;

            document.getElementById('file-name-label').textContent = `Arquivo ativo: ${file.name}`;
            document.getElementById('forensic-display').classList.remove('hidden');
            
            const forensicReport = document.getElementById('forensic-report');
            forensicReport.classList.remove('hidden');
            forensicReport.innerHTML = '<p>Mapeando matriz bidimensional de pixels da amostra...</p>';

            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('img-orig-view').src = e.target.result;
                
                // Simulação visual de matriz de ruído matemático isolado
                const noiseContainer = document.getElementById('noise-canvas-simulation');
                noiseContainer.innerHTML = `
                    <img src="${e.target.result}" style="width:100%; height:100%; object-fit: cover; filter: contrast(500%) invert(100%) grayscale(100%); opacity: 0.7;">
                `;
            };
            reader.readAsDataURL(file);

            setTimeout(() => {
                forensicReport.innerHTML = `
                    <strong>Laudo Técnico de Compressão Simulado:</strong><br>
                    Detectada variação de densidade linear nas bordas geométricas faciais. O gradiente de compressão diverge do plano de fundo original em mais de 73%, indicando inserção de mídias via algoritmos generativos (Deepfake).
                `;
            }, 1200);
        });
    }

    // 4.3 Cálculo de Matriz Biométrica
    const btnCalcularBiometria = document.getElementById('btn-calcular-biometria');
    if (btnCalcularBiometria) {
        btnCalcularBiometria.addEventListener('click', () => {
            let riskSum = 0;
            const checkboxes = document.querySelectorAll('.biometric-check');
            const outputBox = document.getElementById('biometric-output');

            checkboxes.forEach(box => {
                if (box.checked) riskSum += parseInt(box.value);
            });

            outputBox.classList.remove('hidden');

            if (riskSum === 0) {
                outputBox.className = "biometric-result-text-box alert-success";
                outputBox.innerHTML = "<strong>Índice de Alteração: 0%</strong><br>Sinais biológicos estáveis. Não há anomalias orgânicas evidentes na amostra de vídeo examinada.";
            } else if (riskSum <= 45) {
                outputBox.className = "biometric-result-text-box alert-warning";
                outputBox.innerHTML = `<strong>Índice de Alteração: ${riskSum}% (Risco Moderado)</strong><br>Anomalias menores detectadas. Podem decorrer de compressão de rede móvel ou baixa taxa de quadros (FPS) do dispositivo capturador. Monitore novas fontes.`;
            } else {
                outputBox.className = "biometric-result-text-box alert-danger";
                outputBox.innerHTML = `<strong>Índice de Alteração: ${riskSum}% (ALERTA DE ANOMALIA CRÍTICA)</strong><br>Múltiplas quebras estruturais de sinal biológico encontradas. Padrão estatisticamente compatível com clonagem sintetizada por Redes Adversariais Generativas (GANs).`;
            }
        });
    }
}

// ==========================================
// 5. MOTOR NARRATIVO: SIMULADOR DE CRISE
// ==========================================
function initGameEngine() {
    let gameStats = { trust: 100, panic: 0, integrity: 100, step: 0 };
    
    const storyBranches = [
        {
            text: "Um vídeo adulterado por IA mimetiza o diretor da instituição anunciando o vazamento das provas do vestibular. A mídia está se propagando rapidamente em canais comunitários.",
            choices: [
                { text: "Publicar um laudo técnico oficial demonstrando as quebras biométricas da IA nas plataformas formais.", change: { trust: 10, panic: -15, integrity: 5 } },
                { text: "Apagar compulsoriamente os tópicos e banir usuários das páginas escolares temporariamente.", change: { trust: -25, panic: 30, integrity: -15 } }
            ]
        },
        {
            text: "Um arquivo de áudio sintético simula a voz de uma docente afirmando que o ano letivo foi suspenso por invasões cibernéticas internas.",
            choices: [
                { text: "Convocar um pronunciamento síncrono em vídeo com os pais utilizando assinaturas digitais verificadas.", change: { trust: 15, panic: -20, integrity: 15 } },
                { text: "Girar um contra-ataque simulando outro áudio por IA para repreender os perfis responsáveis.", change: { trust: -30, panic: 15, integrity: -35 } }
            ]
        },
        {
            text: "Empresas falsas automatizadas bombardeiam os servidores da coordenação com links clonados oferecendo falsos suportes de antivírus aos alunos.",
            choices: [
                { text: "Isolar as redes afetadas, disparar alertas SMS em massa e instruir a triagem de links por heurística.", change: { trust: 10, panic: -5, integrity: 25 } },
                { text: "Orientar os estudantes a instalarem o arquivo executável anexado para testar se é real.", change: { trust: -45, panic: 40, integrity: -50 } }
            ]
        }
    ];

    const hudTrust = document.getElementById('hud-trust');
    const hudPanic = document.getElementById('hud-panic');
    const hudIntegrity = document.getElementById('hud-integrity');
    
    const barTrustFill = document.getElementById('bar-trust-fill');
    const barPanicFill = document.getElementById('bar-panic-fill');
    const barIntegrityFill = document.getElementById('bar-integrity-fill');

    const activePanel = document.getElementById('game-active-panel');
    const overPanel = document.getElementById('game-over-panel');
    const storyText = document.getElementById('game-story-text');
    const stepLabel = document.getElementById('game-step-label');
    const choicesBox = document.getElementById('game-choices-box');
    const resultTitle = document.getElementById('game-result-title');
    const resultDesc = document.getElementById('game-result-desc');
    const metricsBoard = document.getElementById('game-metrics-board');
    const btnRestartGame = document.getElementById('btn-game-restart');

    function updateHUD() {
        if (!hudTrust) return;
        
        // Atualiza Displays Textuais
        hudTrust.textContent = `${gameStats.trust}%`;
        hudPanic.textContent = `${gameStats.panic}%`;
        hudIntegrity.textContent = `${gameStats.integrity}%`;

        // Atualiza Barras de Preenchimento Gráfico do HUD
        if (barTrustFill) barTrustFill.style.width = `${gameStats.trust}%`;
        if (barPanicFill) barPanicFill.style.width = `${gameStats.panic}%`;
        if (barIntegrityFill) barIntegrityFill.style.width = `${gameStats.integrity}%`;
    }

    function renderGameStep() {
        updateHUD();

        // Condições de Derrota Imediata (Limiares Críticos)
        if (gameStats.trust <= 35 || gameStats.panic >= 65 || gameStats.integrity <= 30) {
            endGame(false, "A infraestrutura de comunicação colapsou. O surto de desinformação automatizada quebrou a credibilidade da instituição e o pânico coordenado se espalhou.");
            return;
        }

        // Condição de Vitória (Esgotamento de Cenários)
        if (gameStats.step >= storyBranches.length) {
            endGame(true, "Sucesso operacional absoluto. Seus protocolos técnicos de contenção neutralizaram a ação dos servidores falsos, blindando a rede e educando o corpo comunitário.");
            return;
        }

        // Carrega Dados do Caso Ativo
        const currentCase = storyBranches[gameStats.step];
        stepLabel.textContent = `Caso #${gameStats.step + 1} de ${storyBranches.length}`;
        storyText.textContent = currentCase.text;

        // Limpa e Reconstrói Árvore de Escolhas
        choicesBox.innerHTML = '';
        currentCase.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'btn-primary choice-btn-node';
            btn.textContent = choice.text;
            
            btn.addEventListener('click', () => {
                // Modula e restringe valores entre 0 e 100
                gameStats.trust = Math.min(100, Math.max(0, gameStats.trust + choice.change.trust));
                gameStats.panic = Math.min(100, Math.max(0, gameStats.panic + choice.change.panic));
                gameStats.integrity = Math.min(100, Math.max(0, gameStats.integrity + choice.change.integrity));
                gameStats.step++;
                renderGameStep();
            });
            
            choicesBox.appendChild(btn);
        });
    }

    function endGame(isVictory, message) {
        activePanel.classList.add('hidden');
        overPanel.classList.remove('hidden');
        
        const badgeIcon = document.getElementById('game-end-badge-icon');
        if (badgeIcon) badgeIcon.textContent = isVictory ? "🏆" : "🚨";
        
        resultTitle.textContent = isVictory ? "Vitória nos Protocolos Computacionais" : "Falha na Resposta de Crise";
        resultDesc.textContent = message;

        if (metricsBoard) {
            metricsBoard.innerHTML = `
                <div class="score-metric-item">Confiança Final: <strong>${gameStats.trust}%</strong></div>
                <div class="score-metric-item">Nível de Pânico: <strong>${gameStats.panic}%</strong></div>
                <div class="score-metric-item">Integridade de Rede: <strong>${gameStats.integrity}%</strong></div>
            `;
        }
    }

    window.initGameInstance = function() {
        gameStats = { trust: 100, panic: 0, integrity: 100, step: 0 };
        activePanel.classList.remove('hidden');
        overPanel.classList.add('hidden');
        renderGameStep();
    };

    if (btnRestartGame) {
        btnRestartGame.addEventListener('click', () => {
            window.initGameInstance();
        });
    }
}
