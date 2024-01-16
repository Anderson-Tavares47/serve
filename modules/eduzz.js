const express = require("express");
const router = express.Router();

const ORIGIN_SECRET = '4e002af4-2956-492a-a753-83744be5a6f0';

router.post('/webhook-receiver', (req, res) => {
    try {
        const { type, fields } = req.body;

        // Validar a autenticação através do origin_secret
        const originSecretRecebido = fields.edz_cli_origin_secret;
        const autenticacaoValida = originSecretRecebido === ORIGIN_SECRET;

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
