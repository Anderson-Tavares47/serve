const express = require("express");
const router = express.Router();

const HOTMART_VERIFICATION_TOKEN = 'niHG2HCya5hMjJhKIL2qH1cPW2gYbx39cc58e4-cc90-41f7-bcb2-78197736e295';

router.post('/webhook-hotmart', (req, res) => {
    try {
        const { verificationToken } = req.body;

        // Validar o token de verificação do Hotmart
        if (verificationToken === HOTMART_VERIFICATION_TOKEN) {
            // Token de verificação válido, você pode processar os dados aqui
            console.log('Dados do webhook do Hotmart recebidos:', req.body);
            res.status(200).json({ status: 'success', message: 'Webhook do Hotmart recebido com sucesso!' });
        } else {
            // Token de verificação inválido
            console.error('Token de verificação do Hotmart inválido.');
            res.status(401).json({ status: 'error', message: 'Token de verificação do Hotmart inválido.' });
        }
    } catch (error) {
        console.error('Erro ao processar webhook do Hotmart:', error);
        res.status(500).json({ status: 'error', message: 'Erro ao processar webhook do Hotmart.' });
    }
});

module.exports = router;