import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionURL =
    "mongodb+srv://shubhgupta172004:HthR7RHinTloyXH2@cluster0.tmlsv.mongodb.net/";

  mongoose
    .connect(connectionURL)
    .then(() => console.log("Database connected successfully"))
    .catch((e) => console.log(e));
};

export default connectToDB ;