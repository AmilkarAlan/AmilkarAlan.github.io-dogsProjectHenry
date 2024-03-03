const { Router } = require('express');
const {getAllDogs, getOneBreed} = require("../controllers/dogsControllers")
const router = Router();

router
    .get("/", getAllDogs)
    .get("/search/", getOneBreed)
    .get("/search/:id", getOneBreed)
    // .post("/breed",)
    // .get("/temperaments",)


module.exports = router;
