// ====================================
// PÁGINA DE CRIAR PERFIL
// ====================================

const inputUpload = document.getElementById('imagem');


// Verifica se o elemento existe nesta página
if (inputUpload) {

    // ====================================
    // ESCOLHER IMAGEM PELO ARQUIVO
    // ====================================

    inputUpload.addEventListener('change', function(evento) {

        // Pega o arquivo escolhido
        const arquivo = evento.target.files[0];

        if (arquivo) {

            // Pega o nome da imagem
            const nomeDaImagem = arquivo.name;

            // Mostra o nome da imagem no Console
            console.log(nomeDaImagem);


            // Mostra a imagem no preview
            const preview = document.getElementById('preview');

            preview.src = URL.createObjectURL(arquivo);
            preview.style.display = 'block';

            document.getElementById('uploadTexto').style.display = 'none';

        } else {

            console.log("Nenhum arquivo selecionado.");

        }

    });


    // ====================================
    // ÁREA DE ARRASTAR IMAGEM
    // ====================================

    const dropArea = document.getElementById('dropArea');


    // Clicar na área abre os arquivos
    dropArea.addEventListener('click', function() {

        inputUpload.click();

    });


    // Quando arrastar uma imagem para a área
    dropArea.addEventListener('dragover', function(evento) {

        evento.preventDefault();

        dropArea.classList.add('dragover');

    });


    // Quando tirar a imagem da área
    dropArea.addEventListener('dragleave', function() {

        dropArea.classList.remove('dragover');

    });


    // Quando soltar a imagem
    dropArea.addEventListener('drop', function(evento) {

        evento.preventDefault();

        dropArea.classList.remove('dragover');


        const arquivo = evento.dataTransfer.files[0];


        if (arquivo && arquivo.type.startsWith('image/')) {

            // Coloca o arquivo no input
            inputUpload.files = evento.dataTransfer.files;


            // Mostra o nome da imagem no Console
            const nomeDaImagem = arquivo.name;

            console.log(nomeDaImagem);


            // Mostra a imagem
            const preview = document.getElementById('preview');

            preview.src = URL.createObjectURL(arquivo);
            preview.style.display = 'block';

            document.getElementById('uploadTexto').style.display = 'none';

        }

    });


    // ====================================
    // BOTÃO ENVIAR
    // ====================================

    const botaoEnviar = document.getElementById('botaoEnviar');


    botaoEnviar.addEventListener('click', function() {

        const arquivo = inputUpload.files[0];

        const nome = document
            .getElementById('nome')
            .value
            .trim();


        // Verifica se escolheu uma imagem
        if (!arquivo) {

            alert('Escolha uma imagem.');

            return;

        }


        // Verifica se colocou um nome
        if (!nome) {

            alert('Digite seu nome.');

            return;

        }


        // ====================================
        // PREPARA A IMAGEM PARA A OUTRA PÁGINA
        // ====================================

        const leitor = new FileReader();


        leitor.onload = function(evento) {

            const perfil = {

                nome: nome,

                imagem: evento.target.result,

                curtidas: 0

            };


            // Salva temporariamente os dados
            localStorage.setItem(
                'perfil',
                JSON.stringify(perfil)
            );


            // Abre a página de perfil
            window.location.href = 'perfil.html';

        };


        leitor.readAsDataURL(arquivo);

    });

}


// ====================================
// PÁGINA DE PERFIL
// ====================================

const fotoPerfil = document.getElementById('fotoPerfil');


if (fotoPerfil) {

    const dados = localStorage.getItem('perfil');


    if (dados) {

        const perfil = JSON.parse(dados);


        // Mostra a imagem
        document.getElementById('fotoPerfil').src = perfil.imagem;


        // Mostra o nome
        document.getElementById('nomePerfil').textContent = perfil.nome;


        // Mostra as curtidas
        document.getElementById('numeroCurtidas').textContent = perfil.curtidas;


        // ====================================
        // BOTÃO CURTIR
        // ====================================

        document
            .getElementById('botaoCurtir')
            .addEventListener('click', function() {

                perfil.curtidas++;


                document.getElementById('numeroCurtidas').textContent =
                    perfil.curtidas;


                // Salva novamente a quantidade de curtidas
                localStorage.setItem(
                    'perfil',
                    JSON.stringify(perfil)
                );

            });

    }

}