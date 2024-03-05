const { getAllBreeds, getBreed, postDog } = require("../services/dogsServices")


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
        const breed = await getBreed({ id, name });
        res.status(200).send({ status: "Ok", data: breed })
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).send({ status: error.response.status, error: error.response.statusText })
        }
        return res.status(500).send(error.message)
    }
}

const postNewDog =async (req, res) => {
    const dog = req.body
    try {
        const newDog = await postDog(dog)
        console.log(newDog);
        res.status(204).send({ status: "Ok", data: newDog })
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).send({ status: error.response.status, error: error.response.statusText })
        }
        return res.status(500).send(error)
    }

}

module.exports = {
    getAllDogs,
    getOneBreed,
    postNewDog
}