const express = require('express');
const authMiddleware = require('../middlewares/auth')
const Socio = require('../models/socio');

const router = express.Router();

router.use(authMiddleware);

function checkPermission(routePermission, userPermission, res){
    try{
        if(userPermission<routePermission)
            return res.status(400).send({ error: "Usuario sem permissão para acessar estes recursos." });
    }catch(err){
        return res.status(400).send({error: 'Ocorreu um erro ao verificar a permissão.'});
    }
}

router.get('/', (req, res) => {
    res.send({ok: true, user: req.permission});
});

router.post('/cadastrar', async (req, res)=>{
    checkPermission(2,req.permission,res);
    const { numeroBeneficio } = req.body;
    try{
        if(await Socio.findOne({ numeroBeneficio }))
            return res.status(400).send({ error: "Socio já cadastrado" });
        const socio = await Socio.create(req.body);

        return res.send({ socio });
    }catch(err){
        return res.status(400).send({error: 'Erro ao dadastrar socio'});
    }
});

router.post('/listar', async (req, res)=>{
    checkPermission(1,req.permission,res);
    try{
        const users = await User.find({}).select('+password');
        return res.send(users);
    }catch(err){
        return res.status(400).send({error: 'Falha na consulta'});
    }
});

module.exports = app => app.use('/socio', router);