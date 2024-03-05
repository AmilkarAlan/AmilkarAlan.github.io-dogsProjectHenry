const { Router } = require('express');
const {getAllDogs, getOneBreed} = require("../controllers/dogsControllers");
const { getTemperaments } = require('../controllers/tempsControllers');

const router = Router();

router
    .get("/", getAllDogs)
    .get("/search/", getOneBreed)
    .get("/search/:id", getOneBreed)
    .get("/temperaments", getTemperaments)
    // .post("/breed",)


module.exports = router;
