import mongoose from "mongoose";

// Define a separate schema for an orderItem
const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
});


const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true

        },
        items: { type: [OrderItemSchema] },
        totalAmount: { type: Number, required: true },
        status: { type: String, required: true, default: "pending" },


    }
)

export const Order = mongoose.model("Order", OrderSchema)
