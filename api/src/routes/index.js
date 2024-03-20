const { Router } = require('express');
const {getAllDogs, getOneBreed, postNewDog} = require("../controllers/dogsControllers");
const { getTemperaments, postNewTemp } = require('../controllers/tempsControllers');

const router = Router();

router
    .get("/", getAllDogs)
    .get("/search/", getOneBreed)
    .get("/search/:id", getOneBreed)
    .get("/temperaments", getTemperaments)
    .post("/",postNewDog)
    .post("/temperaments/create", postNewTemp)


module.exports = router;
