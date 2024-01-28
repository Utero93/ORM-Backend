const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {

  try {

    // find all categories and include its associated Products
    const allCategories = await Category.findAll({
      include: [
        {
          model: Product
        }
      ]
    });

    res.status(200).json(allCategories);

  } catch (error) {

    // error handling
    console.error(error);
    res.status(400).json(error);

  }

});

// The `/api/categories/(specified id)` endpoint
router.get('/:id', async (req, res) => {

  try {

    // find one category by its `id` value, include its associated Products
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ]
    });

    res.status(200).json(category);

  } catch (error) {
    
    // error handling
    console.error(error);
    res.status(400).json(error);

  }
});


// The `/api/categories` endpoint
router.post('/', async (req, res) => {

  try {

    // create a new category using the data in the req body
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);

  } catch (error) {

    // error handling
    console.error(error);
    res.status(400).json(error);

  }

});

router.put('/:id', async (req, res) => {
  
  try {
    
    // update a category by its `id` value'
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(updatedCategory);

  } catch (error) {

    // error handling
    console.error(error);
    res.status(400).json(error);
    
  }

});

router.delete('/:id', async (req, res) => {

  try {
    // delete a category by its `id` value
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deletedCategory);

  } catch (error) {

    // error handling
    console.error(error);
    res.status(400).json(error);

  }

});


module.exports = router;