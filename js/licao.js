import { askGemini } from '../api/gemini.js';

const startBtn = document.getElementById('start-lesson');
const topicInput = document.getElementById('topic-input');

startBtn.onclick = async () => {
    const topic = topicInput.value;
    if(!topic) return alert("Digite um tema!");

    startBtn.innerText = "IA está preparando a aula...";
    startBtn.disabled = true;

    const prompt = `Crie uma questão de múltipla escolha em inglês sobre "${topic}". 
    Forneça no formato JSON rigoroso:
    {"question": "pergunta aqui", "options": ["A", "B", "C", "D"], "answer": "opção correta exatamente como escrita", "explanation": "explicação curta em português"}`;

    try {
        const response = await askGemini(prompt);
        const data = JSON.parse(response); // A IA precisa retornar JSON puro
        showQuestion(data);
    } catch (e) {
        alert("Erro ao gerar questão. Tente novamente.");
        console.error(e);
        startBtn.innerText = "Gerar Questões com IA";
        startBtn.disabled = false;
    }
};

function showQuestion(data) {
    document.getElementById('setup-lesson').classList.add('hidden');
    const area = document.getElementById('lesson-area');
    area.classList.remove('hidden');

    document.getElementById('question-text').innerText = data.question;
    const container = document.getElementById('options-container');
    container.innerHTML = "";

    data.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "w-full bg-gray-800 hover:bg-gray-700 p-5 rounded-2xl text-left border border-white/5 transition-all font-medium";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, data.answer, data.explanation);
        container.appendChild(btn);
    });
}

function checkAnswer(chosen, correct, explanation) {
    const fb = document.getElementById('lesson-feedback');
    fb.classList.remove('hidden');
    
    if(chosen === correct) {
        fb.className = "p-6 rounded-2xl bg-green-500/20 border border-green-500 text-green-400 font-bold";
        fb.innerHTML = `CORRETO! 🎉 <br><span class="text-sm font-normal">${explanation}</span>`;
        // Aqui você chamaria uma função global para somar XP
    } else {
        fb.className = "p-6 rounded-2xl bg-red-500/20 border border-red-500 text-red-400 font-bold";
        fb.innerHTML = `ERROU... A correta era: ${correct} <br><span class="text-sm font-normal">${explanation}</span>`;
    }
}