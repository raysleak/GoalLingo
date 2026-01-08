import { askGemini } from '../api/gemini.js';
import { supabase, saveUserData } from '../api/supabase.js';

const btn = document.getElementById('btn-financeiro');
const chatContainer = document.getElementById('chat-container');
const loader = document.getElementById('chat-loader');

// Função para adicionar bolhas de chat
function addMessage(type, text) {
    const msgDiv = document.createElement('div');
    if (type === "user") {
        msgDiv.className = "bg-slate-700/50 p-4 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-sm border border-white/5 self-end shadow-sm";
    } else {
        msgDiv.className = "bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm leading-relaxed shadow-sm";
    }
    msgDiv.innerHTML = text.replace(/\n/g, '<br>');
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

btn.onclick = async () => {
    const now = document.getElementById('cash-now').value;
    const goal = document.getElementById('cash-goal').value;

    if (!now || !goal) {
        alert("Por favor, preencha o saldo e a meta.");
        return;
    }

    // Feedback visual imediato
    addMessage("user", `Meu saldo é R$${now} e minha meta é R$${goal}.`);
    loader.classList.remove('hidden');
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Prompt focado em mentoria e inglês
    const prompt = `Analise minha situação financeira: Saldo R$${now}, Meta R$${goal}. 
    Responda em formato de chat:
    1. Um conselho estratégico curto em Inglês.
    2. A tradução do conselho para Português.
    3. Explique um termo financeiro importante usado na resposta.
    Seja motivador e direto.`;

    try {
        const resposta = await askGemini(prompt);
        loader.classList.add('hidden');
        addMessage("ai", resposta);

        // Salva os dados no Supabase para persistência
        await saveUserData('user_stats', { 
            content: { 
                current_cash: now, 
                goal_cash: goal,
                last_update: new Date()
            } 
        });

    } catch (e) {
        loader.classList.add('hidden');
        addMessage("ai", "Ops! Tive um problema para me conectar. Verifique sua chave da API ou conexão.");
        console.error(e);
    }
};