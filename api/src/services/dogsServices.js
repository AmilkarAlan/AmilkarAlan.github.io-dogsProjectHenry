const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const { transformTemperament } = require("./temperamentsServices");


const dogStructure = (dog) => ({
    weight: dog.weight,
    height: dog.height,
    id: dog.id,
    name: dog.name,
    life_span: dog.life_span,
    image_url: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
    temperaments: dog.temperament ?? dog.temperament
})
const getAllBreeds = async () => {
    try {
        let apiData = []
        const { data } = await axios.get("https://api.thedogapi.com/v1/breeds")
        data.map((d) => {
            let structure = dogStructure(d)
            apiData.push(structure)
        });
        apiData = transformTemperament(apiData)
        const dbData = await Dog.findAll({ include: Temperament })
        return { apiData: apiData, dbData: dbData }
    } catch (error) {
        throw error.message
    }
}

const getBreed = async ({ id, name }) => {
    let searchCond = {}
    if (id) {
        searchCond = { id: { [ Op.iLike ]: id + "%" } };
    } else if (name) {
        searchCond = { name: { [ Op.iLike ]: "%" + name + "%" } };
    }

    if (name) {
        try {
            let searchApi = []
            const searchDb = await Dog.findAll({ where: searchCond, include: Temperament })
            const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
            data.map((d) => {
                searchApi = [ ...searchApi, dogStructure(d) ]
            })
            searchApi = transformTemperament(searchApi)
            return { apiData: searchApi, dbData: searchDb ?? []}
        } catch (error) {
            if (error.response) {
                console.error(error.response.status, error.response.data)
                throw error
            }
            throw error.message
        }
    } else if (id) {
        try {
            if (isNaN(id)) {
                const searchDb = await Dog.findOne({ where: searchCond, include: Temperament })
                return searchDb
            }
            const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)
            searchApi = dogStructure(data);
            searchApi = transformTemperament(searchApi);
            return searchApi
        } catch (error) {
            if (error.response) {
                console.error(error.response.status, error.response.data)
                throw error
            }
            throw error.message
        }
    }
    
}

const postDog = async (dog) => {

    try {
        const dogsInDb = await Dog.findAll();
        const [ dogInDb, created ] = await Dog.findOrCreate({
            where: { name: dog.name },
            defaults: {
                weight: dog.weight,
                height: dog.height,
                name: dog.name,
                life_span: dog.life_span,
                image_url: 'https://th.bing.com/th/id/OIG3.A9HC0qibI9ThT2Caiq.i?w=1024&h=1024&rs=1&pid=ImgDetMain',
                id: "MyD" + "-" + (dogsInDb.length + 1)
            },
            include: [ {
                model: Temperament,
                through: {
                    attributes: []
                }
            } ]
        })
        for (const tempInfo of dog.temperaments) {
            let temp = await Temperament.findOne({ where: { name: tempInfo.name } })
            await dogInDb.addTemperament(temp)
        }
        if (created) return { message: "Creado" }
        return { message: "Encontrado en db" }
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data)
            throw error
        }
        throw error.message
    }
}

module.exports = {
    getAllBreeds,
    getBreed,
    postDog
}