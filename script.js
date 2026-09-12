const API_URL = 'https://apicalculadora.vercel.app';

async function somar() {
    const a = document.getElementById('numero1').value;
    const b = document.getElementById('numero2').value;

    const divResultado = document.getElementById('resultado');

    if (a === '' || b === '') {
        divResultado.innerHTML = 'Por favor, preencha ambos os números.';
        divResultado.style.color = 'red';
        return;
    }

    divResultado.innerHTML = 'Calculando...';
    divResultado.style.color = 'black';

    try {
        const resposta = await fetch(`${API_URL}/somar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                a: Number(a),
                b: Number(b)
            })
        });

        
        const dados = await resposta.json();

        if (resposta.ok) {
            divResultado.innerHTML = `${dados.a} + ${dados.b} = ${dados.resultado}`;
            divResultado.style.color = 'green';
        } else {
            divResultado.innerHTML = `Erro: ${dados.error}`;
            divResultado.style.color = 'red';
        }
    } catch (erro) {
        console.error('Erro ao chamar a API:', erro);
        divResultado.innerHTML = 'Erro ao chamar a API. Por favor, tente novamente mais tarde.';
        divResultado.style.color = 'red';
    }
}