const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoints
router.get('/', async (req, res) => {

  try {
    // find all tags including its associated Product data
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product
        }
      ]
    });

    res.status(200).json(allTags);

  } catch (error) {
    
    // error handling
    console.error(error);
    res.status(400).json(error);

  }

});


router.get('/:id', async (req, res) => {

  try {
      
    // find a single tag by its `id` including its associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ]
    });

    res.status(200).json(tag); 

  } catch (error) {
    
    // error handling
    console.error(error);
    res.status(400).json(error);

  }

});


router.post('/', async (req, res) => {

  try {
    // create a new tag    
    const newTag = await Tag.create(req.body); 

    res.status(200).json(newTag);

  } catch (error) {
    
    // error handling
    console.error(error);
    res.status(400).json(error);

  }

});


router.put('/:id', async (req, res) => {

  try {

    // update a tag's name by its `id` value
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(updatedTag);

  } catch (error) {
    
    // error handling
    console.error(error);
    res.status(400).json(error);

  }

});


router.delete('/:id', async (req, res) => {

  try {

    // delete on tag by its `id` value
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deletedTag);

  } catch (error) {
    
    // error handling
    console.error(error);
    res.status(400).json(error);

  }

});

module.exports = router;