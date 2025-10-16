import Product from "../models/product.model.js";

async function createProduct(req, res) {
  console.log("Body de la petición", req.body);

  try {
    // Algo en el try que pueda fallar
    // Creamos una nueva instancia del modelo Product con los datos del body (cuerpo de la petición)
    const newProduct = new Product(req.body);

    console.log(newProduct);

    // Guardar el producto en la base de datos
    await newProduct.save(); // save() devuelve una promesa

    res.status(201).send({ message: "Producto creado correctamente", product: newProduct});
  } catch (error) {
    console.log(error);
    res.status().send("No se pudo crear el producto");
  }
}

// TODO: Paginación, filtros, ordenación...
async function getProducts(req, res) {
  try {
    const products = await Product.find(); // Devuelve una promesa

    console.log(products);

    res.status(200).send(products);
  } catch (error) {
    console.log(error);

    res.status(500).send("Error al obtener los productos");
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params; // Extraemos el id de los parámetros de la URL

    console.log("ID del producto a buscar:", id);

    const product = await Product.findById(id);

    console.log(product); // null si no encuentra nada

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error al obtener el producto por ID");
  }
}

async function deleteProduct(req, res) {
  // Lógica para borrar un producto por ID
  try {
    const { id } = req.params; // Extraemos el id de los parámetros de la URL

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send("Producto no encontrado");
    }

    return res.status(200).send({ message: "Producto borrado correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error al borrar el producto");
  }
}

// Función para actualizar un producto por ID (PUT /products/:id)
async function updateProduct(req, res) {
  try {

    const { idUpdate } = req.params;

    console.log(req.body);
    //                                                        id     datos     opciones
    const updatedProduct = await Product.findByIdAndUpdate(idUpdate, req.body, { new: true, runValidators: true });

    res.status(200).send({
      message: "Producto actualizado correctamente",
      updatedProduct,
    });

  } catch (error) {

    console.log(error);

    if(error.name === "ValidationError") {
      return res.status(400).send({ message: "Error de validación" }); // 400 Bad Request
    }
    
    res.status(500).send({
      message: "No se pudo actualizar el producto"
    });
  }
}

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
