tailwind.config = {
    darkMode: 'class',
}
const praticas = [
    { titulo: "Agricultura de Precisão", icon: "📍", desc: "Drones, GPS e sensores para otimizar insumos.", impacto: "Redução de até 30% em fertilizantes" },
    { titulo: "Rotação e Consorciação", icon: "🌾", desc: "Alternância de culturas para saúde do solo.", impacto: "Melhoria da matéria orgânica" },
    { titulo: "Manejo Integrado de Pragas", icon: "🐞", desc: "Controle biológico e monitoramento.", impacto: "Menos agrotóxicos" },
    { titulo: "Agrofloresta", icon: "🌳", desc: "Integração de árvores e culturas.", impacto: "Sequestro de carbono" },
    { titulo: "Irrigação Inteligente", icon: "💧", desc: "Sensores de umidade.", impacto: "Economia de até 50% de água" },
    { titulo: "Bioinsumos", icon: "🧪", desc: "Microrganismos benéficos.", impacto: "Solo mais vivo e resiliente" }
];

let score = 100;
let currentScenario = 0;

const gameScenarios = [
    {
        question: "Cenário 1: Pragas invasivas apareceram na sua plantação de milho. O que você faz?",
        options: [
            {
                text: "Opção A: Aplicar defensivo químico pesado em toda a área imediatamente.",
                penalty: 30,
                feedback: "Resultado: Você limpou a lavoura rápido, mas eliminou polinizadores úteis e insetos predadores naturais! Perdeu 30 pontos."
            },
            {
                text: "Opção B: Inserir insetos predadores benéficos (Manejo Integrado de Pragas).",
                penalty: -20,
                feedback: "Resultado: Excelente escolha ecológica! O equilíbrio natural da fauna foi preservado e controlou o surto. Ganhou 20 pontos!"
            }
        ]
    },
    {
        question: "Cenário 2: Um período prolongado de seca severa começou. Como gerenciar a água?",
        options: [
            {
                text: "Opção A: Ligar a irrigação convencional por inundação em turnos diários.",
                penalty: 20,
                feedback: "Resultado: Alto desperdício por evaporação e causou leve erosão superficial do solo. Perdeu 20 pontos."
            },
            {
                text: "Opção B: Instalar gotejamento subterrâneo inteligente monitorado por sensores.",
                penalty: -20,
                feedback: "Resultado: Uso de precisão cirúrgica! Reduziu o consumo hídrico pela metade e manteve as plantas produtivas. Ganhou 20 pontos!"
            }
        ]
    }
    // ... demais cenários seguem o mesmo padrão
];

function initGame() {
    if (currentScenario < gameScenarios.length) {
        document.getElementById('game-score').innerText = score;

        const sc = gameScenarios[currentScenario];
        document.getElementById('game-question').innerText = sc.question;

        document.getElementById('game-box').classList.remove('hidden');
        document.getElementById('game-feedback-box').classList.add('hidden');

        const optContainer = document.getElementById('game-options');
        optContainer.innerHTML = '';

        sc.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className =
                "w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-emerald-500 font-medium text-sm text-gray-700 dark:text-gray-300 interactive-btn";

            btn.innerText = opt.text;
            btn.onclick = () => selectOption(opt);

            optContainer.appendChild(btn);
        });
    } else {
        endGame();
    }
}

function selectOption(opt) {
    score -= opt.penalty;

    if (score < 0) score = 0;

    document.getElementById('game-score').innerText = score;
    document.getElementById('game-box').classList.add('hidden');

    const feedbackBox = document.getElementById('game-feedback-box');
    feedbackBox.classList.remove('hidden');

    document.getElementById('feedback-icon').innerText =
        opt.penalty > 0 ? "⚠️" : "✨";

    document.getElementById('feedback-txt').innerText = opt.feedback;
}

function nextScenario() {
    currentScenario++;
    initGame();
}

