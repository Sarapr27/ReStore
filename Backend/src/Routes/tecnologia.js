const express = require("express");
const router = express.Router();
const {postProduct} = require("../Controllers/controllersTecnologias")
const {
	getAccesorios,
	getCelulares,
	getConsolas,
	getElectronica,
	getComputacion,
} = require("../Controllers/subCategoriasParams");
// router.get("/productos/all",)
// router.get("/productos/id/:id",)
// router.get("/productos/subcategorias",) // Se busca la subcategoria por query

router.post("/posteo",postProduct)

// -------
// router.get("/TV/:tv", getTV);
router.get("/Computacion/:compu", getComputacion);
router.get("/ElectronicaAudioVideo/:electro", getElectronica);
router.get("/ConsolasyVideojuegos/:conso", getConsolas);
router.get("/Celulares/:celu", getCelulares);
router.get("/CamarasyAccesorios/:cam", getAccesorios);

//rutas delete y put mas adelante


module.exports=router