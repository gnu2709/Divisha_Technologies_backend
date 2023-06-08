const express = require('express');
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Route for seller signup
app.post('/signup', (req, res) => {
  // Extract form data from the request body
  const { email, businessName, password, confirmPassword } = req.body;
  
  // Perform validation on the input data
  // ...

  // Save seller details to the database
  // ...
  
  // Return a success response
  res.status(200).json({ message: 'Signup successful' });
});

// Route for adding store info
app.post('/store-info', (req, res) => {
  // Extract store info from the request body
  const { address, gst, logo, storeTimings } = req.body;

  // Save store info to the database
  // ...

  // Return a success response
  res.status(200).json({ message: 'Store info added successfully' });
});

// Route for adding category and subcategory
app.post('/categories', (req, res) => {
  // Extract category and subcategory details from the request body
  const { category, subcategory } = req.body;

  // Save category and subcategory to the database
  // ...

  // Return a success response
  res.status(200).json({ message: 'Category and subcategory added successfully' });
});

// Route for adding inventory
app.post('/inventory', (req, res) => {
  // Extract inventory details from the request body
  const { category, subcategory, productName, MRP, SP, quantity, images } = req.body;

  // Save inventory to the database
  // ...

  // Return a success response
  res.status(200).json({ message: 'Inventory added successfully' });
});

// Route for retrieving seller's unique inventory URL
app.get('/inventory/:sellerId', (req, res) => {
  const sellerId = req.params.sellerId;

  // Retrieve seller's inventory from the database
  // ...

  // Return the inventory as a response
  res.status(200).json({ inventory: sellerInventory });
});

// Route for searching products
app.get('/search', (req, res) => {
  const searchTerm = req.query.term;

  // Perform a search based on the provided term
  // ...

  // Return the search results as a response
  res.status(200).json({ results: searchResults });
});
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }
  console.log('Connected to the database');
  // Start your Express app or execute other code dependent on the database connection
});
app.post('/signup', (req, res) => {
  // Extract form data from the request body
  const { email, businessName, password, confirmPassword } = req.body;

  // ...

  // Save seller details to the database
  const collection = client.db('database').collection('sellers');
  const seller = { email, businessName, password };
  collection.insertOne(seller, (err) => {
    if (err) {
      console.error('Failed to save seller:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Signup successful' });
  });
});

// ...

app.get('/inventory/:sellerId', (req, res) => {
  const sellerId = req.params.sellerId;

  // Retrieve seller's inventory from the database
  const collection = client.db('database').collection('inventory');
  collection.find({ sellerId }).toArray((err, sellerInventory) => {
    if (err) {
      console.error('Failed to retrieve seller inventory:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ inventory: sellerInventory });
  });
});
