const express = require('express');
const router = express.Router();

const carts = [
    {
        id: 1,
        user: { id: 1, username: 'user1', password: 'pass1' },
        total: 400,
        date: new Date().toISOString(),
        products: [
            { id: 1, name: 'Product 1', quantity: 2, price: 100 },
            { id: 2, name: 'Product 2', quantity: 1, price: 200 }
        ]
    }
];

router.get("/", (req, res) => {
    res.json(carts);
});

router.get("/:cartId", (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const cart = carts.find(c => c.id === cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send({ message: 'Cart not found' });
    }
});


// router.post("/", (req, res) => {
//     const newCart = {
//         id: Date.now(),
//         user: req.body.user,
//         total: req.body.total,
//         date: new Date().toISOString(),
//         products: req.body.products
//     };
//     carts.push(newCart);
//     res.status(201).send(newCart);
// });

router.post("/", (req, res) => {
    const { user, total, products } = req.body;
  
    // Kiểm tra xem người dùng đã tồn tại trong giỏ hàng chưa
    const existingCart = carts.find((cart) => cart.user.id === user.id);
  
    if (existingCart) {
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của người dùng chưa
      const existingProduct = existingCart.products.find(
        (product) => product.id === products[0].id
      );
  
      if (existingProduct) {
        // Sản phẩm đã tồn tại trong giỏ hàng của người dùng, cập nhật thông tin
        existingProduct.quantity += products[0].quantity;
        existingProduct.price = products[0].price;
        existingCart.total += products[0].price * products[0].quantity;
  
        res.status(200).send(existingCart);
      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng của người dùng, thêm sản phẩm mới
        existingCart.products.push(products[0]);
        existingCart.total += products[0].price * products[0].quantity;
  
        res.status(200).send(existingCart);
      }
    } else {
      // Người dùng chưa tồn tại trong giỏ hàng, tạo giỏ hàng mới
      const newCart = {
        id: Date.now(),
        user:req.body.user,
        total: req.body.total ,
        date: new Date().toISOString(),
        products: req.body.products,
      };
  
      carts.push(newCart);
      res.status(201).send(newCart);
    }
  });

router.put("/:cartId", (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const index = carts.findIndex(c => c.id === cartId);
    if (index !== -1) {
        carts[index].user = req.body.user;
        carts[index].total = req.body.total;
        carts[index].date = new Date().toISOString();
        carts[index].products = req.body.products;
        res.send(carts[index]);
    } else {
        res.status(404).send({ message: 'Cart not found' });
    }
});


router.delete("/:cartId", (req, res) => {
    const cartId = parseInt(req.params.cartId);
    const index = carts.findIndex(c => c.id === cartId);
    if (index !== -1) {
        carts.splice(index, 1);
        res.send({ message: 'Cart deleted', cartId: cartId });
    } else {
        res.status(404).send({ message: 'Cart not found' });
    }
});

router.get("/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userCart = carts.find((cart) => cart.user.id == userId);
  if (userCart) {
    res.json(userCart);
  } else {
    res.status(404).send({ message: 'Cart not found for user' });
  }
});

router.delete("/:userId/:productId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const productId = parseInt(req.params.productId);
  
    const cart = carts.find((c) => c.user.id == userId);
    if (cart) {
      const productIndex = cart.products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        // Xóa sản phẩm khỏi giỏ hàng của người dùng
        cart.products.splice(productIndex, 1);
        // Cập nhật tổng giá trị giỏ hàng sau khi xóa sản phẩm
        cart.total = cart.products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        res.send(cart);
      } else {
        res.status(404).send({ message: "Product not found in cart" });
      }
    } else {
      res.status(404).send({ message: "Cart not found" });
    }
  });

module.exports = router;
