import { Schema, model } from "mongoose";

const schema = new Schema({
  state: { type: Boolean, default: true },
  chatId: String,
  skills: { type: Array, default: [] },
  notified: Array,
});

export default model("chats", schema);
