import Product from "../models/product.model.js";

async function createProduct(req, res) {
  console.log("Body de la petición", req.body);

  try {

    // Algo en el try que pueda fallar
    // Creamos una nueva instancia del modelo Product con los datos del body (cuerpo de la petición)

    const newProduct = new Product(req.body);

    newProduct.image = req.file?.filename

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

    const findOptions = {};

    

    // const page = req.query.page || 1; // Página actual, por defecto 1
    // const limit = req.query.limit || 5; // Ítems por página, por defecto 5

    const { page = 1, limit = 5, minPrice, maxPrice, category } = req.query;

    if(minPrice || maxPrice) {
      findOptions.price = {};
      if (minPrice) {
        findOptions.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        findOptions.price.$lte = Number(maxPrice);
      }
    }

    

    
    if(category) {
      findOptions.category = { $regex: new RegExp(category, "i") };
    }
    
    console.log("findOptions:", findOptions);


    const products = await Product.find(findOptions)
      // $or: [
      //   {
      //     category: { $regex: "adventure", $options: "i" } // Filtrar por categoría que contenga "action", sin importar mayúsculas/minúsculas
      //   },
      //   {
      //     $and: [{ price: { $gte: 500 } }, { price: { $lte: 1000 } }],
      //   },
      // ],
    // })
      .select("-__v") // Excluir el campo __v
      .limit(limit) // Limitar a 5 resultados
      .skip((page - 1) * limit)
      .sort({ name: 1 }) // Ordenar por precio ascendente
      .collation({ locale: "es" }); // Ordenar con reglas de idioma español
                                  // Omitir los primeros 10 resultados

    const totalProducts = await Product.countDocuments({
      // category: { $regex: "ACTION", $options: "i" },
    });


    res.status(200).send({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    });



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
