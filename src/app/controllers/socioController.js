const express = require('express');
const authMiddleware = require('../middlewares/auth')
const Socio = require('../models/socio');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ok: true, user: req.userId});
});

router.post('/cadastrar', async (req, res)=>{
    const { numeroBeneficio } = req.body;
    try{
        if(await Socio.findOne({ cadastrar }))
            return res.status(400).send({ error: "Socio já cadastrado" });
        const socio = await Socio.create(req.body);

        return res.send({ socio });
    }catch(err){
        return res.status(400).send({error: 'Erro ao dadastrar socio'});
    }
});

module.exports = app => app.use('/socios', router);