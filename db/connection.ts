const mongoose = require("mongoose");

export const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db conected ");
  } catch (error) {
    throw new Error("Error In connection");
  }
};
