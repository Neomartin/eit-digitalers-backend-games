import Order from "../models/order.model";


async function getOrderById(req, res) {
  try {
    
    const { id } = req.params;

    const order = await Order.findById(id)
                            .populate("products.product", "-__v updatedAt")
                            .populate("user", "-password -__v");

    // Ejemplo de la orden sin popular los productos
    /* 
      {
        _id: '64b8f4c3e1f4c2a5d6e7f890',
        products: [
          {
            product: '64b8f3a2e1f4c2a5d6e7f88f',
            quantity: 2,
            price: 29.99
          },
          {
            product: '64b8f3d5e1f4c2a5d6e7f890',
            quantity: 1,
            price: 59.99
          }
        ],
        user: '64b8f2e1e1f4c2a5d6e7f88e',
        totalPrice: 119.97,
        status: 'pending',
        createdAt: 2024-07-20T12:34:56.789Z,
        updatedAt: 2024-07-20T12:34:56.789Z,
        __v: 0
    
      }

      Ejemplo de la orden con los productos populados

      {
        _id: '64b8f4c3e1f4c2a5d6e7f890',
        products: [
          {
            product: {
              _id: '64b8f3a2e1f4c2a5d6e7f88f',
              name: 'Producto 1',
              description: 'Descripción del producto 1',
              price: 29.99,
              category: 'Categoría A',
              imageUrl: 'http://example.com/producto1.jpg',
              createdAt: 2024-07-20T12:30:42.123Z,
            }
            quantity: 2,
            price: 29.99
          },
          {
            product: {
              _id: '64b8f3d5e1f4c2a5d6e7f890',
              name: 'Producto 2',
              description: 'Descripción del producto 2',
              price: 59.99,
              category: 'Categoría B',
              imageUrl: 'http://example.com/producto2.jpg',
              createdAt: 2024-07-20T12:31:57.456Z,
            }
            quantity: 1,
            price: 59.99
          }
        ],
        user: {
          _id: '64b8f2e1e1f4c2a5d6e7f88e',
          name: 'Juan Pérez',
          email: 'juan.perez@example.com'
        },
        totalPrice: 119.97,
        status: 'pending',
    
    */


  } catch (error) {
    console.log(error);
    return res.status(500).send("Error al obtener la orden por ID");
  }

}
