// Import the necessary libraries
import mongoose from 'mongoose';
import dbConnect from "@/data/mongoDb/utils/database";
import Person from "@/data/mongoDb/models/person";

// Ensure you've defined your Person model elsewhere in your project

// Define your utility function
async function getPersonById(id) {
    try {
        // Ensure a connection to the database is established
        await dbConnect();

        // Convert string id to mongoose ObjectId
        // const objectId = mongoose.Types.ObjectId(id);

        // Query the database for the person by _id
        const person = await Person.findOne({ _id: id });

        // If no person is found, throw an error or handle accordingly
        if (!person) {
            throw new Error('Person not found');
        }

        // Return the person object
        return person;
    } catch (error) {
        console.error(error);
        throw error;  // Rethrow the error after logging it, or handle it as needed
    }
}

// Export your utility function for use in other parts of your app
export default getPersonById;
