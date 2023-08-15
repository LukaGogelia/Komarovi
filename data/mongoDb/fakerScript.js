const mongoose = require("mongoose");
const faker = require("faker");
const { News } = require("./models.js"); // Update with the path to your models file

async function generateData() {
  await mongoose.connect("mongodb://127.0.0.1:27017/komarovi"); // Adjust the connection string

  const categories = ["64da7a0746d1a84ef6767cf9", ""];
  const images = ["https://photos.app.goo.gl/v3RGeoeCt5yZGxNi7"];
  const sheu = [
    {
      img: "https://i.ibb.co/jLpnqDV/Dona.jpg",
      cat: "64da7a0746d1a84ef6767cf9",
    },
    {
      img: "https://i.ibb.co/R7NbXQF/Komarovi-jpg.jpg",
      cat: "64da78ca3eff528f7dbbf5b4",
    },
  ];

  // Generate 100 News entries
  for (let i = 0; i < 100; i++) {
    const news = new News({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      imageSmall: i % 2 == 0 ? sheu[0].img : sheu[1].img,
      imageLarge: faker.image.imageUrl((height = 501), (width = 615)),
      datePosted: faker.date.recent(30),
      category: i % 2 == 0 ? sheu[0].cat : sheu[1].cat,
      isDeleted: false,
    });
    await news.save();
  }

  console.log("Data generation complete!");

  mongoose.disconnect();
}

generateData();