function endGame() {
    document.getElementById('game-box').classList.add('hidden');
    document.getElementById('game-feedback-box').classList.add('hidden');

    const restartBox = document.getElementById('game-restart-box');
    restartBox.classList.remove('hidden');

    let msg = "";

    if (score >= 170) {
        msg = "👑 Mestre da Agropecuária!";
    } else if (score >= 110) {
        msg = "👍 Excelente Produtor!";
    } else {
        msg = "🚨 Alerta de Degradação!";
    }

    document.getElementById('game-final-msg').innerText = msg;
}

function restartGame() {
    score = 100;
    currentScenario = 0;

    document.getElementById('game-restart-box').classList.add('hidden');

    initGame();
}

let currentThemeColor = 'emerald';

const colorMap = {
    emerald: {
        bg: 'bg-emerald-600',
        text: 'text-emerald-800 dark:text-emerald-400',
        border: 'border-emerald-500',
        lightText: 'text-emerald-400'
    },
    sky: {
        bg: 'bg-sky-600',
        text: 'text-sky-800 dark:text-sky-400',
        border: 'border-sky-500',
        lightText: 'text-sky-400'
    },
    amber: {
        bg: 'bg-amber-600',
        text: 'text-amber-800 dark:text-amber-400',
        border: 'border-amber-500',
        lightText: 'text-amber-400'
    }
};

function changeThemeColor(color) {
    currentThemeColor = color;
    applyVisualStyles();
}

function changeAppFont(fontClass) {
    const body = document.getElementById('app-body');

    body.classList.remove(
        'font-poppins',
        'font-inter',
        'font-mono'
    );

    body.classList.add(fontClass);
}

function changeTextSize(sizeClass) {
    const body = document.getElementById('app-body');

    body.classList.remove(
        'text-sm',
        'text-base',
        'text-lg'
    );

    body.classList.add(sizeClass);
}

function toggleVisualPanel() {
    document
        .getElementById('visualPanel')
        .classList.toggle('translate-x-full');
}

function toggleSidebar() {
    document
        .getElementById('sidebarMenu')
        .classList.toggle('-translate-x-full');
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');

    const icon = document
        .getElementById('darkToggle')
        .querySelector('i');

    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

function calcularImpacto() {
    const area =
        parseFloat(document.getElementById('area').value) || 0;

    const checked =
        document.querySelectorAll(
            '#praticas-check input:checked'
        ).length;

    const co2 =
        Math.round(area * 12 * checked * 0.7);

    const agua =
        Math.round(area * 4500 * checked * 0.3);

    const resultadoDiv =
        document.getElementById('resultado');

    resultadoDiv.classList.remove('hidden');

    resultadoDiv.innerHTML = `
        <h3>Seu Impacto Estimado</h3>
        <p>${co2} kg de CO₂ evitados/ano</p>
        <p>${agua} litros de água economizados</p>
    `;
}

function calcularFinanciamento() {
    const valor =
        parseFloat(document.getElementById('loanAmount').value) || 0;

    const jurosAnual =
        parseFloat(document.getElementById('loanType').value);

    const jurosMensal =
        (jurosAnual / 12) / 100;

    const parcelas = 60;

    const pmt =
        valor *
        (jurosMensal * Math.pow(1 + jurosMensal, parcelas)) /
        (Math.pow(1 + jurosMensal, parcelas) - 1);

    const container =
        document.getElementById('loanResult');

    container.classList.remove('hidden');

    container.innerHTML = `
        <h4>Resultado</h4>
        <p>Parcela Mensal: R$ ${pmt.toFixed(2)}</p>
    `;
}

document.getElementById('contactForm')
    .addEventListener('submit', function (e) {
        e.preventDefault();
        alert('✅ Mensagem enviada com sucesso!');
        this.reset();
    });

window.onload = function () {
    renderPraticas();
    renderCheckboxes();
    renderGallery();
    initGame();
    applyVisualStyles();
};