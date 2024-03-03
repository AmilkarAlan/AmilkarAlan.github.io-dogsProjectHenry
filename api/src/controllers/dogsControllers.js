const { getAllBreeds, getBreed } = require("../services/dogsServices")
const { Dog } = require("../db");

const getAllDogs = async (req, res) => {
    try {
        const allBreeds = await getAllBreeds();

        res.status(200).send({ status: "Ok", data: allBreeds })
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).send({ status: error.response.status, error: error.response.statusText })
        }
        return res.status(500).send(error.message)
    }
}

const getOneBreed = async (req, res) => {
    const { id } = req.params
    const { name } = req.query

    try {
        const breed = await getBreed(id || name);
        res.status(200).send({ status: "Ok", data: breed })
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).send({ status: error.response.status, error: error.response.statusText })
        }
        return res.status(500).send(error)
    }
}

const postDog = (req, res) => {

}

module.exports = {
    getAllDogs,
    getOneBreed,
    postDog
}