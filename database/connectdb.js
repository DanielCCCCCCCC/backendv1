import mongoose from "mongoose";
try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("Conexion exitosa");
} catch (e) {
  console.log("Conexion fallida a mongoDB" + e.message);
}
