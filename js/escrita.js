import { askGemini } from '../api/gemini.js';

document.getElementById('btn-corrigir').onclick = async () => {
    const texto = document.getElementById('escrita-input').value;
    const tipo = document.getElementById('escrita-tipo').value;
    const feedbackDiv = document.getElementById('escrita-feedback');

    if(!texto) return alert("Escreva algo primeiro!");

    feedbackDiv.classList.remove('hidden');
    feedbackDiv.innerHTML = "<p class='animate-pulse text-blue-400'>O Gemini está corrigindo...</p>";

    const prompt = `Analise este texto (${tipo}) em inglês: "${texto}". Corrija a gramática, dê uma nota e sugira 3 palavras melhores. Responda em Português.`;
    
    const resposta = await askGemini(prompt);
    feedbackDiv.innerHTML = `<div class='prose prose-invert'>${resposta.replace(/\n/g, '<br>')}</div>`;
};