const express = require('express');
const authMiddleware = require('../middlewares/auth')
const Ressarcimento = require('../models/ressarcimento')
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

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

router.post('/', async (req, res) => {
    checkPermission(3,req.permission,res);
    try{
        const { idsocio,competencias } = req.body;
        if(!idsocio || !competencias)
            return res.status(400).send({error: 'Dados não informados'});
        const socio = await Socio.findOne({ '_id' : idsocio});
        const repasse = await Repasse.find({ 'numeroBeneficio' : socio.numeroBeneficio });
        
        valorPagamento = 0;
        numCompetencias = 0;
        await asyncForEach(repasse, async (element) => {
            valorPagamento += element.valor;
            numCompetencias +=1;
        });

    }catch(err){
        return res.status(400).send({error: 'Erro ao incluir pagamento'});
    }
});

module.exports = app => app.use('/ressarcimento', router);