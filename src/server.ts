import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import mongoose from "mongoose";

const { DB_HOST = "", PORT = 3001 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.log(error.message);
    process.exit(1); // close all package
  });
