import { mongoose } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: { 
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
    validate: {
      validator: function(valor) {
        const regex = /^[A-Za-z\s]+$/; // Solo letras y espacios
        // regex.test("Pepito Gomez") => true
        // regex.test("Pepito123") => false
        return regex.test(valor)
      },
      message: props => `${props.value} no es un nombre válido. Solo se permiten letras y espacios.`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true, // No se pueden repetir correos
    index: true, // Crea un índice para búsquedas rápidas
    maxlength: 100,
    trim: true,
    lowercase: true,
    validate: {
      validator: (valor) => {
        const regex = /[A-Za-z0-9._+\-']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return regex.test(valor);
      },
      message: props => `${props.value} no es un correo electrónico válido.`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: { // administrador 
    type: String,
    default: "client",
    enum: ["admin", "user", "client"] // Solo puede tener uno de estos valores
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  // address: {
  //   street: { type: String, trim: true, maxlength: 100 },
  //   number: { type: String, trim: true, maxlength: 10 },
  //   city: { type: String, trim: true, maxlength: 50 },
  // },
})
                          // users
const User = mongoose.model("User", userSchema);

export default User;
