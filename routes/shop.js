// import modules and dependencies
import express from 'express';
import shopControllers from '../controllers/shop.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

const { getAllCakes, getCakeById, addCakeForm, addCake } = shopControllers;

// routes
router.get('/cakes', getAllCakes);
router.get('/cakes/:id', getCakeById);
router.get('/add-cake', verifyToken, addCakeForm);
router.post('/add-cake', addCake);

export default router;
