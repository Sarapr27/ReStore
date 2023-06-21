const { Router } = require("express");
const router = Router();
const { createPayment, reciveWebhook } = require("../Controllers/mercadoPago");

router.post("/payments", createPayment);

// comprovate de pago
router.get("/success", (req, res) => {
	res.send("success");
});
router.get("/failure", (req, res) => {
	res.send("failure");
});
router.get("/pending", (req, res) => {
	res.send("pending");
});

// escucha de evento de pagos
router.post("/webhook", reciveWebhook);

module.exports = router;