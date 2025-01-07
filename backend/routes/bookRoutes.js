const express = require('express');
const { getAllBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/', protect, getAllBooks);
router.post('/add-books', protect, adminOnly, addBook);
router.put('/:id', protect, adminOnly, updateBook);
router.delete('/:id', protect, adminOnly, deleteBook);

module.exports = router;
