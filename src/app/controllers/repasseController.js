const express = require('express');
const authMiddleware = require('../middlewares/auth')
const Repasse = require('../models/repasse');
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

router.post('/', async (req, res) => {
    checkPermission(4,req.permission,res);
    try{
        const { cpf,numeroBeneficio,competencia,valor } = req.body;
        if(!cpf || !numeroBeneficio || !competencia || !valor)
            return res.status(400).send({error: 'Dados incompletos'});

        const repasse = await Repasse.create(req.body);

        socio = await Socio.findOne({ "numeroBeneficio":repasse.numeroBeneficio });
        if(socio){
            socio.descontos.push(repasse);
            await socio.save();
            repasse.socio = socio._id;
            await repasse.save();
        }

        return res.send({ repasse });
    }catch(err){
        return res.status(400).send({error: 'Erro ao adicionar o repasse.'});
    }
});

router.get('/', async (req,res) => {
    checkPermission(4,req.permission,res);
    const { cpf,numeroBeneficio,competencia } = req.body;
    where = {};
    try{
        if(numeroBeneficio)
            where = {"numeroBeneficio":numeroBeneficio};
        else if(cpf)
            where = {"cpf":cpf};
        else if(competencia)
            where = {"competencia":competencia}
            
        repasse = await Repasse.find(where).populate('socio','nome');

        return res.send({ repasse });
    }catch(err){
        return res.status(400).send({error: 'Erro ao buscar repasse.'});
    }
});

module.exports = app => app.use('/repasse', router);