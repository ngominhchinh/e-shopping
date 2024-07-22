const express = require('express');
const router = express.Router();

const users = [{
    id: 1,
    name: "1",
    username: "user1",
    password: "pass1",
    dob: new Date("1990-01-01")
}];

router.get("/", (req, res) => {
    res.json(users);
});

router.post("/register", (req, res) => {
    const { name, username, password, dob } = req.body;
    const exists = users.some(user => user.username === username);
    if (exists) {
        return res.status(409).json({ message: "Username already exists" });
    }
    const newUser = {
        id: users.length + 1,
        name,
        username,
        password,
        dob
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful", user });
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      res.json({ message: "User deleted", id: id });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
  
module.exports = router;
