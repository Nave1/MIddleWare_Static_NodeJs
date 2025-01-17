const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
app.use(express.static(path.join(__dirname, "/assets")));
app.use(express.static(path.join(__dirname, "/js")));
app.use(express.static(path.join(__dirname, "/css")));

// ** Route for main page
const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Tablet", price: 600 },
];

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];
function isUser(req, res, next) {
  const userAge = parseInt(req.query.age);
  const usersByAge = users.filter((u) => u.age > userAge);

  if (usersByAge.length > 0) {
    res.send(usersByAge);
  } else {
    const allUsers = users.map((u) => u.name);
    res.send(allUsers);
  }
}

app.get("/users", isUser);

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "about.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "contact.html"));
});
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Parse the product ID from the route
  const product = products.find((product) => product.id === id); // Find the product by ID
  if (product) {
    res.send(
      `<html>
        <head>
          <link rel="stylesheet" href="/styles/style.css">
        </head>
        <body>
          <h1>Product: ${product.name}</h1>
          <p>Price: $${product.price}</p>
        </body>
      </html>`
    );
  } else {
    res.status(404).send(
      `<html>
        <head>
        <link rel="stylesheet" href="/styles/style.css">
        </head>
        <body>
          <h1>Product not found</h1>
        </body>
      </html>`
    );
  }
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
