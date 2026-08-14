const inputUpload = document.getElementById("meu-upload");

var nome = "";
var url_imagem = "";

inputUpload.addEventListener('change', function(event) {
    
    const arquivo = event.target.files[0];

    if (arquivo) {
        url_imagem = arquivo.name;
        console.log(url_imagem);
    } else {
        url_imagem = "";
        console.log("Nenhum arquivo selecionado.");
    }
});

const inputNome = document.getElementById("nome")

const button = document.getElementById("btn")

button.addEventListener("click", () => {
    nome = inputNome.value
    console.log(nome)
})

//POSt
async function criarUsuario() { 
    
    const novoUsuario = { "nome": nome, "url": url_imagem}; 
    
    const response = await fetch('http://localhost:3000/alunos', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'aplication/json' 
        }, 
        body: JSON.stringify(novoUsuario) 
    })
}