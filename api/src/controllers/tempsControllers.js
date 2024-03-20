const { Temperament } = require("../db");
const { getTemperament, postTemp } = require("../services/temperamentsServices");

const getTemperaments = async (req, res) => {
    try {
        const allTemps = await getTemperament();
        res.status(200).send({ status: "Ok", data: allTemps })
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).send({ status: error.response.status, error: error.response.statusText })
        }
        return res.status(500).send(error.message)
    }
}

const postNewTemp = async (req, res) => {
    const temp = req.body
    try {
        const newTemp = await postTemp(temp);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getTemperaments,
    postNewTemp
}