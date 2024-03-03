const axios = require("axios");
const { Dog } = require("../db");

const getAllBreeds = async () => {
    try {
        const apiData = []
        const { data } = await axios.get("https://api.thedogapi.com/v1/breeds")
        await Promise.all(data.map(async (d) => {
            let structure = {
                weight: d.weight,
                height: d.height,
                id: d.id,
                name: d.name,
                life_span: d.life_span,
                reference_image_id: `https://cdn2.thedogapi.com/images/${d.reference_image_id}.jpg`,
                temperament: d.temperament ? d.temperament : "no info"
            }
            apiData.push(structure)
        }));
        const dbData = await Dog.findAll()
        return { apiData: apiData, dbData: dbData }
    } catch (error) {
        throw error.message
    }
}

const getBreed = async (dog) => {
    try {
        let searchApi = [ null ]
        let searchDb = [ null ]
        if (isNaN(dog)) {
            let searchName = dog.toLowerCase()
            searchDb = [ await Dog.findOne({ where: { name: searchName } }) ]
            const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${dog}`)
            await Promise.all(data.map(async (d) => {
                
                let structure = {
                    weight: d.weight,
                    height: d.height,
                    id: d.id,
                    name: d.name,
                    life_span: d.life_span,
                    reference_image_id: `https://cdn2.thedogapi.com/images/${d.reference_image_id}.jpg`
                }
                searchApi.push(structure)
            }))
            return { searchApi: searchApi, searchDb: searchDb }
        }
        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/${dog}`)
        searchApi =
        {
            weight: data.weight,
            height: data.height,
            id: data.id,
            name: data.name,
            life_span: data.life_span,
            reference_image_id: `hhttps://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`
        }
        return { searchApi: searchApi, searchDb: searchDb }
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data)
            throw error
        }
        throw error.message
    }
}

const postDog = () => {

}

module.exports = {
    getAllBreeds,
    getBreed,
    postDog
}