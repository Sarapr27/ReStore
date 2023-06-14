const User = require("../Database/models/userModel");

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  const {
    nombre,
    apellido,
    email,
    contraseña,
    genero,
    fechaNacimiento,
    ubicacion,
    metodosPago,
  } = req.body;

  try {
    const newUser = new User({
      nombre,
      apellido,
      email,
      contraseña,
      genero,
      fechaNacimiento,
      ubicacion,
      metodosPago,
    });

    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
