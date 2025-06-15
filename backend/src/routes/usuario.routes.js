const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.get('/confirmar-email', usuarioController.confirmEmail);
router.post('/cancelar', usuarioController.requestCancel);
router.get('/confirmar-cancelamento', usuarioController.confirmCancel);
router.delete('/delete-all', usuarioController.deleteAll);
router.get('/list-all', usuarioController.listAll);
router.post('/resend-confirmation', usuarioController.resendConfirmationEmail);
router.post('/recuperar-senha', usuarioController.recuperarSenha);

module.exports = router;
