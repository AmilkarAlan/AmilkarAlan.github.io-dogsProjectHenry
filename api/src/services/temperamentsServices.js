const axios = require("axios");
const { Temperament } = require("../db")

const extractTemperaments = async () => {
    try {
        const temperament = await Temperament.findAll();
        if (!temperament.length) {

            const { data } = await axios.get("https://api.thedogapi.com/v1/breeds");
            const temperamentsArr = data
                .map(dog => dog.temperament)
                .filter(temp => temp !== undefined)
                .reduce((acc, temp) => {
                    const splitTemp = temp.split(",").map(temp => temp.trim());
                    return [ ...acc, ...splitTemp ];
                }, [])
                .filter((temp, index, arr) => arr.indexOf(temp) === index)
                .sort();
            for (let tempName of temperamentsArr) {

                const dbTemp = await Temperament.create({
                    name: tempName
                })
            }
            const temperament = await Temperament.findAll();
            return temperament
        }
        return temperament
    } catch (error) {
        throw error.message
    }
}
const getTemperament = async () => {
    try {
        const temperaments = await extractTemperaments();
        const tempArr = temperaments.map(temp => temp.dataValues)
        return tempArr
    } catch (error) {
        throw error.message
    }
}
module.exports = {
    getTemperament
}