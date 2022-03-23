const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);
    await conn.connection;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
