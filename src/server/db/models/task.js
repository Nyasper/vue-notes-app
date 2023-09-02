import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
      trim: true, //limpia los espacios en blancos de los string
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Task", taskSchema);
