const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Display the form and the current inventory
router.get('/', async (req, res) => {
  try {
    const inventory = await Item.find();
    res.render('index', { inventory });
  } catch (error) {
    handleError(res, error);
  }
});

// Handle form submission to add a new item to the inventory
router.post('/add_item', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    await Item.create(req.body);
    console.log('Item created successfully');
    res.redirect('/');
  } catch (error) {
    console.error('Error creating item:', error);
    handleError(res, error);
  }
});



// Handle buying items from the inventory
router.post('/buy_item/:id/:quantity', async (req, res) => {
  const { id, quantity } = req.params;
  try {
    const item = await Item.findById(id);
    if (item) {
      item.quantity -= parseInt(quantity);
      await item.save();
    }
    res.redirect('/');
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/delete_item/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    // Use Mongoose findByIdAndDelete to remove the item by ID
    await Item.findByIdAndDelete(itemId);
    console.log('Item deleted successfully');
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting item:', error);
    handleError(res, error);
  }
});


function handleError(res, error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}

module.exports = router;
