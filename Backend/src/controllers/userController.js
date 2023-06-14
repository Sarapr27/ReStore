const User = require("../Database/models/userModel");

const createUser = async ({
  nombre,
  apellido,
  email,
  contraseña,
  genero,
  fechaNacimiento,
  ubicacion,
  metodosPago,
}) => {
  // Verificar que todos los campos esten llenos
  // if (
  //   (!nombre || !apellido || !email || !contraseña,
  //   !genero || !fechaNacimiento || !ubicacion || !metodosPago)
  // ) {
  //   throw Error("Todos los campos son obligatorios");
  // }
  //Verificar si el usuario ya existe
  const searchEmail = await User.findOne({ email });
  if (searchEmail) {
    throw Error("Ya existe un usuario con este email");
  }

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

  return savedUser;
};

module.exports = {
  createUser,
};
