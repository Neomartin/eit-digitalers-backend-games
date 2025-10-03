function getProducts(req, res) {
  res.send("List of products");
}

function getProductById(req, res) {
  res.send("Producto por ID")
}



export { getProducts, getProductById };
