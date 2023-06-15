const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	apellido: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	contraseña: {
		type: String,
		required: true,
	},
	genero: {
		type: String,
		enum: ["Masculino", "Femenino", "Otro"],
		required: true,
	},
	fechaNacimiento: {
		type: Date,
		required: true,
	},
	ubicacion: [
		{
			ciudad: {
				type: String,
				required: true,
			},
			direccion: {
				type: String,
				required: true,
			},
			codigoPostal: {
				type: Number,
				required: true,
			},
		},
	],
	metodosPago: [
		{
			tipo: {
				type: String,
				required: true,
			},
			numero: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = model("User", userSchema);
