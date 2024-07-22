const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const userRouter = require('./router/user');
const productRouter = require('./router/product');
const producerRouter = require('./router/producer');
const categoryRouter = require('./router/category');
const cartRouter = require('./router/cart');

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/producers", producerRouter);
app.use("/categories", categoryRouter);
app.use("/carts", cartRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
