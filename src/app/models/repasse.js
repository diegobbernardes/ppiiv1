const mongoose = require('../../database');

const RepasseSchema = new mongoose.Schema({
    cpf: {
        type: String,
        require: true,
    },
    numeroBeneficio: {
        type: String, 
        require: true,
    },
    competencia: {
        type: Date,
        require: true,
    },
    valor: {
        type: Number,
        require: true,
    },
    socio: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Socio',
    },
});

const Repasse = mongoose.model("Repasse",RepasseSchema);

module.exports = Repasse;