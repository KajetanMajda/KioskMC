const express = require('express');
const router = express.Router();
const ProductsModel = require('../Schemas/ProductsSchema');
const cors = require('cors');

router.use(cors());

router.put('/products/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { newData } = req.body;
  
      const updatedProduct = await ProductsModel.findOneAndUpdate({ id: id }, newData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send('Internal Server Error');
    }
  });  


module.exports = router;