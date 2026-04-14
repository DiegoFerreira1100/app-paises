const inputPais = document.getElementById("country-input");
const nomeUsuario = localStorage.getItem("usuarioLogado");
let xpUsuario = parseInt(localStorage.getItem("xpUsuario")) || 0;
let nomeCorretoNoMomento = "";

if (!nomeUsuario) {
        alert("não está logado");
        window.location.href = "login.html"; 
    } else{
        document.getElementById("nomeDisplay").innerText = nomeUsuario;
document.getElementById("xpDisplay").innerText = xpUsuario;

if(inputPais){
    inputPais.addEventListener("keydown",(evento)=>{
        if(evento.key === 'Enter'){
            evento.preventDefault();

            const chute = inputPais.value.trim().toLowerCase();
            if(chute === "" || chute.length < 3){
                alert("Digite um nome válido!"); 
            }else{
            if(chute === nomeCorretoNoMomento.toLowerCase()){
                alert("Acertou! +10 XP");
                inputPais.value = ""; 
                ganhouPonto();
            }else {
                alert(`Errou! O nome era: ${nomeCorretoNoMomento}`);
                inputPais.value = "";
                carregarBandeira(); 
            }
            }
            
        }
    })
}

async function carregarBandeira(){
    try{
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,translations,flags");
    const paises = await res.json();

    const indiceAleatorio = Math.floor(Math.random() * paises.length);
    const paisSorteado = paises[indiceAleatorio];

    nomeCorretoNoMomento = paisSorteado.translations.por.common;

    document.getElementById("country-flag").src = paisSorteado.flags.png;
    } catch(erro) {
        console.error("Erro ao carregar bandeira:", erro);
        alert("Não foi possível carregar a bandeira. Tente novamente.");
    }
    inputPais.focus();
}

function ganhouPonto() {
    xpUsuario += 10;
    document.getElementById("xpDisplay").innerText = xpUsuario;
    localStorage.setItem("xpUsuario", xpUsuario); 
    
    salvarXpNoServidor(xpUsuario); 
    carregarBandeira(); 
}

async function salvarXpNoServidor(novoXp) {
    try {
        await fetch("/atualizar-xp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nome: nomeUsuario, 
                xp: novoXp 
            })
        });
    } catch (e) {
        console.error("Não foi possível salvar o XP no servidor.");
    }
}

carregarBandeira();
    }

