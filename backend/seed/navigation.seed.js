import mongoose from "mongoose";
import dotenv from "dotenv";
import Navigation from "../models/Navigation.js";

dotenv.config();

const seedNavigation = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Navigation.deleteMany();

    await Navigation.insertMany([
      {
        title: "Books",
        slug: "books",
      },
      {
        title: "Categories",
        slug: "categories",
      },
      {
        title: "Children Books",
        slug: "children-books",
      },
    ]);

    console.log("Seed Successful");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedNavigation();