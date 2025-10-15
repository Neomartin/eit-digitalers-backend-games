import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: { 
        type: String, 
        required: true,
        trim: true,  // Elimina espacios al inicio y final
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    // Sujeto a cambios cuando veamos relaciones entre modelos
    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    image: {
        type: String,
        trim: true,
        required: false, // No es obligatorio
    },
    createdAt: {
        type: Date,
        default: Date.now // Valor por defecto: fecha actual
    }

})

const productModel = mongoose.model("Product", productSchema);
// Al crear un producto a partir de este modelo se guardarán en la colección "products" de la base de datos

export default productModel;




// name
// description
// price
// category
// id (automático de MongoDB)
// image
// createdAt (automático de MongoDB)
