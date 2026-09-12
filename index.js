const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

app.use(cors());


const app = express();
app.use(express.json());

const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Calculadora API',
        version: '1.0.0',
        description: 'API para realizar operações matemáticas básicas'
    },
    paths: {
        '/somar': {
            get: {
                summary: 'Soma dois números',
                parameters: [
                    {
                        name: 'a', in: 'query', required: true, schema: { type: 'number' }, description: 'Primeiro número' },
                    {
                        name: 'b', in: 'query', required: true, schema: { type: 'number' }, description: 'Segundo número' }
                ],
                responses: {
                    '200': { description: 'Sucesso ao realizar a soma' }
                }
            }
        }
    }
}

// Opções para carregar o visual do Swagger via CDN na Vercel
const swaggerOptions = {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
    ]
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.get('/somar', (req, res) => {
    const numero1 = parseFloat(req.query.a)
    const numero2 = parseFloat(req.query.b)

    if(isNaN(numero1) || isNaN(numero2)) {
        return res.status(400).json({ error: 'Parâmetros inválidos. Certifique-se de fornecer dois números.' });
    }

    res.json({
        operacao : "soma",
        a : numero1,
        b : numero2,
        resultado : numero1 + numero2
    })
})

app.listen(3000, () => {
    console.log('Servidor  da calculadora rodando na porta 3000');
    console.log('Acesse a documentação da API em http://localhost:3000/docs');
})


module.exports = app;


