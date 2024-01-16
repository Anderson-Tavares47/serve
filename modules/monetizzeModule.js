const express = require("express");
const router = express.Router();

const MONETIZZE_VERIFICATION_TOKEN = '5418681c4606de1d988850353a804c6b';

router.post('/webhook-monetizze', (req, res) => {
    try {
        const { chave_unica } = req.body;
        console.log(req.body)

        // Validar o token de verificação do Hotmart
        if (chave_unica === MONETIZZE_VERIFICATION_TOKEN) {
            // Token de verificação válido, você pode processar os dados aqui
            console.log('Dados do webhook do monetizze recebidos:', req.body);
            res.status(200).json({ status: 'success', message: 'Webhook do monetizze recebido com sucesso!' });
        } else {
            // Token de verificação inválido
            console.error('Token de verificação do monetizze inválido.');
            res.status(401).json({ status: 'error', message: 'Token de verificação do monetizze inválido.' });
        }
    } catch (error) {
        console.error('Erro ao processar webhook do monetizze:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao processar webhook do monetizze.' });
    }
});

module.exports = router;
