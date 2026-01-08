import { supabase } from '../api/supabase.js';

window.showAuthModal = () => {
    document.getElementById('login-modal').classList.remove('hidden');
};

window.closeAuthModal = () => {
    document.getElementById('login-modal').classList.add('hidden');
};

window.executeLogin = async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("Acesso negado: Credenciais inválidas.");
    } else {
        alert("Bem-vindo, Mateus!");
        window.closeAuthModal();
        location.reload(); // Recarrega para validar a sessão
    }
};

window.handleLogout = async () => {
    await supabase.auth.signOut();
    location.reload();
};