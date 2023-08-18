const mongoose = require("mongoose");
const faker = require("faker");
const News = require("./models"); // Adjust the path to your News model

mongoose
  .connect("mongodb://127.0.0.1:27017/komarovi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

const createFakeNews = async (count) => {
  const newsItems = [];

  for (let i = 0; i < count; i++) {
    newsItems.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: mongoose.Types.ObjectId(),
      datePosted: faker.date.recent(),
      category: faker.random.word(),
      bookmarksCount: faker.random.number({ min: 0, max: 100 }),
      bookmarkedBy: [], // Here you can add logic to include fake user ObjectIds if necessary
      isDeleted: faker.random.boolean(),
    });
  }

  try {
    await News.insertMany(newsItems);
    console.log(`Successfully inserted ${count} fake news items.`);
  } catch (err) {
    console.error("Failed to insert fake news items:", err);
  }
};

createFakeNews(100) // Inserts 100 fake news items
  .then(() => mongoose.connection.close())
  .catch((err) => console.error(err));
