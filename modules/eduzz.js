const express = require("express");
const router = express.Router();

const ORIGIN_SECRET = 'd796b3cc9f7cebc';

router.post('/webhook-receiver', (req, res) => {
     console.log(req)
    try {
        const { type, fields = {} } = req.body;

         console.log(req)
        // Validar a autenticação através do origin_secret
       const originSecretRecebido = req.api_key;
        console.log(originSecretRecebido)
        const autenticacaoValida = originSecretRecebido === ORIGIN_SECRET;
        console.log(autenticacaoValida);

        if (type === 'create' && autenticacaoValida) {
            // A autenticação é válida, você pode processar os dados aqui
            console.log('Dados recebidos:', req.body);
            res.status(200).json({ status: 'success', message: 'Webhook recebido com sucesso!' });
        } else {
            // A autenticação falhou ou o tipo da operação não é 'create'
            console.error('Falha na autenticação ou tipo de operação inválido.');
            res.status(401).json({ status: 'error', message: 'Falha na autenticação ou tipo de operação inválido.' });
        }
    } catch (error) {
        console.error('Erro ao processar webhook:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao processar webhook.' });
    }
});
module.exports = router;
