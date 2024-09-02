const baseURL = "http://127.0.0.1:8000/";

// Para carregar as contas
function carregarContas() {
    fetch(baseURL + "listarContas/")
        .then(response => response.json())
        .then(data => {
            const corpoTabela = document.getElementById("corpoTabelaContas");

            const contas = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));

            corpoTabela.innerHTML = contas.map(conta => `
                <tr>
                    <td>${conta.id}</td>
                    <td>${conta.nome}</td>
                    <td>${conta.descricao}</td>
                    <td>${conta.data}</td>
                    <td>R$ ${conta.valor}</td>
                    <td>${conta.situacao}</td>
                    <td>
                        <button class="btn_editar" onclick="editarConta(${conta.id})">Editar</button>
                        <button class="btn_apagar" onclick="apagarConta(${conta.id})">Apagar</button>
                    </td>
                </tr>
            `).join('');
        })
        .catch(() => alert('Erro ao carregar contas.'));
}

// Para adicionar conta
function adicionarContaHandler(event) {
    event.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        data: document.getElementById('data').value,
        valor: parseFloat(document.getElementById('valor').value),
        situacao: document.getElementById('situacao').value
    };

    fetch(baseURL +  "criarConta/", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // alert(data.mensagem ? "Conta enviada com sucesso!" : "Erro ao enviar a conta.");
            document.getElementById("formAdicionarConta").reset();
            carregarContas();
        })
        .catch(() => alert("Falha ao enviar a conta."));
}

// Para procurar uma conta por ID
function procurarContaPorID() {
    const idConta = document.getElementById("idConta").value;

    fetch(baseURL + `pegarConta/${idConta}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("resultadoProcura").innerHTML = `
                <p><b>ID:</b> ${idConta}</p>
                <p><b>Nome:</b> ${data.nome}</p>
                <p><b>Descrição:</b> ${data.descricao}</p>
                <p><b>Data:</b> ${data.data}</p>
                <p><b>Valor:</b> R$ ${data.valor}</p>
                <p><b>Situação:</b> ${data.situacao}</p>
            `;
        })
        .catch(() => alert("ID de conta inexistente."));
}

// Para editar uma conta
function editarConta(idConta) {
    fetch(baseURL + `pegarConta/${idConta}`)
        .then(response => response.json())
        .then(data => {
            preencherFormulario(data);

            const form = document.getElementById("formAdicionarConta");

            form.removeEventListener("submit", adicionarContaHandler);

            const atualizarContaHandler = function(event) {
                event.preventDefault();

                const formData = {
                    nome: document.getElementById('nome').value,
                    descricao: document.getElementById('descricao').value,
                    data: document.getElementById('data').value,
                    valor: parseFloat(document.getElementById('valor').value),
                    situacao: document.getElementById('situacao').value
                };

                fetch(baseURL + `atualizarConta/${idConta}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                    .then(response => response.json())
                    .then(data => {
                        // alert(data.mensagem ? "Conta atualizada com sucesso!" : "Erro ao atualizar a conta.");
                        form.reset();
                        carregarContas();

                        form.removeEventListener("submit", atualizarContaHandler);

                        form.addEventListener("submit", adicionarContaHandler);
                    })
                    .catch(() => alert("Falha ao atualizar a conta."));
            };

            form.addEventListener("submit", atualizarContaHandler);
        })
        .catch(() => alert("Erro ao buscar os dados da conta para edição."));
}

// Para preencher o form
function preencherFormulario(data) {
    document.getElementById('nome').value = data.nome;
    document.getElementById('descricao').value = data.descricao;
    document.getElementById('data').value = data.data;
    document.getElementById('valor').value = data.valor;
    document.getElementById('situacao').value = data.situacao;
}

// Para apagar
function apagarConta(idConta) {
    fetch(baseURL + `deletarConta/${idConta}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            // alert(data.mensagem);
            carregarContas();
        })
        .catch(() => alert('Erro ao apagar conta.'));
}

document.getElementById("formAdicionarConta").addEventListener("submit", adicionarContaHandler);
document.getElementById("botaoProcurar").addEventListener("click", procurarContaPorID);

// Carregar contas
carregarContas();