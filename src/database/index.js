import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionURL =
    "mongodb+srv://kartikeysangal:kartikeysangal@cluster0.b5qrd.mongodb.net/";

  mongoose
    .connect(connectionURL)
    .then(() => console.log("Database connected successfully"))
    .catch((e) => console.log(e));
};

export default connectToDB ;