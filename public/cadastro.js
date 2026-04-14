const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    const resposta = await fetch("/usuarios",{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha })
    });

    if(resposta.ok){
        alert("Usuário cadastrado! Redirecionando para o login...");
        window.location.href = "login.html";
    };
});
