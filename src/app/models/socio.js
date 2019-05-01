const mongoose = require('../../database');

const SocioSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    cpf: {
        type: String,
        require: true,
    },
    numeroBeneficio: {
        type: String,        
        unique: true,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Socio = mongoose.model("Socio",SocioSchema);

module.exports = Socio;