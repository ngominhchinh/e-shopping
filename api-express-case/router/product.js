const express = require('express');
const router = express.Router();

const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 10,
        category: { id: 1, name: 'Electronics' },
        images: ['product-01.jpg', 'product-detail-01.jpg', 'product-min-01.jpg']
    },
    {
        id: 2,
        name: 'Product 2',
        price: 200,
        quantity: 20,
        category: { id: 2, name: 'Books' },
        images: ['product-02.jpg', 'product-detail-02.jpg', 'product-min-02.jpg']
    },
    {
        id: 3,
        name: 'Product 3',
        price: 300,
        quantity: 30,
        category: { id: 3, name: 'Clothing' },
        images: ['product-03.jpg', 'product-detail-03.jpg', 'product-min-03.jpg']
    },
    {
        id: 4,
        name: 'Product 4',
        price: 400,
        quantity: 40,
        category: { id: 2, name: 'Books' },
        images: ['product-02.jpg', 'product-detail-02.jpg', 'product-min-02.jpg']
    },
    {
        id: 5,
        name: 'Product 5',
        price: 300,
        quantity: 30,
        category: { id: 5, name: 'Nghệ thuật' },
        images: ['product-03.jpg', 'product-detail-03.jpg', 'product-min-03.jpg']
    }
];

router.get("/", (req, res) => {
    res.json(products);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

router.post("/", (req, res) => {
    const newProduct = {
        id: Date.now(), // Sử dụng timestamp để tạo id duy nhất
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category, // Nhận category là một đối tượng
        images: req.body.images
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index].name = req.body.name;
        products[index].price = req.body.price;
        products[index].quantity = req.body.quantity;
        products[index].category = req.body.category; // Cập nhật category là một đối tượng
        products[index].images = req.body.images;
        res.send(products[index]);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.send({ message: 'Product deleted', id: id });
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});



module.exports = router;
