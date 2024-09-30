// import modules and dependencies
import express from "express"
import shopControllers from "../controllers/shop.js";

const router = express.Router();

const {getAllCakes, getCakeById, addCakeForm, addCake} = shopControllers;

// routes
router.get("/cakes", getAllCakes)
router.get("/cakes/:id", getCakeById)
router.get("/add-cake", addCakeForm)
router.post("/add-cake", addCake)

export default router;