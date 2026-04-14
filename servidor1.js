const express = require('express');
const fs = require('fs');
const path = require('path');
const servidor1 = express();
const port1 = process.env.PORT || 3000;
const cors = require('cors'); 
servidor1.use(cors());  
servidor1.use(express.json());     

servidor1.use(express.static(path.join(__dirname, 'public')));

servidor1.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','login.html')); 
});

//receber usuarios |rota usuarios

servidor1.post('/usuarios',(req,res)=>{
    const novoUsuario = req.body;
    if(!novoUsuario.nome|| novoUsuario.nome.trim()===''){
        return res.status(400).json({erro:"nome do usuario faltando"})
    }
    if(!novoUsuario.senha|| !novoUsuario.senha.trim()===''){
        return res.status(400).json({erro:"senha faltando"})
    }
    novoUsuario.xp = 0;
    const dataUsuarios = fs.readFileSync('./database/usuarios.json', 'utf8');
    const listaUsuarios = JSON.parse(dataUsuarios);
    listaUsuarios.push(novoUsuario);
    fs.writeFileSync(('./database/usuarios.json'), JSON.stringify(listaUsuarios));
    res.json(listaUsuarios);
});

// rota login

servidor1.post('/login',(req,res)=>{
    const { nome, senha } = req.body;
    const dataUsuarios = fs.readFileSync('./database/usuarios.json', 'utf8');
    const listaUsuarios = JSON.parse(dataUsuarios);
    const usuarioEncontrado = listaUsuarios.find(u => u.nome === nome && u.senha === senha);
    if (usuarioEncontrado) {
        res.json({ 
            mensagem: "Login realizado!", 
            nome: usuarioEncontrado.nome,
            xp: usuarioEncontrado.xp || 0
        });
    } else {
        res.status(401).json({ erro: "Usuário ou senha incorretos." });
    }
});

// rota xp

servidor1.post('/atualizar-xp', (req, res) => {
    const { nome, xp } = req.body;

    const data = fs.readFileSync('./database/usuarios.json', 'utf8');
    let lista = JSON.parse(data);

    const usuario = lista.find(u => u.nome === nome);
    
    if (usuario) {
        usuario.xp = xp; 
        fs.writeFileSync('./database/usuarios.json', JSON.stringify(lista, null, 2));
        res.json({ mensagem: "XP salvo com sucesso!" });
    } else {
        res.status(404).json({ erro: "Usuário não encontrado" });
    }
});


servidor1.listen(port1, () => {
    console.log(`Servidor rodando na porta ${port1}`);
});