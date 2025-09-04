const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// ✅ API route for products
app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "products.JSON")); 
});

// ✅ Serve everything in Amazon Project (root folder)
app.use(express.static(path.join(__dirname, "..")));


// ✅ Root route -> amazon.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "amazon.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
