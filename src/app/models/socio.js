const mongoose = require('../../database');

const SocioSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    telefone: {
        type: String,
        required: true,
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