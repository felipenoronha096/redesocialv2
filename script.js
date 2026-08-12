const inputUpload = document.getElementById('meu-upload')

const url_imagem = ""
const nome = ""

inputUpload.addEventListener('change', function(event) {

    const arquivo = event.target.files[0]

    if (arquivo) {
        url_imagem = arquivo.name
        console.log(url_imagem)
    }
})


const inputNome = document.getElementById("nome")
const button = document.getElementById("btn")

button.addEventListener("click", () => {
    nome = inputNome.value
})

async function enviar() {
    const novoUsuario = { nome: pedro, url: url_imagem};

    const resposta = await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
        'content-type': "application/json"
    },
    body: JSON.stringify(novoUsuario)
    });

    const resultado = await resposta.json();
    console.log('criado com sucesso:', resultado);
}