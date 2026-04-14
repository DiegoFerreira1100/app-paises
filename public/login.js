const formLogin = document.getElementById("formLogin");
const mensagemErro = document.getElementById("mensagemErro");


formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById("loginNome").value;
    const senha = document.getElementById("loginSenha").value;

    const respostaLogin = await fetch("/login",{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha })
    });

    const dados = await respostaLogin.json();

    if(respostaLogin.ok){
        alert("Usuário encontrado!");
        localStorage.setItem("usuarioLogado", dados.nome);
        localStorage.setItem("xpUsuario", dados.xp);
        window.location.href = "principal.html";
    };
});