import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true  }, // Referencia al usuario que hizo el pedido "_id"
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Order = model("Order", orderSchema);

export default Order;
