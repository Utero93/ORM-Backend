const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {

  try {

    // find all products include its associated Category and Tag data
    const allProducts = await Product.findAll({
      include: [
        {
          model: Category
        },
        {
          model: Tag
        }
      ]
    });

    // If the retrieval is successful, it responds with a JSON representation of all the products and sets the HTTP status code to 200 (OK)
    res.status(200).json(allProducts);

  } catch (error) {
    
    // error handling
    console.error(error);
    res.status(400).json(error);

  }

});

// get one product by id
router.get('/:id', async (req, res) => {

  try {

    // find a single product by its `id` including its associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category
        },
        {
          model: Tag
        }
      ]
    })

    // If the product is successfully found, it responds with a JSON representation of the product and sets the HTTP status code to 200 (OK).
    res.status(200).json(product);
    
  } catch (error) {
    
    // error handling
    console.error(error);
    res.status(400).json(error);

  }
});

// router.post('/', (req, res) => {

//   Product.create(req.body)
//     .then((product) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const productTagIdArr = req.body.tagIds.map((tag_id) => {
//           return {
//             product_id: product.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// create new product
router.post('/', async (req, res) => {

  try {

    // Create new product using 'Product' model & data from request body
    const product = await Product.create(req.body);

    // If there are product tags, create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {

      // creates an array of objects, each representing a pair of 'product_id' and 'tag_id' for bulk creating product tags
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));

      // Asynchronously bulk creates product tags using the array generated in the previous step
      await ProductTag.bulkCreate(productTagIdArr);

    }

    // respond w/a JSON representation of the newly created product
    res.status(200).json(product);

  } catch (error) {

    // error handling
    console.error(error);
    res.status(400).json(error);

  }
});

// router.put('/:id', (req, res) => {
//   // update product data
//   Product.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((product) => {
//       if (req.body.tagIds && req.body.tagIds.length) {
        
//         ProductTag.findAll({
//           where: { product_id: req.params.id }
//         }).then((productTags) => {
//           // create filtered list of new tag_ids
//           const productTagIds = productTags.map(({ tag_id }) => tag_id);
//           const newProductTags = req.body.tagIds
//           .filter((tag_id) => !productTagIds.includes(tag_id))
//           .map((tag_id) => {
//             return {
//               product_id: req.params.id,
//               tag_id,
//             };
//           });

//             // figure out which ones to remove
//           const productTagsToRemove = productTags
//           .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//           .map(({ id }) => id);
//                   // run both actions
//           return Promise.all([
//             ProductTag.destroy({ where: { id: productTagsToRemove } }),
//             ProductTag.bulkCreate(newProductTags),
//           ]);
//         });
//       }

//       return res.json(product);
//     })
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

// update product
router.put('/:id', async (req, res) => {
  
  try {

    // Update product data
    const [updatedRowsCount] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      // Create filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }));

      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    // Fetch the updated product data
    const updatedProduct = await Product.findByPk(req.params.id);

    return res.json(updatedProduct);

  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {

  try {
    // delete one product by its `id` primary key
    const deletedProduct = await Product.destroy({
      where: { // specifies condition of deletion
        id: req.params.id
      }
    })

    //  If the deletion is successful, it responds with a JSON representation of the deleted product and sets the HTTP status code to 200 (OK).
    res.status(200).json(deletedProduct);

  } catch (error) {
    
    // error handling
    console.error(error);
    res.status(400).json(error);

  }

});

module.exports = router;