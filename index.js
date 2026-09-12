const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');




const app = express();
app.use(express.json());
app.use(cors());

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

app.get('/', (req, res) => {
    res.send('Bem-vindo à API da Calculadora! Acesse a documentação em /docs');
    res.json({ status: 'API da Calculadora está funcionando!' });
})

app.post('/somar', (req, res) => {

    const { a, b } = req.body;

    const numero1 = parseFloat(a)
    const numero2 = parseFloat(b)

    if(isNaN(numero1) || isNaN(numero2)) {
        return res.status(400).json({ error: 'Parâmetros inválidos. Certifique-se de fornecer dois números.' });
    }

    return res.json({
        operacao : "soma",
        a : numero1,
        b : numero2,
        resultado : numero1 + numero2
    })
})

if(process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    })
}



module.exports = app;



