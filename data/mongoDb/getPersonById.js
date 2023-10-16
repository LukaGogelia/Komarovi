import dbConnect from "@/data/mongoDb/utils/database";
import Person from "@/data/mongoDb/models/person";

// In-memory cache
const cache = {};

async function getPersonById(id) {
    await dbConnect();

    // Check cache first
    if (cache[id]) {
        return cache[id];
    }

    try {
        const person = await Person.findOne({ _id: id });

        // If no person is found, throw an error or handle accordingly
        if (!person) {
            throw new Error('Person not found');
        }

        // Store the person object in cache
        cache[id] = person;

        // Return the person object
        return person;
    } catch (error) {
        console.error(error);
        throw error;  // Rethrow the error after logging it, or handle it as needed
    }
}

export default getPersonById;
