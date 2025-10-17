import User from '../models/user.model.js';

async function getUsers(req, res) {
     try {
          
          const users =  await User.find();

          return res.status(200).send({
               message: "Usuarios obtenidos correctamente",
               users
          })
          
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
          console.log("BODY DE LA PETICIÓN", req.body)

          const userData = new User(req.body);

          console.log("DATA DEL USUARIO A GUARDAR", userData)

          const userSaved = await userData.save();

          return res.status(201).send({
               message: "Usuario creado correctamente",
               user: userSaved
          })

     } catch (error) {
          console.log(error);
          res.status(500).send({ message: "Error al crear usuario" });
     }
}

async function updateUser(req, res) {
     res.send("Update user by ID");
}

async function deleteUser(req, res) {
     res.send("Delete user by ID");
}

export { getUsers, getUserById, createUser, updateUser, deleteUser };
