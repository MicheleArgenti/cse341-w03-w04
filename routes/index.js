const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
  // #swagger.tags = ['Hello World!']
  res.send(`
    Hello World!
    Try to go to these routes:
    - /books
    - /authors
    - /api-docs
    `);
});
router.use('/books', require('./books'));
router.use('/authors', require('./authors'));

module.exports = router;