import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Definir el número de rondas que vamos a usar para el hash
const SALT_ROUNDS = 10;

async function getUsers(req, res) {
  try {
    const users = await User.find();

    return res.status(200).send({
      message: "Usuarios obtenidos correctamente",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error retrieving users" });
  }
}

async function getUserById(req, res) {
  res.send("Get user by ID");
}

async function createUser(req, res) {
  try {
    // TODO: Repasar logs y validaciones
    console.log("BODY DE LA PETICIÓN", req.body);

    if (!req.body.password) {
      return res.status(400).send({ message: "Faltan campos obligarios" });
    }

    const userData = new User(req.body);

    // Cifrar la contraseña "1234"
    const hashedPassword = bcrypt.hashSync(userData.password, SALT_ROUNDS);

    console.log(hashedPassword);

    userData.password = hashedPassword;

    // Guarda en la base de datos
    const userSaved = await userData.save();

    return res.status(201).send({
      message: "Usuario creado correctamente",
      user: userSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear usuario" });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    //   const { role, isActive, createdAt, password, ...restoProps } = req.body;

    // Checkear si en el body viene un valor role, isActive, createdAt o password y elimarlo

    //   if(req.body.role || req.body.isActive || req.body.createdAt || req.body.password) {

    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!userUpdated) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    return res.status(200).send({
      message: "Usuario actualizado correctamente",
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al actualizar usuario" });
  }
}

async function deleteUser(req, res) {
  res.send("Delete user by ID");
}

async function loginUser(req, res) {
  try {
    console.log("BODY DE LA PETICIÓN", req.body);

    // Obtener los datos del body email, password
    const { email, password } = req.body;

    // Buscar el usuario en la base de datos por su email
    const user = await User.findOne({ email }).select("-createdAt -__v");
    // ❌ Si no existe, devolver un error 404
    if (!user) {
      return res.status(400).send({ message: "Datos incorrectos" });
    }

    // ✅ Si existe, obtengo el documento del usuario

    // Comparar la contraseña del body con la contraseña cifrada del usuario en la base de datos
    const isValid = bcrypt.compareSync(password, user.password);

    // ❌ Si no coinciden, devolver un error 400
    if (!isValid) {
      return res.status(400).send({ message: "Datos incorrectos" });
    }

    // ✅ Si coinciden, devolver un mensaje de éxito
    console.log("USUARIO LOGUEADO:", user.email);

    // Revemos la contraseña antes de enviar la respuesta
    user.password = undefined;
    // delete user.password;

    const SECRET = process.env.JWT_SECRET;
    // GENERAR UN TOKEN JWT
    // Para evitar error de plain objtect, convertimos el documento de mongoose a un objeto plano
    const token = jwt.sign(user.toJSON(), SECRET);

    return res.status(200).send({
      message: "Usuario logueado correctamente",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al iniciar sesión" });
  }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser };
