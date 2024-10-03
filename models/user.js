import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: "string",
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: "string",
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  //this = Hace referencia a el schema de arriba
  const user = this;

  //Si la contraseña no ha sido modificada de alguna forma, se pasa al siguiente modulo con next()
  if (!user.isModified("password")) return next();

  //Si si ha sido modificada o se esta creando una nueva de Hashea
  try {
    //Se genera un "salt" (sal) utilizando bcryptjs.genSalt(10),
    //que se usa para aumentar la seguridad del hash.
    const salt = await bcryptjs.genSalt(10);

    //Luego, se hash la contraseña con bcryptjs.hash.
    user.password = await bcryptjs.hash(user.password, salt);

    //Luego pasamos al siguiente modulo
    next();
  } catch (err) {
    console.log(err);
    //Error en caso de que falle el hash
    throw new Error("Fallo el hash password");
  }
});

//comparePassword: Este método se agrega al esquema de usuario.
//Se utiliza para comparar una contraseña proporcionada por el usuario (candidatePassword)
//con la contraseña almacenada en la base de datos.
userSchema.methods.comparePassword = async function (conditatePassword) {
  return await bcryptjs.compare(conditatePassword, this.password);
};

export const User = mongoose.model("user", userSchema);
