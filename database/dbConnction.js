// import mongoose from "mongoose";

// const dbConnection = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Database connection successful");
//   } catch (error) {
//     console.error("Database connection error:", error);
//   }
// };

// export default dbConnection;

import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connection successful");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default dbConnection;