import mongoose from "mongoose";
const { Schema, model } = mongoose;

const linkShema = new Schema({
  longLink: {
    type: "string",
    required: true,
    trim: true,
  },
  nanoLink: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Link = model("Link", linkShema);
